"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar, FiSquare, FiCircle, FiZap, FiShield } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

interface FeatureBadge {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const FEATURE_BADGES: FeatureBadge[] = [
  {
    id: "learning",
    icon: <FiStar className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BF62]" />,
    label: "Great Learning Experience",
  },
  {
    id: "certificate",
    icon: <FiSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BF62]" />,
    label: "Certificates for All",
  },
  {
    id: "quizzes",
    icon: <FiCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BF62]" />,
    label: "Expertly Designed Quizzes",
  },
  {
    id: "recognition",
    icon: <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BF62]" />,
    label: "National Level Recognition",
  },
  {
    id: "prizes",
    icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BF62]" />,
    label: "Amazing Prizes",
  },
];

export default function Upcoming() {
  return (
    <section className="relative w-full text-white py-16 sm:py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] bg-[#00BF62]/6 blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Top Tag Header */}
        <div className="flex items-center gap-3">
          <MotionFadeIn delay={0.1} direction="up" className="flex items-center gap-3">
            <span className="w-7 h-[2px] bg-[#00BF62]" />
            <span className="font-poppins text-base sm:text-2xl font-medium text-white/70 tracking-wide">
              Upcoming Events
            </span>
          </MotionFadeIn>
        </div>

        {/* Main CTA Showcase Card with Bottom-Left & Top-Right Green Gradients */}
        <MotionFadeIn delay={0.2} direction="up">
          <div className="relative w-full rounded-[24px] sm:rounded-[36px] bg-[#050807]/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-12 text-center group">
            
            {/* Top-Right Green Glow Gradient */}
            <div className="absolute -top-16 -right-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#00BF62]/25 blur-[90px] pointer-events-none" />

            {/* Bottom-Left Green Glow Gradient */}
            <div className="absolute -bottom-16 -left-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#00BF62]/25 blur-[90px] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-6">
              
              {/* Main Headline */}
              <MotionText delay={0.25}>
                <h2 className="font-clash text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                  Think. Compete. <span className="text-[#00BF62]">Win.</span>
                </h2>
              </MotionText>

              {/* Subtitle Description */}
              <MotionFadeIn delay={0.3} direction="up">
                <p className="font-poppins text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
                  Build real skills. Work on real projects. Gain industry exposure. Start your cybersecurity career with confidence.
                </p>
              </MotionFadeIn>

              {/* CTA Button: Book Now */}
              <MotionFadeIn delay={0.35} direction="up" className="pt-2">
                <Link href="#book">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group/btn inline-flex items-center gap-3 pl-6 pr-2.5 py-2 rounded-full border border-white/30 bg-black/80 hover:border-[#00BF62] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide">
                      Book Now
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300">
                      <FiArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </div>
                  </motion.button>
                </Link>
              </MotionFadeIn>

            </div>

          </div>
        </MotionFadeIn>

        {/* Bottom 5 Feature Icon Badges Row */}
        <MotionFadeIn delay={0.4} direction="up">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-4 sm:pt-6">
            {FEATURE_BADGES.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="flex flex-col items-center text-center group/badge"
              >
                {/* Rounded Square Icon Box */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[22px] bg-[#0A100C]/90 border border-[#00BF62]/35 group-hover/badge:border-[#00BF62] group-hover/badge:bg-[#00BF62]/10 transition-all duration-300 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
                  {badge.icon}
                </div>

                {/* Feature Label */}
                <span className="font-poppins text-xs sm:text-[13px] text-white/80 group-hover/badge:text-white font-medium text-center mt-3.5 max-w-[130px] leading-snug transition-colors duration-300">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
