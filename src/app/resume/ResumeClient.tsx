"use client";
import React from "react";
import { Printer, Mail, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { academicMilestones } from "@/lib/constant";

const skills = [
  {
    category: "Systems & Backend",
    items: ["Golang", "TypeScript", "C++", "C", "Bash"],
  },
  {
    category: "Web Technologies",
    items: ["Next.js 15", "React", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Docker", "Terraform", "Linux", "CI/CD"],
  },
];

export default function ResumeClient() {
  const handlePrint = () => window.print();

  return (
    <div className="py-20 px-6 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        {/* ACTIONS BAR (Hidden on Print) */}
        <header className="flex justify-between items-center mb-12 no-print">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              System_Status: Active
            </span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
          >
            <Printer size={14} /> Download PDF
          </button>
        </header>

        {/* RESUME SHEET */}
        <article className="bg-[#0e0e0e] border border-white/5 p-10 md:p-16 rounded-[2.5rem] shadow-2xl print:bg-white print:text-black print:p-0 print:border-none">
          {/* HEADER SECTION */}
          <section className="border-b border-white/5 pb-10 mb-10 print:border-black/10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic print:text-black">
                  Mayur Pal
                </h1>
                <p className="text-blue-500 font-mono text-sm font-black uppercase tracking-[0.2em]">
                  Full-Stack & DevOps Engineer
                </p>
              </div>
              <address className="not-italic grid grid-cols-1 gap-2 text-[11px] font-medium text-white/40 print:text-black/60">
                <span className="flex items-center gap-2">
                  <Mail size={12} className="text-blue-500" />{" "}
                  thissidemayur@gmail.com
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={12} className="text-blue-500" /> LPU, Punjab,
                  India
                </span>
                <span className="flex items-center gap-2">
                  <Globe size={12} className="text-blue-500" /> thissidemayur.me
                </span>
              </address>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* SIDEBAR */}
            <aside className="space-y-12">
              <section>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6 print:text-black/40">
                  Technical_Stack
                </h3>
                <div className="space-y-6">
                  {skills.map((s) => (
                    <div key={s.category}>
                      <h4 className="text-[10px] font-bold text-blue-500 uppercase mb-2">
                        {s.category}
                      </h4>
                      <p className="text-sm text-white/70 print:text-black/80">
                        {s.items.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6 print:text-black/40">
                  Connect
                </h3>
                <nav className="flex flex-col gap-3 text-xs font-bold uppercase">
                  <a
                    href="https://github.com/thissidemayur"
                    className="flex items-center gap-2 hover:text-blue-500 print:text-black"
                  >
                    <Github size={14} /> github.com/thissidemayur
                  </a>
                  <a
                    href="https://linkedin.com/in/thissidemayur"
                    className="flex items-center gap-2 hover:text-blue-500 print:text-black"
                  >
                    <Linkedin size={14} /> linkedin.com/in/thissidemayur
                  </a>
                </nav>
              </section>
            </aside>

            {/* MAIN CONTENT */}
            <div className="md:col-span-2 space-y-12">
              <section>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-8 print:text-black/40">
                  Professional_Experience
                </h3>
                <div className="space-y-10">
                  <div className="relative pl-8 border-l border-white/5 print:border-black/10">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-blue-500" />
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black uppercase italic tracking-tight">
                        Full-Stack Freelance
                      </h4>
                      <time className="text-[10px] font-mono text-white/30 print:text-black/40">
                        2024 — PRESENT
                      </time>
                    </div>
                    <p className="text-xs text-white/50 mb-4 italic print:text-black/60">
                      Architecting scalable SaaS solutions and cloud-native
                      automation tools.
                    </p>
                    <ul className="text-xs text-white/40 space-y-2 list-disc ml-4 print:text-black/70">
                      <li>
                        Optimized Next.js 15 delivery pipelines, reducing
                        deployment latency by 25%.
                      </li>
                      <li>
                        Built custom GoLang CLI tools for cross-platform system
                        management.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-8 print:text-black/40">
                  Education_History
                </h3>
                <div className="space-y-8">
                  {academicMilestones.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-black uppercase italic tracking-tight print:text-black">
                          {m.focus}
                        </h4>
                        <p className="text-[10px] text-white/30 print:text-black/50 uppercase">
                          Lovely Professional University
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-blue-500/50 uppercase">
                        {m.semester.split(" ")[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-white/5 text-center print:border-black/10">
            <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.5em] print:text-black/30">
              Authenticated_Resume // Build_Ver: 12.0.4
            </p>
          </footer>
        </article>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            padding: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}
