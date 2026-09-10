"use client";

import React from "react";
import Image from "next/image";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

export default function Quote() {
    return (
        <section className="relative w-full text-white py-20 sm:py-32 overflow-hidden">
            {/* Right Background Ambient Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] sm:w-[700px] h-[400px] bg-[#00BF62]/15 blur-[180px] z-0 pointer-events-none" />

            {/* Decorative 3D Green Ribbon on the Right */}
            <div className="absolute -right-12 sm:-right-8 lg:right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-30">
                <Image
                    src="/vector/Group.png"
                    alt="Decorative Green Ribbon"
                    width={280}
                    height={220}
                    className="w-44 sm:w-60 lg:w-72 object-contain filter drop-shadow-[0_0_30px_rgba(0,191,98,0.35)]"
                />
            </div>

            <div className="relative z-10 max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="relative max-w-[720px] lg:max-w-[800px] mx-auto">

                    {/* Giant Green Outline Double Quote Mark at Top Left */}
                    <MotionFadeIn delay={0.1} direction="up" className="mb-4 sm:mb-6 pl-2 sm:pl-4">
                        <svg
                            width="64"
                            height="52"
                            viewBox="0 0 64 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-8 sm:w-14 sm:h-11"
                        >
                            <path
                                d="M2 22C2 10.9543 10.9543 2 22 2V12C16.4772 12 12 16.4772 12 22H24V50H2V22Z"
                                stroke="#00BF62"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                                fill="none"
                            />
                            <path
                                d="M36 22C36 10.9543 44.9543 2 56 2V12C50.4772 12 46 16.4772 46 22H58V50H36V22Z"
                                stroke="#00BF62"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </MotionFadeIn>

                    {/* Open-Ended Geometric Speech Bubble Frame */}
                    <MotionFadeIn delay={0.2} direction="up">
                        <div className="relative w-full pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-45 px-8 sm:px-14 lg:px-16 text-center overflow-visible">

                            {/* Exact Continuous Green Frame Line Path from Figma Close-up */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                                viewBox="0 0 800 320"
                                fill="none"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M 0 0 L 800 0 L 800 240 L 710 240 L 755 310 L 580 240 L 80 240"
                                    stroke="#00BF62"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="miter"
                                />
                            </svg>

                            {/* Quote Typography */}
                            <MotionText delay={0.25}>
                                <div className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-[1.25] space-y-1.5 sm:space-y-2 relative z-10 my-auto">
                                    <p>&ldquo;Big Questions.</p>
                                    <p>Bright Minds.</p>
                                    <p>
                                        Bigger <span className="text-[#00BF62]">Dreams.&rdquo;</span>
                                    </p>
                                </div>
                            </MotionText>

                        </div>
                    </MotionFadeIn>

                </div>
            </div>
        </section>
    );
}
