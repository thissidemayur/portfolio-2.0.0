"use client";
import { TechOrbital } from "@/components/home/titles/TechOrbital"; // Assuming you have this
import HealthMonitor from "@/components/home/titles/HealthMonitor";
import ProjectPortal from "@/components/home/titles/ProjectPortal";
import GeoNode from "@/components/home/titles/GeoNode";

export default function ActiveBentoGrid() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 py-24"
      aria-label="Interactive System Overview"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
        <article className="md:col-span-2 md:row-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden relative group shadow-2xl">
          <header className="absolute top-6 left-6 z-10 pointer-events-none">
            <h3 className="text-white font-bold text-lg tracking-tight">
              Engine Stack
            </h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono">
              Core Technologies
            </p>
          </header>

          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-500/5 to-transparent">
            <TechOrbital />
          </div>
        </article>

        <div className="md:col-span-2 md:row-span-1">
          <ProjectPortal />
        </div>

        <div className="md:col-span-1 md:row-span-1">
          <HealthMonitor />
        </div>

        <div className="md:col-span-1 md:row-span-1">
          <GeoNode />
        </div>
      </div>
    </section>
  );
}
