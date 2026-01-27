// components/projects/ProjectList.tsx
import { iProject } from "@/types/database";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }: { projects: iProject[] }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* FOOTER CTA (pure server HTML) */}
      <footer className="mt-32 text-center p-12 md:p-20 bg-white/[0.02] border border-white/5 rounded-[4rem]">
        <h2 className="text-3xl font-black uppercase italic mb-6">
          Ready to scale?
        </h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-10 max-w-md mx-auto leading-relaxed">
          I am actively seeking internship and junior engineering roles for
          2026.
        </p>
      </footer>
    </section>
  );
}
