import ProjectList from "@/components/projects/ProjectList";
import { projects } from "@/lib/constant";



export default function ProjectsPage() {


  return (
    <main className="min-h-screen bg-[#050505] text-white pt-8 pb-24 px-6">
     
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-mono text-blue-500 font-black uppercase tracking-[0.4em]">
            <span className="animate-pulse">●</span> Software_Collection
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            Project <span className="text-white/20">Registry</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-medium">
            Explore my work in software development and systems engineering.
            Each project is a solution to a real-world technical challenge.
          </p>
        </header>

        <ProjectList initialProjects={projects} />
      </div>
    </main>
  );
}
