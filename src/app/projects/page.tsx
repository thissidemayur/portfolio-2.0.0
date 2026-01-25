import { Metadata } from "next";
import ProjectList from "@/components/projects/ProjectList";
import {  getAllPublicProjects } from "@/dal/projects.dal";
import { iProject } from "@/types/database";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Library | Mayur Pal",
  description:
    "A collection of software solutions, from system tools to web applications, built by Mayur Pal.",
};

export default async function ProjectsPage() {
  const projects:iProject[] = await getAllPublicProjects()
  
  const projectSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": "https://thissidemayur.me/projects/#list",
        name: "Mayur Pal's Project Portfolio",
        description: "Verified software projects and technical case studies.",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode", // More specific than "CreativeWork"
            name: p.title,
            url: `https://thissidemayur.me/projects/${p.slug}`, // Use slug for SEO
            creator: { "@id": "https://thissidemayur.me/#person" },
          },
        })),
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://thissidemayur.me",
            },
            { "@type": "ListItem", position: 2, name: "Projects" },
          ],
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-8 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        <nav className="mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </Link>
        </nav>
        <header className="mb-20 space-y-0">
          <div className="flex items-center gap-3 text-[10px] font-mono text-blue-500 font-black uppercase tracking-[0.4em]">
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
