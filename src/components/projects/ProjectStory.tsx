import { iProject } from "@/types/database";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function ProjectStory({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-16">
      {/* Problem Card */}
      <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-[3rem] space-y-6 relative overflow-hidden group">
        <div className="flex items-center gap-3 text-amber-500/70 uppercase font-mono text-[10px] tracking-[0.3em]">
          <h3 className="text-xs font-bold">The Problem</h3>
        </div>
        <div className="text-2xl md:text-3xl font-medium leading-tight text-white/90 italic">
          <ReactMarkdown
             remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
            components={{
              p: ({ children }) => <>{children}</>, // Removes the forced <p> margin
              strong: ({ children }) => (
                <span className="text-amber-500 font-black">{children}</span>
              ),
              code: ({ children }) => (
                <code className="bg-white/5 px-1 rounded text-sm">
                  {children}
                </code>
              ),
            }}
          >
            {project.problem_statement}
          </ReactMarkdown>
        </div>
      </div>

      {/* Strategy Card */}
      <div className="p-10 bg-blue-500/[0.03] border border-blue-500/10 rounded-[3rem] space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-3 text-blue-400/70 uppercase font-mono text-[10px] tracking-[0.3em]">
          <h3 className="text-xs font-bold">The Solution</h3>
        </div>
        <div className="text-lg text-white/70 leading-relaxed font-light">
          <ReactMarkdown
           remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
            components={{
              p: ({ children }) => <>{children}</>,
              strong: ({ children }) => (
                <span className="text-blue-400 font-bold">{children}</span>
              ),
            }}
          >
            {project.solution_approach}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
