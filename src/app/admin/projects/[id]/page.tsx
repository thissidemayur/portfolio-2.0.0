import { getAllTechnologies } from "@/dal/tech.dal";
import { getProjectById } from "@/dal/projects.dal";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { iTech, iProject } from "@/types/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Terminal, Cpu } from "lucide-react";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params and fetch data in parallel for performance
  const { id } = await params;
  const [allTech, project] = await Promise.all([
    getAllTechnologies(),
    getProjectById(parseInt(id)),
  ]);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-black">
      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Navigation & Context Section */}
        <header className="flex flex-col gap-6">
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group w-fit"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back_to_Project_Manager
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Visual Status Indicator */}
              <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-500">
                <Terminal size={24} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-white leading-none">
                  Modify_Build
                </h1>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mt-2">
                  Target_ID: {id} {" // "} {project.slug}
                </p>
              </div>
            </div>

            {/* Hardware/System Status Badge */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full w-fit">
              <Cpu size={12} className="text-blue-500 animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                Hot_Reload_Enabled
              </span>
            </div>
          </div>
        </header>

        {/* Form Area */}
        <main className="relative">
          {/* Note: Ensure your ProjectForm accepts 'initialData' 
            and switches its action to updateProjectAction 
          */}
          <ProjectForm allTech={allTech} initialData={project} isEdit={true} />
        </main>
      </div>
    </div>
  );
}
