import {
  MessageSquare,
  Award,
  BookOpen,
  FolderCode,
  Activity,
} from "lucide-react";

export default function SystemStats({ messages, certs, blogs, projects }: any) {
  const statItems = [
    {
      label: "Total Projects",
      val: projects.total,
      icon: FolderCode,
      color: "text-blue-500",
    },
    {
      label: "Blog Posts",
      val: blogs.total,
      icon: BookOpen,
      color: "text-purple-500",
    },
    {
      label: "Certifications",
      val: certs,
      icon: Award,
      color: "text-amber-500",
    },
    {
      label: "Recieved Messages",
      val: messages.total,
      icon: MessageSquare,
      color: "text-[#00FF94]",
    },
  ];

  return (
    <div className="h-full w-full p-8 flex flex-col justify-between group">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00FF94]">
            <Activity size={16} className="animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/50">
              Live Dashboard
            </span>
          </div>
          <h2 className="text-2xl font-black italic uppercase text-white">
            Portfolio <span className="text-white/40">Statistics</span>
          </h2>
        </div>
        <div className="text-[10px] font-mono text-white/30 bg-white/5 px-3 py-1 rounded-md border border-white/10">
          Data cached for 15m
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 my-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <item.icon size={14} className={item.color} />
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-tight">
                {item.label}
              </span>
            </div>
            <div className="text-3xl font-black text-white tabular-nums">
              {item.val.toString().padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>

  
    </div>
  );
}
