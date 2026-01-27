// components/projects/ProjectStory.tsx
import { iProject } from "@/types/database";
import { Zap, Target } from "lucide-react";

export function ProjectStory({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 border-y border-white/5">
      {/* Problem Statement - Switched from Red to Amber */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-amber-500 font-mono text-[10px] font-black uppercase tracking-[0.3em]">
          <Target size={14} /> 01_Problem_Analysis
        </h3>
        <p className="text-2xl md:text-4xl font-light leading-[1.1] text-white/90 italic tracking-tight">
          &quot;{project.problem_statement}&quot;
        </p>
      </div>

      {/* Solution Approach */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.3em]">
          <Zap size={14} /> 02_Architectural_Response
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-light border-l border-white/10 pl-6">
          {project.solution_approach}
        </p>
      </div>
    </div>
  );
}
