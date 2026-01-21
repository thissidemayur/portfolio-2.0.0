import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProjectHero from "@/components/projects/ProjectHero";
import TechnicalSpecs from "@/components/projects/TechnicalSpecs";
import DeploymentLog from "@/components/projects/DeploymentLog";
import { getProjectByItSlug } from "@/dal/projects.dal";
import { iProject } from "@/types/database";
import { ProjectStory } from "@/components/projects/ProjectStory";

// Update the Props interface for Next.js 15
interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO Metadata (Updated to await params)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  console.log(`slug: ${slug}`)
  const project:iProject = await getProjectByItSlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Software Case Study`,
    description: project.summary, 
  };
}

// 2. The Page Component (Must be async)
export default async function ProjectSlugPage({ params }: Props) {
  // Await the params here
  const { slug } = await params;
  const project: iProject = await getProjectByItSlug(slug);
console.log("project: ",project)
  if (!project) {
    notFound();
  }

const projectSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      "@id": `https://thissidemayur.me/projects/${slug}/#software`,
      name: project.title,
      description: project.summary,
      programmingLanguage: project.tech_stack, // Array of strings from DB
      codeRepository: project.repo_url,
      author: { "@id": "https://thissidemayur.me/#person" },
      maintainer: { "@id": "https://thissidemayur.me/#person" },
      teaches: project.key_learnings.join(", "),
      creativeWorkStatus: "Published Case Study",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `https://thissidemayur.me/projects/${slug}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://thissidemayur.me",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Project Library",
          item: "https://thissidemayur.me/projects",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title, // No 'item' here because it's the current page
        },
      ],
    },
  ],
};

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-8 pb-24 px-6 selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

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
            Back
          </Link>
        </nav>

        <div className="space-y-24">
          <ProjectHero project={project} />
          <ProjectStory project={project} />
          <TechnicalSpecs project={project} />
          <DeploymentLog />
        </div>
      </div>
    </main>
  );
}
