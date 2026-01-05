// src/components/home/Hero.tsx
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center px-4">
      {/* The Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <h2 className="text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-4">
          B.Tech CSE @ LPU // 3rd Year
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
          Building Resilient <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Systems at Scale.
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
          I bridge high-performance{" "}
          <span className="text-white font-semibold italic underline decoration-blue-500">
            Go
          </span>{" "}
          backends with vibrant{" "}
          <span className="text-white font-semibold italic underline decoration-emerald-500">
            Next.js
          </span>{" "}
          interfaces, automated via AWS & Docker.
        </p>
      </motion.div>

      {/* HUD Action Dock */}
      <div className="mt-12 flex gap-4 z-10">
        <button className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
          View My Systems
        </button>
        <button className="px-8 py-3 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
          Connect
        </button>
      </div>
    </section>
  );
}
