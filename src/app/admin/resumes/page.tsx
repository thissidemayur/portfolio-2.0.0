import { Suspense } from "react";
import { getResumeHistory } from "@/dal/resumes.dal";
import ResumeDashboard from "./resumeDashboard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// 1. DATA WRAPPER: Handles the database fetch
async function ResumeDataWrapper() {
  const history = await getResumeHistory();
  return <ResumeDashboard history={history} />;
}

// 2. PAGE SHELL: No 'await' here, so it's instant!
export default function ResumeAdminPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* INSTANT HEADER SHELL */}
        <header className="mb-10">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group mb-6"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back_to_System
          </Link>
        </header>

        {/* THE HOLE: This streams in after the header is visible */}
        <Suspense fallback={<ResumeVaultSkeleton />}>
          <ResumeDataWrapper />
        </Suspense>
      </div>
    </div>
  );
}

function ResumeVaultSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="h-12 w-64 bg-white/10 rounded-xl mb-8" />
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem]"
          />
        ))}
      </div>
    </div>
  );
}
