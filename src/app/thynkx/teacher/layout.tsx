import type { Metadata } from "next";
import TeacherShell from "@/components/teacher/TeacherShell";

export const metadata: Metadata = {
  title: "Teacher Dashboard | ThynkX 2026 - Thynkspire",
  robots: { index: false },
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <TeacherShell>{children}</TeacherShell>;
}
