"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About US", href: "/about" },
    { name: "Thynkx", href: "/thynkx" },
    { name: "Programs", href: "/programs" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-4 lg:top-[24px] left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 max-w-[1353px] 2xl:max-w-[1440px] mx-auto font-poppins">
      <div 
        className="w-full h-[68px] sm:h-[78px] lg:h-[88px] rounded-[40px] sm:rounded-[60px] lg:rounded-[86px] px-4 sm:px-6 lg:px-8 bg-[#FFFFFF17] backdrop-blur-[23.5px] border border-white/10 flex items-center justify-between shadow-2xl transition-all"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(23.5px)",
          WebkitBackdropFilter: "blur(23.5px)",
        }}
      >
        {/* Figma Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-36 sm:w-40 lg:w-44 h-12 sm:h-16 lg:h-18 flex items-center">
            <Image
              src="/logo.png"
              alt="ThynkSpire Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center Desktop Navigation Links from Figma */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = 
              item.href === "/about" 
                ? pathname === "/about" 
                : item.href === "/thynkx"
                ? pathname.startsWith("/thynkx")
                : item.href === "/programs"
                ? pathname.startsWith("/programs")
                : item.href === "/contact"
                ? pathname.startsWith("/contact")
                : item.href === "/blog"
                ? pathname.startsWith("/blog")
                : item.href === "/" 
                ? pathname === "/" 
                : activeNav === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveNav(item.name)}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#00BF62] font-semibold"
                    : "text-slate-200 hover:text-[#00BF62]"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00BF62] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Apply Now CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/20 bg-[#121514] text-white hover:border-[#00BF62] transition-all duration-300 shadow-lg"
            >
              <span className="text-xs font-semibold tracking-wider font-poppins">Apply Now</span>
              <div className="w-8 h-8 rounded-full bg-[#00BF62] text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-3 p-6 rounded-3xl bg-[#0d100e]/95 border border-white/10 space-y-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = 
                  item.href === "/about" 
                    ? pathname === "/about" 
                    : item.href === "/thynkx"
                    ? pathname.startsWith("/thynkx")
                    : item.href === "/programs"
                    ? pathname.startsWith("/programs")
                    : item.href === "/contact"
                    ? pathname.startsWith("/contact")
                    : item.href === "/blog"
                    ? pathname.startsWith("/blog")
                    : item.href === "/" 
                    ? pathname === "/" 
                    : activeNav === item.name;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-[#00BF62] bg-white/5 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 px-5 rounded-full bg-[#00BF62] text-black font-bold text-sm flex items-center justify-center gap-2">
                  Apply Now <FiArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
