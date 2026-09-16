"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionStagger, MotionStaggerItem } from "@/components/MotionWrapper";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const CATEGORIES = ["All", "News", "Awareness", "Success Stories", "Updates"];

export default function BlogGridSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter posts based on selected category
  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const handleToggleLoad = () => {
    if (hasMore) {
      setVisibleCount((prev) => prev + 6);
    } else {
      setVisibleCount(6);
    }
  };

  return (
    <section className="relative w-full text-white py-12 sm:py-16 overflow-hidden">
      {/* Outer container matching exact header max width */}
      <div className="relative z-10 max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header & Category Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/10">
          <MotionText delay={0.1}>
            <h3 className="font-clash text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Latest from Thynkspire
            </h3>
          </MotionText>

          {/* Filter Pills */}
          <MotionFadeIn delay={0.2} direction="left" distance={20}>
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisibleCount(6);
                    }}
                    className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-poppins text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#00BF63] text-black font-semibold shadow-[0_0_15px_rgba(0,191,99,0.35)]"
                        : "bg-[#101411] text-zinc-300 border border-white/10 hover:border-[#00BF63]/50 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </MotionFadeIn>
        </div>

        {/* Blog Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {displayedPosts.length > 0 ? (
              <MotionStagger staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayedPosts.map((post) => (
                  <MotionStaggerItem
                    key={post.id}
                    className="group flex flex-col justify-between space-y-4 bg-[#090C0A]/60 p-3 rounded-2xl border border-white/5 hover:border-[#00BF63]/40 transition-all duration-300 shadow-lg"
                  >
                    {/* Blog Image Container with Bottom-Right Category Pill */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative w-full h-[220px] sm:h-[230px] rounded-[16px] overflow-hidden border border-white/10 group-hover:border-[#00BF63]/60 transition-all duration-300">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Category Pill attached near bottom right */}
                        <div className="absolute right-0 bottom-0 bg-white text-black backdrop-blur-md px-4 py-1.5 rounded-tl-[14px] rounded-br-[16px] shadow-lg">
                          <span className="font-clash text-xs font-semibold text-slate-900">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Post Metadata & Title */}
                    <div className="space-y-2.5 px-2 pb-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-poppins text-xs font-medium text-slate-400 block">
                          {post.date}
                        </span>

                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="font-clash text-base sm:text-lg font-semibold text-white leading-snug group-hover:text-[#00BF63] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                        </Link>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 font-poppins text-xs sm:text-sm font-semibold text-[#00BF63] hover:underline"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </MotionStaggerItem>
                ))}
              </MotionStagger>
            ) : (
              <div className="text-center py-16 space-y-3">
                <p className="font-clash text-xl text-zinc-400">No articles found in this category.</p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="font-poppins text-sm text-[#00BF63] underline"
                >
                  View all articles
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More / Read More Button */}
        {filteredPosts.length > 6 && (
          <MotionFadeIn delay={0.2} direction="up" className="flex justify-center pt-8">
            <button
              onClick={handleToggleLoad}
              className="group flex items-center justify-between gap-3 pl-6 pr-1.5 py-1.5 rounded-full border border-white/20 bg-black hover:border-[#00BF63] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span className="font-poppins text-xs sm:text-sm font-medium text-white tracking-wide">
                {hasMore ? "Read More Article" : "Show Less"}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-300">
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          </MotionFadeIn>
        )}
      </div>
    </section>
  );
}
