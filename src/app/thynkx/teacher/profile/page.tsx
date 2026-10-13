"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaWhatsapp } from "react-icons/fa";
import { api, errorMessage } from "@/lib/api";
import { BOARD_LABEL, SCHOOL_TYPE_LABEL, phone } from "@/lib/format";
import { CoordinatorSchema, mobile as mobileSchema } from "@/lib/schemas";
import { useCountdown } from "@/lib/hooks";
import { useTeacher } from "@/components/teacher/TeacherShell";
import ShareCard from "@/components/teacher/ShareCard";
import { Alert, Button, Card, Checkbox, Field, InfoRows, Input, LoadingBlock, OtpInput, PhoneInput, TextArea } from "@/components/registration/ui";

type Profile = {
  school: { name: string; address: string; district: string; pincode: string; board: keyof typeof BOARD_LABEL; type: keyof typeof SCHOOL_TYPE_LABEL; principalName: string; principalPhone: string; baseCode: string };
  me: { fullName: string; designation: string; email: string | null; mobile: string; section: string; sectionLabel: string };
  otherCoordinator: { fullName: string; sectionLabel: string; schoolCode: string } | null;
  schoolCode: string;
  studentLink: string;
  acceptSelfRegistration: boolean;
};

const EditSchema = CoordinatorSchema.pick({ fullName: true, designation: true, email: true });
type EditIn = z.input<typeof EditSchema>;
type EditOut = z.output<typeof EditSchema>;

export default function ProfilePage() {
  const { reload } = useTeacher();
  const [data, setData] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [changingMobile, setChangingMobile] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const load = useCallback(() => api<Profile>("/teacher/profile").then(setData), []);
  useEffect(() => {
    load().catch((e) => setNotice({ tone: "error", text: errorMessage(e) }));
  }, [load]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditIn, unknown, EditOut>({ resolver: zodResolver(EditSchema) });

  if (!data) return notice ? <Alert tone="error">{notice.text}</Alert> : <LoadingBlock />;

  const save = async (v: EditOut) => {
    try {
      await api("/teacher/profile", { method: "PATCH", body: { ...v, email: v.email || null } });
      await Promise.all([load(), reload()]);
      setEditing(false);
      setNotice({ tone: "success", text: "Profile updated." });
    } catch (e) {
      setNotice({ tone: "error", text: errorMessage(e) });
    }
  };

  const toggleSelfReg = async (accept: boolean) => {
    try {
      await api("/teacher/self-registration", { method: "PATCH", body: { accept } });
      setData({ ...data, acceptSelfRegistration: accept });
    } catch (e) {
      setNotice({ tone: "error", text: errorMessage(e) });
    }
  };

  const sendChangeRequest = async () => {
    try {
      await api("/teacher/school-change-request", { method: "POST", body: { message } });
      setRequesting(false);
      setMessage("");
      setNotice({ tone: "success", text: "Your request was sent to the ThynkX team." });
    } catch (e) {
      setNotice({ tone: "error", text: errorMessage(e) });
    }
  };

  return (
    <div className="space-y-6">
      {notice && <Alert tone={notice.tone}>{notice.text}</Alert>}

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card
          title="School details"
          action={
            <Button variant="ghost" size="sm" onClick={() => setRequesting((r) => !r)}>
              Request change
            </Button>
          }
        >
          <InfoRows
            rows={[
              ["School name", data.school.name],
              ["Address", `${data.school.address}, ${data.school.district} ${data.school.pincode}`],
              ["Board / Type", `${BOARD_LABEL[data.school.board]} · ${SCHOOL_TYPE_LABEL[data.school.type]}`],
              ["Principal", `${data.school.principalName} · ${phone(data.school.principalPhone)}`],
              ["Base code", data.school.baseCode],
            ]}
          />
          {requesting && (
            <div className="mt-5 space-y-3">
              <Field label="What should be changed?">
                <TextArea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Principal name should be …" />
              </Field>
              <Button size="sm" disabled={message.trim().length < 10} onClick={sendChangeRequest}>
                Send request
              </Button>
            </div>
          )}
        </Card>

        <Card
          title="My Profile"
          action={
            !editing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  reset({ fullName: data.me.fullName, designation: data.me.designation, email: data.me.email ?? "" });
                  setChangingMobile(false);
                  setEditing(true);
                }}
              >
                Edit
              </Button>
            )
          }
        >
          {editing ? (
            <form onSubmit={handleSubmit(save)} className="space-y-4" noValidate>
              <Field label="Full name" required error={errors.fullName?.message}>
                <Input {...register("fullName")} invalid={!!errors.fullName} />
              </Field>
              <Field label="Designation / Subject" required error={errors.designation?.message}>
                <Input {...register("designation")} invalid={!!errors.designation} />
              </Field>
              <Field label="Email" error={errors.email?.message} hint="Optional — contact email (all ThynkX messages come on WhatsApp)">
                <Input type="email" autoComplete="email" {...register("email")} invalid={!!errors.email} placeholder="you@school.in" />
              </Field>
              <p className="text-xs text-slate-500">To change your WhatsApp login number, use &ldquo;Change&rdquo; next to it on your profile.</p>
              <div className="flex gap-3">
                <Button type="submit" size="sm" loading={isSubmitting}>
                  Save
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <InfoRows
                rows={[
                  ["Name", data.me.fullName],
                  ["Designation", data.me.designation],
                  ["Section", data.me.sectionLabel],
                  ["Email", data.me.email ?? "—"],
                  [
                    "WhatsApp (login)",
                    <span key="m" className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
                      {phone(data.me.mobile)}
                      {!changingMobile && (
                        <button type="button" onClick={() => setChangingMobile(true)} className="text-[#00BF62] text-xs font-semibold hover:underline cursor-pointer">
                          Change
                        </button>
                      )}
                    </span>,
                  ],
                ]}
              />
              {changingMobile && (
                <ChangeWhatsApp
                  current={data.me.mobile}
                  onCancel={() => setChangingMobile(false)}
                  onChanged={async (m) => {
                    setChangingMobile(false);
                    await Promise.all([load(), reload()]);
                    setNotice({ tone: "success", text: `Your WhatsApp number is now ${phone(m)}. Use it to log in next time.` });
                  }}
                />
              )}
            </>
          )}
        </Card>

        <Card title="Other coordinator at this school">
          {data.otherCoordinator ? (
            <InfoRows
              rows={[
                ["Name", data.otherCoordinator.fullName],
                ["Section", data.otherCoordinator.sectionLabel],
                ["School code", data.otherCoordinator.schoolCode],
              ]}
            />
          ) : (
            <p className="text-sm text-slate-400">The other section has no coordinator yet. Another teacher can register for it by searching this school.</p>
          )}
          <p className="mt-4 text-xs text-slate-500">Each coordinator sees only their own section&apos;s teams and payments.</p>
        </Card>

        <Card title="School code & student link">
          <ShareCard schoolCode={data.schoolCode} link={data.studentLink} schoolName={data.school.name} sectionLabel={data.me.sectionLabel} />
          <div className="mt-5 pt-5 border-t border-white/10">
            <Checkbox checked={data.acceptSelfRegistration} onChange={(e) => toggleSelfReg(e.target.checked)} label="Accept student self-registrations via link" />
          </div>
        </Card>
      </div>
    </div>
  );
}

/** Change the WhatsApp (login) number: send an OTP to the new number, then verify it. */
function ChangeWhatsApp({ current, onCancel, onChanged }: { current: string; onCancel: () => void; onChanged: (mobile: string) => void }) {
  const [stage, setStage] = useState<"number" | "otp">("number");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useCountdown(0);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const parsed = mobileSchema.safeParse(mobile);
    if (!parsed.success) return setError(parsed.error.issues[0]!.message);
    if (parsed.data === current) return setError("This is already your WhatsApp number.");
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await api("/teacher/profile/mobile/otp", { method: "POST", body: { mobile: parsed.data } });
      setMobile(parsed.data);
      if (stage === "otp") setInfo("A new OTP has been sent.");
      setStage("otp");
      setCode("");
      setLeft(30);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api("/teacher/profile/mobile/verify", { method: "POST", body: { mobile, code } });
      onChanged(mobile);
    } catch (err) {
      setError(errorMessage(err));
      setCode("");
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 pt-5 border-t border-white/10">
      {stage === "number" ? (
        <form onSubmit={send} className="space-y-4" noValidate>
          <Field label="New WhatsApp number" required error={error} hint="We'll send a 6-digit OTP to this number on WhatsApp. It becomes your login number.">
            <PhoneInput autoFocus value={mobile} onChange={(e) => setMobile(e.target.value)} invalid={!!error} placeholder="98765 43210" />
          </Field>
          <div className="flex gap-3">
            <Button type="submit" size="sm" loading={loading}>
              <FaWhatsapp className="w-4 h-4" /> Send OTP
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-4" noValidate>
          <p className="text-sm text-slate-400">
            Enter the 6-digit OTP sent on WhatsApp to <span className="text-white font-medium">{phone(mobile)}</span>
          </p>
          <OtpInput value={code} onChange={setCode} invalid={!!error} autoFocus />
          {error && <p className="text-sm text-red-400">{error}</p>}
          {info && <p className="text-sm text-[#00BF62]">{info}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="sm" loading={loading} disabled={code.length !== 6}>
              Verify &amp; update
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => { setStage("number"); setError(""); setInfo(""); }}>
              Change number
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            {left > 0 ? (
              <>Resend OTP in {left}s</>
            ) : (
              <button type="button" onClick={() => send()} className="text-[#00BF62] font-semibold hover:underline cursor-pointer">
                Resend OTP
              </button>
            )}{" "}
            · valid for 5 minutes · max 3 attempts
          </p>
        </form>
      )}
    </div>
  );
}
