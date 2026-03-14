import { iProject } from "@/types/database";
import { Github, Globe, Terminal, Cpu } from "lucide-react";
import Image from "next/image";

export default function ProjectHero({ project }: { project: iProject }) {
  const src = project?.image_url || "/placeholder-sword.webp";

  return (
    <header className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-4xl">
          {/* Reduced Title Size for better UX */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
            {project.title}
            <span className="text-blue-600">.</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 pb-2">
          <a
            href={project.repo_url}
            target="_blank"
            className="flex items-center gap-3 px-6 py-3.5 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg shadow-white/5"
          >
            <Github size={14} /> GitHub Repository
          </a>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              className="flex items-center gap-3 px-6 py-3.5 bg-[#111] border border-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:border-blue-500/50 transition-all duration-300"
            >
              <Globe size={14} /> View Live Project
            </a>
          )}
        </div>
        {/* Decorative Corner Element - Professionalized */}
        <div className="absolute bottom-6 right-8 hidden md:block">
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
            Deployment: Production Ready
          </span>
        </div>
      </div>

      {/* Visual Container */}
      <div className="relative aspect-[21/9] w-full bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden group shadow-2xl">
        <Image
          fill
          priority
          src={src}
          alt={project.title}
          className="object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          sizes="100vw"
          unoptimized={true}
        />
        {/* Subtle Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

        {/* Decorative Corner Element */}
        <div className="absolute bottom-6 right-8 hidden md:block">
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
            Status: Fully_Operational
          </span>
        </div>
      </div>
    </header>
  );
}
