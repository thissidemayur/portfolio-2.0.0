import Link from "next/link";
import {
  Plus,
  Github,
  Edit,
  Star,
  Activity,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { getAllProjects } from "@/dal/projects.dal";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";
import { iProject } from "@/types/database";
import { Suspense } from "react";
import ProjectsLoading from "@/components/admin/SuspenseProject";

// 1. DATA COMPONENT: The "Await" happens here
async function ProjectList() {
  const projects = await getAllProjects();

  if (projects.length === 0) {
    return (
      <div className="p-20 text-center text-white/20 font-mono">
        NO_DATA_FOUND_IN_VAULT
      </div>
    );
  }

  return (
    <>
      {/* DESKTOP ROWS */}
      <tbody className="divide-y divide-white/5 hidden md:table-row-group">
        {projects.map((project: iProject) => (
          <tr
            key={project.id}
            className="group hover:bg-white/[0.02] transition-all"
          >
            <td className="px-8 py-6">
              {project.is_featured ? (
                <div className="flex items-center gap-2 text-[#00FF94]">
                  <Star size={14} className="fill-[#00FF94]" />
                  <span className="text-[9px] font-black uppercase">
                    Featured
                  </span>
                </div>
              ) : (
                <span className="text-[9px] font-mono text-white/10 uppercase">
                  Standard
                </span>
              )}
            </td>
            <td className="px-6 py-6">
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white group-hover:text-[#00FF94] transition-colors">
                  {project.title}
                </span>
                <span className="text-[10px] font-mono text-white/20 italic">
                  /{project.slug}
                </span>
              </div>
            </td>
            <td className="px-6 py-6">
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stack?.slice(0, 3).map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[8px] font-black px-2 py-0.5 bg-white/5 border border-white/10 rounded uppercase tracking-tighter text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-8 py-6 text-right">
              <div className="flex justify-end gap-3">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="p-2 bg-white/5 text-blue-400 rounded-xl"
                >
                  <Edit size={18} />
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {/* MOBILE CARDS (Rendered inside the same stream) */}
      <div className="md:hidden divide-y divide-white/5">
        {projects.map((project: iProject) => (
          <div key={project.id} className="p-6 space-y-4">
            <h3 className="font-black italic uppercase text-lg">
              {project.title}
            </h3>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project.id}`}
                className="p-3 bg-white/5 rounded-xl text-blue-400"
              >
                <Edit size={20} />
              </Link>
              <DeleteProjectButton id={project.id} title={project.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 2. PAGE SHELL: No "await" for data here!
export default function AdminProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-12">
      {/* EVERYTHING BELOW IS SENT TO THE BROWSER INSTANTLY */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back_to_System
        </Link>
      </div>

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
          Project_Manager
        </h2>
        <Link
          href="/admin/projects/new"
          className="bg-[#00FF94] text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
        >
          + Add_New_Build
        </Link>
      </header>

      <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
              <th className="px-8 py-6">Tier</th>
              <th className="px-6 py-6 text-xs">Project_Identity</th>
              <th className="px-6 py-6 text-xs">Tech_Stack</th>
              <th className="px-8 py-6 text-right text-xs">Actions</th>
            </tr>
          </thead>

          {/* THE HOLE: The Skeleton shows until ProjectList is ready */}
          <Suspense fallback={<ProjectsLoading />}>
            <ProjectList />
          </Suspense>
        </table>
      </div>
    </div>
  );
}
