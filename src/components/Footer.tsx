"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Thynkx", href: "/thynkx" },
  { name: "Programs", href: "/programs" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer 
      className="relative w-full text-white pt-6 sm:pt-10 lg:pt-16 pb-4 sm:pb-6 lg:pb-10 border-t border-[#00BF63]/10 backdrop-blur-xl"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        boxShadow: "0px -4px 4px 0px #00BF6347",
      }}
    >
      {/* Content Container matching exact Header & Hero width with compact spacing */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
        
        {/* Top Centered Prominent Logo (Large visual scale with compact container height) */}
        <div className="flex justify-center w-full -mt-2">
          <Link
            href="/#hero"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                const heroEl = document.getElementById("hero");
                if (heroEl) {
                  heroEl.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
            }}
            className="relative block w-[280px] sm:w-[640px] lg:w-[840px] h-[75px] sm:h-[135px] lg:h-[260px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
            aria-label="Navigate to Home Hero Section"
          >
            <Image
              src="/logo.png"
              alt="ThynkSpire - Think. Inspire. Grow."
              fill
              className="object-contain object-center scale-105 sm:scale-110"
              priority
            />
          </Link>
        </div>

        {/* Thin Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-white/20" />

        {/* Middle Row: Relative Grid Layout ensuring Navigation Links stay DEAD CENTER */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 py-1 lg:py-4 min-h-[60px] lg:min-h-[80px]">
          
          {/* Left Column: Social Media Icons Stack */}
          <div className="flex items-center justify-center gap-3 shrink-0 z-10">
            <Link
              href="https://www.linkedin.com/company/thynkspire-india-pvt-ltd/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/80 hover:border-[#00BF63] text-slate-200 hover:text-[#00BF63] flex items-center justify-center transition-all shadow-md"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </Link>

            <Link
              href="https://x.com/thynkspireInd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/80 hover:border-[#00BF63] text-slate-200 hover:text-[#00BF63] flex items-center justify-center transition-all shadow-md"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-4 h-4" />
            </Link>

            <Link
              href="https://www.instagram.com/thynkspire.ind/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/80 hover:border-[#00BF63] text-slate-200 hover:text-[#00BF63] flex items-center justify-center transition-all shadow-md"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </Link>
          </div>

          {/* Center Column: Perfectly Centered Navigation Menu */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-poppins text-xs sm:text-base font-normal z-10">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    isActive
                      ? "text-[#00BF63] font-medium hover:underline"
                      : "text-slate-200 hover:text-white transition-colors"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Column: Contact Details with line breaks for location */}
          <div className="flex flex-col items-center lg:items-start gap-1.5 font-poppins text-xs sm:text-sm text-slate-200 shrink-0 z-10 text-center lg:text-left">
            <div className="flex items-center gap-3">
              <FiPhone className="w-3.5 h-3.5 text-[#00BF63] shrink-0" />
              <span>91 790 767 2043</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="w-3.5 h-3.5 text-[#00BF63] shrink-0" />
              <span>Support@thynkspire.com</span>
            </div>

            <div className="flex items-start gap-3">
              <FiMapPin className="w-3.5 h-3.5 text-[#00BF63] shrink-0 mt-0.5" />
              <span className="leading-tight">
                Kathrikadavu, Ernakulam,<br />
                Kochi, Kerala - 682017
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Text */}
        <div className="text-center pt-4 lg:pt-8 pb-1 lg:pb-3 border-t border-white/10">
          <p className="font-poppins text-xs sm:text-sm text-slate-400 font-normal">
            © 2026 Thynkspire India Pvt.Ltd. All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
}
