"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { MotionFadeIn, MotionText, MotionScale } from "../MotionWrapper";

export default function Getintouch() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", phone: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section 
      id="contact"
      className="relative w-full text-white pt-28 sm:pt-36 lg:pt-44 xl:pt-48 pb-20 lg:pb-32 overflow-hidden"
      style={{
        background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00BF62]/50 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00BF62]/8 blur-[140px] -z-10 pointer-events-none" />

      {/* Top Left Circuit Trace Line */}
      <div className="absolute left-4 sm:left-12 lg:left-24 top-28 sm:top-36 lg:top-44 w-48 sm:w-72 pointer-events-none -z-10 opacity-70">
        <svg width="100%" height="40" viewBox="0 0 260 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 10 L 120 10 L 150 28 L 240 28" stroke="#00BF62" strokeWidth="1.5" strokeOpacity="0.45" />
          <circle cx="240" cy="28" r="3.5" fill="#00BF62" />
          <circle cx="240" cy="28" r="7" fill="#00BF62" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Form Area Top Circuit Trace Line */}
      <div className="absolute right-6 sm:right-20 lg:right-32 top-[44%] w-60 sm:w-96 pointer-events-none -z-10 hidden md:block opacity-60">
        <svg width="100%" height="40" viewBox="0 0 350 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 15 28 L 100 28 L 130 10 L 350 10" stroke="#00BF62" strokeWidth="1.5" strokeOpacity="0.45" />
          <circle cx="15" cy="28" r="3.5" fill="#00BF62" />
          <circle cx="15" cy="28" r="7" fill="#00BF62" fillOpacity="0.25" />
        </svg>
      </div>

      <div className="max-w-[1353px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-12 lg:space-y-16">
        
        {/* Top Header Row: Left Title/Subtitle & Right Phone/Email Badges */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-12">
          
          {/* Left Title Area */}
          <div className="space-y-4 max-w-2xl">
            <MotionFadeIn delay={0.1} direction="left">
              <span className="font-poppins text-xs sm:text-sm font-semibold text-[#00BF62] tracking-wider uppercase">
                Get in touch
              </span>
            </MotionFadeIn>

            <MotionText delay={0.15}>
              <h1 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Let&apos;s talk about your <br />
                <span className="text-white">next step.</span>
              </h1>
            </MotionText>

            <MotionFadeIn delay={0.2} direction="up">
              <p className="font-poppins text-xs sm:text-sm md:text-base text-slate-300 max-w-lg leading-relaxed pt-1">
                Whether you&apos;re exploring a program, planning an event partnership, or just have a question — our team replies within one business day.
              </p>
            </MotionFadeIn>
          </div>

          {/* Right Direct Contact Info Cards */}
          <MotionFadeIn delay={0.25} direction="right" className="flex flex-col sm:flex-row lg:flex-col gap-5 sm:gap-8 shrink-0 w-full sm:w-auto lg:pb-1">
            
            {/* Phone Card */}
            <Link 
              href="tel:+917907672043" 
              className="flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 rounded-[14px] border border-[#00BF62]/50 bg-[#00BF62]/10 flex items-center justify-center text-[#00BF62] shadow-[0_0_18px_rgba(0,191,98,0.2)] group-hover:border-[#00BF62] group-hover:scale-105 transition-all">
                <FiPhone className="w-5 h-5" />
              </div>
              <div className="font-poppins">
                <span className="block text-xs text-slate-400 font-medium tracking-wider uppercase">
                  PHONE
                </span>
                <span className="text-sm sm:text-lg font-medium text-white group-hover:text-[#00BF62] transition-colors">
                  +91 790 767 2043
                </span>
              </div>
            </Link>

            {/* Email Card */}
            <Link 
              href="mailto:hello@thynkspire.com" 
              className="flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 rounded-[14px] border border-[#00BF62]/50 bg-[#00BF62]/10 flex items-center justify-center text-[#00BF62] shadow-[0_0_18px_rgba(0,191,98,0.2)] group-hover:border-[#00BF62] group-hover:scale-105 transition-all">
                <FiMail className="w-5 h-5" />
              </div>
              <div className="font-poppins">
                <span className="block text-xs text-slate-400 font-medium tracking-wider uppercase">
                  EMAIL
                </span>
                <span className="text-sm sm:text-lg font-medium text-white group-hover:text-[#00BF62] transition-colors">
                  hello@thynkspire.com
                </span>
              </div>
            </Link>

          </MotionFadeIn>

        </div>

        {/* Bottom Split Row: Left Illustration GIF & Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left GIF Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <MotionScale delay={0.2} duration={0.7} className="relative w-full max-w-[380px] sm:max-w-[440px] h-[300px] sm:h-[380px]">
              <Image
                src="/contact/get.gif"
                alt="Thynkspire Coding Desk Animation"
                fill
                className="object-contain object-center drop-shadow-2xl"
                priority
                unoptimized
              />
            </MotionScale>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 w-full">
            <MotionFadeIn delay={0.3} direction="up">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div className="space-y-2 font-poppins">
                  <label className="block text-xs sm:text-sm font-medium text-slate-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Unknown@gmail.com"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-[14px] sm:rounded-[16px] bg-[#111413]/90 border border-white/50 focus:border-[#00BF62] focus:outline-none focus:ring-1 focus:ring-[#00BF62] text-white placeholder:text-slate-600 text-xs sm:text-sm transition-all shadow-inner"
                  />
                </div>

                {/* 2-Column Phone Number & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-poppins">
                  
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-200">
                      Phone Number <span className="text-[#00BF62]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Unknown@gmail.com"
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-[14px] sm:rounded-[16px] bg-[#111413]/90 border border-white/50 focus:border-[#00BF62] focus:outline-none focus:ring-1 focus:ring-[#00BF62] text-white placeholder:text-slate-600 text-xs sm:text-sm transition-all shadow-inner"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-200">
                      Email Address <span className="text-[#00BF62]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Unknown@gmail.com"
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-[14px] sm:rounded-[16px] bg-[#111413]/90 border border-white/50 focus:border-[#00BF62] focus:outline-none focus:ring-1 focus:ring-[#00BF62] text-white placeholder:text-slate-600 text-xs sm:text-sm transition-all shadow-inner"
                    />
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-2 font-poppins">
                  <label className="block text-xs sm:text-sm font-medium text-slate-200">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Unknown@gmail.com"
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-[14px] sm:rounded-[16px] bg-[#111413]/90 border border-white/50 focus:border-[#00BF62] focus:outline-none focus:ring-1 focus:ring-[#00BF62] text-white placeholder:text-slate-600 text-xs sm:text-sm resize-none transition-all shadow-inner"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitted}
                    className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/50 bg-black/80 hover:border-[#00BF62] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <span className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide">
                      {isSubmitted ? "Enquiry Sent!" : "Sent Enquiry"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      {isSubmitted ? (
                        <FiCheck className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </motion.button>
                </div>

              </form>
            </MotionFadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
