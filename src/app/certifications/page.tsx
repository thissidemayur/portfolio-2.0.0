import { Metadata } from "next";
import CertificationList from "@/components/certifications/CertificationList";
import { getAllCertificates } from "@/dal/certificates.dal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications & Achievements | Mayur Pal",
  description:
    "View the official certificates and professional training records earned by Mayur Pal.",
};

export default async function CertificationPage() {
  const allCerts = await getAllCertificates();
  const certSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mayur Pal - Professional Certifications",
    description:
      "A list of verified certificates in Artificial Intelligence, Cloud Systems, Web Development and Computer science .",
    numberOfItems: allCerts.length,
    itemListElement: allCerts.map((cert, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: cert.title,
        datePublished: new Date(cert.issue_date).toISOString(),
        author: { "@type": "Organization", name: cert.issuer },
      },
      credentialCategory: cert.is_industry_standard
        ? "Professional Certification"
        : "Certificate of Completion",
      url: cert.credential_url || cert.verify_link,
      image: cert.image_url,
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://thissidemayur.me",
        },
        { "@type": "ListItem", position: 2, name: "Certifications" },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white py-4 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        <nav className="mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </Link>
        </nav>
        {/* HEADER: HELPS RECRUITERS UNDERSTAND YOUR VALUE IMMEDIATELY */}
        <header className="mb-20 border-l-4 border-emerald-500 pl-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
            Official <span className="text-emerald-500">Skills Proof</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-medium">
            This is a collection of my verified technical certificates and
            professional training. It shows my dedication to learning new tools
            and keeping my skills sharp for modern industry needs.
          </p>
          <div className="mt-4 text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
            {"//"} Academic Background: Lovely Professional University
          </div>
        </header>

        {/* The list of certificates with filters */}
        <CertificationList initialCerts={allCerts} />
      </div>
    </main>
  );
}
