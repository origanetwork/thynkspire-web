import type { Metadata } from "next";
import RegShell from "@/components/registration/RegShell";
import TeacherLogin from "@/components/registration/TeacherLogin";

export const metadata: Metadata = {
  title: "Teacher Login | ThynkX 2026 - Thynkspire",
  description: "Log in with a WhatsApp OTP to manage your ThynkX teams, students and payments.",
};

export default function TeacherLoginPage() {
  return (
    <RegShell showLogin={false} width="max-w-[1180px]">
      <TeacherLogin />
    </RegShell>
  );
}
