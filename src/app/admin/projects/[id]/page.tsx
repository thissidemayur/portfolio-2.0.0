import { getAllTechnologies } from "@/dal/tech.dal";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { iTech } from "@/types/database";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewProjectPage() {
  // Fetching data on the server
  const allTech: iTech[] = await getAllTechnologies();

  return (
    <div className="min-h-screen bg-black">
      {/* Responsive Container: padding changes based on screen size */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Header Section: StackQed on mobile, row on desktop */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link
                href="/admin/projects"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors md:hidden"
              >
                <ChevronLeft size={18} />
              </Link>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-white">
                Deploy_New_Build
              </h1>
            </div>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] ml-1">
              Project_Initialization_Sequence
            </p>
          </div>

          {/* Hidden on mobile, visible on desktop for extra context */}
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
              Status: Authorizing_Upload
            </p>
            <p className="text-[9px] font-mono text-white/10 uppercase">
              v2.0.26_Build
            </p>
          </div>
        </header>

        {/* The Form itself should handle its internal grid responsiveness */}
        <main className="relative">
          <ProjectForm allTech={allTech} />
        </main>
      </div>
    </div>
  );
}
