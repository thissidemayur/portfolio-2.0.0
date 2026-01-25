import { ArrowLeft, Radio } from "lucide-react";

export default function MessagesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 animate-pulse">
      {/* SYSTEM NAVIGATION SKELETON */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft size={14} className="text-white/10" />
          <div className="h-3 w-24 bg-white/5 rounded" />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Radio size={12} className="text-white/10" />
          <div className="h-3 w-32 bg-white/5 rounded" />
        </div>
      </div>

      {/* HEADER SKELETON */}
      <header className="space-y-4">
        <div className="h-12 md:h-16 w-3/4 md:w-1/2 bg-white/10 rounded-xl" />
        <div className="h-3 w-48 bg-white/5 rounded" />
      </header>

      {/* MESSAGES LIST SKELETON */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-[2rem] p-6 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            {/* Status Indicator Circle */}
            <div className="w-3 h-3 rounded-full bg-white/10 shrink-0" />

            {/* User Info Block */}
            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center gap-3">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/5 rounded" />
              </div>
              <div className="h-5 w-1/2 bg-white/5 rounded-md" />
            </div>

            {/* Timestamp & Meta Block */}
            <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
              <div className="h-3 w-20 bg-white/5 rounded" />
              <div className="h-8 w-8 bg-white/5 rounded-lg ml-auto md:ml-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
