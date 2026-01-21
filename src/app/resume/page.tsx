import { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume | Mayur Pal - Full-Stack & DevOps Engineer",
  description:
    "Professional resume of Mayur Pal. Specializing in GoLang, AWS, and Next.js.",
}

export default function ResumePage() {
const resumeLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://thissidemayur.me/resume/#webpage",
      url: "https://thissidemayur.me/resume",
      name: "Professional Resume of Mayur Pal",
      description:
        "Full-Stack and DevOps Engineer specializing in GoLang, AWS, and Next.js.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://thissidemayur.me",
          },
          { "@type": "ListItem", position: 2, name: "Resume" },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": "https://thissidemayur.me/#person",
      name: "Mayur Pal",
      jobTitle: "Full-Stack & DevOps Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Phagwara",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Lovely Professional University",
      },
      // We link your master skill list here
      knowsAbout: [
        "GoLang",
        "TypeScript",
        "JavaScript",
        "DevOps",
        "AWS",
        "Terraform",
        "MERN",
        "Postgres",
        "Redis",
        "Next.js",
        "C/C++",
        "Docker",
        "Linux",
        "Postgresql",
        "MongoDB",
        "Github Actions"
      ],
      // Signal that you are seeking opportunities
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Freelance & Employment Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Web Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "DevOps & Cloud Automation",
            },
          },
        ],
      },
    },
  ],
};

  return (
    <main className="min-h-screen  bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeLd) }}
      />
      <ResumeClient />
    </main>
  );
}
