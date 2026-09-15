"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

const ROW_1_TOOLS = [
  { id: 1, name: "Kali Linux", src: "/tools/1.png" },
  { id: 2, name: "Wireshark", src: "/tools/2.png" },
  { id: 3, name: "Burp Suite", src: "/tools/3.png" },
  { id: 4, name: "Metasploit", src: "/tools/4.png" },
  { id: 5, name: "Nmap", src: "/tools/5.png" },
  { id: 6, name: "Docker", src: "/tools/6.png" },
];

const ROW_2_TOOLS = [
  { id: 7, name: "Splunk", src: "/tools/7.png" },
  { id: 8, name: "Wazuh", src: "/tools/8.png" },
  { id: 9, name: "OWASP ZAP", src: "/tools/9.png" },
  { id: 10, name: "GitHub", src: "/tools/10.png" },
  { id: 11, name: "ChatGPT", src: "/tools/11.png" },
];

export default function ToolsMastered() {
  return (
    <section className="relative w-full bg-black text-white py-16 sm:py-24 overflow-hidden">
      {/* Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 z-10">
        
        {/* Title Container with decorative ribbon */}
        <div className="relative text-center max-w-2xl mx-auto pb-14 sm:pb-20">
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white inline-block relative">
              Tools you&apos;ll master
              {/* Floating 3D Ribbon near top right of title */}
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                  rotate: [0, 4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-10 sm:-top-8 sm:-right-14 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 pointer-events-none opacity-80"
              >
                <Image
                  src="/vector/Group.png"
                  alt="3D Ribbon Element"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </h2>
          </MotionText>
        </div>

        {/* Tools Showcase Grid / Rows */}
        <div className="max-w-[1320px] 2xl:max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
          
          {/* Row 1 (6 Tools on Large Screen) */}
          <MotionFadeIn delay={0.2} duration={0.6}>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
              {ROW_1_TOOLS.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.14, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-28 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-14 sm:h-18 md:h-20 lg:h-24 flex items-center justify-center shrink-0 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,191,99,0.18)]"
                >
                  <Image
                    src={tool.src}
                    alt={tool.name}
                    width={200}
                    height={100}
                    className="max-h-12 sm:max-h-16 md:max-h-18 lg:max-h-20 xl:max-h-24 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </MotionFadeIn>

          {/* Row 2 (5 Tools on Large Screen) */}
          <MotionFadeIn delay={0.35} duration={0.6}>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
              {ROW_2_TOOLS.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.14, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-28 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-14 sm:h-18 md:h-20 lg:h-24 flex items-center justify-center shrink-0 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,191,99,0.18)]"
                >
                  <Image
                    src={tool.src}
                    alt={tool.name}
                    width={200}
                    height={100}
                    className="max-h-12 sm:max-h-16 md:max-h-18 lg:max-h-20 xl:max-h-24 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </MotionFadeIn>

        </div>

      </div>
    </section>
  );
}
