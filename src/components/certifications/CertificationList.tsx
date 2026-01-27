// src/app/certifications/CertificationList.tsx
import { iCertificate } from "@/types/database";
import CertificationCard from "./CertificationCard";

export default function CertificationList({
  certs,
}: {
  certs: iCertificate[];
}) {
  return (
    <section className="space-y-8">
      {certs.map((cert) => (
        <CertificationCard key={cert.id} cert={cert} />
      ))}
    </section>
  );
}
