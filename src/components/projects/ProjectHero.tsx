import { iProject } from "@/types/database";
import { Github, Globe } from "lucide-react";
import Image from "next/image";

export default function ProjectHero({ project }: { project: iProject }) {
  return (
    <header className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          {project.title}
          <span className="text-blue-500">.</span>
        </h1>

        <div className="flex gap-4">
          <a
            href={project.repo_url}
            target="_blank"
            className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all"
          >
            <Github size={16} /> Source_Code
          </a>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all"
            >
              <Globe size={16} /> Live_System
            </a>
          )}
        </div>
      </div>

      <div className="relative aspect-video w-full bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden group">
        <Image
          fill
          src={project.image_url}
          alt={project.title}
          className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
        />
      </div>
    </header>
  );
}
