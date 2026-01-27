import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogFooter() {
  return (
    <footer className="relative z-50 mt-24 pb-12 space-y-12 pointer-events-auto">
      {/* AUTHOR BOX */}
      <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-24 h-24 rounded-full bg-blue-500/20 border border-blue-500/50 flex-shrink-0 overflow-hidden">
          <Image
            fill
            src="/mayur-photo.png"
            alt="Mayur Pal"
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-xl font-black uppercase italic tracking-tight">
            Written by Mayur Pal
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            Full-Stack & DevOps Engineer exploring the boundaries of cloud
            infrastructure and high-performance web apps.
          </p>

          <address className="not-italic flex justify-center md:justify-start gap-6 pt-4 text-white/40">
            <Link
              href="https://github.com/thissidemayur"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-all hover:scale-110 cursor-pointer"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://x.com/thissidemayur"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-all hover:scale-110 cursor-pointer"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/thissidemayur"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-all hover:scale-110 cursor-pointer"
            >
              <Linkedin size={20} />
            </Link>
          </address>
        </div>
      </div>

      {/* SYSTEM LOGO / COPYRIGHT */}
      <div className="flex justify-center items-center py-6 border-t border-white/5">
        <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
          &copy; 2026 Mayur_Pal // System_Ready // v1.0.4
        </p>
      </div>
    </footer>
  );
}
