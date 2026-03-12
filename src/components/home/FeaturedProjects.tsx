import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Globe,
  Terminal,
  MoveRight,
  ShieldCheck,
} from "lucide-react";
import { getAllPublicProjects } from "@/dal/projects.dal";

export default async function FeaturedProjects() {
  const projects = await getAllPublicProjects();

  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
              SELECTED{" "}
              <span className="text-white/40 not-italic">Projects</span>
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.slice(0, 4).map((project: any, index: number) => {
            const isLarge = index % 4 === 0 || index % 4 === 3;

            return (
              <article
                key={project.id}
                className={`group relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-[#00FF94]/30 ${
                  isLarge
                    ? "md:col-span-8 min-h-[500px]"
                    : "md:col-span-4 min-h-[450px]"
                }`}
              >
                {/* TOP BAR */}
                <div className="p-8 pb-0 flex justify-between items-start z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono text-white/40 uppercase tracking-[0.2em]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#00FF94] uppercase tracking-tighter opacity-70">
                      <ShieldCheck size={10} />
                      {project.is_featured ? "CRITICAL_SYSTEM" : "STABLE_BUILD"}
                    </span>
                  </div>
                </div>

                {/* CONTENT AREA: FIXED TYPOGRAPHY */}
                <div className="p-8 md:p-10 flex-grow flex flex-col justify-center">
                  <Link href={`/projects/${project.slug}`}>
                  <h3
                    className={`${
                      isLarge ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                    } font-black tracking-tight leading-[1.1] text-white mb-6 group-hover:text-[#00FF94] transition-colors duration-500 uppercase italic`}
                  >
                    {project.title}
                  </h3>
                  </Link>
                  <Link href={`/projects/${project.slug}`}>
                  <p
                    className={`text-white/40 leading-relaxed font-medium ${isLarge ? "max-w-xl text-base" : "text-xs"} group-hover:text-white/70 transition-colors line-clamp-3`}
                  >
                    {project.summary}
                  </p>
                  </Link>
                </div>

                {/* FOOTER */}
                <footer className="p-8 md:p-10 pt-0 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    {project.repo_url && (
                      <Link
                        href={project.repo_url}
                        target="_blank"
                        className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-[#00FF94] transition-all border border-white/5 hover:border-[#00FF94]/20"
                      >
                        <Github size={18} />
                      </Link>
                    )}
                    {project.live_url && (
                      <Link
                        href={project.live_url}
                        target="_blank"
                        className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-[#00FF94] transition-all border border-white/5 hover:border-[#00FF94]/20"
                      >
                        <Globe size={18} />
                      </Link>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-mono font-black tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#00FF94] hover:text-black hover:scale-[1.02]"
                  >
                    VIEW_CASE_STUDY
                    <ArrowUpRight size={14} />
                  </Link>
                </footer>

                {/* BACKGROUND DECOR */}
                {isLarge && (
                  <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none rotate-12">
                    <Terminal size={320} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* VIEW ALL */}
        <div className="mt-24 flex justify-center">
          <Link
            href="/projects"
            className="group relative px-12 py-6 overflow-hidden rounded-2xl border border-white/10 transition-all"
          >
            <div className="absolute inset-0 bg-[#00FF94]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative flex items-center gap-4 text-[10px] font-black tracking-[0.5em] text-white/50 group-hover:text-white">
              EXPLORE ALL Projects
              <MoveRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
