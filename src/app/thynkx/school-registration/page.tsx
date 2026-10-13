import type { Metadata } from "next";
import RegShell from "@/components/registration/RegShell";
import SchoolRegistration from "@/components/registration/SchoolRegistration";

export const metadata: Metadata = {
  title: "School Registration | ThynkX 2026 - Thynkspire",
  description: "Register your school and become the ThynkX coordinator for the Secondary or Higher Secondary section.",
};

export default function SchoolRegistrationPage() {
  return (
    <RegShell label="School Registration">
      <SchoolRegistration />
    </RegShell>
  );
}
