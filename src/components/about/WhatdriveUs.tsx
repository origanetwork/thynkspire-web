"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn } from "@/components/MotionWrapper";

// Subtle star sparkle background particles
function StarSparkle({
  top,
  left,
  right,
  bottom,
  size = "md",
  delay = 0,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}) {
  const sizeClasses = {
    sm: "w-2 h-2 text-white/20 text-[10px]",
    md: "w-3 h-3 text-[#00BF62]/40 text-xs",
    lg: "w-4 h-4 text-white/40 text-sm",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none select-none flex items-center justify-center ${sizeClasses[size]}`}
      style={{ top, left, right, bottom }}
      animate={{
        opacity: [0.15, 0.75, 0.15],
        scale: [0.8, 1.25, 0.8],
      }}
      transition={{
        duration: 3.5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      ✦
    </motion.div>
  );
}

export default function WhatDrivesUs() {
  const [hoveredCard, setHoveredCard] = useState<"mission" | "vision" | null>(null);

  return (
    <section className="relative w-full text-white pt-4 pb-14 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Glows matching Figma */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-radial from-[#00BF62]/14 via-[#00BF62]/3 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] bg-radial from-[#00BF62]/12 via-[#00BF62]/2 to-transparent blur-[150px] pointer-events-none -z-10" />

      {/* Cosmic Star Sparkles */}
      <StarSparkle top="10%" left="15%" size="sm" delay={0.2} />
      <StarSparkle top="25%" right="20%" size="md" delay={0.8} />
      <StarSparkle top="45%" left="8%" size="md" delay={1.4} />
      <StarSparkle top="65%" right="12%" size="sm" delay={0.5} />
      <StarSparkle top="80%" left="22%" size="lg" delay={1.8} />
      <StarSparkle top="90%" right="28%" size="md" delay={1.1} />

      {/* Main Container */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header Tag: — What Drives Us — */}
        <MotionFadeIn delay={0.1} direction="up" distance={15} className="flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
            <h3 className="font-poppins text-lg sm:text-2xl font-medium tracking-tight text-white/70">
              What Drives Us
            </h3>
            <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
          </div>
        </MotionFadeIn>

        {/* Staggered Two Photos Layout matching Figma exactly */}
        <div className="mt-16 sm:mt-20 lg:mt-24 max-w-[1080px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-8 min-h-[750px] lg:min-h-[880px]">
          
          {/* Left Card: OUR MISSION (1.png) - Staggered High on Left */}
          <motion.div
            onMouseEnter={() => setHoveredCard("mission")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setHoveredCard(hoveredCard === "mission" ? null : "mission")}
            animate={{
              width: hoveredCard === "mission" ? "100%" : undefined,
            }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className={`relative w-full sm:w-[380px] lg:w-[420px] transition-all duration-500 shrink-0 ${
              hoveredCard === "mission" ? "sm:!w-[520px] lg:!w-[580px] z-30" : "z-10"
            }`}
          >
            <div
              className={`relative w-full h-[460px] sm:h-[500px] lg:h-[530px] rounded-[10px] overflow-hidden border transition-all duration-500 shadow-2xl cursor-pointer ${
                hoveredCard === "mission"
                  ? "border-[#00BF62]/80 shadow-[0_0_35px_rgba(0,191,98,0.25)]"
                  : "border-white/15 hover:border-white/30"
              }`}
            >
              {/* Image with subtle zoom on hover */}
              <Image
                src="/about/1.png"
                alt="Students collaborating at Thynkspire - Our Mission"
                fill
                priority
                className={`object-cover object-center transition-transform duration-700 ease-out ${
                  hoveredCard === "mission" ? "scale-105" : "scale-100"
                }`}
              />

              {/* Dark Overlay (Dims on hover so text is clear) */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-500 ${
                  hoveredCard === "mission" ? "opacity-90" : "opacity-0 pointer-events-none"
                }`}
              />

              {/* Text content: Appears ONLY on hover */}
              <div
                className={`absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-start transition-all duration-500 ${
                  hoveredCard === "mission"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <h4 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[46px] tracking-tight text-white leading-tight uppercase">
                  OUR MISSION
                </h4>
                <p className="font-poppins text-white/90 text-sm sm:text-base lg:text-[16px] leading-[1.65] font-normal mt-4 sm:mt-5 max-w-[480px]">
                  empower students with future-ready skills, practical learning,
                  and opportunities to learn, innovate, and compete.
                </p>
              </div>

              {/* Glow Outline Accent on Hover */}
              <div
                className={`absolute inset-0 border-2 rounded-[10px] pointer-events-none transition-opacity duration-500 ${
                  hoveredCard === "mission" ? "border-[#00BF62]/50 opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.div>

          {/* Right Card: OUR VISION (2.png) - Staggered Lower on Right */}
          <motion.div
            onMouseEnter={() => setHoveredCard("vision")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setHoveredCard(hoveredCard === "vision" ? null : "vision")}
            className={`relative w-full sm:w-[410px] lg:w-[450px] md:mt-48 lg:mt-56 transition-all duration-500 shrink-0 ${
              hoveredCard === "vision" ? "sm:!w-[520px] lg:!w-[580px] z-30 md:-translate-x-16" : "z-10"
            }`}
          >
            <div
              className={`relative w-full h-[460px] sm:h-[500px] lg:h-[530px] rounded-[10px] overflow-hidden border transition-all duration-500 shadow-2xl cursor-pointer ${
                hoveredCard === "vision"
                  ? "border-[#00BF62]/80 shadow-[0_0_35px_rgba(0,191,98,0.25)]"
                  : "border-white/15 hover:border-white/30"
              }`}
            >
              {/* Image with subtle zoom on hover */}
              <Image
                src="/about/2.png"
                alt="Thynkspire classroom training session - Our Vision"
                fill
                priority
                className={`object-cover object-center transition-transform duration-700 ease-out ${
                  hoveredCard === "vision" ? "scale-105" : "scale-100"
                }`}
              />

              {/* Dark Overlay (Dims on hover so text is clear) */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-500 ${
                  hoveredCard === "vision" ? "opacity-90" : "opacity-0 pointer-events-none"
                }`}
              />

              {/* Text content: Appears ONLY on hover */}
              <div
                className={`absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-start transition-all duration-500 ${
                  hoveredCard === "vision"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <h4 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[46px] tracking-tight text-white leading-tight uppercase">
                  OUR VISION
                </h4>
                <p className="font-poppins text-white/90 text-sm sm:text-base lg:text-[16px] leading-[1.65] font-normal mt-4 sm:mt-5 max-w-[480px]">
                  build a trusted education ecosystem connecting learning,
                  technology, careers, and student opportunities across india.
                </p>
              </div>

              {/* Glow Outline Accent on Hover */}
              <div
                className={`absolute inset-0 border-2 rounded-[10px] pointer-events-none transition-opacity duration-500 ${
                  hoveredCard === "vision" ? "border-[#00BF62]/50 opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
