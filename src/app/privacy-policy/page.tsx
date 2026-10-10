import React from "react";
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/data/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Thynkspire",
  description:
    "How ThynkSpire India Private Limited collects, uses, stores, shares and protects information across its website and WhatsApp Business API services.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      document={privacyPolicy}
      otherDocument={{ title: "Terms and Conditions", href: "/terms-and-conditions" }}
    />
  );
}
