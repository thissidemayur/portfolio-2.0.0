import { Layers, Zap, Cpu, Check, ArrowUpRight } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

const competencies = [
  {
    category: "Development",
    title: "Full-Stack Solutions",
    icon: <Layers className="text-blue-500" />,
    description:
      "I build your entire digital product from scratch. I handle the beautiful frontend you see and the powerful server logic you don't, ensuring they work together perfectly to serve your users.",
    features: [
      "User-Friendly Interfaces",
      "Search Engine (SEO) Ready",
      "Mobile-First Design",
      "Secure Login Systems",
    ],
    result: "A complete, high-performing website.",
  },
  {
    category: "Infrastructure",
    title: "Cloud & Reliability",
    icon: <Cpu className="text-purple-500" />,
    description:
      "I set up the 'digital foundation' for your app. Using industry leaders like AWS, I ensure your site stays online 24/7, handles traffic spikes, and updates automatically without breaking.",
    features: [
      "24/7 Server Reliability",
      "Automatic Security Updates",
      "Cloud Hosting Setup",
      "Scalable Architecture",
    ],
    result: "Zero-downtime & peace of mind.",
  },
  {
    category: "Performance",
    title: "Speed Optimization",
    icon: <Zap className="text-emerald-500" />,
    description:
      "A slow site loses customers. I optimize your backend using high-speed languages like Go and fine-tune your database to make sure your pages load instantly and your server costs stay low.",
    features: [
      "Lightning Fast Loading",
      "Database Performance Tuning",
      "Reduced Server Costs",
      "Code Efficiency Audits",
    ],
    result: "Max speed with minimum overhead.",
  },
];

export default function CompetencyMatrix() {
  return (
    <section className="mb-40 pt-20 border-t border-white/5">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
            Service <span className="text-blue-500">Offers</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg mt-4 leading-relaxed">
            I translate complex technical requirements into{" "}
            <span className="text-white">reliable business outcomes</span>.
            Whether you need an MVP or a system upgrade, I’ve got you covered.
          </p>
        </div>

        {/* Visual Badge for non-tech users */}
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
            Currently_Accepting_Projects
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {competencies.map((c) => (
          <MotionWrapper key={c.category}>
            <div className="group p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
              {/* Decorative Corner Icon */}
              <ArrowUpRight
                className="absolute top-8 right-8 text-white/5 group-hover:text-blue-500/40 transition-colors"
                size={24}
              />

              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                  {c.icon}
                </div>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold">
                  {c.category}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase italic mb-4 leading-none tracking-tight">
                {c.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">
                {c.description}
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {c.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <div className="p-0.5 rounded-full bg-blue-500/20">
                        <Check size={12} className="text-blue-500" />
                      </div>
                      <span className="text-[11px] font-bold text-white/70 uppercase tracking-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                    Outcome: {c.result}
                  </p>
                </div>
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
