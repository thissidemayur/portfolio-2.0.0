"use client";
import { motion } from "framer-motion";
import {
  User,
  Landmark,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import ServiceMatrix from "@/components/about/ServiceMatrix";
import { academicMilestones, techStack } from "@/lib/constant";



export default function AboutClient() {
  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 selection:bg-blue-500/30">
      {/* SECTION 1: IDENTITY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-center">
        <header className="lg:col-span-7 space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic">
              Full-Stack <span className="text-blue-500">& DevOps</span>{" "}
              Engineer
            </h1>
            <p className="flex items-center gap-3 text-[10px] font-mono text-white/40 uppercase tracking-[0.5em]">
              <GraduationCap size={16} className="text-blue-500" />
              UID: 12303281 // @thissidemayur
            </p>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            I am a professional Software Engineer based at{" "}
            <strong>Lovely Professional University</strong>...
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <figure className="lg:col-span-5 relative order-1 lg:order-2 justify-self-center">
          <div className="w-64 h-80 md:w-80 md:h-[450px] rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
            <User
              className="absolute inset-0 m-auto text-white/10"
              size={120}
            />
          </div>
          <figcaption className="absolute -bottom-6 -right-6 p-6 bg-[#0a0a0a] border border-white/10 rounded-[2rem]">
            <span className="block text-[10px] text-blue-500 font-black uppercase italic">
              Summer 2026 Ready
            </span>
            <span className="text-xs font-bold uppercase italic">
              LPU / 3rd Year
            </span>
          </figcaption>
        </figure>
      </section>

      {/* SECTION 2: SERVICES */}
      <ServiceMatrix />

      {/* SECTION 3: ACADEMIC JOURNEY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl w-fit text-blue-500">
            <Landmark size={24} />
          </div>
          <h2 className="text-3xl font-black uppercase italic">
            LPU <span className="text-blue-500 font-normal">Journey</span>
          </h2>
        </aside>

        <div className="lg:col-span-8 space-y-8 border-l border-white/5 ml-8 lg:ml-0">
          {academicMilestones.map((m, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative pl-12 group"
            >
              <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-black border-2 border-blue-500 z-10" />
              <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] group-hover:border-blue-500/20 transition-all">
                <header className="flex justify-between mb-4">
                  <span className="text-[10px] font-mono text-blue-500 font-black uppercase italic">
                    {m.semester}
                  </span>
                  <time className="text-[9px] font-bold text-white/20 uppercase">
                    Aug 2023 - Present
                  </time>
                </header>
                <h3 className="text-xl font-bold uppercase italic mb-2">
                  {m.focus}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{m.details}</p>
                <footer className="text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-blue-500" />{" "}
                  Engineering_Verified
                </footer>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="p-12 md:p-20 bg-white/[0.02] border border-white/5 rounded-[3.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/10 blur-[120px] -z-10" />
        <h2 className="text-4xl font-black uppercase italic mb-8">
          Professional Cooperation
        </h2>
        <button className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all inline-flex items-center gap-2">
          Initiate Contact <ChevronRight size={16} />
        </button>
      </section>
    </div>
  );
}
