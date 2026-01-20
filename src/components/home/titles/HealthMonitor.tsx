// src/components/home/tiles/HealthMonitor.tsx

// Define the shape of our health data for better maintenance
type HealthMetric = {
  id: number;
  height: number;
};

const MOCK_METRICS: HealthMetric[] = [
  { id: 1, height: 30 },
  { id: 2, height: 60 },
  { id: 3, height: 45 },
  { id: 4, height: 90 },
  { id: 5, height: 100 },
  { id: 6, height: 40 },
  { id: 7, height: 70 },
];

export default function HealthMonitor() {
  return (
    <section
      className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-between group hover:border-emerald-500/30 transition-all shadow-xl"
      aria-labelledby="system-health-title"
    >
      {/* HEADER: Uptime Information */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <p
            id="system-health-title"
            className="text-[10px] text-white/40 uppercase tracking-widest font-mono"
          >
            Service Status
          </p>
          <h4 className="text-white font-bold text-lg tracking-tight">
            99.9% Uptime
          </h4>
        </div>
        {/* Status Indicator Dot */}
        <div
          className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-pulse"
          role="status"
          aria-label="System Online"
        />
      </header>

      {/* VISUALIZATION: Performance Graph */}
      <figure className="flex items-end gap-1 h-12 my-4" aria-hidden="true">
        {MOCK_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="flex-1 bg-white/5 rounded-t-sm group-hover:bg-emerald-500/20 transition-all duration-500 ease-in-out"
            style={{ height: `${metric.height}%` }}
          />
        ))}
      </figure>

      {/* FOOTER: Technical Specs */}
      <footer className="text-[10px] font-mono text-white/20 flex justify-between border-t border-white/5 pt-3">
        <span className="flex items-center gap-1">
          <span className="text-emerald-500/40">●</span> LATENCY: 24MS
        </span>
        <span className="uppercase">NODE: AWS_MUM</span>
      </footer>
    </section>
  );
}
