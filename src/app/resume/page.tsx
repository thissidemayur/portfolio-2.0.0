// src/app/resume/page.tsx
import { iResume } from "@/types/database";
import { getLatestResumesForAllCategories } from "@/dal/resumes.dal";
import ResumeClientView from "./ResumeClientView";

export default async function ResumePage() {
  const latestResumes: iResume[] = await getLatestResumesForAllCategories();

  if (!latestResumes || latestResumes.length === 0) {
    return (
      <div className="text-white p-20 text-center uppercase font-mono">
        No_Resumes_Found
      </div>
    );
  }

  // Generate the detailed schema for EVERY resume version on the Server
  const fullGraph = latestResumes.flatMap((data) => {
    const isGeneral = data.category === "GENERAL";
    const pageTitle = isGeneral
      ? "General Resume"
      : `${data.category} Specialized Resume`;

    return [
      {
        "@type": "WebPage",
        "@id": `https://thissidemayur.me/resume#${data.category.toLowerCase()}-page`,
        url: `https://thissidemayur.me/resume?v=${data.category.toLowerCase()}`,
        name: `${pageTitle} | Mayur Pal`,
        isPartOf: { "@id": "https://thissidemayur.me/#website" },
        about: { "@id": "https://thissidemayur.me/#person" },
        description: data.summary[0],
      },
      {
        "@type": "Occupation",
        "@id": `https://thissidemayur.me/resume#occupation-${data.category.toLowerCase()}`,
        name: isGeneral
          ? "Software Development Engineer"
          : `${data.category} Engineer`,
        author: { "@id": "https://thissidemayur.me/#person" },
        occupationLocation: [{ "@type": "City", name: "Mathura" }],
        // Correctly handling the iSkillGroup[] structure
        skills: data.skills
          ? data.skills
              .flatMap((group) => group.items) // Extracts all items from all categories
              .map((skill) => ({
                "@type": "DefinedTerm",
                name: skill,
              }))
          : [],
      },
    ];
  });

  const connectedSchema = {
    "@context": "https://schema.org",
    "@graph": fullGraph,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(connectedSchema) }}
      />
      <ResumeClientView initialData={latestResumes} />
    </>
  );
}
