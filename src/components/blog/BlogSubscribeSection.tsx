"use client";

import React, { useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { MotionFadeIn } from "@/components/MotionWrapper";

export default function BlogSubscribeSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1353px] 2xl:max-w-[1440px] mx-auto font-poppins">
      <MotionFadeIn delay={0.2} direction="up" distance={30}>
        <div className="relative w-full rounded-[24px] border border-[#00BF63]/50 p-8 sm:p-12 lg:p-16 overflow-hidden bg-[#060a07] shadow-[0_0_45px_rgba(0,191,99,0.25)]">
          {/* Right end green radial glow overlay */}
          <div
            className="absolute inset-y-0 right-0 w-full sm:w-[60%] lg:w-[45%] pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at 100% 50%, rgba(0, 191, 99, 0.38) 0%, rgba(0, 191, 99, 0.1) 45%, rgba(0, 0, 0, 0) 80%)",
            }}
          />


          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-3 max-w-lg">
              <h3 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Stay <span className="text-[#00BF63] drop-shadow-[0_0_20px_rgba(0,191,99,0.4)]">Updated</span>
              </h3>
              <p className="font-poppins text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Get new articles and event announcements in your inbox
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-auto min-w-[300px] sm:min-w-[440px] lg:min-w-[540px] xl:min-w-[580px] space-y-2">
              <label htmlFor="blog-email" className="font-poppins text-xs sm:text-sm font-medium text-white block">
                Email Address
              </label>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    id="blog-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="erikson@gmail.com"
                    className="w-full h-[52px] sm:h-[56px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 px-5 font-poppins text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00BF63] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 pl-6 pr-2 py-2 h-[52px] sm:h-[56px] rounded-full border border-white/30 hover:border-[#00BF63] bg-transparent text-white font-poppins text-sm font-semibold transition-all duration-300 cursor-pointer shrink-0"
                >
                  <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
                  <div className="w-8 h-8 rounded-full bg-[#00BF63] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    {subscribed ? <FiCheck className="w-4 h-4 text-black" /> : <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                </button>
              </form>

              {subscribed && (
                <p className="font-poppins text-xs text-[#00BF63] font-medium pt-1">
                  Thank you for subscribing to our newsletter!
                </p>
              )}
            </div>
          </div>
        </div>
      </MotionFadeIn>
    </section>
  );
}
