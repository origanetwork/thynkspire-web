"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { ProgramDetail } from "@/data/programsData";

interface CareerNode {
  id: number;
  role: string;
  x: number;
  y: number;
  labelOffsetX: number;
  labelOffsetY: number;
  rotate?: string;
}

const CAREER_NODES: CareerNode[] = [
  { id: 1, role: "Cyber Security Analyst", x: 110, y: 430, labelOffsetX: -20, labelOffsetY: -35, rotate: "0deg" },
  { id: 2, role: "SOC Analyst (L1)", x: 260, y: 330, labelOffsetX: -110, labelOffsetY: -35, rotate: "-14deg" },
  { id: 3, role: "Information Security Associate", x: 350, y: 325, labelOffsetX: -30, labelOffsetY: 25, rotate: "0deg" },
  { id: 4, role: "Junior VAPT Analyst", x: 365, y: 210, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
  { id: 5, role: "Security Operations Associate", x: 495, y: 175, labelOffsetX: 10, labelOffsetY: -32, rotate: "-20deg" },
  { id: 6, role: "Cloud Security Associate (Entry Level)", x: 595, y: 275, labelOffsetX: -30, labelOffsetY: 25, rotate: "-12deg" },
  { id: 7, role: "IT Security Support Engineer", x: 755, y: 195, labelOffsetX: -60, labelOffsetY: -35, rotate: "0deg" },
  { id: 8, role: "IT Security Support Engineer", x: 870, y: 130, labelOffsetX: -120, labelOffsetY: -35, rotate: "0deg" },
];

const PATH_DATA = `
  M 110 430
  C 160 435, 210 390, 260 330
  C 290 290, 325 290, 350 325
  C 385 375, 405 310, 385 235
  C 375 200, 355 200, 365 210
  C 380 230, 410 290, 440 270
  C 465 250, 480 205, 495 175
  C 515 140, 555 230, 595 275
  C 645 320, 710 260, 755 195
  C 780 160, 795 220, 780 240
  C 755 260, 745 205, 770 180
  C 805 145, 845 155, 870 130
`;

interface CourseRoadmapProps {
  program?: ProgramDetail;
}

export default function CourseRoadmap({ program }: CourseRoadmapProps = {}) {
  const nodesList = program?.roadmapNodes && program.roadmapNodes.length > 0 ? program.roadmapNodes : CAREER_NODES;

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
        
        {/* Top Tag: — Career */}
        <div className="flex items-center gap-2 pb-4">
          <div className="w-5 h-[2px] bg-[#00BF63]" />
          <span className="font-poppins text-sm sm:text-base font-normal text-slate-200 tracking-wide">
            Career
          </span>
        </div>

        {/* Section Heading Left-Aligned */}
        <div className="max-w-2xl pb-12 sm:pb-16">
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Where Can This <br />
              Program Take <br />
              You?
            </h2>
          </MotionText>
        </div>

        {/* Interactive SVG Canvas */}
        <MotionFadeIn delay={0.25} duration={0.8}>
          <div className="relative w-full overflow-x-auto lg:overflow-visible pb-10">
            <div className="relative min-w-[920px] lg:min-w-full h-[480px] sm:h-[540px] lg:h-[580px]">
              
              {/* SVG Layer: Dotted Path + Exact Circle Nodes */}
              <svg
                viewBox="0 0 980 500"
                className="w-full h-full absolute inset-0 overflow-visible"
                fill="none"
              >
                <defs>
                  {/* Glowing Filter for Emerald Nodes */}
                  <filter id="emerald-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00BF63" floodOpacity="0.85" />
                    <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#00BF63" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Continuous Winding Dotted Path */}
                <path
                  d={PATH_DATA}
                  stroke="#00BF63"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* SVG Node Circles directly aligned on the path coordinates */}
                {nodesList.map((node) => (
                  <g key={node.id} className="cursor-pointer">
                    {/* Ambient Outer Halo */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="12"
                      fill="#00BF63"
                      fillOpacity="0.2"
                    />
                    {/* Crisp Glowing Center Dot */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="7"
                      fill="#00BF63"
                      filter="url(#emerald-dot-glow)"
                    />
                  </g>
                ))}
              </svg>

              {/* Floating HTML Text Labels Over Nodes */}
              {nodesList.map((node) => {
                const leftPercent = (node.x / 980) * 100;
                const topPercent = (node.y / 500) * 100;

                return (
                  <div
                    key={node.id}
                    style={{
                      left: `calc(${leftPercent}% + ${node.labelOffsetX}px)`,
                      top: `calc(${topPercent}% + ${node.labelOffsetY}px)`,
                      transform: `rotate(${node.rotate || "0deg"})`,
                    }}
                    className="absolute pointer-events-none whitespace-nowrap z-30 transition-transform duration-200"
                  >
                    <span className="font-poppins text-xs sm:text-[13px] lg:text-sm font-medium text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {node.role}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
