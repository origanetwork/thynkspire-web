"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "./MotionWrapper";

const galleryItems = [
  {
    id: 1,
    src: "/hero/f1.jpg",
    alt: "Event Setup",
    widthClass: "w-[280px] sm:w-[340px] lg:w-[380px]",
    heightClass: "h-[220px] sm:h-[260px] lg:h-[270px]",
    offsetClass: "lg:translate-y-4",
  },
  {
    id: 2,
    src: "/hero/f2.jpg",
    alt: "Audience Crowd View",
    widthClass: "w-[220px] sm:w-[280px] lg:w-[320px]",
    heightClass: "h-[260px] sm:h-[320px] lg:h-[360px]",
    offsetClass: "lg:-translate-y-4",
  },
  {
    id: 3,
    src: "/hero/f3.jpg",
    alt: "Boardroom Group",
    widthClass: "w-[280px] sm:w-[340px] lg:w-[380px]",
    heightClass: "h-[220px] sm:h-[260px] lg:h-[250px]",
    offsetClass: "lg:translate-y-6",
  },
  {
    id: 4,
    src: "/hero/f4.jpg",
    alt: "Stage Speaker Event",
    widthClass: "w-[220px] sm:w-[280px] lg:w-[320px]",
    heightClass: "h-[260px] sm:h-[320px] lg:h-[370px]",
    offsetClass: "lg:-translate-y-6",
  },
  {
    id: 5,
    src: "/hero/f5.jpg",
    alt: "Cybersecurity Workshop",
    widthClass: "w-[280px] sm:w-[340px] lg:w-[380px]",
    heightClass: "h-[220px] sm:h-[260px] lg:h-[270px]",
    offsetClass: "lg:translate-y-4",
  },
  {
    id: 6,
    src: "/hero/f6.jpg",
    alt: "Tech Conference Crowd",
    widthClass: "w-[220px] sm:w-[280px] lg:w-[320px]",
    heightClass: "h-[260px] sm:h-[320px] lg:h-[360px]",
    offsetClass: "lg:-translate-y-4",
  },
  {
    id: 7,
    src: "/hero/f7.jpg",
    alt: "Hands-on Training Session",
    widthClass: "w-[280px] sm:w-[340px] lg:w-[380px]",
    heightClass: "h-[220px] sm:h-[260px] lg:h-[250px]",
    offsetClass: "lg:translate-y-6",
  },
  {
    id: 8,
    src: "/hero/f8.jpg",
    alt: "Campus Seminar",
    widthClass: "w-[220px] sm:w-[280px] lg:w-[320px]",
    heightClass: "h-[260px] sm:h-[320px] lg:h-[370px]",
    offsetClass: "lg:-translate-y-6",
  },
];

// Animated count up component using requestAnimationFrame with easeOut and viewport trigger
function CountUp({
  to,
  duration = 2,
  suffix = "",
  prefix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasAnimated]);

  React.useEffect(() => {
    if (!hasAnimated) return;

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
  }, [hasAnimated, to, duration]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function FeaturedEvents() {
  return (
    <section className="relative w-full text-white py-20 overflow-hidden">
      {/* Outer container matching exact Header & Hero max width */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-16">

        {/* Section Header Tag & Subtitle */}
        <div className="space-y-3">
          <MotionText delay={0.1} duration={0.6}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-[#00BF63]" />
              <h3 className="font-clash text-xl sm:text-2xl font-bold tracking-tight text-white">
                Featured Events & Initiatives
              </h3>
            </div>
          </MotionText>

          <MotionText delay={0.2} duration={0.6}>
            <p className="font-poppins text-slate-300 text-sm sm:text-base font-light max-w-2xl">
              Curated pathways designed in partnership with industry leaders to ensure relevance and impact.
            </p>
          </MotionText>
        </div>

        {/* Top Featured Banner Card: 1000 Cyber Defenders Program */}
        <MotionFadeIn
          direction="up"
          distance={40}
          duration={0.8}
          className="relative w-full rounded-[14px] sm:rounded-[16px] overflow-hidden border-2 border-[#00BF63]/50 grid grid-cols-1 lg:grid-cols-12 shadow-2xl bg-[#010804] min-h-[300px] lg:min-h-[330px] lg:max-h-[380px]"
          style={{
            background: "linear-gradient(90deg, #010a05 0%, rgba(0, 70, 35, 0.35) 45%, #010804 100%)",
            boxShadow: "0px 0px 25px 0px rgba(0, 191, 98, 0.15)",
          }}
        >
          {/* Green X Vector Background Outline aligned to the right across the seam */}
          <div className="absolute right-[18%] sm:right-[22%] lg:right-[26%] xl:right-[28%] top-1/2 -translate-y-1/2 translate-x-1/2 w-[320px] sm:w-[380px] lg:w-[440px] xl:w-[480px] h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[460px] pointer-events-none opacity-60 z-20">
            <Image
              src="/vector/about_vec_1082_18697.svg"
              alt="Green X Graphic"
              fill
              className="object-contain"
            />
          </div>

          {/* Left Column Content */}
          <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 xl:p-12 relative z-10 flex flex-col justify-between space-y-6">

            <div className="space-y-3 sm:space-y-4 relative z-10">
              <MotionText delay={0.15}>
                <h2 className="font-clash text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-semibold text-white tracking-tight leading-tight">
                  1000 Cyber Defenders Program
                </h2>
              </MotionText>

              <MotionText delay={0.25}>
                <p className="font-poppins text-slate-300 text-sm sm:text-base lg:text-[16px] leading-relaxed font-light max-w-xl">
                  A mission to build a generation of cyber aware and cyber smart students. Together, let’s build a safer digital India.
                </p>
              </MotionText>
            </div>

            <div className="pt-2 relative z-10">
              <Link href="#join-mission">
                <button
                  className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/20 bg-black/40 hover:border-[#00BF63] backdrop-blur-md transition-all duration-300 shadow-lg"
                >
                  <span className="font-poppins text-sm font-medium text-white tracking-wide">
                    Join the Mission
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>
              </Link>
            </div>

          </div>

          {/* Right Column Audience Photo */}
          <div className="lg:col-span-4 relative min-h-[260px] lg:min-h-full">
            <Image
              src="/hero/peoples.png"
              alt="Cyber Defenders Audience"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#010804] via-[#010804]/30 to-transparent lg:block hidden" />
          </div>

        </MotionFadeIn>

        {/* Dynamic Infinite Marquee Carousel: Smooth Right to Left flow with 8 items and staggered editorial aesthetic */}
        <div className="relative w-full overflow-hidden py-6 sm:py-10 lg:py-14">

          {/* Edge fade gradients for seamless infinite entry and exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />

          <motion.div
            className="flex items-center gap-5 sm:gap-7 lg:gap-8 w-max py-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...galleryItems, ...galleryItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className={`group relative shrink-0 ${item.widthClass} ${item.heightClass} ${item.offsetClass} rounded-[16px] sm:rounded-[12px] overflow-hidden border border-white/15 hover:border-[#00BF63] transition-all duration-300 shadow-2xl bg-neutral-900`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority={idx < 4}
                />
              </div>
            ))}
          </motion.div>

        </div>

        {/* Our Impact, By The Numbers Section */}
        <MotionFadeIn direction="up" distance={30} className="space-y-6 sm:space-y-8 pt-8 sm:pt-12">
          <h3 className="font-clash text-2xl sm:text-3xl font-bold tracking-tight text-white text-center">
            Our impact, by the numbers
          </h3>

          {/* Impact Stats Capsule Bar */}
          <div
            className="w-full rounded-[20px] sm:rounded-[32px] border border-[#00BF63]/30 bg-[#030d07] p-5 sm:p-8 lg:p-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center text-center divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-2xl"
            style={{
              background: "linear-gradient(90deg, #010a05 0%, rgba(35, 145, 92, 0.28) 50%, #010a05 100%), linear-gradient(180deg, rgba(0, 25, 12, 0.95) 0%, rgba(0, 5, 2, 0.98) 100%)",
              boxShadow: "0px 0px 24px 0px rgba(0, 191, 98, 0.2)",
            }}
          >
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-clash text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight">
                <CountUp to={50000} duration={3.8} />
              </span>
              <span className="font-poppins text-xs sm:text-sm text-slate-300 font-normal mt-1 sm:mt-2 whitespace-nowrap">
                Student Reached
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-3 md:pt-2">
              <span className="font-clash text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight">
                <CountUp to={500} duration={3.2} suffix="+" />
              </span>
              <span className="font-poppins text-xs sm:text-sm text-slate-300 font-normal mt-1 sm:mt-2 whitespace-nowrap">
                Institution Involved
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-3 md:pt-2">
              <span className="font-clash text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight">
                <CountUp to={500} duration={3.2} suffix="+" />
              </span>
              <span className="font-poppins text-xs sm:text-sm text-slate-300 font-normal mt-1 sm:mt-2 whitespace-nowrap">
                Institution Involved
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-3 md:pt-2">
              <span className="font-clash text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight">
                <CountUp to={1} duration={1.8} />
              </span>
              <span className="font-poppins text-xs sm:text-sm text-slate-300 font-normal mt-1 sm:mt-2 whitespace-nowrap">
                Mission
              </span>
            </div>
          </div>

        </MotionFadeIn>

      </div>
    </section>
  );
}
