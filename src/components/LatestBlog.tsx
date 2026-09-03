"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionStagger, MotionStaggerItem } from "./MotionWrapper";

export default function LatestBlog() {
  const posts = [
    {
      id: 1,
      image: "/hero/b1.jpg",
      category: "Cyber Security",
      date: "June 10 2026",
      title: "Industry-Oriented Cybersecurity & Data Privacy Workshop for College Students",
      link: "#read-more-1",
    },
    {
      id: 2,
      image: "/hero/b2.jpg",
      category: "AI & Technology",
      date: "May 08 2026",
      title: "How AI Tranforming the Future",
      link: "#read-more-2",
    },
    {
      id: 3,
      image: "/hero/b3.jpg",
      category: "Events",
      date: "June 10 2026",
      title: "THYNK X 2026 - A quiz Experiance Like Never Before",
      link: "#read-more-3",
    },
  ];

  return (
    <section className="relative w-full text-white py-20 overflow-hidden">
      
      {/* Right-side Green Glow Radial Spotlight Overlay */}
      <div 
        className="absolute top-0 right-0 w-[650px] sm:w-[800px] h-full pointer-events-none z-0 opacity-80"
        style={{
          background: "radial-gradient(circle at 100% 40%, rgba(0, 191, 99, 0.25) 0%, rgba(0, 163, 84, 0.08) 50%, rgba(0, 0, 0, 0) 75%)",
        }}
      />

      {/* Outer container matching exact Header & Hero max width */}
      <div className="relative z-10 max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Section Header Tag & Subtitle */}
        <div className="space-y-3">
          <MotionText delay={0.1} duration={0.6}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-[#00BF63]" />
              <h3 className="font-clash text-xl sm:text-2xl font-bold tracking-tight text-white">
                Latest Blog
              </h3>
            </div>
          </MotionText>

          <MotionText delay={0.2} duration={0.6}>
            <p className="font-poppins text-slate-300 text-sm sm:text-base font-light max-w-2xl">
              Thought leadership, industry trends, and stories from our community of learners.
            </p>
          </MotionText>
        </div>

        {/* 3 Blog Cards Grid with Staggered Entrance */}
        <MotionStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <MotionStaggerItem
              key={post.id}
              className="group flex flex-col justify-between space-y-4"
            >
              {/* Blog Image Container with Bottom-Right Category Pill */}
              <div className="relative w-full h-[220px] sm:h-[240px] rounded-[10px] overflow-hidden shadow-xl border border-white/10 group-hover:border-[#00BF63]/60 transition-all duration-300">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Category Pill Tag attached near bottom right */}
                <div className="absolute right-0 bottom-0 bg-white/95 text-black backdrop-blur-md px-5 py-2 rounded-tl-[16px] rounded-br-[18px] shadow-lg">
                  <span className="font-clash text-xs sm:text-sm font-semibold text-slate-900">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Metadata & Title */}
              <div className="space-y-2.5 px-1">
                <span className="font-poppins text-xs font-medium text-slate-300 block">
                  {post.date}
                </span>

                <h4 className="font-clash text-base sm:text-lg font-semibold text-white leading-snug group-hover:text-[#00BF63] transition-colors line-clamp-2">
                  {post.title}
                </h4>

                <Link
                  href={post.link}
                  className="inline-block font-poppins text-xs sm:text-sm font-semibold text-[#00BF63] hover:underline pt-1"
                >
                  Read More
                </Link>
              </div>

            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* Bottom Center Read More Button */}
        <MotionFadeIn delay={0.2} direction="up" className="flex justify-center pt-6">
          <Link href="#blog-more">
            <button
              className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/30 bg-black/80 hover:border-[#00BF63] transition-all duration-300 shadow-xl"
              style={{
                borderRadius: "38px",
              }}
            >
              <span className="font-poppins text-sm font-semibold text-white tracking-wide">
                Read More
              </span>
              <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          </Link>
        </MotionFadeIn>

      </div>
    </section>
  );
}
