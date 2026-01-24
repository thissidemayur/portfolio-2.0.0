import { iResume } from "@/types/database";

export const ResumeSEO = ({ data }: { data: iResume}) => {
  const isGeneral = data.category === "GENERAL";
  const pageTitle = isGeneral
    ? "General Resume"
    : `${data.category} Specialized Resume`;

  const connectedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://thissidemayur.me/resume#${data.category.toLowerCase()}-page`,
        url: `https://thissidemayur.me/resume?v=${data.category.toLowerCase()}`,
        name: `${pageTitle} | Mayur Pal`,
        isPartOf: { "@id": "https://thissidemayur.me/#website" }, // Connects to Global Website
        about: { "@id": "https://thissidemayur.me/#person" }, // Connects to Global Person
        description: data.summary[0],
      },
      {
        "@type": "Occupation",
        "@id": `https://thissidemayur.me/resume#occupation-${data.category.toLowerCase()}`,
        name: isGeneral
          ? "Software Development Engineer"
          : `${data.category} Engineer`,
        author: { "@id": "https://thissidemayur.me/#person" }, // Ties this role to your Global ID
        estimatedSalary: [],
        occupationLocation: [
          {
            "@type": "City",
            name: "Mathura",
          },
        ],
        skills: data.skills
          ? Object.values(data.skills)
              .flat()
              .map((skill) => ({
                "@type": "DefinedTerm",
                name: skill,
              }))
          : [],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(connectedSchema) }}
    />
  );
};
