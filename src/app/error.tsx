"use client";

import { Terminal, RefreshCcw, Home, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Analytics/Logging
    console.error("SYSTEM_RUNTIME_EXCEPTION:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 mt-12">
      <div className="relative w-full max-w-2xl">
        {/* Background Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-2xl opacity-50" />

        <div className="relative bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-white/[0.03] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                System_Kernel_Panic
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12 font-mono">
            <div className="flex items-start gap-4 mb-8">
              <Terminal className="text-red-500 shrink-0 mt-1" size={20} />
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter italic">
                  Runtime_Error_Detected
                </h2>
                <div className="space-y-2">
                  <p className="text-white/40 text-xs leading-relaxed">
                    The requested data stream encountered an unhandled
                    exception. The bridge between the{" "}
                    <span className="text-white/60">Server_Actions</span> and
                    the <span className="text-white/60">Database_Layer</span>{" "}
                    has been severed.
                  </p>
                  <div className="py-2 px-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <code className="text-[10px] text-red-400/80 break-all">
                      &gt; Error_Digest: {error.digest || "0x000000_NULL"}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => reset()}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
              >
                <RefreshCcw
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                Retry_System_Sync
              </button>

              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.03] text-white/60 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95"
              >
                <Home size={14} />
                Return_To_Base
              </Link>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="px-6 py-3 bg-white/[0.01] border-t border-white/5 flex justify-between">
            <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
              Mayur_OS // Error_Code_42601
            </span>
            <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
              Status: Halted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
