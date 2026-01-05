// src/components/layout/SystemShell.tsx
"use client";
import { motion } from "framer-motion";
import React from "react";

export default function SystemShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-500/30 font-mono overflow-x-hidden">
      {/* HUD: Top Status Bar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md px-6 py-3 flex justify-between items-center text-[10px] uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="text-blue-500 font-bold">Mayur Pal // Dev_OS</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-white/40">Status: <span className="text-green-500 text-animate-pulse">Live_Ready</span></span>
        </div>
        <div className="flex gap-6">
          <span>Loc: Jalandhar, IN</span>
          <span>v1.0.4</span>
        </div>
      </header>

      {/* HUD: Right Sidebar (The Stack Log) */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-8 text-[10px] text-white/20 vertical-text border-r border-white/5 pr-4">
        <span>MERN_STACK</span>
        <span>GOLANG_BACKEND</span>
        <span>AWS_INFRA</span>
        <span>DOCKER_CONTAINERIZED</span>
      </aside>

      <main className="pt-16">{children}</main>

      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}