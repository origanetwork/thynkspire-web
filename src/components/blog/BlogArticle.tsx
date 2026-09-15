"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiShare2 } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";
import { BlogPost, getDefaultPost } from "@/data/blogPosts";

interface BlogArticleProps {
  post?: BlogPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
  const [copied, setCopied] = useState(false);
  const article = post || getDefaultPost();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const titleWords = article.title.split(" ");
  const lastWord = titleWords.pop();
  const mainTitle = titleWords.join(" ");

  return (
    <article className="relative z-10 pt-32 sm:pt-40 pb-16 px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1353px] 2xl:max-w-[1440px] mx-auto">

      {/* Background Ambient Glows and Circuit Line Vectors */}
      <div className="absolute top-0 left-0 w-full h-[900px] pointer-events-none overflow-hidden z-0">
        {/* Top-Left Green Radial Spotlight */}
        <div
          className="absolute -top-32 -left-32 w-[600px] sm:w-[750px] h-[600px] opacity-40 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(0, 191, 99, 0.45) 0%, rgba(0, 191, 99, 0.05) 60%, rgba(0, 0, 0, 0) 80%)",
          }}
        />

        {/* Top-Right Green Radial Glow */}
        <div
          className="absolute top-40 right-[-100px] w-[500px] sm:w-[650px] h-[500px] opacity-25 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(0, 191, 99, 0.35) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
        />

        {/* Ambient Circuit Lines (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30 sm:opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
        >
          <path
            d="M -50 140 C 100 140, 140 180, 180 220 C 220 260, 240 290, 310 290"
            stroke="#00BF63"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <circle cx="310" cy="290" r="3.5" fill="#00BF63" />

          <path
            d="M 50 80 Q 200 40 380 90 T 700 130"
            stroke="#00BF63"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <circle cx="700" cy="130" r="3" fill="#00BF63" />

          <path
            d="M 850 240 H 1200 C 1240 240, 1270 270, 1310 270 H 1500"
            stroke="#00BF63"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <circle cx="850" cy="240" r="4" fill="#00BF63" />
        </svg>
      </div>

      {/* Main Column Container */}
      <div className="relative z-10 max-w-[1040px] mx-auto space-y-8 sm:space-y-10">

        {/* Top Header Content (Category, Title, Subtitle) */}
        <div className="space-y-4 sm:space-y-6 max-w-[920px] px-4 md:px-28">

          {/* Category & Date Meta Tag */}
          <MotionText delay={0.1} duration={0.5}>
            <div className="flex items-center gap-2.5 font-poppins text-xs sm:text-sm font-medium tracking-wide">
              <span className="text-[#00BF63] font-semibold">{article.category}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{article.date}</span>
            </div>
          </MotionText>

          {/* Main Article Title */}
          <MotionText delay={0.2} duration={0.6}>
            <h1 className="font-clash text-3xl sm:text-5xl md:text-[54px] lg:text-[60px] font-bold text-white tracking-tight leading-[1.14]">
              {mainTitle}{" "}
              <span className="text-[#00BF63] inline-block drop-shadow-[0_0_24px_rgba(0,191,99,0.35)]">
                {lastWord}
              </span>
            </h1>
          </MotionText>

          {/* Lead Summary Subtitle */}
          <MotionText delay={0.3} duration={0.6}>
            <p className="font-poppins text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              {article.subtitle}
            </p>
          </MotionText>
        </div>

        {/* Author Details & Share Button Bar */}
        <MotionFadeIn delay={0.35} direction="up" distance={20}>
          <div className="flex items-center justify-between border-y border-white/10 sm:border-transparent py-3">

            {/* Author Info */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <Link
                href={article.author.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="group/author flex items-center gap-3.5 sm:gap-4 hover:opacity-95 transition-opacity"
              >
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#00BF63]/40 shadow-[0_0_15px_rgba(0,191,99,0.2)] shrink-0 group-hover/author:border-[#00BF63] group-hover/author:shadow-[0_0_20px_rgba(0,191,99,0.4)] transition-all">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover group-hover/author:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-clash text-sm sm:text-base font-semibold text-white tracking-tight group-hover/author:text-[#00BF63] transition-colors">
                    {article.author.name}
                  </h4>
                  <p className="font-poppins text-xs text-zinc-400">
                    {article.author.role}
                  </p>
                </div>
              </Link>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={handleShare}
                aria-label="Share article"
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-[#00BF63]/15 hover:border-[#00BF63] transition-all duration-300 text-zinc-300 hover:text-[#00BF63]"
              >
                {copied ? (
                  <FiCheck className="w-4 h-4 text-[#00BF63]" />
                ) : (
                  <FiShare2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </button>

              {/* Copied Tooltip Feedback */}
              {copied && (
                <span className="absolute -top-8 right-0 bg-[#00BF63] text-black font-semibold text-xs py-1 px-2.5 rounded-md shadow-lg whitespace-nowrap animate-fade-in">
                  Link Copied!
                </span>
              )}
            </div>
          </div>
        </MotionFadeIn>

        {/* Featured Hero Article Image - Full width of container */}
        <MotionFadeIn delay={0.4} direction="up" distance={25} className="w-full">
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/8] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <Image
              src={article.heroImage || article.image}
              alt={article.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </MotionFadeIn>

        {/* Article Main Body Text Content - Left & Right Padding applied to bottom content without changing image */}
        <div className="max-w-[860px] mx-auto px-3 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6 space-y-6 sm:space-y-8 font-poppins text-zinc-300 text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">

          {article.paragraphs.intro.map((p, idx) => (
            <MotionFadeIn key={`intro-${idx}`} delay={0.2} direction="up">
              <p>{p}</p>
            </MotionFadeIn>
          ))}

          {/* Section Heading */}
          {article.paragraphs.sectionHeading && (
            <MotionFadeIn delay={0.2} direction="up">
              <div className="pt-4 pb-1">
                <h2 className="font-clash text-2xl sm:text-3xl font-bold text-[#00BF63] tracking-tight">
                  {article.paragraphs.sectionHeading}
                </h2>
              </div>
            </MotionFadeIn>
          )}

          {article.paragraphs.sectionIntro && (
            <MotionFadeIn delay={0.2} direction="up">
              <p>{article.paragraphs.sectionIntro}</p>
            </MotionFadeIn>
          )}

          {/* Key Points Bullet List with Green Check Circles */}
          {article.paragraphs.keyPoints && article.paragraphs.keyPoints.length > 0 && (
            <div className="space-y-4 pt-2 pb-2">
              {article.paragraphs.keyPoints.map((point, index) => (
                <MotionFadeIn
                  key={index}
                  delay={0.15 * (index + 1)}
                  direction="up"
                  className="flex items-start gap-3.5 sm:gap-4 group p-3 sm:p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-colors"
                >
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full border border-[#00BF63] bg-[#00BF63]/10 flex items-center justify-center text-[#00BF63]">
                    <FiCheck className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm sm:text-base text-zinc-300 leading-relaxed">
                      <strong className="font-semibold text-white mr-1.5 font-clash">
                        {point.title}
                      </strong>
                      {point.desc}
                    </p>
                  </div>
                </MotionFadeIn>
              ))}
            </div>
          )}

          {article.paragraphs.conclusion.map((p, idx) => (
            <MotionFadeIn key={`concl-${idx}`} delay={0.2} direction="up">
              <p>{p}</p>
            </MotionFadeIn>
          ))}

        </div>

      </div>

    </article>
  );
}
