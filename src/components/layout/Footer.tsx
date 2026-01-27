import { Github, Linkedin, Mail, Terminal, Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-blue-500/5 blur-[120px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Terminal size={20} className="text-blue-500" />
              <span className="text-xl font-black text-white uppercase tracking-tighter">
                Mayur<span className="text-blue-500"> </span>PAL
              </span>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Architecting resilient systems and high-performance digital
              experiences with a focus on cloud-native infrastructure.
            </p>
          </div>

          {/* Quick Navigation */}
          <nav className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">
              Sitemap
            </h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <Link
                  href="/projects"
                  className="hover:text-blue-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-blue-400 transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social / Connect */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">
              Connect
            </h4>
            <address className="not-italic flex gap-4 text-white/40">
              <a
                href="https://github.com/thissidemayur"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
              
                href="mailto:your@email.com"
                aria-label="Email"
                className="hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </address>
          </div>
        </div>

        {/* Bottom Bar: System Metadata */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span suppressHydrationWarning>
              &copy; {"2026"} All Rights Reserved
            </span>
            <span className="hidden md:block">|</span>
            <span className="flex items-center gap-1.5">
              <Zap size={10} className="text-blue-500" />
              Status: Operational
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-white/10 uppercase">
            <span>Next.js 16</span>
            <span>•</span>
            <span>AWS_MUM_Node</span>
            <span>•</span>
            <span className="text-white/30">v2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
