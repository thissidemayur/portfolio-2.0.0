// src/components/admin/TechInventoryContent.tsx
import { getAllTechnologies } from "@/dal/tech.dal";
import TechActions from "@/components/admin/TechActions";
import { iTech, TechCategory } from "@/types/database";

export default async function TechInventoryContent() {
  const allTech = await getAllTechnologies();

  // Mapping Display Names to Enum Keys
  const categories: { label: string; value: TechCategory }[] = [
    { label: "Languages & Runtimes", value: "PROGRAMMING_LANGUAGES" },
    { label: "Frontend", value: "FRONTEND" },
    { label: "Backend", value: "BACKEND" },
    { label: "Database & ORMs", value: "DB_ORM" },
    { label: "Infrastructure (AWS)", value: "INFRASTRUCTURE(aws)" },
    { label: "DevOps", value: "DEVOPS" },
    { label: "Tools", value: "TOOLS" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {categories.map((cat) => {
        const techsInCategory = allTech
          .filter((t: iTech) => t.category === cat.value)
          .sort((a, b) =>
            a.is_main_stack === b.is_main_stack ? 0 : a.is_main_stack ? -1 : 1,
          );

        if (techsInCategory.length === 0) return null;

        return (
          <section
            key={cat.value}
            className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-full hover:border-[#00FF94]/20 transition-all duration-500"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-5 mb-6">
              <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-[#00FF94]">
                {cat.label.replace(" ", "_")}
              </h3>
              <span className="text-[10px] font-mono text-white/10 uppercase">
                Count: {techsInCategory.length}
              </span>
            </div>

            <div className="space-y-1">
              {techsInCategory.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center justify-between group p-3 hover:bg-white/[0.02] rounded-2xl transition-all border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-1 h-1 rounded-full ${tech.is_main_stack ? "bg-[#00FF94] shadow-[0_0_8px_#00FF94]" : "bg-white/10"}`}
                    />
                    <span
                      className={`text-sm font-bold ${tech.is_main_stack ? "text-white" : "text-white/50"}`}
                    >
                      {tech.name}
                    </span>
                  </div>

                  {/* TechActions handles Delete and Star Toggling */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <TechActions id={tech.id} isMain={tech.is_main_stack} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
