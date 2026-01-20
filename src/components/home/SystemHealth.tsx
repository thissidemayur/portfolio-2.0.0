"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Cpu, HardDrive, Zap } from "lucide-react";

export default function SystemHealth() {
  const [uptime, setUptime] = useState("99.982%");
  const [latency, setLatency] = useState(24);

  // Simulate live jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (32 - 18) + 18));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    {
      name: "CarbonTrack_API",
      status: "Operational",
      load: "12%",
      region: "AWS_MUM",
    },
    {
      name: "GeoNode_Edge",
      status: "Operational",
      load: "4%",
      region: "Vercel_Global",
    },
    {
      name: "Auth_Gateway",
      status: "Operational",
      load: "28%",
      region: "AWS_ACR",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto font-mono">
      {/* 1. TOP METRICS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Sys_Uptime",
            value: uptime,
            icon: <Activity className="text-emerald-500" size={14} />,
          },
          {
            label: "Avg_Latency",
            value: `${latency}ms`,
            icon: <Zap className="text-yellow-500" size={14} />,
          },
          {
            label: "Commits_2026",
            value: "499",
            icon: <Cpu className="text-blue-500" size={14} />,
          },
          {
            label: "Security_Level",
            value: "TLS_1.3",
            icon: <ShieldCheck className="text-purple-500" size={14} />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2 text-white/20 uppercase text-[9px] tracking-widest">
              {stat.icon} {stat.label}
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. LIVE NODE MONITOR */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <HardDrive size={16} className="text-blue-500" />
            Distributed_Node_Registry
          </h3>
          <div className="space-y-4">
            {nodes.map((node, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-blue-500/30 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white/90">
                    {node.name}
                  </span>
                  <span className="text-[9px] text-white/20 uppercase tracking-tighter">
                    {node.region}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[9px] text-white/20 uppercase">Load</p>
                    <p className="text-[10px] text-white/60">{node.load}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-500 font-bold">
                    {node.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Decorative Graph Line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        {/* 3. VERIFIED STACK PULSE */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
            Security_Clearance
          </h3>
          <ul className="space-y-3 text-[10px] text-white/40 uppercase tracking-widest">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-emerald-500 rounded-full" />
              TCP/IP_Verified [U_Colorado]
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-emerald-500 rounded-full" />
              Microarchitecture_Stable [Princeton]
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-blue-500 rounded-full" />
              Blockchain_Handshake [Cyfrin]
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-blue-500 rounded-full" />
              NoCode_GenAI_Active [Infosys]
            </li>
          </ul>
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-[9px] mb-2 leading-relaxed">
              LPU Academic Cluster status:{" "}
              <span className="text-emerald-500 font-bold">OPTIMAL</span>
            </p>
            <p className="text-[9px] leading-relaxed">
              B.Tech CSE Year 3:{" "}
              <span className="text-blue-400">Term_6_Active</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
