import { TechOrbital } from "@/components/home/titles/TechOrbital";
import LocationCard from "@/components/home/titles/LocationCard";
import SystemStats from "./titles/SystemStats";
import WorkStatus from "@/components/home/titles/WorkStatus";

// DAL Imports
import { getMessagesStats } from "@/dal/messages.dal";
import { getCertificatesCount } from "@/dal/certificates.dal";
import { getBlogStats } from "@/dal/blogs.dal";
import { getProjectStats } from "@/dal/projects.dal";

export default async function ActiveBentoGrid() {
  // Parallel fetching for maximum speed
  const [msgStats, certCount, blogStats, projStats] = await Promise.all([
    getMessagesStats(),
    getCertificatesCount(),
    getBlogStats(),
    getProjectStats(),
  ]);

  return (
    <section
      className="max-w-7xl mx-auto px-6 py-24 relative"
      aria-label="Professional System Overview"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
        {/* BIG BOX: THE STACK (Authority & Depth) */}
        <div className="md:col-span-2 md:row-span-2 bg-[#0a0a0a]/80 border border-white/10 rounded-[2.5rem] overflow-hidden relative group hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
          <header className="absolute top-8 left-8 z-20">
            <h3 className="text-white font-bold text-2xl tracking-tight uppercase italic">
              Production Stack
            </h3>
            <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-mono font-semibold">
              Engineered for Scale
            </p>
          </header>

          <div className="w-full h-full">
            <TechOrbital />
          </div>
        </div>

        {/* SYSTEM ANALYTICS: Real-time Database Counts */}
        <div className="md:col-span-2 md:row-span-1 rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] transition-all hover:border-blue-500/20">
          <SystemStats
            messages={msgStats}
            certs={certCount}
            blogs={blogStats}
            projects={projStats}
          />
        </div>

        {/* WORK STATUS: Hiring availability & Response Time */}
        <div className="md:col-span-1 md:row-span-1 rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-blue-500/20 transition-all">
          <WorkStatus unread={msgStats.unread} />
        </div>

        {/* LOCATION CARD: Current base and local IST time */}
        <div className="md:col-span-1 md:row-span-1 rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-blue-500/20 transition-all">
          <LocationCard />
        </div>
      </div>
    </section>
  );
}
