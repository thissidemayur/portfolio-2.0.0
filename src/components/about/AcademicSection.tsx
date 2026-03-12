import {
  Terminal,
  Milestone,
  Globe,
  Rocket,
  Dumbbell,
  Music,
  Coffee,
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";

const timeline = [
  {
    semester: "Semester 6 (Current)",
    title: "Enterprise Scaling & AI",
    academic: "Advanced Cloud Architecture & DevOps Specialization.",
    execution: "Mastering Terraform (IaC), Laravel, and building GenAI Agents.",
    status: "Active",
    icon: <Milestone size={16} className="text-blue-500" />,
  },
  {
    semester: "Semester 5",
    title: "Infrastructure & Data",
    academic: "Data Pipelines & Distributed Systems.",
    execution:
      "Production CI/CD with GitHub Actions. Redis & Postgres optimization.",
    status: "Completed",
    icon: <Rocket size={16} className="text-purple-500" />,
  },
  {
    semester: "Semester 4",
    title: "Backend & Virtualization",
    academic: "Node.js, Express, and Server-side Logic.",
    execution:
      "Containerizing workflows with Docker. Initiated Golang migration.",
    status: "Completed",
    icon: <Terminal size={16} />,
  },
  {
    semester: "Semester 1-3",
    title: "The System Foundations",
    academic: "Core CS: C++, OS, Networking, and DBMS.",
    execution:
      "Transitioned from JNV (No gadgets) to Full-Stack (MERN) mastery.",
    status: "Completed",
    icon: <Globe size={16} />,
  },
];

export default function AcademicSection() {
  return (
    <section className="mb-40 space-y-24">
      {/* --- TIMELINE SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <header className="mb-12">
            <h2 className="text-3xl font-black uppercase italic">
              Growth <span className="text-blue-500">Log</span>
            </h2>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
              Academic_Journey // Parallel_Execution
            </p>
          </header>

          <div className="relative border-l border-white/5 ml-4 space-y-12">
            {timeline.map((item) => (
              <MotionWrapper key={item.semester}>
                <div className="relative pl-12 group">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/20 group-hover:border-blue-500 transition-colors z-10" />

                  <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] group-hover:border-blue-500/20 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] font-bold text-white/40">
                        {item.semester}
                      </span>
                      {item.status === "Active" && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-blue-500 uppercase animate-pulse">
                          ● Running_Process
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-black uppercase italic mb-4">
                      {item.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                      <div>
                        <span className="text-[9px] font-mono text-white/20 uppercase block mb-1">
                          Academic
                        </span>
                        <p className="text-xs text-gray-400">{item.academic}</p>
                      </div>
                      <div className="md:border-l md:border-white/5 md:pl-6">
                        <span className="text-blue-500/50 text-[9px] font-mono uppercase block mb-1">
                          Execution
                        </span>
                        <p className="text-xs text-gray-300 font-medium">
                          {item.execution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>

        {/* --- DISCIPLINE SIDEBAR --- */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-3xl font-black uppercase italic mb-12 lg:opacity-0">
            Discipline
          </h2>
          <div className="sticky top-24 space-y-6">
            <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[3rem]">
              <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-8 font-black underline underline-offset-8">
                Personal_Operating_System
              </h4>

              <div className="space-y-8">
                <div className="flex gap-4 group">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                    <Dumbbell className="text-blue-500" size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase italic tracking-wider">
                      Calisthenics
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      Physical endurance translates to mental focus during
                      high-pressure deployments.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                    <Music className="text-blue-500" size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase italic tracking-wider">
                      Deep Focus
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      Using audio-isolation and &quot;Processing Time&quot; to
                      visualize architecture before coding.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                    <Coffee className="text-blue-500" size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase italic tracking-wider">
                      Human Protocol
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      A JNV discipline mindset: doing the best for those who
                      trust me with their systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-white/5 rounded-[3rem] text-center">
              <p className="text-xs text-gray-500 font-medium italic">
                &quot;I don&apos;t predict destiny; I build the systems to
                handle whatever it brings.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
