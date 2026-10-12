import { API_URL } from "./api";

// Blog content comes from the API (managed in the admin console). These helpers run on the
// server only: responses are cached for REVALIDATE seconds and dropped immediately when the
// API calls /api/revalidate after an admin edits a post.

const REVALIDATE = 300;
export const BLOG_TAG = "blog";

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  name: string;
  role: string | null;
  avatar: string | null;
  linkedinUrl: string | null;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  coverImage: string | null;
  author: BlogAuthor;
  isFeatured: boolean;
  publishedAt: string | null;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostSummary {
  heroImage: string | null;
  /** Sanitized HTML from the admin rich-text editor. */
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

/** Shown when a post has no cover image. */
export const FALLBACK_IMAGE = "/blog/blog.jpeg";

export const formatBlogDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric", timeZone: "Asia/Kolkata" }) : "";

async function get<T>(path: string, tags: string[] = []): Promise<T | null> {
  const res = await fetch(`${API_URL}/v1/blog${path}`, { next: { revalidate: REVALIDATE, tags: [BLOG_TAG, ...tags] } });
  if (res.status === 404) return null;
  // Throwing keeps the previously generated page in place instead of caching an empty one.
  if (!res.ok) throw new Error(`Blog API ${path} responded ${res.status}`);
  return (await res.json()) as T;
}

export async function getPosts(opts: { pageSize?: number; category?: string } = {}) {
  const q = new URLSearchParams({ pageSize: String(opts.pageSize ?? 100) });
  if (opts.category) q.set("category", opts.category);
  const data = await get<{ items: BlogPostSummary[] }>(`/posts?${q}`);
  return data?.items ?? [];
}

export async function getFeaturedPost() {
  const data = await get<{ post: BlogPostSummary | null }>("/posts/featured");
  return data?.post ?? null;
}

export async function getPost(slug: string) {
  return get<{ post: BlogPost; related: BlogPostSummary[] }>(`/posts/${encodeURIComponent(slug)}`, [`${BLOG_TAG}:${slug}`]);
}

export async function getCategories() {
  const data = await get<{ items: BlogCategory[] }>("/categories");
  return data?.items ?? [];
}

export async function getSlugs() {
  const data = await get<{ items: string[] }>("/slugs");
  return data?.items ?? [];
}

/** For sections outside the blog (home page): never let a blog API problem break the page. */
export async function getLatestPostsSafe(count = 3) {
  try {
    return await getPosts({ pageSize: count });
  } catch (err) {
    console.error("Latest blog posts unavailable:", err);
    return [];
  }
}
