"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MotionFadeIn, MotionText, MotionScale } from "../MotionWrapper";

export interface ProgramItem {
  id: number;
  title: string;
  category: "Marketing" | "Cyber Security" | "Robotics" | "Startups";
  duration: string;
  type: string;
  image: string;
  href?: string;
}

export const PROGRAM_CARDS: ProgramItem[] = [
  {
    id: 1,
    title: "AI & Cyber Security",
    category: "Cyber Security",
    duration: "5 Months",
    type: "Internship",
    image: "/hero/1.png",
    href: "/programs/ai-cyber-security",
  },
  {
    id: 2,
    title: "Working Professionals AI Integrated Cyber Security",
    category: "Cyber Security",
    duration: "2 Months",
    type: "Internship",
    image: "/hero/2.png",
    href: "/programs/working-professionals-cybersecurity",
  },
  {
    id: 3,
    title: "Robotics & IoT",
    category: "Robotics",
    duration: "4 Months",
    type: "Internship",
    image: "/hero/3.png",
    href: "/programs/robotics-iot",
  },
  {
    id: 4,
    title: "Entrepreneurship & Innovation",
    category: "Startups",
    duration: "3 Months",
    type: "Internship",
    image: "/hero/4.png",
    href: "/programs/entrepreneurship-innovation",
  },
  {
    id: 5,
    title: "Digital Marketing",
    category: "Marketing",
    duration: "3 Months",
    type: "Internship",
    image: "/hero/5.png",
    href: "/programs/digital-marketing",
  },
];

const CATEGORIES = ["All", "Marketing", "Cyber Security", "Robotics", "Startups"] as const;
type Category = (typeof CATEGORIES)[number];

export default function ProgramsList() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredCards = selectedCategory === "All"
    ? PROGRAM_CARDS
    : PROGRAM_CARDS.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative w-full text-white pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[350px] bg-[#00BF62]/12 blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-40 left-0 w-[350px] h-[350px] bg-[#00BF62]/10 blur-[120px] -z-10 pointer-events-none" />
      
      {/* Left Circuit Trace Line with Dot Node */}
      <div className="absolute left-0 top-[28%] w-1/3 max-w-[420px] pointer-events-none -z-10 hidden md:block">
        <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 15 L 260 15 L 290 45 L 340 45" stroke="#00BF62" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="340" cy="45" r="3.5" fill="#00BF62" />
          <circle cx="340" cy="45" r="8" fill="#00BF62" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Right Circuit Trace Line with Dot Node */}
      <div className="absolute right-0 top-[48%] w-1/3 max-w-[420px] pointer-events-none -z-10 hidden md:block">
        <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60 45 L 110 45 L 140 15 L 400 15" stroke="#00BF62" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="60" cy="45" r="3.5" fill="#00BF62" />
          <circle cx="60" cy="45" r="8" fill="#00BF62" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Left Low Opacity 3D Green Vector: positioned to the left of the content */}
      <motion.div 
        className="absolute top-[220px] sm:top-[250px] lg:top-[270px] left-[1%] sm:left-[4%] lg:left-[10%] w-[110px] sm:w-[170px] h-[100px] sm:h-[150px] lg:h-[180px] pointer-events-none select-none z-0 opacity-25 sm:opacity-30"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/vector/Group.png"
            alt="Decorative Green Ribbon"
            fill
            className="object-contain filter brightness-75"
            priority
          />
        </div>
      </motion.div>

      {/* Right High Opacity 3D Green Vector: positioned near the top right of the heading */}
      <motion.div 
        className="absolute top-[70px] sm:top-[85px] lg:top-[165px] right-[2%] sm:right-[6%] lg:right-[11%] w-[90px] sm:w-[120px] lg:w-[100px] h-[80px] sm:h-[110px] lg:h-[90px] pointer-events-none select-none z-0 opacity-90 sm:opacity-100"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="relative w-full h-full drop-shadow-[0_10px_25px_rgba(0,191,98,0.35)]">
          <Image
            src="/vector/Group.png"
            alt="Decorative Green Ribbon"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Main Container */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12 relative z-10">
        
        {/* Center Logo Above Title: Thynkedge School of Emerging Career */}
        <MotionScale delay={0.1} duration={0.6} className="flex justify-center w-full">
          <div className="relative w-48 sm:w-80 h-16 sm:h-28">
            <Image
              src="/hero/thynkedge.png"
              alt="Thynkedge School of Emerging Career"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </MotionScale>

        {/* Section Heading & Subtitle */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <MotionText delay={0.15}>
            <h1 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Our <span className="text-[#00BF62]">Programs</span>
            </h1>
          </MotionText>

          <MotionFadeIn delay={0.2} direction="up">
            <p className="font-poppins text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
              Explore our programs and initiatives designed to create meaningful learning and development opportunities.
            </p>
          </MotionFadeIn>
        </div>

        {/* Category Filter Tabs Capsule */}
        <MotionFadeIn delay={0.25} direction="up" className="flex flex-col items-center gap-4 lg:gap-5 w-full">
          <div className="w-full max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-1 flex justify-start sm:justify-center">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 p-1.5 sm:p-2.5 lg:p-3.5 lg:px-5 rounded-full bg-[#111413]/90 border border-white/10 backdrop-blur-xl shadow-2xl shrink-0 mx-auto sm:mx-0">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 whitespace-nowrap relative px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full font-poppins text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "text-white bg-[#00BF62]/20 border border-[#00BF62] shadow-[0_0_20px_rgba(0,191,98,0.45)]"
                        : "text-slate-300 hover:text-white bg-transparent border border-transparent hover:bg-white/5"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Program Counter Text */}
          <div className="font-poppins text-xs sm:text-sm lg:text-base text-slate-400 font-normal pt-1">
            Showing {selectedCategory === "All" ? `All ${PROGRAM_CARDS.length}` : filteredCards.length}{" "}
            {filteredCards.length === 1 ? "Program" : "Programs"}
          </div>
        </MotionFadeIn>

        {/* 3 Cards per Row on Large Screen Grid */}
        <div className="w-full max-w-[1240px] mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
          >
            <AnimatePresence mode="popLayout">
              {filteredCards.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex flex-col gap-2 group cursor-pointer"
                >
                  <Link href={item.href || "#apply"}>
                    {/* Card Container */}
                    <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[440px] rounded-[24px] overflow-hidden border border-white/15 group-hover:border-[#00BF62] p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_35px_rgba(0,191,98,0.3)]">
                      {/* Background Image filling the card */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-out"
                          priority
                        />
                        {/* Subtle dark gradient overlay concentrated at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-0" />
                      </div>

                      {/* Top Glassmorphic Pill Title Badge with Pure White Transparent Frosted Glass */}
                      <div className="relative z-10 w-full pt-1">
                        <div
                          className="w-full p-3.5 sm:p-4 rounded-[18px] sm:rounded-[20px] bg-white/15 border border-white/30 text-center shadow-lg group-hover:border-[#00BF62]/60 transition-colors duration-300"
                          style={{
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                          }}
                        >
                          <h3 className="font-poppins text-sm sm:text-base font-semibold text-white leading-snug">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Text outside below the card: animates on hover */}
                    <div className="flex items-center justify-between px-3 pt-1.5 sm:pt-2 text-xs sm:text-sm font-poppins transition-all duration-300 ease-out transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-white font-medium">
                        {item.duration}
                      </span>
                      <span className="text-[#00BF62] font-semibold">
                        {item.type}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
