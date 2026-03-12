"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ArrowUpRight,  Box } from "lucide-react";
import { iProject } from "@/types/database";

export default function ProjectCard({ project }: { project: iProject }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative bg-[#0a0a0a] border border-white/5
                 rounded-[2.5rem] p-8 flex flex-col h-full
                 transition-all hover:border-blue-500/30
                 hover:shadow-[0_0_40px_rgba(59,130,246,0.05)]"
    >
      <header className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-mono text-blue-500/60 uppercase tracking-tighter">
            <Box size={10} />
            Node_Ref: {project.slug.split("-")[0]}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 w-fit">
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-mono text-emerald-500/80 uppercase">
              Build_Stable
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 rounded-xl text-white/20
                       hover:text-blue-400 hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/20"
          >
            <Github size={18} />
          </a>
        </div>
      </header>

      {/* BODY: DESCRIPTION */}
      <div className="space-y-4 mb-8">
        <h3
          className="text-3xl font-black uppercase tracking-tighter italic
                       group-hover:text-blue-400 transition-colors leading-none"
        >
          {project.title}
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 font-medium">
          {project.summary}
        </p>
      </div>

      {/* FOOTER: TECH & CTA */}
      <footer className="mt-auto space-y-6">
        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {project.tech_stack?.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono font-bold text-white/30
                         uppercase px-2.5 py-1 bg-white/5 rounded-lg border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="group/btn flex items-center justify-between px-6 py-4
                     bg-white/5 border border-white/10 rounded-2xl
                     text-[11px] font-black uppercase tracking-[0.2em]
                     group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"
        >
          <span>Analyze Case Study</span>
          <ArrowUpRight
            size={16}
            className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
          />
        </Link>
      </footer>
    </motion.article>
  );
}
