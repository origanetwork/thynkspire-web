import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThynkSpire - Skills for What's Next?",
  description: "Industry-focused programs, real-world experience, and a platform to grow.",
};

import StickyContactWidget from "@/components/StickyContactWidget";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased selection:bg-[#00BF63] selection:text-black">
        {children}
        <StickyContactWidget />
      </body>
    </html>
  );
}
