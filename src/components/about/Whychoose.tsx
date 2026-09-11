"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

// Subtle star sparkle background particles
function StarSparkle({
  top,
  left,
  right,
  bottom,
  size = "md",
  delay = 0,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}) {
  const sizeClasses = {
    sm: "w-2 h-2 text-white/20 text-[10px]",
    md: "w-3 h-3 text-[#00BF62]/40 text-xs",
    lg: "w-4 h-4 text-white/40 text-sm",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none select-none flex items-center justify-center ${sizeClasses[size]}`}
      style={{ top, left, right, bottom }}
      animate={{
        opacity: [0.15, 0.75, 0.15],
        scale: [0.8, 1.25, 0.8],
      }}
      transition={{
        duration: 3.5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      ✦
    </motion.div>
  );
}

const reasonsList = [
  "Industry-focused certification programs",
  "Expert mentors from top tech companies",
  "Personalized career guidance and support",
  "Nation-wide innovation events & quizzes",
  "Strong ecosystem of schools & corporate partners",
  "Commitment to a safer digital India",
];

export default function WhyChoose() {
  return (
    <section className="relative w-full text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-radial from-[#00BF62]/14 via-[#00BF62]/3 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] bg-radial from-[#00BF62]/12 via-[#00BF62]/2 to-transparent blur-[150px] pointer-events-none -z-10" />

      {/* Cosmic Star Sparkles */}
      <StarSparkle top="10%" left="15%" size="sm" delay={0.2} />
      <StarSparkle top="22%" right="20%" size="md" delay={0.8} />
      <StarSparkle top="45%" left="8%" size="md" delay={1.4} />
      <StarSparkle top="65%" right="12%" size="sm" delay={0.5} />
      <StarSparkle top="82%" left="22%" size="lg" delay={1.8} />
      <StarSparkle top="90%" right="28%" size="md" delay={1.1} />

      {/* Main Container */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Heading: Why Choose */}
        <div className="flex justify-center text-center">
          <MotionText delay={0.1} duration={0.8}>
            <h2 className="font-poppins font-semibold text-[36px] sm:text-[50px] lg:text-[58px] tracking-tight text-white leading-none">
              Why Choose
            </h2>
          </MotionText>
        </div>

        {/* Center Content Wrapper with Floating Vectors */}
        <div className="relative mt-8 sm:mt-12 max-w-[560px] mx-auto">
          
          {/* Top-Left Floating Green Spiral Ribbon Vector (Group-1028.png) */}
          <motion.div
            className="absolute -top-6 -left-16 sm:-left-24 lg:-left-28 w-14 sm:w-20 lg:w-24 h-16 sm:h-24 lg:h-28 pointer-events-none z-20"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -6, 6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full drop-shadow-[0_0_15px_rgba(0,191,98,0.5)]">
              <Image
                src="/vector/Group-1028.png"
                alt="Green Spiral Ribbon"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Bottom-Right Floating Green Spiral Ribbon Vector (Group-1028.png) */}
          <motion.div
            className="absolute -bottom-8 -right-16 sm:-right-24 lg:-right-28 w-14 sm:w-20 lg:w-24 h-16 sm:h-24 lg:h-28 pointer-events-none z-20"
            animate={{
              y: [0, 10, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <div className="relative w-full h-full drop-shadow-[0_0_15px_rgba(0,191,98,0.5)]">
              <Image
                src="/vector/Group-1028.png"
                alt="Green Spiral Ribbon"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Search Pill Capsule: Thynkspire...? */}
          <MotionFadeIn delay={0.2} direction="up" distance={20}>
            <div className="w-full rounded-full bg-[#080d09]/90 border border-white/20 backdrop-blur-xl px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#00BF62]/60 transition-colors duration-300">
              <span className="font-poppins text-[#00BF62] text-base sm:text-xl font-medium tracking-wide">
                Thynkspire...?
              </span>
              <div className="text-white/60">
                <FiSearch className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
            </div>
          </MotionFadeIn>

          {/* Reasons List Card */}
          <MotionFadeIn delay={0.35} direction="up" distance={25} className="mt-4 sm:mt-5">
            <div className="w-full rounded-[24px] sm:rounded-[28px] bg-[#070c08]/90 border border-white/15 backdrop-blur-xl px-6 sm:px-8 py-4 sm:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#00BF62]/40 transition-all duration-400">
              <div className="divide-y divide-white/10">
                {reasonsList.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                    className="py-4 sm:py-4.5 flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 group cursor-default"
                  >
                    <span className="text-[#00BF62] text-sm sm:text-base font-light select-none group-hover:scale-125 transition-transform duration-200">
                      +
                    </span>
                    <span className="font-poppins text-xs sm:text-[14px] leading-relaxed font-normal text-white/75 group-hover:text-white transition-colors duration-200">
                      {reason}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </MotionFadeIn>

        </div>

      </div>
    </section>
  );
}
