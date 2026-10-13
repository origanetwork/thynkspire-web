"use client";

import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { rupees, dateTime } from "@/lib/format";
import type { Team } from "@/lib/types";
import { Card, CodeHighlight, CopyButton, InfoRows } from "./ui";

export function PaymentSuccess({ team, note, actions }: { team: Team; note: React.ReactNode; actions: React.ReactNode }) {
  const p = team.payment;
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <FiCheckCircle className="w-14 h-14 mx-auto text-[#00BF62] drop-shadow-[0_0_20px_rgba(0,191,98,0.6)]" />
        <h1 className="font-clash text-2xl sm:text-3xl font-bold">Payment successful — team registered!</h1>
        {p && (
          <p className="text-sm text-slate-400">
            {rupees(p.totalPaise)} paid{p.method ? ` via ${p.method.toUpperCase()}` : ""} · Payment ID {p.razorpayPaymentId}
          </p>
        )}
      </div>
      {team.teamCode && (
        <CodeHighlight label="Team ID" value={team.teamCode}>
          <CopyButton value={team.teamCode} label="Copy" />
        </CodeHighlight>
      )}
      <Card>
        <InfoRows
          rows={[
            ...team.students.map((s): [string, string] => [`Student ${s.position}`, `${s.fullName} (Class ${s.classLevel} ${s.division})`]),
            ["School", team.school.name],
            ["Registered on", dateTime(team.confirmedAt)],
          ]}
        />
        <p className="mt-4 text-sm text-slate-400">{note}</p>
      </Card>
      <div className="flex flex-wrap justify-center gap-3">{actions}</div>
    </div>
  );
}

export function PaymentFailed({
  summary,
  amount,
  orderId,
  reason,
  note,
  actions,
}: {
  summary: string;
  amount: number;
  orderId: string;
  reason: string;
  note: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <FiXCircle className="w-14 h-14 mx-auto text-red-400" />
        <h1 className="font-clash text-2xl sm:text-3xl font-bold">Payment failed</h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          The payment was not completed, so the team is <b className="text-white">not registered</b>. If money was deducted, it is auto-refunded in 5–7 working days.
        </p>
      </div>
      <Card>
        <InfoRows
          rows={[
            ["Draft", summary],
            ["Amount", rupees(amount)],
            ["Reason", reason],
            ["Reference", orderId],
          ]}
        />
        <p className="mt-4 text-sm text-slate-400">{note}</p>
      </Card>
      <div className="flex flex-wrap justify-center gap-3">{actions}</div>
    </div>
  );
}
