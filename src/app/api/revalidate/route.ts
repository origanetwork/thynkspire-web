import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { BLOG_TAG } from "@/lib/blog";

/**
 * Called by the API after an admin publishes, edits or deletes blog content.
 * Body: { tags: ["blog", "blog:<slug>", …] } · Header: X-Revalidate-Secret
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET ?? "";
  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { tags?: unknown } | null;
  const tags = Array.isArray(body?.tags)
    ? body.tags.filter((t): t is string => typeof t === "string" && (t === BLOG_TAG || t.startsWith(`${BLOG_TAG}:`)) && t.length <= 200)
    : [];
  if (!tags.length) return Response.json({ revalidated: false, message: "No blog tags given" }, { status: 400 });

  // expire: 0 — a deleted or unpublished post must not be served again, not even once.
  for (const tag of new Set(tags)) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: true, tags });
}
