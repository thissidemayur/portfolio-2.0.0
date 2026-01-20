"use client";
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BadgeCheck,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// 1. WHY: Strict Interface
// BENEFIT: Ensures all certificate data follows the same schema for reliable rendering.
interface Certification {
  id: number;
  title: string;
  issuer: string;
  image: string;
  link: string;
  date: string;
  idCode: string;
}

const CERT_ITEMS: Certification[] = [
  {
    id: 1,
    title: "Computational Theory: Language Principle & Finite Automata",
    issuer: "Infosys Springboard",
    image: "/certs/automata.jpg",
    link: "https://verify.onwingspan.com",
    date: "Aug 11, 2025",
    idCode: "INF-39281",
  },
  {
    id: 2,
    title: "Build Generative AI Apps & Solutions",
    issuer: "Infosys Springboard",
    image: "/certs/genai.png",
    link: "https://verify.onwingspan.com",
    date: "Aug 16, 2025",
    idCode: "INF-001C3",
  },
  {
    id: 3,
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    image: "/certs/postman.jpg",
    link: "https://badgr.com/public/assertions/...",
    date: "May 16, 2025",
    idCode: "IA6_OOSJRL",
  },
  {
    id: 4,
    title: "Introduction to Software Engineering",
    issuer: "IBM via Coursera",
    image: "/certs/ibm.jpg",
    link: "https://coursera.org/verify/...",
    date: "Sep 27, 2024",
    idCode: "IBM-SE-991",
  },
];

export default function CertificationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % CERT_ITEMS.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + CERT_ITEMS.length) % CERT_ITEMS.length,
    );

  // 2. WHY: Memoized Indices
  // BENEFIT: Calculates the visible set only when the index changes.
  const visibleIndices = useMemo(
    () => [
      (currentIndex - 1 + CERT_ITEMS.length) % CERT_ITEMS.length,
      currentIndex,
      (currentIndex + 1) % CERT_ITEMS.length,
    ],
    [currentIndex],
  );

  return (
    <section
      className="relative py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      aria-labelledby="cert-title"
    >
      {/* GLOWING AMBIENT BACKGROUND */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full -z-10"
        aria-hidden="true"
      />

      {/* HEADER: Credential Context */}
      <header className="mb-16 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BadgeCheck className="text-emerald-500" size={20} />
          <span className="text-xs font-mono text-emerald-500 uppercase tracking-[0.5em] font-black">
            Credential_Vault
          </span>
        </div>
        <h2
          id="cert-title"
          className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none"
        >
          Industry <span className="text-white/20">Certifications</span>
        </h2>
        <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed italic font-medium">
          Verified professional credentials from global technology leaders
          validating core expertise in software architecture and systems.
        </p>
      </header>

      <div className="relative h-[500px] w-full max-w-[1000px] flex items-center justify-center">
        {/* CONTROLS */}
        <nav className="absolute inset-0 flex items-center justify-between z-40 pointer-events-none">
          <button
            onClick={handlePrev}
            aria-label="Previous certification"
            className="pointer-events-auto md:-left-16 p-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all group"
          >
            <ChevronLeft className="text-white group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next certification"
            className="pointer-events-auto md:-right-16 p-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all group"
          >
            <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </nav>

        {/* THE CAROUSEL TRACK */}
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleIndices.map((index, i) => {
            const item = CERT_ITEMS[index];
            const isMain = i === 1;

            return (
              <motion.article
                key={item.id}
                aria-hidden={!isMain}
                className="absolute w-[300px] md:w-[400px] h-[450px] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl bg-[#0a0a0a]"
                animate={{
                  x: i === 0 ? "-75%" : i === 1 ? "0%" : "75%",
                  scale: isMain ? 1 : 0.8,
                  rotateY: i === 0 ? 30 : i === 1 ? 0 : -30,
                  filter: isMain
                    ? "blur(0px) brightness(1)"
                    : "blur(12px) brightness(0.5)",
                  opacity: isMain ? 1 : 0.3,
                  zIndex: isMain ? 10 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ perspective: "1200px" }}
              >
                {/* CONTENT AREA */}
                <div className="w-full h-full relative">
                  <Image
                    fill
                    src={item.image}
                    className="w-full h-full object-cover object-top opacity-50 select-none"
                    alt={`Certificate for ${item.title}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                  {/* INFO OVERLAY */}
                  <div
                    className={`absolute bottom-0 p-10 w-full transition-all duration-700 ${isMain ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="text-emerald-500" size={14} />
                      <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                        {item.issuer}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight tracking-tight italic">
                      {item.title}
                    </h3>

                    <footer className="flex justify-between items-end border-t border-white/10 pt-6">
                      <div className="space-y-1">
                        <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">
                          Valid Since
                        </p>
                        <time
                          className="text-xs text-white/80 font-mono"
                          dateTime={item.date}
                        >
                          {item.date}
                        </time>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-xl text-black font-black text-[10px] uppercase hover:scale-105 transition-all"
                      >
                        Verify
                        <ExternalLink size={12} />
                      </a>
                    </footer>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* CALL TO ACTION */}
      <footer className="mt-20 flex flex-col items-center gap-4">
        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.4em]">
          Vault_Access_Protocol
        </p>
        <a
          href="/credentials"
          className="group relative px-8 py-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-emerald-500/50 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3">
            Explore All Credentials
            <ChevronRight
              size={16}
              className="text-emerald-500 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </a>
      </footer>
    </section>
  );
}
