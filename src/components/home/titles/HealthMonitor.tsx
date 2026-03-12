const getHourlyMetrics = () => {
  const hour = new Date().getHours();
  const day = new Date().getDate();
  const seed = hour + day; 

  return Array.from({ length: 7 }, (_, i) => ({
    id: i,
    height: Math.floor(((Math.sin(seed + i) + 1) / 2) * 60) + 40,
  }));
};

export default function HealthMonitor() {
  const metrics = getHourlyMetrics();

  return (
    <section
      className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-between group hover:border-emerald-500/30 transition-all shadow-xl"
      aria-labelledby="system-health-title"
    >
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <p
            id="system-health-title"
            className="text-[10px] text-white/40 uppercase tracking-widest font-mono"
          >
            Service Level Agreement
          </p>
          <h4 className="text-white font-bold text-lg tracking-tight">
            99.9% Uptime{" "}
            <span className="text-[10px] text-emerald-500/50 font-mono ml-2">
              GA
            </span>
          </h4>
        </div>
        <div
          className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-pulse"
          role="status"
          aria-label="System Online"
        />
      </header>

      <figure className="flex items-end gap-1.5 h-16 my-4" aria-hidden="true">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="flex-1 bg-white/5 rounded-t-[2px] group-hover:bg-emerald-500/20 transition-all duration-700 ease-in-out relative overflow-hidden"
            style={{ height: `${metric.height}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </figure>

      <footer className="text-[10px] font-mono text-white/20 flex justify-between border-t border-white/5 pt-3">
        <span className="flex items-center gap-1">
          <span className="text-emerald-500 animate-pulse">●</span>
          LATENCY: <span className="text-white/60">24MS</span>
        </span>
        <span className="uppercase tracking-tighter">
          REGION: <span className="text-white/60">AWS_MUM_1</span>
        </span>
      </footer>
    </section>
  );
}
