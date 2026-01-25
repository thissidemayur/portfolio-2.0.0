import { getAllCertificates } from "@/dal/certificates.dal";
import { ShieldCheck, Home, Edit3, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteCertButton } from "@/components/admin/DeleteCertificationButton";
import { Suspense } from "react";
import CertsLoading from "@/components/admin/SuspenseCertificates";

// 1. THE DATA COMPONENT (Handles the Await)
async function CertificateRegistry() {
  const certs = await getAllCertificates();

  if (certs.length === 0) {
    return (
      <div className="p-20 text-center border border-dashed border-white/5 rounded-[2.5rem]">
        <p className="text-white/20 font-mono uppercase tracking-widest">
          Registry_Empty_No_Credentials
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-white/5 rounded-[2.5rem] bg-white/[0.01]">
      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <th className="p-8 font-medium">Credential_Identity</th>
              <th className="p-8 font-medium">Issuer_Org</th>
              <th className="p-8 font-medium text-center">Flags</th>
              <th className="p-8 font-medium text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {certs.map((cert) => (
              <tr
                key={cert.id}
                className="group hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-8">
                  <div className="flex items-center gap-5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-black flex-shrink-0 shadow-2xl">
                      <Image
                        fill
                        src={cert.image_url || ""}
                        alt=""
                        className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {cert.title}
                      </div>
                      <div className="text-[10px] font-mono text-gray-600 uppercase mt-1">
                        /{cert.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-8 text-[11px] text-gray-400 font-mono uppercase">
                  {cert.issuer}
                </td>
                <td className="p-8 text-center">
                  <div className="flex justify-center gap-3">
                    {cert.show_on_home && (
                      <Home size={14} className="text-blue-500" />
                    )}
                    {cert.is_industry_standard && (
                      <ShieldCheck size={14} className="text-emerald-500" />
                    )}
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/certifications/edit/${cert.id}`}
                      className="p-3 bg-white/5 text-gray-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all"
                    >
                      <Edit3 size={16} />
                    </Link>
                    <DeleteCertButton id={cert.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden divide-y divide-white/5">
        {certs.map((cert) => (
          <div key={cert.id} className="p-6 space-y-5">
            {/* ... your mobile card content ... */}
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. THE PAGE COMPONENT (The Shell)
export default function AdminCertsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12">
        {/* TOP NAVIGATION & ACTIONS (Sends to browser immediately) */}
        <header className="flex flex-col gap-6 border-b border-white/5 pb-8 md:pb-10">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              Back_to_System
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
                Cert_Registry
              </h1>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                Registry_Status: Active // Secure_Vault
              </p>
            </div>
            <Link
              href="/admin/certifications/new"
              className="bg-blue-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
            >
              + Add_New_Credential
            </Link>
          </div>
        </header>

        {/* SUSPENSE AREA: This streams in after the header is already on screen */}
        <Suspense fallback={<CertsLoading />}>
          <CertificateRegistry />
        </Suspense>
      </div>
    </div>
  );
}
