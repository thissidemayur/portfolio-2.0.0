
export default function CertsLoading() {
  return (
    <div className="min-h-screen bg-[#050505] animate-pulse">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12">
        {/* HEADER SKELETON */}
        <header className="flex flex-col gap-6 border-b border-white/5 pb-10">
          <div className="h-4 w-32 bg-white/5 rounded-md" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="h-12 w-64 bg-white/10 rounded-xl" />
              <div className="h-3 w-40 bg-white/5 rounded-md" />
            </div>
            <div className="h-14 w-52 bg-white/5 rounded-2xl" />
          </div>
        </header>

        {/* DATA CONTAINER SKELETON */}
        <div className="overflow-hidden border border-white/5 rounded-[2.5rem] bg-white/[0.01]">
          {/* DESKTOP TABLE SKELETON */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-8">
                    <div className="h-3 w-24 bg-white/10 rounded" />
                  </th>
                  <th className="p-8">
                    <div className="h-3 w-20 bg-white/10 rounded" />
                  </th>
                  <th className="p-8">
                    <div className="h-3 w-12 bg-white/10 rounded mx-auto" />
                  </th>
                  <th className="p-8">
                    <div className="h-3 w-20 bg-white/10 rounded ml-auto" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex-shrink-0" />
                        <div className="space-y-2">
                          <div className="h-4 w-40 bg-white/10 rounded" />
                          <div className="h-3 w-24 bg-white/5 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="h-4 w-32 bg-white/5 rounded" />
                    </td>
                    <td className="p-8">
                      <div className="h-4 w-16 bg-white/5 rounded mx-auto" />
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <div className="h-10 w-10 bg-white/5 rounded-xl" />
                        <div className="h-10 w-10 bg-white/5 rounded-xl" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD SKELETON */}
          <div className="md:hidden divide-y divide-white/5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-3/4 bg-white/10 rounded" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                    <div className="flex gap-2">
                      <div className="h-4 w-10 bg-white/5 rounded" />
                      <div className="h-4 w-10 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-12 bg-white/5 rounded-xl" />
                  <div className="w-14 h-12 bg-white/5 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
