import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import LatestBlog from "@/components/LatestBlog";
import BlogArticle from "@/components/blog/BlogArticle";
import { blogPosts, getBlogPost } from "@/data/blogPosts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Thynkspire",
    };
  }

  return {
    title: `${post.title} | Thynkspire`,
    description: post.subtitle,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
        <BlogArticle post={post} />

        {/* Related Articles Section */}
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
