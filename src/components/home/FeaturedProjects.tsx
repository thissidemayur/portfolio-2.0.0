import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Globe,
  Box,
  Terminal,
  MoveRight,
} from "lucide-react";
import { MOCK_PROJECTS } from "@/lib/constant";

export default function FeaturedProjects() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 ">
      <div className="max-w-7xl mx-auto">
        {/* Header matched to the Engineering Aesthetic */}
        <header className="mb-20 space-y-2">
          <div className="flex items-center gap-2 text-[#00FF94] font-mono text-[10px] tracking-[0.4em] uppercase opacity-70">
            <Terminal size={12} />
            <span>Deployment_Archive_v1.0.2</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
            FEATURED <span className="text-white/10 italic">BUILDS</span>
          </h2>
          <p className="text-white/40 max-w-sm text-sm font-medium leading-relaxed">
            Production-ready applications and distributed systems engineered for
            performance.
          </p>
        </header>

        {/* Dynamic Bento Grid (Matches Blog logic: 1st/4th are Large) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {MOCK_PROJECTS.slice(0, 4).map((project, index) => {
            const isLarge = index % 4 === 0 || index % 4 === 3;

            return (
              <article
                key={project.id}
                className={`group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col justify-between transition-all duration-700 ease-in-out hover:bg-[#111111] hover:border-[#00FF94]/20 ${
                  isLarge ? "md:col-span-8 min-h-[480px]" : "md:col-span-4"
                }`}
              >
                {/* Visual Content: Image / Tech Stack */}
                <div className="p-8 md:p-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-widest group-hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#00FF94] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                      <Box size={10} />
                      STABLE_BUILD
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3
                      className={`${isLarge ? "text-4xl md:text-6xl" : "text-2xl"} font-bold tracking-tight leading-[1.1] group-hover:text-white transition-colors`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-2xl group-hover:text-white/50 transition-colors">
                      {project.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <footer className="px-8 md:px-10 pb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-8">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white/20 hover:text-white transition-colors"
                    >
                      <Github size={14} className="text-[#00FF94]" />
                      SOURCE_CODE
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white/20 hover:text-white transition-colors"
                    >
                      <Globe size={14} className="text-[#00FF94]" />
                      LIVE_SYNC
                    </Link>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-white/50 group-hover:bg-[#00FF94] group-hover:text-black transition-all duration-500"
                  >
                    <span>VIEW_CASE_STUDY</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </footer>

                {/* Aesthetic Hover Glow */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-[#00FF94]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </article>
            );
          })}
        </div>

        {/* View All Footer */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent mb-8" />
          <Link
            href="/projects"
            className="group flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-white/30 hover:text-[#00FF94] transition-all"
          >
            ACCESS_FULL_PORTFOLIO
            <MoveRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
