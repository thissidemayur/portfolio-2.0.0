"use client";
import { AlertCircle, MailX, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
// Path-based imports to minimize "Evaluate Script" time

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Specifically log if it's a Resend/Network failure
    console.error("CONTACT_DISRUPTION:", error);
  }, [error]);

  return (
    <div className="w-full bg-[#0A0A0A] border border-red-500/20 p-8 md:p-12 rounded-[3rem] flex flex-col items-center text-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
        <div className="relative h-20 w-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
          <MailX size={40} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white">
          Transmission_Failed
        </h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          The communication bridge (Resend) could not be established. Your
          message remains in the local buffer.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
        <button
          onClick={() => reset()}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl"
        >
          <RefreshCcw
            size={14}
            className="group-active:rotate-180 transition-transform duration-500"
          />
          Retry_Handshake
        </button>
      </div>

      <div className="pt-4 flex items-center gap-2 text-[9px] font-mono text-red-500/50 uppercase tracking-widest">
        <AlertCircle size={10} />
        Status_Code: {error.digest || "PROTOCOL_TIMEOUT"}
      </div>
    </div>
  );
}
