"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiUsers } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { api, errorMessage } from "@/lib/api";
import { mobile as mobileSchema } from "@/lib/schemas";
import { phone } from "@/lib/format";
import { useCountdown } from "@/lib/hooks";
import { Button, ButtonLink, Field, LoadingBlock, OtpInput, PhoneInput } from "./ui";

export default function TeacherLogin() {
  const router = useRouter();
  const [stage, setStage] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useCountdown(0);
  const [checking, setChecking] = useState(true);

  // Already logged in (valid teacher cookie) → skip the login form and go straight to the dashboard.
  useEffect(() => {
    let active = true;
    api("/auth/teacher/me")
      .then(() => active && router.replace("/thynkx/teacher"))
      .catch(() => active && setChecking(false));
    return () => {
      active = false;
    };
  }, [router]);

  const sendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const parsed = mobileSchema.safeParse(mobile);
    if (!parsed.success) return setError(parsed.error.issues[0]!.message);
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await api("/auth/teacher/otp", { method: "POST", body: { mobile: parsed.data } });
      setMobile(parsed.data);
      setStage("otp");
      setCode("");
      setLeft(30);
      if (stage === "otp") setInfo("A new OTP has been sent.");
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
      await api("/auth/teacher/verify", { method: "POST", body: { mobile, code } });
      router.replace("/thynkx/teacher");
    } catch (err) {
      setError(errorMessage(err));
      setCode("");
      setLoading(false);
    }
  };

  if (checking) return <LoadingBlock />;

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="relative hidden lg:block h-[520px] rounded-[28px] overflow-hidden border border-white/10">
        <Image src="/thynkx/hero.gif" alt="ThynkX quiz event" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="font-clash text-3xl font-bold leading-tight">
            India&apos;s Biggest <span className="text-[#00BF62]">Quizzing Event.</span>
          </p>
          <p className="mt-2 text-sm text-slate-300">Manage your school&apos;s teams, students and payments in one place.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {stage === "mobile" ? (
            <form onSubmit={sendOtp} className="space-y-6" noValidate>
              <div>
                <h1 className="font-clash text-3xl font-bold">Teacher Login</h1>
                <p className="mt-2 text-sm text-slate-400">Access your school&apos;s ThynkX dashboard</p>
              </div>
              <Field label="Registered mobile number" required error={error} hint="We'll send a 6-digit OTP to this number on WhatsApp">
                <PhoneInput autoFocus value={mobile} onChange={(e) => setMobile(e.target.value)} invalid={!!error} placeholder="98765 43210" />
              </Field>
              <Button type="submit" size="lg" full loading={loading}>
                <FaWhatsapp className="w-4 h-4" /> Send OTP on WhatsApp
              </Button>
              <div className="pt-4 border-t border-white/10 text-sm text-slate-400">
                <p>
                  New to ThynkX?{" "}
                  <Link href="/thynkx/school-registration" className="text-[#00BF62] font-semibold hover:underline">
                    Register your school
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-6 text-center" noValidate>
              <button type="button" onClick={() => setStage("mobile")} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#00BF62] cursor-pointer">
                <FiArrowLeft className="w-4 h-4" /> Back to login
              </button>
              <div>
                <h1 className="font-clash text-3xl font-bold">Verify OTP</h1>
                <p className="mt-2 text-sm text-slate-400">
                  We&apos;ve sent a 6-digit OTP on WhatsApp to <span className="text-white font-medium">{phone(mobile)}</span>
                </p>
              </div>
              <OtpInput value={code} onChange={setCode} invalid={!!error} autoFocus />
              {error && <p className="text-sm text-red-400">{error}</p>}
              {info && <p className="text-sm text-[#00BF62]">{info}</p>}
              <Button type="submit" size="lg" full loading={loading} disabled={code.length !== 6}>
                Verify &amp; login <FiArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-sm text-slate-400">
                {left > 0 ? (
                  <>Resend OTP (available in {left} seconds)</>
                ) : (
                  <button type="button" onClick={() => sendOtp()} className="text-[#00BF62] font-semibold hover:underline cursor-pointer">
                    Resend OTP
                  </button>
                )}
              </p>
              <p className="text-xs text-slate-500">OTP valid for 5 minutes · max 3 attempts</p>
            </form>
          )}
        </div>

        {/* Student registration — students don't log in, they register with the school code from their teacher */}
        <section className="rounded-[24px] border border-[#00BF62]/30 bg-[#00BF62]/[0.06] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#00BF62]/15 border border-[#00BF62]/40 text-[#00BF62] flex items-center justify-center">
              <FiUsers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-clash text-lg font-semibold text-white">Are you a student?</h2>
              <p className="mt-1 text-sm text-slate-400">Register your team with the school code from your teacher.</p>
            </div>
          </div>
          <ButtonLink href="/thynkx/register" className="shrink-0">
            Register your team <FiArrowRight className="w-4 h-4" />
          </ButtonLink>
        </section>
      </div>
    </div>
  );
}
