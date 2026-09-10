import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import ThynkxHero from "@/components/thynkx/Hero";
import ThynkxEvents from "@/components/thynkx/Events";
import Whocanjoin from "@/components/thynkx/Whocanjoin";
import Upcoming from "@/components/thynkx/Upcoming";
import Quote from "@/components/thynkx/Quote";
import AlsoOngoing from "@/components/thynkx/AlsoOngoing";

export const metadata: Metadata = {
  title: "Thynk X | India's Biggest Quizzing Event - Thynkspire",
  description:
    "Thynk X Brings Schools And Colleges From Across The Country Into One National Quizzing Arena — Where Knowledge Meets Fun And Bright Minds Compete For The Top Spot.",
};

export default function ThynkxPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Fixed Header */}
      <Header />

      {/* Sticky Quick Contact Widget */}
      <StickyContactWidget />

      {/* Main Content with Ambient Background Gradient */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        <ThynkxHero />
        <ThynkxEvents />
        <Whocanjoin />
        <Upcoming />
        <Quote />
        <AlsoOngoing />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
