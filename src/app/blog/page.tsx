import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import BlogHeroSection from "@/components/blog/BlogHeroSection";
import BlogGridSection from "@/components/blog/BlogGridSection";
import BlogSubscribeSection from "@/components/blog/BlogSubscribeSection";

export const metadata: Metadata = {
  title: "Blog & Insights | Thynkspire",
  description:
    "Explore the latest news, awareness content, success stories, and updates from Thynkspire.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Navigation Header */}
      <Header />
      <StickyContactWidget />

      {/* Main Content Wrapper with ambient gradient matching Figma canvas */}
      <div
        className="w-full relative pb-16"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        {/* Top Hero with Featured Blog Card */}
        <BlogHeroSection />

        {/* Blog Posts Grid with Category Filter */}
        <BlogGridSection />

        {/* Stay Updated Newsletter Subscription */}
        <BlogSubscribeSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
