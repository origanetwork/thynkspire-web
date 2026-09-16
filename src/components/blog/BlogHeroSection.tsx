"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { BlogPost, getDefaultPost } from "@/data/blogPosts";

interface BlogHeroSectionProps {
  featuredPost?: BlogPost;
}

export default function BlogHeroSection({ featuredPost }: BlogHeroSectionProps) {
  const post = featuredPost || getDefaultPost();

  return (
    <section className="relative z-10 pt-32 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1353px] 2xl:max-w-[1440px] mx-auto">
      {/* Background Ambient Spotlights & Circuit SVGs */}
      <div className="absolute top-0 left-0 w-full h-[700px] pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-24 left-1/4 w-[600px] sm:w-[800px] h-[500px] opacity-30 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(0, 191, 99, 0.4) 0%, rgba(0, 191, 99, 0.05) 60%, rgba(0, 0, 0, 0) 80%)",
          }}
        />

        {/* Circuit SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          fill="none"
        >
          <path
            d="M -50 120 C 120 120, 180 160, 240 160 H 450"
            stroke="#00BF63"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="450" cy="160" r="3.5" fill="#00BF63" />
        </svg>
      </div>

      <div className="relative z-10 space-y-10 sm:space-y-12 pt-10 md:pt-20">
        {/* Header Title & Subtitle */}
        <div className="relative text-center space-y-4 max-w-3xl mx-auto">
          {/* Left Decorative Vector Graphic */}
          <div className="hidden md:block absolute -left-28 sm:-left-36 lg:-left-44 top-2 md:top-6 w-36 sm:w-44 lg:w-52 h-auto pointer-events-none select-none z-10 opacity-40 hover:opacity-70 transition-opacity">
            <Image
              src="/vector/Group.png"
              alt="Decorative Vector"
              width={210}
              height={140}
              className="object-contain w-full h-auto drop-shadow-[0_0_20px_rgba(0,191,99,0.25)]"
            />
          </div>

          <MotionText delay={0.1}>
            <p className="font-poppins text-[#00BF63] text-xs sm:text-sm font-medium tracking-wider">
              Thynkspire Blog
            </p>
          </MotionText>

          <MotionText delay={0.2}>
            <h1 className="font-clash text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.15] ">
              Ideas, Insights & <br className="hidden sm:inline" />
              Stories{" "}
              <span className="text-[#00BF63] inline-block drop-shadow-[0_0_25px_rgba(0,191,99,0.4)]">
                Thynkspire
              </span>
            </h1>
          </MotionText>

          <MotionText delay={0.3}>
            <p className="font-poppins text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Explore the latest news, awareness content, success stories, and updates from Thynkspire.
            </p>
          </MotionText>
        </div>

        {/* Main Featured Blog Post Card */}
        <MotionFadeIn delay={0.35} direction="up" distance={30}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="relative w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[36px] border border-[#00BF63]/35 bg-[#0b0e0c] shadow-[0_0_35px_rgba(0,191,99,0.18)] group-hover:border-[#00BF63]/60 group-hover:shadow-[0_0_50px_rgba(0,191,99,0.28)] transition-all duration-500 overflow-hidden">
              <div className="flex flex-col lg:flex-row min-h-[360px] lg:min-h-[460px] xl:min-h-[500px]">
                {/* Left Side: Full height image flush to left edge */}
                <div className="relative w-full lg:w-[48%] xl:w-[46%] h-[260px] sm:h-[340px] lg:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={post.heroImage || post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Right Side: Card Details with padding */}
                <div className="flex flex-col justify-between w-full lg:w-[52%] xl:w-[54%] p-6 sm:p-8 lg:p-12 xl:p-14 space-y-6">
                  <div className="space-y-4 lg:space-y-6">
                    {/* Category Tag */}
                    <div className="font-poppins text-xs sm:text-sm font-semibold tracking-wider text-[#00BF63]">
                      <span>Featured / {post.category.replace("AI & ", "")}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-clash text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] font-bold text-white group-hover:text-[#00BF63] transition-colors leading-[1.18]">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-poppins text-slate-400 text-xs sm:text-sm lg:text-base font-light leading-relaxed line-clamp-3 lg:line-clamp-4">
                      {post.subtitle}
                    </p>
                  </div>

                  {/* Divider Line and Footer */}
                  <div className="pt-4 lg:pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="font-poppins text-xs sm:text-sm text-slate-400">
                      {post.date}
                    </span>

                    <div className="inline-flex items-center gap-2 font-poppins text-xs sm:text-sm lg:text-base font-semibold text-[#00BF63] group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Read More</span>
                      <FiArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </MotionFadeIn>
      </div>
    </section>
  );
}
