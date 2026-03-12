import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative p-12 md:p-20 bg-white/[0.02] border border-white/10 rounded-[4rem] text-center overflow-hidden">
      {/* Visual background glow for impact */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/10 blur-[100px] -z-10" />

      <header className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
          Ready to <span className="text-blue-500">Collaborate?</span>
        </h2>

        <p className="text-gray-400 text-lg font-medium">
          Whether you&apos;re looking for a{" "}
          <span className="text-white">Full-Stack Freelancer</span> to build
          your next SaaS or a <span className="text-white">DevOps Intern</span>{" "}
          for your engineering team—let&apos;s discuss how I can add value to
          your system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/contact"
            className="group px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3"
          >
            Get in Touch{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* Secondary Action: External Resume or Email */}
          <a
            href="mailto:thissidemayur@gmail.com"
            className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <Mail size={16} className="text-blue-500" /> Direct Email
          </a>
        </div>
      </header>

      <footer className="mt-12 pt-8 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-8 opacity-40">
          <span className="text-[9px] font-mono uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
            Available_For_Freelance_2026
          </span>
          <span className="text-[9px] font-mono uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />{" "}
            Seeking_Summer_Internships
          </span>
        </div>
      </footer>
    </section>
  );
}
