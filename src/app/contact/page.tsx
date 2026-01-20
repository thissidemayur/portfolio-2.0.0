import { Metadata } from "next";
import ContactForm from "@/components/contact/contactform";
import { MapPin, Clock, Github, Linkedin, Mail } from "lucide-react";



 import { Instagram, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    icon: <Github size={18} />,
    href: "https://github.com/thissidemayur",
    color: "#fff",
  },
  {
    label: "LinkedIn",
    icon: <Linkedin size={18} />,
    href: "https://linkedin.com/in/thissidemayur",
    color: "#0077B5",
  },
  {
    label: "X (Twitter)",
    icon: <Twitter size={18} />, // Lucide uses Twitter icon for X
    href: "https://x.com/thissidemayur",
    color: "#1DA1F2", // Classic Twitter Blue or use #fff for a modern X look
  },
  {
    label: "Instagram",
    icon: <Instagram size={18} />,
    href: "https://instagram.com/thissidemayur",
    color: "#E4405F",
  },
  {
    label: "Email",
    icon: <Mail size={18} />,
    href: "mailto:thissidemayur@gmail.com",
    color: "#EA4335",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-8 pb-24 px-6 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER: Clean & Human-Friendly */}
        <header className="mb-16 border-b border-white/5 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              Let&lsquo;s <span className="text-emerald-500">Connect</span>
            </h1>
            <p className="text-gray-400 max-w-xl text-lg font-medium">
              Whether you have a job opportunity or a technical question, my
              inbox is always open. I’ll get back to you as soon as possible!
            </p>
            <div className="flex flex-wrap gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <MapPin size={12} className="text-blue-500" /> Punjab, India
              </span>
              <span className="flex items-center gap-2">
                <Clock size={12} className="text-emerald-500" /> Response:
                Within 24 Hours
              </span>
            </div>
          </div>

          <div className="text-right hidden md:block">
            <p className="text-[10px] font-mono text-white/20 uppercase">
              Current_Status:
            </p>
            <p className="text-white font-bold uppercase italic text-sm">
              Ready for Internships 2026
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT: SOCIAL LINKS */}
          <aside className="lg:col-span-4 space-y-8">
            <h3 className="text-xs font-mono font-black text-white/20 uppercase tracking-[0.4em]">
              Quick_Links
            </h3>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span style={{ color: link.color }}>{link.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white">
                      {link.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </aside>

          {/* RIGHT: THE TERMINAL + FORM CONTAINER */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
