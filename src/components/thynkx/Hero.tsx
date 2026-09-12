"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

const FEATURE_PILLS = [
  "Massive Competition",
  "Learn Compete.Win Big",
  "Nationwide Reach",
  "Knowledge Meets Fun",
];

export default function ThynkxHero() {
  return (
    <section className="relative w-full text-white pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Background ambient green glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[350px] bg-[#00BF62]/10 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8">
        <MotionFadeIn delay={0.1} direction="up">
          {/* Main Hero Showcase Card */}
          <div className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl p-5 sm:p-8 lg:p-10 flex flex-col justify-end group">
            
            {/* Background Animated GIF without dark overlays */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/thynkx/hero.gif"
                alt="India's Biggest Quizzing Event - Thynk X"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority
                unoptimized
              />
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4 sm:space-y-5 max-w-3xl lg:max-w-4xl xl:max-w-5xl">
              
              {/* Headings */}
              <div className="space-y-2">
                <MotionText delay={0.15}>
                  <h1 className="font-clash text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
                    India&apos;s Biggest <br />
                    <span className="text-[#00BF62]">Quizzing Event.</span>
                  </h1>
                </MotionText>

                <MotionFadeIn delay={0.2} direction="up">
                  <p className="font-poppins text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Thynk X Brings Schools And Colleges From Across The Country Into One National Quizzing Arena — Where Knowledge Meets Fun And Bright Minds Compete For The Top Spot.
                  </p>
                </MotionFadeIn>
              </div>

              {/* Feature Badges: Automatically scrolling in 1 line on mobile, static row on desktop */}
              <MotionFadeIn delay={0.25} direction="up" className="w-full">
                {/* Mobile: Infinite smooth auto-scrolling ticker in one single line */}
                <div className="w-full overflow-hidden relative block lg:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                  <motion.div
                    className="flex items-center gap-2.5 shrink-0 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {[...FEATURE_PILLS, ...FEATURE_PILLS, ...FEATURE_PILLS, ...FEATURE_PILLS].map((pill, idx) => (
                      <div
                        key={idx}
                        className="shrink-0 whitespace-nowrap rounded-[12px] bg-black/60 border border-[#00BF62]/50 backdrop-blur-md px-3.5 py-2 text-xs font-poppins text-white font-medium shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                      >
                        {pill}
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Desktop: Static 1-line flex row */}
                <div className="hidden lg:flex items-center gap-3">
                  {FEATURE_PILLS.map((pill, idx) => (
                    <div
                      key={idx}
                      className="shrink-0 whitespace-nowrap rounded-[16px] bg-black/60 border border-[#00BF62]/50 backdrop-blur-md px-5 py-2.5 text-sm font-poppins text-white font-medium shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#00BF62] hover:bg-black/80 transition-all"
                    >
                      {pill}
                    </div>
                  ))}
                </div>
              </MotionFadeIn>

              {/* CTA Button */}
              <MotionFadeIn delay={0.3} direction="up" className="pt-0.5">
                <Link href="#register">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group/btn flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/30 bg-black/80 hover:border-[#00BF62] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide">
                      Register Now
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300">
                      <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </motion.button>
                </Link>
              </MotionFadeIn>

            </div>

            {/* Subtle 4-Point Star Sparkle in Bottom Right */}
            <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-10 pointer-events-none z-10 hidden md:block opacity-40">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C21 11.598 30.402 21 42 21C30.402 21 21 30.402 21 42C21 30.402 11.598 21 0 21C11.598 21 21 11.598 21 0Z" fill="white" fillOpacity="0.7"/>
              </svg>
            </div>

          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
