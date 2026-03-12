import Link from "next/link";
import { ArrowUpRight, Clock, Terminal, Hash, MoveRight } from "lucide-react";
import { getAllPublicBlog } from "@/dal/blogs.dal"; // Dynamic DAL import

export default async function RecentBlogs() {
  const blogs = await getAllPublicBlog({ limit: 3, offset: 0 });

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              ENGINEERING <span className="text-white/40 italic">Blogs</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-[280px] text-[10px] font-mono uppercase leading-relaxed border-r border-[#00FF94]/20 pr-4 text-right tracking-wider">
            Documentation of architectural decisions and system design patterns.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {blogs.slice(0, 3).map((blog: any, index: number) => {
            const isWide = index === 0;

            return (
              <article
                key={blog.id}
                className={`group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#00FF94]/20 ${
                  isWide
                    ? "md:col-span-8 min-h-[450px]"
                    : "md:col-span-4 min-h-[450px]"
                }`}
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Hash size={12} className="text-[#00FF94]" />
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        {blog.category}
                      </span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-[#00FF94]/40 group-hover:animate-ping" />
                  </div>

                  <div className="space-y-4">
                    <Link href={`/blogs/${blog.slug}`}>
                      <h3
                        className={`${
                          isWide ? "text-4xl md:text-5xl" : "text-2xl"
                        } font-black tracking-tight leading-[1.1] text-white/90 group-hover:text-white transition-colors uppercase italic`}
                      >
                        {blog.title}
                      </h3>
                    </Link>
                    <Link href={`/blog/${blog.slug}`}>
                      <p
                        className={`text-white/30 leading-relaxed ${
                          isWide ? "max-w-xl text-base" : "text-xs"
                        } group-hover:text-white/50 transition-colors line-clamp-3`}
                      >
                        {blog.summary}
                      </p>
                    </Link>
                  </div>
                </div>

                <footer className="relative z-10 flex items-end justify-between mt-12">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[9px] font-mono tracking-[0.2em] text-white/20 uppercase">
                      <div className="flex items-center gap-1.5 text-[#00FF94]/60">
                        <Clock size={12} /> {blog?.read_time || "8"} MIN_READ
                      </div>
                      <span>—</span>
                      <span>
                        {new Date(blog.published_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`} // Note: Fixed URL to match your DAL/RSS
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-mono font-black tracking-widest text-white/40 group-hover:bg-[#00FF94] group-hover:text-black transition-all duration-500"
                  >
                    OPEN_LOG
                    <ArrowUpRight size={14} />
                  </Link>
                </footer>
              </article>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/blogs"
            className="group relative px-12 py-6 overflow-hidden rounded-2xl border border-white/10 transition-all"
          >
            <div className="absolute inset-0 bg-[#00FF94]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative flex items-center gap-4 text-[10px] font-black tracking-[0.5em] text-white/50 group-hover:text-white">
              EXPLORE ALL Blogs
              <MoveRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
