"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiHome, FiUsers, FiLogIn } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";
import { api } from "@/lib/api";
import { dateOnly, rupeesShort } from "@/lib/format";
import type { PublicSettings } from "@/lib/types";

const STEPS = [
  { title: "Teacher registers the school", body: "Coordinator adds school + own details and picks a section. Max 2 coordinators per school." },
  { title: "Gets a school code", body: "A unique code + student registration link is generated for that coordinator." },
  { title: "Teams of 2 are registered", body: "By the teacher from the dashboard, or by students using the link + code." },
  { title: "Pay to confirm", body: "Registration fee paid online via Razorpay. Team ID is issued only after payment." },
];

const CARDS = [
  {
    icon: FiHome,
    title: "Teacher / School Registration",
    body: "Register your school and become the ThynkX coordinator for the Secondary or Higher Secondary section.",
    cta: "Register school",
    href: "/thynkx/school-registration",
    primary: true,
  },
  {
    icon: FiUsers,
    title: "Student Registration",
    body: "Have a school code or link from your teacher? Register your team of two and pay online. No login needed.",
    cta: "Register a team",
    href: "/thynkx/register",
  },
  {
    icon: FiLogIn,
    title: "Teacher Login",
    body: "Already registered? Log in with your mobile number (WhatsApp OTP) to manage teams, students and payments.",
    cta: "Login with OTP",
    href: "/thynkx/login",
  },
];

export default function RegistrationSection() {
  const [settings, setSettings] = useState<PublicSettings | null>(null);

  useEffect(() => {
    api<PublicSettings>("/public/settings").then(setSettings).catch(() => undefined);
  }, []);

  const facts = [
    ["Eligibility", "Classes 8 – 12"],
    ["Team size", "2 students, same section"],
    ["Fee", settings ? `${rupeesShort(settings.fee.registrationFeePaise)} / student (incl. tax)${settings.fee.platformFeePaise ? ` + ${rupeesShort(settings.fee.platformFeePaise)} platform fee` : ""}` : "₹99 / student (incl. tax)"],
    ["Last date", settings?.closingDate ? dateOnly(settings.closingDate) : "To be announced"],
  ];

  return (
    <section id="register" className="relative w-full text-white sm:py-10 overflow-hidden scroll-mt-28">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#00BF62]/8 blur-[160px] -z-10 pointer-events-none" />

      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        <div className="text-center space-y-3">
          <MotionFadeIn delay={0.05}>
            <span className="inline-flex items-center h-7 px-3 rounded-full border border-[#00BF62]/50 bg-[#00BF62]/10 text-[11px] font-semibold tracking-wider text-[#00BF62] uppercase">
              {settings && !settings.registrationOpen ? "Registrations closed" : `Registrations open · ${settings?.year ?? 2026}`}
            </span>
          </MotionFadeIn>
          <MotionText delay={0.1}>
            <h2 className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              How registration <span className="text-[#00BF62]">works</span>
            </h2>
          </MotionText>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STEPS.map((s, i) => (
            <MotionFadeIn key={s.title} delay={0.1 + i * 0.08} direction="up">
              <div className="relative h-full rounded-[24px] border border-white/10 bg-[#0A0D0E]/90 p-6 overflow-hidden group hover:border-[#00BF62]/60 transition-colors">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00BF62]/10 blur-[30px] pointer-events-none" />
                <span className="font-clash text-5xl font-bold text-[#00BF62]/25 group-hover:text-[#00BF62]/60 transition-colors">0{i + 1}</span>
                <h3 className="mt-3 font-clash text-lg sm:text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.body}</p>
              </div>
            </MotionFadeIn>
          ))}
        </div>

        <MotionFadeIn delay={0.15} direction="up">
          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-[24px] border-t-[2.5px] border-l-[2.5px] border-[#00BF62] bg-[#0A0D0E]/95 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            {facts.map(([k, v], i) => (
              <div key={k} className={`p-5 sm:p-7 ${i % 2 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t lg:border-t-0 border-white/10" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                <p className="text-xs uppercase tracking-wider text-slate-400">{k}</p>
                <p className="mt-2 font-clash text-base sm:text-xl font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </MotionFadeIn>

        <div className="space-y-6">
          <MotionText delay={0.1}>
            <h3 className="font-clash text-2xl sm:text-4xl font-bold text-center">
              Get <span className="text-[#00BF62]">started</span>
            </h3>
          </MotionText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {CARDS.map(({ icon: Icon, ...c }, i) => (
              <MotionFadeIn key={c.title} delay={0.1 + i * 0.08} direction="up">
                <div className="h-full flex flex-col rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7 hover:border-[#00BF62]/60 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#00BF62]/10 border border-[#00BF62]/40 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00BF62]" />
                  </div>
                  <h4 className="mt-5 font-clash text-xl font-semibold">{c.title}</h4>
                  <p className="mt-2 flex-1 text-sm text-slate-400 leading-relaxed">{c.body}</p>
                  <Link href={c.href} className="mt-6 self-start">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group/btn inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                        c.primary ? "bg-[#00BF62] text-black" : "border border-white/20 bg-[#121514] text-white hover:border-[#00BF62]"
                      }`}
                    >
                      {c.cta}
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center group-hover/btn:rotate-45 transition-transform ${c.primary ? "bg-black text-[#00BF62]" : "bg-[#00BF62] text-black"}`}>
                        <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </motion.span>
                  </Link>
                </div>
              </MotionFadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
