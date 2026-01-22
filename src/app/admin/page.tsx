import { getMessages } from "@/dal/messages.dal";
import { getAllProjects } from "@/dal/projects.dal";
import { getAllBlog } from "@/dal/blogs.dal";
import { getAllTechnologies } from "@/dal/tech.dal";
import { getAllCertificates } from "@/dal/certificates.dal"; 
import {  ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { iCertificate, IMsg, iProject } from "@/types/database";

export default async function AdminDashboard() {
  // 2. Add certifications to the parallel fetch
  const [messages, projects, blogs, techs, certs] = await Promise.all([
    getMessages(),
    getAllProjects(),
    getAllBlog({ limit: 100, offset: 0 }),
    getAllTechnologies(),
    getAllCertificates(),
  ]);

  const unreadMessages = messages.filter((m: IMsg) => !m.is_read);
  const featuredProjects = projects.filter((p: iProject) => p.is_featured);
  const industryStandardCerts = certs.filter(
    (c: iCertificate) => c.is_industry_standard,
  );

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          System_Overview
        </h2>
        <p className="text-white/40 font-mono text-xs">
          Operational status of Mayur_OS
        </p>
      </header>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Projects"
          value={projects.length}
          subtext={`${featuredProjects.length} Featured`}
        />
        <StatCard title="Blogs" value={blogs.length} />
        {/* 3. New StatCard for Certificates */}
        <StatCard
          title="Certifications"
          value={certs.length}
          subtext={`${industryStandardCerts.length} Tier-1`}
        />
        <StatCard title="Stack Size" value={techs.length} />
        <StatCard
          title="Messages"
          value={unreadMessages.length}
          accent={unreadMessages.length > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Messages Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-mono uppercase text-white/20 tracking-widest">
            Recent_Signals
          </h3>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden">
            {unreadMessages.slice(0, 3).map((msg: IMsg) => (
              <div
                key={msg.id}
                className="p-6 border-b border-white/5 last:border-0 flex justify-between items-center group"
              >
                <div>
                  <p className="font-bold text-sm text-white/80">{msg.name}</p>
                  <p className="text-xs text-white/40 truncate max-w-[300px]">
                    {msg.subject}
                  </p>
                </div>
                <Link
                  href="/admin/messages"
                  className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
            {unreadMessages.length === 0 && (
              <p className="p-10 text-center text-xs text-white/20 font-mono">
                ALL_SIGNALS_PROCESSED
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase text-white/20 tracking-widest">
            Quick_Deploy
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <QuickActionLink
              href="/admin/projects/new"
              label="New Project"
              color="text-blue-400"
            />
            <QuickActionLink
              href="/admin/blogs/new"
              label="Write Blog"
              color="text-purple-400"
            />
            {/* 4. New QuickActionLink for Certs */}
            <QuickActionLink
              href="/admin/certifications/new"
              label="Add Credential"
              color="text-emerald-400"
            />
            <QuickActionLink
              href="/admin/tech"
              label="Add Skill"
              color="text-[#00FF94]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components (QuickActionLink, StatCard) remain the same...
function StatCard({
  title,
  value,
  subtext,
  accent,
}: {
  title: string;
  value: number;
  subtext?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative group p-6 bg-[#0A0A0A] border rounded-[1.5rem] transition-all duration-500 ${
        accent
          ? "border-[#00FF94]/30 bg-[#00FF94]/[0.02] shadow-[0_0_20px_rgba(0,255,148,0.05)]"
          : "border-white/5 hover:border-white/10"
      }`}
    >
      {/* Background Decor */}
      <div className="absolute top-4 right-4 text-[8px] font-mono text-white/5 uppercase tracking-widest group-hover:text-white/10 transition-colors">
        Node_01
      </div>

      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
        {title}
      </p>

      <div className="flex items-baseline gap-2">
        <p
          className={`text-4xl font-black tracking-tighter italic ${
            accent ? "text-[#00FF94]" : "text-white"
          }`}
        >
          {value.toString().padStart(2, "0")}
        </p>

        {subtext && (
          <p className="text-[10px] text-white/20 font-mono uppercase italic">
            {" // "}
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

function QuickActionLink({
  href,
  label,
  color,
}: {
  href: string;
  label: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-5 bg-[#0A0A0A] border border-white/5 rounded-2xl transition-all duration-300 group hover:bg-white/[0.02] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-1 h-4 rounded-full bg-current ${color} opacity-40 group-hover:opacity-100 transition-opacity`}
        />
        <span
          className={`text-[11px] font-black uppercase tracking-widest ${color}`}
        >
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[8px] font-mono text-white/0 group-hover:text-white/20 transition-all uppercase tracking-widest">
          Deploy_Now
        </span>
        <Plus
          size={16}
          className="text-white/20 group-hover:text-white group-hover:rotate-90 transition-all duration-300"
        />
      </div>
    </Link>
  );
}