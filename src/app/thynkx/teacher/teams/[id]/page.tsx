"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateTime, initials, phone, rupees } from "@/lib/format";
import type { PublicSettings, Team } from "@/lib/types";
import { Alert, Badge, Button, Card, InfoRows, LoadingBlock, PaymentBadge } from "@/components/registration/ui";

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Team>(`/teacher/teams/${id}`).then(setTeam).catch((e) => setError(errorMessage(e)));
    api<PublicSettings>("/public/settings").then(setSettings).catch(() => undefined);
  }, [id]);

  if (error) return <Alert tone="error">{error}</Alert>;
  if (!team) return <LoadingBlock />;
  const p = team.payment;
  const receipt = () => download(`/teacher/teams/${team.id}/receipt.pdf`, `${team.teamCode}-receipt.pdf`).catch((e) => setError(errorMessage(e)));

  return (
    <div className="space-y-6">
      <Link href="/thynkx/teacher/teams" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#00BF62]">
        <FiArrowLeft className="w-4 h-4" /> My Teams
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-clash text-2xl sm:text-3xl font-bold">{team.teamCode ?? `Draft ${team.draftNo}`}</h1>
          {team.status === "CONFIRMED" ? <Badge tone="green">Paid &amp; confirmed</Badge> : <PaymentBadge status={team.status} />}
        </div>
        {team.status === "CONFIRMED" && (
          <Button variant="secondary" onClick={receipt}>
            <FiDownload className="w-4 h-4" /> Download receipt &amp; confirmation
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {team.students.map((s) => (
          <Card key={s.id} title={`Team member ${s.position}`} action={<Badge>Class {s.classLevel} {s.division}</Badge>}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#00BF62]/15 border border-[#00BF62]/40 text-[#00BF62] font-bold flex items-center justify-center">{initials(s.fullName)}</div>
              <div>
                <p className="font-semibold">{s.fullName}</p>
                <p className="text-xs text-slate-400">Age {s.age}</p>
              </div>
            </div>
            <InfoRows
              rows={[
                ["Class / Division", `${s.classLevel} / ${s.division}`],
                ["Parent / Guardian", s.parentName],
                ["Student / Parent mobile", phone(s.parentMobile)],
              ]}
            />
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Payment">
          {p ? (
            <InfoRows
              rows={[
                ["Amount", rupees(p.totalPaise)],
                ["Status", <PaymentBadge key="s" status={p.status} />],
                ["Method", p.method?.toUpperCase() ?? "—"],
                ["Paid on", dateTime(p.capturedAt)],
                ["Razorpay payment ID", p.razorpayPaymentId ?? "—"],
                ["Razorpay order ID", p.razorpayOrderId],
                ["Receipt no.", p.receiptNo ?? "—"],
                ["Paid by", team.source === "TEACHER" ? `Teacher (${team.coordinator.fullName})` : `Student (WhatsApp ${phone(team.contactMobile)})`],
              ]}
            />
          ) : (
            <p className="text-sm text-slate-400">No payment yet.</p>
          )}
        </Card>
        <Card title="Registration info">
          <InfoRows
            rows={[
              ["Registered via", team.source === "TEACHER" ? "Teacher dashboard" : SOURCE_LABEL[team.source]],
              ["Registered on", dateTime(team.confirmedAt ?? team.createdAt)],
              ["Section", team.sectionLabel],
              ["Confirmation sent to", `WhatsApp ${phone(team.contactMobile)}`],
            ]}
          />
          <p className="mt-4 text-xs text-slate-500">
            Student details can be corrected by contacting the ThynkX admin
            {settings?.editDeadline ? ` until ${dateTime(settings.editDeadline)}` : ""}.
          </p>
        </Card>
      </div>
    </div>
  );
}
