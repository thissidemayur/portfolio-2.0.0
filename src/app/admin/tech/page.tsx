// src/app/admin/tech/page.tsx
import { Suspense } from "react";
import { ArrowLeft, Layers, Terminal } from "lucide-react";
import Link from "next/link";
import AddTechForm from "@/components/admin/AddTechForm";
import TechInventoryContent from "@/components/admin/TechInventoryContent";
import AdminLoading from "@/components/admin/SuspenseDashboard";

export default function AdminTechPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* SYSTEM NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          System_Return_to_Dashboard
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#00FF94]/50 uppercase tracking-widest">
          <Terminal size={12} />
          Protocol: Stack_Inventory_v1.0.4
        </div>
      </div>

      {/* HEADER SECTION */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00FF94]/10 rounded-lg border border-[#00FF94]/20 text-[#00FF94]">
              <Layers size={20} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
              Stack_Inventory
            </h1>
          </div>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em] ml-1">
            Configure_Hardware_&_Software_Primitives
          </p>
        </div>

        <div className="w-full lg:w-auto">
          <AddTechForm />
        </div>
      </header>

      {/* THE GRID: Loads data inside Suspense */}
      <Suspense fallback={<AdminLoading />}>
        <TechInventoryContent />
      </Suspense>
    </div>
  );
}
