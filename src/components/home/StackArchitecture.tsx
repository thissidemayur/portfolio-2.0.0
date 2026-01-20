"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  Cloud,
  Terminal as TerminalIcon,
  Layers,
} from "lucide-react";

interface TechCategory {
  icon: React.ReactNode;
  tools: string[];
  color: string;
}

const TECH_STACK: Record<string, TechCategory> = {
  "Runtime & Languages": {
    icon: <Cpu size={20} className="text-blue-400" />,
    tools: ["Go", "Node.js", "Bun", "C", "C++", "Bash", "Linux"],
    color: "rgba(59, 130, 246, 0.5)",
  },
  "Frontend Architecture": {
    icon: <Layers size={20} className="text-purple-400" />,
    tools: [
      "Next.js",
      "React",
      "React-Hook-Form",
      "Zod",
      "Zustand",
      "TailwindCSS",
    ],
    color: "rgba(168, 85, 247, 0.5)",
  },
  "Data & State": {
    icon: <Database size={20} className="text-emerald-400" />,
    tools: ["MongoDB", "Redis", "PostgreSQL", "Socket.io"],
    color: "rgba(16, 185, 129, 0.5)",
  },
  "Infrastructure (AWS)": {
    icon: <Cloud size={20} className="text-orange-400" />,
    tools: ["EC2", "ECS", "ECR", "S3", "Route53", "Load Balancer", "IAM"],
    color: "rgba(249, 115, 22, 0.5)",
  },
  "Development Workflow": {
    icon: <TerminalIcon size={20} className="text-pink-400" />,
    tools: ["Docker", "Terraform", "GitHub Actions", "Postman"],
    color: "rgba(236, 72, 153, 0.5)",
  },
};

export default function StackArchitecture() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* HEADER: Inventory Title */}
      <header className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Tech Stack <span className="text-white/20">&</span> Systems
        </h2>
        <div className="flex items-center gap-4 justify-center">
          <div className="h-[1px] w-12 bg-blue-500/30" aria-hidden="true" />
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
            Engineering_Infrastructure_Inventory
          </p>
          <div className="h-[1px] w-12 bg-blue-500/30" aria-hidden="true" />
        </div>
      </header>

      {/* GRID: Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(TECH_STACK).map(([category, data], idx) => (
          <motion.article
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-white/20 shadow-2xl"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
              style={{ backgroundColor: data.color }}
              aria-hidden="true"
            />

            {/* Category Title & Icon */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {data.icon}
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic opacity-60 group-hover:opacity-100 transition-opacity">
                {category}
              </h3>
            </div>

            {/* Tools Collection */}
            <ul className="flex flex-wrap gap-2 relative z-10 scrollbar-hide">
              {data.tools.map((tool) => (
                <li
                  key={tool}
                  className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-xl text-[11px] font-bold text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  {tool}
                </li>
              ))}
            </ul>

            {/* Aesthetic Detail */}
            <footer className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
            </footer>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
