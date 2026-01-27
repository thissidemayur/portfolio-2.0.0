"use client"
import React, { memo } from "react";
import { iResume } from "@/types/database";

export const SpecializedResumeLayout = memo(({ data }: { data: iResume }) => {
  
  return (
    <div id="resume-print-area">
      <article className="max-w-[850px] mx-auto bg-white p-12 shadow-xl font-sans text-black leading-snug print:shadow-none print:p-0">
       

        {/* Specialized Header: Centered and Clean */}
        <header className="text-center mb-6 resume-header">
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-1">
            Mayur Pal
          </h1>
          <address className="not-italic text-[10px] mb-2 text-gray-700">
            Phagwara, Punjab  {/* [cite: 1] */}
          </address>
          {/* Removed border-b and pb-4 for a cleaner UI */}
          <div className="flex justify-center items-center gap-4 text-[9px] font-medium">
            <span className="flex items-center gap-1">📞 +91 6283750133</span>{" "}
            {/* [cite: 1] */}
            <a
              href="mailto:thissidemayur@gmail.com"
              className="underline hover:text-blue-700"
            >
              thissidemayur@gmail.com {/* [cite: 1] */}
            </a>
            <a
              href="https://linkedin.com/in/thissidemayur/"
              target="_blank"
              className="underline hover:text-blue-700"
            >
              linkedin.com/in/thissidemayur {/* [cite: 1] */}
            </a>
            <a
              href="https://github.com/thissidemayur"
              target="_blank"
              className="underline hover:text-blue-700"
            >
              github.com/thissidemayur {/* [cite: 1] */}
            </a>
          </div>
        </header>

        {/* Internship Section */}
        <section className="mb-5" aria-label="Work Experience">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide text-gray-800">
            Internship
          </h2>
          {data.experience?.map((exp, i) => (
            <div key={i} className="mb-4 text-[11px]">
              <div className="flex justify-between font-bold">
                <span className="text-blue-900">{exp.role}</span>
                <span>{exp.duration}</span>
              </div>
              <p className="italic font-bold mb-1 text-gray-700">
                {exp.company}
              </p>
              <ul className="list-disc ml-8 space-y-0.5">
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
        <section className="mb-5" aria-label="Technical Projects">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide text-gray-800">
            Projects
          </h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4 text-[11px]">
              <div className="flex justify-between font-bold italic">
                <span>
                  {proj.title} |{" "}
                  <span className="font-normal not-italic text-gray-600">
                    {proj.tech}
                  </span>
                </span>
                <span className="font-bold not-italic">{proj.duration}</span>
              </div>
              <ul className="list-disc ml-8 mt-1 space-y-0.5">
                {proj.details.map((detail, idx) => (
                  <li key={idx}>
                    {detail.includes("https") ? (
                      <div className="flex flex-wrap gap-1">
                        <span className="font-bold">
                          {detail.split(": ")[0]}:
                        </span>
                        <a
                          href={detail.split(": ")[1]}
                          target="_blank"
                          className="underline text-blue-800 hover:text-blue-600 break-all"
                        >
                          {detail.split(": ")[1]}
                        </a>
                      </div>
                    ) : (
                      detail
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Dynamic Skills Section */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide text-gray-800">
            Skills
          </h2>
          <div className="text-[11px] space-y-1 ml-2">
            {data.skills.map((group, index) => (
              <p key={index} className="leading-tight">
                <strong className="capitalize">
                  {group.category.replace("_", " ")}:
                </strong>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        {/* Education Section: CGPA 9.23 */}
        <section>
          <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide text-gray-800">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between font-bold">
                  <span className="text-blue-900">{edu.institution}</span>
                  <span>{edu.duration}</span>
                </div>
                <div className="flex justify-between italic">
                  <span>
                    {edu.degree} — <strong>{edu.score}</strong>
                  </span>
                  <span>Mathura, Uttar Pradesh</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
})


// Set display name for easier debugging in DevTools
SpecializedResumeLayout.displayName = "SpecializedResumeLayout";