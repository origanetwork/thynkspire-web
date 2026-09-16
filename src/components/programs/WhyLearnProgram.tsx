"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiSettings,
  FiBriefcase,
  FiUserCheck,
} from "react-icons/fi";
import { Rocket, Brain } from "lucide-react";
import { MotionFadeIn, MotionText, MotionStagger, MotionStaggerItem } from "@/components/MotionWrapper";
import { ProgramDetail, getDefaultProgram } from "@/data/programsData";

interface WhyLearnProgramProps {
  program?: ProgramDetail;
}

export default function WhyLearnProgram({ program: initialProgram }: WhyLearnProgramProps) {
  const program = initialProgram || getDefaultProgram();

  const cardsData = program.whyLearn?.cards || [
    {
      id: 1,
      title: "AI Powered Security",
      desc: "Learn how Artificial Intelligence is transforming modern cyber defence through automated threat hunting and pattern recognition.",
    },
    {
      id: 2,
      title: "Real Industry Labs",
      desc: "Practice inside simulated enterprise environments, dealing with real attack vectors and sophisticated defense tools.",
    },
    {
      id: 3,
      title: "Industry Internship",
      desc: "Gain practical experience through real-world industry exposure, working on live projects under professional mentorship.",
    },
    {
      id: 4,
      title: "Career Support",
      desc: "Comprehensive assistance including resume building, LinkedIn optimization, mock interviews, and placement assistance.",
    },
  ];

  const cardIcons = [
    <Brain key={1} className="w-5 h-5 text-[#00BF63]" />,
    <FiSettings key={2} className="w-5 h-5 text-[#00BF63]" />,
    <FiBriefcase key={3} className="w-5 h-5 text-[#00BF63]" />,
    <FiUserCheck key={4} className="w-5 h-5 text-[#00BF63]" />,
  ];

  const futureSkills = program.whyLearn?.futureSkills || [
    "Cloud Security",
    "SOC Operations",
    "Threat Hunting",
    "AI Security",
    "Automation",
  ];

  const eligibilityDegrees = program.whyLearn?.eligibilityDegrees || [
    "B.Tech",
    "BCA",
    "MCA",
    "B.Sc Computer Science",
    "B.Sc IT",
    "Diploma Students",
  ];

  const eligibilityNote = program.whyLearn?.eligibilityNote || "Degree Students From Any Stream Interested In Emerging Tech";

  // Mobile Auto-changing Card State
  const [mobileIdx, setMobileIdx] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const totalMobileCards = 5; // 4 feature cards + 1 future skills card

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setMobileIdx((prev) => (prev + 1) % totalMobileCards);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, totalMobileCards]);

  return (
    <section className="relative w-full text-white py-16 sm:py-24 overflow-hidden">
      
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#00BF63]/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#00BF63]/10 blur-[140px] pointer-events-none -z-10" />

      {/* Main Container matching Header & Hero width with increased left and right padding */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 space-y-20 sm:space-y-28">

        {/* SECTION 1: WHY LEARN PROGRAM */}
        <div className="space-y-12 sm:space-y-16">
          
          {/* Section Heading: Centered Container with Left-aligned Text Start */}
          <div className="flex justify-center w-full">
            <div className="w-fit text-left">
              <MotionText delay={0.1} duration={0.6}>
                <h2 className="font-clash text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.14] text-left">
                  Why Learn <br />
                  <span className="text-[#00BF63] block drop-shadow-[0_0_24px_rgba(0,191,99,0.35)]">
                    {program.whyLearn?.headingHighlight || `${program.highlightedTitle}?`}
                  </span>
                </h2>
              </MotionText>
            </div>
          </div>

          {/* ============================================================ */}
          {/* MOBILE ONLY: AUTO-CHANGED CARD CAROUSEL (NOT COLUMN)        */}
          {/* ============================================================ */}
          <div 
            className="block lg:hidden w-full"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative min-h-[290px] sm:min-h-[310px] flex flex-col justify-between">
              {/* Dynamic Animated Card */}
              {mobileIdx < 4 ? (
                <motion.div
                  key={mobileIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-[28px] p-6 sm:p-8 flex flex-col justify-between gap-5 min-h-[240px] border border-[#00BF63]/40 shadow-[0_0_20px_rgba(0,191,99,0.15)] bg-black/60 backdrop-blur-xl"
                >
                  <div className="w-11 h-11 rounded-2xl border border-[#00BF63]/40 bg-black shadow-[0_0_15px_rgba(0,191,99,0.25)] flex items-center justify-center shrink-0">
                    {cardIcons[mobileIdx] || cardIcons[0]}
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-clash text-xl font-bold text-white tracking-tight leading-snug">
                      {cardsData[mobileIdx]?.title}
                    </h3>
                    <p className="font-poppins text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {cardsData[mobileIdx]?.desc}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="future-skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-[28px] p-6 sm:p-8 flex flex-col justify-between gap-5 min-h-[240px] border border-[#00BF63]/40 shadow-[0_0_20px_rgba(0,191,99,0.15)] bg-black/60 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl border border-[#00BF63]/40 bg-black shadow-[0_0_15px_rgba(0,191,99,0.25)] flex items-center justify-center shrink-0">
                      <Rocket className="w-5 h-5 text-[#00BF63]" />
                    </div>
                    <h3 className="font-clash text-xl font-bold text-white tracking-tight leading-snug">
                      Future Skills
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {futureSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 rounded-full border border-white/25 bg-black text-[#00BF63] text-xs font-poppins font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Progress Pagination Dots */}
              <div className="flex items-center justify-center gap-2 pt-6">
                {Array.from({ length: totalMobileCards }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      mobileIdx === idx
                        ? "w-7 h-2 bg-[#00BF63] shadow-[0_0_10px_#00BF63]"
                        : "w-2 h-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* DESKTOP ONLY: 3 ON TOP + 2 ON BOTTOM GRID (UNCHANGED)       */}
          {/* ============================================================ */}
          <div className="hidden lg:block space-y-6">
            
            {/* Top Row: 3 Equal Width Cards */}
            <MotionStagger staggerDelay={0.12} className="grid grid-cols-3 gap-6">
              {cardsData.slice(0, 3).map((card, idx) => (
                <MotionStaggerItem
                  key={card.id}
                  className="group rounded-[32px] p-[28px] sm:p-[36px] lg:p-[40px] flex flex-col justify-between gap-[16px] min-h-[280px] lg:min-h-[328px] border border-[#00BF63]/30 hover:border-[#00BF63] transition-all duration-300"
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0px 0px 4px 0px #00BF63",
                  }}
                >
                  <div className="w-11 h-11 rounded-2xl border border-[#00BF63]/40 bg-black shadow-[0_0_15px_rgba(0,191,99,0.25)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,191,99,0.5)] transition-all">
                    {cardIcons[idx] || cardIcons[0]}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-clash text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-[#00BF63] transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-poppins text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStagger>

            {/* Bottom Row: 2 Asymmetrical Cards (1/3 + 2/3 width) */}
            <div className="grid grid-cols-3 gap-6">
              
              {/* Bottom-Left Card: 4th card (1 col) */}
              <MotionFadeIn delay={0.2} direction="up" className="col-span-1">
                <div
                  className="group rounded-[32px] p-[28px] sm:p-[36px] lg:p-[40px] flex flex-col justify-between gap-[16px] min-h-[280px] lg:min-h-[328px] border border-[#00BF63]/30 hover:border-[#00BF63] transition-all duration-300 h-full"
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0px 0px 4px 0px #00BF63",
                  }}
                >
                  <div className="w-11 h-11 rounded-2xl border border-[#00BF63]/40 bg-black shadow-[0_0_15px_rgba(0,191,99,0.25)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,191,99,0.5)] transition-all">
                    {cardIcons[3]}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-clash text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-[#00BF63] transition-colors">
                      {cardsData[3]?.title || "Career Support"}
                    </h3>
                    <p className="font-poppins text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {cardsData[3]?.desc || "Comprehensive placement and mentoring guidance."}
                    </p>
                  </div>
                </div>
              </MotionFadeIn>

              {/* Bottom-Right Wide Card: Future Skills (2 cols with Skill Pills) */}
              <MotionFadeIn delay={0.25} direction="up" className="col-span-2">
                <div
                  className="group rounded-[32px] p-[28px] sm:p-[36px] lg:p-[40px] flex flex-row items-center justify-between gap-[32px] min-h-[280px] lg:min-h-[328px] border border-[#00BF63]/30 hover:border-[#00BF63] transition-all duration-300 h-full"
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0px 0px 4px 0px #00BF63",
                  }}
                >
                  {/* Left inside card: Icon & Title */}
                  <div className="space-y-4 shrink-0">
                    <div className="w-11 h-11 rounded-2xl border border-[#00BF63]/40 bg-black shadow-[0_0_15px_rgba(0,191,99,0.25)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,191,99,0.5)] transition-all">
                      <Rocket className="w-5 h-5 text-[#00BF63]" />
                    </div>
                    <h3 className="font-clash text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-[#00BF63] transition-colors">
                      Future Skills
                    </h3>
                  </div>

                  {/* Right inside card: Interactive Capsule Pills */}
                  <div className="flex flex-wrap items-center gap-3 w-auto">
                    {futureSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-5 py-2 rounded-full border border-white/20 bg-black/70 text-[#00BF63] text-sm font-poppins font-medium hover:border-[#00BF63] transition-colors shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </MotionFadeIn>

            </div>

          </div>

        </div>

        {/* SECTION 2: WHO CAN PARTICIPATE */}
        <div className="space-y-8 text-center pt-8 sm:pt-12">
          
          {/* Title */}
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Who Can{" "}
              <span className="text-[#00BF63] drop-shadow-[0_0_24px_rgba(0,191,99,0.35)]">
                Participate?
              </span>
            </h2>
          </MotionText>

          {/* Centered Capsule Degrees List */}
          <MotionFadeIn delay={0.2} direction="up" className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto pt-2">
              {eligibilityDegrees.map((degree, idx) => (
                <div
                  key={idx}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/50 bg-black text-[#00BF63] font-poppins text-xs sm:text-sm font-medium hover:border-[#00BF63] hover:scale-105 transition-all shadow-lg"
                >
                  {degree}
                </div>
              ))}
            </div>
          </MotionFadeIn>

          {/* Bottom Green Note */}
          <MotionFadeIn delay={0.25} direction="up">
            <p className="font-poppins text-xs sm:text-sm md:text-base font-semibold text-[#00BF63] pt-4 tracking-wide max-w-2xl mx-auto">
              {eligibilityNote}
            </p>
          </MotionFadeIn>

        </div>

      </div>
    </section>
  );
}
