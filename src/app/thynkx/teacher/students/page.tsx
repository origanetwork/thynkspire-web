"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { api, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, maskPhone } from "@/lib/format";
import type { Paged, TeamSource } from "@/lib/types";
import { useTeacher } from "@/components/teacher/TeacherShell";
import { Alert, Badge, Card, EmptyState, Input, LoadingBlock, PageHeading, Pagination, Select, Table, Td } from "@/components/registration/ui";

type Row = {
  id: string;
  fullName: string;
  classLevel: number;
  division: string;
  age: number;
  parentName: string;
  parentMobile: string;
  team: { id: string; teamCode: string; source: TeamSource };
};

export default function StudentsPage() {
  const { me } = useTeacher();
  const allowed = me.section === "SECONDARY" ? [8, 9, 10] : [11, 12];
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<(Paged<Row> & { confirmedTeams: number }) | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "12" });
    if (search) params.set("q", search);
    if (classLevel) params.set("classLevel", classLevel);
    api<Paged<Row> & { confirmedTeams: number }>(`/teacher/students?${params}`)
      .then(setData)
      .catch((e) => setError(errorMessage(e)));
  }, [search, classLevel, page]);

  return (
    <div className="space-y-6">
      <PageHeading title="Students" subtitle={data ? `${data.meta.total} students across ${data.confirmedTeams} confirmed teams` : " "} />
      {error && <Alert tone="error">{error}</Alert>}
      <Card padded={false}>
        <form
          className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3 p-4 sm:p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(q.trim());
            setPage(1);
          }}
        >
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student or team ID" className="pl-10" />
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
        </form>
        {!data ? (
          <LoadingBlock />
        ) : data.items.length === 0 ? (
          <EmptyState title="No students yet">Students appear here once their team is paid and confirmed.</EmptyState>
        ) : (
          <>
            <Table head={["#", "Student name", "Class", "Age", "Team ID", "Parent / Guardian", "Student / Parent mobile", "Registered via"]}>
              {data.items.map((s, i) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <Td className="text-slate-500">{(data.meta.page - 1) * data.meta.pageSize + i + 1}</Td>
                  <Td className="font-medium text-white">{s.fullName}</Td>
                  <Td>
                    {s.classLevel} {s.division}
                  </Td>
                  <Td>{s.age}</Td>
                  <Td>
                    <Link href={`/thynkx/teacher/teams/${s.team.id}`} className="text-[#00BF62] hover:underline">
                      {s.team.teamCode}
                    </Link>
                  </Td>
                  <Td>{s.parentName}</Td>
                  <Td>{maskPhone(s.parentMobile)}</Td>
                  <Td>
                    <Badge tone={s.team.source === "TEACHER" ? "gray" : "blue"}>{SOURCE_LABEL[s.team.source]}</Badge>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination {...data.meta} onPage={setPage} noun="students" />
          </>
        )}
      </Card>
    </div>
  );
}
