import { iProject } from "@/types/database";

export function ProjectStory({ project }: { project: iProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-16">
      {/* Problem Card */}
      <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-[3rem] space-y-6">
        <div className="flex items-center gap-3 text-amber-500/50 uppercase font-mono text-[10px] tracking-[0.3em]">
          <div className="h-1 w-1 bg-amber-500 rounded-full" />
          <h3 className="text-lg font-bold">The_Challenge</h3>
        </div>
        <p className="text-2xl md:text-3xl font-medium leading-tight text-white italic">
          &quot;{project.problem_statement}&quot;
        </p>
      </div>

      <div className="p-10 bg-blue-500/[0.02] border border-blue-500/10 rounded-[3rem] space-y-6">
        <div className="flex items-center gap-3 text-blue-500/50 uppercase font-mono text-[10px] tracking-[0.3em]">
          <div className="h-1 w-1 bg-blue-500 rounded-full" />

          <h3 className="text-lg font-bold">The_Strategys</h3>
        </div>
        <p className="text-lg text-white/50 leading-relaxed font-light">
          {project.solution_approach}
        </p>
      </div>
    </div>
  );
}
