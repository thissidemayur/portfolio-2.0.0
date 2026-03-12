import { iProject } from "@/types/database";

export default function TechnicalSpecs({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Main Engineering Journal */}
      <article className="lg:col-span-8">
        <div className="inline-flex items-center gap-3 mb-12 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
            System_Architecture_Log
          </span>
        </div>

        <div
          className="
            prose prose-invert max-w-none 
            prose-p:text-white/60 prose-p:text-lg prose-p:leading-[1.8]
            prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter
            prose-h2:text-4xl prose-h2:text-white prose-h2:mb-8
            prose-h3:text-xl prose-h3:text-blue-400
            prose-strong:text-[#00FF94]
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2.5rem]
          "
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </article>

      {/* Sidebar - Desktop Sticky */}
      <aside className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-12">
        {/* Knowledge Module */}
        <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem]">
          <h4 className="text-white/20 text-[12px] font-bold  font-mono  uppercase tracking-[0.4em] mb-8">
            Project_Impact
          </h4>
          <ul className="space-y-6">
            {project.key_learnings.map((item, i) => (
              <li key={i} className="flex gap-4 group">
                <span className="text-blue-500 font-mono text-xs font-bold leading-none">
                  0{i + 1}
                </span>
                <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors leading-snug">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-blue-500/[0.02] border border-blue-500/10 rounded-[2.5rem]">
          <h4 className="text-white/20 font-mono text-[12px] font-bold uppercase tracking-[0.4em] mb-6">
            Tech_Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono text-white/40 uppercase group-hover:text-white transition-colors"
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
