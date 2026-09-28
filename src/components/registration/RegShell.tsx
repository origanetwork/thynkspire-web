import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

/** Page frame for registration / login screens: ThynkX logo bar + ambient gradient. */
export default function RegShell({
  label,
  children,
  showLogin = true,
  width = "max-w-[860px]",
}: {
  label?: string;
  children: React.ReactNode;
  showLogin?: boolean;
  width?: string;
}) {
  return (
    <main
      className="relative min-h-screen text-white font-poppins overflow-x-hidden"
      style={{ background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)" }}
    >
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#00BF62]/10 blur-[150px] pointer-events-none" />

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-[1353px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/thynkx" aria-label="ThynkX home" className="relative block w-[104px] sm:w-[128px] h-10 sm:h-12 shrink-0">
              <Image src="/hero/thynkx-logo.png" alt="ThynkX" fill sizes="128px" className="object-contain object-left" priority />
            </Link>
            {label && <span className="hidden sm:block text-sm text-slate-400 border-l border-white/15 pl-4 truncate">{label}</span>}
          </div>
          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
            <Link href="/thynkx" className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-[#00BF62]">
              <FiArrowLeft className="w-4 h-4" /> Back to ThynkX page
            </Link>
            {showLogin && (
              <>
                <span className="hidden lg:inline text-slate-500">Already registered?</span>
                <Link
                  href="/thynkx/login"
                  className="inline-flex items-center h-9 px-4 rounded-full border border-white/20 bg-[#121514] font-semibold hover:border-[#00BF62] transition-colors"
                >
                  Teacher Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className={`relative z-10 ${width} mx-auto px-4 sm:px-8 py-8 sm:py-12`}>{children}</div>
    </main>
  );
}
