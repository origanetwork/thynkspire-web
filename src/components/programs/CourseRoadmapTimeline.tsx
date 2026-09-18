"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiFlag,
  FiServer,
  FiLock,
  FiCpu,
  FiActivity,
  FiCheck,
  FiLayers,
  FiCode,
  FiGlobe,
  FiTarget,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { ProgramDetail } from "@/data/programsData";

interface RoadmapStep {
  month: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  isCompleted?: boolean;
}

const DEFAULT_ROADMAP_STEPS: RoadmapStep[] = [
  {
    month: "Month 01",
    title: "Cyber Security Foundations",
    desc: "Understanding the landscape, threat modeling, and core security principles.",
    icon: FiFlag,
  },
  {
    month: "Month 02",
    title: "Networking & System Security",
    desc: "Mastering protocols, packet analysis, and hardening operating systems.",
    icon: FiServer,
  },
  {
    month: "Month 03",
    title: "Ethical Hacking & Penetration Testing",
    desc: "Offensive security techniques, vulnerability assessments, and web application testing.",
    icon: FiLock,
  },
  {
    month: "Month 04",
    title: "AI Integrated Cyber Defence",
    desc: "Leveraging ML for threat detection, prompt injection defense, and automated response.",
    icon: FiCpu,
  },
  {
    month: "Month 05",
    title: "Soc Operations + Projects",
    desc: "Incident response simulations, SIEM dashboards, and interview preparation.",
    icon: FiActivity,
  },
  {
    month: "Month 06",
    title: "Industry Internship",
    desc: "Real-world experience, mentored projects, and career launchpad.",
    icon: FiCheck,
    isCompleted: true,
  },
];

const ICON_POOL = [
  FiFlag,
  FiServer,
  FiLock,
  FiCpu,
  FiActivity,
  FiLayers,
  FiCode,
  FiGlobe,
  FiTarget,
  FiShield,
  FiZap,
];

function getRoadmapSteps(program?: ProgramDetail): RoadmapStep[] {
  if (!program || !program.modules || program.modules.length === 0) {
    return DEFAULT_ROADMAP_STEPS;
  }

  return program.modules.map((mod, idx) => {
    const isLast = idx === program.modules.length - 1;
    const cleanTitle = mod.title.replace(/^Module\s+\d+\s*[\u2014\u2013-]\s*/i, "").trim();
    const desc =
      mod.topics && mod.topics.length > 0
        ? mod.topics.slice(0, 4).join(", ") + "."
        : "";
    const icon = isLast ? FiCheck : ICON_POOL[idx % ICON_POOL.length];

    return {
      month: `Module ${String(mod.number || idx + 1).padStart(2, "0")}`,
      title: cleanTitle || mod.title,
      desc,
      icon,
      isCompleted: isLast,
    };
  });
}

interface CourseRoadmapTimelineProps {
  program?: ProgramDetail;
}

export default function CourseRoadmapTimeline({ program }: CourseRoadmapTimelineProps = {}) {
  const roadmapSteps = getRoadmapSteps(program);

  return (
    <section className="relative w-full bg-black text-white py-24 sm:py-32 overflow-hidden">
      
      {/* Top-Right 3D Wavy Ribbon Vector */}
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
        className="absolute top-16 right-6 sm:right-16 lg:right-28 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 pointer-events-none z-10 opacity-90"
      >
        <Image
          src="/vector/Group.png"
          alt="3D Ribbon Vector"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Bottom-Left 3D Wavy Ribbon Vector */}
      <motion.div
        animate={{
          y: [6, -6, 6],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-16 left-6 sm:left-12 lg:left-20 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 pointer-events-none z-10 opacity-90"
      >
        <Image
          src="/vector/Group.png"
          alt="3D Ribbon Vector"
          fill
          className="object-contain -scale-x-100 rotate-45"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 z-10">
        
        {/* Top Tag: - The Journey */}
        <div className="flex items-center gap-2 pb-6">
          <div className="w-5 h-[2px] bg-[#00BF63]" />
          <span className="font-poppins text-sm sm:text-base font-normal text-slate-200 tracking-wide">
            The Journey
          </span>
        </div>

        {/* Section Heading Centered */}
        <div className="flex flex-col items-center justify-center text-center pb-16 sm:pb-20">
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {program?.duration ? `${program.duration}` : "6-Month"} Course <span className="text-[#00BF63]">Roadmap</span>
            </h2>
          </MotionText>
        </div>

        {/* Vertical Timeline Grid */}
        <div className="relative max-w-4xl mx-auto my-6 sm:my-10">
          {/* Central Vertical Green Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#00BF63]/20 via-[#00BF63] to-[#00BF63]/20" />

          <div className="space-y-10 sm:space-y-14">
            {roadmapSteps.map((step, idx) => {
              const isEven = idx % 2 !== 0; // Odd index = right side card in desktop layout
              const IconComponent = step.icon;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center pl-16 md:pl-0"
                >
                  {/* Central Node Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    {step.isCompleted ? (
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#00BF63] border-2 border-[#00BF63] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,191,99,0.8)] transition-transform hover:scale-110">
                        <FiCheck className="w-5 h-5 text-black stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border border-[#00BF63]/60 flex items-center justify-center text-[#00BF63] shadow-[0_0_12px_rgba(0,191,99,0.3)] transition-transform hover:scale-110">
                        <IconComponent className="w-4 h-4 text-[#00BF63]" />
                      </div>
                    )}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] ${
                      !isEven ? "md:mr-auto" : "md:ml-auto md:order-2"
                    }`}
                  >
                    <MotionFadeIn direction={!isEven ? "right" : "left"} delay={idx * 0.08}>
                      <div
                        className="group rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 border border-[#00BF63]/30 hover:border-[#00BF63] transition-all duration-300 bg-black/70 backdrop-blur-xl shadow-[0_0_15px_rgba(0,191,99,0.1)] hover:shadow-[0_0_25px_rgba(0,191,99,0.25)]"
                      >
                        <h4 className="font-poppins text-white text-base sm:text-lg font-semibold mb-1">
                          {step.month}
                        </h4>
                        <h3 className="font-clash text-[#00BF63] text-lg sm:text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="font-poppins text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </MotionFadeIn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

