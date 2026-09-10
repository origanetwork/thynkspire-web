import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import ProgramsList from "@/components/programs/ProgramsList";
import ProgramCTA from "@/components/programs/ProgramCTA";

export const metadata: Metadata = {
  title: "Our Programs | Thynkspire - School of Emerging Career",
  description:
    "Explore our industry-focused programs and initiatives designed to create meaningful learning and development opportunities in AI, Cyber Security, Robotics, and more.",
};

export default function ProgramsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Fixed Navigation Header */}
      <Header />
      
      {/* Sticky Call / WhatsApp Widget */}
      <StickyContactWidget />

      {/* Main Content with Ambient Figma Gradient */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        {/* Programs Listing with Category Filter and 3-Card per row Grid */}
        <ProgramsList />

        {/* Not sure which program fits you? CTA */}
        <ProgramCTA />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
