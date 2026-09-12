"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Star,
  Shield,
  UserCheck,
  Users,
  BookOpen,
  Globe,
} from "lucide-react";
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

interface ValueCardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const valuesList: ValueCardItem[] = [
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Constantly pushing boundaries and exploring new learning frontiers.",
    icon: Lightbulb,
  },
  {
    id: "excellence",
    title: "Excellence",
    description:
      "Striving for the highest standards in every program we deliver.",
    icon: Star,
  },
  {
    id: "integrity",
    title: "Integrity",
    description:
      "Building trust through transparency and ethical practices.",
    icon: Shield,
  },
  {
    id: "student-first",
    title: "Student First",
    description:
      "Our learners' success is the ultimate measure of our impact.",
    icon: UserCheck,
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description:
      "Fostering teamwork between academia and industry.",
    icon: Users,
  },
  {
    id: "curiosity",
    title: "Curiosity",
    description:
      "Encouraging the constant quest for knowledge and growth.",
    icon: BookOpen,
  },
  {
    id: "impact",
    title: "Impact",
    description:
      "Creating meaningful change in the educational landscape.",
    icon: Globe,
  },
];

function ValueCard({
  item,
  delay = 0.1,
}: {
  item: ValueCardItem;
  delay?: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative w-full rounded-[18px] bg-[#020703]/90 border border-[#00BF62]/30 p-6 sm:p-7 backdrop-blur-md overflow-hidden transition-all duration-400 hover:border-[#00BF62] hover:shadow-[0_0_30px_rgba(0,191,98,0.22)] group flex flex-col items-center justify-center text-center min-h-[220px]"
    >
      {/* Subtle hover gradient illumination */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BF62]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      {/* Animated Icon: Centered */}
      <div className="relative w-full h-11 mb-3.5 flex items-center justify-center">
        <motion.div
          animate={{
            x: [0, -8, 12, -10, 10, -6, 6, -3, 3, 0],
            y: [0, -3, 2, -2, 2, -1, 1, 0],
            rotate: [0, -12, 14, -10, 12, -6, 6, -2, 2, 0],
            scale: [1, 1.15, 1.12, 1.15, 1.1, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="relative text-[#00BF62] group-hover:scale-125 group-hover:drop-shadow-[0_0_18px_rgba(0,191,98,0.9)] transition-all duration-300 shrink-0"
        >
          <Icon className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.8]" />
        </motion.div>
      </div>

      {/* Content: Centered */}
      <div className="relative z-10 flex flex-col items-center text-center gap-2">
        <h4 className="font-poppins font-semibold text-xl sm:text-[22px] lg:text-[24px] text-white tracking-tight leading-tight">
          {item.title}
        </h4>
        <p className="font-poppins font-normal text-white/75 text-sm sm:text-[15px] lg:text-[15.5px] leading-[1.6] max-w-xs mx-auto">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function OurValues() {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const row1 = valuesList.slice(0, 4); // Innovation, Excellence, Integrity, Student First
  const row2 = valuesList.slice(4, 7); // Collaboration, Curiosity, Impact

  // Automatically cycle through cards on mobile every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileIdx((prev) => (prev + 1) % valuesList.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-radial from-[#00BF62]/14 via-[#00BF62]/3 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] bg-radial from-[#00BF62]/12 via-[#00BF62]/2 to-transparent blur-[150px] pointer-events-none -z-10" />

      {/* Cosmic Star Sparkles */}
      <StarSparkle top="8%" left="15%" size="sm" delay={0.2} />
      <StarSparkle top="20%" right="18%" size="md" delay={0.8} />
      <StarSparkle top="40%" left="6%" size="md" delay={1.4} />
      <StarSparkle top="60%" right="10%" size="sm" delay={0.5} />
      <StarSparkle top="78%" left="20%" size="lg" delay={1.8} />
      <StarSparkle top="90%" right="25%" size="md" delay={1.1} />

      {/* Main Container */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header Tag: — Our Core Values — */}
        <MotionFadeIn delay={0.1} direction="up" distance={15} className="flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
            <h3 className="font-poppins text-lg sm:text-xl font-medium tracking-tight text-white">
              Our Core Values
            </h3>
            <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
          </div>
        </MotionFadeIn>

        {/* Main Headline: The Pillars Of Thynkspire */}
        <div className="mt-6 sm:mt-8 flex justify-center text-center">
          <MotionText delay={0.2} duration={0.8}>
            <h2 className="font-poppins font-semibold text-[32px] sm:text-[46px] lg:text-[54px] leading-[1.15] tracking-tight text-white">
              The Pillars Of{" "}
              <span className="text-[#00BF62] drop-shadow-[0_0_35px_rgba(0,191,98,0.45)]">
                Thynkspire
              </span>
            </h2>
          </MotionText>
        </div>

        {/* Mobile View: Single Auto-Changing Card without indicator dots */}
        <div className="block sm:hidden mt-10">
          <div className="relative min-h-[230px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={valuesList[activeMobileIdx].id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full max-w-[340px] mx-auto rounded-[18px] bg-[#020703]/90 border border-[#00BF62]/30 p-7 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(0,191,98,0.18)] min-h-[220px]"
              >
                {/* Animated Icon: Centered */}
                <div className="relative w-full h-11 mb-3.5 flex items-center justify-center">
                  <motion.div
                    animate={{
                      x: [0, -8, 12, -10, 10, -6, 6, -3, 3, 0],
                      y: [0, -3, 2, -2, 2, -1, 1, 0],
                      rotate: [0, -12, 14, -10, 12, -6, 6, -2, 2, 0],
                      scale: [1, 1.15, 1.12, 1.15, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      ease: "easeInOut",
                    }}
                    className="relative text-[#00BF62] shrink-0"
                  >
                    {React.createElement(valuesList[activeMobileIdx].icon, {
                      className: "w-10 h-10 stroke-[1.8]",
                    })}
                  </motion.div>
                </div>

                {/* Content: Centered */}
                <div className="relative z-10 flex flex-col items-center text-center gap-2">
                  <h4 className="font-poppins font-semibold text-xl text-white tracking-tight leading-tight">
                    {valuesList[activeMobileIdx].title}
                  </h4>
                  <p className="font-poppins font-normal text-white/75 text-sm leading-[1.6]">
                    {valuesList[activeMobileIdx].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop / Tablet View: 7 Cards Grid Layout (4 on Row 1, 3 Centered on Row 2) */}
        <div className="hidden sm:flex flex-col gap-6 sm:gap-7 mt-14 sm:mt-20 max-w-[1280px] mx-auto">
          
          {/* Row 1: 4 Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {row1.map((item, idx) => (
              <ValueCard key={item.id} item={item} delay={0.15 + idx * 0.1} />
            ))}
          </div>

          {/* Row 2: 3 Cards Centered */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-[960px] mx-auto w-full">
            {row2.map((item, idx) => (
              <ValueCard key={item.id} item={item} delay={0.45 + idx * 0.1} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
