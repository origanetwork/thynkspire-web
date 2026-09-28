"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { api, errorMessage } from "@/lib/api";
import { email as emailSchema } from "@/lib/schemas";
import { useCountdown } from "@/lib/hooks";
import { Button, Field, Input, OtpInput } from "./ui";

export default function TeacherLogin() {
  const router = useRouter();
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useCountdown(0);

  const sendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) return setError(parsed.error.issues[0]!.message);
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await api("/auth/teacher/otp", { method: "POST", body: { email: parsed.data } });
      setEmail(parsed.data);
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
      await api("/auth/teacher/verify", { method: "POST", body: { email, code } });
      router.replace("/thynkx/teacher");
    } catch (err) {
      setError(errorMessage(err));
      setCode("");
      setLoading(false);
    }
  };

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

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {stage === "email" ? (
          <form onSubmit={sendOtp} className="space-y-6" noValidate>
            <div>
              <h1 className="font-clash text-3xl font-bold">Teacher Login</h1>
              <p className="mt-2 text-sm text-slate-400">Access your school&apos;s ThynkX dashboard</p>
            </div>
            <Field label="Registered email" required error={error}>
              <Input type="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!error} placeholder="you@school.in" />
            </Field>
            <Button type="submit" size="lg" full loading={loading}>
              Send OTP <FiArrowRight className="w-4 h-4" />
            </Button>
            <div className="pt-4 border-t border-white/10 space-y-2 text-sm text-slate-400">
              <p>
                New to ThynkX?{" "}
                <Link href="/thynkx/school-registration" className="text-[#00BF62] font-semibold hover:underline">
                  Register your school
                </Link>
              </p>
              <p>
                Student?{" "}
                <Link href="/thynkx/register" className="text-[#00BF62] font-semibold hover:underline">
                  Register your team with a school code
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={verify} className="space-y-6 text-center" noValidate>
            <button type="button" onClick={() => setStage("email")} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#00BF62] cursor-pointer">
              <FiArrowLeft className="w-4 h-4" /> Back to login
            </button>
            <div>
              <h1 className="font-clash text-3xl font-bold">Verify OTP</h1>
              <p className="mt-2 text-sm text-slate-400">
                We&apos;ve sent a 6-digit OTP to <span className="text-white font-medium">{email}</span>
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
    </div>
  );
}
