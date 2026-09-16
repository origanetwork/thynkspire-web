"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

interface AdmissionStep {
  id: number;
  stepNumber: string;
  title: string;
  desc: string;
  isHighlighted?: boolean;
}

const ADMISSION_STEPS: AdmissionStep[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Apply online",
    desc: "Submit your application via our web portal.",
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Eligibility interaction",
    desc: "Attend a short interaction or aptitude screening.",
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Confirmation",
    desc: "Receive your admission confirmation package.",
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Onboarding",
    desc: "Get LMS access and complete your setup.",
  },
  {
    id: 5,
    stepNumber: "05",
    title: "Start learning",
    desc: "Attend orientation and begin live classes.",
    isHighlighted: true,
  },
];

export default function AdmissionProcess() {
  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 overflow-hidden">
      
      {/* Top-Right Curled 3D Vector */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-12 right-6 sm:right-16 lg:right-24 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 pointer-events-none z-10 opacity-80"
      >
        <Image
          src="/vector/Group.png"
          alt="3D Ribbon Vector"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 z-10">
        
        {/* Top Tag: — Enrollment */}
        <div className="flex items-center gap-2 pb-4">
          <div className="w-5 h-[2px] bg-[#00BF63]" />
          <span className="font-poppins text-sm sm:text-base font-normal text-slate-200 tracking-wide">
            Enrollment
          </span>
        </div>

        {/* Section Heading Centered */}
        <div className="text-center max-w-2xl mx-auto pb-16 sm:pb-24">
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Admission Process
            </h2>
          </MotionText>
        </div>

        {/* 5-Step Process Timeline Row */}
        <MotionFadeIn delay={0.25} duration={0.7}>
          <div className="max-w-[1240px] mx-auto pb-16 sm:pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between gap-8 lg:gap-3">
              {ADMISSION_STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  {/* Step Item */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center flex-1 max-w-[210px] mx-auto group"
                  >
                    {/* Numbered Circular Badge */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#040805] border border-[#00BF63]/40 flex items-center justify-center text-[#00BF63] font-mono text-sm sm:text-base font-semibold shadow-[0_0_20px_rgba(0,191,99,0.2)] group-hover:border-[#00BF63] group-hover:shadow-[0_0_30px_rgba(0,191,99,0.45)] transition-all duration-300">
                      {step.stepNumber}
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`font-clash text-base sm:text-lg font-semibold mt-6 tracking-tight ${
                        step.isHighlighted ? "text-[#00BF63]" : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="font-poppins text-xs sm:text-[13px] text-slate-400 font-light mt-2 leading-relaxed max-w-[190px]">
                      {step.desc}
                    </p>
                  </motion.div>

                  {/* Animated Arrow Connector (between steps on large screen) */}
                  {idx < ADMISSION_STEPS.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center pt-5 text-[#00BF63]">
                      <motion.div
                        animate={{
                          x: [-3, 7, -3],
                          opacity: [0.55, 1, 0.55],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.3,
                        }}
                        className="drop-shadow-[0_0_10px_rgba(0,191,99,0.6)]"
                      >
                        <FiArrowRight className="w-6 h-6 stroke-[2.5]" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Centered CTA Pill Button */}
        <div className="flex justify-center">
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-4 px-6 sm:px-8 py-3 rounded-full border border-white/70 bg-black/70 hover:border-[#00BF63] hover:shadow-[0_0_25px_rgba(0,191,99,0.3)] transition-all duration-300 cursor-pointer group"
            >
              <span className="font-poppins text-sm sm:text-base font-medium text-white tracking-wide">
                Start Your Journey
              </span>

              {/* Green Arrow Circle */}
              <div className="w-8 h-8 rounded-full bg-[#00BF63] flex items-center justify-center text-black group-hover:bg-[#00d66e] group-hover:shadow-[0_0_15px_#00BF63] transition-all">
                <FiArrowUpRight className="w-4 h-4 stroke-[3]" />
              </div>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
}
