"use client";
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-[#050505]">
      {/* --- VISUAL ARCHITECTURE (BACKGROUND) --- */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Radial Gradient to anchor the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Modern Grid with Masking */}
        <div 
          className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_transparent_70%)]"
          style={{
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* TOP STATUS CHIP */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
            System Status: Active // LPU_B.TECH_Y3
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
          
          {/* LEFT COLUMN: PRIMARY MESSAGING */}
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85] mb-8"
            >
              I build systems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-200 to-emerald-400">
                Then I make them scale.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 border-l border-white/10 pl-6"
            >
              Hi, I’m <span className="text-white font-medium">Mayur Pal</span> (@thissidemayur). 
              A developer who prefers a terminal over a GUI. Currently deep in 
              <span className="text-blue-400 italic"> Go routines</span>, 
              <span className="text-emerald-400 italic"> Docker containers</span>, and 
              full-stack architectures at LPU.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group relative px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300">
                <span className="flex items-center gap-2">
                  Review My Logs <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className="flex items-center gap-6 px-6 py-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase tracking-tight">Availability</span>
                  <span className="text-xs text-white/80 font-mono">Remote_Ready: True</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase tracking-tight">Location</span>
                  <span className="text-xs text-white/80 font-mono">PHAGWARA_IN</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: THE "ENGINE" VISUAL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl relative overflow-hidden group">
              {/* Decorative scanline effect */}
              <div className="absolute inset-0 bg-scanline opacity-[0.02] pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Terminal size={20} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-mono text-white/60">bash — 80x24</span>
                </div>

                <div className="font-mono text-[11px] space-y-2 leading-tight">
                  <p className="text-emerald-400">$ go run main.go</p>
                  <p className="text-white/40">{">"} Initializing core_engine...</p>
                  <p className="text-white/40">{">"} Connection: PostgreSQL_Live</p>
                  <p className="text-white/40">{">"} Cache: Redis_Active</p>
                  <p className="text-blue-400">{">"} System: Optimized_for_Scale</p>
                  <p className="text-emerald-400 animate-pulse underline">$ _</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <Cpu size={16} className="text-white/20" />
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
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