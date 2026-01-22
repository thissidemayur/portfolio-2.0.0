import CertificateForm from "@/components/admin/CertificationsForm";
import { getCertificateById } from "@/dal/certificates.dal";
import { iCertificate } from "@/types/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit3, Fingerprint } from "lucide-react";

export default async function EditCertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert: iCertificate | null = await getCertificateById(parseInt(id));

  if (!cert) notFound();

  return (
    <div className="min-h-screen bg-black">
      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Navigation & Identity Section */}
        <header className="flex flex-col gap-6">
          <Link
            href="/admin/certifications"
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group w-fit"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back_to_Registry
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600/10 rounded-2xl border border-emerald-600/20 text-emerald-500">
                <Edit3 size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-white leading-none">
                  Modify_Credential
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Fingerprint size={12} className="text-white/20" />
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                    UUID_Reference: {id}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badge - Hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                Mode: Read_Write_Active
              </span>
            </div>
          </div>
        </header>

        {/* The Form */}
        <main className="relative">
          <CertificateForm cert={cert} isEdit={true} />
        </main>
      </div>
    </div>
  );
}
