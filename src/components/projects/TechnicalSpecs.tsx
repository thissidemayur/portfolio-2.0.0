import { iProject } from "@/types/database";
import { Cpu, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function TechnicalSpecs({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Main Engineering Journal */}
      <article className="lg:col-span-8">
        <div className="inline-flex items-center gap-3 mb-12 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full">
          <Terminal size={12} className="text-blue-500" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            Technical Case Study
          </span>
        </div>

        <div
          className="
          prose prose-invert max-w-none 
          prose-p:text-white/70 prose-p:text-lg prose-p:leading-[1.8]
          prose-headings:text-white prose-headings:tracking-tighter
          prose-h2:text-4xl prose-h2:font-black prose-h2:mb-8 prose-h2:uppercase
          prose-h3:text-2xl prose-h3:text-blue-400 prose-h3:mt-12
          prose-strong:text-[#00FF94]
          prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem]
          prose-code:text-blue-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {project.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Sidebar - Desktop Sticky */}
      <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
        {/* Knowledge Module (Key Insights) */}
        <div className="p-8 bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-[2.5rem] shadow-xl">
          <h4 className="text-white/30 text-[11px] font-bold font-mono uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
            <Cpu size={14} className="text-blue-500" /> Key Insights
          </h4>
          <ul className="space-y-8">
            {project.key_learnings.map((item, i) => (
              <li key={i} className="flex gap-5 group">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-blue-500/30 flex items-center justify-center text-[10px] font-mono text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">
                  {i + 1}
                </span>
                <p className="text-[15px] text-white/60 group-hover:text-white/90 transition-colors leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Module */}
        <div className="p-8 bg-blue-500/[0.01] border border-blue-500/5 rounded-[2.5rem]">
          <h4 className="text-white/20 font-mono text-[11px] font-bold uppercase tracking-[0.4em] mb-6">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-mono text-white/50 uppercase hover:border-blue-500/30 hover:text-blue-400 transition-all cursor-default"
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
