import React from "react";
import { Cpu } from "lucide-react";

export default function DeploymentLog() {
  return (
    <section className="p-10 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] font-mono text-[11px] space-y-4">
      <div className="flex items-center gap-2 text-white/20 mb-4 border-b border-white/5 pb-4">
        <Cpu size={14} />
        <span className="uppercase tracking-widest">
          System_Deployment_Logs
        </span>
      </div>

      <pre className="space-y-2 whitespace-pre-wrap">
        <p className="text-emerald-500">
          <span className="opacity-50">
            [{new Date().toLocaleDateString()}]
          </span>{" "}
          [INFO] Containerizing application with Docker/Podman...
        </p>
        <p className="text-blue-500">
          <span className="opacity-50">[OK]</span> Fedora-Based Environment
          Verified.
        </p>
        <p className="text-white/40">
          <span className="opacity-50">[SUCCESS]</span> Build complete. Ready
          for production scale.
        </p>
      </pre>
    </section>
  );
}
