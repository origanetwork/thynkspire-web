"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

export default function ProgramCTA() {
  return (
    <section className="relative w-full text-white py-12 sm:py-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Glow Container */}
        <MotionFadeIn delay={0.15} direction="up">
          <div 
            className="relative w-full rounded-[24px] sm:rounded-[36px] border border-[#00BF62]/40 p-8 sm:p-14 lg:p-16 flex flex-col items-center text-center overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#00BF62]/70 group"
            style={{
              background: "radial-gradient(ellipse at 80% 50%, rgba(0, 191, 98, 0.28) 0%, rgba(0, 45, 22, 0.45) 40%, rgba(5, 10, 8, 0.95) 100%)",
              boxShadow: "0 0 50px rgba(0, 191, 98, 0.12), inset 0 0 40px rgba(0, 191, 98, 0.08)",
            }}
          >
            {/* Ambient corner glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00BF62]/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#00BF62]/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Inner Content */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
              
              <MotionText delay={0.2}>
                <h2 className="font-clash text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Not sure which program <br className="hidden sm:inline" />
                  <span className="text-[#00BF62]">fits you?</span>
                </h2>
              </MotionText>

              <p className="font-poppins text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
                Book a free 20-minute career guidance session with a Thynkspire mentor.
              </p>

              {/* Book Now Button */}
              <div className="pt-2 sm:pt-4 flex justify-center">
                <Link href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group/btn flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/30 bg-black/80 hover:border-[#00BF62] transition-all duration-300 shadow-xl"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide">
                      Book Now
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300">
                      <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </motion.button>
                </Link>
              </div>

            </div>
          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
