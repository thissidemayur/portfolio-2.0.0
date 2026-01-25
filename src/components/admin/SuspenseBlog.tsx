import React from "react";

export default function BlogsLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* 1. Header Skeleton */}
      <header className="flex justify-between items-center">
        <div>
          {/* Skeleton for Title */}
          <div className="h-10 w-64 bg-white/10 rounded-lg mb-2" />
          {/* Skeleton for Subtext */}
          <div className="h-4 w-48 bg-white/5 rounded-md" />
        </div>
        {/* Skeleton for Create Button */}
        <div className="h-12 w-40 bg-white/5 rounded-xl" />
      </header>

      {/* 2. Table Skeleton */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5">
            <tr>
              <th className="p-6">
                <div className="h-3 w-12 bg-white/10 rounded" />
              </th>
              <th className="p-6">
                <div className="h-3 w-20 bg-white/10 rounded" />
              </th>
              <th className="p-6">
                <div className="h-3 w-20 bg-white/10 rounded" />
              </th>
              <th className="p-6 text-right">
                <div className="h-3 w-16 ml-auto bg-white/10 rounded" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {/* Type Column */}
                <td className="p-6">
                  <div className="h-5 w-20 bg-white/5 rounded-full" />
                </td>
                {/* Title Column */}
                <td className="p-6 text-sm">
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-white/10 rounded" />
                    <div className="h-3 w-32 bg-white/5 rounded" />
                  </div>
                </td>
                {/* Published Column */}
                <td className="p-6">
                  <div className="h-4 w-24 bg-white/5 rounded" />
                </td>
                {/* Actions Column */}
                <td className="p-6">
                  <div className="flex justify-end gap-4">
                    <div className="h-5 w-5 bg-white/5 rounded" />
                    <div className="h-5 w-5 bg-white/5 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Footer Status Placeholder */}
      <div className="flex justify-center">
        <div className="h-3 w-32 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}
