"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

interface ModuleData {
  id: number;
  number: number;
  title: string;
  topics: string[];
  practical: string[];
  tools?: string[];
}

export const MODULES_DATA: ModuleData[] = [
  {
    id: 1,
    number: 1,
    title: "Module 1 — Foundations of Cyber Security",
    topics: [
      "Introduction to Cyber Security",
      "Information Security Principles",
      "CIA Triad",
      "Cyber Threat Landscape",
      "Cyber Crimes",
      "Malware Analysis Basics",
      "Password Security",
      "Authentication Methods",
      "Digital Footprints",
      "Cyber Laws in India",
      "Safe Internet Practices",
      "Security Awareness",
    ],
    practical: [
      "Installing a Virtual Lab",
      "Windows Security Configuration",
      "Linux Basics",
      "Creating Secure Password Policies",
      "Malware Identification",
      "Security Awareness Exercises",
    ],
  },
  {
    id: 2,
    number: 2,
    title: "Module 2 — Networking & System Security",
    topics: [
      "Computer Networks",
      "OSI Model",
      "TCP/IP",
      "Routing",
      "Switching",
      "DNS",
      "DHCP",
      "Firewalls",
      "VPN",
      "Email Security",
      "Web Security",
      "Secure Network Design",
    ],
    practical: [
      "Packet Analysis Using Wireshark",
      "Network Scanning",
      "Firewall Configuration",
      "Secure Network Setup",
      "Virtual Networking Labs",
    ],
  },
  {
    id: 3,
    number: 3,
    title: "Module 3 — Linux for Cyber Security",
    topics: [
      "Linux Installation",
      "Terminal Commands",
      "File Permissions",
      "User Management",
      "Bash Scripting",
      "SSH",
      "Cron Jobs",
      "Log Analysis",
      "Linux Security Fundamentals",
      "Server Security",
    ],
    practical: [
      "Linux Server Administration",
      "User Access Management",
      "Security Hardening",
      "Shell Automation",
      "SSH Configuration",
      "Linux Log Investigation",
    ],
  },
  {
    id: 4,
    number: 4,
    title: "Module 4 — Ethical Hacking & Penetration Testing",
    topics: [
      "Ethical Hacking Methodology",
      "Reconnaissance",
      "Enumeration",
      "Vulnerability Assessment",
      "Exploitation Basics",
      "Privilege Escalation",
      "Web Application Security",
      "Wireless Security",
    ],
    practical: [
      "Nmap",
      "Burp Suite",
      "Metasploit",
      "OWASP Labs",
      "DVWA",
      "Web Exploitation Labs",
      "Network Reconnaissance",
      "Vulnerability Assessment",
      "Controlled Exploitation Labs",
    ],
  },
  {
    id: 5,
    number: 5,
    title: "Module 5 — Artificial Intelligence in Cyber Security",
    topics: [
      "Introduction to Artificial Intelligence",
      "Machine Learning Basics",
      "AI Security Concepts",
      "AI-Powered Threat Detection",
      "AI for Malware Analysis",
      "AI Security Automation",
      "AI-Assisted Security Operations",
      "Generative AI Risks",
      "Prompt Injection",
      "LLM Security",
      "AI Governance",
    ],
    practical: [
      "AI-Based Threat Analysis",
      "AI-Assisted Log Analysis",
      "Security Automation Workflows",
      "Generative AI Security Exercises",
      "Prompt Injection Testing in Controlled Environments",
      "AI Security Tool Exploration",
    ],
  },
  {
    id: 6,
    number: 6,
    title: "Module 6 — Security Operations Center (SOC)",
    topics: [
      "SOC Fundamentals",
      "Security Monitoring",
      "Incident Response",
      "Log Analysis",
      "Threat Intelligence",
      "SIEM Concepts",
      "Security Playbooks",
      "MITRE ATT&CK Framework",
      "Threat Hunting",
      "Incident Detection & Analysis",
    ],
    practical: [
      "SIEM Dashboard Configuration",
      "Log Investigation",
      "Incident Simulation",
      "Threat Detection Exercises",
      "AI-Assisted Threat Hunting",
      "Automated Log Analysis",
      "AI-Assisted Incident Detection",
      "Security Monitoring Exercises",
    ],
    tools: [
      "Splunk",
      "Wazuh",
      "ELK Stack",
      "ChatGPT",
      "Open-Source AI Security Tools",
    ],
  },
  {
    id: 7,
    number: 7,
    title: "Module 7 — Cloud Security",
    topics: [
      "Cloud Security Fundamentals",
      "AWS Security",
      "Azure Security",
      "Google Cloud Basics",
      "Identity & Access Management (IAM)",
      "Cloud Threats",
      "Cloud Compliance",
      "Secure Cloud Architecture",
      "Cloud Monitoring",
    ],
    practical: [
      "IAM Configuration",
      "Cloud Security Labs",
      "Cloud Monitoring",
      "Access Control Configuration",
      "Secure Cloud Architecture Exercises",
    ],
  },
  {
    id: 8,
    number: 8,
    title: "Module 8 — Digital Forensics & Incident Investigation",
    topics: [
      "Digital Forensics Fundamentals",
      "Digital Evidence",
      "Evidence Collection & Preservation",
      "Memory Analysis",
      "Disk Analysis",
      "Mobile Forensics",
      "Email Investigation",
      "Incident Documentation",
      "Forensic Investigation Methodology",
    ],
    practical: [
      "Autopsy",
      "FTK Basics",
      "Memory Investigation",
      "Disk Investigation",
      "Email Investigation",
      "Log Investigation",
      "Forensic Report Writing",
    ],
  },
  {
    id: 9,
    number: 9,
    title: "Module 9 — Web Security",
    topics: [
      "Web Security Fundamentals",
      "OWASP Top 10",
      "SQL Injection",
      "Cross-Site Scripting (XSS)",
      "Authentication Flaws",
      "Session Security",
      "API Security",
      "Secure Coding",
      "Web Vulnerability Assessment",
    ],
    practical: [
      "Web Application Testing",
      "OWASP Labs",
      "SQL Injection Labs",
      "XSS Labs",
      "Authentication Testing",
      "Session Security Testing",
      "API Security Testing",
      "Secure Coding Labs",
      "Web Testing",
    ],
  },
  {
    id: 10,
    number: 10,
    title: "Module 10 — Career Preparation & Industry Readiness",
    topics: [
      "Resume Building",
      "LinkedIn Optimization",
      "GitHub Portfolio",
      "Cyber Security Career Paths",
      "Interview Preparation",
      "HR Interview Preparation",
      "Technical Interview Preparation",
      "Placement Guidance",
      "Professional Communication",
      "Group Discussion",
    ],
    practical: [
      "Resume Review",
      "GitHub Portfolio Review",
      "Mock Interviews",
      "Technical Assessments",
      "HR Mock Interviews",
      "Group Discussions",
      "Industry Case Study Exercises",
    ],
  },
];

import { ProgramDetail } from "@/data/programsData";

interface ProgramModulesProps {
  program?: ProgramDetail;
}

export default function ProgramModules({ program }: ProgramModulesProps = {}) {
  const modulesList = program?.modules && program.modules.length > 0 ? program.modules : MODULES_DATA;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Reset index if currentIdx exceeds list length
  const safeIdx = currentIdx >= modulesList.length ? 0 : currentIdx;
  const activeModule = modulesList[safeIdx];

  const handleNext = () => {
    if (safeIdx < modulesList.length - 1) {
      setDirection(1);
      setCurrentIdx(safeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (safeIdx > 0) {
      setDirection(-1);
      setCurrentIdx(safeIdx - 1);
    }
  };

  // Number of card layers stacked behind the active card
  const totalLayers = Math.min(modulesList.length, 8);

  return (
    <section className="relative w-full text-white py-20 sm:py-28 overflow-hidden bg-black">
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
        className="absolute top-10 right-6 sm:right-16 lg:right-24 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 pointer-events-none z-10 opacity-80"
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

        {/* Top Tag: — The Syllabus */}
        <div className="flex items-center gap-2 pb-4">
          <div className="w-5 h-[2px] bg-[#00BF63]" />
          <span className="font-poppins text-sm sm:text-base font-medium text-slate-300 tracking-wide">
            The Syllabus
          </span>
        </div>

        {/* Section Heading Centered */}
        <div className="text-center max-w-xl mx-auto pb-14 sm:pb-20">
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Module
            </h2>
          </MotionText>
        </div>

        {/* Stacked Cards Showcase Container */}
        <div className="relative max-w-[940px] mx-auto pt-16 sm:pt-20">

          {/* Stacked Deck Outline Layers directly connected behind active card */}
          <div className="absolute inset-x-0 top-16 sm:top-20 pointer-events-none">
            {Array.from({ length: totalLayers }).map((_, i) => {
              const stepFromFront = totalLayers - i; // 8, 7, 6, 5, 4, 3, 2, 1
              const offsetY = stepFromFront * 7;
              const scale = 1 - (stepFromFront - 1) * 0.009;
              const opacity = 0.35 + (i / totalLayers) * 0.55;

              return (
                <div
                  key={i}
                  className="absolute top-0 inset-x-0 h-28 rounded-t-[28px] sm:rounded-t-[32px] border-t border-x bg-[#040805] transition-all duration-300"
                  style={{
                    transform: `translateY(-${offsetY}px) scaleX(${scale})`,
                    opacity: opacity,
                    borderColor: `rgba(0, 191, 99, ${0.25 + (i / totalLayers) * 0.45})`,
                  }}
                />
              );
            })}
          </div>

          {/* Main Animated Active Card Frame */}
          <div className="relative rounded-[28px] sm:rounded-[32px] border border-[#00BF63]/40 bg-[#040805] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden z-20">

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeModule.id}
                custom={direction}
                initial={{ opacity: 0, y: direction === 1 ? 30 : -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction === 1 ? -30 : 30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-8 sm:space-y-10"
              >
                {/* Module Header Pill Banner */}
                <div className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#000000] border border-[#00BF63]/40 text-center shadow-md">
                  <h3 className="font-clash text-lg sm:text-2xl font-semibold text-white tracking-wide">
                    {activeModule.title}
                  </h3>
                </div>

                {/* Two Columns Grid: Topics & Practical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 pt-2">

                  {/* Left Column: Topics */}
                  <div className="space-y-4 sm:space-y-5">
                    <h4 className="font-clash text-lg sm:text-xl font-semibold text-[#00BF63] tracking-wide">
                      Topics
                    </h4>
                    <ul className="space-y-2 sm:space-y-2.5 font-poppins text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                      {activeModule.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Practical */}
                  <div className="space-y-4 sm:space-y-5">
                    <h4 className="font-clash text-lg sm:text-xl font-semibold text-[#00BF63] tracking-wide">
                      Practical
                    </h4>
                    <ul className="space-y-2 sm:space-y-2.5 font-poppins text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                      {activeModule.practical.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Additional Tools list if present (e.g. Module 6) */}
                    {activeModule.tools && activeModule.tools.length > 0 && (
                      <div className="pt-3 space-y-2">
                        <h5 className="font-clash text-sm sm:text-base font-semibold text-[#00BF63] tracking-wide">
                          Tools
                        </h5>
                        <ul className="space-y-2 sm:space-y-2.5 font-poppins text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                          {activeModule.tools.map((tool, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Center Navigation Controls (Prev & Next Buttons) */}
            <div className="flex items-center justify-center gap-4 pt-10 sm:pt-12 relative z-20">
              <motion.button
                whileHover={safeIdx > 0 ? { scale: 1.08 } : {}}
                whileTap={safeIdx > 0 ? { scale: 0.94 } : {}}
                onClick={handlePrev}
                disabled={safeIdx === 0}
                aria-label="Previous Module"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                  safeIdx === 0
                    ? "border border-white/15 bg-[#0a0f0c] text-white/30 cursor-not-allowed opacity-50"
                    : "border border-white/20 bg-[#0d1410] text-white hover:border-[#00BF63]/60 cursor-pointer"
                }`}
              >
                <FiArrowUpRight className="w-5 h-5 stroke-[2.5] -rotate-90" />
              </motion.button>

              <motion.button
                whileHover={safeIdx < modulesList.length - 1 ? { scale: 1.08 } : {}}
                whileTap={safeIdx < modulesList.length - 1 ? { scale: 0.94 } : {}}
                onClick={handleNext}
                disabled={safeIdx === modulesList.length - 1}
                aria-label="Next Module"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  safeIdx === modulesList.length - 1
                    ? "border border-white/15 bg-[#0a0f0c] text-white/30 cursor-not-allowed opacity-50"
                    : "bg-[#00BF63] text-black hover:bg-[#00d66e] hover:shadow-[0_0_25px_rgba(0,191,99,0.5)] cursor-pointer"
                }`}
              >
                <FiArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
