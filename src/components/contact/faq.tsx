"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { MotionFadeIn, MotionText } from "../MotionWrapper";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How soon will I hear back?",
    answer:
      "Our team typically responds within one business day, and often sooner during active admission periods.",
  },
  {
    id: 2,
    question: "Can I visit the campus before applying?",
    answer:
      "Yes, you can schedule an in-person campus visit or virtual walkthrough with one of our counsellors before applying.",
  },
  {
    id: 3,
    question: "I want to bring an event to my institution — who do I contact?",
    answer:
      'You can mention it in the enquiry form above and select "Not Sure Yet", our events team will review your request and get in touch with you directly.',
  },
];

export default function ContactFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full text-white py-16 sm:py-24 overflow-hidden">
      {/* Subtle ambient green glow in center background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00BF62]/6 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-[860px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading */}
        <div className="text-center">
          <MotionText delay={0.1}>
            <h2 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Before you <span className="text-[#00BF62]">reach out</span>
            </h2>
          </MotionText>
        </div>

        {/* Accordion FAQ Items */}
        <MotionFadeIn delay={0.2} direction="up" className="divide-y divide-white/15">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 sm:py-6 group">
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left transition-colors cursor-pointer group-hover:text-[#00BF62]"
                >
                  <span className="font-poppins text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-[#00BF62] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 text-slate-400 group-hover:text-[#00BF62] transition-colors"
                  >
                    <FiChevronDown className="w-5 h-5 stroke-[2]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="font-poppins text-xs sm:text-sm md:text-base text-slate-300 pt-3 sm:pt-4 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </MotionFadeIn>

      </div>
    </section>
  );
}
