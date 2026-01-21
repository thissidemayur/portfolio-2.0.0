import { iProject } from "@/types/database";

export  function ProjectStory({ project }: { project: iProject }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-6">
        <h3 className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-widest italic">
          01 // The_Problem_Statement
        </h3>
        <p className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tighter">
          {project.problem_statement}
        </p>
      </div>
      <div className="space-y-6">
        <h3 className="text-gray-500 font-mono text-[10px] font-black uppercase tracking-widest italic">
          02 // The_Solution_Approach
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          {project.solution_approach}
        </p>
      </div>
    </section>
  );
}
