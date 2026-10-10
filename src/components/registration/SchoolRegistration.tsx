"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FiSearch, FiPlus, FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { api, ApiError, errorMessage } from "@/lib/api";
import { CoordinatorSchema, NewSchoolSchema, otp as otpSchema, type Coordinator, type CoordinatorInput, type NewSchool, type NewSchoolInput } from "@/lib/schemas";
import type { District, SchoolSearchResult, Section } from "@/lib/types";
import { BOARD_LABEL, SCHOOL_TYPE_LABEL, dateTime, phone } from "@/lib/format";
import { useCountdown } from "@/lib/hooks";
import { Alert, Badge, Button, ButtonLink, Card, Checkbox, CodeHighlight, CopyButton, Field, InfoRows, Input, OtpInput, PhoneInput, Select, Stepper } from "./ui";

const STEPS = ["School", "Coordinator", "Review", "Verify OTP", "Done"];

const SECTIONS: { value: Section; title: string; classes: string }[] = [
  { value: "SECONDARY", title: "Secondary", classes: "Classes 8, 9, 10" },
  { value: "HIGHER_SECONDARY", title: "Higher Secondary", classes: "Classes 11, 12" },
];

type SchoolChoice = { mode: "existing"; school: SchoolSearchResult } | { mode: "new"; school: NewSchool };

type Done = {
  coordinator: { fullName: string; email: string | null; mobile: string; sectionLabel: string };
  school: { name: string; address: string; district: string; pincode: string };
  schoolCode: string;
  studentLink: string;
  registeredAt: string;
};

export default function SchoolRegistration() {
  const [step, setStep] = useState(0);
  const [districts, setDistricts] = useState<District[]>([]);
  const [school, setSchool] = useState<SchoolChoice | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [coordinator, setCoordinator] = useState<Coordinator | null>(null);
  const [registrationId, setRegistrationId] = useState<string | undefined>();
  const [done, setDone] = useState<Done | null>(null);

  useEffect(() => {
    api<District[]>("/public/districts").then(setDistricts).catch(() => undefined);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, addingNew]);

  const districtName = (id: number) => districts.find((d) => d.id === id)?.name ?? "";

  return (
    <div className="space-y-6 sm:space-y-8">
      {step < 4 && (
        <div className="space-y-3">
          <h1 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight">
            Register your school for <span className="text-[#00BF62]">ThynkX 2026</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Each school can have up to 2 coordinators — one for Secondary (Classes 8, 9, 10) and one for Higher Secondary (Classes 11, 12).
          </p>
        </div>
      )}
      <Stepper steps={STEPS} current={step} />

      {step === 0 && !addingNew && (
        <FindSchool
          districts={districts}
          onSelect={(s) => {
            setSchool({ mode: "existing", school: s });
            setStep(1);
          }}
          onAddNew={() => setAddingNew(true)}
        />
      )}

      {step === 0 && addingNew && (
        <NewSchoolForm
          districts={districts}
          initial={school?.mode === "new" ? school.school : undefined}
          onBack={() => setAddingNew(false)}
          onSubmit={(s) => {
            setSchool({ mode: "new", school: s });
            setStep(1);
          }}
        />
      )}

      {step === 1 && school && (
        <CoordinatorForm
          school={school}
          districtName={districtName}
          initial={coordinator ?? undefined}
          onChangeSchool={() => {
            setAddingNew(school.mode === "new");
            setStep(0);
          }}
          onSubmit={(c) => {
            setCoordinator(c);
            setStep(2);
          }}
        />
      )}

      {step === 2 && school && coordinator && (
        <Review
          school={school}
          coordinator={coordinator}
          districtName={districtName}
          registrationId={registrationId}
          onEditSchool={() => {
            setAddingNew(school.mode === "new");
            setStep(0);
          }}
          onEditCoordinator={() => setStep(1)}
          onSent={(id) => {
            setRegistrationId(id);
            setStep(3);
          }}
        />
      )}

      {step === 3 && coordinator && (
        <VerifyOtp
          mobile={coordinator.mobile}
          onEdit={() => setStep(1)}
          onVerified={(d) => {
            setDone(d);
            setStep(4);
          }}
        />
      )}

      {step === 4 && done && <Success done={done} />}
    </div>
  );
}

// ─── Step 1: find school ─────────────────────────────

function slotBadge(label: string, slot: SchoolSearchResult["sections"][Section]) {
  if (slot.status === "OPEN") return <Badge tone="green">{label}: Open</Badge>;
  if (slot.status === "IN_PROGRESS") return <Badge tone="amber">{label}: In progress</Badge>;
  if (slot.status === "UNAVAILABLE") return <Badge tone="gray">{label}: Unavailable</Badge>;
  return <Badge tone="gray">{label}: Taken</Badge>;
}

function FindSchool({ districts, onSelect, onAddNew }: { districts: District[]; onSelect: (s: SchoolSearchResult) => void; onAddNew: () => void }) {
  const [q, setQ] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [results, setResults] = useState<SchoolSearchResult[] | null>(null);
  const [searched, setSearched] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (q.trim().length < 2) return setError("Type at least 2 characters of the school name.");
    setError("");
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: q.trim(), ...(districtId ? { districtId } : {}) });
      setResults(await api<SchoolSearchResult[]>(`/public/schools?${params}`));
      setSearched(q.trim());
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Find your school">
      <p className="text-sm text-slate-400 -mt-2 mb-5">Search first — if your school is already registered by another coordinator, you can join for the other section.</p>
      <form onSubmit={search} className="grid grid-cols-1 sm:grid-cols-[1fr_200px_auto] gap-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="School name or pincode" aria-label="Search school" />
        <Select value={districtId} onChange={(e) => setDistrictId(e.target.value)} aria-label="District">
          <option value="">All districts</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
        <Button type="submit" loading={loading}>
          <FiSearch className="w-4 h-4" /> Search
        </Button>
      </form>
      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      {results && (
        <div className="mt-6 space-y-3">
          <p className="text-xs text-slate-400">
            {results.length} school{results.length === 1 ? "" : "s"} found for “{searched}”
          </p>
          {results.map((s) => {
            const open = s.sections.SECONDARY.status === "OPEN" || s.sections.HIGHER_SECONDARY.status === "OPEN";
            const takenBy = (["SECONDARY", "HIGHER_SECONDARY"] as Section[])
              .map((sec) => s.sections[sec].coordinatorName && `${sec === "SECONDARY" ? "Secondary" : "Higher Secondary"} coordinator: ${s.sections[sec].coordinatorName}`)
              .filter(Boolean)
              .join(" · ");
            return (
              <div key={s.id} className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="font-semibold text-white">{s.name}</p>
                  <p className="text-xs text-slate-400">
                    {s.address}, {s.district} · {s.pincode}
                    {takenBy ? ` · ${takenBy}` : " · No coordinators yet"}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {slotBadge("Secondary 8–10", s.sections.SECONDARY)}
                    {slotBadge("Higher Sec. 11–12", s.sections.HIGHER_SECONDARY)}
                  </div>
                </div>
                {open ? (
                  <Button variant="secondary" size="sm" onClick={() => onSelect(s)}>
                    Select
                  </Button>
                ) : (
                  <Badge>Full</Badge>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-sm text-slate-400">Can&apos;t find your school?</span>
        <Button variant="secondary" onClick={onAddNew}>
          <FiPlus className="w-4 h-4" /> Register a new school
        </Button>
      </div>
    </Card>
  );
}

// ─── Step 1b: new school ─────────────────────────────

function NewSchoolForm({ districts, initial, onBack, onSubmit }: { districts: District[]; initial?: NewSchool; onBack: () => void; onSubmit: (s: NewSchool) => void }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewSchoolInput, unknown, NewSchool>({
    resolver: zodResolver(NewSchoolSchema),
    defaultValues: initial
      ? { ...initial, districtId: String(initial.districtId) }
      : { name: "", address: "", districtId: "", pincode: "", principalName: "", principalPhone: "", email: "", landline: "" },
  });
  const [formError, setFormError] = useState("");

  // Block duplicates early: same school name in the district, or a principal number already used by another school.
  const submit = async (s: NewSchool) => {
    setFormError("");
    try {
      await api("/registration/check-school", { method: "POST", body: { name: s.name, districtId: s.districtId, principalPhone: s.principalPhone } });
      onSubmit(s);
    } catch (e) {
      const fields = e instanceof ApiError ? e.fields : {};
      if (fields.name) setError("name", { message: fields.name }, { shouldFocus: true });
      if (fields.principalPhone) setError("principalPhone", { message: fields.principalPhone }, { shouldFocus: !fields.name });
      if (!fields.name && !fields.principalPhone) setFormError(errorMessage(e));
    }
  };

  return (
    <Card title="New school details">
      <p className="text-sm text-slate-400 -mt-2 mb-6">This school is not in our list yet. Add its details once — the second coordinator will find it in search.</p>
      <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" noValidate>
        <Field label="School name" required error={errors.name?.message} className="sm:col-span-2">
          <Input {...register("name")} invalid={!!errors.name} />
        </Field>
        <Field label="School address" required error={errors.address?.message} className="sm:col-span-2">
          <Input {...register("address")} invalid={!!errors.address} />
        </Field>
        <Field label="District" required error={errors.districtId?.message}>
          <Select {...register("districtId")} invalid={!!errors.districtId}>
            <option value="">Select</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Pincode" required error={errors.pincode?.message}>
          <Input {...register("pincode")} inputMode="numeric" maxLength={6} invalid={!!errors.pincode} />
        </Field>
        <Field label="Board / Syllabus" required error={errors.board?.message}>
          <Select {...register("board")} defaultValue="" invalid={!!errors.board}>
            <option value="" disabled>
              Select
            </option>
            {Object.entries(BOARD_LABEL).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="School type" required error={errors.type?.message}>
          <Select {...register("type")} defaultValue="" invalid={!!errors.type}>
            <option value="" disabled>
              Select
            </option>
            {Object.entries(SCHOOL_TYPE_LABEL).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Principal / Headmaster name" required error={errors.principalName?.message}>
          <Input {...register("principalName")} invalid={!!errors.principalName} />
        </Field>
        <Field label="Principal / Headmaster contact" required error={errors.principalPhone?.message}>
          <PhoneInput {...register("principalPhone")} invalid={!!errors.principalPhone} />
        </Field>
        <Field label="School email (optional)" error={errors.email?.message}>
          <Input type="email" {...register("email")} invalid={!!errors.email} />
        </Field>
        <Field label="School landline (optional)" error={errors.landline?.message}>
          <Input {...register("landline")} inputMode="tel" />
        </Field>
        {formError && <Alert tone="error" className="sm:col-span-2">{formError}</Alert>}
        <div className="sm:col-span-2 flex justify-between gap-3 pt-3">
          <Button type="button" variant="secondary" onClick={onBack}>
            <FiArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Continue <FiArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}

// ─── Step 2: section + coordinator ───────────────────

function schoolSummary(school: SchoolChoice, districtName: (id: number) => string) {
  return school.mode === "existing"
    ? { name: school.school.name, line: `${school.school.address}, ${school.school.district} · ${school.school.pincode}` }
    : { name: school.school.name, line: `${school.school.address}, ${districtName(school.school.districtId)} · ${school.school.pincode}` };
}

function CoordinatorForm({
  school,
  districtName,
  initial,
  onChangeSchool,
  onSubmit,
}: {
  school: SchoolChoice;
  districtName: (id: number) => string;
  initial?: Coordinator;
  onChangeSchool: () => void;
  onSubmit: (c: Coordinator) => void;
}) {
  const slots = school.mode === "existing" ? school.school.sections : null;
  const isOpen = (s: Section) => !slots || slots[s].status === "OPEN";
  const firstOpen = SECTIONS.find((s) => isOpen(s.value))?.value;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CoordinatorInput, unknown, Coordinator>({
    resolver: zodResolver(CoordinatorSchema),
    defaultValues: initial ?? { section: firstOpen, fullName: "", designation: "", email: "", mobile: "" },
  });
  const section = watch("section");
  const summary = schoolSummary(school, districtName);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-white">{summary.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{summary.line}</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={onChangeSchool}>
            Change school
          </Button>
        </div>
      </Card>

      <Card title="Choose your section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SECTIONS.map((s) => {
            const open = isOpen(s.value);
            const slot = slots?.[s.value];
            return (
              <label
                key={s.value}
                className={clsx(
                  "relative flex items-start gap-3 rounded-2xl border p-4 transition-colors",
                  open ? "cursor-pointer" : "opacity-50 cursor-not-allowed",
                  section === s.value ? "border-[#00BF62] bg-[#00BF62]/[0.07]" : "border-white/10 bg-black/30 hover:border-white/25",
                )}
              >
                <input type="radio" value={s.value} disabled={!open} {...register("section")} className="mt-1 accent-[#00BF62]" />
                <div className="flex-1">
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-xs text-slate-400">{s.classes}</p>
                </div>
                {open ? (
                  <Badge tone="green">Available</Badge>
                ) : (
                  <Badge>{slot?.coordinatorName ? `Taken by ${slot.coordinatorName}` : slot?.status === "IN_PROGRESS" ? "In progress" : "Taken"}</Badge>
                )}
              </label>
            );
          })}
        </div>
        {errors.section && <p className="mt-2 text-xs text-red-400">{errors.section.message}</p>}
      </Card>

      <Card title="Coordinator (teacher) details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="Full name" required error={errors.fullName?.message}>
            <Input {...register("fullName")} autoComplete="name" invalid={!!errors.fullName} />
          </Field>
          <Field label="Designation / Subject" required error={errors.designation?.message}>
            <Input {...register("designation")} placeholder="e.g. HST English" invalid={!!errors.designation} />
          </Field>
          <Field label="Email" error={errors.email?.message} hint="Optional — for email copies of confirmations & updates">
            <Input type="email" autoComplete="email" {...register("email")} invalid={!!errors.email} />
          </Field>
          <Field label="Mobile number" required error={errors.mobile?.message} hint="Must be on WhatsApp — used for OTP login & confirmations">
            <PhoneInput {...register("mobile")} invalid={!!errors.mobile} />
          </Field>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="secondary" onClick={onChangeSchool}>
          <FiArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button type="submit">
          Continue <FiArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}

// ─── Step 3: review + send OTP ───────────────────────

function Review({
  school,
  coordinator,
  districtName,
  registrationId,
  onEditSchool,
  onEditCoordinator,
  onSent,
}: {
  school: SchoolChoice;
  coordinator: Coordinator;
  districtName: (id: number) => string;
  registrationId?: string;
  onEditSchool: () => void;
  onEditCoordinator: () => void;
  onSent: (registrationId: string) => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; login?: boolean } | null>(null);

  const schoolRows: [string, string][] =
    school.mode === "existing"
      ? [
          ["School name", school.school.name],
          ["Address", school.school.address],
          ["District / Pincode", `${school.school.district} · ${school.school.pincode}`],
          ["Board", BOARD_LABEL[school.school.board as keyof typeof BOARD_LABEL] ?? school.school.board],
        ]
      : [
          ["School name", school.school.name],
          ["Address", school.school.address],
          ["District / Pincode", `${districtName(school.school.districtId)} · ${school.school.pincode}`],
          ["Board / Type", `${BOARD_LABEL[school.school.board]} · ${SCHOOL_TYPE_LABEL[school.school.type]}`],
          ["Principal", `${school.school.principalName} · ${phone(school.school.principalPhone)}`],
        ];

  const send = async () => {
    setError(null);
    setLoading(true);
    try {
      const body = {
        school: school.mode === "existing" ? { mode: "existing", schoolId: school.school.id } : { mode: "new", ...school.school },
        section: coordinator.section,
        coordinator: {
          fullName: coordinator.fullName,
          designation: coordinator.designation,
          email: coordinator.email || null,
          mobile: coordinator.mobile,
        },
        termsAccepted: true,
        replaceRegistrationId: registrationId,
      };
      const res = await api<{ registrationId: string }>("/registration/start", { method: "POST", body });
      onSent(res.registrationId);
    } catch (e) {
      const login = e instanceof ApiError && (e.details as { login?: boolean })?.login;
      setError({ message: errorMessage(e), login });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-clash text-xl sm:text-2xl font-semibold">Please verify your details</h2>
      <Card
        title="School details"
        action={
          <Button variant="ghost" size="sm" onClick={onEditSchool}>
            {school.mode === "existing" ? "Change school" : "Edit"}
          </Button>
        }
      >
        <InfoRows rows={schoolRows} />
        {school.mode === "existing" && (
          <p className="mt-3 text-xs text-slate-500">This school is already registered. Changes to school details can be requested from your dashboard after registration.</p>
        )}
      </Card>
      <Card
        title="Coordinator details"
        action={
          <Button variant="ghost" size="sm" onClick={onEditCoordinator}>
            Edit
          </Button>
        }
      >
        <InfoRows
          rows={[
            ["Name", coordinator.fullName],
            ["Designation", coordinator.designation],
            ["Section", SECTIONS.find((s) => s.value === coordinator.section)!.title + ` (${SECTIONS.find((s) => s.value === coordinator.section)!.classes})`],
            ["Email", coordinator.email || "—"],
            ["WhatsApp", phone(coordinator.mobile)],
          ]}
        />
      </Card>

      <Checkbox
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        label={
          <>
            I confirm the details are correct and agree to the ThynkX{" "}
            <Link href="/contact" className="text-[#00BF62] underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/contact" className="text-[#00BF62] underline">
              Privacy Policy
            </Link>
            .
          </>
        }
      />

      {error && (
        <Alert tone="error">
          {error.message}{" "}
          {error.login && (
            <Link href="/thynkx/login" className="underline font-semibold">
              Go to Teacher Login
            </Link>
          )}
        </Alert>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
        <Button variant="secondary" onClick={onEditCoordinator}>
          <FiArrowLeft className="w-4 h-4" /> Edit details
        </Button>
        <Button onClick={send} loading={loading} disabled={!agreed}>
          <FaWhatsapp className="w-4 h-4" /> Send OTP on WhatsApp to {phone(coordinator.mobile)}
        </Button>
      </div>
    </div>
  );
}

// ─── Step 4: verify OTP ──────────────────────────────

function VerifyOtp({ mobile, onEdit, onVerified }: { mobile: string; onEdit: () => void; onVerified: (d: Done) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useCountdown(30);

  const verify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const parsed = otpSchema.safeParse(code);
    if (!parsed.success) return setError(parsed.error.issues[0]!.message);
    setError("");
    setLoading(true);
    try {
      onVerified(await api<Done>("/registration/verify-otp", { method: "POST", body: { mobile, code } }));
    } catch (err) {
      setError(errorMessage(err));
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setError("");
    setInfo("");
    try {
      await api("/registration/resend-otp", { method: "POST", body: { mobile } });
      setInfo("A new OTP has been sent.");
      setLeft(30);
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <Card className="max-w-xl mx-auto text-center">
      <form onSubmit={verify} className="space-y-6 py-2">
        <div className="mx-auto w-14 h-14 rounded-full bg-[#00BF62]/10 border border-[#00BF62]/40 flex items-center justify-center">
          <FaWhatsapp className="w-6 h-6 text-[#00BF62]" />
        </div>
        <div>
          <h2 className="font-clash text-2xl font-semibold">Verify your mobile number</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter the 6-digit OTP sent on WhatsApp to <span className="text-white font-medium">{phone(mobile)}</span>
          </p>
        </div>
        <OtpInput value={code} onChange={setCode} invalid={!!error} autoFocus />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {info && <p className="text-sm text-[#00BF62]">{info}</p>}
        <Button type="submit" size="lg" full loading={loading} disabled={code.length !== 6}>
          Verify &amp; complete registration
        </Button>
        <p className="text-xs sm:text-sm text-slate-400">
          Didn&apos;t get it?{" "}
          {left > 0 ? (
            <span>Resend OTP (in 0:{String(left).padStart(2, "0")})</span>
          ) : (
            <button type="button" onClick={resend} className="text-[#00BF62] font-semibold hover:underline cursor-pointer">
              Resend OTP
            </button>
          )}{" "}
          ·{" "}
          <button type="button" onClick={onEdit} className="text-slate-200 hover:text-[#00BF62] underline cursor-pointer">
            Wrong number? Edit
          </button>
        </p>
        <p className="text-xs text-slate-500">OTP valid for 5 minutes · max 3 attempts</p>
      </form>
    </Card>
  );
}

// ─── Step 5: success ─────────────────────────────────

function Success({ done }: { done: Done }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 pt-2">
        <FiCheckCircle className="w-14 h-14 mx-auto text-[#00BF62] drop-shadow-[0_0_20px_rgba(0,191,98,0.6)]" />
        <h1 className="font-clash text-3xl sm:text-4xl font-bold">Registration successful!</h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          {done.school.name} is registered for ThynkX 2026. You are the coordinator for the {done.coordinator.sectionLabel} section.
        </p>
      </div>

      <CodeHighlight label="Your unique school code" value={done.schoolCode} />

      <Card>
        <InfoRows
          rows={[
            ["School", done.school.name],
            ["Section", done.coordinator.sectionLabel],
            ["Coordinator", `${done.coordinator.fullName} · ${done.coordinator.email ?? phone(done.coordinator.mobile)}`],
            ["Registered on", dateTime(done.registeredAt)],
          ]}
        />
      </Card>

      <Card title="Student registration link">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
          <code className="flex-1 text-sm text-[#00BF62] break-all">{done.studentLink}</code>
          <CopyButton value={done.studentLink} label="Copy link" />
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Share the code or link with students of your section. Teams they register (and pay for) appear automatically in your dashboard. The code and link were also sent to your WhatsApp
          {done.coordinator.email ? " and email" : ""}.
        </p>
      </Card>

      <div className="flex justify-center">
        <ButtonLink href="/thynkx/teacher" size="lg">
          Go to my dashboard <FiArrowRight className="w-4 h-4" />
        </ButtonLink>
      </div>
    </div>
  );
}
