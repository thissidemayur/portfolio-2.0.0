"use client";
import { motion } from "framer-motion";
import { Zap, Layout, Terminal, Cpu } from "lucide-react";

const services = [
  {
    title: "SaaS Development",
    category: "Full-Stack / Next.js 15",
    desc: "Building SEO-optimized, client-heavy applications. I solve performance and indexing issues found in standard React apps.",
    icon: <Layout className="text-blue-500" />,
    features: ["Custom Dashboards", "NextAuth Security", "API Orchestration"],
    tag: "Enterprise",
  },
  {
    title: "Systems & CLI Tools",
    category: "GoLang / Backend",
    desc: "High-performance backend systems and terminal tools. Optimized for speed and low-latency developer workflows.",
    icon: <Terminal className="text-emerald-500" />,
    features: ["Custom CLI TUI", "Go Routines", "System Automation"],
    tag: "High Performance",
  },
  {
    title: "Cloud & DevOps",
    category: "AWS / Docker",
    desc: "Architecting cloud infrastructure for 99.9% uptime. Professional deployment from localhost to production.",
    icon: <Cpu className="text-purple-500" />,
    features: ["AWS S3/EC2/ECS", "CI/CD Pipelines", "Containerization"],
    tag: "Scalable",
  },
];

export default function ServiceMatrix() {
  return (
    <section className="mb-40 pt-20 border-t border-white/5">
      <div className="mb-16 border-l-4 border-emerald-500 pl-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic">
          Professional <span className="text-white/20">Services</span>
        </h2>
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] font-black">
          Freelance_Offerings_By_@thissidemayur
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-emerald-500/30 transition-all duration-500"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500/10 transition-colors">
              {service.icon}
            </div>

            <div className="space-y-4">
              <span className="text-[9px] font-mono font-black px-3 py-1 bg-white/5 rounded-full text-white/40 uppercase tracking-widest">
                {service.tag}
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                {service.desc}
              </p>

              <ul className="pt-6 space-y-3 border-t border-white/5">
                {service.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest"
                  >
                    <Zap size={10} className="text-emerald-500" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
