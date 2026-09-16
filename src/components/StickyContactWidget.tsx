"use client";

import React from "react";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

export default function StickyContactWidget() {
  return (
    <aside 
      aria-label="Quick Contact Actions"
      className="fixed right-2 sm:right-4 lg:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
    >
      <div 
        className="flex flex-col items-center justify-center gap-5 sm:gap-7 py-5 sm:py-7 px-3 sm:px-3.5 w-[62px] rounded-[14px] sm:rounded-[18px] bg-[#161616] border border-white/40 shadow-2xl shadow-black/80 backdrop-blur-md transition-all duration-300 hover:border-[#00BF63]/60"
        style={{
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 191, 99, 0.08)",
        }}
      >
        {/* Phone Call Link */}
        <Link
          href="tel:+917907672043"
          aria-label="Call Us"
          className="group relative flex items-center justify-center text-white/90 hover:text-[#00BF63] transition-colors duration-300"
        >
          <FiPhone className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] group-hover:scale-110 transition-transform duration-300" />
        </Link>

        {/* WhatsApp Link */}
        <Link
          href="https://wa.me/917907672043"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center text-white/90 hover:text-[#00BF63] transition-colors duration-300"
        >
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
        </Link>
      </div>
    </aside>
  );
}
