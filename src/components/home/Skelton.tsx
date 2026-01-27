const Shimmer = "animate-pulse bg-white/5 rounded-2xl";

// 1. PROJECTS SKELETON (Matches your 12-column Bento Grid)
export function ProjectSkeleton() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto space-y-10">
      <div className="space-y-4">
        <div className={`h-4 w-32 ${Shimmer}`} />
        <div className={`h-12 w-64 ${Shimmer}`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div
          className={`md:col-span-8 h-[480px] rounded-[2.5rem] ${Shimmer}`}
        />
        <div
          className={`md:col-span-4 h-[480px] rounded-[2.5rem] ${Shimmer}`}
        />
      </div>
    </div>
  );
}

// 2. PHILOSOPHY SKELETON (Matches your 3-card grid)
export function PhilosophySkeleton() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className={`h-10 w-80 mx-auto mb-20 ${Shimmer}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-80 rounded-[2.5rem] ${Shimmer}`} />
        ))}
      </div>
    </div>
  );
}

// 3. GITHUB SKELETON (Matches your 24-hour revalidation article block)
export function GithubSkeleton() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className={`h-8 w-64 ${Shimmer}`} />
          <div className={`h-4 w-96 ${Shimmer}`} />
        </div>
        <div className={`h-10 w-32 ${Shimmer}`} />
      </div>
      <div
        className={`h-64 rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] animate-pulse`}
      />
    </div>
  );
}

// 4. STACK ARCHITECTURE (Matches your 3-column article grid)
export function StackSkeleton() {
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <div className={`h-12 w-72 mx-auto mb-20 ${Shimmer}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`h-48 rounded-[2.5rem] ${Shimmer}`} />
        ))}
      </div>
    </div>
  );
}

// 5. CERTIFICATION VAULT (Matches your Carousel height)
export function CertSkeleton() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className={`h-4 w-32 mb-4 ${Shimmer}`} />
      <div className={`h-14 w-96 mb-20 ${Shimmer}`} />
      <div className="flex gap-8 w-full justify-center items-center h-[500px]">
        <div
          className={`w-[300px] h-[400px] opacity-30 scale-75 rounded-[3rem] ${Shimmer}`}
        />
        <div className={`w-[400px] h-[450px] rounded-[3rem] ${Shimmer}`} />
        <div
          className={`w-[300px] h-[400px] opacity-30 scale-75 rounded-[3rem] ${Shimmer}`}
        />
      </div>
    </div>
  );
}
