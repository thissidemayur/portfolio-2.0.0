"use client";
import React from "react";
import FlipCard from "@/components/ui/FlipCard";

// Define the type for our technical specifications
interface SystemDetail {
  label: string;
  value: string;
}

const SYSTEM_DETAILS: SystemDetail[] = [
  { label: "Compute Engine", value: "AWS ECS (Fargate/EC2)" },
  { label: "Orchestration", value: "Auto-scaling Load Balancer" },
  { label: "Caching Layer", value: "Redis (Sub-50ms Latency)" },
  { label: "CI/CD Pipeline", value: "GitHub Actions → AWS ACR" },
  { label: "Persistence", value: "MongoDB Aggregate Logic" },
];

export default function ProjectPortal() {
  return (
    <article className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-2xl">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* LEFT: INFORMATION AREA */}
        <section className="flex flex-col justify-between h-full">
          <div>
            <header className="flex items-center gap-2 mb-3">
              <div
                className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">
                Featured System
              </h3>
            </header>

            <p className="text-sm text-white/40 leading-relaxed mb-4">
              CarbonFootprint Calculator: A distributed MERN system designed for
              real-time ESG (Environmental, Social, and Governance) monitoring.
            </p>

            {/* PIPELINE LOGS (DevOps Aesthetic) */}
            <aside
              className="font-mono text-[9px] space-y-1 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl text-emerald-500/70 mb-4"
              aria-label="System deployment logs"
            >
              <p>{"❯"} GITHUB_ACTIONS: DEPLOY_SUCCESS</p>
              <p>{"❯"} AWS_ECS: CLUSTER_STABLE</p>
              <p>{"❯"} REDIS_CACHE: ACTIVE</p>
            </aside>
          </div>

          {/* TECH STACK TAGS */}
          <footer className="flex flex-wrap gap-2">
            {["Next.js", "Go", "AWS", "Redis"].map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 rounded text-white/50 font-mono"
              >
                {tag}
              </span>
            ))}
          </footer>
        </section>

        {/* RIGHT: INTERACTIVE CARD AREA */}
        <div className="relative h-[220px] md:h-full w-full">
          {/* FIX: We wrap the FlipCard or apply the scrollbar-hide class 
            inside the FlipCard component to prevent "Bad CSS" scrollbars.
          */}
          <div className="h-full w-full scrollbar-hide overflow-y-auto rounded-3xl">
            <FlipCard
              title="CarbonTrack"
              subtitle="Cloud Architecture"
              details={SYSTEM_DETAILS}
              image="/projects/carbon-track.jpg" // Ensure this is preloaded!
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
