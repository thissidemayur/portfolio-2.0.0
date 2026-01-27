"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Award } from "lucide-react";
import Image from "next/image";
import { iCertificate } from "@/types/database";

export default function CertificationCard({ cert }: { cert: iCertificate }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col lg:flex-row bg-[#0a0a0a]
                 border border-white/5 rounded-[2rem] overflow-hidden
                 transition-all duration-300
                 hover:border-emerald-500/30 hover:-translate-y-[2px]"
    >
      {/* IMAGE */}
      <div className="w-full lg:w-1/3 h-64 lg:h-auto relative bg-black overflow-hidden">
        <Image
          fill
          src={cert.image_url}
          alt={`Certificate for ${cert.title}`}
          className="object-cover object-top opacity-60
                     group-hover:opacity-100 group-hover:scale-[1.03]
                     transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden" />
      </div>

      {/* CONTENT */}
      <div className="p-8 lg:p-10 flex-1 flex flex-col">
        <header className="flex flex-wrap items-center gap-4 mb-4">
          {cert.is_industry_standard ? (
            <span
              className="flex items-center gap-1.5 px-3 py-1
                             bg-emerald-500/10 text-emerald-500
                             text-[10px] font-black uppercase rounded-md
                             border border-emerald-500/20"
            >
              <Award size={12} /> Industry Standard
            </span>
          ) : (
            <span
              className="px-3 py-1 bg-white/5 text-gray-400
                             text-[10px] font-black uppercase rounded-md
                             border border-white/10"
            >
              Professional Record
            </span>
          )}

          <span className="text-[10px] font-mono text-gray-600 uppercase">
            REF_ID: {cert.id.toString().padStart(4, "0")}
          </span>
        </header>

        <h3
          className="text-2xl md:text-4xl font-bold text-white mb-2
                       tracking-tight transition-colors duration-300
                       group-hover:text-emerald-400"
        >
          {cert.title}
        </h3>

        <p className="text-gray-400 mb-6 font-medium text-lg">
          Issued by <span className="text-white">{cert.issuer}</span> •{" "}
          {new Date(cert.issue_date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <footer
          className="mt-auto pt-6 border-t border-white/5
                           flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            {cert.verify_link && (
              <a
                href={cert.verify_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[11px]
                           font-black uppercase tracking-widest
                           text-emerald-500 hover:text-emerald-400
                           transition-colors"
              >
                Verify Credential <ExternalLink size={14} />
              </a>
            )}

            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-black uppercase
                           tracking-widest text-gray-400
                           hover:text-white transition-colors"
              >
                View Assets
              </a>
            )}
          </div>

          <div
            className="flex items-center gap-2 text-[10px]
                          font-mono text-gray-600 uppercase"
          >
            <ShieldCheck size={14} className="text-emerald-500" />
            Signature Validated
          </div>
        </footer>
      </div>
    </motion.article>
  );
}
