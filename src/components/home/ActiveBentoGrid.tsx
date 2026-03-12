"use client";
import { TechOrbital } from "@/components/home/titles/TechOrbital";
import HealthMonitor from "@/components/home/titles/HealthMonitor";
import ProjectPortal from "@/components/home/titles/ProjectPortal";
import GeoNode from "@/components/home/titles/GeoNode";
import { motion } from "framer-motion";

export default function ActiveBentoGrid() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 py-24 relative"
      aria-label="Interactive System Overview"
    >
      {/* Background Section Glow - subtle contrast from Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
        {/* BIG BOX: THE STACK (Authority & Depth) */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 bg-[#0a0a0a]/80 border border-white/10 rounded-[2.5rem] overflow-hidden relative group hover:border-blue-500/30 transition-colors duration-500 shadow-2xl"
        >
          <header className="absolute top-8 left-8 z-10">
            <h3 className="text-white font-bold text-2xl tracking-tight">
              Production Stack
            </h3>
            <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-mono font-semibold">
              Engineered for Scale
            </p>
          </header>

          <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent">
            <TechOrbital />
          </div>
        </motion.article>

        {/* PROJECT PORTAL: (Proof of Execution) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 md:row-span-1 rounded-[2.5rem] overflow-hidden border border-white/10"
        >
          <ProjectPortal />
        </motion.div>

        {/* HEALTH MONITOR: (Reliability) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-1 md:row-span-1 rounded-[2.5rem] overflow-hidden border border-white/10"
        >
          <HealthMonitor />
        </motion.div>

        {/* GEO NODE: (Global/Edge Deployment) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-1 md:row-span-1 rounded-[2.5rem] overflow-hidden border border-white/10"
        >
          <GeoNode />
        </motion.div>
      </div>
    </section>
  );
}
