"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Zap, ArrowUpRight, Terminal } from "lucide-react";
import { iProject } from "@/types/database";

export default function ProjectList({
  initialProjects,
}: {
  initialProjects: iProject[];
}) {
 
  return (
    <section>
      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {initialProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all flex flex-col h-full overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <header className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                    {/* Placeholder for an icon, or use a generic Terminal icon */}
                    <Terminal size={24} className="text-blue-500" />
                  </div>
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 rounded-xl text-white/20 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Github size={18} />
                  </a>
                </header>

                <div className="space-y-3 mb-8">
                  <span className="text-[9px] font-mono font-black text-blue-500 uppercase tracking-widest italic">
                    Systems_Engineer // Verified_Build
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <footer className="mt-auto">
                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2 mb-6">
                    {/* Assuming tech_stack is an array from your DB */}
                    {project.tech_stack?.slice(0, 3).map((t: string) => (
                      <span
                        key={t}
                        className="text-[8px] font-mono font-bold text-white/30 uppercase px-2 py-1 bg-white/5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech_stack?.length > 3 && (
                      <span className="text-[8px] font-mono font-bold text-white/20 uppercase px-2 py-1">
                        +{project.tech_stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Changed from id to slug for SEO-friendly URLs */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all"
                  >
                    Analyze Case Study <ArrowUpRight size={14} />
                  </Link>
                </footer>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* FOOTER CTA */}
      <footer className="mt-32 text-center p-12 md:p-20 bg-white/[0.02] border border-white/5 rounded-[4rem]">
        <h2 className="text-3xl font-black uppercase italic mb-6">
          Ready to scale?
        </h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-10 max-w-md mx-auto leading-relaxed">
          I am actively seeking internship and junior engineering roles for
          2026. Let&lsquo;s discuss how my tech stack can support your team.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all"
        >
          Initiate Conversation <Zap size={16} />
        </Link>
      </footer>
    </section>
  );
}
