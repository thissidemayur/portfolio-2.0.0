"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  Award,
  FileText,
  Mail,
  Rss, // Replaced Monitor with Rss for Blog
} from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", icon: <Home size={18} />, href: "/" },
  { name: "About", icon: <User size={18} />, href: "/about" },
  { name: "Projects", icon: <Briefcase size={18} />, href: "/projects" },
  { name: "Certs", icon: <Award size={18} />, href: "/certifications" },
  { name: "Blog", icon: <Rss size={18} />, href: "/blogs" }, // Updated item
  { name: "Resume", icon: <FileText size={18} />, href: "/resume" },
  { name: "Contact", icon: <Mail size={18} />, href: "/contact" },
];

export function NavigationDock() {
  const pathname = usePathname();
const [mounted, setMounted] = React.useState(false);

React.useEffect(() => {
  setMounted(true);
}, []);
  return (
    <nav
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-fit"
      aria-label="Primary Navigation Dock"
    >
      <motion.div
        initial={
          !mounted
            ? { y: 100, opacity: 0 }
            : window.innerWidth < 768
              ? false
              : { y: 100, opacity: 0 }
        }
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-1.5 md:p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full md:rounded-[2rem] shadow-2xl"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href} className="group relative">
              <motion.div
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 md:p-4 rounded-full transition-colors ${
                  isActive
                    ? "text-blue-500 bg-white/5"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {item.icon}

                {isActive && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[9px] font-black uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {item.name}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 -z-10" />
                </span>
              </motion.div>
            </Link>
          );
        })}

        
      </motion.div>
    </nav>
  );
}
