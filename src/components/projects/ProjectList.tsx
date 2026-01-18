"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Zap, ArrowUpRight } from "lucide-react";
import { IProject } from "@/lib/constant";

export default function ProjectList({ initialProjects }: { initialProjects: IProject[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Systems", "SaaS", "Full-Stack"];

  const filtered =
    activeTab === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeTab);

  return (
    <section>
      {/* FILTER TABS */}
      <nav className="flex flex-wrap gap-2 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
              activeTab === cat
                ? "bg-white text-black border-white"
                : "bg-white/5 text-white/40 border-white/5 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all flex flex-col h-full overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <header className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <a
                    href={project.githubLink}
                    className="p-2.5 bg-white/5 rounded-xl text-white/20 hover:text-white transition-all"
                  >
                    <Github size={18} />
                  </a>
                </header>

                <div className="space-y-3 mb-8">
                  <span className="text-[9px] font-mono font-black text-blue-500 uppercase tracking-widest italic">
                    {project.category}
                    {" // "}Verified_Code
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {project.desc}
                  </p>
                </div>

                <footer className="mt-auto">
                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t: string) => (
                      <span
                        key={t}
                        className="text-[8px] font-mono font-bold text-white/30 uppercase px-2 py-1 bg-white/5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all"
                  >
                    View Case Study <ArrowUpRight size={14} />
                  </Link>
                </footer>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* SIMPLE FOOTER CTA */}
      <footer className="mt-32 text-center p-12 md:p-20 bg-white/[0.02] border border-white/5 rounded-[4rem]">
        <h2 className="text-3xl font-black uppercase italic mb-6">
          Work Together?
        </h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-10">
          I am available for freelance and internship opportunities.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
        >
          Initiate Conversation <Zap size={16} />
        </Link>
      </footer>
    </section>
  );
}
