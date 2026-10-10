"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { FiArrowLeft, FiArrowRight, FiCheck, FiCheckCircle, FiDownload } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { ContactSchema, TeamSchema, emptyStudent, toApiStudent } from "@/lib/schemas";
import { payWithRazorpay } from "@/lib/razorpay";
import { dateTime, phone, rupees } from "@/lib/format";
import type { CheckoutOrder, Fee, PublicSettings, Section, Team } from "@/lib/types";
import StudentFields from "./StudentFields";
import { PaymentFailed } from "./PaymentResult";
import { Alert, Button, Checkbox, CodeHighlight, CopyButton, FeeBreakdown, Field, InfoRows, Input, PhoneInput } from "./ui";

type SchoolInfo = {
  schoolCode: string;
  school: { name: string; district: string; address: string };
  section: Section;
  sectionLabel: string;
  allowedClasses: number[];
  coordinatorName: string;
};

const FormSchema = TeamSchema.and(ContactSchema).and(z.object({ terms: z.literal(true, { error: "Please confirm the details and accept the terms." }) }));
type FormIn = z.input<typeof FormSchema>;
type FormOut = z.output<typeof FormSchema>;

const STEP_LABELS = ["School code", "Member 1", "Member 2", "Review", "Payment"];

function MiniStepper({ step }: { step: number }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">
        Step {Math.min(step + 1, 5)} of 5 · <span className="text-white">{STEP_LABELS[Math.min(step, 4)]}</span>
      </p>
      <div className="flex gap-1.5">
        {STEP_LABELS.map((l, i) => (
          <span key={l} className={clsx("h-1.5 flex-1 rounded-full", i < step ? "bg-[#00BF62]" : i === step ? "bg-[#00BF62]/60" : "bg-white/10")} />
        ))}
      </div>
    </div>
  );
}

export default function StudentRegistration() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(params.get("code")?.toUpperCase() ?? "");
  const [info, setInfo] = useState<SchoolInfo | null>(null);
  const [fee, setFee] = useState<Fee | null>(null);
  /** Token from checkout — lets this browser read the team (and its confirmation PDF) once payment creates it. */
  const [token, setToken] = useState<string | null>(null);
  const [result, setResult] = useState<{ kind: "success"; team: Team } | { kind: "failed"; reason: string; orderId: string; amount: number } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(FormSchema),
    defaultValues: { students: [emptyStudent(), emptyStudent()], contactMobile: "", terms: false as unknown as true },
    mode: "onTouched",
  });

  useEffect(() => {
    api<PublicSettings>("/public/settings").then((s) => setFee(s.fee)).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (params.get("code")) lookup(params.get("code")!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, result]);

  async function lookup(value = code) {
    setError("");
    setInfo(null);
    if (!value.trim()) return setError("Enter the school code from your teacher.");
    setBusy(true);
    try {
      setInfo(await api<SchoolInfo>(`/public/school-code/${encodeURIComponent(value.trim().toUpperCase())}`));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  const next = async () => {
    setError("");
    if (step === 1 && !(await trigger("students.0"))) return;
    if (step === 2) {
      if (!(await trigger("students.1"))) return;
      const [a, b] = getValues("students");
      if (a.classLevel && b.classLevel && info && ![a.classLevel, b.classLevel].every((c) => info.allowedClasses.includes(Number(c)))) {
        return setError(`Both members must be from Classes ${info.allowedClasses.join(", ")}.`);
      }
    }
    setStep((s) => s + 1);
  };

  const submit = async (v: FormOut) => {
    if (!info) return;
    setError("");
    setBusy(true);
    try {
      // Pay-first: nothing is saved until the payment is captured — then the server creates the team.
      const body = { schoolCode: info.schoolCode, students: v.students.map(toApiStudent), contactMobile: v.contactMobile, termsAccepted: true };
      setStep(4);
      const order = await api<CheckoutOrder>("/public/teams/checkout", { method: "POST", body });
      const pay = await payWithRazorpay(order);
      if (pay.status === "success") {
        const team = await api<Team>(`/public/teams/${pay.teamId}`, { token: order.token });
        setToken(order.token ?? null);
        setResult({ kind: "success", team });
      } else if (pay.status === "failed") {
        setResult({ kind: "failed", reason: pay.reason, orderId: pay.orderId, amount: pay.amount });
      } else {
        setStep(3);
      }
    } catch (e) {
      setError(errorMessage(e));
      setStep(3);
    } finally {
      setBusy(false);
    }
  };

  // ── Layout pieces ──
  const STEP_HEAD: [string, string][] = [
    ["Enter your school code", "Use the code or link your teacher shared. No account or login needed."],
    ["Team member 1", "Details of the first student, as they should appear on the certificate."],
    ["Team member 2", "Details of the second student — both must be from the same section."],
    ["Review & pay", "Check the details, add your WhatsApp number and pay to register the team."],
    ["Complete the payment", "Finish the payment in the Razorpay window."],
  ];
  const doneSteps = result?.kind === "success" ? 5 : step;
  const canJump = (i: number) => !busy && !result && i < step && i <= 3;

  const aside = (
    <aside className="hidden lg:block">
      <div className="sticky top-6 space-y-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#00BF62]">THYNKX 2026</p>
          <h1 className="mt-1 font-clash text-2xl font-bold leading-tight">Student Team Registration</h1>
          <p className="mt-1.5 text-sm text-slate-400">A team of 2 students · no login needed</p>
        </div>

        <ol className="rounded-[20px] border border-white/10 bg-white/[0.04] p-2">
          {STEP_LABELS.map((label, i) => {
            const done = i < doneSteps;
            const active = i === doneSteps;
            return (
              <li key={label}>
                <button
                  type="button"
                  disabled={!canJump(i)}
                  onClick={() => (setError(""), setStep(i))}
                  className={clsx(
                    "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    active && "bg-[#00BF62]/10 text-white",
                    canJump(i) ? "cursor-pointer hover:bg-white/5" : "cursor-default",
                  )}
                >
                  <span
                    className={clsx(
                      "w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold border",
                      done && "bg-[#00BF62] border-[#00BF62] text-black",
                      active && "border-[#00BF62] text-[#00BF62]",
                      !done && !active && "border-white/15 text-slate-500",
                    )}
                  >
                    {done ? <FiCheck className="w-3.5 h-3.5" /> : i + 1}
                  </span>
                  <span className={clsx(active ? "font-semibold" : done ? "text-slate-300" : "text-slate-500")}>{label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {info && step > 0 && (
          <div className="rounded-[20px] border border-[#00BF62]/30 bg-[#00BF62]/[0.06] p-4 text-sm">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#00BF62]">
              <FiCheck className="w-3.5 h-3.5" /> School verified
            </p>
            <p className="mt-2 font-semibold text-white leading-snug">{info.school.name}</p>
            <p className="mt-0.5 text-slate-400">
              {info.school.district} · {info.sectionLabel}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Coordinator: <span className="text-slate-200">{info.coordinatorName}</span> · Classes {info.allowedClasses.join(", ")}
            </p>
          </div>
        )}

        {fee && (
          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-slate-400">Team fee ({fee.studentCount} students)</span>
              <span className="font-clash text-xl font-bold text-[#00BF62] tabular-nums">{rupees(fee.totalPaise)}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {rupees(fee.totalPerStudentPaise)} per student · the team is registered only after payment succeeds
            </p>
          </div>
        )}
      </div>
    </aside>
  );

  /** Right-hand panel: step header, body and an action bar that stays inside the card. */
  const panel = (opts: { eyebrow?: string; title: string; subtitle?: string; body: React.ReactNode; footer?: React.ReactNode }) => (
    <section className="rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="px-5 sm:px-8 pt-5 sm:pt-7">
        {opts.eyebrow && <p className="hidden lg:block text-xs text-slate-400">{opts.eyebrow}</p>}
        <h2 className="lg:mt-1 font-clash text-xl sm:text-2xl font-semibold">{opts.title}</h2>
        {opts.subtitle && <p className="mt-1 text-sm text-slate-400">{opts.subtitle}</p>}
      </div>
      <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">{opts.body}</div>
      {opts.footer && <div className="px-5 sm:px-8 py-4 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">{opts.footer}</div>}
    </section>
  );

  const frame = (content: React.ReactNode) => (
    <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
      {aside}
      <div className="min-w-0 space-y-4">
        {/* Mobile: compact progress + school instead of the side panel */}
        <div className="lg:hidden space-y-3">
          <MiniStepper step={doneSteps} />
          {info && step > 0 && !result && (
            <p className="text-xs text-slate-400 truncate">
              <FiCheck className="inline w-3.5 h-3.5 text-[#00BF62] -mt-0.5" /> {info.school.name} · {info.sectionLabel}
            </p>
          )}
        </div>
        {content}
      </div>
    </div>
  );

  const backBtn = (
    <Button type="button" variant="secondary" onClick={() => (setError(""), setStep((s) => s - 1))}>
      <FiArrowLeft className="w-4 h-4" /> Back
    </Button>
  );

  // ── Result screens ──
  if (result?.kind === "success" && token) {
    const t = result.team;
    return frame(
      panel({
        title: "Registration successful!",
        subtitle: "Your team is registered for ThynkX 2026. There is no student login — please save this Team ID.",
        body: (
          <>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="w-10 h-10 shrink-0 text-[#00BF62] drop-shadow-[0_0_20px_rgba(0,191,98,0.6)]" />
              <p className="text-sm text-slate-300">
                The confirmation and your program ticket were sent on WhatsApp to <b className="text-white">{phone(t.contactMobile)}</b>.
              </p>
            </div>
            <CodeHighlight label="Your Team ID" value={t.teamCode ?? ""}>
              <CopyButton value={t.teamCode ?? ""} label="Copy Team ID" />
            </CodeHighlight>
            <div className="grid sm:grid-cols-2 gap-x-8">
              <InfoRows
                rows={[
                  ["School", t.school.name],
                  ["Date", dateTime(t.confirmedAt)],
                ]}
              />
              <InfoRows
                rows={[
                  ...t.students.map((s): [string, string] => [`Student ${s.position}`, `${s.fullName} (${s.classLevel} ${s.division})`]),
                  ["Paid", `${rupees(t.payment?.totalPaise ?? 0)}${t.payment?.method ? ` · ${t.payment.method.toUpperCase()}` : ""}`],
                ]}
              />
            </div>
            {error && <Alert tone="error">{error}</Alert>}
          </>
        ),
        footer: (
          <>
            <Button variant="secondary" onClick={() => download(`/public/teams/${t.id}/confirmation.pdf`, `${t.teamCode}.pdf`, { token }).catch((e) => setError(errorMessage(e)))}>
              <FiDownload className="w-4 h-4" /> Download confirmation
            </Button>
            <Button
              onClick={() => {
                setResult(null);
                setToken(null);
                reset({ students: [emptyStudent(), emptyStudent()], contactMobile: getValues("contactMobile"), terms: false as unknown as true });
                setStep(1);
              }}
            >
              Register another team
            </Button>
          </>
        ),
      }),
    );
  }

  if (result?.kind === "failed") {
    const [a, b] = getValues("students");
    return frame(
      <PaymentFailed
        summary={`${a.fullName} + ${b.fullName}`}
        amount={result.amount}
        orderId={result.orderId}
        reason={result.reason}
        note="No team was registered and nothing was charged. Your details are still filled in — you can retry the payment now."
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setResult(null);
                setStep(3);
              }}
            >
              Edit details
            </Button>
            <Button
              loading={busy}
              onClick={() => {
                setResult(null);
                handleSubmit(submit)();
              }}
            >
              Retry payment
            </Button>
          </>
        }
      />,
    );
  }

  const [s1, s2] = watch("students");
  const eyebrow = `Step ${Math.min(step + 1, 5)} of 5`;

  // ── Step 1: school code ──
  if (step === 0)
    return frame(
      panel({
        eyebrow,
        title: STEP_HEAD[0][0],
        subtitle: STEP_HEAD[0][1],
        body: (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                lookup();
              }}
            >
              <Field label="School code" required hint="Pre-filled from your teacher's link. You can also type it.">
                <div className="flex gap-2">
                  <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="THX-MLP-123-S" className="font-mono uppercase" />
                  <Button type="submit" variant="secondary" loading={busy}>
                    Verify
                  </Button>
                </div>
              </Field>
            </form>
            {info && (
              <div className="rounded-2xl border border-[#00BF62]/40 bg-[#00BF62]/[0.06] p-4 space-y-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#00BF62]">
                  <FiCheck className="w-4 h-4" /> School code verified
                </p>
                <InfoRows
                  rows={[
                    ["School", info.school.name],
                    ["Location", `${info.school.district}, Kerala`],
                    ["Section", info.sectionLabel],
                    ["Coordinator", info.coordinatorName],
                  ]}
                />
                <p className="text-xs text-slate-400">
                  Only Classes {info.allowedClasses.join(", ")} can register with this code.
                  {info.section === "SECONDARY" ? " Classes 11–12 need the Higher Secondary code." : " Classes 8–10 need the Secondary code."}
                </p>
              </div>
            )}
            {error && <Alert tone="error">{error}</Alert>}
          </>
        ),
        footer: (
          <>
            <span className="hidden sm:block text-xs text-slate-500">Next: details of the two students</span>
            <Button disabled={!info} onClick={() => setStep(1)}>
              Continue <FiArrowRight className="w-4 h-4" />
            </Button>
          </>
        ),
      }),
    );

  // ── Steps 2–3: team members ──
  if ((step === 1 || step === 2) && info)
    return frame(
      panel({
        eyebrow,
        title: STEP_HEAD[step][0],
        subtitle: STEP_HEAD[step][1],
        body: (
          <>
            <StudentFields
              key={step}
              reg={(f) => register(`students.${(step - 1) as 0 | 1}.${f}`)}
              errors={errors.students?.[step - 1]}
              allowedClasses={info.allowedClasses}
              showGender={false}
              wide
            />
            {error && <Alert tone="error">{error}</Alert>}
          </>
        ),
        footer: (
          <>
            {backBtn}
            <Button onClick={next}>
              {step === 1 ? "Next: member 2" : "Review team"} <FiArrowRight className="w-4 h-4" />
            </Button>
          </>
        ),
      }),
    );

  // ── Steps 4–5: review & pay ──
  if (step >= 3 && info)
    return frame(
      <form onSubmit={handleSubmit(submit)} noValidate>
        {panel({
          eyebrow,
          title: STEP_HEAD[Math.min(step, 4)][0],
          subtitle: STEP_HEAD[Math.min(step, 4)][1],
          body: (
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-5 lg:gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">Team</p>
                  <span className="text-xs text-slate-400 truncate">
                    {info.school.name} · <span className="font-mono">{info.schoolCode}</span>
                  </span>
                </div>
                {[s1, s2].map((s, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Member {i + 1}</p>
                        <p className="mt-0.5 font-semibold text-white truncate">{s.fullName || "—"}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          Class {s.classLevel} {s.division} · Age {s.age} · {s.parentName}
                        </p>
                      </div>
                      <button type="button" onClick={() => setStep(i + 1)} className="text-xs font-semibold text-[#00BF62] hover:underline cursor-pointer shrink-0">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                {errors.students && <Alert tone="error">Some student details are incomplete. Please edit the members above.</Alert>}
              </div>

              <div className="space-y-4">
                <Field label="Your WhatsApp number" required error={errors.contactMobile?.message} hint="We send the confirmation and your program ticket here.">
                  <PhoneInput {...register("contactMobile")} invalid={!!errors.contactMobile} />
                </Field>
                {fee && (
                  <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                    <FeeBreakdown fee={fee} />
                  </div>
                )}
                <Checkbox {...register("terms")} error={errors.terms?.message} label="I confirm the details are correct and agree to the Terms." />
              </div>
              {error && (
                <div className="lg:col-span-2">
                  <Alert tone="error">{error}</Alert>
                </div>
              )}
            </div>
          ),
          footer: (
            <>
              {backBtn}
              <div className="flex flex-col sm:items-end gap-1">
                <Button type="submit" size="lg" loading={busy}>
                  {fee ? `Pay ${rupees(fee.totalPaise)}` : "Pay"} <FiArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-slate-500">Secure Razorpay checkout · registered only after payment</p>
              </div>
            </>
          ),
        })}
      </form>,
    );

  return null;
}
