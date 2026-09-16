"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

import { ProgramDetail } from "@/data/programsData";

interface ProgramCTAProps {
  program?: ProgramDetail;
}

export default function ProgramCTA({ program }: ProgramCTAProps = {}) {
  const prefix = program?.cta?.prefix || "Ready to Become an";
  const highlighted = program?.cta?.highlighted || "AI-Powered";
  const suffix = program?.cta?.suffix || "Cyber Security Professional?";
  const subtitle = program?.cta?.subtitle || "Build real skills. Work on real projects. Gain industry exposure. Start your career with confidence.";
  const buttonText = program?.cta?.buttonText || "Book Now";

  return (
    <section className="relative w-full bg-black text-white py-10 sm:py-16 overflow-hidden">
      
      {/* Top-Left Curled 3D Vector */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-4, 0, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-4 -left-6 sm:left-4 lg:left-12 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 pointer-events-none z-10 opacity-70"
      >
        <Image
          src="/vector/Group.png"
          alt="3D Ribbon Vector"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 z-10">
        
        {/* Glow CTA Card Frame */}
        <MotionFadeIn delay={0.15} direction="up">
          <div 
            className="relative w-full max-w-[1200px] mx-auto rounded-[24px] sm:rounded-[32px] border border-[#00BF63] bg-[#020503] px-6 py-10 sm:px-12 sm:py-12 lg:py-14 flex flex-col items-center text-center overflow-hidden shadow-[0_0_60px_rgba(0,191,99,0.35),inset_0_0_40px_rgba(0,191,99,0.12)] group"
          >
            {/* Left Bottom Inside Corner Green Gradient */}
            <div 
              className="absolute bottom-0 left-0 w-[60%] h-[85%] pointer-events-none z-0"
              style={{
                background: "radial-gradient(ellipse at 0% 100%, rgba(0, 191, 99, 0.65) 0%, rgba(0, 191, 99, 0.3) 35%, rgba(0, 191, 99, 0.08) 65%, transparent 85%)",
              }}
            />

            {/* Right Top Inside Corner Green Gradient */}
            <div 
              className="absolute top-0 right-0 w-[60%] h-[85%] pointer-events-none z-0"
              style={{
                background: "radial-gradient(ellipse at 100% 0%, rgba(0, 191, 99, 0.6) 0%, rgba(0, 191, 99, 0.28) 35%, rgba(0, 191, 99, 0.08) 65%, transparent 85%)",
              }}
            />

            {/* Ambient Corner Glow Enhancers */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00BF63]/30 blur-[60px] pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BF63]/30 blur-[60px] pointer-events-none z-0" />

            {/* Inner Content */}
            <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto space-y-4 sm:space-y-5">
              
              {/* Main Heading */}
              <MotionText delay={0.2}>
                <h2 className="font-clash text-2xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-white leading-[1.2]">
                  {prefix} <span className="text-[#00BF63]">{highlighted}</span> <br />
                  {suffix}
                </h2>
              </MotionText>

              {/* Subtitle */}
              <p className="font-poppins text-xs sm:text-sm md:text-[15px] text-slate-200 max-w-lg mx-auto font-light leading-relaxed">
                {subtitle}
              </p>

              {/* Book Now Button */}
              <div className="pt-2 sm:pt-3 flex justify-center">
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="group/btn flex items-center gap-3 pl-5 sm:pl-6 pr-2 py-2 rounded-full border border-white/60 bg-black/90 hover:border-[#00BF63] hover:shadow-[0_0_25px_rgba(0,191,99,0.5)] transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-medium text-white tracking-wide">
                      {buttonText}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover/btn:bg-[#00d66e] group-hover/btn:rotate-45 transition-all duration-300 shadow-[0_0_12px_#00BF63]">
                      <FiArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </motion.div>
                </Link>
              </div>

            </div>
          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
