"use client";

import React from "react";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

export default function Whocanjoin() {
  return (
    <section className="relative w-full text-white py-16 sm:py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-[#00BF62]/8 blur-[160px] -z-10 pointer-events-none" />

      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <MotionText delay={0.1}>
            <h2 className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white inline-flex items-center justify-center gap-2 sm:gap-3">
              <span>Who Can</span>
              <span className="text-[#00BF62]">Join</span>
              <span className="text-[#00BF62] text-4xl sm:text-5xl lg:text-8xl font-extrabold inline-block -rotate-6 transform -translate-y-1 drop-shadow-[0_0_20px_rgba(0,191,98,0.7)]">
                ?
              </span>
            </h2>
          </MotionText>
        </div>

        {/* Main Eligibility Container */}
        <MotionFadeIn delay={0.2} direction="up">
          <div className="relative max-w-[560px] sm:max-w-[620px] lg:max-w-[680px] mx-auto rounded-[24px] sm:rounded-[32px] bg-[#0A0D0E]/95 backdrop-blur-xl border-t-[2.5px] border-l-[2.5px] border-[#00BF62] shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Top-Left Ambient Green Corner Glow */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#00BF62]/20 blur-[35px] pointer-events-none" />

            {/* Container Header */}
            <div className="py-5 sm:py-6 text-center border-b border-white/10 relative z-10">
              <h3 className="font-clash text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Eligibility
              </h3>
            </div>

            {/* Cards Content Area with Increased Spacing */}
            <div className="py-10 sm:py-14 space-y-10 sm:space-y-14 lg:space-y-16 relative z-10 overflow-hidden">
              {/* Card 1: Class 8–12 (Touches Left Edge, Slanted Upwards, Thicker Green Border, Increased Padding) */}
              <div className="w-full flex justify-start">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="relative transform -rotate-[3.5deg] origin-left inline-flex flex-col rounded-r-[24px] sm:rounded-r-[28px] rounded-l-none border-t-2 border-b-2 border-r-2 border-[#00BF62] border-l-0 bg-[#07090A]/90 pl-7 sm:pl-10 pr-7 sm:pr-10 py-5 sm:py-6 shadow-[0_10px_25px_rgba(0,0,0,0.6)] w-[88%] sm:w-[82%] max-w-[490px] -ml-[2px]"
                >
                  <h4 className="font-clash font-bold text-base sm:text-lg lg:text-xl text-white tracking-wide">
                    Class 8–12
                  </h4>
                  <p className="font-poppins text-xs sm:text-[13px] text-white/70 font-normal leading-snug mt-1">
                    Open to students across middle and senior school.
                  </p>
                </motion.div>
              </div>

              {/* Card 2: Team of Two (Touches Right Edge, Slanted Downwards, Thicker Green Border, Increased Padding & Vertical Margin on Large Screens) */}
              <div className="w-full flex justify-end my-4 sm:my-8 lg:my-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="relative transform rotate-[11deg] origin-right inline-flex flex-col rounded-l-[24px] sm:rounded-l-[28px] rounded-r-none border-t-2 border-b-2 border-l-2 border-[#00BF62] border-r-0 bg-[#07090A]/90 pr-7 sm:pr-10 pl-7 sm:pr-10 py-5 sm:py-6 shadow-[0_10px_25px_rgba(0,0,0,0.6)] w-[84%] sm:w-[78%] max-w-[440px] -mr-[2px] mt-4"
                >
                  <h4 className="font-clash font-bold text-base sm:text-lg lg:text-xl text-white tracking-wide">
                    Team of Two
                  </h4>
                  <p className="font-poppins text-xs sm:text-[13px] text-white/70 font-normal leading-snug mt-1">
                    Two students compete as one team.
                  </p>
                </motion.div>
              </div>

              {/* Card 3: Regional Eligibility (Touches Left Edge, Slanted Upwards, Thicker Green Border, Increased Padding) */}
              <div className="w-full flex justify-start pt-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="relative transform -rotate-[4deg] origin-left inline-flex flex-col rounded-r-[24px] sm:rounded-r-[28px] rounded-l-none border-t-2 border-b-2 border-r-2 border-[#00BF62] border-l-0 bg-[#07090A]/90 pl-7 sm:pl-10 pr-7 sm:pr-10 py-5 sm:py-6 shadow-[0_10px_25px_rgba(0,0,0,0.6)] w-[92%] sm:w-[86%] max-w-[510px] -ml-[2px]"
                >
                  <h4 className="font-clash font-bold text-base sm:text-lg lg:text-xl text-white tracking-wide">
                    Regional Eligibility
                  </h4>
                  <p className="font-poppins text-xs sm:text-[13px] text-white/70 font-normal leading-snug mt-1">
                    Schools &amp; Colleges · Kochi Region
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}

