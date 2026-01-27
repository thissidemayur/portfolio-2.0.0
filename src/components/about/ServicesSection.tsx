// app/about/ServicesSection.tsx
import { Layout, Terminal, Cpu, Zap } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

const services = [
  {
    title: "SaaS Development",
    icon: <Layout className="text-blue-500" />,
    desc: "High-performance SEO-first web apps.",
  },
  {
    title: "Systems & CLI Tools",
    icon: <Terminal className="text-emerald-500" />,
    desc: "Fast, reliable Go backend systems.",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cpu className="text-purple-500" />,
    desc: "AWS infrastructure with CI/CD.",
  },
];

export default function ServicesSection() {
  return (
    <section className="mb-40 border-t border-white/5 pt-20">
      <h2 className="text-4xl font-black uppercase italic mb-16">
        Professional Services
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <MotionWrapper key={s.title}>
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
              <div className="mb-6">{s.icon}</div>
              <h3 className="text-xl font-black uppercase italic mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
