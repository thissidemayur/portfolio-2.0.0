"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SystemBridge() {
  // SVG Paths for data travel
  const aiToLogicPath = "M 200 225 L 320 225 L 380 185";
  const logicToDbPath = "M 620 185 L 680 225 L 800 225";

  return (
    <figure className="relative w-full h-[500px] bg-[#020202] rounded-[3.5rem] border border-white/10 overflow-hidden flex items-center justify-center shadow-inner">
      {/* 1. DEPTH LAYERS (Background) */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* 2. THE SYSTEM ARCHITECTURE (SVG) */}
      <svg
        width="1000"
        height="450"
        viewBox="0 0 1000 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
      >
        <defs>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- PHYSICAL TRACES (Motherboard Lines) --- */}
        <g opacity="0.3">
          <path
            d={aiToLogicPath}
            stroke="url(#traceGradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={logicToDbPath}
            stroke="url(#traceGradient)"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* --- ANIMATED DATA FLOW --- */}
        {/* Rapid Blue Packets */}
        {[0, 0.8, 1.6].map((delay) => (
          <circle
            key={`data-in-${delay}`}
            r="3"
            fill="#3b82f6"
            filter="url(#neonGlow)"
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={aiToLogicPath}
              begin={`${delay}s`}
            />
          </circle>
        ))}

        {/* Processed Green Packets */}
        <circle r="4" fill="#10b981" filter="url(#neonGlow)">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path={logicToDbPath}
            begin="1s"
          />
        </circle>

        {/* --- NODE 1: AI_CLUSTER (Glass Container) --- */}
        <g transform="translate(40, 150)">
          <rect
            width="160"
            height="150"
            rx="24"
            fill="white"
            fillOpacity="0.03"
            stroke="white"
            strokeOpacity="0.1"
          />
          <text
            x="80"
            y="130"
            textAnchor="middle"
            fill="#3b82f6"
            fontSize="12"
            fontWeight="900"
            fontFamily="monospace"
            className="tracking-widest"
          >
            AI_INPUT
          </text>
          {/* Animated Server Blips */}
          <rect
            x="65"
            y="40"
            width="30"
            height="60"
            rx="4"
            fill="#3b82f6"
            fillOpacity="0.1"
          />
          <motion.circle
            cx="80"
            cy="70"
            r="15"
            fill="#3b82f6"
            fillOpacity="0.2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>

        {/* --- NODE 2: THE CORE (Hexagonal Logic) --- */}
        <g transform="translate(390, 100)">
          <motion.path
            d="M 44 0 L 176 0 L 220 88 L 176 176 L 44 176 L 0 88 Z"
            fill="#050505"
            stroke="#3b82f6"
            strokeWidth="2"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text
            x="110"
            y="85"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="4"
          >
            CORE
          </text>
          <text
            x="110"
            y="105"
            textAnchor="middle"
            fill="#3b82f6"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            SYSTEM_ORCHESTRATOR
          </text>

          {/* Radar Sweep Animation */}
          <motion.line
            x1="110"
            y1="88"
            x2="110"
            y2="10"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ transformOrigin: "110px 88px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* --- NODE 3: DATABASE (The Vault) --- */}
        <g transform="translate(780, 160)">
          <rect
            width="140"
            height="130"
            rx="24"
            fill="white"
            fillOpacity="0.03"
            stroke="white"
            strokeOpacity="0.1"
          />
          <circle cx="70" cy="55" r="30" fill="#10b981" fillOpacity="0.1" />
          <motion.path
            d="M 55 55 L 85 55 M 70 40 L 70 70"
            stroke="#10b981"
            strokeWidth="2"
            animate={{ rotate: 45 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <text
            x="70"
            y="110"
            textAnchor="middle"
            fill="#10b981"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            SYNC_STABLE
          </text>
        </g>
      </svg>

      {/* 3. INTERFACE OVERLAYS (The "HUD" look) */}
      <div className="absolute top-10 left-10 font-mono text-[8px] text-blue-500/40 space-y-1">
        <p>PROTOCOL: TLS_1.3</p>
        <p>ENCRYPTION: AES_256</p>
        <p>STATUS: OPTIMIZING...</p>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-6">
        <div className="text-right">
          <p className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]">
            Node_Security
          </p>
          <p className="text-[10px] font-mono text-emerald-500 font-bold tracking-widest italic animate-pulse">
            ENCRYPTED
          </p>
        </div>
        <div className="h-8 w-[1px] bg-white/10" />
        <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all active:scale-95 group">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <figcaption className="sr-only">
        A technical diagram showing AI input flowing into a central logic core
        and syncing with a database.
      </figcaption>
    </figure>
  );
}
