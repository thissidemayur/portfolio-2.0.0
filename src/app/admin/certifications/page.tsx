import { getAllCertificates } from "@/dal/certificates.dal";
import {
  ShieldCheck,
  Home,
  Edit3,
  Plus,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteCertButton } from "@/components/admin/DeleteCertificationButton";

export default async function AdminCertsPage() {
  const certs = await getAllCertificates();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* RESPONSIVE CONTAINER */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12">
        {/* TOP NAVIGATION & ACTIONS */}
        <header className="flex flex-col gap-6 border-b border-white/5 pb-8 md:pb-10">
          <div className="flex items-center justify-between">
            {/* Back to Admin Dashboard */}
            <Link
              href="/admin"
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back_to_System
            </Link>

            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Registry_Online
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
                Cert_Registry
              </h1>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                Active_Credentials: {certs.length} {" // "} Secure_Vault
              </p>
            </div>
            <Link
              href="/admin/certifications/new"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/10 active:scale-95"
            >
              <Plus size={16} /> Add_New_Credential
            </Link>
          </div>
        </header>

        {/* DATA CONTAINER */}
        <div className="overflow-hidden border border-white/5 rounded-[2.5rem] bg-white/[0.01]">
          {/* DESKTOP TABLE VIEW (Hidden on Mobile) */}
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

          {/* MOBILE CARD VIEW (Hidden on Desktop) */}
          <div className="md:hidden divide-y divide-white/5">
            {certs.map((cert) => (
              <div key={cert.id} className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-black flex-shrink-0">
                    <Image
                      fill
                      src={cert.image_url || ""}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black italic uppercase leading-tight truncate">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-500 mt-1">
                      {cert.issuer}
                    </p>
                    <div className="flex gap-2 mt-3">
                      {cert.show_on_home && (
                        <span className="text-[8px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded font-black uppercase">
                          Home
                        </span>
                      )}
                      {cert.is_industry_standard && (
                        <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-black uppercase">
                          Standard
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/certifications/edit/${cert.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    <Edit3 size={14} /> Edit
                  </Link>
                  <div className="w-14">
                    <DeleteCertButton id={cert.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
