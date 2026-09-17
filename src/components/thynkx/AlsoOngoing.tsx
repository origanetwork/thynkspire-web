"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

export default function AlsoOngoing() {
  return (
    <section className="relative w-full text-white pt-16 pb-28 sm:pt-24 sm:pb-36 lg:pb-44 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-[#00BF62]/8 blur-[180px] -z-10 pointer-events-none" />

      <div className="relative z-10 max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-14">

        {/* Section Heading */}
        <div className="text-center">
          <MotionText delay={0.1}>
            <h2 className="font-clash text-3xl sm:text-5xl font-medium tracking-tight text-white">
              Also Ongoing
            </h2>
          </MotionText>
        </div>

        {/* Featured Banner Card Container with Margin Top & Vector directly below it */}
        <div className="relative w-full mt-10 sm:mt-12 lg:mt-14">

          {/* Featured Banner Card: 1000 Cyber Defenders Program */}
          <MotionFadeIn
            direction="up"
            delay={0.2}
            className="relative z-10 w-full rounded-[18px] sm:rounded-[22px] overflow-hidden border-2 border-[#00BF63]/50 shadow-2xl bg-[#010804] min-h-[300px] lg:min-h-[340px] flex flex-col lg:flex-row justify-between group"
            style={{
              background:
                "linear-gradient(90deg, #010a05 0%, rgba(0, 70, 35, 0.35) 45%, #010804 100%)",
              boxShadow: "0px 0px 25px 0px rgba(0, 191, 98, 0.15)",
            }}
          >
            {/* Green X Vector Background Outline aligned right at the photo seam */}
            <div className="absolute left-[62%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] sm:w-[360px] lg:w-[420px] h-[300px] sm:h-[360px] lg:h-[420px] pointer-events-none opacity-75 z-20 hidden lg:block">
              <Image
                src="/vector/about_vec_1082_18697.svg"
                alt="Green X Graphic"
                fill
                className="object-contain"
              />
            </div>

            {/* Left Column Content */}
            <div className="relative z-10 w-full lg:w-[62%] p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between space-y-6">
              <div className="space-y-3 sm:space-y-4 relative z-10 max-w-xl">
                <MotionText delay={0.25}>
                  <h3 className="font-clash text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-semibold text-white tracking-tight leading-tight">
                    1000 Cyber Defenders Program
                  </h3>
                </MotionText>

                <MotionText delay={0.3}>
                  <p className="font-poppins text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    A mission to build a generation of cyber aware and cyber smart students. Together, let’s build a safer digital India.
                  </p>
                </MotionText>
              </div>

              <div className="pt-2 relative z-10">
                <Link href="/programs">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/20 bg-black/40 hover:border-[#00BF63] backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span className="font-poppins text-sm font-medium text-white tracking-wide">
                      Join the Mission
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Right Column Audience Photo */}
            <div className="relative w-full lg:w-[38%] min-h-[260px] lg:min-h-full shrink-0 overflow-hidden">
              <Image
                src="/hero/peoples.png"
                alt="Cyber Defenders Audience"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#010804] to-transparent lg:block hidden z-10" />
            </div>
          </MotionFadeIn>

          {/* Decorative 3D Green Ribbon directly below the banner card on the right */}
          <div className="absolute -right-4 sm:-right-8 lg:-right-12 -bottom-14 sm:-bottom-20 lg:-bottom-24 pointer-events-none select-none z-0 opacity-80 sm:opacity-90">
            <Image
              src="/vector/Group.png"
              alt="Decorative Green Ribbon"
              width={300}
              height={240}
              className="w-44 sm:w-64 lg:w-80 object-contain filter drop-shadow-[0_0_35px_rgba(0,191,98,0.4)]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
