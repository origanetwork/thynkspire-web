"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiUsers, FiBookOpen, FiCreditCard } from "react-icons/fi";
import { api, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateOnly, rupees } from "@/lib/format";
import type { Fee, Section, TeamSource } from "@/lib/types";
import ShareCard from "@/components/teacher/ShareCard";
import { Alert, Badge, ButtonLink, Card, EmptyState, LoadingBlock, PageHeading, PaymentBadge, Table, Td } from "@/components/registration/ui";

type Dashboard = {
  coordinator: { fullName: string; section: Section; sectionLabel: string };
  school: { name: string; district: string };
  schoolCode: string;
  studentLink: string;
  acceptSelfRegistration: boolean;
  allowedClasses: number[];
  stats: { teams: number; students: number; amountPaidPaise: number; successfulPayments: number };
  fee: Fee;
  recentTeams: { id: string; teamCode: string; source: TeamSource; confirmedAt: string; students: { fullName: string; classLevel: number; division: string }[] }[];
};

function Stat({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon className="w-4 h-4 text-[#00BF62]" /> {label}
      </div>
      <p className="mt-3 font-clash text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

export default function TeacherDashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Dashboard>("/teacher/dashboard").then(setData).catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <Alert tone="error">{error}</Alert>;
  if (!data) return <LoadingBlock />;

  const classes = `${data.allowedClasses[0]}–${data.allowedClasses[data.allowedClasses.length - 1]}`;

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeading subtitle={`Here's your ThynkX summary for ${data.school.name} · ${data.coordinator.section === "SECONDARY" ? "Secondary" : "Higher Secondary"} section`} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Stat icon={FiUsers} label="Teams registered" value={String(data.stats.teams)} sub="Paid & confirmed" />
        <Stat icon={FiBookOpen} label="Students" value={String(data.stats.students)} sub={`Classes ${classes}`} />
        <Stat icon={FiCreditCard} label="Amount paid" value={rupees(data.stats.amountPaidPaise)} sub={`${data.stats.successfulPayments} successful payments`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Share with students">
          <p className="-mt-2 mb-4 text-sm text-slate-400">Students can register teams themselves using this code or link — no login needed.</p>
          {!data.acceptSelfRegistration && (
            <Alert tone="warning" className="mb-4">
              Student self-registration is turned off. Turn it on in{" "}
              <Link href="/thynkx/teacher/profile" className="underline">
                School Profile
              </Link>
              .
            </Alert>
          )}
          <ShareCard schoolCode={data.schoolCode} link={data.studentLink} schoolName={data.school.name} sectionLabel={data.coordinator.sectionLabel} />
        </Card>
        <Card title="Register a team">
          <p className="-mt-2 text-sm text-slate-400">Add two students from Classes {classes} and pay the registration fee to confirm the team.</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">
            <p className="text-slate-300">
              Fee: <span className="text-white font-semibold">{rupees(data.fee.totalPerStudentPaise)}</span> per student ({rupees(data.fee.registrationFeePaise)} registration incl. tax + {rupees(data.fee.platformFeePaise)} platform fee)
            </p>
            <p className="mt-1 text-slate-400">
              Total per team: <span className="text-[#00BF62] font-semibold">{rupees(data.fee.totalPaise)}</span>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/thynkx/teacher/register-team">
              <FiPlus className="w-4 h-4" /> Register new team
            </ButtonLink>
            <ButtonLink href="/thynkx/teacher/teams" variant="secondary">
              View all teams
            </ButtonLink>
          </div>
        </Card>
      </div>

      <Card
        padded={false}
        title="Recent teams"
        action={
          <Link href="/thynkx/teacher/teams" className="text-sm text-[#00BF62] hover:underline">
            View all
          </Link>
        }
      >
        {data.recentTeams.length === 0 ? (
          <EmptyState title="No teams yet">Register a team or share your link with students.</EmptyState>
        ) : (
          <Table head={["Sl. No.", "Team ID", "Student 1", "Student 2", "Class", "Registered via", "Date", "Payment", ""]}>
            {data.recentTeams.map((t, i) => (
              <tr key={t.id} className="hover:bg-white/[0.02]">
                <Td className="text-slate-500">{i + 1}</Td>
                <Td className="font-medium text-white">{t.teamCode}</Td>
                <Td>{t.students[0]?.fullName}</Td>
                <Td>{t.students[1]?.fullName}</Td>
                <Td>{t.students[0]?.classLevel}</Td>
                <Td>
                  <Badge tone={t.source === "TEACHER" ? "gray" : "blue"}>{SOURCE_LABEL[t.source]}</Badge>
                </Td>
                <Td>{dateOnly(t.confirmedAt)}</Td>
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
        )}
      </Card>
    </div>
  );
}
