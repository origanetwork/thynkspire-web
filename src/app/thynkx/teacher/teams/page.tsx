"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FiPlus, FiSearch } from "react-icons/fi";
import { api, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateTime } from "@/lib/format";
import type { Paged, TeamSource, TeamStatus } from "@/lib/types";
import { useTeacher } from "@/components/teacher/TeacherShell";
import { Alert, Badge, ButtonLink, Card, EmptyState, Input, LoadingBlock, PageHeading, Pagination, PaymentBadge, Select, Table, Td } from "@/components/registration/ui";

type Row = {
  id: string;
  teamCode: string | null;
  draftNo: string;
  status: TeamStatus;
  source: TeamSource;
  createdAt: string;
  confirmedAt: string | null;
  students: { fullName: string; classLevel: number; division: string }[];
  lastPayment: { status: string; totalPaise: number; failureReason: string | null } | null;
};

type Tab = "confirmed" | "pending" | "failed";

export default function MyTeamsPage() {
  const { me } = useTeacher();
  const allowed = me.section === "SECONDARY" ? [8, 9, 10] : [11, 12];
  const [tab, setTab] = useState<Tab>("confirmed");
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<(Paged<Row> & { counts: Record<Tab, number> }) | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ tab, page: String(page), pageSize: "10" });
    if (search) params.set("q", search);
    if (classLevel) params.set("classLevel", classLevel);
    if (source) params.set("source", source);
    api<Paged<Row> & { counts: Record<Tab, number> }>(`/teacher/teams?${params}`)
      .then(setData)
      .catch((e) => setError(errorMessage(e)));
  }, [tab, search, classLevel, source, page]);

  const tabs: [Tab, string][] = [
    ["confirmed", "Confirmed"],
    ["pending", "Payment pending"],
    ["failed", "Payment failed"],
  ];

  return (
    <div className="space-y-6">
      <PageHeading
        title="My Teams"
        subtitle="All teams registered for your section — by you or by students using your link."
        action={
          <ButtonLink href="/thynkx/teacher/register-team">
            <FiPlus className="w-4 h-4" /> Register new team
          </ButtonLink>
        }
      />
      {error && <Alert tone="error">{error}</Alert>}

      <div className="flex flex-wrap gap-2">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setTab(key);
              setPage(1);
            }}
            className={clsx(
              "h-10 px-4 rounded-full text-sm font-medium border transition-colors cursor-pointer",
              tab === key ? "bg-[#00BF62] text-black border-[#00BF62]" : "border-white/15 text-slate-300 hover:border-white/30",
            )}
          >
            {label} ({data?.counts[key] ?? "…"})
          </button>
        ))}
      </div>

      <Card padded={false}>
        <form
          className="grid grid-cols-1 sm:grid-cols-[1fr_160px_180px] gap-3 p-4 sm:p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(q.trim());
            setPage(1);
          }}
        >
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search team ID or student" className="pl-10" />
          </div>
          <Select
            value={classLevel}
            onChange={(e) => {
              setClassLevel(e.target.value);
              setPage(1);
            }}
            aria-label="Class"
          >
            <option value="">All classes</option>
            {allowed.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </Select>
          <Select
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(1);
            }}
            aria-label="Source"
          >
            <option value="">All sources</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT_LINK">Student link</option>
          </Select>
        </form>

        {!data ? (
          <LoadingBlock />
        ) : data.items.length === 0 ? (
          <EmptyState title="No teams here yet" />
        ) : (
          <>
            <Table head={["#", "Team ID", "Student 1", "Class", "Student 2", "Class", "Registered via", "Registered on", "Payment", ""]}>
              {data.items.map((t, i) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <Td className="text-slate-500">{(data.meta.page - 1) * data.meta.pageSize + i + 1}</Td>
                  <Td className="font-medium text-white">{t.teamCode ?? `Draft ${t.draftNo}`}</Td>
                  <Td>{t.students[0]?.fullName}</Td>
                  <Td>
                    {t.students[0]?.classLevel} {t.students[0]?.division}
                  </Td>
                  <Td>{t.students[1]?.fullName}</Td>
                  <Td>
                    {t.students[1]?.classLevel} {t.students[1]?.division}
                  </Td>
                  <Td>
                    <Badge tone={t.source === "TEACHER" ? "gray" : "blue"}>{SOURCE_LABEL[t.source]}</Badge>
                  </Td>
                  <Td>{dateTime(t.confirmedAt ?? t.createdAt)}</Td>
                  <Td>
                    <PaymentBadge status={t.status === "CONFIRMED" ? "CONFIRMED" : (t.lastPayment?.status ?? t.status)} />
                  </Td>
                  <Td>
                    {t.status === "CONFIRMED" ? (
                      <Link href={`/thynkx/teacher/teams/${t.id}`} className="text-[#00BF62] hover:underline">
                        View
                      </Link>
                    ) : (
                      <Link href={`/thynkx/teacher/register-team?draft=${t.id}`} className="text-[#00BF62] hover:underline">
                        {t.lastPayment ? "Retry payment" : "Complete payment"}
                      </Link>
                    )}
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination {...data.meta} onPage={setPage} noun="teams" />
          </>
        )}
      </Card>
    </div>
  );
}
