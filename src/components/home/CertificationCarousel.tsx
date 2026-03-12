"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BadgeCheck,
  Shield,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { iCertificate } from "@/types/database";

export default function CertificationCarousel({
  certs,
}: {
  certs: iCertificate[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % certs.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + certs.length) % certs.length);

  const currentCert = certs[currentIndex];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#050505]">
      {/* BACKGROUND GRID DECOR */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">

            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
              Certifications <span className="text-white/20"></span>
            </h2>
          </div>

          {/* CUSTOM CONTROLS */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <ChevronLeft
                className="text-white/40 group-hover:text-emerald-500"
                size={20}
              />
            </button>
            <div className="text-center min-w-[60px]">
              <span className="text-emerald-500 font-mono text-sm font-bold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-white/20 font-mono text-sm">
                {" "}
                / {String(certs.length).padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={handleNext}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <ChevronRight
                className="text-white/40 group-hover:text-emerald-500"
                size={20}
              />
            </button>
          </div>
        </header>

        {/* MAIN LANDSCAPE SLIDE */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* LANDSCAPE IMAGE AREA */}
              <div className="relative aspect-[16/10] w-full rounded-[2rem] border border-white/10 overflow-hidden bg-white/5 group">
                <Image
                  fill
                  src={currentCert.image_url || "/placeholder-cert.jpg"}
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  alt={currentCert.title}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-transparent opacity-60" />

                {/* FLOATING BADGE */}
                <div className="absolute top-6 right-6 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <Shield className="text-emerald-500" size={24} />
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest">
                      {currentCert.issuer}
                    </span>
                    {currentCert.is_industry_standard && (
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        {"//"} Industry_Standard
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase italic">
                    {currentCert.title}
                  </h3>

                  <div className="flex items-center gap-6 text-white/40">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-emerald-500/50" />
                      <span className="text-xs font-mono uppercase tracking-tighter">
                        Issued:{" "}
                        {new Date(currentCert.issue_date).toLocaleDateString(
                          "en-US",
                          { month: "short", year: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
                  <a
                    href={currentCert.verify_link || "#"}
                    target="_blank"
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                  >
                    VERIFY_CREDENTIAL
                    <ExternalLink size={14} />
                  </a>
                  {currentCert.credential_url && (
                    <a
                      href={currentCert.credential_url}
                      target="_blank"
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                      DETAILS
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
