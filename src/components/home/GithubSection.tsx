"use client";
import React, { useState, useMemo } from "react";
import {GitHubCalendar} from "react-github-calendar"; // Note: removed curly braces if default export
import { Calendar, Activity } from "lucide-react";

export function GithubSection() {
  // 1. WHY: useMemo for Constants
  // BENEFIT: Prevents the array from being re-created on every render.
  const YEARS = useMemo(() => [2026, 2025, 2024], []);

  const [selectedYear, setSelectedYear] = useState(YEARS[0]);

  return (
    <section
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="github-activity-title"
    >
      <div className="flex flex-col gap-8">
        {/* HEADER & SELECTOR SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2
              id="github-activity-title"
              className="text-3xl font-bold text-white mb-2 tracking-tight"
            >
              Open Source Contribution
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Proof of consistent shipping. I maintain a daily rhythm to ensure
              system reliability and feature growth across my GitHub
              repositories.
            </p>
          </div>

          {/* THE YEAR SELECTOR (Modernized) */}
          <nav className="flex items-center gap-3 self-center md:self-end bg-[#0a0a0a] border border-white/10 px-4 py-2 rounded-xl group hover:border-green-500/50 transition-all shadow-lg">
            <Calendar size={16} className="text-green-500" aria-hidden="true" />
            <label htmlFor="year-select" className="sr-only">
              Select Contribution Year
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-white text-sm font-bold outline-none cursor-pointer pr-2 appearance-none"
            >
              {YEARS.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="bg-[#0a0a0a] text-white"
                >
                  Cycle {year}
                </option>
              ))}
            </select>
          </nav>
        </header>

        {/* DATA VISUALIZATION CONTAINER */}
        <article className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 md:p-10 overflow-hidden relative group shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                role="status"
              />
              <span className="text-sm font-bold text-white tracking-tight">
                @thissidemayur
              </span>
            </div>
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest hidden sm:block">
              Connection_Status:{" "}
              <span className="text-green-500/50">SECURE_SYNC</span>
            </div>
          </div>

          <figure className="flex justify-center overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing">
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

          {/* FOOTER: METRICS & LEGEND */}
          <footer className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Activity size={12} className="text-green-500" />
                Status: <span className="text-white font-bold">Active</span>
              </div>
              <div className="text-xs text-gray-400">
                Total Commits:{" "}
                <span className="text-white font-bold tracking-wider">
                  499+
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[9px] text-gray-500 uppercase font-mono tracking-tighter">
              <span>Less</span>
              <div className="flex gap-1" aria-hidden="true">
                {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map(
                  (color) => (
                    <div
                      key={color}
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
              <span>More</span>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}
