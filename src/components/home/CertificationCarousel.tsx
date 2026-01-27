"use client";
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BadgeCheck,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { iCertificate } from "@/types/database";

export default function CertificationCarousel({ certs }: { certs: iCertificate[] }) {
  // Start at the first item
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % certs.length);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + certs.length) % certs.length);

  // Memoized indices for the 3 visible cards
  const visibleIndices = useMemo(() => {
    if (certs.length === 0) return [];
    if (certs.length === 1) return [0, 0, 0];
    return [
      (currentIndex - 1 + certs.length) % certs.length,
      currentIndex,
      (currentIndex + 1) % certs.length,
    ];
  }, [currentIndex, certs.length]);

  return (
    <section className="relative py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* GLOWING AMBIENT BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full -z-10" />

      <header className="mb-16 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BadgeCheck className="text-emerald-500" size={20} />
          <span className="text-xs font-mono text-emerald-500 uppercase tracking-[0.5em] font-black">
            Credential_Vault
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
          Industry <span className="text-white/20">Certifications</span>
        </h2>
      </header>

      <div className="relative h-[500px] w-full max-w-[1000px] flex items-center justify-center">
        {/* CONTROLS */}
        <nav className="absolute inset-0 flex items-center justify-between z-40 pointer-events-none">
          <button
            onClick={handlePrev}
            className="pointer-events-auto p-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-emerald-500/20 group transition-all"
          >
            <ChevronLeft className="text-white group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto p-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-emerald-500/20 group transition-all"
          >
            <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </nav>

        {/* CAROUSEL TRACK */}
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleIndices.map((index, i) => {
            const item = certs[index];
            const isMain = i === 1;

            return (
              <motion.article
                key={`${item.id}-${i}`}
                className="absolute w-[300px] md:w-[400px] h-[450px] rounded-[3rem] border border-white/5 overflow-hidden bg-[#0a0a0a]"
                animate={{
                  x: i === 0 ? "-75%" : i === 1 ? "0%" : "75%",
                  scale: isMain ? 1 : 0.8,
                  rotateY: i === 0 ? 30 : i === 1 ? 0 : -30,
                  filter: isMain ? "blur(0px)" : "blur(8px)",
                  opacity: isMain ? 1 : 0.3,
                  zIndex: isMain ? 10 : 1,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <div className="w-full h-full relative">
                  <Image
                    fill
                    src={item.image_url || "/placeholder.jpg"}
                    className="object-cover opacity-60"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent" />

                  <div
                    className={`absolute bottom-0 p-10 w-full transition-all duration-700 ${isMain ? "opacity-100" : "opacity-0 translate-y-10"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="text-emerald-500" size={14} />
                      <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">
                        {item.issuer}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-6 italic">
                      {item.title}
                    </h3>
                    <a
                      href={item.verify_link as string}
                      target="_blank"
                      className="bg-emerald-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase inline-block"
                    >
                      Verify
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
