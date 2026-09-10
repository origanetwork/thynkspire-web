"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

// Animated Counter Number Component
function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let frameId: number;
    const duration = 1.8;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="tabular-nums font-clash font-bold text-2xl sm:text-3xl lg:text-[34px] text-white tracking-tight leading-none"
    >
      {prefix && <span>{prefix}</span>}
      {count}
      {suffix && <span className="text-white">{suffix}</span>}
    </span>
  );
}

export default function ThynkxEvents() {
  const stats = [
    { value: 150, suffix: "+", label: "Schools" },
    { value: 300, suffix: "+", label: "Teams" },
    { value: 3, suffix: "", label: "Levels" },
    { prefix: "₹", value: 5, suffix: "L+", label: "Prizes" },
  ];

  return (
    <section className="relative w-full text-white py-20 sm:py-28 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[350px] bg-[#00BF62]/10 blur-[170px] -z-10 pointer-events-none" />

      {/* Decorative Green Ribbon / Vector positioned above the title */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-32 sm:-translate-x-48 lg:-translate-x-64 pointer-events-none select-none -z-10 opacity-70">
        <Image
          src="/vector/Group.png"
          alt="Decorative Ribbon"
          width={130}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <MotionFadeIn delay={0.1} direction="up">
            <span className="font-clash text-lg sm:text-2xl font-semibold text-[#00BF62] tracking-wide block">
              Thynk X
            </span>
          </MotionFadeIn>

          <MotionText delay={0.15}>
            <h2 className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Season 1, Kochi Edition
            </h2>
          </MotionText>
        </div>

        {/* 3-Image Staggered Layer Model Display */}
        <MotionFadeIn
          delay={0.2}
          direction="up"
          className="relative w-full max-w-[1180px] mx-auto flex items-center justify-center pt-6 sm:pt-8 pb-8"
        >
          {/* Layer 1: Left Background Image (1.jpg) - shifted top-left */}
          <div className="absolute -left-6 sm:-left-12 lg:-left-16 -top-4 sm:-top-6 lg:-top-8 w-[50%] sm:w-[52%] lg:w-[50%] h-[250px] sm:h-[320px] lg:h-[360px] overflow-hidden opacity-85 brightness-90 shadow-2xl z-0 pointer-events-none hidden sm:block border border-white/10">
            <Image
              src="/thynkx/1.jpg"
              alt="Thynk X Stage Lighting"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Layer 2: Right Background Image (3.jpg) - shifted bottom-right */}
          <div className="absolute -right-6 sm:-right-12 lg:-right-16 -bottom-4 sm:-bottom-6 lg:-bottom-8 w-[50%] sm:w-[52%] lg:w-[50%] h-[250px] sm:h-[320px] lg:h-[360px] overflow-hidden opacity-85 brightness-90 shadow-2xl z-0 pointer-events-none hidden sm:block border border-white/10">
            <Image
              src="/thynkx/3.jpg"
              alt="Thynk X Auditorium Audience"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Layer 3: Center Main Featured Card (2.jpg) - Elevated with thick crisp white border */}
          <div className="relative z-10 w-full sm:w-[88%] lg:w-[82%] max-w-[880px] h-[380px] sm:h-[420px] lg:h-[460px] overflow-hidden border-[3.5px] sm:border-[4px] border-white shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col justify-end group">
            {/* Main Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/thynkx/2.jpg"
                alt="Thynk X Students Competing"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>

            {/* Full Width Glassmorphic Overlay Panel at Bottom (reduced height & reduced thickness) */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex flex-col gap-3 sm:gap-4 bg-black/35 sm:bg-black/30 backdrop-blur-md border-t border-white/20 shadow-2xl">
              {/* Event Info & Button Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="font-poppins text-xs sm:text-[13px] text-white/95 font-medium leading-relaxed drop-shadow-md max-w-xl">
                  <p>Registration Opens: Sept 15, 2026 · Grand Finale: Dec 6, 2026 ·</p>
                  <p className="text-white/80">
                    Inter-School Competitions across three regional rounds.
                  </p>
                </div>

                <div className="shrink-0">
                  <Link href="#details">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group/btn inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/30 bg-black/80 hover:border-[#00BF62] text-white font-poppins text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      <span>View Details</span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300">
                        <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Bottom 4 Stats Counters */}
              <div className="w-full grid grid-cols-4 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-white/15">
                {stats.map((st, idx) => (
                  <div key={idx} className="flex flex-col items-start text-left">
                    <AnimatedStat
                      value={st.value}
                      prefix={st.prefix}
                      suffix={st.suffix}
                    />
                    <span className="font-poppins text-[10px] sm:text-xs text-slate-300 font-medium mt-1">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
