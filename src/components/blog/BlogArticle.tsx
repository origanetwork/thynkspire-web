"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiCheck, FiShare2 } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "@/components/MotionWrapper";

export default function BlogArticle() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const keyPoints = [
    {
      title: "Behavioral Analysis:",
      desc: "Rather than looking for known bad code, AI establishes baselines of normal network behavior and flags anomalies in real-time.",
    },
    {
      title: "Automated Response:",
      desc: "When a threat is detected, AI systems can isolate compromised endpoints instantly, minimizing lateral movement before a human analyst even receives an alert.",
    },
    {
      title: "Phishing Detection:",
      desc: "Advanced natural language processing (NLP) models analyze email context and sender behavior to intercept sophisticated spear-phishing attempts that bypass standard filters.",
    },
  ];

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
              <span className="text-[#00BF63] font-semibold">Technology</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">March 20, 2024</span>
            </div>
          </MotionText>

          {/* Main Article Title */}
          <MotionText delay={0.2} duration={0.6}>
            <h1 className="font-clash text-3xl sm:text-5xl md:text-[54px] lg:text-[60px] font-bold text-white tracking-tight leading-[1.14]">
              How AI is Transforming{" "}
              <span className="text-[#00BF63] inline-block drop-shadow-[0_0_24px_rgba(0,191,99,0.35)]">
                Cybersecurity
              </span>
            </h1>
          </MotionText>

          {/* Lead Summary Subtitle */}
          <MotionText delay={0.3} duration={0.6}>
            <p className="font-poppins text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              As cyber threats evolve into sophisticated automated attacks, artificial intelligence has emerged not just as a tool, but as the foundational defense architecture of the modern digital enterprise.
            </p>
          </MotionText>
        </div>

        {/* Author Details & Share Button Bar */}
        <MotionFadeIn delay={0.35} direction="up" distance={20}>
          <div className="flex items-center justify-between border-y border-white/10 sm:border-transparent py-3">

            {/* Author Info */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#00BF63]/40 shadow-[0_0_15px_rgba(0,191,99,0.2)] shrink-0">
                <Image
                  src="/blog/elena-rostova.jpg"
                  alt="Dr. Elena Rostova"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-clash text-sm sm:text-base font-semibold text-white tracking-tight">
                  Dr. Elena Rostova
                </h4>
                <p className="font-poppins text-xs text-zinc-400">
                  Head of Threat Intelligence, ThynkEdge
                </p>
              </div>
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
              src="/blog/blog.jpeg"
              alt="AI in Cybersecurity and Advanced Robotics"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </MotionFadeIn>

        {/* Article Main Body Text Content - Left & Right Padding applied to bottom content without changing image */}
        <div className="max-w-[860px] mx-auto px-3 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6 space-y-6 sm:space-y-8 font-poppins text-zinc-300 text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">

          <MotionFadeIn delay={0.2} direction="up">
            <p>
              The landscape of digital security has fundamentally shifted. Gone are the days when static firewalls and signature-based antivirus software could provide adequate protection. Today&apos;s threat actors utilize automated tools, polymorphic malware, and sophisticated social engineering tactics that bypass traditional defenses with alarming ease. In this high-stakes environment, artificial intelligence (AI) and machine learning (ML) have become critical imperatives.
            </p>
          </MotionFadeIn>

          {/* Section Heading: The Shift from Reactive to Predictive */}
          <MotionFadeIn delay={0.2} direction="up">
            <div className="pt-4 pb-1">
              <h2 className="font-clash text-2xl sm:text-3xl font-bold text-[#00BF63] tracking-tight">
                The Shift from Reactive to Predictive
              </h2>
            </div>
          </MotionFadeIn>

          <MotionFadeIn delay={0.2} direction="up">
            <p>
              Historically, cybersecurity was a reactive discipline. A threat was identified, a signature was created, and systems were updated to block future occurrences. This model is fatally flawed in an era of zero-day exploits. AI flips this paradigm by enabling predictive security.
            </p>
          </MotionFadeIn>

          {/* Key Points Bullet List with Green Check Circles */}
          <div className="space-y-4 pt-2 pb-2">
            {keyPoints.map((point, index) => (
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

          <MotionFadeIn delay={0.2} direction="up">
            <p>
              While AI empowers defenders, it also equips adversaries. Cybercriminals are now leveraging generative AI to craft highly convincing phishing lures, write polymorphic malware that evades detection, and automate the discovery of vulnerabilities at scale. This creates an ongoing &ldquo;arms race&rdquo; between defensive AI and offensive AI.
            </p>
          </MotionFadeIn>

          <MotionFadeIn delay={0.2} direction="up">
            <p>
              To maintain the upper hand, organizations must continuously train their models on diverse, high-quality datasets and employ &ldquo;red teaming&rdquo; exercises where ethical hackers use adversarial AI techniques to test the resilience of existing defenses.
            </p>
          </MotionFadeIn>

        </div>

      </div>

    </article>
  );
}
