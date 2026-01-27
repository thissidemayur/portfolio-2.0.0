"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Cpu,
  Database,
  Layout,
  ChevronRight,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-[#050505] selection:bg-blue-500/30">
      {/* --- ADVANCED BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Radial Glow */}
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-600/20 to-emerald-600/10 rounded-full blur-[120px] pointer-events-none"
        />

        {/* The Grid - 2026 Aesthetic */}
        <div
          className="absolute inset-0 opacity-[0.2] [mask-image:radial-gradient(ellipse_at_center,black_transparent_80%)]"
          style={{
            backgroundImage: `linear-gradient(to right, #2563eb 1px, transparent 1px), linear-gradient(to bottom, #2563eb 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* ELITE STATUS CHIP */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8 backdrop-blur-md"
        >
          <Activity size={14} className="text-blue-400 animate-pulse" />
          <p className="text-[10px] font-mono text-blue-300 uppercase tracking-[0.2em]">
            Status: Open for Freelance & Internships // LPU_CSE_Y3
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          {/* LEFT COLUMN: THE PITCH */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8"
            >
              Fullstack Power. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-emerald-400">
                DevOps Precision.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 border-l-2 border-blue-500/20  mb-10"
            >
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                I’m{" "}
                <span className="text-white font-bold underline decoration-blue-500/50 underline-offset-4">
                  Mayur Pal
                </span>
                . I build high-performance applications using{" "}
                <span className="text-blue-400">Go</span>,{" "}
                <span className="text-blue-400">Next.js</span>, and{" "}
                <span className="text-blue-400">Postgres</span>.
              </p>
              <p className="text-md text-slate-400 max-w-xl font-light italic">
                &quot;I thrive in the &apos;fucking debugging&apos;
                phase—architecting infrastructure that doesn&apos;t just ship,
                but scales.&quot;
              </p>
            </motion.div>

            {/* --- UPDATED ACTION & METADATA SECTION --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              {/* PRIMARY BUTTONS */}
              <div className="flex flex-row items-center gap-3 w-full max-w-full overflow-hidden">
                {/* PRIMARY ACTION: ESTABLISH_CONNECTION */}
                <Link
                  href="/contact"
                  className="flex-1 group flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-blue-600 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest md:tracking-[0.2em] transition-all hover:bg-blue-700 shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95"
                >
                  <span className="truncate">ESTABLISH_CONNECTION</span>
                  <ChevronRight
                    size={14}
                    className="shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                {/* SECONDARY ACTION: RESUME */}
                <Link
                  href="/resume"
                  className="flex-1 group flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-[9px] md:text-xs uppercase tracking-widest hover:bg-white/10 transition-all hover:cursor-pointer"
                >
                  <Terminal size={14} className="shrink-0 text-blue-400" />
                  <span className="truncate">Resume.pdf</span>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative group">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative p-1 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="bg-[#050505] rounded-xl p-6">
                  {/* Terminal Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono">
                      <Terminal size={12} />
                      root@thissidemayur:~
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-white/50 pl-4">
                    {/* Backend / Languages */}
                    <div className="flex items-center gap-2">
                      <Cpu size={12} className="text-blue-500" /> Golang / TS
                    </div>
                    {/* DevOps / Infra */}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border border-emerald-500/50 rounded-sm flex items-center justify-center text-[8px] text-emerald-400">
                        D
                      </div>
                      Docker / AWS
                    </div>
                    {/* Database */}
                    <div className="flex items-center gap-2">
                      <Database size={12} className="text-blue-500" /> Postgres
                      / Redis
                    </div>
                    {/* Automation */}
                    <div className="flex items-center gap-2">
                      <Activity size={12} className="text-emerald-500" /> CI/CD
                      Actions
                    </div>
                    {/* Fullstack */}
                    <div className="flex items-center gap-2">
                      <Layout size={12} className="text-blue-500" /> Next.js 16
                    </div>
                    {/* Security/Linux */}
                    <div className="flex items-center gap-2">
                      <Terminal size={12} className="text-emerald-500" /> Linux
                      / Bash
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
