import React from "react";
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogFooter() {
  return (
    <footer className="mt-24 pb-12 space-y-12">
      {/* AUTHOR BOX */}
      <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-blue-500/20 border border-blue-500/50 flex-shrink-0 overflow-hidden">
          <Image
            fill
            src="/mayur-photo.png"
            alt="Mayur Pal"
            className="w-full h-full object-cover"
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

          <address className="not-italic flex justify-center md:justify-start gap-4 pt-4 text-white/40">
            <Link
              href="https://github.com/thissidemayur"
              className="hover:text-blue-500 transition-colors"
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://twitter.com/thissidemayur"
              className="hover:text-blue-500 transition-colors"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="https://linkedin.com/in/thissidemayur"
              className="hover:text-blue-500 transition-colors"
            >
              <Linkedin size={18} />
            </Link>
          </address>
        </div>
      </div>

      {/* NAVIGATION CTA */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <Link
          href="/blogs"
          className="group flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] hover:text-white transition-colors"
        >
          <ArrowRight size={14} className="rotate-180 text-blue-500" />{" "}
          Back_To_Logs
        </Link>
        <p className="text-[9px] font-mono text-white/10 uppercase tracking-widest">
          &copy; 2026 Mayur_Pal // System_Ready
        </p>
      </div>
    </footer>
  );
}
