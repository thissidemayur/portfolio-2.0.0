"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderCode,
  PenTool,
  Cpu,
  MessageSquare,
  FileText,
  Menu,
  X,
  CreditCardIcon,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: <FolderCode size={20} />,
  },
  { label: "Blogs", href: "/admin/blogs", icon: <PenTool size={20} /> },
  { label: "Stack", href: "/admin/tech", icon: <Cpu size={20} /> },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: <MessageSquare size={20} />,
  },
  {
    label: "Certificates",
    href: "/admin/certifications",
    icon: <CreditCardIcon size={20} />,
  },
  { label: "Resumes", href: "/admin/resumes", icon: <FileText size={20} /> },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[110] p-2 bg-white text-black rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[100] w-64 bg-[#0A0A0A] border-r border-white/5 transform transition-transform duration-300
        lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-black italic tracking-tighter uppercase">
            Admin_<span className="text-[#00FF94]">OS</span>
          </h1>
          <p className="text-[10px] font-mono text-white/20 mt-1">
            v1.0.4-INTERNAL
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${
                    isActive
                      ? "bg-[#00FF94] text-black shadow-[0_0_15px_rgba(0,255,148,0.2)]"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center justify-center w-full py-3 rounded-xl border border-white/10 text-xs font-bold text-white/30 hover:bg-white/5"
          >
            Exit to Portfolio
          </Link>
        </div>
      </aside>
    </>
  );
}
