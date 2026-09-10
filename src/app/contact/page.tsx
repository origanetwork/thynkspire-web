import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import Getintouch from "@/components/contact/Getintouch";
import Location from "@/components/contact/Location";
import ContactFAQ from "@/components/contact/faq";

export const metadata: Metadata = {
  title: "Contact Us | Thynkspire - Get in Touch",
  description:
    "Let's talk about your next step. Whether you're exploring a program, planning an event partnership, or just have a question — our team replies within one business day.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Fixed Header */}
      <Header />

      {/* Sticky Quick Contact Widget */}
      <StickyContactWidget />

      {/* Contact Section */}
      <Getintouch />

      {/* Interactive Location Map Section */}
      <Location />

      {/* Before You Reach Out FAQ Section */}
      <ContactFAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
