"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ICertification } from "@/lib/constant";

export default function CertificationList({
  initialCerts,
}: {
  initialCerts: ICertification[];
}) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(initialCerts.map((c) => c.category))];
  const filteredCerts = initialCerts.filter(
    (c) => filter === "All" || c.category === filter,
  );

  return (
    <>
      {/* CATEGORY TABS */}
      <nav className="flex flex-wrap gap-3 mb-16">
        {categories.map((cat:string) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
              filter === cat
                ? "bg-emerald-500 text-black border-emerald-500"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* REGISTRY LIST */}
      <section className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert: ICertification, idx) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={cert.id}
              className="group relative flex flex-col lg:flex-row bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* IMAGE / VISUAL VALIDATION */}
              <div className="w-full lg:w-1/3 h-64 lg:h-auto relative bg-black">
                <Image
                  fill
                  src={cert.image}
                  alt={`Certificate for ${cert.title}`}
                  className="object-cover object-top opacity-40 group-hover:opacity-100 transition-all duration-700"
                />
              </div>

              {/* DATA SECTION */}
              <div className="p-10 flex-1 flex flex-col">
                <header className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase rounded-md border border-emerald-500/20">
                    {cert.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 uppercase">
                    ID_REF: {cert.id}
                  </span>
                </header>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-gray-400 mb-6 font-medium">
                  Issued by {cert.issuer} • {cert.date}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <footer className="mt-auto flex items-center gap-6">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400"
                  >
                    Verify Credential <ExternalLink size={14} />
                  </a>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase">
                    <ShieldCheck size={14} className="text-emerald-500" />{" "}
                    Authenticated
                  </div>
                </footer>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>
    </>
  );
}
