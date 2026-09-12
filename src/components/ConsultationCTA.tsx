"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionScale } from "./MotionWrapper";

export default function ConsultationCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    }
  };

  return (
    <section className="relative w-full text-white py-12 md:py-22">
      {/* Outer container matching exact Header & Hero width */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8">

        {/* Main CTA Capsule Card with compact height, circuit texture & green linear gradient */}
        <MotionFadeIn
          direction="up"
          distance={40}
          duration={0.8}
          className="relative w-full rounded-[24px] sm:rounded-[30px] overflow-hidden border-2 border-[#00BF62]/40 py-6 sm:py-8 px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl bg-[#030d07]"
          style={{
            background: "linear-gradient(90deg, #010a05 0%, rgba(35, 145, 92, 0.22) 50%, #010a05 100%), linear-gradient(180deg, rgba(0, 25, 12, 0.9) 0%, rgba(0, 5, 2, 0.95) 100%)",
            boxShadow: "0px 0px 20px 0px rgba(0, 191, 98, 0.25)",
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

          {/* Left Column Content (Placed below image on mobile, left on desktop) */}
          <div className="relative z-10 space-y-4 max-w-2xl w-full lg:w-auto order-2 lg:order-1">
            
            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <MotionText delay={0.1} duration={0.7}>
                <h2 className="font-clash text-2xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-tight leading-tight">
                  Ready to Build Your Future?
                </h2>
              </MotionText>

              <MotionText delay={0.2} duration={0.7}>
                <p className="font-poppins text-slate-300 text-sm sm:text-lg font-light">
                  Learn. Grow. Succeed with Thynkspire.
                </p>
              </MotionText>
            </div>

            {/* Email Form & Book Consultation Action Row */}
            <MotionFadeIn delay={0.3} direction="up" distance={20} className="pt-1 space-y-2">
              <span className="font-poppins text-xs text-slate-300 font-medium block">
                Email Address
              </span>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                
                {/* Email Pill Input Container */}
                <div className="relative flex items-center w-full sm:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Unknown@gmail.com"
                    required
                    className="w-full sm:w-[280px] lg:w-[300px] rounded-full border-2 border-white/30 bg-white/20 px-5 py-3.5 pr-20 text-sm font-poppins text-white placeholder-slate-200 focus:outline-none focus:border-[#00BF62] backdrop-blur-md transition-all shadow-inner"
                  />

                  {/* Dual Green Circle Arrow Action Pill inside Input */}
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black hover:bg-[#00BF62]/90 transition-all shadow-md group"
                    title="Submit Email"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#00BF62] flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <FiArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    </div>
                    <FiArrowRight className="w-4 h-4 text-[#00BF62] group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
                  </button>
                </div>

                {/* Book Consultation Button */}
                <Link href="#book-consultation" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto group flex items-center justify-center gap-2.5 pl-5 pr-1.5 py-2.5 rounded-full border border-white/30 bg-transparent hover:border-[#00BF62] backdrop-blur-md transition-all duration-300 shadow-xl"
                    style={{
                      borderRadius: "38px",
                    }}
                  >
                    <span className="font-poppins text-sm font-semibold text-white tracking-wide whitespace-nowrap">
                      Book Consultation
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </button>
                </Link>

              </form>
            </MotionFadeIn>

          </div>

          {/* Right Column: Woman Trophy Winner Vector Illustration (Top center on mobile, right on desktop) */}
          <MotionScale delay={0.3} duration={0.8} className="relative z-10 shrink-0 flex justify-center items-center w-full lg:w-auto order-1 lg:order-2">
            <div className="relative w-[220px] sm:w-[280px] lg:w-[360px] h-[190px] sm:h-[230px] lg:h-[270px]">
              <Image
                src="/hero/girl.png"
                alt="Winner Woman Holding Trophy"
                fill
                className="object-contain object-center lg:object-right"
                priority
              />
            </div>
          </MotionScale>

        </MotionFadeIn>

      </div>
    </section>
  );
}
