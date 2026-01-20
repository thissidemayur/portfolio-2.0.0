"use client";
import React, { useEffect, useState } from "react";
import { MapPin, ShieldCheck, Globe, Activity } from "lucide-react";

// Typescript interface for the IP API response
interface GeoData {
  ip: string;
  city: string;
  region: string;
  country_code: string;
  org: string;
}

export default function GeoNode() {
  const [data, setData] = useState<GeoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetching visitor location data
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <section className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-between group hover:border-blue-500/30 transition-all overflow-hidden relative shadow-2xl">
      {/* Visual Decorations */}
      <div
        className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-blue-500/5 rounded-full border border-blue-500/10 animate-pulse pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-[-10%] right-[0%] w-32 h-32 bg-blue-400/5 rounded-full border border-blue-400/5 animate-ping pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header: System Info */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <Globe size={16} className="text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">
                Identity_Scanner
              </span>
              <span className="text-[8px] font-mono text-blue-500/60 uppercase tracking-tighter">
                v.4.0.2
              </span>
            </div>
          </div>

          {!isLoading && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-500/80 uppercase">
                Established
              </span>
            </div>
          )}
        </header>

        {isLoading ? (
          <div className="space-y-4" aria-label="Loading identity data">
            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
            <div className="h-12 w-full bg-white/5 rounded animate-pulse" />
          </div>
        ) : (
          <article className="space-y-6">
            {/* Greeting Section */}
            <div className="group/greet">
              <p className="text-[9px] text-white/20 uppercase font-mono mb-1 tracking-[0.2em] group-hover/greet:text-blue-400/50 transition-colors">
                System_Handshake
              </p>
              <h4 className="text-xl font-bold text-white tracking-tight leading-tight">
                Hello, visitor from <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {data?.city || "Unknown City"}, {data?.country_code || "IN"}
                </span>
                .
              </h4>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/20">
                  <MapPin size={10} />
                  <p className="text-[8px] uppercase font-mono tracking-tighter">
                    Region_Data
                  </p>
                </div>
                <p className="text-[11px] text-white/70 font-medium">
                  {data?.region || "Unknown"}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/20">
                  <Activity size={10} />
                  <p className="text-[8px] uppercase font-mono tracking-tighter">
                    Gateway_ISP
                  </p>
                </div>
                <p className="text-[11px] text-white/70 font-medium truncate">
                  {data?.org?.split(" ")[0] || "Network"}
                </p>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* Footer: IP Display */}
      <footer className="relative z-10 pt-4 mt-2 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-blue-500/40" />
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
            Public_IP:
          </span>
          <output className="text-[10px] font-mono text-blue-400/80 font-bold tracking-wider">
            {data?.ip || "SCANNING..."}
          </output>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          <div className="h-1 w-1 bg-white/10 rounded-full" />
          <div className="h-1 w-1 bg-white/10 rounded-full" />
          <div className="h-1 w-1 bg-blue-500/40 rounded-full" />
        </div>
      </footer>

      {/* Decorative Scanline */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan"
        aria-hidden="true"
      />
    </section>
  );
}
