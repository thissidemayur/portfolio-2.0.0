import React from "react";
import { iResume } from "@/types/database";

export const GeneralResumeLayout = ({ data }: { data: iResume }) => {
  return (
    <article className="max-w-[850px] mx-auto bg-white p-10 shadow-xl font-sans text-black leading-tight print:shadow-none print:p-0">
      {/* 1. Schema.org Person Metadata (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Uxxxxx Xxxxx",
            email: "ujjwaljain604@gmail.com",
            telephone: "+91-1234567890",
            url: "https://github.com/UjjwalJain02",
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Lovely Professional University",
            },
            knowsAbout: Object.values(data.skills).flat(),
          }),
        }}
      />

      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#303F9F] mb-1 uppercase tracking-tight">
          Uxxxxx Xxxxx
        </h1>
        <div className="flex justify-between text-[10px] text-gray-700">
          <address className="not-italic">
            <p>
              Linkedin:{" "}
              <a
                href="https://www.linkedin.com/in/ujjwal-jain-3549651b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#303F9F] underline transition-colors"
              >
                uxxxx-gxxxx-123456789
              </a>
            </p>
            <p>
              Github:{" "}
              <a
                href="https://github.com/UjjwalJain02"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#303F9F] underline transition-colors"
              >
                github.com/Uxxxxxxxxxx
              </a>
            </p>
          </address>
          <div className="text-right font-medium">
            <p>
              Email:{" "}
              <a
                href="mailto:ujjwaljain604@gmail.com"
                className="hover:text-[#303F9F] underline"
              >
                ujjwaljain604@gmail.com
              </a>
            </p>
            <p>
              Mobile:{" "}
              <a
                href="tel:+911234567890"
                className="hover:text-[#303F9F] underline"
              >
                +91-1234567890
              </a>
            </p>
          </div>
        </div>
      </header>

      {/* Dynamic Skills Section - SEO Optimized with Bullet Points */}
      <section className="mb-4">
        <h2 className="text-xs font-bold text-[#303F9F] uppercase border-b border-gray-300 pb-0.5 mb-2">
          Skills
        </h2>
        <ul className="text-[11px] space-y-0.5 list-disc ml-8">
          {Object.entries(data.skills).map(([key, values]) => (
            <li key={key}>
              {Array.isArray(values) ? values.join(", ") : values}
            </li>
          ))}
        </ul>
      </section>

      {/* Internship Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold text-[#303F9F] uppercase border-b border-gray-300 pb-0.5 mb-2">
          Internship
        </h2>
        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="text-[#303F9F]">{exp.company}</span>
              <span>{exp.duration}</span>
            </div>
            <p className="text-[10px] italic font-bold mb-1 ml-2 text-gray-800">
              {exp.role}
            </p>
            <ul className="list-disc ml-8 text-[11px] space-y-0.5">
              {exp.points.map((point, idx) => (
                <li key={idx} className="leading-tight">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold text-[#303F9F] uppercase border-b border-gray-300 pb-0.5 mb-2">
          Projects
        </h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-bold text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-[#303F9F] underline">{proj.title}</span>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] bg-[#303F9F]/10 px-2 py-0.5 rounded text-[#303F9F] no-underline hover:bg-[#303F9F] hover:text-white transition-all font-mono border border-[#303F9F]/20"
                  >
                    [VALIDATE_SOURCE]
                  </a>
                )}
              </div>
              <span className="text-gray-600">
                {proj.duration || "Duration"}
              </span>
            </div>
            <div className="ml-4 mt-1 text-[11px] space-y-1">
              {proj.details.map((detail, idx) => (
                <p key={idx} className="leading-snug">
                  {detail}
                </p>
              ))}
              <p className="font-bold text-[10px] text-gray-700">
                Tech: {proj.tech}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-xs font-bold text-[#303F9F] uppercase border-b border-gray-300 pb-0.5 mb-2">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, i) => (
            <div key={i} className="text-[11px]">
              <div className="flex justify-between font-bold text-[#303F9F]">
                <span>{edu.institution}</span>
                <span>{edu?.location || "India"}</span>
              </div>
              <div className="flex justify-between italic text-gray-800">
                <span>
                  {edu.degree} — <strong>{edu.score}</strong>
                </span>
                <span className="not-italic font-medium">{edu.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
