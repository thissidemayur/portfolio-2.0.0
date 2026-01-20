"use client";
import { motion } from "framer-motion";
import { Brain, Cpu, ShieldAlert } from "lucide-react";
import SystemBridge from "./titles/SystemBridge";
import React from "react";

interface Principle {
  icon: React.ReactNode;
  title: string;
  body: string;
  color: string;
}

const PRINCIPLES: Principle[] = [
  {
    icon: <ShieldAlert className="text-blue-500" size={48} />,
    title: "RESILIENCE FIRST",
    body: "Software is easy in a lab; it's hard in production. I build for real-world chaos—handling failovers, cache misses, and high traffic.",
    color: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: <Brain className="text-emerald-500" size={48} />,
    title: "HUMAN-AI SYNERGY",
    body: "I leverage AI to handle the syntax so I can focus on the system. Automation accelerates my delivery without sacrificing quality.",
    color: "rgba(16, 185, 129, 0.5)",
  },
  {
    icon: <Cpu className="text-purple-500" size={48} />,
    title: "ORCHESTRATION LOGIC",
    body: "Full-stack development is the art of moving data securely. I treat infrastructure as code and backends as high-performance engines.",
    color: "rgba(168, 85, 247, 0.5)",
  },
];

export default function LogicPhilosophy() {
  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* HEADER SECTION */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
          Engineering Philosophy
        </h2>
        <p className="text-blue-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">
          {">"} Decoding_The_Minds_Architecture
        </p>
      </motion.header>

      {/* CONTENT LAYOUT */}
      <div className="flex flex-col items-center">
        {/* PRINCIPLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {PRINCIPLES.map((principle, idx) => (
            <PrincipleCard key={idx} data={principle} />
          ))}
        </div>

        {/* VISUAL BRIDGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-[75%] rounded-[3rem] p-[1px] bg-gradient-to-b from-white/20 to-transparent shadow-3xl overflow-hidden"
        >
          <figure className="bg-[#050505] rounded-[3rem] h-[350px] md:h-[400px]">
            <SystemBridge />
            <figcaption className="sr-only">
              Interactive visualization of system bridge architecture
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

// 2. WHY: Functional Sub-component
// BENEFIT: Cleaner main component and easier testing.
function PrincipleCard({ data }: { data: Principle }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="relative p-8 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden group text-center flex flex-col items-center h-full justify-center"
    >
      {/* Decorative Glow */}
      <div
        className="absolute -top-24 -left-24 w-64 h-64 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ backgroundColor: data.color }}
        aria-hidden="true"
      />

      {/* ICON WRAPPER */}
      <div className="mb-6 relative">
        <div
          className="absolute inset-0 blur-2xl opacity-20"
          style={{ color: data.color }}
          aria-hidden="true"
        >
          {data.icon}
        </div>
        <div className="relative z-10 transition-transform group-hover:scale-110 duration-500">
          {data.icon}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase">
        {data.title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-xs font-medium max-w-[240px] mx-auto">
        {data.body}
      </p>

      {/* DECORATIVE FOOTER */}
      <footer className="absolute bottom-4 right-6 opacity-10 group-hover:opacity-100 transition-opacity">
        <div className="h-[1px] w-6 bg-blue-500 rounded-full" />
      </footer>
    </motion.article>
  );
}
