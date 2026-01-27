"use client"
import React, { memo } from "react";
import { iResume } from "@/types/database";

export const GeneralResumeLayout = memo(({ data }: { data: iResume }) => {
  return (
    <article className="max-w-[850px] mx-auto bg-white p-10 shadow-xl font-sans text-black leading-tight print:shadow-none print:p-0">
     

      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#303F9F] mb-1 uppercase tracking-tight">
          Mayur Pal
        </h1>
        <div className="flex justify-between text-[10px] text-gray-700">
          <address className="not-italic">
            <p>
              Linkedin:{" "}
              <a
                href="https://www.linkedin.com/in/thissidemayur/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#303F9F] underline transition-colors"
              >
                linkedin.com/in/thissidemayur
              </a>
            </p>
            <p>
              Github:{" "}
              <a
                href="https://github.com/thissidemayur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#303F9F] underline transition-colors"
              >
                github.com/thissidemayur
              </a>
            </p>
          </address>
          <div className="text-right font-medium">
            <p>
              Email:{" "}
              <a
                href="mailto:thissidemayur@gmail.com"
                className="hover:text-[#303F9F] underline"
              >
                thissidemayur@gmail.com
              </a>
            </p>
            <p>
              Mobile:{" "}
              <a
                href="tel:+6283750133"
                className="hover:text-[#303F9F] underline"
              >
                +91-6283750133
              </a>
            </p>
          </div>
        </div>
      </header>

      {/* Dynamic Skills Section - SEO Optimized with Bullet Points */}
      {/* Dynamic Skills Section - Refined for iSkillGroup[] */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide text-gray-800">
          Skills
        </h2>
        <div className="text-[11px] space-y-1 ml-2">
          {/* Wrap in Array.isArray check to prevent build crash */}
          {Array.isArray(data.skills) ? (
            data.skills.map((group, index) => (
              <p key={index} className="leading-tight">
                <strong className="capitalize">
                  {group.category.replace("_", " ")}:
                </strong>{" "}
                {group.items.join(", ")}
              </p>
            ))
          ) : (
            <p className="text-[11px] text-gray-400">
              Loading_Skills_Packet...
            </p>
          )}
        </div>
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
});

GeneralResumeLayout.displayName = "GeneralResumeLayout";
