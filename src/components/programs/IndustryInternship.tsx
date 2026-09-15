"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { FiCheck } from "react-icons/fi";

const FEATURES_COL_1 = [
  "Industry mentor",
  "Team collaboration",
  "Internship certificate",
];

const FEATURES_COL_2 = [
  "Live project experience",
  "Weekly evaluations",
  "Experience letter*",
];

const STUDENT_AVATARS = [
  "/hero/f1.jpg",
  "/hero/f2.jpg",
  "/hero/f3.jpg",
];

import { ProgramDetail } from "@/data/programsData";

interface IndustryInternshipProps {
  program?: ProgramDetail;
}

export default function IndustryInternship({ program }: IndustryInternshipProps = {}) {
  const duration = program?.internship?.duration || "1-Month";
  const subtitle = program?.internship?.subtitle || "Bridge the gap between learning and earning with real-world exposure.";
  const col1 = program?.internship?.col1 || FEATURES_COL_1;
  const col2 = program?.internship?.col2 || FEATURES_COL_2;
  const quote = program?.internship?.quote || "Eligible students who successfully complete academic requirements will receive internship opportunities through the institute's industry network, subject to partner company availability and selection processes.";
  const badgeText = program?.internship?.badgeText || "JOINED BY 25000+ STUDENTS";

  return (
    <section className="relative w-full bg-black text-white py-16 sm:py-24 overflow-hidden">
      {/* Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 z-10">
        
        {/* Main Card Frame with Emerald Border */}
        <MotionFadeIn delay={0.1} duration={0.7}>
          <div className="relative rounded-[28px] sm:rounded-[36px] border border-[#00BF63]/30 bg-[#030704] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_0_50px_rgba(0,191,99,0.08)]">
            
            {/* Ambient Background Glow inside Card */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#00BF63]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
              
              {/* Left Column (Heading + Description + Checklist) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Main 3-Line Heading */}
                <div>
                  <MotionText delay={0.2} duration={0.6}>
                    <h2 className="font-clash text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                      {duration} <br />
                      Industry <br />
                      <span className="relative inline-block">
                        Internship
                        {/* Decorative 3D ribbon under heading */}
                        <motion.div
                          animate={{
                            y: [-4, 4, -4],
                            rotate: [0, 6, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute -top-3 -left-8 sm:-left-12 w-12 sm:w-16 h-12 sm:h-16 pointer-events-none opacity-80"
                        >
                          <Image
                            src="/vector/Group.png"
                            alt="3D Ribbon Element"
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                      </span>
                    </h2>
                  </MotionText>

                  {/* Subtitle */}
                  <p className="font-poppins text-base sm:text-lg text-slate-300 font-normal mt-6 max-w-md leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* 2-Column Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 pt-2">
                  
                  {/* Left Column Features */}
                  <ul className="space-y-3 font-poppins text-xs sm:text-sm text-slate-200 font-light">
                    {col1.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <FiCheck className="w-4 h-4 text-slate-300 stroke-[2.5] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Right Column Features */}
                  <ul className="space-y-3 font-poppins text-xs sm:text-sm text-slate-200 font-light">
                    {col2.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <FiCheck className="w-4 h-4 text-slate-300 stroke-[2.5] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Disclaimer Footnote */}
                <p className="font-poppins text-[11px] sm:text-xs text-slate-500 font-light pt-2">
                  *experience letter subject to partner company policies.
                </p>

              </div>

              {/* Right Column (Eligibility Quote Card) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg rounded-[26px] sm:rounded-[30px] border border-[#00BF63]/50 bg-[#060e09]/95 backdrop-blur-xl p-8 sm:p-10 lg:p-12 shadow-[0_0_35px_rgba(0,191,99,0.18)] space-y-8"
                >
                  {/* Quote text */}
                  <p className="font-poppins text-sm sm:text-base lg:text-[17px] text-slate-100 font-light leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>

                  {/* Avatars and Student Count Banner */}
                  <div className="flex items-center gap-4 pt-2">
                    {/* Overlapping Avatars */}
                    <div className="flex items-center -space-x-2.5">
                      {STUDENT_AVATARS.map((avatar, idx) => (
                        <div
                          key={idx}
                          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#060e09] shadow-md"
                        >
                          <Image
                            src={avatar}
                            alt={`Student ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Badge Label */}
                    <span className="font-poppins text-xs sm:text-[13px] font-semibold tracking-wider text-slate-300 uppercase">
                      {badgeText}
                    </span>
                  </div>

                </motion.div>
              </div>

            </div>

          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
