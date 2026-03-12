"use client";
import{ useState, useMemo } from "react";
import {GitHubCalendar} from "react-github-calendar";
import {
  Activity,
  GitCommit,
  CheckCircle2,
  History,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export function GithubSection() {
  // Focus on recent active years to ensure a full, impressive grid
  const YEARS = useMemo(() => [2026, 2025], []);
  const [selectedYear, setSelectedYear] = useState(YEARS[0]);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col gap-12">
        {/* HEADER SECTION: Balanced for Clients & Engineers */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
          
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
              BUILD <span className="text-white/20 not-italic">HISTORY</span>
            </h2>
            <p className="text-white/40 max-w-md text-sm font-medium leading-relaxed border-l border-[#00FF94]/20 pl-4 tracking-tight">
              A transparent look at my daily development activity. This map
              tracks when I design, code, and ship updates to my open-source and
              private systems.
            </p>
          </div>

          {/* YEAR SELECTOR: Professional Minimalist Style */}
          <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/5 p-1.5 rounded-2xl">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300 ${
                  selectedYear === year
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    : "text-white/30 hover:text-white hover:bg-white/5"
                }`}
              >
                {year} ACTIVITY
              </button>
            ))}
          </div>
        </header>

        {/* CALENDAR CARD */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group transition-all duration-500 hover:border-white/10 shadow-2xl"
        >
          {/* THE "CLICKABLE" ACTION BAR */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#00FF94]/5 border border-[#00FF94]/10 group-hover:border-[#00FF94]/40 transition-colors duration-500">
                <GitCommit size={20} className="text-[#00FF94]" />
              </div>
              <div>
                <span className="block text-sm font-bold text-white tracking-tight">
                  github.com/thissidemayur
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]"></span>
                  </span>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">
                    Live_Repository_Sync...
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/thissidemayur"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF94] transition-all duration-300 shadow-xl"
            >
              <span>Inspect Source Code</span>
              <ExternalLink
                size={14}
                className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
              />
            </a>
          </div>

          {/* THE CALENDAR GRID */}
          <figure className="flex justify-center overflow-x-auto pb-6 scrollbar-hide grayscale hover:grayscale-0 transition-all duration-700">
            <GitHubCalendar
              username="thissidemayur"
              year={selectedYear}
              blockSize={13}
              blockMargin={5}
              fontSize={14}
              theme={{
                light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
          </figure>

          {/* FOOTER METRICS: Narrative Style */}
          <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-12 items-center justify-between">
            <div className="flex gap-12">
              <div className="space-y-2">
                <span className="block text-[9px] font-mono text-white/20 uppercase tracking-widest">
                  Shipping Discipline
                </span>
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-[#00FF94]" />
                  <span className="text-xs font-bold text-white uppercase italic tracking-wide">
                    Daily Consistency
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="block text-[9px] font-mono text-white/20 uppercase tracking-widest">
                  Total Contributions
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#00FF94]" />
                  <span className="text-xs font-bold text-white uppercase italic tracking-wide">
                    1,240+ Global Commits
                  </span>
                </div>
              </div>
            </div>

            {/* KEY INDICATOR */}
            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] text-white/20 uppercase font-mono tracking-widest">
                Activity_Density
              </span>
              <div className="flex gap-1.5">
                {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map(
                  (color) => (
                    <div
                      key={color}
                      className="w-3 h-3 rounded-[2px]"
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
            </div>
          </footer>

          {/* SUBTLE DECORATIVE GLOW */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF94]/5 blur-[100px] pointer-events-none rounded-full" />
        </motion.article>
      </div>
    </section>
  );
}
