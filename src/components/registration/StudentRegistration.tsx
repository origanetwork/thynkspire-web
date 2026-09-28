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
import type { CheckoutOrder, DraftResponse, Fee, PublicSettings, Section, Team } from "@/lib/types";
import StudentFields from "./StudentFields";
import { PaymentFailed } from "./PaymentResult";
import { Alert, Button, Card, Checkbox, CodeHighlight, CopyButton, FeeBreakdown, Field, InfoRows, Input, PhoneInput } from "./ui";

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

const draftKey = "thx_student_draft";

export default function StudentRegistration() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(params.get("code")?.toUpperCase() ?? "");
  const [info, setInfo] = useState<SchoolInfo | null>(null);
  const [fee, setFee] = useState<Fee | null>(null);
  const [draft, setDraft] = useState<{ id: string; token: string } | null>(null);
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
    defaultValues: { students: [emptyStudent(), emptyStudent()], contactEmail: "", contactMobile: "", terms: false as unknown as true },
    mode: "onTouched",
  });

  useEffect(() => {
    api<PublicSettings>("/public/settings").then((s) => setFee(s.fee)).catch(() => undefined);
    try {
      const saved = sessionStorage.getItem(draftKey);
      if (saved) setDraft(JSON.parse(saved));
    } catch {
      /* storage unavailable */
    }
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
      const body = { students: v.students.map(toApiStudent), contactEmail: v.contactEmail, contactMobile: v.contactMobile, termsAccepted: true };
      let current = draft;
      if (current) {
        await api<DraftResponse>(`/public/teams/${current.id}`, { method: "PUT", body, token: current.token }).catch(() => (current = null));
      }
      if (!current) {
        const res = await api<DraftResponse>("/public/teams", { method: "POST", body: { ...body, schoolCode: info.schoolCode } });
        current = { id: res.team.id, token: res.token! };
        setDraft(current);
        try {
          sessionStorage.setItem(draftKey, JSON.stringify(current));
        } catch {
          /* ignore */
        }
      }
      setStep(4);
      const order = await api<CheckoutOrder>(`/public/teams/${current.id}/checkout`, { method: "POST", token: current.token });
      const pay = await payWithRazorpay(order);
      if (pay.status === "success") {
        const team = await api<Team>(`/public/teams/${current.id}`, { token: current.token });
        setResult({ kind: "success", team });
        try {
          sessionStorage.removeItem(draftKey);
        } catch {
          /* ignore */
        }
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

  // ── Result screens ──
  if (result?.kind === "success" && draft) {
    const t = result.team;
    return (
      <div className="space-y-6">
        <MiniStepper step={5} />
        <div className="text-center space-y-2">
          <FiCheckCircle className="w-14 h-14 mx-auto text-[#00BF62] drop-shadow-[0_0_20px_rgba(0,191,98,0.6)]" />
          <h1 className="font-clash text-2xl font-bold">Registration successful!</h1>
          <p className="text-sm text-slate-400">Your team is registered for ThynkX 2026.</p>
        </div>
        <CodeHighlight label="Your Team ID" value={t.teamCode ?? ""}>
          <CopyButton value={t.teamCode ?? ""} label="Copy Team ID" />
        </CodeHighlight>
        <Card>
          <InfoRows
            rows={[
              ["School", t.school.name],
              ...t.students.map((s): [string, string] => [`Student ${s.position}`, `${s.fullName} (${s.classLevel} ${s.division})`]),
              ["Paid", `${rupees(t.payment?.totalPaise ?? 0)}${t.payment?.method ? ` · ${t.payment.method.toUpperCase()}` : ""}`],
              ["Date", dateTime(t.confirmedAt)],
            ]}
          />
          <p className="mt-4 text-sm text-slate-400">
            Details were sent to <b className="text-white">{t.contactEmail}</b> and WhatsApp {phone(t.contactMobile)}. There is no student login — please save this Team ID.
          </p>
        </Card>
        <div className="grid gap-3">
          <Button variant="secondary" full onClick={() => download(`/public/teams/${t.id}/confirmation.pdf`, `${t.teamCode}.pdf`, { token: draft.token }).catch((e) => setError(errorMessage(e)))}>
            <FiDownload className="w-4 h-4" /> Download confirmation
          </Button>
          <Button
            full
            onClick={() => {
              setResult(null);
              setDraft(null);
              reset({ students: [emptyStudent(), emptyStudent()], contactEmail: getValues("contactEmail"), contactMobile: getValues("contactMobile"), terms: false as unknown as true });
              setStep(1);
            }}
          >
            Register another team
          </Button>
        </div>
        {error && <Alert tone="error">{error}</Alert>}
      </div>
    );
  }

  if (result?.kind === "failed") {
    const [a, b] = getValues("students");
    return (
      <div className="space-y-6">
        <MiniStepper step={4} />
        <PaymentFailed
          summary={`${a.fullName} + ${b.fullName}`}
          amount={result.amount}
          orderId={result.orderId}
          reason={result.reason}
          note="Your details are saved on this device. You can retry the payment now."
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
        />
      </div>
    );
  }

  const [s1, s2] = watch("students");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {step > 0 && step < 4 && (
          <button onClick={() => setStep((s) => s - 1)} className="p-2 -ml-2 text-slate-300 hover:text-[#00BF62] cursor-pointer" aria-label="Back">
            <FiArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1">
          <MiniStepper step={step} />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-6">
          <div>
            <h1 className="font-clash text-2xl sm:text-3xl font-bold">Student Team Registration</h1>
            <p className="mt-2 text-sm text-slate-400">Register a team of 2 students. No account or login needed.</p>
          </div>
          <Card>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                lookup();
              }}
              className="space-y-4"
            >
              <Field label="School code" required hint="Pre-filled from your teacher's link. You can also type it.">
                <div className="flex gap-2">
                  <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="THX-ERK-004821-S" className="font-mono uppercase" />
                  <Button type="submit" variant="secondary" loading={busy}>
                    Verify
                  </Button>
                </div>
              </Field>
            </form>
            {info && (
              <div className="mt-5 rounded-2xl border border-[#00BF62]/40 bg-[#00BF62]/[0.06] p-4 space-y-3">
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
          </Card>
          {error && <Alert tone="error">{error}</Alert>}
          <Button full size="lg" disabled={!info} onClick={() => setStep(1)}>
            Continue <FiArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {(step === 1 || step === 2) && info && (
        <div className="space-y-6">
          <div>
            <h1 className="font-clash text-2xl font-bold">Team member {step}</h1>
            <p className="mt-1 text-sm text-slate-400">Details of the {step === 1 ? "first" : "second"} student</p>
          </div>
          <Card>
            <StudentFields
              key={step}
              reg={(f) => register(`students.${(step - 1) as 0 | 1}.${f}`)}
              errors={errors.students?.[step - 1]}
              allowedClasses={info.allowedClasses}
              showGender={false}
            />
          </Card>
          {step === 2 && <Alert tone="info">Both members must be from the same school section.</Alert>}
          {error && <Alert tone="error">{error}</Alert>}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              <FiArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button onClick={next}>
              Continue <FiArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {step >= 3 && info && (
        <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
          <h1 className="font-clash text-2xl font-bold">Review your team</h1>
          <Card
            title="School"
            action={
              <Button type="button" variant="ghost" size="sm" onClick={() => setStep(0)}>
                Edit
              </Button>
            }
          >
            <InfoRows
              rows={[
                ["School", `${info.school.name}, ${info.school.district}`],
                ["Code", info.schoolCode],
              ]}
            />
          </Card>
          {[s1, s2].map((s, i) => (
            <Card
              key={i}
              title={`Member ${i + 1}`}
              action={
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(i + 1)}>
                  Edit
                </Button>
              }
            >
              <InfoRows
                rows={[
                  ["Name", s.fullName],
                  ["Class", `${s.classLevel} ${s.division}`],
                  ["Age", String(s.age)],
                  ["Parent", s.parentName],
                ]}
              />
            </Card>
          ))}

          <Card title="Your contact details">
            <p className="-mt-2 mb-4 text-xs text-slate-400">We send the Team ID and payment receipt here.</p>
            <div className="space-y-4">
              <Field label="Email" required error={errors.contactEmail?.message}>
                <Input type="email" autoComplete="email" {...register("contactEmail")} invalid={!!errors.contactEmail} />
              </Field>
              <Field label="WhatsApp number" required error={errors.contactMobile?.message}>
                <PhoneInput {...register("contactMobile")} invalid={!!errors.contactMobile} />
              </Field>
            </div>
          </Card>

          {fee && (
            <Card title="Registration fee">
              <FeeBreakdown fee={fee} />
            </Card>
          )}

          <Checkbox {...register("terms")} error={errors.terms?.message} label="I confirm the details are correct and agree to the Terms." />
          {errors.students && <Alert tone="error">Some student details are incomplete. Please edit the members above.</Alert>}
          {error && <Alert tone="error">{error}</Alert>}

          <Button type="submit" full size="lg" loading={busy}>
            {fee ? `Pay ${rupees(fee.totalPaise)}` : "Pay"} <FiArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-center text-xs text-slate-500">Your team is registered only after payment succeeds.</p>
        </form>
      )}
    </div>
  );
}
