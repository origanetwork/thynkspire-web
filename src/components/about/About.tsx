"use client";

import React from "react";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

interface PillarCardProps {
  number: string;
  title: string;
  description: React.ReactNode;
  className?: string;
  dotPosition?: "bottom-right" | "top-right" | "none";
  delay?: number;
}

function PillarCard({
  number,
  title,
  description,
  className = "",
  dotPosition = "bottom-right",
  delay = 0.2,
}: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`relative w-full max-w-[420px] group ${className}`}
    >
      {/* Outer Card Glass Container matching Figma */}
      <div className="relative w-full rounded-[4px] bg-[#020603]/85 border border-white/20 backdrop-blur-md overflow-hidden transition-all duration-400 group-hover:border-[#00BF62]/80 group-hover:shadow-[0_0_25px_rgba(0,191,98,0.15)]">
        
        {/* Subtle inner hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00BF62]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        {/* Corner micro-dot accent from Figma */}
        {dotPosition === "bottom-right" && (
          <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-[#00BF62] transition-colors" />
        )}
        {dotPosition === "top-right" && (
          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-[#00BF62] transition-colors" />
        )}

        {/* Card Header */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-poppins font-bold italic text-[#00BF62] text-base sm:text-lg tracking-tight">
              {number}
            </span>
            <span className="text-white/50 font-light">—</span>
            <span className="font-poppins font-medium italic text-white text-base sm:text-lg tracking-tight">
              {title}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 text-white/75 font-poppins text-xs sm:text-[13.5px] leading-[1.65] font-light">
          {description}
        </div>
      </div>
    </motion.div>
  );
}

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

export default function About() {
  // Upper refined green path (crisp stroke, leading into Card 02)
  const greenCurrentPath =
    "M 550,10 " +
    "C 550,85 548,135 550,150 " +
    "C 560,180 610,195 655,180 " +
    "C 690,168 688,122 655,114 " +
    "C 600,100 548,122 532,160 " +
    "C 500,240 458,325 435,365";

  // Lower thin white curved wire (wrapping around Card 03 and coiling bottom right)
  const whiteWirePath =
    "M 435,365 " +
    "C 320,410 75,480 75,610 " +
    "C 75,720 135,770 235,795 " +
    "C 420,835 680,855 760,895 " +
    "C 785,910 740,935 670,930 " +
    "C 655,930 660,905 715,905 " +
    "C 775,905 825,950 860,1000";

  // Complete continuous path for slow, smooth traveling current pulse
  const fullRibbonPath =
    "M 550,10 " +
    "C 550,85 548,135 550,150 " +
    "C 560,180 610,195 655,180 " +
    "C 690,168 688,122 655,114 " +
    "C 600,100 548,122 532,160 " +
    "C 500,240 458,325 435,365 " +
    "C 320,410 75,480 75,610 " +
    "C 75,720 135,770 235,795 " +
    "C 420,835 680,855 760,895 " +
    "C 785,910 740,935 670,930 " +
    "C 655,930 660,905 715,905 " +
    "C 775,905 825,950 860,1000";

  return (
    <section className="relative w-full text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-[5%] left-[-10%] w-[550px] lg:w-[750px] h-[550px] lg:h-[750px] bg-radial from-[#00BF62]/18 via-[#00BF62]/4 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-radial from-[#00BF62]/14 via-[#00BF62]/3 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[2%] left-[15%] w-[450px] h-[450px] bg-radial from-[#00BF62]/12 via-transparent to-transparent blur-[130px] pointer-events-none" />

      {/* Cosmic Star Sparkles scattered across canvas */}
      <StarSparkle top="6%" left="12%" size="sm" delay={0.2} />
      <StarSparkle top="14%" right="18%" size="md" delay={0.8} />
      <StarSparkle top="28%" left="6%" size="md" delay={1.4} />
      <StarSparkle top="36%" right="10%" size="sm" delay={0.5} />
      <StarSparkle top="50%" left="18%" size="lg" delay={1.8} />
      <StarSparkle top="62%" right="14%" size="md" delay={1.1} />
      <StarSparkle top="75%" left="8%" size="sm" delay={2.2} />
      <StarSparkle top="85%" right="22%" size="lg" delay={0.6} />

      {/* Main Container */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header Tag: — About Us */}
        <MotionFadeIn delay={0.1} direction="up" distance={15}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
            <span className="font-poppins text-white/70 text-base sm:text-lg font-medium tracking-tight">
              About Us
            </span>
          </div>
        </MotionFadeIn>

        {/* Section Main Title and Paragraph */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center text-center max-w-4xl mx-auto z-20 relative">
          
          {/* Main Headline */}
          <h2 className="flex flex-col gap-1 sm:gap-2">
            <MotionText delay={0.2} duration={0.8}>
              <span className="font-poppins font-semibold text-[32px] sm:text-[46px] lg:text-[54px] leading-[1.12] tracking-tight text-white">
                More Than Education.
              </span>
            </MotionText>
            
            <MotionText delay={0.35} duration={0.8}>
              <span className="font-poppins font-semibold text-[32px] sm:text-[46px] lg:text-[54px] leading-[1.12] tracking-tight text-white">
                We’re Building an{" "}
                <span className="text-[#00BF62] drop-shadow-[0_0_35px_rgba(0,191,98,0.5)]">
                  Ecosystem.
                </span>
              </span>
            </MotionText>
          </h2>

          {/* Subtitle / Paragraph */}
          <MotionFadeIn delay={0.5} direction="up" distance={20}>
            <p className="font-poppins font-normal text-white/70 text-sm sm:text-base lg:text-[15.5px] leading-[1.7] max-w-[730px] mx-auto mt-6">
              Thynkspire is building a connected ecosystem where students can learn,
              explore, compete, create, and grow. Through career-focused education,
              national-level competitions, and technology-driven initiatives, we create
              opportunities that prepare students for the world of tomorrow.
            </p>
          </MotionFadeIn>

        </div>

        {/* Pillar Cards & Flowing Electric Current Canvas with Locked Coordinate Grid */}
        <div className="relative mt-16 sm:mt-24 lg:mt-28 w-full max-w-[1000px] mx-auto min-h-[880px] lg:h-[860px]">
          
          {/* Flowing Energy / Electric Current SVG Canvas */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 950"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Refined Subtle Green Neon Glow Filter */}
                <filter id="neonGreenGlowRefined" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* SECTION 1: Top Green Ribbon - Crisp refined neon line */}
              <motion.path
                d={greenCurrentPath}
                stroke="#00BF62"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="opacity-30"
                filter="url(#neonGreenGlowRefined)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />

              <motion.path
                d={greenCurrentPath}
                stroke="#00BF62"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#neonGreenGlowRefined)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />

              {/* SECTION 2: Lower Thin White Curved Wire */}
              <motion.path
                d={whiteWirePath}
                stroke="#ffffff"
                strokeWidth="1.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="opacity-35"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.35 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
              />

              {/* Slow Smooth Traveling Electric Pulse Stream */}
              <motion.path
                d={fullRibbonPath}
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="90 1400"
                fill="none"
                className="opacity-80"
                filter="url(#neonGreenGlowRefined)"
                animate={{
                  strokeDashoffset: [1490, -1490],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Slow Traveling Green Spark Stream */}
              <motion.path
                d={fullRibbonPath}
                stroke="#00BF62"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="50 1100"
                fill="none"
                className="opacity-85"
                filter="url(#neonGreenGlowRefined)"
                animate={{
                  strokeDashoffset: [1150, -1150],
                }}
                transition={{
                  duration: 8.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2.5,
                }}
              />
            </svg>
          </div>

          {/* Card 01: Future Careers (Top-Left of the locked canvas) */}
          <div className="relative lg:absolute lg:top-[50px] lg:left-[20px] w-full max-w-[420px] z-10 mb-8 lg:mb-0">
            <PillarCard
              number="01"
              title="Future Careers"
              dotPosition="bottom-right"
              delay={0.2}
              description={
                <>
                  Through{" "}
                  <span className="text-[#00BF62] font-medium">
                    THYNKEDGE
                  </span>{" "}
                  School of Emerging Careers, a{" "}
                  <span className="text-[#00BF62] font-medium">
                    Thynkspire
                  </span>{" "}
                  initiative, students build future-ready skills in Cyber
                  Security, AI, Data Science, Robotics, Digital Marketing, and
                  Entrepreneurship.
                </>
              }
            />
          </div>

          {/* Card 02: Knowledge & Competition (Center-Right of the locked canvas) */}
          <div className="relative lg:absolute lg:top-[280px] lg:right-[20px] w-full max-w-[420px] z-10 mb-8 lg:mb-0 flex justify-end">
            <PillarCard
              number="02"
              title="Knowledge & Competition"
              dotPosition="bottom-right"
              delay={0.35}
              description={
                <>
                  <span className="text-[#00BF62] font-medium">
                    THYNK X
                  </span>{" "}
                  is a student quizzing and competition platform that brings
                  together students from schools, colleges, and universities to
                  learn, compete, and showcase their knowledge.
                </>
              }
            />
          </div>

          {/* Card 03: Cyber Awareness (Bottom-Left Nestled inside the curve) */}
          <div className="relative lg:absolute lg:top-[520px] lg:left-[170px] w-full max-w-[420px] z-10">
            <PillarCard
              number="03"
              title="Cyber Awareness"
              dotPosition="top-right"
              delay={0.5}
              description={
                <>
                  Our{" "}
                  <span className="text-[#00BF62] font-medium">
                    1000 Cyber Defenders
                  </span>{" "}
                  Program helps students build practical cybersecurity awareness
                  and skills for a safer digital future.
                </>
              }
            />
          </div>

        </div>

      </div>
    </section>
  );
}
