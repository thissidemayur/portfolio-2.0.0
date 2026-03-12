"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  Cloud,
  Terminal,
  Layers,
  Code,
  AlertCircle,
} from "lucide-react";

const CATEGORY_MAP: Record<string, { icon: React.ReactNode; color: string }> = {
  PROGRAMMING_LANGUAGES: {
    icon: <Cpu size={18} className="text-blue-400" />,
    color: "#3b82f6",
  },
  FRONTEND: {
    icon: <Layers size={18} className="text-purple-400" />,
    color: "#a855f7",
  },
  BACKEND: {
    icon: <Database size={18} className="text-emerald-400" />,
    color: "#10b981",
  },
  DB_ORM: {
    icon: <Database size={18} className="text-cyan-400" />,
    color: "#22d3ee",
  },
  "INFRASTRUCTURE(aws)": {
    icon: <Cloud size={18} className="text-orange-400" />,
    color: "#f97316",
  },
  DEVOPS: {
    icon: <Terminal size={18} className="text-pink-400" />,
    color: "#ec4899",
  },
  TOOLS: {
    icon: <Code size={18} className="text-gray-400" />,
    color: "#9ca3af",
  },
  default: {
    icon: <Code size={18} className="text-gray-400" />,
    color: "#ffffff",
  },
};

interface Skill {
  id: number;
  name: string;
  is_main_stack: boolean;
}

interface DBRow {
  category: string;
  skills: Skill[];
}

export default function StackArchitecture({ data }: { data: DBRow[] }) {
  if (!data || data.length === 0) {
    return (
      <section className="py-24 text-center border-t border-white/5">
        <div className="flex flex-col items-center gap-4 text-white/20">
          <AlertCircle size={40} />
          <p className="font-mono text-[10px] uppercase tracking-widest">
            Inventory_Empty: No_Tech_Found_In_DB
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
       
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
            TECH <span className="text-white/20">STACK</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => {
            const design = CATEGORY_MAP[item.category] || CATEGORY_MAP.default;

            const readableCategory = item.category
              .toLowerCase()
              .replace(/_/g, " ")
              .replace(/\((.*)\)/, (match, p1) => ` (${p1.toUpperCase()})`)
              .replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <motion.article
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/20 transition-all duration-500"
              >
                {/* CATEGORY LABEL */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                    style={{ color: design.color }}
                  >
                    {design.icon}
                  </div>
                  <h3 className="text-[11px] font-mono font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                    {readableCategory}
                  </h3>
                </div>

                {/* SKILLS LIST */}
                <ul className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <li
                      key={skill.id}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                        skill.is_main_stack
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                          : "bg-white/[0.02] border-white/5 text-white/30 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
