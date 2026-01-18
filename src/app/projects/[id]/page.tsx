import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProjectHero from "@/components/projects/ProjectHero";
import TechnicalSpecs from "@/components/projects/TechnicalSpecs";
import DeploymentLog from "@/components/projects/DeploymentLog";
import { projects } from "@/lib/constant";

interface Props {
  params: Promise<{ id: string }>;
}



export default async function ProjectSlugPage({ params }: Props) {
  // Await the params here
  const { id } = await params;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }



  return (
    <main className="min-h-screen bg-[#050505] text-white pt-8 pb-24 px-6 selection:bg-blue-500/30">
     
      <div className="max-w-6xl mx-auto">
        <nav className="mb-12">
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Return_to_Registry
          </Link>
        </nav>

        <div className="space-y-24">
          <ProjectHero project={project} />
          <TechnicalSpecs project={project} />
          <DeploymentLog />
        </div>
      </div>
    </main>
  );
}
