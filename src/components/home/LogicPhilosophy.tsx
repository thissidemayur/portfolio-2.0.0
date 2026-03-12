"use client";
import { motion } from "framer-motion";
import { Brain, Cpu, ShieldAlert, Terminal } from "lucide-react";
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
    icon: <ShieldAlert size={40} />,
    title: "RESILIENCE FIRST",
    body: "Software is easy in a lab; it's hard in production. I build for real-world chaos—handling failovers, cache misses, and high traffic.",
    color: "#3b82f6", // Blue
  },
  {
    icon: <Brain size={40} />,
    title: "HUMAN-AI SYNERGY",
    body: "I leverage AI to handle the syntax so I can focus on the system. Automation accelerates delivery without sacrificing architectural integrity.",
    color: "#10b981", // Emerald
  },
  {
    icon: <Cpu size={40} />,
    title: "SYSTEM ORCHESTRATION",
    body: "Full-stack development is the art of moving data securely. I treat infrastructure as code and backends as high-performance engines.",
    color: "#a855f7", // Purple
  },
];

export default function LogicPhilosophy() {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      {/* HEADER SECTION - MATCHED TO PROJECT/BLOG STYLE */}
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
         
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
            ENGINEERING <span className="text-white/40 italic">MINDSET</span>
          </h2>
        </div>
       
      </header>

      {/* CONTENT LAYOUT */}
      <div className="flex flex-col items-center gap-12">
        {/* PRINCIPLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {PRINCIPLES.map((principle, idx) => (
            <PrincipleCard key={idx} data={principle} index={idx} />
          ))}
        </div>

        {/* VISUAL BRIDGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full rounded-[3rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
        >
          <figure className="bg-[#0a0a0a]/50 backdrop-blur-3xl rounded-[3rem] h-[350px] md:h-[500px] relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:2rem_2rem]" />

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

function PrincipleCard({ data, index }: { data: Principle; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative p-10 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden group flex flex-col items-start h-full"
    >
      {/* Dynamic Glow Background */}
      <div
        className="absolute -top-24 -left-24 w-64 h-64 blur-[100px] opacity-[0.03] group-hover:opacity-[0.1] transition-opacity pointer-events-none"
        style={{ backgroundColor: data.color }}
      />

      {/* ICON */}
      <div
        className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-500"
        style={{ color: data.color }}
      >
        {data.icon}
      </div>

      <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase italic group-hover:text-[#00FF94] transition-colors">
        {data.title}
      </h3>

      <p className="text-white/40 leading-relaxed text-sm font-medium group-hover:text-white/60 transition-colors">
        {data.body}
      </p>

      {/* SYSTEM DECOR */}
      <div className="mt-8 flex items-center gap-2">
        <div className="h-[2px] w-8 bg-white/10 rounded-full group-hover:w-12 group-hover:bg-[#00FF94] transition-all duration-500" />
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
          Module_0{index + 1}
        </span>
      </div>
    </motion.article>
  );
}
