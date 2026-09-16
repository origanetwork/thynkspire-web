"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionScale } from "./MotionWrapper";

export default function ThynkxBanner() {
  return (
    <section className="relative w-full text-white py-10 sm:py-16">
      {/* Outer container matching exact Hero section max width & padding alignment */}
      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8">

        {/* Banner Card Container aligned perfectly with Hero content */}
        <MotionFadeIn
          direction="up"
          distance={40}
          duration={0.8}
          className="relative w-full min-h-[320px] sm:min-h-[340px] rounded-[20px] sm:rounded-[32px] overflow-hidden border-2 border-[#00BF63] px-5 sm:px-10 lg:px-20 pt-6 sm:pt-10 pb-6 sm:pb-14 lg:pb-16 flex flex-col justify-between"
          style={{
            boxShadow: "0px 0px 5.3px 0px #00BF63",
          }}
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero/banner-img.jpg"
              alt="Quiz Competition Crowd Background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/80 z-0" />
          </div>

          {/* Top Center Thynkx Logo positioned higher near top border */}
          <MotionScale delay={0.2} duration={0.8} className="relative z-10 flex justify-center w-full -mt-1 sm:-mt-8">
            <div className="relative w-40 sm:w-56 lg:w-64 h-12 sm:h-20 lg:h-28">
              <Image
                src="/hero/thynkx-logo.png"
                alt="Thynkx Logo"
                fill
                className="object-contain object-top"
                priority
              />
            </div>
          </MotionScale>

          {/* Content Row: Left Text vs Bottom-Right Register CTA */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-4">
            
            {/* Left Content */}
            <div className="max-w-2xl space-y-2 sm:space-y-3">
              <MotionText delay={0.1} duration={0.7}>
                <h2 className="font-clash text-2xl sm:text-4xl lg:text-[52px] font-normal text-[#00BF63] leading-tight tracking-tight">
                  South India’s <br />
                  <span className="text-[#00BF63]">Biggest Quiz Event</span>
                </h2>
              </MotionText>

              <MotionText delay={0.2} duration={0.7}>
                <p className="font-poppins text-slate-300 text-xs sm:text-base lg:text-lg max-w-xl leading-relaxed font-light pt-1">
                  A mega quiz competition that brings together the brightest minds from schools and colleges across South India.
                </p>
              </MotionText>
            </div>

            {/* Bottom Right Register Now CTA Button */}
            <MotionFadeIn delay={0.3} direction="up" distance={20} className="shrink-0">
              <Link href="/contact">
                <button
                  className="group flex items-center justify-between gap-[8px] sm:gap-[10px] pl-[18px] sm:pl-[21px] pr-[6px] py-[6px] w-[165px] sm:w-[183px] h-[48px] sm:h-[54px] rounded-[38px] border border-white bg-black/60 hover:border-[#00BF63] backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <span className="font-poppins text-sm sm:text-base font-medium text-white tracking-wide whitespace-nowrap">
                    Register Now
                  </span>
                  <div className="w-[36px] h-[36px] rounded-full bg-[#00BF63] text-black flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-300">
                    <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                </button>
              </Link>
            </MotionFadeIn>

          </div>

        </MotionFadeIn>

      </div>
    </section>
  );
}
