"use client";

import { useMemo } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";
import * as SimpleIcons from "simple-icons";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "nodedotjs",
  "postgresql",
  "prisma",
  "docker",
  "amazonaws",
  "nginx",
  "git",
  "github",
  "figma",
  "tailwindcss",
  "framer",
  "visualstudiocode",
  "linux",
  "mongodb",
  "express",
  "redis",
  "python",
  "go",
  "kubernetes",
  "firebase",
  "vercel",
];

export function TechOrbital() {
  const icons = useMemo(() => {
    return slugs
      .map((slug) => {
        // Find the icon object by searching for the matching slug
        const icon = Object.values(SimpleIcons).find((i) => i.slug === slug);

        if (!icon) return null;

        /**
         * icon.hex gives the official brand color (e.g., "3178C6")
         * We use %23 (the URL-encoded version of #) to set the fill color.
         */
        return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23${icon.hex}'><path d='${icon.path}'/></svg>`;
      })
      .filter(Boolean) as string[];
  }, []);

  return (
    <div className="relative flex size-full items-center justify-center bg-transparent">
      {/* Background Depth Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] border border-white/5 rounded-full" />
        <div className="w-[450px] h-[450px] border border-white/[0.02] rounded-full absolute" />
      </div>

      <div className="z-10 w-full max-w-[400px]">
        <IconCloud images={icons} />
      </div>

      {/* Professional System Labels */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">
            Tech_Stack_Engine
          </p>
        </div>
        <p className="text-[9px] font-mono text-white/20 uppercase pl-3">
          Verifying_Production_Dependencies...
        </p>
      </div>
    </div>
  );
}
