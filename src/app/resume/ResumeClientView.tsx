"use client";
import React, { useState, useMemo } from "react";
import {
  Download,
  FileUser,
  Zap,
  Code,
  Server,
  ShieldCheck,
} from "lucide-react";
import { iResume, ResumeType } from "@/types/database";
import { GeneralResumeLayout } from "./GeneralCV";
import { SpecializedResumeLayout } from "./Specialized";
import { ResumeSEO } from "./ResumeSEO";

export default function ResumePage({ initialData }: { initialData: iResume[] }) {
  // Default to General CV as requested
  const [activeCategory, setActiveCategory] = useState<ResumeType>("GENERAL");

 const currentResumeData = useMemo(() => {
   return (
     initialData.find((r) => r.category === activeCategory) || initialData[0]
   );
 }, [activeCategory, initialData]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#050505] py-10 px-4">
      <ResumeSEO data={currentResumeData} />
      {/* 1. Control Toolbar (Hidden during print) */}
      <div className="max-w-[850px] mx-auto mb-8 flex flex-col gap-4 bg-[#0A0A0A] p-4 rounded-2xl border border-white/10 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Main Category Toggle */}
          <div className="flex gap-2 p-1 bg-black rounded-xl border border-white/5">
            <button
              onClick={() => setActiveCategory("GENERAL")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === "GENERAL"
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <FileUser size={14} /> General_CV
            </button>

            <div className="w-[1px] h-6 bg-white/10 my-auto" />

            <button
              onClick={() => setActiveCategory("FULLSTACK")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory !== "GENERAL"
                  ? "bg-[#00FF94] text-black shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <Zap size={14} /> Specialized_CVs
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2 bg-[#303F9F] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#303F9F]/80 transition-all shadow-[0_0_15px_rgba(48,63,159,0.3)]"
          >
            <Download size={14} /> Generate_A4_PDF
          </button>
        </div>

        {/* Specialized Sub-Menu: Only show if General is NOT selected */}
        {activeCategory !== "GENERAL" && (
          <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
            <span className="text-[9px] text-white/30 uppercase font-bold self-center mr-2">
              Choose Version:
            </span>

            <button
              onClick={() => setActiveCategory("FULLSTACK")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${
                activeCategory === "FULLSTACK"
                  ? "border-[#00FF94] text-[#00FF94] bg-[#00FF94]/10"
                  : "border-white/10 text-white/40 hover:border-white/40"
              }`}
            >
              <Code size={12} className="inline mr-1" /> Fullstack
            </button>

            <button
              onClick={() => setActiveCategory("BACKEND")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${
                activeCategory === "BACKEND"
                  ? "border-[#00FF94] text-[#00FF94] bg-[#00FF94]/10"
                  : "border-white/10 text-white/40 hover:border-white/40"
              }`}
            >
              <Server size={12} className="inline mr-1" /> Backend
            </button>

            <button
              onClick={() => setActiveCategory("DEVOPS")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${
                activeCategory === "DEVOPS"
                  ? "border-[#00FF94] text-[#00FF94] bg-[#00FF94]/10"
                  : "border-white/10 text-white/40 hover:border-white/40"
              }`}
            >
              <ShieldCheck size={12} className="inline mr-1" /> DevOps
            </button>
          </div>
        )}
      </div>

      {/* 2. The Printable Area */}
      <div
        id="resume-print-area"
        className="flex justify-center transition-all duration-500"
      >
        {activeCategory === "GENERAL" ? (
          <GeneralResumeLayout data={currentResumeData} />
        ) : (
          <SpecializedResumeLayout data={currentResumeData} />
        )}
      </div>

      {/* 3. SEO Footer */}
      <footer className="text-center mt-10 text-white/20 text-[10px] font-mono print:hidden">
        {activeCategory}_VERSION_ACTIVE // LPU_PLACEMENT_COMPLIANT //
        A4_GRID_READY
      </footer>
    </main>
  );
}
