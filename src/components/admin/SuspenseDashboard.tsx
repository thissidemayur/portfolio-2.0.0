import React from "react";

export default function AdminLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <header>
        <div className="h-10 w-64 bg-white/10 rounded-lg mb-2" />
        <div className="h-3 w-40 bg-white/5 rounded-md" />
      </header>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-[#0A0A0A] border border-white/5 rounded-[1.5rem]"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages Feed Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-4 w-32 bg-white/5 rounded-md mb-4" />
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] h-[300px]">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-8 border-b border-white/5 flex justify-between"
              >
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-white/10 rounded" />
                  <div className="h-3 w-48 bg-white/5 rounded" />
                </div>
                <div className="w-8 h-8 bg-white/5 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-32 bg-white/5 rounded-md mb-4" />
          <div className="grid grid-cols-1 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-[#0A0A0A] border border-white/5 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
