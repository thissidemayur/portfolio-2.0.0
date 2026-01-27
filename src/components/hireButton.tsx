"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HireMeButton() {
  return (
    /* 1. Added 'hidden md:block' to ensure it only exists on Desktop */
    <aside className="hidden md:block fixed bottom-8 right-8 z-[100]">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Link href="/contact" className="block group">
          <div className="relative flex items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 pl-3 pr-2 py-2 rounded-full hover:border-[#00FF94]/30 transition-all duration-500 shadow-2xl">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF94]"></span>
              </span>
              <span className="text-[9px] font-mono text-white/40 font-bold uppercase tracking-wider">
                READY
              </span>
            </div>

            {/* Text Content */}
            <span className="text-[11px] font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-tight">
              Work With Me
            </span>

            {/* Action Icon */}
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#00FF94] group-hover:text-black transition-all duration-500">
              <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
            </div>

            {/* Aesthetic Glow */}
            <div className="absolute inset-0 rounded-full bg-[#00FF94]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </Link>
      </motion.div>
    </aside>
  );
}
