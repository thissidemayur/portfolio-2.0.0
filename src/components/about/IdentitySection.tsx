"use client";

import Link from "next/link";
import Image from "next/image"; // Make sure to use Next.js Image component
import {
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Github,
  Linkedin,
  Printer,
  X,
  Mail,
} from "lucide-react";
import { techStack } from "@/lib/constant";

export default function IdentitySection() {
  const username = "thissidemayur";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-start">
      <header className="lg:col-span-7 space-y-8">
        <nav className="mb-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/40 hover:text-white text-[10px] font-mono uppercase tracking-[0.2em] transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK
          </Link>
        </nav>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter">
            Full-Stack <span className="text-blue-500">Engineer</span> <br />
            <span className="text-blue-500">& DevOps</span> Architect
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 border-r border-white/10 pr-4">
              <Terminal size={12} className="text-blue-500" />
              STATUS: PRE_FINAL_YEAR_ACTIVE
            </span>
            <span className="flex items-center gap-1.5 border-r border-white/10 pr-4 font-bold text-white/60">
              ID: 12303281
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-emerald-500" />
              LOCATION: INDIA//REMOTE
            </span>
          </div>
        </div>

        {/* REWRITTEN BIO: Holistic Engineering Focus */}
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-medium max-w-2xl">
          <p>
            I architect{" "}
            <span className="text-white font-bold">
              End-to-End Digital Systems
            </span>{" "}
            where performance meets scalability. From crafting pixel-perfect,
            SEO-optimized frontends to engineering high-concurrency backends in{" "}
            <span className="text-white">Node.js and Go</span>, I cover the full
            lifecycle of a product.
          </p>
          <p>
            My strength lies in{" "}
            <span className="text-blue-400">Infrastructure & Automation</span>
            —containerizing environments with Docker, managing AWS cloud
            resources, and ensuring seamless delivery through robust CI/CD
            pipelines.
          </p>
          <p className="text-base text-gray-500 italic border-l-2 border-blue-500/30 pl-6 leading-snug">
            &quot;I build systems that don&apos;t just function, but scale to
            solve real-world business challenges.&quot;
          </p>
        </div>

        <div className="flex flex-col gap-8 pt-4">
          <div className="flex flex-wrap gap-2 max-w-xl">
            {techStack.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/50 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href={`https://linkedin.com/in/${username}`}
                target="_blank"
                className="p-3 text-white/40 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`https://x.com/${username}`}
                target="_blank"
                className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <X size={18} />
              </a>
              <a
                href={`mailto:${username}@gmail.com`}
                className="p-3 text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all"
              >
                <Mail size={18} />
              </a>
            </div>

            <button
              onClick={() => window.print()}
              className="h-[52px] px-6 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center gap-3 group"
            >
              <Printer size={18} />
              <span className="text-[10px] font-mono uppercase font-black tracking-[0.2em]">
                SAVE_AS_PDF
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Card with Professional Photo */}
      <figure className="lg:col-span-5 relative justify-self-center lg:justify-self-end mt-12 lg:mt-0">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[3.5rem] blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>

          <div className="relative w-72 h-[500px] md:w-80 md:h-[550px] rounded-[3.5rem] border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col p-4 text-center">
            {/* Photo Container */}
            <div className="relative w-full h-72 rounded-[2.5rem] overflow-hidden mb-6 border border-white/5">
              <Image
                src="/mayur-pal.jpg" // Put your photo in /public/mayur-pal.jpg
                alt="Mayur Pal"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-2">
                INTERNAL_REGISTRY
              </h3>
              <p className="text-2xl font-black italic uppercase tracking-tighter">
                Mayur Pal
              </p>

              <div className="mt-8 pt-6 border-t border-white/5 w-full space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-white/20">SPECIALIZATION</span>
                  <span className="text-blue-400 font-bold">FULL_STACK</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-white/20">STATUS</span>
                  <span className="text-white/60">CLASS_OF_2027</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-white/20">AVAILABILITY</span>
                  <span className="text-emerald-400 font-black">
                    OPEN_FOR_ROLES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </section>
  );
}
