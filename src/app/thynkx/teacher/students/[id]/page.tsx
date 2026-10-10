"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateTime, initials, phone, rupees } from "@/lib/format";
import type { Student, Team } from "@/lib/types";
import { Alert, Badge, Button, Card, InfoRows, LoadingBlock, PaymentBadge } from "@/components/registration/ui";

const GENDER_LABEL: Record<string, string> = { FEMALE: "Female", MALE: "Male", UNDISCLOSED: "Prefer not to say" };

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ student: Student; team: Team } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ student: Student; team: Team }>(`/teacher/students/${id}`).then(setData).catch((e) => setError(errorMessage(e)));
  }, [id]);

  if (error) return <Alert tone="error">{error}</Alert>;
  if (!data) return <LoadingBlock />;
  const { student: s, team } = data;
  const p = team.payment;
  const teammates = team.students.filter((m) => m.id !== s.id);
  const receipt = () => download(`/teacher/teams/${team.id}/receipt.pdf`, `${team.teamCode}-receipt.pdf`).catch((e) => setError(errorMessage(e)));

  return (
    <div className="space-y-6">
      <Link href="/thynkx/teacher/students" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#00BF62]">
        <FiArrowLeft className="w-4 h-4" /> Students
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 shrink-0 rounded-full bg-[#00BF62]/15 border border-[#00BF62]/40 text-[#00BF62] text-lg font-bold flex items-center justify-center">{initials(s.fullName)}</div>
          <div>
            <h1 className="font-clash text-2xl sm:text-3xl font-bold">{s.fullName}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <Badge>
                Class {s.classLevel} {s.division}
              </Badge>
              <Badge tone="green">Team member {s.position}</Badge>
            </div>
          </div>
        </div>
        <Button variant="secondary" onClick={receipt}>
          <FiDownload className="w-4 h-4" /> Download receipt &amp; confirmation
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Student details">
          <InfoRows
            rows={[
              ["Full name", s.fullName],
              ["Class / Division", `${s.classLevel} / ${s.division}`],
              ["Age", String(s.age)],
              ["Gender", s.gender ? (GENDER_LABEL[s.gender] ?? s.gender) : "—"],
              ["Parent / Guardian", s.parentName],
              ["Student / Parent mobile", phone(s.parentMobile)],
            ]}
          />
        </Card>

        <Card
          title="Team details"
          action={
            <Link href={`/thynkx/teacher/teams/${team.id}`} className="text-sm text-[#00BF62] font-semibold hover:underline">
              View team
            </Link>
          }
        >
          <InfoRows
            rows={[
              ["Team ID", team.teamCode ?? `Draft ${team.draftNo}`],
              ["Status", team.status === "CONFIRMED" ? <Badge key="s" tone="green">Paid &amp; confirmed</Badge> : <PaymentBadge key="s" status={team.status} />],
              ...teammates.map((m): [string, React.ReactNode] => [`Teammate`, `${m.fullName} · Class ${m.classLevel} ${m.division}`]),
              ["School", team.school.name],
              ["Section", team.sectionLabel],
              ["Coordinator", team.coordinator.fullName],
            ]}
          />
        </Card>
      </div>

      <Card title="Registration details">
        <div className="grid md:grid-cols-2 gap-x-8">
          <InfoRows
            rows={[
              ["Registered via", team.source === "TEACHER" ? "Teacher dashboard" : SOURCE_LABEL[team.source]],
              ["Registered on", dateTime(team.confirmedAt ?? team.createdAt)],
              ["Confirmation sent to", `WhatsApp ${phone(team.contactMobile)}`],
              ["Paid by", team.source === "TEACHER" ? `Teacher (${team.coordinator.fullName})` : "Student (via link)"],
            ]}
          />
          <InfoRows
            rows={[
              ["Amount paid", p ? rupees(p.totalPaise) : "—"],
              ["Method", p?.method?.toUpperCase() ?? "—"],
              ["Paid on", dateTime(p?.capturedAt)],
              ["Receipt no.", p?.receiptNo ?? "—"],
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
