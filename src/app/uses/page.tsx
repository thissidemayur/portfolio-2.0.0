"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Laptop, 
  Code2, 
  Settings, 
  Globe, 
  Box,
} from "lucide-react";

const toolCategories = [
  {
    title: "Hardware",
    icon: <Laptop className="text-blue-500" />,
    items: [
      { name: "Dell G15", description: "Main workstation for development and virtualization." },
      { name: "Pure Setup", description: "Minimalist mobile workflow using only the laptop's keyboard and trackpad." }
    ]
  },
  {
    title: "Operating System",
    icon: <Settings className="text-emerald-500" />,
    items: [
      { name: "Fedora 42", description: "Primary and only OS. Rock-solid stability with the latest Linux kernels." },
      { name: "Ptyxis", description: "The default Fedora container-oriented terminal emulator." },
      { name: "Oh My Zsh", description: "Command line shell with custom plugins for faster git and directory navigation." }
    ]
  },
  {
    title: "Development Tools",
    icon: <Code2 className="text-purple-500" />,
    items: [
      { name: "VS Code", description: "Primary editor for large-scale Next.js and GoLang projects." },
      { name: "Vim", description: "The 'Go-To' for quick edits and configuration management." },
      { name: "Postman", description: "Standard utility for testing and documenting REST APIs." }
    ]
  },
  {
    title: "Infrastructure & Data",
    icon: <Box className="text-cyan-500" />,
    items: [
      { name: "Podman", description: "Rootless container engine (Fedora native alternative to Docker)." },
      { name: "Beekeeper Studio CE", description: "Clean, modern SQL editor for Postgres and MySQL." },
      { name: "DBeaver CE", description: "Universal database tool for complex data modeling." }
    ]
  },
  {
    title: "Browser & Notes",
    icon: <Globe className="text-orange-500" />,
    items: [
      { name: "Brave Browser", description: "Main driver for development and ad-free browsing." },
      { name: "Google Keep", description: "Capturing quick thoughts and raw architectural ideas." }
    ]
  }
];

export default function UsesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-8 pb-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-20 space-y-4">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">
            Tech <span className="text-white/20 font-normal">Stack</span>
          </h1>
          <p className="text-xs font-mono text-white/30 uppercase tracking-[0.4em] font-black">
            System_Inventory // Kernel: Fedora_42 // User: @thissidemayur
          </p>
        </header>

        {/* TOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {toolCategories.map((category, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="p-2 bg-white/5 rounded-lg">{category.icon}</div>
                <h2 className="text-xl font-black uppercase italic tracking-tight">{category.title}</h2>
              </div>

              <div className="space-y-6 pl-2">
                {category.items.map((item, j) => (
                  <div key={j} className="group">
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-500 transition-colors uppercase tracking-wider">
                      {item.name}
                    </h4>
                    <p className="text-xs text-white/40 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <footer className="mt-32 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] leading-loose">
            Last Updated: Jan 2026 // Setup is optimized for speed and system-level control.
          </p>
        </footer>
      </div>
    </div>
  );
}