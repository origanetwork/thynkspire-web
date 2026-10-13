"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FiGrid, FiUsers, FiUserPlus, FiBookOpen, FiCreditCard, FiHome, FiHelpCircle, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { api, ApiError } from "@/lib/api";
import { initials } from "@/lib/format";
import type { TeacherMe } from "@/lib/types";
import { Button, LoadingBlock } from "@/components/registration/ui";

const TeacherContext = createContext<{ me: TeacherMe; reload: () => Promise<void> } | null>(null);

export function useTeacher() {
  const ctx = useContext(TeacherContext);
  if (!ctx) throw new Error("useTeacher must be used inside TeacherShell");
  return ctx;
}

const NAV = [
  { href: "/thynkx/teacher", label: "Dashboard", icon: FiGrid, exact: true },
  { href: "/thynkx/teacher/teams", label: "My Teams", icon: FiUsers },
  { href: "/thynkx/teacher/register-team", label: "Register Team", icon: FiUserPlus },
  { href: "/thynkx/teacher/students", label: "Students", icon: FiBookOpen },
  { href: "/thynkx/teacher/payments", label: "Payments", icon: FiCreditCard },
  { href: "/thynkx/teacher/profile", label: "School Profile", icon: FiHome },
];

export default function TeacherShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<TeacherMe | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const load = useCallback(async () => {
    try {
      setMe(await api<TeacherMe>("/auth/teacher/me"));
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) router.replace("/thynkx/login");
    }
  }, [router]);

  useEffect(() => {
    let active = true;
    api<TeacherMe>("/auth/teacher/me")
      .then((m) => active && setMe(m))
      .catch((e) => {
        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) router.replace("/thynkx/login");
      });
    return () => {
      active = false;
    };
  }, [router]);

  const logout = async () => {
    setLoggingOut(true);
    await api("/auth/teacher/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/thynkx/login");
  };

  // Esc closes the logout confirmation
  useEffect(() => {
    if (!confirmLogout) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !loggingOut && setConfirmLogout(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmLogout, loggingOut]);

  if (!me) {
    return (
      <main className="min-h-screen bg-black text-white font-poppins flex items-center justify-center">
        <LoadingBlock label="Loading your dashboard…" />
      </main>
    );
  }

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));
  const pageTitle =
    pathname === "/thynkx/teacher"
      ? `Welcome, ${me.fullName}!`
      : pathname.startsWith("/thynkx/teacher/support")
        ? "Help & Support"
        : (NAV.find((n) => isActive(n.href, n.exact))?.label ?? "Dashboard");

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon, exact }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setMenuOpen(false)}
          className={clsx(
            "flex items-center gap-3 h-11 px-4 rounded-xl text-sm font-medium transition-colors",
            isActive(href, exact) ? "bg-[#00BF62] text-black" : "text-slate-300 hover:bg-white/5 hover:text-white",
          )}
        >
          <Icon className="w-4.5 h-4.5" /> {label}
        </Link>
      ))}
      <div className="my-3 h-px bg-white/10" />
      <Link
        href="/thynkx/teacher/support"
        onClick={() => setMenuOpen(false)}
        className={clsx(
          "flex items-center gap-3 h-11 px-4 rounded-xl text-sm font-medium transition-colors",
          isActive("/thynkx/teacher/support") ? "bg-[#00BF62] text-black" : "text-slate-300 hover:bg-white/5 hover:text-white",
        )}
      >
        <FiHelpCircle className="w-4.5 h-4.5" /> Help &amp; Support
      </Link>
      <button
        onClick={() => {
          setMenuOpen(false);
          setConfirmLogout(true);
        }}
        className="flex items-center gap-3 h-11 px-4 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-red-300 cursor-pointer"
      >
        <FiLogOut className="w-4.5 h-4.5" /> Logout
      </button>
    </nav>
  );

  const sectionCard = (
    <div className="rounded-2xl border border-[#00BF62]/30 bg-[#00BF62]/[0.06] p-4">
      <p className="text-[11px] uppercase tracking-wider text-slate-400">Your section</p>
      <p className="mt-1 font-semibold text-white text-sm">{me.sectionLabel}</p>
      <p className="mt-1 text-xs text-[#00BF62] break-all">Code: {me.schoolCode}</p>
    </div>
  );

  return (
    <TeacherContext.Provider value={{ me, reload: load }}>
      <div className="min-h-screen bg-black text-white font-poppins" style={{ background: "linear-gradient(289.27deg, #000000 75%, #00BF62 200%)" }}>
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[264px] flex-col gap-6 border-r border-white/10 bg-[#070908]/90 backdrop-blur-xl p-5">
          <Link href="/thynkx" className="relative block w-[140px] h-12">
            <Image src="/hero/thynkx-logo.png" alt="ThynkX" fill sizes="140px" className="object-contain object-left" priority />
          </Link>
          {sectionCard}
          {nav}
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="lg:hidden fixed inset-0 z-50 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)}>
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
                className="w-[272px] h-full bg-[#070908] border-r border-white/10 p-5 flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className="relative w-[120px] h-10">
                    <Image src="/hero/thynkx-logo.png" alt="ThynkX" fill sizes="120px" className="object-contain object-left" />
                  </div>
                  <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 text-slate-300 cursor-pointer">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                {sectionCard}
                {nav}
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:pl-[264px]">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="h-16 sm:h-[72px] px-4 sm:px-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-300 cursor-pointer" aria-label="Open menu">
                  <FiMenu className="w-5 h-5" />
                </button>
                <h1 className="min-w-0 font-clash font-semibold text-lg sm:text-xl truncate">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{me.fullName}</p>
                  <p className="text-xs text-slate-400">Coordinator · {me.section === "SECONDARY" ? "Secondary" : "Higher Secondary"}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#00BF62] text-black font-bold text-sm flex items-center justify-center">{initials(me.fullName)}</div>
              </div>
            </div>
          </header>
          <main className="px-4 sm:px-8 py-6 sm:py-10 max-w-[1280px]">{children}</main>
        </div>

        {/* Logout confirmation */}
        <AnimatePresence>
          {confirmLogout && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loggingOut && setConfirmLogout(false)}
            >
              <motion.div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="logout-title"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-sm rounded-[24px] border border-white/10 bg-[#0b0f0d] p-6 sm:p-7 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/40 text-red-300 flex items-center justify-center">
                  <FiLogOut className="w-5 h-5" />
                </span>
                <h2 id="logout-title" className="mt-4 font-clash text-xl font-semibold text-white">
                  Log out?
                </h2>
                <p className="mt-2 text-sm text-slate-400">You&apos;ll need a WhatsApp OTP to log in to your ThynkX dashboard again.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="secondary" full onClick={() => setConfirmLogout(false)} disabled={loggingOut} autoFocus>
                    Cancel
                  </Button>
                  <Button variant="danger" full onClick={logout} loading={loggingOut}>
                    Log out
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TeacherContext.Provider>
  );
}
