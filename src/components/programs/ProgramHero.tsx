"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCpu,
  FiShare2,
  FiBriefcase,
  FiArrowUpRight,
} from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { ProgramDetail, getDefaultProgram } from "@/data/programsData";

interface ProgramHeroProps {
  program?: ProgramDetail;
}

export default function ProgramHero({ program: initialProgram }: ProgramHeroProps) {
  const program = initialProgram || getDefaultProgram();

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
        return <FiCalendar className="w-4 h-4 text-[#00BF63]" />;
      case "labs":
        return <FiCpu className="w-4 h-4 text-[#00BF63]" />;
      case "projects":
        return <FiShare2 className="w-4 h-4 text-[#00BF63]" />;
      case "internship":
      default:
        return <FiBriefcase className="w-4 h-4 text-[#00BF63]" />;
    }
  };

  return (
    <section className="relative w-full text-white pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden">
      
      {/* Background Ambient Glows & Spotlights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        {/* Top-Left Green Radial Spotlight */}
        <div
          className="absolute -top-24 -left-24 w-[550px] sm:w-[750px] h-[550px] opacity-40 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(0, 191, 99, 0.45) 0%, rgba(0, 191, 99, 0.05) 60%, rgba(0, 0, 0, 0) 80%)",
          }}
        />

        {/* Ambient Top-Left Circuit Vector Line (Above content) */}
        <svg
          className="absolute top-24 sm:top-28 lg:top-32 left-0 w-[45%] max-w-[560px] h-[80px] pointer-events-none hidden md:block"
          viewBox="0 0 560 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 16 L 250 16 L 310 56 L 470 56"
            stroke="#00BF63"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          <circle cx="470" cy="56" r="4" fill="#00BF63" />
          <circle cx="470" cy="56" r="9" fill="#00BF63" fillOpacity="0.25" />
        </svg>

        {/* Ambient Bottom-Right Circuit Vector Line (Behind & End Right of Image) */}
        <svg
          className="absolute bottom-12 sm:bottom-16 right-0 w-[35%] max-w-[460px] h-[70px] pointer-events-none hidden md:block"
          viewBox="0 0 460 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 52 L 140 52 L 175 18 L 460 18"
            stroke="#00BF63"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          <circle cx="140" cy="52" r="3.5" fill="#00BF63" />
          <circle cx="140" cy="52" r="8" fill="#00BF63" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Main Container with increased left and right padding */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-16">
          
          {/* Hero Program Image: First on mobile (order-1), Right on desktop (lg:order-2) */}
          <div className="w-full lg:w-[48%] flex items-center justify-center z-10 order-1 lg:order-2">
            <MotionFadeIn delay={0.2} direction="up" distance={20} className="w-full">
              <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] lg:h-[540px] xl:h-[600px] rounded-none overflow-hidden group">
                <Image
                  src={program.image}
                  alt={program.highlightedTitle}
                  fill
                  priority
                  className="object-contain lg:object-cover object-center rounded-none"
                />
              </div>
            </MotionFadeIn>
          </div>

          {/* Information, Heading, Stats & CTA: Second on mobile (order-2), Left on desktop (lg:order-1) */}
          <div className="w-full lg:w-[52%] space-y-6 sm:space-y-8 z-10 order-2 lg:order-1">
            
            {/* Subtitle Badge / Tag */}
            <MotionText delay={0.1} duration={0.5}>
              <span className="font-poppins text-xs sm:text-sm md:text-base font-semibold text-[#00BF63] tracking-wide block">
                {program.subtitleTag}
              </span>
            </MotionText>

            {/* Main Program Heading */}
            <MotionText delay={0.2} duration={0.6}>
              <h1 className="font-clash text-3xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-bold text-white tracking-tight leading-[1.12]">
                {program.title}{" "}
                <span className="text-[#00BF63] block sm:inline drop-shadow-[0_0_24px_rgba(0,191,99,0.35)]">
                  {program.highlightedTitle}
                </span>
              </h1>
            </MotionText>

            {/* Description Subtext */}
            <MotionText delay={0.3} duration={0.6}>
              <p className="font-poppins text-zinc-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl">
                {program.description}
              </p>
            </MotionText>

            {/* 4 Quick Stat Metric Cards with all data aligned to center */}
            <MotionFadeIn delay={0.35} direction="up" distance={20}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pt-1">
                {program.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-[16px] border border-white/10 bg-[#0e1210]/90 backdrop-blur-md flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3 shadow-lg hover:border-[#00BF63]/60 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center">
                      {getStatIcon(stat.icon)}
                    </div>
                    <div className="text-center w-full">
                      <h4 className="font-clash text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
                        {stat.value}
                      </h4>
                      <p className="font-poppins text-[11px] sm:text-xs text-zinc-400 capitalize mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionFadeIn>

            {/* Apply Now Action CTA Button */}
            <MotionFadeIn delay={0.4} direction="up" distance={15}>
              <div className="pt-2">
                <Link href="#apply">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full border-2 border-white/70 text-white hover:border-[#00BF63] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <span className="text-sm font-semibold tracking-wide font-poppins">
                      Apply Now
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0">
                      <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </motion.button>
                </Link>
              </div>
            </MotionFadeIn>

          </div>

        </div>
      </div>
    </section>
  );
}
