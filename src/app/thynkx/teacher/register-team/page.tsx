"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { FiArrowLeft, FiArrowRight, FiDownload, FiPlus } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { TeamSchema, emptyStudent, toApiStudent } from "@/lib/schemas";
import { payWithRazorpay } from "@/lib/razorpay";
import { phone } from "@/lib/format";
import type { CheckoutOrder, PreviewResponse, Team } from "@/lib/types";
import { useTeacher } from "@/components/teacher/TeacherShell";
import StudentFields from "@/components/registration/StudentFields";
import { PaymentFailed, PaymentSuccess } from "@/components/registration/PaymentResult";
import { Alert, Button, ButtonLink, Card, Checkbox, FeeBreakdown, InfoRows, PageHeading, Stepper } from "@/components/registration/ui";

type TeamInput = z.input<typeof TeamSchema>;
type TeamOutput = z.output<typeof TeamSchema>;

/** Pay-first: the students stay in this form until payment succeeds — only then is the team created. */
type Stage =
  | { name: "students" }
  | { name: "review"; values: TeamOutput; preview: PreviewResponse }
  | { name: "success"; team: Team }
  | { name: "failed"; values: TeamOutput; reason: string; orderId: string; amount: number };

const STEPS = ["Students", "Review", "Payment", "Done"];

export default function RegisterTeamPage() {
  const { me } = useTeacher();
  const allowed = me.section === "SECONDARY" ? [8, 9, 10] : [11, 12];

  const [stage, setStage] = useState<Stage>({ name: "students" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamInput, unknown, TeamOutput>({
    resolver: zodResolver(TeamSchema),
    defaultValues: { students: [emptyStudent(), emptyStudent()] },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage.name]);

  const review = async (values: TeamOutput) => {
    setError("");
    setBusy(true);
    try {
      const preview = await api<PreviewResponse>("/teacher/teams/preview", { method: "POST", body: { students: values.students.map(toApiStudent) } });
      setStage({ name: "review", values, preview });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const pay = async (values: TeamOutput) => {
    setError("");
    setBusy(true);
    try {
      const order = await api<CheckoutOrder>("/teacher/teams/checkout", {
        method: "POST",
        body: { students: values.students.map(toApiStudent), termsAccepted: true },
      });
      const result = await payWithRazorpay(order);
      if (result.status === "success") {
        setStage({ name: "success", team: await api<Team>(`/teacher/teams/${result.teamId}`) });
      } else if (result.status === "failed") {
        setStage({ name: "failed", values, reason: result.reason, orderId: result.orderId, amount: result.amount });
      }
      // dismissed → stay on review
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const stepIndex = stage.name === "students" ? 0 : stage.name === "review" ? 1 : stage.name === "failed" ? 2 : 3;

  return (
    <div className="space-y-6 sm:space-y-8">
      <Stepper steps={STEPS} current={stepIndex} full />
      <div className="max-w-[900px] mx-auto space-y-6 sm:space-y-8">
        {stage.name !== "success" && stage.name !== "failed" && (
          <PageHeading
            title={stage.name === "students" ? undefined : "Review & pay"}
            subtitle={
              stage.name === "students"
                ? "A team has exactly 2 students from the same section. The team is created only after payment."
                : "Check details before paying — student names appear on certificates."
            }
          />
        )}
        {error && <Alert tone="error">{error}</Alert>}

        {stage.name === "students" && (
          <form onSubmit={handleSubmit(review)} className="space-y-6" noValidate>
            {[0, 1].map((i) => (
              <Card key={i} title={`Team member ${i + 1}`}>
                <StudentFields
                  reg={(f) => register(`students.${i as 0 | 1}.${f}`)}
                  errors={errors.students?.[i]}
                  allowedClasses={allowed}
                  parentHint="Confirmation and ticket are sent to your WhatsApp"
                />
              </Card>
            ))}
            <Alert tone="info">
              Both students must be from Classes {allowed.join(", ")} (your section). Duplicate students (same name + class + school) are flagged before payment.
            </Alert>
            <div className="flex justify-between gap-3">
              <ButtonLink href="/thynkx/teacher" variant="secondary">
                Cancel
              </ButtonLink>
              <Button type="submit" loading={busy}>
                Continue to review <FiArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {stage.name === "review" && (
          <div className="space-y-6">
            {stage.preview.duplicates.length > 0 && (
              <Alert tone="warning" title="Possible duplicate students">
                {stage.preview.duplicates.map((d) => (
                  <p key={d.fullName}>
                    {d.fullName} (Class {d.classLevel}) is already in team {d.teamCode}. Continue only if this is a different student.
                  </p>
                ))}
              </Alert>
            )}
            <Card title="School">
              <InfoRows
                rows={[
                  ["School", me.school.name],
                  ["School code", me.schoolCode],
                  ["Coordinator", me.fullName],
                ]}
              />
            </Card>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {stage.values.students.map((s, i) => (
                <Card
                  key={i}
                  title={`Team member ${i + 1}`}
                  action={
                    <Button variant="ghost" size="sm" onClick={() => setStage({ name: "students" })}>
                      Edit
                    </Button>
                  }
                >
                  <InfoRows
                    rows={[
                      ["Name", s.fullName],
                      ["Class / Division", `${s.classLevel} / ${s.division}`],
                      ["Age", String(s.age)],
                      ["Parent / Guardian", s.parentName],
                      ["Student / Parent mobile", phone(s.parentMobile)],
                    ]}
                  />
                </Card>
              ))}
            </div>
            <Card title="Registration fee">
              <FeeBreakdown fee={stage.preview.fee} />
            </Card>
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label="I confirm the student details are correct and agree to the ThynkX Terms."
            />
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
              <Button variant="secondary" onClick={() => setStage({ name: "students" })}>
                <FiArrowLeft className="w-4 h-4" /> Back to edit
              </Button>
              <div className="flex flex-col items-stretch sm:items-end gap-2">
                <Button size="lg" loading={busy} disabled={!agreed} onClick={() => pay(stage.values)}>
                  Pay with Razorpay <FiArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-slate-500 max-w-sm sm:text-right">
                  Secure Razorpay checkout (UPI, cards, net banking, wallets). The team is registered and its Team ID issued only after payment succeeds.
                </p>
              </div>
            </div>
          </div>
        )}

        {stage.name === "success" && (
          <PaymentSuccess
            team={stage.team}
            note="Confirmation and the program ticket have been sent to your WhatsApp."
            actions={
              <>
                <Button variant="secondary" onClick={() => download(`/teacher/teams/${stage.team.id}/receipt.pdf`, `${stage.team.teamCode}-receipt.pdf`)}>
                  <FiDownload className="w-4 h-4" /> Download receipt
                </Button>
                <ButtonLink href={`/thynkx/teacher/teams/${stage.team.id}`} variant="secondary">
                  View team
                </ButtonLink>
                <Button
                  onClick={() => {
                    setAgreed(false);
                    reset({ students: [emptyStudent(), emptyStudent()] });
                    setStage({ name: "students" });
                  }}
                >
                  <FiPlus className="w-4 h-4" /> Register another team
                </Button>
              </>
            }
          />
        )}

        {stage.name === "failed" && (
          <PaymentFailed
            summary={`${stage.values.students.map((s) => s.fullName).join(" + ")} (Class ${stage.values.students[0]?.classLevel} ${stage.values.students[0]?.division})`}
            amount={stage.amount}
            orderId={stage.orderId}
            reason={stage.reason}
            note="No team was created and nothing was charged. The student details are still filled in — retry now, or go back and edit them."
            actions={
              <>
                <Button variant="secondary" onClick={() => setStage({ name: "students" })}>
                  Edit details
                </Button>
                <Button loading={busy} onClick={() => pay(stage.values)}>
                  Retry payment
                </Button>
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
