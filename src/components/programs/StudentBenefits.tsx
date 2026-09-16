"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

const BENEFITS_PILLS = [
  // Left side pills (spread outward for breathing room around the student)
  {
    id: 1,
    label: "Mock Interviews",
    position: "top-[4%] left-[2%] sm:left-[4%] lg:left-[8%]",
    rotate: "-14deg",
    delay: 0.1,
    duration: 4.5,
  },
  {
    id: 2,
    label: "Live Classes",
    position: "top-[20%] left-[6%] sm:left-[10%] lg:left-[14%]",
    rotate: "-8deg",
    delay: 0.2,
    duration: 5.2,
  },
  {
    id: 3,
    label: "Industry Projects",
    position: "top-[38%] left-[-2%] sm:left-[2%] lg:left-[4%]",
    rotate: "-4deg",
    delay: 0.3,
    duration: 4.8,
  },
  {
    id: 4,
    label: "Alumni Network",
    position: "top-[48%] left-[8%] sm:left-[12%] lg:left-[16%]",
    rotate: "-6deg",
    delay: 0.4,
    duration: 5.5,
  },
  {
    id: 5,
    label: "Hackathons & CTFs",
    position: "top-[66%] left-[-2%] sm:left-[2%] lg:left-[6%]",
    rotate: "-24deg",
    delay: 0.5,
    duration: 4.2,
  },

  // Right side pills (spread outward matching left side layout on large screens)
  {
    id: 6,
    label: "Weekly Assignments",
    position: "top-[4%] right-[2%] sm:right-[4%] lg:right-[8%]",
    rotate: "12deg",
    delay: 0.15,
    duration: 4.7,
  },
  {
    id: 7,
    label: "Lifetime LMS Access",
    position: "top-[20%] right-[6%] sm:right-[10%] lg:right-[14%]",
    rotate: "-35deg",
    delay: 0.25,
    duration: 5.0,
  },
  {
    id: 8,
    label: "Resume Building",
    position: "top-[38%] right-[-2%] sm:right-[2%] lg:right-[4%]",
    rotate: "16deg",
    delay: 0.35,
    duration: 4.6,
  },
  {
    id: 9,
    label: "Career Guidance",
    position: "top-[48%] right-[8%] sm:right-[12%] lg:right-[16%]",
    rotate: "-22deg",
    delay: 0.45,
    duration: 5.3,
  },
  {
    id: 10,
    label: "Placement Assistance",
    position: "top-[66%] right-[-2%] sm:right-[2%] lg:right-[6%]",
    rotate: "16deg",
    delay: 0.55,
    duration: 4.4,
  },
];

// SVG icons matching the reference design pixel-perfect
const METHODOLOGY_ITEMS = [
  {
    id: 1,
    title: "Live Interactive Classes",
    icon: ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="6" width="13" height="12" rx="3" />
        <path d="M15 10l5-3v10l-5-3v-4z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Hands-On Labs",
    icon: ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <circle cx="6" cy="9" r="0.75" fill="currentColor" />
        <circle cx="9" cy="9" r="0.75" fill="currentColor" />
        <circle cx="12" cy="9" r="0.75" fill="currentColor" />
        <circle cx="15" cy="9" r="0.75" fill="currentColor" />
        <circle cx="18" cy="9" r="0.75" fill="currentColor" />
        <circle cx="6" cy="12" r="0.75" fill="currentColor" />
        <circle cx="9" cy="12" r="0.75" fill="currentColor" />
        <circle cx="12" cy="12" r="0.75" fill="currentColor" />
        <circle cx="15" cy="12" r="0.75" fill="currentColor" />
        <circle cx="18" cy="12" r="0.75" fill="currentColor" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "AI-Based Activities",
    icon: ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.5 4a3.5 3.5 0 0 0-3.5 3.5c0 .34.05.67.14.98A4 4 0 0 0 4 12a4 4 0 0 0 1.5 3.12 3.5 3.5 0 0 0 4 4.88 4 4 0 0 0 2.5-1" />
        <path d="M14.5 4a3.5 3.5 0 0 1 3.5 3.5c0 .34-.05.67-.14.98A4 4 0 0 1 20 12a4 4 0 0 1-1.5 3.12 3.5 3.5 0 0 1-4 4.88 4 4 0 0 1-2.5-1" />
        <path d="M12 4.5v15" />
        <path d="M9.5 8.5C8 9.5 8 11.5 9.5 12.5" />
        <path d="M14.5 8.5C16 9.5 16 11.5 14.5 12.5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hackathons",
    icon: ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
        <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
        <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
        <path d="M12 16v4" />
        <path d="M8 20h8" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Weekly Doubt Clearing",
    icon: ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 9a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h1v3l3-3h1a4 4 0 0 0 4-4V9z" />
        <path d="M18 9h-1a5 5 0 0 1-5 5v1a3 3 0 0 0 3 3h2l3 3v-3h1a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Career Mentoring",
    icon: ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
        <path d="M10 14l2 3 2-3" />
      </svg>
    ),
  },
];

export default function StudentBenefits() {
  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 overflow-hidden">
      {/* Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 z-10">

        {/* ============================================================ */}
        {/* PART 1: STUDENT BENEFITS                                     */}
        {/* ============================================================ */}
        <div className="relative pb-24 sm:pb-32">

          {/* Section Header */}
          <div className="relative text-center max-w-xl mx-auto pb-12 sm:pb-16">
            <MotionText delay={0.1} duration={0.6}>
              <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Student benefits
              </h2>
            </MotionText>

            {/* Top-Right Curled 3D Vector */}
            <motion.div
              animate={{
                y: [-6, 6, -6],
                rotate: [0, 6, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-8 sm:-top-8 sm:-right-16 lg:-right-24 w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 pointer-events-none opacity-80"
            >
              <Image
                src="/vector/Group.png"
                alt="3D Ribbon Vector"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Interactive Student Center Visual with Floating Pills */}
          <div className="relative max-w-[1140px] 2xl:max-w-[1240px] h-[580px] sm:h-[660px] md:h-[720px] lg:h-[800px] mx-auto flex items-end justify-center">

            {/* Ambient Back Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#00BF63]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Center Student Image */}
            <MotionFadeIn delay={0.2} duration={0.7} className="relative z-10 h-full w-full flex items-end justify-center">
              <div className="relative w-[300px] sm:w-[380px] md:w-[430px] lg:w-[470px] h-[90%] sm:h-[94%]">
                <Image
                  src="/user.png"
                  alt="Thynkspire Student"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />
              </div>
            </MotionFadeIn>

            {/* Floating Floating Benefit Capsule Pills */}
            {BENEFITS_PILLS.map((pill) => (
              <motion.div
                key={pill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [-6, 6, -6],
                }}
                transition={{
                  y: {
                    duration: pill.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.5, delay: pill.delay },
                  scale: { duration: 0.5, delay: pill.delay },
                }}
                whileHover={{ scale: 1.1, zIndex: 40 }}
                style={{
                  transform: `rotate(${pill.rotate})`,
                }}
                className={`absolute ${pill.position} z-20 cursor-pointer select-none`}
              >
                <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#040906]/90 border border-[#00BF63]/50 backdrop-blur-md shadow-[0_0_25px_rgba(0,191,99,0.25)] hover:border-[#00BF63] hover:shadow-[0_0_35px_rgba(0,191,99,0.5)] transition-all duration-300">
                  <span className="font-poppins text-xs sm:text-sm md:text-base font-medium text-white tracking-wide whitespace-nowrap">
                    {pill.label}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Floating Decorative Vector Ribbon near Bottom */}
            <motion.div
              animate={{
                y: [6, -6, 6],
                rotate: [0, -6, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-10 right-10 sm:right-20 lg:right-28 w-14 sm:w-20 lg:w-24 h-14 sm:h-20 lg:h-24 pointer-events-none opacity-80 z-20"
            >
              <Image
                src="/vector/Group.png"
                alt="3D Ribbon Element"
                fill
                className="object-contain"
              />
            </motion.div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* PART 2: LEARNING METHODOLOGY                                 */}
        {/* ============================================================ */}
        <div className="relative pt-12 sm:pt-16 border-t border-white/5">

          {/* Section Heading */}
          <div className="text-center max-w-4xl mx-auto pb-14 sm:pb-20">
            <MotionText delay={0.1} duration={0.6}>
              <h2 className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white whitespace-nowrap">
                Learning Methodology
              </h2>
            </MotionText>
          </div>

          {/* 6 Icons Row Grid */}
          <MotionFadeIn delay={0.2} duration={0.6}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 max-w-[1353px] mx-auto">
              {METHODOLOGY_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.08, y: -5 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    {/* Glowing Icon Square Container */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#040906] border border-[#00BF63]/40 flex items-center justify-center text-[#00BF63] shadow-[0_0_20px_rgba(0,191,99,0.2)] group-hover:border-[#00BF63] group-hover:shadow-[0_0_35px_rgba(0,191,99,0.45)] group-hover:bg-[#07130c] transition-all duration-300">
                      <IconComponent className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2]" />
                    </div>

                    {/* Title Label Below */}
                    <span className="font-poppins text-xs sm:text-sm text-slate-200 group-hover:text-white transition-colors duration-200 font-normal mt-3.5 leading-snug lg:whitespace-nowrap">
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </MotionFadeIn>

        </div>

      </div>
    </section>
  );
}
