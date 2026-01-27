import { iProject } from "@/types/database";
import { Terminal } from "lucide-react";

// components/projects/TechnicalSpecs.tsx
export default function TechnicalSpecs({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Development Deep Dive */}
      <article className="md:col-span-2 p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] shadow-2xl">
        <h3 className="flex items-center gap-2 text-blue-500 font-mono text-[10px] font-black uppercase tracking-widest mb-8">
          <Terminal size={14} /> 03_System_Implementation
        </h3>

        {/* This container fixes your H2, H3, and Bold visibility issues */}
        <div
          className="
            prose prose-invert max-w-none 
            prose-headings:text-white prose-headings:italic prose-headings:tracking-tighter
            prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2
            prose-h3:text-xl prose-h3:text-blue-400/80
            prose-strong:text-white prose-strong:font-bold
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-li:text-gray-400
          "
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </article>

      <aside className="space-y-6">
        {/* Critical Challenges */}
        <div className="p-8 bg-red-500/[0.02] border border-red-500/10 rounded-[2.5rem]">
          <h4 className="text-red-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6">
            Obstacles_Resolved
          </h4>
          <ul className="space-y-4">
            {project.challenges_faced.map((item, i) => (
              <li
                key={i}
                className="group flex gap-3 text-xs leading-relaxed text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span className="text-red-500/30 group-hover:text-red-500 transition-colors">
                  0{i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Knowledge Gained */}
        <div className="p-8 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[2.5rem]">
          <h4 className="text-emerald-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-6">
            Technical_Growth
          </h4>
          <ul className="space-y-4">
            {project.key_learnings.map((item, i) => (
              <li
                key={i}
                className="group flex gap-3 text-xs leading-relaxed text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-emerald-500/40 group-hover:text-emerald-500 transition-colors">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
