import React from "react";
import { AlertTriangle, Cpu, CheckCircle2, Code2 } from "lucide-react";
import { IProject } from "@/lib/constant";

export default function TechnicalSpecs({ project }: { project: IProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {/* 01. THE OVERVIEW (Larger Card) */}
      <article className="md:col-span-2 p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-4">
        <h3 className="flex items-center gap-2 text-blue-500 font-mono text-[10px] font-black uppercase tracking-widest">
          <Code2 size={14} /> 01_Core_Architecture
        </h3>
        <p className="text-gray-400 leading-relaxed text-lg">
          {project.overview}
        </p>
      </article>

      {/* 02. TECH STACK SIDEBAR */}
      <aside className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-6">
        <h3 className="text-white/20 font-mono text-[10px] font-black uppercase tracking-widest">
          Systems_Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s: string) => (
            <span
              key={s}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white/40"
            >
              {s}
            </span>
          ))}
        </div>
      </aside>

      {/* 03. THE CHALLENGE (Red Alert) */}
      <article className="p-10 bg-red-500/[0.03] border border-red-500/10 rounded-[3rem] space-y-4">
        <h3 className="flex items-center gap-2 text-red-500 font-mono text-[10px] font-black uppercase tracking-widest">
          <AlertTriangle size={14} /> 02_The_Difficulty
        </h3>
        <p className="text-sm text-gray-400">{project.challenge}</p>
      </article>

      {/* 04. THE DECISION (Blue Infrastructure) */}
      <article className="p-10 bg-blue-500/[0.03] border border-blue-500/10 rounded-[3rem] space-y-4">
        <h3 className="flex items-center gap-2 text-blue-500 font-mono text-[10px] font-black uppercase tracking-widest">
          <Cpu size={14} /> 03_Engineering_Choice
        </h3>
        <p className="text-sm text-gray-400">{project.decision}</p>
      </article>

      {/* 05. THE LEARNING (Green Success) */}
      <article className="p-10 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-[3rem] space-y-4">
        <h3 className="flex items-center gap-2 text-emerald-500 font-mono text-[10px] font-black uppercase tracking-widest">
          <CheckCircle2 size={14} /> 04_Key_Lesson
        </h3>
        <p className="text-sm text-emerald-500/80 font-medium">
          {project.learning}
        </p>
      </article>
    </div>
  );
}
