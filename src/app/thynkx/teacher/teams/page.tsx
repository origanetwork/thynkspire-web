"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiSearch } from "react-icons/fi";
import { api, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateTime } from "@/lib/format";
import type { Paged, TeamSource, TeamStatus } from "@/lib/types";
import { useTeacher } from "@/components/teacher/TeacherShell";
import { Alert, Badge, ButtonLink, Card, EmptyState, Input, LoadingBlock, Pagination, PaymentBadge, Select, Table, Td } from "@/components/registration/ui";

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

export default function MyTeamsPage() {
  const { me } = useTeacher();
  const allowed = me.section === "SECONDARY" ? [8, 9, 10] : [11, 12];
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paged<Row> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "10" });
    if (search) params.set("q", search);
    if (classLevel) params.set("classLevel", classLevel);
    if (source) params.set("source", source);
    api<Paged<Row>>(`/teacher/teams?${params}`)
      .then(setData)
      .catch((e) => setError(errorMessage(e)));
  }, [search, classLevel, source, page]);

  return (
    <div className="space-y-6">
      {error && <Alert tone="error">{error}</Alert>}

      <Card padded={false}>
        <form
          className="grid grid-cols-1 sm:grid-cols-[1fr_160px_180px] lg:grid-cols-[1fr_160px_180px_auto] gap-3 p-4 sm:p-5"
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
          <ButtonLink href="/thynkx/teacher/register-team" className="sm:col-span-3 lg:col-span-1">
            <FiPlus className="w-4 h-4" /> Register new team
          </ButtonLink>
        </form>

        {!data ? (
          <LoadingBlock />
        ) : data.items.length === 0 ? (
          <EmptyState title="No teams here yet" />
        ) : (
          <>
            <Table head={["Sl. No.", "Team ID", "Student 1", "Class", "Student 2", "Class", "Registered via", "Registered on", "Payment", ""]}>
              {data.items.map((t, i) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <Td className="text-slate-500">{(data.meta.page - 1) * data.meta.pageSize + i + 1}</Td>
                  <Td className="font-medium text-white">{t.teamCode}</Td>
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
                  <Td>{dateTime(t.confirmedAt)}</Td>
                  <Td>
                    <PaymentBadge status="CONFIRMED" />
                  </Td>
                  <Td>
                    <Link href={`/thynkx/teacher/teams/${t.id}`} className="text-[#00BF62] hover:underline">
                      View
                    </Link>
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
