import AboutClient from "@/components/about/AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Mayur Pal | Full-Stack & DevOps Engineer",
  description:
    "Learn more about Mayur Pal, specializing in Nextjs, MERN, GoLang, AWS Cloud infrastructure and Devops.",
  
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@id": "https://thissidemayur.me/#person",
    },
    // Adding breadcrubs help search engine to understand where this page sits (use item as n-1)
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://thissidemayur.me",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </main>
  );
}
