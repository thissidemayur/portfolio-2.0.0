import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 animate-pulse">
      {/* TOP NAV SKELETON */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft size={14} className="text-white/10" />
          <div className="h-3 w-24 bg-white/5 rounded" />
        </div>
        <div className="h-3 w-32 bg-white/5 rounded-full" />
      </div>

      {/* HEADER SKELETON */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-white/10 rounded-lg" />
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#00FF94]/20 rounded-full" />
            <div className="h-3 w-32 bg-white/5 rounded" />
          </div>
        </div>
        <div className="h-14 w-full sm:w-48 bg-white/5 rounded-2xl" />
      </header>

      {/* TABLE/CONTAINER SKELETON */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-8 py-6">
                  <div className="h-3 w-12 bg-white/10 rounded" />
                </th>
                <th className="px-6 py-6">
                  <div className="h-3 w-32 bg-white/10 rounded" />
                </th>
                <th className="px-6 py-6">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                </th>
                <th className="px-8 py-6 text-right">
                  <div className="h-3 w-16 ml-auto bg-white/10 rounded" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-8 py-6">
                    <div className="h-4 w-16 bg-white/5 rounded" />
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-white/10 rounded" />
                      <div className="h-3 w-24 bg-white/5 rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex gap-2">
                      <div className="h-4 w-12 bg-white/5 rounded" />
                      <div className="h-4 w-12 bg-white/5 rounded" />
                      <div className="h-4 w-12 bg-white/5 rounded" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                      <div className="h-8 w-8 bg-white/5 rounded-lg" />
                      <div className="h-8 w-8 bg-white/5 rounded-lg" />
                      <div className="h-8 w-8 bg-white/5 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
