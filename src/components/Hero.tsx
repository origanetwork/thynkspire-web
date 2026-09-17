"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import HeroCodeAnimate from "./HeroCodeAnimate";
import { MotionFadeIn, MotionText, MotionScale } from "./MotionWrapper";

// Animated count up component using requestAnimationFrame with easeOut
function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / (duration * 1000), 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * to));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(to);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [to, duration]);

    return <>{count.toLocaleString()}</>;
}

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen text-white overflow-hidden pt-[115px] sm:pt-[150px] lg:pt-[209px] pb-12 sm:pb-16">
            {/* Outer container matching header width and padding alignment */}
            <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8">

                {/* Relative Hero Layout: Left Content & Right Image positioned side-by-side */}
                <div className="relative flex flex-col lg:flex-row items-start justify-between min-h-[auto] lg:min-h-[580px]">

                    {/* Left Column Content */}
                    <div className="w-full max-w-[656px] flex flex-col gap-6 sm:gap-[36px] z-20">

                        {/* Headline and Subtitle container */}
                        <div className="w-full max-w-[591px] flex flex-col gap-4 sm:gap-[28px] opacity-100">
                            {/* Headline with Framer Motion Text Reveal */}
                            <h1 className="flex flex-col tracking-normal leading-[105%] lg:leading-[100%]">
                                <MotionText delay={0.1} duration={0.8}>
                                    <span
                                        className="font-poppins font-semibold text-[44px] sm:text-[64px] lg:text-[80px] text-white leading-[105%] lg:leading-[100%]"
                                        style={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 600,
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        Skills for
                                    </span>
                                </MotionText>
                                <MotionText delay={0.25} duration={0.8}>
                                    <span
                                        className="font-clash font-semibold text-[44px] sm:text-[64px] lg:text-[80px] leading-[105%] lg:leading-[100%]"
                                        style={{
                                            fontFamily: "'Clash Display', sans-serif",
                                            fontWeight: 600,
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        <span className="text-white">What’s </span>
                                        <span className="text-[#00BF62]">Next?</span>
                                    </span>
                                </MotionText>
                            </h1>

                            {/* Subtitle Paragraph & Vector 1 Group */}
                            <MotionFadeIn delay={0.35} direction="up" distance={20} className="flex flex-col relative">
                                <p
                                    className="font-poppins font-normal text-base sm:text-lg lg:text-[22px] leading-relaxed lg:leading-[100%] text-[#FFFFFFB2]"
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 400,
                                        letterSpacing: "0%",
                                        color: "rgba(255, 255, 255, 0.7)",
                                    }}
                                >
                                    Industry-focused programs, real-world <br className="hidden sm:inline" /> experience, and a platform to grow.
                                </p>

                                {/* Vector 1 Line Graphic seamlessly extending to touch green HUD arcs */}
                                <motion.div
                                    className="relative w-full max-w-[340px] sm:max-w-none sm:w-[850px] lg:w-[980px] xl:w-[1100px] h-[36px] sm:h-[74px] mt-[-2px] sm:mt-[-15px] opacity-100 transition-all pointer-events-none z-10"
                                    animate={{
                                        opacity: [0.85, 1, 0.85],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Image
                                        src="/vector/Vector5.png"
                                        alt="Decorative Line Graphic"
                                        fill
                                        className="object-contain object-left-top"
                                        priority
                                    />
                                </motion.div>
                            </MotionFadeIn>
                        </div>

                        {/* Hero Person Image + Figma HUD Arc Rings & Vector Badges (Positioned in normal flow on mobile, absolute on desktop) */}
                        <div className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[460px] lg:max-w-none lg:w-[798px] h-[280px] xs:h-[320px] sm:h-[420px] lg:h-[532px] relative z-10 lg:absolute lg:right-0 lg:top-[-60px] mx-auto lg:mx-0 my-2 sm:my-4 lg:my-0">

                            {/* Animated Glowing Green HUD Arc Lines & Laser Scanline (Figma code animate) */}
                            <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[18%] top-1/2 -translate-y-1/2 lg:translate-y-0 lg:top-[-40px] w-[290px] xs:w-[330px] sm:w-[450px] lg:w-[580px] h-[290px] xs:h-[330px] sm:h-[450px] lg:h-[580px] pointer-events-none z-0">
                                <HeroCodeAnimate />
                            </div>

                            {/* Top Left Floating Code Badge with Vector-3.png Loop Connector */}
                            <motion.div
                                className="absolute left-[6%] sm:left-[16%] lg:left-[28%] top-[6%] sm:top-[8%] lg:top-[10%] pointer-events-none z-20"
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
                                <div className="relative w-[34px] xs:w-[38px] sm:w-[44px] lg:w-[50px] h-[34px] xs:h-[38px] sm:h-[44px] lg:h-[50px]">
                                    <Image
                                        src="/vector/hero_vec_1082_18642.png"
                                        alt="Code Badge"
                                        fill
                                        className="object-contain"
                                    />

                                    {/* Vector-3 loop connector stroke attached beneath the badge */}
                                    <div className="absolute top-[22px] xs:top-[25px] sm:top-[30px] lg:top-[36px] left-[14px] xs:left-[16px] sm:left-[18px] lg:left-[24px] w-[42px] xs:w-[48px] sm:w-[54px] lg:w-[62px] h-[28px] xs:h-[32px] sm:h-[36px] lg:h-[42px] pointer-events-none">
                                        <Image
                                            src="/vector/Vector-3.png"
                                            alt="Vector 3 Loop Stroke"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Top Right Floating Brain Badge with Looped Arrow Stroke */}
                            <motion.div
                                className="absolute right-[14%] sm:right-[18%] lg:right-[20%] top-[4px] sm:top-[12px] lg:top-[20px] pointer-events-none z-20"
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
                                <div className="relative w-[34px] xs:w-[38px] sm:w-[44px] lg:w-[50px] h-[34px] xs:h-[38px] sm:h-[44px] lg:h-[50px]">
                                    <Image
                                        src="/vector/hero_vec_1082_18647.png"
                                        alt="Brain Badge"
                                        fill
                                        className="object-contain"
                                    />

                                    {/* Looped Arrow Stroke pointing to the Brain Badge */}
                                    <div className="absolute -left-[36px] xs:-left-[42px] sm:-left-[48px] lg:-left-[54px] top-[10px] sm:top-[14px] lg:top-[18px] md:mt-8 w-[42px] xs:w-[48px] sm:w-[56px] lg:w-[65px] h-[42px] xs:h-[48px] sm:h-[56px] lg:h-[65px] pointer-events-none">
                                        <Image
                                            src="/vector/hero_codeline_1082_18639.png"
                                            alt="Looped Arrow Stroke"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Middle Right Community Badge with Arrow Pointer */}
                            <motion.div
                                className="absolute right-[2%] sm:right-[3%] lg:right-[4%] top-[22%] sm:top-[26%] lg:top-[30%] pointer-events-none z-20"
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
                                <div className="relative w-[34px] xs:w-[38px] sm:w-[44px] lg:w-[50px] h-[34px] xs:h-[38px] sm:h-[44px] lg:h-[50px]">
                                    <Image
                                        src="/vector/hero_vec_1082_18665.png"
                                        alt="Community Badge"
                                        fill
                                        className="object-contain"
                                    />

                                    {/* Straight Arrow Pointer pointing left to the person */}
                                    <div className="absolute -left-[46px] xs:-left-[54px] sm:-left-[62px] lg:-left-[70px] top-[20px] sm:top-[26px] lg:top-[32px] w-[52px] xs:w-[60px] sm:w-[68px] lg:w-[79px] h-[18px] xs:h-[21px] sm:h-[24px] lg:h-[27px] pointer-events-none">
                                        <Image
                                            src="/vector/hero_vec_1082_18640.png"
                                            alt="Arrow Pointer"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Main Hero Person Image */}
                            <div className="relative w-full h-full z-10">
                                <Image
                                    src="/hero/hero-person.png"
                                    alt="ThynkSpire Hero Person"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    priority
                                />
                            </div>

                            {/* Vector 5 Bottom Right Decorative Line Graphic */}
                            <motion.div
                                className="absolute -right-4 sm:right-[-10%] lg:right-[-20%] bottom-[0px] w-[260px] xs:w-[320px] sm:w-[500px] lg:w-[750px] h-[36px] sm:h-[60px] lg:h-[80px] pointer-events-none z-20 opacity-100"
                                animate={{
                                    opacity: [1.85, 1, 4.85],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src="/vector/Vector5.png"
                                    alt="Vector 5 Line Graphic"
                                    fill
                                    className="object-contain object-right-bottom"
                                    priority
                                />
                            </motion.div>

                        </div>

                        {/* Action Row Container */}
                        <MotionFadeIn delay={0.45} direction="up" distance={25} className="w-full max-w-[439px] min-h-[60px] sm:h-[74px] flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-[26px] opacity-100">
                            {/* Get Started Button */}
                            <Link href="/contact">
                                <button
                                    className="group flex items-center justify-between shrink-0 transition-all duration-300 hover:border-[#00BF62] w-[170px] sm:w-[193px] h-[54px] sm:h-[63px] px-3 sm:px-[6px] py-[6px] rounded-[38px] border border-white bg-transparent cursor-pointer"
                                >
                                    <span
                                        className="font-poppins font-normal text-base sm:text-[20px] text-white leading-[100%] whitespace-nowrap shrink-0 pl-3 sm:pl-4"
                                        style={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 400,
                                            color: "#FFFFFF",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Get Started
                                    </span>

                                    {/* Green Circle Arrow */}
                                    <div
                                        className="w-[36px] sm:w-[41px] h-[36px] sm:h-[41px] rounded-full text-black flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-300"
                                        style={{ backgroundColor: "#00BF62" }}
                                    >
                                        <FiArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5]" />
                                    </div>
                                </button>
                            </Link>

                            {/* Avatars Stack & Partner Count */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex -space-x-3">
                                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-black bg-[#1e293b] flex items-center justify-center font-bold text-xs text-emerald-400">
                                        P1
                                    </div>
                                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-black bg-[#0f172a] flex items-center justify-center font-bold text-xs text-teal-300">
                                        P2
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-clash text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                                        <CountUp to={2500} duration={2.2} />+
                                    </span>
                                    <span className="font-poppins text-[11px] sm:text-xs text-slate-300 font-normal leading-tight mt-1 whitespace-nowrap">
                                        Industry Partners
                                    </span>
                                </div>
                            </div>

                        </MotionFadeIn>

                        {/* Bottom Stats Capsule Bar & Connected Diagonal Vector Line */}
                        <MotionFadeIn delay={0.55} direction="up" distance={30} className="relative flex items-center w-full">
                            <div
                                className="relative w-full max-w-[656px] lg:max-w-[690px] xl:max-w-[720px] min-h-[96px] lg:h-[122px] rounded-[32px] sm:rounded-[60px] lg:rounded-[94px] overflow-hidden py-4 sm:py-[9px] px-3 sm:px-8 border border-[#00BF62]/30 shadow-2xl flex items-center justify-between mt-2 sm:mt-4 opacity-100 bg-[#030d07]"
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
                                        <span className="font-clash text-4xl sm:text-[40px] lg:text-[50px] xl:text-[54px] font-normal text-[#00BF62] tracking-tight leading-tight">
                                            <CountUp to={10} duration={1.8} />+
                                        </span>
                                        <span className="font-poppins text-[10px] sm:text-xs lg:text-[15px] text-slate-200 font-normal mt-0.5 sm:mt-1 whitespace-nowrap">
                                            Programs Delivered
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center relative">
                                        <span className="font-clash text-4xl sm:text-[40px] lg:text-[50px] xl:text-[54px] font-normal text-[#00BF62] tracking-tight leading-tight">
                                            <CountUp to={25} duration={2} />+
                                        </span>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="font-poppins text-[10px] sm:text-xs lg:text-[15px] text-slate-200 font-normal mt-0.5 sm:mt-1 whitespace-nowrap">
                                                Industry Partners
                                            </span>
                                            {/* Figma vector indicator stroke after Industry Partners */}
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="inline-block stroke-[#00BF62] opacity-80 mt-1 hidden sm:inline-block">
                                                <path d="M1 1L11 7" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <span className="font-clash text-4xl sm:text-[40px] lg:text-[50px] xl:text-[54px] font-normal text-[#00BF62] tracking-tight leading-tight">
                                            <CountUp to={550} duration={2.5} />+
                                        </span>
                                        <span className="font-poppins text-[10px] sm:text-xs lg:text-[15px] text-slate-200 font-normal mt-0.5 sm:mt-1 whitespace-nowrap">
                                            Schools & Colleges
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </MotionFadeIn>

                    </div>

                </div>

                {/* Ongoing Flowing Laser Lines - Originating from stat bar and center, curving rightwards */}
                <div className="relative w-full h-[80px] sm:h-[110px] -mt-4 sm:-mt-8 pointer-events-none z-20 overflow-visible">
                    <svg
                        viewBox="0 0 1440 110"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full overflow-visible"
                    >
                        <defs>
                            <filter id="heroFlowGlow1" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="3.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="heroFlowGlow2" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="3.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Line 1: Stat bar curve moving fully to the right in pure green at reduced speed */}
                        <motion.path
                            d="M 240 15 L 460 15 C 505 15 540 32 580 72 L 625 105 C 660 115 700 115 750 115 L 1440 115"
                            stroke="#00BF62"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="150 1600"
                            fill="none"
                            filter="url(#heroFlowGlow1)"
                            animate={{
                                strokeDashoffset: [1750, -1750],
                            }}
                            transition={{
                                duration: 8.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Line 2: Center curve line between stat and hero image flowing to the right in pure green */}
                        <motion.path
                            d="M 420 25 C 480 25 530 45 575 80 L 620 108 C 660 115 710 115 780 115 L 1440 115"
                            stroke="#00BF62"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeDasharray="120 1450"
                            fill="none"
                            filter="url(#heroFlowGlow2)"
                            animate={{
                                strokeDashoffset: [1570, -1570],
                            }}
                            transition={{
                                duration: 7.8,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 3.5,
                            }}
                        />
                    </svg>
                </div>

            </div>
        </section>
    );
}