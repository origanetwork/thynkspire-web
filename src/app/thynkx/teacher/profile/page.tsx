"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api, errorMessage } from "@/lib/api";
import { BOARD_LABEL, SCHOOL_TYPE_LABEL, phone } from "@/lib/format";
import { CoordinatorSchema } from "@/lib/schemas";
import { useTeacher } from "@/components/teacher/TeacherShell";
import ShareCard from "@/components/teacher/ShareCard";
import { Alert, Button, Card, Checkbox, Field, InfoRows, Input, LoadingBlock, PageHeading, PhoneInput, TextArea } from "@/components/registration/ui";

type Profile = {
  school: { name: string; address: string; district: string; pincode: string; board: keyof typeof BOARD_LABEL; type: keyof typeof SCHOOL_TYPE_LABEL; principalName: string; principalPhone: string; baseCode: string };
  me: { fullName: string; designation: string; email: string; mobile: string; whatsappOptIn: boolean; section: string; sectionLabel: string };
  otherCoordinator: { fullName: string; sectionLabel: string; schoolCode: string } | null;
  schoolCode: string;
  studentLink: string;
  acceptSelfRegistration: boolean;
};

const EditSchema = CoordinatorSchema.pick({ fullName: true, designation: true, mobile: true, whatsappOptIn: true });
type EditIn = z.input<typeof EditSchema>;
type EditOut = z.output<typeof EditSchema>;

export default function ProfilePage() {
  const { reload } = useTeacher();
  const [data, setData] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
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
      await api("/teacher/profile", { method: "PATCH", body: v });
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
      <PageHeading title="School Profile" />
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
          title="My coordinator profile"
          action={
            !editing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  reset({ fullName: data.me.fullName, designation: data.me.designation, mobile: data.me.mobile, whatsappOptIn: data.me.whatsappOptIn });
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
              <Field label="Mobile" required error={errors.mobile?.message}>
                <PhoneInput {...register("mobile")} invalid={!!errors.mobile} />
              </Field>
              <Checkbox {...register("whatsappOptIn")} label="Send me WhatsApp updates" />
              <p className="text-xs text-slate-500">To change your login email, please contact support@thynkspire.com.</p>
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
            <InfoRows
              rows={[
                ["Name", data.me.fullName],
                ["Designation", data.me.designation],
                ["Section", data.me.sectionLabel],
                ["Email (login)", data.me.email],
                ["Mobile", `${phone(data.me.mobile)}${data.me.whatsappOptIn ? " · WhatsApp" : ""}`],
              ]}
            />
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
