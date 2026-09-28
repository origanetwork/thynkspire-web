"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { FiArrowLeft, FiArrowRight, FiDownload, FiPlus } from "react-icons/fi";
import { api, download, errorMessage } from "@/lib/api";
import { TeamSchema, emptyStudent, fromApiStudent, toApiStudent } from "@/lib/schemas";
import { payWithRazorpay } from "@/lib/razorpay";
import { maskPhone } from "@/lib/format";
import type { CheckoutOrder, DraftResponse, Team } from "@/lib/types";
import { useTeacher } from "@/components/teacher/TeacherShell";
import StudentFields from "@/components/registration/StudentFields";
import { PaymentFailed, PaymentSuccess } from "@/components/registration/PaymentResult";
import { Alert, Button, ButtonLink, Card, Checkbox, FeeBreakdown, InfoRows, LoadingBlock, PageHeading, Stepper } from "@/components/registration/ui";

type TeamInput = z.input<typeof TeamSchema>;
type TeamOutput = z.output<typeof TeamSchema>;

type Stage =
  | { name: "students" }
  | { name: "review"; draft: DraftResponse }
  | { name: "success"; team: Team }
  | { name: "failed"; draft: DraftResponse; reason: string; orderId: string; amount: number };

const STEPS = ["Students", "Review", "Payment", "Done"];

function RegisterTeam() {
  const { me } = useTeacher();
  const router = useRouter();
  const params = useSearchParams();
  const draftId = params.get("draft");
  const allowed = me.section === "SECONDARY" ? [8, 9, 10] : [11, 12];

  const [stage, setStage] = useState<Stage>({ name: "students" });
  const [teamId, setTeamId] = useState<string | null>(draftId);
  const [loadingDraft, setLoadingDraft] = useState(!!draftId);
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

  // Resume a pending draft from the dashboard / payments page
  useEffect(() => {
    if (!draftId) return;
    api<Team>(`/teacher/teams/${draftId}`)
      .then((team) => {
        if (team.status === "CONFIRMED") return router.replace(`/thynkx/teacher/teams/${team.id}`);
        reset({ students: [fromApiStudent(team.students[0]!), fromApiStudent(team.students[1]!)] });
        setAgreed(team.termsAccepted);
        return api<{ fee: DraftResponse["fee"] }>("/public/settings").then((s) => setStage({ name: "review", draft: { team, duplicates: [], fee: s.fee } }));
      })
      .catch((e) => setError(errorMessage(e)))
      .finally(() => setLoadingDraft(false));
  }, [draftId, reset, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage.name]);

  const saveDraft = async (values: TeamOutput) => {
    setError("");
    setBusy(true);
    try {
      const body = { students: values.students.map(toApiStudent), termsAccepted: agreed };
      const draft = teamId
        ? await api<DraftResponse>(`/teacher/teams/${teamId}`, { method: "PUT", body })
        : await api<DraftResponse>("/teacher/teams", { method: "POST", body });
      setTeamId(draft.team.id);
      setStage({ name: "review", draft });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const pay = async (draft: DraftResponse) => {
    setError("");
    setBusy(true);
    try {
      await api(`/teacher/teams/${draft.team.id}/terms`, { method: "PATCH", body: { termsAccepted: true } });
      const order = await api<CheckoutOrder>(`/teacher/teams/${draft.team.id}/checkout`, { method: "POST" });
      const result = await payWithRazorpay(order);
      if (result.status === "success") {
        setStage({ name: "success", team: await api<Team>(`/teacher/teams/${result.teamId}`) });
      } else if (result.status === "failed") {
        setStage({ name: "failed", draft, reason: result.reason, orderId: result.orderId, amount: result.amount });
      }
      // dismissed → stay on review
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  if (loadingDraft) return <LoadingBlock label="Loading draft…" />;

  const stepIndex = stage.name === "students" ? 0 : stage.name === "review" ? 1 : stage.name === "failed" ? 2 : 3;

  return (
    <div className="max-w-[900px] space-y-6 sm:space-y-8">
      {stage.name !== "success" && stage.name !== "failed" && (
        <PageHeading
          title={stage.name === "students" ? "Register a new team" : "Review & pay"}
          subtitle={
            stage.name === "students"
              ? "A team has exactly 2 students from the same section. The team is created only after payment."
              : "Check details before paying — student names appear on certificates."
          }
        />
      )}
      <Stepper steps={STEPS} current={stepIndex} />
      {error && <Alert tone="error">{error}</Alert>}

      {stage.name === "students" && (
        <form onSubmit={handleSubmit(saveDraft)} className="space-y-6" noValidate>
          {[0, 1].map((i) => (
            <Card key={i} title={`Team member ${i + 1}`}>
              <StudentFields
                reg={(f) => register(`students.${i as 0 | 1}.${f}`)}
                errors={errors.students?.[i]}
                allowedClasses={allowed}
                parentHint="Confirmation is sent to your email & WhatsApp"
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
          {stage.draft.duplicates.length > 0 && (
            <Alert tone="warning" title="Possible duplicate students">
              {stage.draft.duplicates.map((d) => (
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
            {stage.draft.team.students.map((s) => (
              <Card
                key={s.id}
                title={`Team member ${s.position}`}
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
                    ["Parent mobile", maskPhone(s.parentMobile)],
                  ]}
                />
              </Card>
            ))}
          </div>
          <Card title="Registration fee">
            <FeeBreakdown fee={stage.draft.fee} />
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
              <Button size="lg" loading={busy} disabled={!agreed} onClick={() => pay(stage.draft)}>
                Pay with Razorpay <FiArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-slate-500 max-w-sm sm:text-right">
                Secure Razorpay checkout (UPI, cards, net banking, wallets). The Team ID is generated after payment succeeds.
              </p>
            </div>
          </div>
        </div>
      )}

      {stage.name === "success" && (
        <PaymentSuccess
          team={stage.team}
          note="Confirmation with the receipt has been sent to your email and WhatsApp."
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
                  setTeamId(null);
                  setAgreed(false);
                  reset({ students: [emptyStudent(), emptyStudent()] });
                  router.replace("/thynkx/teacher/register-team");
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
          summary={`${stage.draft.team.students.map((s) => s.fullName).join(" + ")} (Class ${stage.draft.team.students[0]?.classLevel} ${stage.draft.team.students[0]?.division})`}
          amount={stage.amount}
          orderId={stage.orderId}
          reason={stage.reason}
          note={
            <>
              We saved the student details as a draft. You can retry within 48 hours from{" "}
              <Link href="/thynkx/teacher" className="text-[#00BF62] underline">
                Dashboard → Pending payment
              </Link>
              .
            </>
          }
          actions={
            <>
              <ButtonLink href="/thynkx/teacher" variant="secondary">
                Go to dashboard
              </ButtonLink>
              <Button loading={busy} onClick={() => pay(stage.draft)}>
                Retry payment
              </Button>
            </>
          }
        />
      )}
    </div>
  );
}

export default function RegisterTeamPage() {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <RegisterTeam />
    </Suspense>
  );
}
