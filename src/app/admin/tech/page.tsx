import { getAllTechnologies } from "@/dal/tech.dal";
import { Cpu, ArrowLeft, Layers, Terminal } from "lucide-react";
import TechActions from "@/components/admin/TechActions";
import AddTechForm from "@/components/admin/AddTechForm";
import Link from "next/link";
import { iTech } from "@/types/database";

export default async function AdminTechPage() {
  const allTech = await getAllTechnologies();

  const categories = [
    "languages & runtimes",
    "frontend",
    "backend",
    "database & ORMs",
    "devops",
    "tools",
    "other",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 md:space-y-16">
      {/* SYSTEM NAVIGATION */}
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
          <Terminal size={12} />
          Inventory_Sync: Active
        </div>
      </div>

      {/* HEADER SECTION */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00FF94]/10 rounded-lg border border-[#00FF94]/20 text-[#00FF94]">
              <Layers size={20} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
              Stack_Inventory
            </h1>
          </div>
          <p className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] ml-1">
            Configure_Hardware_&_Software_Primitives
          </p>
        </div>

        {/* The AddTechForm needs to be responsive internally (modal or inline) */}
        <div className="w-full lg:w-auto">
          <AddTechForm />
        </div>
      </header>

      {/* RESPONSIVE GRID: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => {
          const techsInCategory = allTech.filter(
            (t: iTech) => t.category === cat,
          );
          if (techsInCategory.length === 0) return null;

          return (
            <section
              key={cat}
              className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full"
            >
              <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-[#00FF94] opacity-50 border-b border-white/5 pb-5 mb-6">
                {cat.replace(" & ", "_&_")}
              </h3>

              <div className="space-y-2 flex-grow">
                {techsInCategory.map((tech: iTech) => (
                  <div
                    key={tech.id}
                    className="flex items-center justify-between group p-3 hover:bg-white/[0.03] rounded-2xl transition-all border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 font-mono text-[10px] group-hover:text-[#00FF94] group-hover:border-[#00FF94]/30 transition-all">
                        {tech.icon_slug.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white/90 truncate">
                          {tech.name}
                        </p>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter truncate">
                          {tech.icon_slug}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <TechActions id={tech.id} isMain={tech.is_main_stack} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
