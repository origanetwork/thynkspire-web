import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/Hero";
import About from "@/components/about/About";
import WhatDrivesUs from "@/components/about/WhatdriveUs";
import OurValues from "@/components/about/Ourvalues";
import WhyChoose from "@/components/about/Whychoose";
import OurImpact from "@/components/about/OurImapact";
import Abbanner from "@/components/about/Abbanner";
import StickyContactWidget from "@/components/StickyContactWidget";

export const metadata: Metadata = {
  title: "About Us | Thynkspire - Building Futures. Inspiring Millions.",
  description:
    "Thynkspire India Pvt. Ltd. is an innovation-driven education and technology company preparing students for future careers through practical learning, industry exposure, and large-scale engagement platforms.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Fixed Header */}
      <Header />
      <StickyContactWidget />

      {/* Main Content Wrapper with ambient gradients matching the Figma canvas */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        {/* About Hero Section */}
        <AboutHero />

        {/* About Us Ecosystem Section */}
        <About />

        {/* What Drives Us Gallery Section */}
        <WhatDrivesUs />

        {/* Our Core Values Section */}
        <OurValues />

        {/* Why Choose Section */}
        <WhyChoose />

        {/* Our Impact Section */}
        <OurImpact />

        {/* About Bottom CTA Banner */}
        <Abbanner />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
