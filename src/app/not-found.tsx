// app/not-found.tsx
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
      {/* Visual background element - Minimalist Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Large UI Indicator */}
        <div className="space-y-2">
         
          <h1 className="text-8xl font-black text-white tracking-tighter italic">
            404
          </h1>
          <h2 className="text-xl font-bold text-white/90 uppercase tracking-widest">
            Page Not Found
          </h2>
        </div>

        {/* Clear, Human-Readable Text */}
        <p className="text-slate-400 text-base leading-relaxed">
          It looks like the link you followed is broken or the page has been
          moved. Don&apos;t worry, my core systems are still running perfectly.
        </p>

        {/* The "Escape Hatch" - Clear CTA */}
        <div className="pt-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Safety
          </Link>
        </div>

        {/* Subtle Tech Branding */}
        <div className="pt-12 flex items-center justify-center gap-4 opacity-20">
          <div className="h-[1px] w-12 bg-white" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            Mayur_OS // v1.0.4
          </span>
          <div className="h-[1px] w-12 bg-white" />
        </div>
      </div>
    </main>
  );
}
