import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import LatestBlog from "@/components/LatestBlog";
import BlogArticle from "@/components/blog/BlogArticle";

export const metadata: Metadata = {
  title: "How AI is Transforming Cybersecurity | Thynkspire",
  description:
    "As cyber threats evolve into sophisticated automated attacks, artificial intelligence has emerged not just as a tool, but as the foundational defense architecture of the modern digital enterprise.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Navigation Header */}
      <Header />
      <StickyContactWidget />

      {/* Main Content Wrapper with ambient gradient matching Figma canvas */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        {/* Main Blog Article Component */}
        <BlogArticle />

        {/* Related Articles Section (Calling LatestBlog Component as 'Related Articles' matching Figma) */}
        <div className="border-t border-white/10 mt-8">
          <LatestBlog
            title="Related Articles"
            showSubtitle={false}
            showButton={false}
            className="pt-12 pb-24"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
