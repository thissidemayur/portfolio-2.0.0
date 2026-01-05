// src/app/page.tsx
import Hero from "@/components/home/Hero";
import BentoHealth from "@/components/home/BentoHealth";
import { 
  ServerIcon, 
  CodeBracketIcon, 
  CloudIcon, 
  CommandLineIcon 
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 space-y-24">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. THE ACTIVE BENTO GRID */}
      <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* LARGE TILE: High-Performance Backend (The Go/Postgres Story) */}
        <div className="md:col-span-2 md:row-span-2 p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ServerIcon className="w-32 h-32 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Backend Architecture</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-xs">
            Engineering type-safe, high-concurrency systems using <span className="text-blue-400">Go</span> and <span className="text-emerald-400">PostgreSQL</span>. 
          </p>
          <ul className="space-y-2 text-xs font-mono text-white/50">
            <li>> Optimized Query Performance</li>
            <li>> Redis Caching Layer</li>
            <li>> Zod Schema Validation</li>
          </ul>
          <div className="mt-12 inline-flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
            Explore Systems _
          </div>
        </div>

        {/* MEDIUM TILE: System Health (DevOps) */}
        <div className="md:col-span-2 md:row-span-1">
          <BentoHealth />
        </div>

        {/* SMALL TILE: Cloud/DevOps */}
        <div className="md:col-span-1 p-6 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:bg-white/[0.02] transition-colors">
          <CloudIcon className="w-6 h-6 text-blue-500 mb-4" />
          <h4 className="text-white font-bold text-sm mb-1">Infrastructure</h4>
          <p className="text-[11px] text-slate-500 leading-tight">
            AWS Deployment, Dockerization, and GitHub Actions CI/CD.
          </p>
        </div>

        {/* SMALL TILE: Fullstack Edge */}
        <div className="md:col-span-1 p-6 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:bg-white/[0.02] transition-colors">
          <CodeBracketIcon className="w-6 h-6 text-emerald-500 mb-4" />
          <h4 className="text-white font-bold text-sm mb-1">MERN Expertise</h4>
          <p className="text-[11px] text-slate-500 leading-tight">
            Next.js 16 App Router & Responsive Tailwind interfaces.
          </p>
        </div>

      </section>

      {/* 3. THE "HUMAN EDGE" LOGIC (Minimalist Statement) */}
      <section className="py-20 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
              The Engineering Philosophy
            </h2>
            <p className="text-slate-400 leading-relaxed italic">
              "In an era where AI can generate snippets, my focus is on the **durability** of the system. I build software that doesn't just work on my machine, but scales reliably in production."
            </p>
          </div>
          <div className="bg-blue-500/5 p-8 rounded-2xl border border-blue-500/10">
            <div className="flex gap-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <code className="text-xs text-blue-300">
              const Engineer = {"{"} <br />
              &nbsp;&nbsp;name: "Mayur Pal", <br />
              &nbsp;&nbsp;focus: "Resilience over Hype", <br />
              &nbsp;&nbsp;current: "LPU_BTECH_CSE_Y3" <br />
              {"}"};
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}