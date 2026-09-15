"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { FiChevronDown } from "react-icons/fi";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Who can enroll in this program?",
    answer:
      "Our programs are designed for college students, recent graduates, IT professionals, and career switchers looking to build in-demand industry skills. Whether you are from a technical or non-technical background, our curriculum starts from foundational principles and progresses to advanced practical applications.",
  },
  {
    id: 2,
    question: "Do I need prior coding or cyber security experience?",
    answer:
      "No prior coding or cybersecurity experience is required. We start with absolute basics—including terminal commands, networking fundamentals, and core concepts—before moving to advanced hands-on tools and exploitation methodologies.",
  },
  {
    id: 3,
    question: "Is the course completely online?",
    answer:
      "Yes, the entire program is conducted online with live interactive mentor-led classes, virtual browser labs, 24/7 LMS access to recorded sessions, and real-time doubt resolution support.",
  },
  {
    id: 4,
    question: "What is the duration of the program?",
    answer:
      "The program runs for 6 months, comprising rigorous live instructional modules, weekly hands-on practical lab exercises, project reviews, and a 1-month dedicated industry internship.",
  },
  {
    id: 5,
    question: "Will I receive an internship?",
    answer:
      "Yes, eligible students who successfully complete the coursework and assignments receive a 1-month industry internship opportunity with live project experience, mentorship, and an official experience letter.",
  },
  {
    id: 6,
    question: "Can working professionals attend the classes?",
    answer:
      "Absolutely. Our batch schedules are tailored with evening and weekend live classes to comfortably suit both university students and working professionals, supplemented with on-demand LMS recordings.",
  },
  {
    id: 7,
    question: "Will I receive placement assistance?",
    answer:
      "Yes, we provide end-to-end career guidance including resume building, LinkedIn optimization, 1-on-1 mock technical and HR interviews, portfolio reviews, and direct placement opportunities across our hiring partner network.",
  },
  {
    id: 8,
    question: "How do I apply?",
    answer:
      "You can submit your application directly on our website or get in touch with our admissions team. Our academic counselors will schedule a brief eligibility interaction and guide you through the onboarding process.",
  },
];

import { ProgramDetail } from "@/data/programsData";

interface ProgramFAQProps {
  program?: ProgramDetail;
}

export default function ProgramFAQ({ program }: ProgramFAQProps = {}) {
  const [openId, setOpenId] = useState<number | null>(null);
  const faqList = program?.faqs && program.faqs.length > 0 ? program.faqs : FAQ_DATA;

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 overflow-hidden">
      
      {/* Left Wireframe Decorative Logo Graphic */}
      <div className="absolute top-1/2 -left-12 sm:left-2 lg:left-8 xl:left-16 -translate-y-1/2 w-64 sm:w-80 md:w-96 lg:w-[420px] h-64 sm:h-80 md:h-96 lg:h-[420px] pointer-events-none z-0 opacity-65">
        <svg
          viewBox="0 0 672 615"
          className="w-full h-full drop-shadow-[0_0_16px_rgba(0,191,99,0.3)]"
          fill="none"
        >
          <path
            d="M182.57 301.223L0.5 468.973V612.174H143.701L671.5 127.335V0.5H520.116L331.909 168.25L147.793 0.5H0.5V135.518L182.57 301.223Z"
            stroke="#00BF63"
            strokeWidth="2.2"
            strokeOpacity="0.7"
          />
          <rect
            x="487.884"
            y="430.606"
            width="183.116"
            height="183.116"
            stroke="#00BF63"
            strokeWidth="2.2"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

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
        className="absolute top-1/3 right-6 sm:right-16 lg:right-24 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 pointer-events-none z-10 opacity-75"
      >
        <Image
          src="/vector/Group.png"
          alt="3D Ribbon Vector"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 z-10 flex flex-col items-center">
        
        {/* Section Heading Centered */}
        <div className="text-center max-w-2xl mx-auto pb-14 sm:pb-20">
          <MotionText delay={0.1} duration={0.6}>
            <h2 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </MotionText>
        </div>

        {/* FAQ Accordion List - Compact Center Aligned */}
        <MotionFadeIn delay={0.25} duration={0.7} className="w-full flex justify-center">
          <div className="w-full max-w-[660px] lg:max-w-[680px] divide-y divide-zinc-800/80">
            {faqList.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div key={item.id} className="py-4 sm:py-5 transition-colors">
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-poppins text-sm sm:text-[15px] lg:text-base font-normal tracking-wide transition-colors duration-200 ${
                        isOpen ? "text-[#00BF63]" : "text-white group-hover:text-[#00BF63]"
                      }`}
                    >
                      {item.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="shrink-0 text-slate-400 group-hover:text-white"
                    >
                      <FiChevronDown className="w-5 h-5 stroke-[2]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-poppins text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-3.5 pr-6 sm:pr-8">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
}
