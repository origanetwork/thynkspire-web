"use client";

import React from "react";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";
import { useTeacher } from "@/components/teacher/TeacherShell";
import { Card, CopyButton, PageHeading, buttonClasses } from "@/components/registration/ui";

const SUPPORT_EMAIL = "support@thynkspire.com";
const SUPPORT_PHONE = "+917907672043";
const SUPPORT_PHONE_LABEL = "+91 790 767 2043";

export default function SupportPage() {
  const { me } = useTeacher();
  const subject = `ThynkX coordinator support — ${me.schoolCode}`;
  const body = `Hi ThynkSpire team,\n\n\n\n—\n${me.fullName}\n${me.school.name} (${me.sectionLabel})\nSchool code: ${me.schoolCode}`;
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const channels = [
    {
      icon: FiMail,
      title: "Email us",
      text: "Write to us for registration, payment or team queries. Your school code is added to the email automatically.",
      value: SUPPORT_EMAIL,
      copy: SUPPORT_EMAIL,
      href: mailto,
      cta: "Send email",
    },
    {
      icon: FiPhone,
      title: "Call us",
      text: "Talk to the ThynkX support team directly for urgent help.",
      value: SUPPORT_PHONE_LABEL,
      copy: SUPPORT_PHONE_LABEL,
      href: `tel:${SUPPORT_PHONE}`,
      cta: "Call now",
    },
  ];

  return (
    <div>
      <PageHeading subtitle="Need help with ThynkX? Reach the ThynkSpire support team." />

      <div className="grid gap-5 md:grid-cols-2">
        {channels.map(({ icon: Icon, title, text, value, copy, href, cta }) => (
          <Card key={title} className="flex flex-col">
            <span className="w-12 h-12 rounded-2xl bg-[#00BF62]/15 border border-[#00BF62]/40 text-[#00BF62] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </span>
            <h2 className="mt-5 font-clash text-xl font-semibold text-white">{title}</h2>
            <p className="mt-1.5 text-sm text-slate-400">{text}</p>
            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
              <span className="text-sm sm:text-base font-medium text-white break-all">{value}</span>
              <CopyButton value={copy} />
            </div>
            <a href={href} className={buttonClasses("primary", "md", true) + " mt-5"}>
              <Icon className="w-4 h-4" /> {cta}
            </a>
          </Card>
        ))}
      </div>

      <Card className="mt-5">
        <div className="flex items-start gap-3.5">
          <FiClock className="w-5 h-5 mt-0.5 shrink-0 text-[#00BF62]" />
          <div className="text-sm text-slate-400">
            <p className="text-white font-medium">When you contact us</p>
            <p className="mt-1">
              Please mention your school code <span className="text-[#00BF62] font-medium">{me.schoolCode}</span> and, for a team query, the Team ID or draft number so we can help you faster.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
