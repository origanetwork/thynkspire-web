"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

export default function ProgramFitsYouCTA() {
  return (
    <section className="relative w-full bg-black text-white py-10 sm:py-16 overflow-hidden">
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 z-10">
        
        <MotionFadeIn delay={0.15} direction="up">
          <div
            className="relative w-full max-w-[1140px] 2xl:max-w-[1240px] mx-auto rounded-[24px] sm:rounded-[32px] border border-[#00BF63]/35 bg-[#020503] px-6 py-10 sm:px-12 sm:py-12 lg:py-14 flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_0_40px_rgba(0,191,99,0.18)] group"
          >
            {/* Top-Right Corner Green Radial Glow */}
            <div
              className="absolute top-0 right-0 w-[55%] h-[80%] pointer-events-none z-0 opacity-90"
              style={{
                background: "radial-gradient(ellipse at 100% 0%, rgba(0, 191, 99, 0.45) 0%, rgba(0, 191, 99, 0.2) 35%, rgba(0, 191, 99, 0.05) 60%, transparent 80%)",
              }}
            />

            {/* Bottom-Left Corner Green Radial Glow */}
            <div
              className="absolute bottom-0 left-0 w-[55%] h-[80%] pointer-events-none z-0 opacity-90"
              style={{
                background: "radial-gradient(ellipse at 0% 100%, rgba(0, 191, 99, 0.4) 0%, rgba(0, 191, 99, 0.18) 35%, rgba(0, 191, 99, 0.04) 60%, transparent 80%)",
              }}
            />

            {/* Ambient Deep Corner Glow Enforcers */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#00BF63]/25 blur-[70px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#00BF63]/25 blur-[70px] pointer-events-none z-0" />

            {/* Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              
              {/* Heading */}
              <MotionText delay={0.2}>
                <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Not sure which program <br />
                  <span className="text-[#00BF63] block mt-1">fits you?</span>
                </h2>
              </MotionText>

              {/* Subtitle */}
              <p className="font-poppins text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed mt-4 sm:mt-5 max-w-xl">
                Book a free 20-minute career guidance session with a Thynkspire mentor.
              </p>

              {/* BooK Now Pill Button */}
              <div className="mt-6 sm:mt-8">
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="group flex items-center gap-3 pl-5 sm:pl-6 pr-2 py-2 rounded-full border border-white/80 bg-black/80 hover:border-[#00BF63] hover:shadow-[0_0_25px_rgba(0,191,99,0.5)] transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-medium text-white tracking-wide">
                      BooK Now
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:bg-[#00d66e] group-hover:rotate-45 transition-all duration-300 shadow-[0_0_12px_#00BF63]">
                      <FiArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
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
