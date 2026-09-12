"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlus, FiMinus, FiChevronUp } from "react-icons/fi";
import { MotionFadeIn } from "../MotionWrapper";

export default function Location() {
  const [zoomLevel, setZoomLevel] = useState(13);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 16));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 11));

  return (
    <section className="relative w-full text-white pb-20 sm:pb-28 overflow-hidden">
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <MotionFadeIn delay={0.15} direction="up">
          {/* Main Map Card Container (No shadow) */}
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/10 bg-[#090c0a] group">
            
            {/* Dark Styled Map Embed */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#090c0a]">
              <div className="relative w-[calc(100%+160px)] h-[calc(100%+180px)] -top-[80px] -left-[80px]">
                <iframe
                  title="Thynkspire Edu Experience Hub Map"
                  src={`https://maps.google.com/maps?q=9.9920,76.2990&t=&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 filter invert-[93%] hue-rotate-180 contrast-[130%] brightness-[78%] grayscale-[30%]"
                  loading="lazy"
                />
              </div>
              {/* Vignette gradients to blend map cleanly */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </div>

            {/* Neon Green Dashed Region Boundary Overlay (Enclosing Kathrikadavu & Kaloor) */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <svg 
                className="w-full h-full"
                viewBox="0 0 1000 460" 
                preserveAspectRatio="none"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dashed boundary path */}
                <path
                  d="M 420 120 L 610 30 L 625 180 L 690 320 L 440 400 L 400 140 Z"
                  stroke="#00BF62"
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                  fill="#00BF62"
                  fillOpacity="0.02"
                />
              </svg>

              {/* Upper Kathrikadavu Label inside green boundary */}
              <div className="absolute top-[42%] left-[54%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none space-y-0.5">
                <span className="block font-poppins text-xs sm:text-sm font-semibold text-white/90 tracking-wider uppercase">
                  KATHRIKADAVU
                </span>
                <span className="block font-poppins text-[10px] sm:text-xs font-medium text-white/60">
                  കുത്രികടവ്
                </span>
              </div>

              {/* Ernakulam Center Label under green lines */}
              <div className="absolute top-[68%] left-[54%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
                <span className="block font-clash text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00BF62] tracking-wide">
                  Ernakulam
                </span>
                <span className="block font-poppins text-lg sm:text-2xl font-bold text-[#00BF62]">
                  എറണാകുളം
                </span>
              </div>
            </div>

            {/* Floating Glassmorphic Location Info Card on Bottom-Left (Compact on mobile) */}
            <div className="absolute left-3 sm:left-8 lg:left-10 bottom-3 sm:bottom-6 lg:bottom-8 z-20 max-w-[260px] xs:max-w-[300px] sm:max-w-[370px] w-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-3.5 sm:p-6 rounded-[16px] sm:rounded-[22px] bg-[#0e1210]/95 border border-[#00BF62] backdrop-blur-xl space-y-2 sm:space-y-3.5 shadow-xl"
              >
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="font-clash text-xs sm:text-base lg:text-lg font-bold text-white leading-tight">
                    Thynkspire Edu Experience Hub
                  </h3>
                  <p className="font-poppins text-[11px] sm:text-xs text-slate-300 font-normal leading-tight">
                    Kathrikadavu, Ernakulam, Kerala 682017
                  </p>
                </div>

                {/* Get Directions Action Button */}
                <div className="pt-0.5 sm:pt-1">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Kathrikadavu,+Ernakulam,+Kerala+682017"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex items-center justify-center px-3.5 py-1 sm:px-5 sm:py-2 rounded-full border border-white/20 bg-transparent text-white hover:border-[#00BF62] hover:bg-[#00BF62] hover:text-black font-poppins text-[11px] sm:text-xs font-medium transition-all duration-300 cursor-pointer">
                      <span>Get Directions</span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Floating Map Navigation Controls on Bottom-Right */}
            <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-20 flex flex-col items-center gap-2">
              <button
                onClick={() => setZoomLevel(13)}
                title="Reset View"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/85 border border-white/20 hover:border-[#00BF62] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              >
                <FiChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/85 border border-white/20 hover:border-[#00BF62] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              >
                <FiPlus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/85 border border-white/20 hover:border-[#00BF62] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              >
                <FiMinus className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
