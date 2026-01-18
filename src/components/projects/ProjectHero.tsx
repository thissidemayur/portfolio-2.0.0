"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Terminal, Github, Globe } from "lucide-react";
import { IProject } from "@/lib/constant";

export default function ProjectHero({ project }: { project: IProject }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = project.screenshots || [];

  return (
    <header className="space-y-12 mb-20">
      <div className="space-y-6">
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
          {project.title}
          <span className="text-blue-500">.</span>
        </h1>
        <p className="text-xl text-gray-400 font-medium italic max-w-3xl leading-relaxed">
          &quot;{project.tagline}&quot;
        </p>
      </div>

      {/* INTERACTIVE GALLERY */}
      <div className="relative aspect-video w-full bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden group">
        {images.length > 0 ? (
          <Image
            fill
            src={images[activeImg]}
            alt="Project Screenshot"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/10">
            <Terminal size={48} />
            <span className="mt-4 text-[10px] font-mono uppercase tracking-widest">
              Preview_Not_Found // View_Source
            </span>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="absolute bottom-8 left-8 flex gap-4">
          <a
            href={project.githubLink}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all"
          >
            <Github size={16} /> Repository
          </a>
          <a
            href={project.liveDemoLink}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all"
          >
            <Globe size={16} /> Live_Demo
          </a>
        </div>
      </div>
    </header>
  );
}
