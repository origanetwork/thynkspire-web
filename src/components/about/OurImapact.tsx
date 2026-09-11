"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeIn, MotionScale } from "@/components/MotionWrapper";

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

export default function OurImpact() {
    return (
        <section className="relative w-full text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
            {/* Background Ambient Radial Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-radial from-[#00BF62]/14 via-[#00BF62]/3 to-transparent blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-[10%] right-[-10%] w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] bg-radial from-[#00BF62]/12 via-[#00BF62]/2 to-transparent blur-[150px] pointer-events-none -z-10" />

            {/* Cosmic Star Sparkles */}
            <StarSparkle top="10%" left="15%" size="sm" delay={0.2} />
            <StarSparkle top="25%" right="20%" size="md" delay={0.8} />
            <StarSparkle top="45%" left="8%" size="md" delay={1.4} />
            <StarSparkle top="65%" right="12%" size="sm" delay={0.5} />
            <StarSparkle top="80%" left="22%" size="lg" delay={1.8} />
            <StarSparkle top="90%" right="28%" size="md" delay={1.1} />

            {/* Main Container */}
            <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Section Header Tag: — Our Impact — */}
                <MotionFadeIn delay={0.1} direction="up" distance={15} className="flex justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
                        <h3 className="font-poppins text-lg sm:text-2xl font-medium tracking-tight text-white">
                            Our Impact
                        </h3>
                        <div className="w-7 h-[2.5px] bg-[#00BF62] rounded-full" />
                    </div>
                </MotionFadeIn>

                {/* Two Impact Cards Grid with Light Open White Hover Animation */}
                <div className="mt-14 sm:mt-20 max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">

                    {/* Card 1: Thynk X */}
                    <MotionScale delay={0.2} duration={0.8}>
                        <div className="group relative w-full h-[300px] sm:h-[320px] lg:h-[330px] rounded-[24px] sm:rounded-[28px] bg-[#0b100d]/90 border border-white/10 p-7 sm:p-9 lg:p-10 flex flex-col items-start transition-all duration-500 ease-out hover:bg-white/50 hover:border-white/50 hover:shadow-[0_0_45px_rgba(255,255,255,0.25)] hover:-translate-y-2 cursor-pointer overflow-hidden backdrop-blur-md">

                            {/* Subtle ambient light flash overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Top Logo: Thynk X */}
                            <div className="relative z-10 w-full flex items-center justify-start h-10 sm:h-11 mb-6 sm:mb-8">
                                <div className="relative w-32 sm:w-36 h-10 sm:h-11">
                                    <Image
                                        src="/hero/thynkx-logo.png"
                                        alt="Thynk X Platform"
                                        fill
                                        className="object-contain object-left"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3">
                                <h4 className="font-poppins font-semibold text-xl sm:text-2xl lg:text-[24px] text-white group-hover:text-black transition-colors duration-400 leading-tight">
                                    India&apos;s Biggest Quizzing Platform
                                </h4>
                                <p className="font-poppins font-normal text-white/70 group-hover:text-black/80 text-xs sm:text-[14px] leading-[1.65] transition-colors duration-400">
                                    A Flagship Initiative Reaching Thousands Of Curious Minds Through High Stakes, Intellectual Competitions.
                                </p>
                            </div>
                        </div>
                    </MotionScale>

                    {/* Card 2: 1000 Cyber Defenders */}
                    <MotionScale delay={0.35} duration={0.8}>
                        <div className="group relative w-full h-[300px] sm:h-[320px] lg:h-[330px] rounded-[24px] sm:rounded-[28px] bg-[#0b100d]/90 border border-white/10 p-7 sm:p-9 lg:p-10 flex flex-col items-start transition-all duration-500 ease-out hover:bg-white/50 hover:border-white/50 hover:shadow-[0_0_45px_rgba(255,255,255,0.25)] hover:-translate-y-2 cursor-pointer overflow-hidden backdrop-blur-md">

                            {/* Subtle ambient light flash overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Top Badge: 1000 Cyber Defenders Program */}
                            <div className="relative z-10 w-full flex items-center justify-start min-h-10 sm:min-h-11 mb-6 sm:mb-8">
                                <span className="font-poppins font-semibold text-lg sm:text-[20px] text-[#00BF62] group-hover:text-emerald-950 transition-colors duration-400 leading-snug tracking-tight">
                                    1000 Cyber Defenders<br />Program
                                </span>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3">
                                <h4 className="font-poppins font-semibold text-xl sm:text-2xl lg:text-[24px] text-white group-hover:text-black transition-colors duration-400 leading-tight">
                                    Building a Safer Digital India
                                </h4>
                                <p className="font-poppins font-normal text-white/70 group-hover:text-black/80 text-xs sm:text-[14px] leading-[1.65] transition-colors duration-400">
                                    Our Commitment To Nurturing A New Generation Of Cybersecurity Experts To Protect The Nation&apos;s Digital Landscape.
                                </p>
                            </div>
                        </div>
                    </MotionScale>

                </div>

            </div>
        </section>
    );
}
