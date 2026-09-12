"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionScale } from "./MotionWrapper";

export default function AboutCompany() {
  return (
    <section className="relative w-full text-white pt-12 sm:pt-16 lg:pt-10 pb-20 sm:pb-24 overflow-hidden bg-black">
      {/* Outer container matching exact Hero & Header max width */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8 lg:space-y-10">
        
        {/* Section Header Tag */}
        <MotionText delay={0.1} duration={0.6}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-[3px] bg-[#00BF63] rounded-full" />
            <h3 className="font-clash text-xl sm:text-2xl font-bold tracking-tight text-white/70">
              About Company
            </h3>
          </div>
        </MotionText>

        {/* Central Content Area - Exact Figma 1154px layout */}
        <div className="relative max-w-[1154px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 sm:gap-10 lg:gap-8 mt-4 sm:mt-8 lg:mt-40 min-h-[auto] lg:min-h-[480px]">

          {/* Left Column: 01 Wht We Do (Top-aligned, snug against the center photo) */}
          <MotionFadeIn direction="right" distance={30} duration={0.7} className="w-full lg:w-[296px] flex flex-col gap-3 sm:gap-4 z-20 shrink-0 lg:pt-2">
            
            <div className="flex items-baseline gap-3">
              <span className="font-clash text-2xl sm:text-3xl font-bold text-white leading-none">01</span>
              <h4 className="font-clash text-2xl sm:text-[34px] font-semibold text-[#00BF63] leading-none whitespace-nowrap">
                Wht We Do
              </h4>
            </div>

            <p className="font-poppins text-slate-300 text-xs sm:text-sm leading-relaxed max-w-full lg:max-w-[296px] font-normal opacity-90">
              We combine practical learning, technology, innovation, and industry exposure to help students build real-world skills and gain valuable experience.
            </p>

            {/* Bottom-Left Green Ribbon Loop Doodle (Group-1028.png) */}
            <motion.div
              className="relative w-12 sm:w-16 h-16 sm:h-20 mt-4 sm:mt-8 lg:mt-50 ml-0 lg:ml-20 pointer-events-none self-start hidden sm:block"
              animate={{
                y: [0, -6, 0],
                rotate: [0, -4, 4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/vector/Group-1028.png"
                alt="Green Ribbon Loop Doodle"
                fill
                className="object-contain"
              />
            </motion.div>

          </MotionFadeIn>

          {/* Center Column: Grayscale Graduation Image & Large Green X Background Outline */}
          <MotionScale delay={0.2} duration={0.8} className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[427px] h-[340px] sm:h-[420px] lg:h-[468px] mx-auto lg:mx-0 flex justify-center items-center shrink-0 z-10">
            
            {/* Large Green "X" and Bottom-Right Box Background Vector Outline exported from Figma */}
            <motion.div
              className="absolute w-[360px] sm:w-[540px] lg:w-[672px] h-[340px] sm:h-[500px] lg:h-[615px] pointer-events-none z-0 opacity-90"
              animate={{
                scale: [1, 1.015, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/vector/about_vec_1082_18697.svg"
                alt="Green X and Box Background Outline"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Center Graduation Photo (Exact Figma 427x468 dimension with rounded corners) */}
            <div className="relative w-[250px] sm:w-[380px] lg:w-[427px] h-[320px] sm:h-[400px] lg:h-[468px] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 shadow-2xl z-10 bg-neutral-900">
              <Image
                src="/hero/about.jpg"
                alt="Graduation Celebration"
                fill
                className="object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>

          </MotionScale>

          {/* Right Column: 02 What We Aim For (Positioned below the top-right doodle) */}
          <MotionFadeIn direction="left" distance={30} duration={0.7} className="w-full lg:w-[360px] flex flex-col z-20 shrink-0 lg:pt-6">
            
            {/* Top-Right Green Ribbon Loop Doodle (Group-1028.png) */}
            <motion.div
              className="relative w-12 sm:w-16 h-16 sm:h-20 pointer-events-none self-start lg:mb-12 hidden sm:block"
              animate={{
                y: [0, 6, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Image
                src="/vector/Group-1028.png"
                alt="Green Ribbon Loop Doodle"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* 02 What We Aim For (Aligned towards the bottom-right of the image) */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-clash text-2xl sm:text-3xl font-bold text-white leading-none">02</span>
                <h4 className="font-clash text-2xl sm:text-[34px] font-semibold text-[#00BF63] leading-none whitespace-nowrap">
                  What We Aim For
                </h4>
              </div>

              <p className="font-poppins text-slate-300 text-xs sm:text-sm leading-relaxed max-w-full lg:max-w-[360px] font-normal opacity-90">
                We create opportunities through competitions, career pathways, and industry connections, helping students discover their potential and become future-ready professionals.
              </p>
            </div>

          </MotionFadeIn>

        </div>

        {/* Bottom Center View More Button */}
        <MotionFadeIn delay={0.2} direction="up" className="flex justify-center pt-2">
          <Link href="#about-more">
            <button
              className="group flex items-center justify-between gap-4 pl-7 pr-2.5 py-2.5 rounded-full border border-white/40 bg-black hover:border-[#00BF63] transition-all duration-300 shadow-xl"
              style={{
                borderRadius: "38px",
              }}
            >
              <span className="font-poppins text-sm font-medium text-white tracking-wide">
                View More
              </span>
              <div className="w-[34px] h-[34px] rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          </Link>
        </MotionFadeIn>

      </div>
    </section>
  );
}

