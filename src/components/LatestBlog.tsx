"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionStagger, MotionStaggerItem } from "./MotionWrapper";

import { blogPosts } from "@/data/blogPosts";

interface LatestBlogProps {
  title?: string;
  subtitle?: string;
  showSubtitle?: boolean;
  showButton?: boolean;
  className?: string;
}

export default function LatestBlog({
  title = "Latest Blog",
  subtitle = "Thought leadership, industry trends, and stories from our community of learners.",
  showSubtitle = true,
  showButton = true,
  className = "",
}: LatestBlogProps) {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const posts = blogPosts.map((post) => ({
    id: post.id,
    image: post.image,
    category: post.category,
    date: post.date,
    title: post.title,
    link: `/blog/${post.slug}`,
  }));

  // Auto cycle cards on mobile every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileIdx((prev) => (prev + 1) % posts.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <section className={`relative w-full text-white py-16 sm:py-20 overflow-hidden ${className}`}>
      
      {/* Right-side Green Glow Radial Spotlight Overlay */}
      <div 
        className="absolute top-0 right-0 w-[650px] sm:w-[800px] h-full pointer-events-none z-0 opacity-80"
        style={{
          background: "radial-gradient(circle at 100% 40%, rgba(0, 191, 99, 0.25) 0%, rgba(0, 163, 84, 0.08) 50%, rgba(0, 0, 0, 0) 75%)",
        }}
      />

      {/* Outer container matching exact Header & Hero max width */}
      <div className="relative z-10 max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header Tag & Subtitle */}
        <div className="space-y-3">
          <MotionText delay={0.1} duration={0.6}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-[#00BF63]" />
              <h3 className="font-clash text-2xl sm:text-3xl font-normal tracking-tight text-white">
                {title}
              </h3>
            </div>
          </MotionText>

          {showSubtitle && subtitle && (
            <MotionText delay={0.2} duration={0.6}>
              <p className="font-poppins text-slate-300 text-sm sm:text-base font-light max-w-2xl">
                {subtitle}
              </p>
            </MotionText>
          )}
        </div>

        {/* Mobile View: Auto-changing Card with AnimatePresence & Indicators */}
        <div className="block md:hidden">
          <div className="relative min-h-[360px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={posts[activeMobileIdx].id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="group flex flex-col justify-between space-y-4"
              >
                {/* Blog Image Container with Bottom-Right Category Pill */}
                <Link href={posts[activeMobileIdx].link} className="block">
                  <div className="relative w-full h-[220px] rounded-[16px] overflow-hidden shadow-xl border border-white/10 group-hover:border-[#00BF63]/60 transition-all duration-300">
                    <Image
                      src={posts[activeMobileIdx].image}
                      alt={posts[activeMobileIdx].title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    
                    {/* Category Pill Tag attached near bottom right */}
                    <div className="absolute right-0 bottom-0 bg-white text-black backdrop-blur-md px-4 py-1.5 rounded-tl-[14px] rounded-br-[16px] shadow-lg">
                      <span className="font-clash text-xs font-semibold text-slate-900">
                        {posts[activeMobileIdx].category}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Post Metadata & Title */}
                <div className="space-y-2 px-1">
                  <span className="font-poppins text-xs font-medium text-slate-300 block">
                    {posts[activeMobileIdx].date}
                  </span>

                  <Link href={posts[activeMobileIdx].link}>
                    <h4 className="font-clash text-lg font-semibold text-white leading-snug group-hover:text-[#00BF63] transition-colors line-clamp-2">
                      {posts[activeMobileIdx].title}
                    </h4>
                  </Link>

                  <Link
                    href={posts[activeMobileIdx].link}
                    className="inline-block font-poppins text-xs font-semibold text-[#00BF63] hover:underline pt-1"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {posts.map((post, idx) => (
              <button
                key={post.id}
                onClick={() => setActiveMobileIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 h-1.5 rounded-full ${
                  activeMobileIdx === idx
                    ? "w-7 bg-[#00BF63]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: 3 Blog Cards Grid with Staggered Entrance */}
        <div className="hidden md:block">
          <MotionStagger staggerDelay={0.15} className="grid grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <MotionStaggerItem
                key={post.id}
                className="group flex flex-col justify-between space-y-4"
              >
                {/* Blog Image Container with Bottom-Right Category Pill */}
                <Link href={post.link} className="block">
                  <div className="relative w-full h-[220px] lg:h-[240px] rounded-[14px] overflow-hidden shadow-xl border border-white/10 group-hover:border-[#00BF63]/60 transition-all duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    
                    {/* Category Pill Tag attached near bottom right */}
                    <div className="absolute right-0 bottom-0 bg-white text-black backdrop-blur-md px-5 py-2 rounded-tl-[16px] rounded-br-[14px] shadow-lg">
                      <span className="font-clash text-xs lg:text-sm font-semibold text-slate-900">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Post Metadata & Title */}
                <div className="space-y-2.5 px-1">
                  <span className="font-poppins text-xs font-medium text-slate-300 block">
                    {post.date}
                  </span>

                  <Link href={post.link}>
                    <h4 className="font-clash text-base lg:text-lg font-semibold text-white leading-snug group-hover:text-[#00BF63] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>

                  <Link
                    href={post.link}
                    className="inline-block font-poppins text-xs lg:text-sm font-semibold text-[#00BF63] hover:underline pt-1"
                  >
                    Read More
                  </Link>
                </div>

              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>

        {/* Bottom Center Read More Button */}
        {showButton && (
          <MotionFadeIn delay={0.2} direction="up" className="flex justify-center pt-6">
            <Link href="/blog">
              <button
                className="group flex items-center justify-between gap-[8px] sm:gap-[10px] pl-[18px] sm:pl-[21px] pr-[6px] py-[6px] w-[150px] sm:w-[161px] h-[48px] sm:h-[54px] rounded-[38px] border border-white bg-black hover:border-[#00BF63] transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span className="font-poppins text-sm sm:text-base font-medium text-white tracking-wide whitespace-nowrap">
                  Read More
                </span>
                <div className="w-[36px] h-[36px] md:w-[32px] md:h-[32px] rounded-full bg-[#00BF63] text-black flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-300">
                  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </div>
              </button>
            </Link>
          </MotionFadeIn>
        )}

      </div>
    </section>
  );
}
