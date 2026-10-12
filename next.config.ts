import type { NextConfig } from "next";

// Blog images are served from CloudPe object storage — same value as the API's public bucket URL
// (<S3_ENDPOINT>/<S3_BUCKET>).
const blogImageBase = (process.env.BLOG_IMAGE_BASE_URL ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: blogImageBase ? [new URL(`${blogImageBase}/**`)] : [],
  },
};

export default nextConfig;
