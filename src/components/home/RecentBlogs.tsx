import Link from "next/link";
import { ArrowUpRight, Clock, Box, Terminal, MoveRight } from "lucide-react";
import { MOCK_BLOGS } from "@/lib/constant";

export default function RecentBlogs() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 ">
      <div className="max-w-7xl mx-auto">
        {/* Header matched to OS Aesthetic */}
        <header className="mb-20 space-y-2">
          <div className="flex items-center gap-2 text-[#00FF94] font-mono text-[10px] tracking-[0.4em] uppercase opacity-70">
            <Terminal size={12} />
            <span>Journal_v1.0.4</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
            RECENT <span className="text-white/40 italic">BLOGS</span>
          </h2>
          <p className="text-white/40 max-w-sm text-sm font-medium leading-relaxed">
            Deep dives into architectural patterns, system design, and the logic
            of modern software.
          </p>
        </header>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {MOCK_BLOGS.map((blog, index) => {
            const isLarge = index % 4 === 0 || index % 4 === 3;

            return (
              <article
                key={blog.id}
                // Changed card bg to match the deep depth of your screenshot cards
                className={`group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-5 overflow-hidden flex flex-col justify-between transition-all duration-700 ease-in-out hover:bg-[#111111] hover:border-[#00FF94]/20 ${
                  isLarge ? "md:col-span-8 min-h-[420px]" : "md:col-span-4"
                }`}
              >
                <div className="space-y-6">
                  {/* Category & Tag */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:text-[#00FF94] transition-colors">
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#00FF94] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <Box size={10} />
                      LIVE_SYNC
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-4">
                    <h3
                      className={`${isLarge ? "text-3xl md:text-5xl" : "text-2xl"} font-bold tracking-tight leading-[1.1] group-hover:text-white transition-colors`}
                    >
                      {blog.title}
                    </h3>
                    <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-xl group-hover:text-white/50 transition-colors">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <footer className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-white/20 uppercase">
                    <div className="flex items-center gap-2">
                      <Clock size={12} /> 12 MIN
                    </div>
                    <span>
                      {new Date(blog.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-[#00FF94] group-hover:text-black transition-all duration-500 -rotate-45 group-hover:rotate-0 shadow-lg"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </footer>

                {/* Subtle Glow Overlay instead of sharp shadow */}
                <div className="absolute inset-0 rounded-[2rem] bg-[#00FF94]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Decorative scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF94]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 pointer-events-none" />
              </article>
            );
          })}
        </div>
        {/* View All Section */}
        <div className="mt-14 flex flex-col items-center">
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent mb-8" />
          <Link
            href="/blogs"
            className="group flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-white/30 hover:text-[#00FF94] transition-all"
          >
            EXPLORE_FULL_ARCHIVE
            <MoveRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
