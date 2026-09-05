"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionStagger, MotionStaggerItem, MotionScale } from "./MotionWrapper";
import { title } from "process";

export default function OurPrograms() {
  const cards = [
    {
      id: 1,
      title: "AI & Cyber Security",
      duration: "5 Months",
      type: "Internship",
      image: "/hero/1.png",
    },
    {
      id: 2,
      title: "Working Professionals AI Integrated Cyber Security",
      duration: "2 Months",
      type: "Internship",
      image: "/hero/2.png",
    },
    {
      id: 3,
      title: "Robotics & IoT",
      duration: "4 Months",
      type: "Internship",
      image: "/hero/3.png",
    },
    {
      id: 4,
      title: "Entrepreneurship & Innovation",
      duration: "3 Months",
      type: "Internship",
      image: "/hero/4.png",
    },
  ];

  const initiativeLogos = [
    { name: "Thynkedge", src: "/hero/thynkedge.png" },
    { name: "ThynkSpire", src: "/logo.png" },
    { name: "Thynkx", src: "/hero/thynkx-logo.png" },
  ];

  return (
    <section className="relative w-full text-white py-16 overflow-hidden">
      {/* Outer container matching exact Hero & Header max width */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header Tag */}
        <MotionText delay={0.1} duration={0.6}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-[#00BF63]" />
            <h3 className="font-clash text-xl sm:text-2xl font-bold tracking-tight text-white/50">
              Our Programs
            </h3>
          </div>
        </MotionText>

        {/* Center Logo Above Cards: Thynkedge */}
        <MotionScale delay={0.15} duration={0.7} className="flex justify-center w-full pb-2">
          <div className="relative w-48 sm:w-86 h-14 sm:h-36">
            <Image
              src="/hero/thynkedge.png"
              alt="Thynkedge Logo"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </MotionScale>

        {/* 4 Program Cards Grid */}
        <MotionStagger staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item) => (
            <MotionStaggerItem key={item.id} className="flex flex-col gap-2 group cursor-pointer">
              {/* Card Container */}
              <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] rounded-[20px] overflow-hidden border border-white/10 group-hover:border-[#00BF63] p-4 flex flex-col justify-between transition-all duration-500 shadow-2xl group-hover:shadow-[#00BF63]/30">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-0" />
                </div>

                {/* Top Glassmorphic Pill Title Badge with Pure White Transparent Frosted Glass */}
                <div className="relative z-10 w-full pt-2">
                  <div
                    className="w-full p-3 sm:p-3.5 rounded-[16px] sm:rounded-[20px] bg-white/15 border border-white/30 text-center shadow-lg group-hover:border-[#00BF63]/60 transition-colors duration-300"
                    style={{
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <h4 className="font-poppins text-sm sm:text-base font-semibold text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Text outside below the card: visible on mobile, animates on desktop hover */}
              <div className="flex items-center justify-between px-3 pt-1 sm:pt-2 text-xs sm:text-sm font-poppins transition-all duration-300 ease-out transform sm:-translate-y-2 opacity-100 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-white font-medium">
                  {item.duration}
                </span>
                <span className="text-[#00BF63] font-medium">
                  {item.type}
                </span>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* Bottom Center View More Button */}
        <MotionFadeIn delay={0.2} direction="up" className="flex justify-center pt-2">
          <Link href="#programs-more">
            <button
              className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/30 bg-black/80 hover:border-[#00BF63] transition-all duration-300 shadow-xl"
              style={{
                borderRadius: "38px",
              }}
            >
              <span className="font-poppins text-sm font-semibold text-white tracking-wide">
                View More
              </span>
              <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          </Link>
        </MotionFadeIn>

        {/* Our Initiatives Section keeping user's exact design, only animating the logos continuously */}
        <div className="pt-8 sm:pt-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left Title */}
          <div className="shrink-0 lg:ml-50 text-center md:text-left">
            <h3 className="font-clash text-2xl sm:text-3xl font-bold tracking-tight text-white/50 whitespace-nowrap">
              Our Initiatives
            </h3>
          </div>

          {/* Right Sleek Capsule Card keeping exact user styling */}
          <div className="w-full max-w-[936px] h-[76px] sm:h-[154px] rounded-[12px] sm:rounded-[10px] border-2 border-white/35 bg-black/80 backdrop-blur-md px-6 sm:px-12 flex items-center justify-between shadow-2xl overflow-hidden">
            <div className="w-full overflow-hidden relative">
              <motion.div
                className="flex items-center justify-around gap-12 sm:gap-16 shrink-0 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...initiativeLogos, ...initiativeLogos, ...initiativeLogos, ...initiativeLogos].map((logo, idx) => (
                  <div key={idx} className="relative h-8 sm:h-51 w-28 sm:w-74 flex items-center justify-center shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
