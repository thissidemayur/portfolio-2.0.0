"use client";
import { useEffect, useState } from "react";
import { MapPin, GraduationCap, Clock, Coffee, Moon } from "lucide-react";

export default function LocationCard() {
  const [time, setTime] = useState<string>("");
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTime(formatter.format(now));

      // Professional Touch: Check if it's between 9 AM and 7 PM IST
      const hour = parseInt(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          hour12: false,
        }).format(now),
      );

      setIsWorking(hour >= 9 && hour <= 19);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full p-6 flex flex-col justify-between bg-[#0a0a0a] group hover:border-blue-500/20 transition-all duration-500">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <MapPin size={18} />
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <span
              className={`h-1.5 w-1.5 rounded-full ${isWorking ? "bg-[#00FF94]" : "bg-amber-500"}`}
            />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-tight">
              {isWorking ? "Available" : "Away"}
            </span>
          </div>
          <span className="text-[9px] block text-white/30 font-medium italic">
            Based in India
          </span>
        </div>
      </div>

      {/* Main Location Info */}
      <div className="space-y-1">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
          Operating From
        </h3>
        <div className="text-xl font-black text-white leading-tight uppercase italic">
          Jalandhar, <br />
          <span className="text-blue-500">Punjab</span>
        </div>
      </div>

      {/* Education / University */}
      <div className="flex items-center gap-3 py-3 border-t border-white/5 mt-2">
        <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
          <GraduationCap size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-tighter">
            University
          </span>
          <span className="text-[10px] text-white/80 font-medium leading-none">
            LPU, CSE &apos;26
          </span>
        </div>
      </div>

      {/* Local Time Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-white/40">
          {isWorking ? <Coffee size={12} /> : <Moon size={12} />}
          <span>Local Time</span>
        </div>
        <span className="text-[#00FF94] font-bold tabular-nums">
          {time || "--:--"}
        </span>
      </div>
    </div>
  );
}
