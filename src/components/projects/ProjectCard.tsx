"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ArrowUpRight, Terminal } from "lucide-react";
import { iProject } from "@/types/database";

export default function ProjectCard({ project }: { project: iProject }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative bg-[#0a0a0a] border border-white/5
                 rounded-[2.5rem] p-8 flex flex-col h-full
                 transition-all hover:border-blue-500/30
                 hover:-translate-y-[2px]"
    >
      <header className="flex justify-between items-start mb-8">
        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
          <Terminal size={24} className="text-blue-500" />
        </div>

        <a
          href={project.repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-white/5 rounded-xl text-white/20
                     hover:text-white hover:bg-white/10 transition-all"
        >
          <Github size={18} />
        </a>
      </header>

      <div className="space-y-3 mb-8">
        <span className="text-[9px] font-mono font-black text-blue-500 uppercase tracking-widest italic">
          Systems_Engineer // Verified_Build
        </span>

        <h3
          className="text-2xl font-black uppercase tracking-tighter italic
                       group-hover:text-blue-400 transition-colors"
        >
          {project.title}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {project.summary}
        </p>
      </div>

      <footer className="mt-auto">
        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2 mb-6">
          {project.tech_stack?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[8px] font-mono font-bold text-white/30
                         uppercase px-2 py-1 bg-white/5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center justify-center gap-2 w-full py-4
                     bg-white/5 border border-white/10 rounded-2xl
                     text-[10px] font-black uppercase tracking-widest
                     group-hover:bg-white group-hover:text-black transition-all"
        >
          Analyze Case Study <ArrowUpRight size={14} />
        </Link>
      </footer>
    </motion.article>
  );
}
