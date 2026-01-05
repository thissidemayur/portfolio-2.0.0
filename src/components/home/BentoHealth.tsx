// src/components/home/BentoHealth.tsx
"use client";
import { motion } from "framer-motion";

export default function BentoHealth() {
  return (
    <div className="group relative p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-white font-bold text-sm">System Health</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">
            Real-time Metrics
          </p>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      </div>

      <div className="flex items-end gap-1 h-20">
        {[40, 70, 45, 90, 65, 80, 50, 95, 100, 85].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex-1 bg-gradient-to-t from-blue-500 to-emerald-400 opacity-50"
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-[9px] uppercase tracking-tighter">
        <div>
          <span className="text-white/30">Latency:</span> 24ms
        </div>
        <div>
          <span className="text-white/30">Uptime:</span> 99.9%
        </div>
      </div>
    </div>
  );
}
