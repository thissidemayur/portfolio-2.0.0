export default function FooterCTA() {
  return (
    <section className="py-32 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0a] p-12 md:p-24 shadow-2xl">
        {/* Subtle Background Glow - Replace the solid blue */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.4em]">
              System_Status: Open_for_Collaboration
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
            Ready to scale <br />
            your_vision<span className="text-blue-600">.</span>
          </h2>

          <p className="text-white/40 font-mono text-sm max-w-md leading-relaxed uppercase tracking-tight">
            Currently accepting high-impact projects and full-stack engineering
            roles. Let&apos;s talk infrastructure.
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            {/* High Contrast Primary Button */}
            <a
              href="mailto:thissidemayur@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500"
            >
              Drop_an_Email
              <div className="w-2 h-2 bg-black group-hover:bg-white rounded-full" />
            </a>

            {/* Subtle Ghost Button */}
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent border border-white/10 text-white/50 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-white hover:text-white transition-all duration-300"
            >
              Book_a_Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
