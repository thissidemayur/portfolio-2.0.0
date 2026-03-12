"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, Brain, Code2, Rocket, RefreshCcw } from "lucide-react";

const STAGES = [
  {
    id: "INPUT",
    label: "Client Problem",
    icon: <Search size={14} />,
    desc: "Initial Contact & Audit",
  },
  {
    id: "RESEARCH",
    label: "AI + Human Research",
    icon: <Brain size={14} />,
    desc: "Strategy & Feasibility",
  },
  {
    id: "ENGINEER",
    label: "Development",
    icon: <Code2 size={14} />,
    desc: "AI-Augmented Build",
  },
  {
    id: "OUTPUT",
    label: "Project Delivery",
    icon: <Rocket size={14} />,
    desc: "Solution Deployment",
  },
  {
    id: "INTEGRATE",
    label: "Integration",
    icon: <RefreshCcw size={14} />,
    desc: "Service Expansion",
  },
];

export default function SystemBridge() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-20 bg-[#070707]/50">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

      <div className="relative w-full max-w-5xl">
        {/* The Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />

        {/* Animated Progress Line */}
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent -translate-y-1/2"
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          {STAGES.map((stage, idx) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex flex-col items-center group cursor-default"
            >
              {/* Node Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#00FF94]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-14 w-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#00FF94] group-hover:border-[#00FF94]/30 transition-all duration-500">
                  {stage.icon}
                </div>

                {/* Connector Dot */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 mt-[43px]">
                  <div className="h-2 w-2 rounded-full bg-[#0a0a0a] border border-white/20 group-hover:border-[#00FF94] transition-colors" />
                </div>
              </div>

              {/* Text Label */}
              <div className="text-center">
                <h4 className="text-[10px] font-mono font-black text-white/80 uppercase tracking-widest mb-1 group-hover:text-[#00FF94] transition-colors">
                  {stage.label}
                </h4>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">
                  {stage.desc}
                </p>
              </div>

              {/* Status "Ping" for current stage effect */}
              {idx === 2 && (
                <div className="absolute -top-4 px-2 py-0.5 rounded-md bg-[#00FF94]/10 border border-[#00FF94]/20">
                  <span className="text-[7px] font-mono text-[#00FF94] uppercase animate-pulse">
                    Processing_v2.0
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Narrative Legend */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 border-t border-white/5 pt-10">
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 bg-[#00FF94] rounded-full" />
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
            AI Intelligence
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 bg-white/40 rounded-full" />
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
            Human Supervision
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-8">
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest italic">
            * Support for 2 Revision Cycles Included
          </span>
        </div>
      </div>
    </div>
  );
}
