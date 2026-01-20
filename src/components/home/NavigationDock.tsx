"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  Award,
  FileText,
  Mail,
  Monitor,
} from "lucide-react";

// 1. WHY: Interface for Nav Items
// BENEFIT: Standardizes the structure for icons and links across the app.
interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", icon: <Home size={18} />, href: "/" },
  { name: "About", icon: <User size={18} />, href: "/about" },
  { name: "Projects", icon: <Briefcase size={18} />, href: "/projects" },
  { name: "Certs", icon: <Award size={18} />, href: "/certifications" },
  { name: "Uses", icon: <Monitor size={18} />, href: "/uses" },
  { name: "Resume", icon: <FileText size={18} />, href: "/resume" },
  { name: "Contact", icon: <Mail size={18} />, href: "/contact" },
];

export function NavigationDock() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (typeof window === "undefined" || !isMounted) return null;

  return (
     <nav
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-fit"
      aria-label="Primary Navigation Dock"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-1.5 md:p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full md:rounded-[2rem] shadow-2xl"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href} className="group relative">
              <motion.div
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 md:p-4 rounded-full transition-colors ${
                  isActive
                    ? "text-blue-500 bg-white/5"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {item.icon}

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* WHY: Modern Tooltip */}
                {/* BENEFIT: Provides labels on hover without cluttering the mobile UI. */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[9px] font-black uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {item.name}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 -z-10" />
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* --- SYSTEM TELEMETRY (Hidden on small screens) --- */}
        <div className="border-l border-white/10 ml-1 md:ml-2 pl-3 md:pl-4 pr-2 hidden sm:flex flex-col items-start select-none">
          <div className="flex items-center gap-2">
            <span
              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[7px] md:text-[8px] font-mono text-white/20 uppercase tracking-tighter">
              OS: F42_Live
            </span>
          </div>
          <span className="text-[7px] md:text-[8px] font-mono text-blue-500/40 uppercase tracking-tighter">
            NODE: STABLE
          </span>
        </div>
      </motion.div>
    </nav>
  );
}
