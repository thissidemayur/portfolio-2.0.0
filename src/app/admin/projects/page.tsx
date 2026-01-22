import Link from "next/link";
import {
  Plus,
  ExternalLink,
  Github,
  Edit,
  Star,
  Activity,
  ArrowLeft,
} from "lucide-react";
import { getAllProjects } from "@/dal/projects.dal";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";
import { iProject } from "@/types/database";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-12">
      {/* TOP NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back_to_System
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
          Systems_Active
        </div>
      </div>

      {/* Page Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            Project_Manager
          </h2>
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} className="text-[#00FF94]" />
            <span>Active_Builds: {projects.length}</span>
          </div>
        </div>
        <Link
          href="/admin/projects/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#00FF94] text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all active:scale-95"
        >
          <Plus size={18} /> Add_New_Build
        </Link>
      </header>

      {/* Projects Container */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                <th className="px-8 py-6">Tier</th>
                <th className="px-6 py-6 text-xs">Project_Identity</th>
                <th className="px-6 py-6 text-xs">Tech_Stack</th>
                <th className="px-8 py-6 text-right text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
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
                      {project.tech_stack?.length > 3 && (
                        <span className="text-[8px] text-white/20 font-mono">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                      <a
                        href={project.repo_url}
                        target="_blank"
                        className="p-2 text-white/20 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </a>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 bg-white/5 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-all"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteProjectButton
                        id={project.id}
                        title={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {projects.map((project: iProject) => (
            <div
              key={project.id}
              className="p-6 space-y-4 active:bg-white/[0.02] transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-black italic uppercase text-lg leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                    /{project.slug}
                  </p>
                </div>
                {project.is_featured && (
                  <Star size={16} className="text-[#00FF94] fill-[#00FF94]" />
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {project.tech_stack?.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[8px] font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded uppercase text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-4">
                  <a href={project.repo_url} className="text-white/40">
                    <Github size={20} />
                  </a>
                  <a href={project.live_url} className="text-white/40">
                    <ExternalLink size={20} />
                  </a>
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
