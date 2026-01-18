import CertificationList from "@/components/certifications/CertificationList";
import { allCerts } from "@/lib/constant";


export default function CertificationPage() {

  return (
    <main className="min-h-screen bg-[#030303] text-white py-32 px-6">

      <div className="max-w-7xl mx-auto">
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
