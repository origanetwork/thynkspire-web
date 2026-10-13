"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { SOURCE_LABEL, dateTime, rupees } from "@/lib/format";
import type { Paged, PaymentStatus, TeamSource } from "@/lib/types";
import { Alert, Card, EmptyState, Input, LoadingBlock, Pagination, PaymentBadge, Select, Table, Td } from "@/components/registration/ui";

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
  /** null when the payment did not succeed — a team is created only after a captured payment */
  team: { id: string; teamCode: string | null } | null;
  students: { fullName: string; classLevel: number; division: string }[];
};

export default function PaymentsPage() {
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paged<Row> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "10" });
    if (search) params.set("q", search);
    if (status) params.set("status", status);
    if (method) params.set("method", method);
    api<Paged<Row>>(`/teacher/payments?${params}`)
      .then(setData)
      .catch((e) => setError(errorMessage(e)));
  }, [search, status, method, page]);

  return (
    <div className="space-y-6">
      {error && <Alert tone="error">{error}</Alert>}

      <Card padded={false}>
        <div className="px-4 sm:px-5 pt-4 sm:pt-5">
          <h2 className="font-clash text-lg font-semibold">All transactions</h2>
          <p className="mt-1 text-sm text-slate-400">A team is registered only when its payment succeeds — failed or cancelled attempts don&apos;t create a team.</p>
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
            <option value="CREATED">Cancelled</option>
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
            <Table head={["Sl. No.", "Payment ID", "Team", "Paid by", "Amount", "Method", "Date & time", "Status", "Action"]}>
              {data.items.map((r, i) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  <Td className="text-slate-500">{(data.meta.page - 1) * data.meta.pageSize + i + 1}</Td>
                  <Td className="font-mono text-xs">{r.razorpayPaymentId ?? "—"}</Td>
                  <Td>
                    {r.team ? (
                      <Link href={`/thynkx/teacher/teams/${r.team.id}`} className="text-[#00BF62] hover:underline">
                        {r.team.teamCode}
                      </Link>
                    ) : (
                      <>
                        <span className="text-slate-400">Not registered</span>
                        {r.students.length > 0 && <div className="text-xs text-slate-500">{r.students.map((st) => st.fullName).join(" + ")}</div>}
                      </>
                    )}
                  </Td>
                  <Td>{SOURCE_LABEL[r.paidBy]}</Td>
                  <Td>{rupees(r.totalPaise)}</Td>
                  <Td>{r.method?.toUpperCase() ?? "—"}</Td>
                  <Td>{dateTime(r.capturedAt ?? r.createdAt)}</Td>
                  <Td>
                    <PaymentBadge status={r.status} />
                    {r.status !== "CAPTURED" && r.failureReason && <div className="mt-1 text-xs text-slate-500 max-w-[220px]">{r.failureReason}</div>}
                  </Td>
                  <Td>
                    {r.status === "CAPTURED" && r.team ? (
                      <button
                        onClick={() => download(`/teacher/teams/${r.team!.id}/receipt.pdf`, `${r.team!.teamCode}-receipt.pdf`).catch((e) => setError(errorMessage(e)))}
                        className="text-[#00BF62] hover:underline cursor-pointer"
                      >
                        Receipt
                      </button>
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
