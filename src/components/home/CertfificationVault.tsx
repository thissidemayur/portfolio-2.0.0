import { getAllPublicCertificates } from "@/dal/certificates.dal";
import CertificationCarousel from "./CertificationCarousel";

export default async function CertificationVault() {
  const certificates = await getAllPublicCertificates();

  if (!certificates || certificates.length === 0) return null;

  return <CertificationCarousel certs={certificates} />;
}
