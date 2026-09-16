import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThynkSpire - Skills for What's Next?",
  description: "Industry-focused programs, real-world experience, and a platform to grow.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

import StickyContactWidget from "@/components/StickyContactWidget";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-[#00BF63] selection:text-black">
        {children}
        <StickyContactWidget />
      </body>
    </html>
  );
}
