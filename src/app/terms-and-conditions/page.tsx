import React from "react";
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/data/legalContent";

export const metadata: Metadata = {
  title: "Terms and Conditions | Thynkspire",
  description:
    "Terms governing the use of ThynkSpire's website, WhatsApp Business API services, messaging platform and related services.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      document={termsAndConditions}
      otherDocument={{ title: "Privacy Policy", href: "/privacy-policy" }}
    />
  );
}
