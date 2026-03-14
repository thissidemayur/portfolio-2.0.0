import {  CheckCircle2, Clock } from "lucide-react";

export default function WorkStatus({ unread }: { unread: number }) {
  // We use the unread count to show that you are actively monitoring your inbox
  const isActivelyReviewing = unread > 0;

  return (
    <div className="h-full w-full p-6 flex flex-col justify-between bg-[#0a0a0a] group hover:border-blue-500/20 transition-all duration-500">
      {/* Status Header */}
      <div className="flex justify-between items-start">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <CheckCircle2
            size={18}
            className={isActivelyReviewing ? "animate-pulse" : ""}
          />
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#00FF94] uppercase tracking-tight">
            Available Now
          </span>
          <span className="text-[9px] block text-white/30 font-medium">
            Active Status
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-1">
        <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
          Career Status
        </h3>
        <div className="text-xl font-black text-white leading-tight uppercase italic">
          Open to <br />
          <span className="text-white/50 text-lg">Opportunities</span>
        </div>
      </div>

      {/* Services/Tags List */}
      <div className="flex flex-wrap gap-2 my-2">
        {["Freelance", "Internship", "Full-time"].map((type) => (
          <span
            key={type}
            className="text-[9px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60 group-hover:border-blue-500/30 transition-colors"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Response Time Footer */}
      <div className="pt-4 border-t border-white/5 space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-white/40">
            <Clock size={12} />
            <span>Avg. Response Time</span>
          </div>
          <span className="font-bold text-white">Under 24h</span>
        </div>
      </div>
    </div>
  );
}
