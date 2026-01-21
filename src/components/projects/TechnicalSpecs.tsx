import { iProject } from "@/types/database";
import { AlertTriangle, CheckCircle2, Terminal } from "lucide-react";

export default function TechnicalSpecs({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* FULL TECHNICAL LOG */}
      <article className="md:col-span-2 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-6">
        <h3 className="flex items-center gap-2 text-blue-500 font-mono text-[10px] font-black uppercase tracking-widest">
          <Terminal size={14} /> 03_Development_Deep_Dive
        </h3>
        <div className="prose prose-invert max-w-none text-gray-400">
          {project.content}
        </div>
      </article>

      <div className="space-y-6">
        {/* CHALLENGES */}
        <article className="p-10 bg-red-500/[0.03] border border-red-500/10 rounded-[3rem] space-y-6">
          <h3 className="flex items-center gap-2 text-red-500 font-mono text-[10px] font-black uppercase tracking-widest">
            <AlertTriangle size={14} /> Critical_Obstacles
          </h3>
          <ul className="space-y-3">
            {project.challenges_faced.map((c, i) => (
              <li key={i} className="text-xs text-gray-500 flex gap-2">
                <span className="text-red-500/50">—</span> {c}
              </li>
            ))}
          </ul>
        </article>

        {/* LEARNINGS */}
        <article className="p-10 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-[3rem] space-y-6">
          <h3 className="flex items-center gap-2 text-emerald-500 font-mono text-[10px] font-black uppercase tracking-widest">
            <CheckCircle2 size={14} /> Key_Takeaways
          </h3>
          <ul className="space-y-3">
            {project.key_learnings.map((l, i) => (
              <li key={i} className="text-xs text-gray-400 flex gap-2">
                <span className="text-emerald-500">✓</span> {l}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
