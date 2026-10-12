import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import LatestBlog from "@/components/LatestBlog";
import BlogArticle from "@/components/blog/BlogArticle";
import { getPost, getSlugs } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Re-fetched at most every 5 minutes; the API also triggers /api/revalidate on every change.
export const revalidate = 300;

/** Pre-renders published posts at build time; newer slugs render on first visit. */
export async function generateStaticParams() {
  try {
    return (await getSlugs()).map((slug) => ({ slug }));
  } catch (err) {
    console.error("Blog slugs unavailable at build time:", err);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data) {
    return {
      title: "Article Not Found | Thynkspire",
    };
  }

  const { post } = data;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.subtitle;
  const image = post.coverImage || post.heroImage;
  return {
    title: `${title} | Thynkspire`,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      authors: [post.author.name],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, images: image ? [image] : undefined },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data) {
    notFound();
  }
  const { post, related } = data;

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
        {related.length > 0 && (
          <div className="border-t border-white/10 mt-8">
            <LatestBlog
              posts={related}
              title="Related Articles"
              showSubtitle={false}
              showButton={false}
              className="pt-12 pb-24"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
