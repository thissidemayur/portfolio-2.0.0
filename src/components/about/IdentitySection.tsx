// app/about/IdentitySection.tsx
import Link from "next/link";
import { ArrowLeft, GraduationCap, User } from "lucide-react";
import { techStack } from "@/lib/constant";

export default function IdentitySection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-center">
      <header className="lg:col-span-7 space-y-8">
        <nav>
          <Link
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-white text-[10px] font-mono uppercase"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        </nav>

        <h1 className="text-6xl font-black uppercase italic">
          Full-Stack <span className="text-blue-500">& DevOps</span> Engineer
        </h1>

        <p className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
          <GraduationCap size={14} className="text-blue-500" />
          UID: 12303281
        </p>

        <p className="text-gray-400 text-lg font-medium">
          Professional Software Engineer focused on performance-first systems.
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold uppercase text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <figure className="lg:col-span-5 justify-self-center relative">
        <div className="w-72 h-[420px] rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
          <User size={120} className="text-white/10" />
        </div>
      </figure>
    </section>
  );
}
