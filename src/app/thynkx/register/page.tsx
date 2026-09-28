import { Suspense } from "react";
import type { Metadata } from "next";
import RegShell from "@/components/registration/RegShell";
import StudentRegistration from "@/components/registration/StudentRegistration";
import { LoadingBlock } from "@/components/registration/ui";

export const metadata: Metadata = {
  title: "Student Team Registration | ThynkX 2026 - Thynkspire",
  description: "Register your team of two for ThynkX with your school code. No login needed.",
};

export default function StudentRegisterPage() {
  return (
    <RegShell showLogin={false} width="max-w-[520px]">
      <Suspense fallback={<LoadingBlock />}>
        <StudentRegistration />
      </Suspense>
    </RegShell>
  );
}
