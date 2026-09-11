"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import HeroCodeAnimate from "@/components/HeroCodeAnimate";

// Animated counter component with smooth easing and delay sync
function CounterNumber({
  value,
  suffix = "+",
  duration = 2.4,
  delay = 0.65,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;

      if (elapsed < delay) {
        setCount(0);
        frameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      // Smooth cubic ease-out so it visibly counts up cleanly starting from 0
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration, delay]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      <span className="text-[#00BF62] ml-0.5">{suffix}</span>
    </span>
  );
}

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden pt-[115px] sm:pt-[140px] lg:pt-[165px] pb-16 lg:pb-24">
      {/* Ambient background glow matching Figma canvas */}
      <div className="absolute top-0 left-0 w-[550px] lg:w-[850px] h-[550px] lg:h-[850px] bg-radial from-[#00BF62]/16 via-[#00BF62]/4 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[25%] right-[-5%] w-[450px] h-[450px] bg-radial from-[#00BF62]/10 via-transparent to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Main Container matching Figma 1353px layout grid */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Hero Grid: Left Content + Right Tech Frame */}
        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-6 min-h-[560px]">
          
          {/* Left Column: Heading, Subheading & Paragraph (x: 105, y: 245, w: 591 in Figma) */}
          <div className="w-full lg:max-w-[591px] flex flex-col gap-5 sm:gap-6 pt-4 lg:pt-24 z-20">
            
            {/* Category Subtitle */}
            <MotionFadeIn delay={0.1} direction="up" distance={15}>
              <span
                className="font-poppins text-white/40 text-base sm:text-lg lg:text-[20px] font-medium tracking-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                About Thynkspire
              </span>
            </MotionFadeIn>

            {/* Main Headline */}
            <h1 className="flex flex-col gap-0.5 sm:gap-1">
              <MotionText delay={0.2} duration={0.8}>
                <span
                  className="font-poppins font-semibold text-[38px] sm:text-[50px] lg:text-[60px] leading-[1.08] tracking-tight text-[#F5F5F5]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Building <span className="text-[#00BF62]">Futures.</span>
                </span>
              </MotionText>
              
              <MotionText delay={0.35} duration={0.8}>
                <span
                  className="font-poppins font-medium text-[38px] sm:text-[50px] lg:text-[60px] leading-[1.08] tracking-tight text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Inspiring <span className="text-[#00BF62]">Millions.</span>
                </span>
              </MotionText>
            </h1>

            {/* Paragraph Description */}
            <MotionFadeIn delay={0.5} direction="up" distance={20}>
              <p
                className="font-poppins font-normal text-white/70 text-base sm:text-lg lg:text-[21px] leading-[1.55] max-w-[520px]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Thynkspire India Pvt. Ltd. is an innovation-driven education and technology company preparing students for future careers through practical learning, industry exposure, and large-scale engagement platforms.
              </p>
            </MotionFadeIn>

            {/* Bottom Stats Capsule Bar matching Home Hero Section Model */}
            <MotionFadeIn delay={0.65} direction="up" distance={30} className="relative flex items-center w-full mt-2 sm:mt-4">
              <div
                className="relative w-full max-w-[656px] lg:max-w-[690px] xl:max-w-[720px] min-h-[96px] lg:h-[122px] rounded-[32px] sm:rounded-[60px] lg:rounded-[94px] overflow-hidden py-4 sm:py-[9px] px-3 sm:px-8 shadow-2xl flex items-center justify-between opacity-100 bg-[#030d07]"
                style={{
                  background: "linear-gradient(90deg, #010a05 0%, rgba(35, 145, 92, 0.22) 50%, #010a05 100%), linear-gradient(180deg, rgba(0, 25, 12, 0.9) 0%, rgba(0, 5, 2, 0.95) 100%)",
                }}
              >
                {/* Circuit background texture */}
                <div
                  className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none z-0"
                  style={{
                    backgroundImage: "url('/hero/stat-bg.jpg')",
                    filter: "hue-rotate(190deg) brightness(0.15) saturate(2.5)",
                  }}
                />

                {/* 3 Stats Columns with dynamic count increase animation */}
                <div className="relative z-10 w-full grid grid-cols-3 items-center text-center gap-1 sm:gap-2">
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-clash text-2xl sm:text-[40px] lg:text-[48px] xl:text-[52px] font-semibold text-[#00BF62] tracking-tight leading-tight">
                      <CounterNumber value={100} suffix="+" />
                    </span>
                    <span className="font-poppins text-[10px] sm:text-xs lg:text-[15px] text-slate-200 font-normal mt-0.5 sm:mt-1 whitespace-nowrap">
                      Schools & Colleges
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center relative">
                    <span className="font-clash text-2xl sm:text-[40px] lg:text-[48px] xl:text-[52px] font-semibold text-[#00BF62] tracking-tight leading-tight">
                      <CounterNumber value={50} suffix="+" />
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-poppins text-[10px] sm:text-xs lg:text-[15px] text-slate-200 font-normal mt-0.5 sm:mt-1 whitespace-nowrap">
                        Programs Delivered
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <span className="font-clash text-2xl sm:text-[40px] lg:text-[48px] xl:text-[52px] font-semibold text-[#00BF62] tracking-tight leading-tight">
                      <CounterNumber value={30} suffix="+" />
                    </span>
                    <span className="font-poppins text-[10px] sm:text-xs lg:text-[15px] text-slate-200 font-normal mt-0.5 sm:mt-1 whitespace-nowrap">
                      Industry Partners
                    </span>
                  </div>
                </div>
              </div>
            </MotionFadeIn>

          </div>

          {/* Right Column: Exact Tech Frame 7026 with Students Image, Rotating HUD Arcs & SVG Badges */}
          <div className="w-full lg:w-[684px] relative flex justify-center lg:justify-end shrink-0">
            <div className="relative w-full max-w-[684px] h-[480px] sm:h-[530px] lg:h-[558px]">
              
              {/* Top Connecting HUD Vector Line 1 directly anchored to touch the box's top-left corner (0 gap) */}
              <div className="hidden lg:block absolute right-[100%] top-[-1px] w-[581px] h-[64px] pointer-events-none z-30">
                <svg width="581" height="64" viewBox="0 0 581 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[581px] h-[64px]">
                  <path
                    d="M0 62.9475H343.513C349.669 63.319 363.155 61.8694 371.911 53.7618C373.706 52.0999 375.356 50.2778 377.213 48.6858L426.457 6.46933C428.935 4.2866 436.238 0.166698 445.628 1.14893H581"
                    stroke="white"
                    strokeOpacity="0.18"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Frame 7026 Exact Green Outline Frame (684x558 with stroke #00BF63/25) */}
              <div className="absolute inset-0 border-2 border-[#00BF63]/25 pointer-events-none z-30">
                {/* Vector 12 Notch at Bottom-Left of Frame (Figma 3311:1021) */}
                <div className="absolute bottom-[20px] left-[20px] w-[59px] h-[25px] pointer-events-none">
                  <svg width="59" height="25" viewBox="0 0 59 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M45.5 24H64.5L66 23.5H66.5L68.5 23L73 22.5L78.5 23.5L80 27.5L80.5 31L75 35.5L66.5 39.5L51 41.5L42.5 35L41.2 28H36L34 25L25 20.5C22.3 19.2 18.4 16.5 24 16.5C29.6 16.5 33.7 18.5 35 19.5L34 24L41 27L41.2 28H41.5L45.5 24Z"
                      transform="translate(-23, -16)"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              {/* Vector 4 Exit Step Line on Right Edge (Figma Vector 4 - id: 3311:976) */}
              <div className="hidden lg:block absolute -right-[144px] bottom-[28px] w-[146px] h-[31px] pointer-events-none z-30">
                <svg width="146" height="31" viewBox="0 0 146 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 29.0085H86.3219C87.6483 29.1524 90.3287 28.6916 92.4531 26.2493C93.8 24.7009 94.65 22.7839 95.7673 21.0625L107.165 3.5022C107.421 3.09693 107.882 2.54379 108.5 2.06369C110.458 0.542709 113.23 1.09944 115.71 1.09944H146"
                    stroke="white"
                    strokeOpacity="0.18"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Behind Students: HUD Rotating Concentric Laser Arcs & Grid (Figma code animate 3311:950) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <HeroCodeAnimate className="scale-[0.85] sm:scale-100 lg:scale-[1.02]" />
              </div>

              {/* 3 Floating Tech Diamond Badges with Connected Arrow Vectors matching Home Hero Model */}

              {/* Badge 1: Code Badge </> with Vector-3 Loop Stroke */}
              <motion.div
                className="absolute top-[48px] sm:top-[58px] left-[150px] sm:left-[160px] z-20 pointer-events-none"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <div className="relative w-[50px] sm:w-[57px] h-[50px] sm:h-[57px] drop-shadow-[0_0_15px_rgba(0,191,99,0.6)]">
                  <Image
                    src="/vector/hero_vec_1082_18642.png"
                    alt="Code Badge"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Vector-3 loop connector stroke attached beneath the badge */}
                  <div className="absolute top-[34px] left-[22px] lg:top-[36px] lg:left-[24px] w-[62px] h-[42px] pointer-events-none">
                    <Image
                      src="/vector/Vector-3.png"
                      alt="Vector 3 Loop Stroke"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: Brain AI Badge with Looped Arrow Stroke */}
              <motion.div
                className="absolute top-[8px] sm:top-[12px] right-[180px] sm:right-[200px] z-20 pointer-events-none"
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.8,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                <div className="relative w-[50px] sm:w-[61px] h-[50px] sm:h-[61px] drop-shadow-[0_0_18px_rgba(0,191,99,0.7)]">
                  <Image
                    src="/vector/hero_vec_1082_18647.png"
                    alt="Brain Badge"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Looped Arrow Stroke pointing to the Brain Badge */}
                  <div className="absolute -left-[54px] top-[18px] w-[65px] h-[65px] pointer-events-none">
                    <Image
                      src="/vector/hero_codeline_1082_18639.png"
                      alt="Looped Arrow Stroke"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Badge 3: Team / Users Badge with Arrow Pointer */}
              <motion.div
                className="absolute top-[75px] sm:top-[82px] right-[25px] sm:right-[35px] z-20 pointer-events-none"
                animate={{
                  y: [0, -8, 0],
                  x: [0, 4, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.6,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              >
                <div className="relative w-[50px] h-[50px] drop-shadow-[0_0_14px_rgba(0,191,99,0.6)]">
                  <Image
                    src="/vector/hero_vec_1082_18665.png"
                    alt="Community Badge"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Straight Arrow Pointer pointing left */}
                  <div className="absolute -left-[70px] top-[32px] w-[79px] h-[27px] pointer-events-none">
                    <Image
                      src="/vector/hero_vec_1082_18640.png"
                      alt="Arrow Pointer"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Foreground Students Collaboration Photo (Figma 3311:1022 - exact 680x453 at bottom of frame) */}
              <div className="absolute bottom-[2px] left-[2px] right-[2px] h-[370px] sm:h-[415px] lg:h-[453px] z-20 pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src="/about/hero_students.png"
                    alt="Thynkspire Students and Mentors Collaborating"
                    fill
                    priority
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
