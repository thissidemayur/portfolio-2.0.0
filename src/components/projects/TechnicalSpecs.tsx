import { iProject } from "@/types/database";
import {  Lightbulb, Code2 } from "lucide-react";

export default function TechnicalSpecs({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <article className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Code2 size={18} className="text-blue-500" />
          </div>
          <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            Engineering_Log
          </h3>
        </div>

        <div
          className="
            prose prose-invert max-w-none 
            prose-headings:text-white prose-headings:italic prose-headings:tracking-tighter
            prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-12
            prose-h3:text-2xl prose-h3:text-blue-400/90 prose-h3:mt-8
            prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem]
          "
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </article>

      {/* SIDEBAR: The Metadata */}
      <aside className="space-y-8 sticky top-8 h-fit">
        {/* Knowledge Gained */}
        <div className="p-8 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-[2.5rem] backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-500 mb-6">
            <Lightbulb size={16} />
            <h4 className="font-mono text-[9px] uppercase tracking-[0.4em]">
              Core_Competencies
            </h4>
          </div>
          <ul className="space-y-4">
            {project.key_learnings.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-400 group">
                <span className="text-emerald-500 font-mono opacity-40 group-hover:opacity-100 transition-opacity">
                  {i + 1}.
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Tech List */}
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
          <h4 className="text-white/20 font-mono text-[9px] uppercase tracking-[0.4em] mb-6">
            Stack_Composition
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-white/40 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
