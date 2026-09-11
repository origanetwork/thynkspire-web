"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionScale } from "@/components/MotionWrapper";

// Exact Neon Green Team Illustration from Figma
function TeamVectorIllustration() {
  return (
    <div className="relative w-[300px] sm:w-[350px] lg:w-[400px] h-[200px] sm:h-[230px] lg:h-[250px] select-none pointer-events-none drop-shadow-[0_0_15px_rgba(0,191,98,0.4)]">
      <svg
        viewBox="0 0 350 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* ================= ELECTRIC LIGHTNING AURA RAYS ================= */}
        <g stroke="#00BF62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Center figure lightning */}
          <path d="M 160,18 L 155,30 L 162,34 L 158,46" />
          <path d="M 185,8 L 182,20 L 188,24 L 185,34" />
          <path d="M 210,18 L 215,30 L 208,34 L 212,46" />

          {/* Left figure lightning */}
          <path d="M 105,40 L 100,50 L 106,53 L 102,64" />
          <path d="M 75,60 L 70,70 L 77,74 L 72,85" />
          <path d="M 60,95 L 52,102 L 58,106 L 50,115" />

          {/* Right figure lightning */}
          <path d="M 265,40 L 270,50 L 264,53 L 268,64" />
          <path d="M 295,60 L 300,70 L 293,74 L 298,85" />
          <path d="M 310,95 L 318,102 L 312,106 L 320,115" />
        </g>

        {/* ================= LEFT FIGURE (Man / Sunglasses / Arms Crossed) ================= */}
        <g stroke="#00BF62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Hair & Head Shape */}
          <path d="M 78,85 C 72,70 82,54 98,54 C 114,54 124,68 120,85 C 118,102 108,112 98,112 C 88,112 80,102 78,85 Z" fill="#000" />
          {/* Hair cap */}
          <path d="M 78,74 C 80,60 92,54 104,54 C 116,54 122,62 120,74" fill="#00BF62" fillOpacity="0.15" />
          
          {/* Left Ear */}
          <path d="M 76,82 C 73,82 72,88 75,92" />

          {/* Rectangular Sunglasses */}
          <rect x="80" y="74" width="16" height="11" rx="2" fill="#000" stroke="#00BF62" strokeWidth="2" />
          <rect x="98" y="74" width="16" height="11" rx="2" fill="#000" stroke="#00BF62" strokeWidth="2" />
          <path d="M 96,79 L 98,79" stroke="#00BF62" strokeWidth="2" />
          {/* Lens glare reflections */}
          <path d="M 84,77 L 84,83" stroke="#fff" strokeWidth="1.5" />
          <path d="M 102,77 L 102,83" stroke="#fff" strokeWidth="1.5" />

          {/* Smile */}
          <path d="M 92,98 Q 98,103 104,98" />

          {/* Body & Arms */}
          <path d="M 85,114 L 62,145 L 60,225" />
          <path d="M 112,114 L 128,140" />
          {/* Folded Forearm */}
          <path d="M 62,145 C 78,162 108,162 128,148" />
          <path d="M 68,162 C 84,176 114,176 132,158" />
          <path d="M 82,180 L 82,225" />
        </g>

        {/* ================= RIGHT FIGURE (Woman / Long Hair / Sunglasses) ================= */}
        <g stroke="#00BF62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Long Flowing Hair outline */}
          <path d="M 238,72 C 236,52 250,42 268,42 C 286,42 298,52 298,76 C 298,105 306,135 306,160 L 288,160 C 286,130 282,95 282,82" fill="#00BF62" fillOpacity="0.15" />
          {/* Face */}
          <path d="M 246,65 C 246,55 256,48 268,48 C 280,48 288,55 288,68 C 288,86 280,98 268,98 C 256,98 246,86 246,65 Z" fill="#000" />

          {/* Right Ear */}
          <path d="M 290,72 C 293,72 294,78 291,82" />

          {/* Rectangular Sunglasses */}
          <rect x="252" y="68" width="15" height="10" rx="2" fill="#000" stroke="#00BF62" strokeWidth="2" />
          <rect x="269" y="68" width="15" height="10" rx="2" fill="#000" stroke="#00BF62" strokeWidth="2" />
          <path d="M 267,73 L 269,73" stroke="#00BF62" strokeWidth="2" />
          {/* Lens glare reflections */}
          <path d="M 255,71 L 255,76" stroke="#fff" strokeWidth="1.5" />
          <path d="M 272,71 L 272,76" stroke="#fff" strokeWidth="1.5" />

          {/* Smile */}
          <path d="M 262,86 Q 268,91 274,86" />

          {/* Body & Folded Arms */}
          <path d="M 284,102 L 306,135 L 308,225" />
          <path d="M 252,102 L 238,130" />
          {/* Folded Forearm */}
          <path d="M 306,135 C 290,152 260,154 240,140" />
          <path d="M 300,152 C 284,166 254,166 235,150" />
          <path d="M 285,178 L 285,225" />
        </g>

        {/* ================= CENTER FIGURE (Tall Center / Flat-top / Broad Arms) ================= */}
        <g stroke="#00BF62" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Flat Top Spiky Hair */}
          <path d="M 162,54 L 168,40 L 174,48 L 180,38 L 188,48 L 195,38 L 202,48 L 208,40 L 214,54" fill="#00BF62" fillOpacity="0.2" />
          {/* Head Shape & Chin */}
          <path d="M 164,52 C 162,38 172,32 187,32 C 202,32 212,38 210,52 C 210,75 204,95 187,95 C 170,95 164,75 164,52 Z" fill="#000" />

          {/* Ears */}
          <path d="M 162,60 C 158,60 157,68 162,72" />
          <path d="M 212,60 C 216,60 217,68 212,72" />

          {/* Sunglasses with crisp white dual reflections */}
          <rect x="168" y="58" width="18" height="12" rx="2" fill="#000" stroke="#00BF62" strokeWidth="2.2" />
          <rect x="189" y="58" width="18" height="12" rx="2" fill="#000" stroke="#00BF62" strokeWidth="2.2" />
          <path d="M 186,64 L 189,64" stroke="#00BF62" strokeWidth="2.2" />
          {/* Dual white glare lines */}
          <path d="M 172,61 L 172,68" stroke="#fff" strokeWidth="1.6" />
          <path d="M 175,61 L 175,68" stroke="#fff" strokeWidth="1.6" />
          <path d="M 193,61 L 193,68" stroke="#fff" strokeWidth="1.6" />
          <path d="M 196,61 L 196,68" stroke="#fff" strokeWidth="1.6" />

          {/* Confident Smile */}
          <path d="M 180,78 Q 187,85 194,78" />

          {/* Neck & T-Shirt Collar */}
          <path d="M 178,95 L 175,108" />
          <path d="M 196,95 L 199,108" />
          <path d="M 175,108 Q 187,118 199,108" />

          {/* Broad Shoulders */}
          <path d="M 175,108 L 132,130 L 122,175 L 122,225" />
          <path d="M 199,108 L 242,130 L 252,175 L 252,225" />

          {/* Broad Crossed Forearms */}
          <path d="M 132,130 C 122,155 130,192 175,195 C 205,197 232,185 242,130" />
          <path d="M 130,150 C 150,202 225,202 244,150" />
          {/* Inner arm fold line */}
          <path d="M 148,168 C 168,185 208,185 228,168" />
          {/* Lower vertical body line */}
          <path d="M 187,196 L 187,225" />
        </g>
      </svg>
    </div>
  );
}

export default function Abbanner() {
  return (
    <section className="relative w-full text-white py-14 sm:py-20 lg:py-24 overflow-hidden">
      {/* Outer Container matching Header & Hero width */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Capsule Container matching Figma */}
        <MotionFadeIn
          direction="up"
          distance={30}
          duration={0.8}
          className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#070b08]/95 border border-white/20 p-8 sm:p-12 lg:py-16 lg:px-18 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
        >
          {/* Ambient Inner Glow */}
          <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-radial from-[#00BF62]/12 via-transparent to-transparent blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-radial from-[#00BF62]/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

          {/* Two-Column Layout: Left Text & CTA, Right Vector Illustration */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            
            {/* Left Column: Heading, Subtitle & CTA Button */}
            <div className="flex-1 max-w-[760px] flex flex-col items-start gap-4 sm:gap-6">
              
              {/* Main Headline */}
              <MotionText delay={0.1} duration={0.8}>
                <h2 className="font-poppins font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] tracking-tight text-white leading-tight lg:whitespace-nowrap">
                  Together, let&apos;s build a brighter future.
                </h2>
              </MotionText>

              {/* Subtitle Description */}
              <MotionFadeIn delay={0.25} direction="up" distance={15}>
                <p className="font-poppins font-normal text-white/75 text-sm sm:text-base lg:text-[18px] leading-[1.6] max-w-[560px]">
                  Join thousands of students, educators and partners in our
                  <br className="hidden sm:inline" /> mission to Think. Inspire. Grow.
                </p>
              </MotionFadeIn>

              {/* CTA Action Button */}
              <MotionFadeIn delay={0.4} direction="up" distance={20} className="pt-2 sm:pt-3">
                <Link href="#join-mission">
                  <button
                    type="button"
                    className="group flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full border border-white/35 bg-black/60 hover:border-[#00BF62] hover:bg-black/90 backdrop-blur-md transition-all duration-300 shadow-xl"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide">
                      Join Our Mission
                    </span>
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>
                </Link>
              </MotionFadeIn>

            </div>

            {/* Right Column: High-Fidelity Neon Green Team Vector Illustration */}
            <MotionScale delay={0.3} duration={0.8} className="shrink-0 flex items-center justify-center">
              <TeamVectorIllustration />
            </MotionScale>

          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
