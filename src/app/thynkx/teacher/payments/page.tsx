"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateTime, rupees } from "@/lib/format";
import type { Paged, PaymentStatus, TeamSource, TeamStatus } from "@/lib/types";
import { Alert, Badge, Card, EmptyState, Input, LoadingBlock, PageHeading, Pagination, PaymentBadge, Select, Table, Td } from "@/components/registration/ui";

type Row = {
  id: string;
  razorpayPaymentId: string | null;
  razorpayOrderId: string;
  status: PaymentStatus;
  paidBy: TeamSource;
  totalPaise: number;
  method: string | null;
  failureReason: string | null;
  createdAt: string;
  capturedAt: string | null;
  team: { id: string; teamCode: string | null; draftNo: string; status: TeamStatus; expiresAt: string | null; canComplete: boolean };
};
type UnpaidState = "NOT_STARTED" | "INCOMPLETE" | "FAILED" | "EXPIRED";
type Unpaid = {
  id: string;
  draftNo: string;
  source: TeamSource;
  contactEmail: string;
  contactMobile: string;
  createdAt: string;
  state: UnpaidState;
  attempts: number;
  lastAttemptAt: string | null;
  failureReason: string | null;
  amountPaise: number;
  students: { fullName: string; classLevel: number; division: string }[];
};
const UNPAID_BADGE: Record<UnpaidState, ["amber" | "red" | "gray", string]> = {
  NOT_STARTED: ["amber", "Payment not started"],
  INCOMPLETE: ["amber", "Cancelled / not completed"],
  FAILED: ["red", "Failed"],
  EXPIRED: ["gray", "Expired"],
};
type Summary = { totalPaidPaise: number; successful: number; failedOrAbandoned: number };

export default function PaymentsPage() {
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<(Paged<Row> & { summary: Summary }) | null>(null);
  const [error, setError] = useState("");
  const [unpaid, setUnpaid] = useState<Paged<Unpaid> | null>(null);
  const [unpaidPage, setUnpaidPage] = useState(1);

  useEffect(() => {
    api<Paged<Unpaid>>(`/teacher/payments/unpaid?page=${unpaidPage}&pageSize=5`)
      .then(setUnpaid)
      .catch((e) => setError(errorMessage(e)));
  }, [unpaidPage]);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "10" });
    if (search) params.set("q", search);
    if (status) params.set("status", status);
    if (method) params.set("method", method);
    api<Paged<Row> & { summary: Summary }>(`/teacher/payments?${params}`)
      .then(setData)
      .catch((e) => setError(errorMessage(e)));
  }, [search, status, method, page]);

  const s = data?.summary;

  return (
    <div className="space-y-6">
      <PageHeading title="Payment history" subtitle="All payments for teams in your section — registered by you or by students through your link" />
      {error && <Alert tone="error">{error}</Alert>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          ["Total paid", s ? rupees(s.totalPaidPaise) : "…", s ? `${s.successful} teams` : ""],
          ["Successful", s ? String(s.successful) : "…", ""],
          ["Failed / not completed", s ? String(s.failedOrAbandoned) : "…", "No team created"],
        ].map(([label, value, sub]) => (
          <div key={label} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-2 font-clash text-2xl sm:text-3xl font-bold tabular-nums">{value}</p>
            {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
          </div>
        ))}
      </div>

      <Card padded={false}>
        <div className="p-4 sm:p-5 border-b border-white/10">
          <h2 className="font-clash text-lg font-semibold">Awaiting payment</h2>
          <p className="mt-1 text-sm text-slate-400">Teams whose payment was not started, cancelled, failed or timed out. You can complete the payment for them.</p>
        </div>
        {!unpaid ? (
          <LoadingBlock />
        ) : unpaid.items.length === 0 ? (
          <EmptyState title="Nothing pending — every team is paid" />
        ) : (
          <>
            <Table head={["Draft", "Students", "Registered by", "Amount", "Last attempt", "Status", "Action"]}>
              {unpaid.items.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <Td className="text-white">Draft #{t.draftNo}</Td>
                  <Td>
                    {t.students.map((st) => (
                      <div key={st.fullName}>
                        {st.fullName} <span className="text-slate-500">· {st.classLevel}{st.division}</span>
                      </div>
                    ))}
                  </Td>
                  <Td>
                    {SOURCE_LABEL[t.source]}
                    {t.source === "STUDENT_LINK" && <div className="text-xs text-slate-500">{t.contactEmail}</div>}
                  </Td>
                  <Td>{rupees(t.amountPaise)}</Td>
                  <Td>
                    {t.lastAttemptAt ? dateTime(t.lastAttemptAt) : "—"}
                    {t.attempts > 1 && <div className="text-xs text-slate-500">{t.attempts} attempts</div>}
                  </Td>
                  <Td>
                    <Badge tone={UNPAID_BADGE[t.state][0]}>{UNPAID_BADGE[t.state][1]}</Badge>
                    {t.failureReason && <div className="mt-1 text-xs text-slate-500 max-w-[220px]">{t.failureReason}</div>}
                  </Td>
                  <Td>
                    <Link href={`/thynkx/teacher/register-team?draft=${t.id}`} className="text-[#00BF62] hover:underline whitespace-nowrap">
                      Complete payment
                    </Link>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination {...unpaid.meta} onPage={setUnpaidPage} noun="teams" />
          </>
        )}
      </Card>

      <Card padded={false}>
        <div className="px-4 sm:px-5 pt-4 sm:pt-5">
          <h2 className="font-clash text-lg font-semibold">All transactions</h2>
        </div>
        <form
          className="grid grid-cols-1 sm:grid-cols-[1fr_170px_170px] gap-3 p-4 sm:p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(q.trim());
            setPage(1);
          }}
        >
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search payment ID or team ID" className="pl-10" />
          </div>
          <Select value={status} onChange={(e) => (setStatus(e.target.value), setPage(1))} aria-label="Status">
            <option value="">All statuses</option>
            <option value="CAPTURED">Success</option>
            <option value="FAILED">Failed</option>
            <option value="CREATED">Cancelled / not completed</option>
          </Select>
          <Select value={method} onChange={(e) => (setMethod(e.target.value), setPage(1))} aria-label="Method">
            <option value="">All methods</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Net banking</option>
            <option value="wallet">Wallet</option>
          </Select>
        </form>

        {!data ? (
          <LoadingBlock />
        ) : data.items.length === 0 ? (
          <EmptyState title="No transactions yet" />
        ) : (
          <>
            <Table head={["Payment ID", "Team / Draft", "Paid by", "Amount", "Method", "Date & time", "Status", "Action"]}>
              {data.items.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  <Td className="font-mono text-xs">{r.razorpayPaymentId ?? "—"}</Td>
                  <Td className="text-white">{r.team.teamCode ?? `Draft #${r.team.draftNo}`}</Td>
                  <Td>{SOURCE_LABEL[r.paidBy]}</Td>
                  <Td>{rupees(r.totalPaise)}</Td>
                  <Td>{r.method?.toUpperCase() ?? "—"}</Td>
                  <Td>{dateTime(r.capturedAt ?? r.createdAt)}</Td>
                  <Td>
                    <PaymentBadge status={r.status} />
                  </Td>
                  <Td>
                    {r.status === "CAPTURED" ? (
                      <button
                        onClick={() => download(`/teacher/teams/${r.team.id}/receipt.pdf`, `${r.team.teamCode}-receipt.pdf`).catch((e) => setError(errorMessage(e)))}
                        className="text-[#00BF62] hover:underline cursor-pointer"
                      >
                        Receipt
                      </button>
                    ) : r.team.canComplete ? (
                      <Link href={`/thynkx/teacher/register-team?draft=${r.team.id}`} className="text-[#00BF62] hover:underline whitespace-nowrap">
                        Complete payment
                      </Link>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination {...data.meta} onPage={setPage} noun="transactions" />
          </>
        )}
      </Card>
    </div>
  );
}
