import CertificateForm from "@/components/admin/CertificationsForm";
import Link from "next/link";
import { ArrowLeft, ShieldPlus } from "lucide-react";

export default function NewCertificatePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Navigation & Context */}
        <header className="flex flex-col gap-4">
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

          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-500">
              <ShieldPlus size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-white">
                Initialize_Credential
              </h1>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                Secure_Vault_Entry_Protocol
              </p>
            </div>
          </div>
        </header>

        {/* The Form */}
        <main className="relative">
          <CertificateForm isEdit={false} />
        </main>
      </div>
    </div>
  );
}
