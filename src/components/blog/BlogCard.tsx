"use client";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Zap,
  BookOpen,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { iBlog } from "@/types/database";

export default function BlogCard({ post, idx }: { post: iBlog; idx: number }) {
  const isTech = post.category === "TECHNICAL";
  const isAboveFold = idx < 2;
  const isFeatured = post.is_featured;

  return (
    <motion.article
      initial={isAboveFold ? false : { opacity: 0, y: 20 }}
      animate={isAboveFold ? { opacity: 1, y: 0 } : undefined}
      whileInView={isAboveFold ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex flex-col overflow-hidden transition-all duration-500 hover:border-[#00FF94]/20 ${
        isFeatured ? "md:col-span-2 md:flex-row md:h-[400px]" : "h-full"
      }`}
    >
      {/* 1. IMAGE SECTION */}
      <div
        className={`relative overflow-hidden border-white/5 ${
          isFeatured ? "md:w-1/2 md:border-r border-b-0" : "h-64 border-b"
        }`}
      >
        <img
          src={post.image_url || "/api/placeholder/800/400"}
          alt={post.title}
          className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute top-6 left-6 z-20">
          <span
            className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${
              isTech
                ? "bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]/20"
                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
            }`}
          >
            {isTech ? (
              <Zap size={10} className="inline mr-1" />
            ) : (
              <BookOpen size={10} className="inline mr-1" />
            )}
            {post.category.replace("_", " ")}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      {/* 2. CONTENT SECTION */}
      <div
        className={`p-8 md:p-10 flex flex-col justify-between ${isFeatured ? "md:w-1/2" : "flex-grow"}`}
      >
        <div>
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[9px] text-white/20 font-mono uppercase tracking-[0.2em]">
              <ShieldCheck size={12} className="text-[#00FF94]" />
              {isFeatured ? "FEATURED_SYSTEM_LOG" : "AUTH_ENTRY_v.2"}
            </div>
          </header>

          <Link href={`/blogs/${post.slug}`}>
            <h2
              className={`font-black text-white mb-4 leading-[1.1] group-hover:text-[#00FF94] transition-colors italic uppercase tracking-tighter ${
                isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
              }`}
            >
              {post.title}
            </h2>
          </Link>

          <p className="text-white/40 text-sm mb-6 line-clamp-3 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* 3. FOOTER */}
        <footer className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/60 uppercase flex items-center gap-1">
                <Clock size={10} /> 5 MIN
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-[10px] font-bold text-white/60 uppercase">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <Link
            href={`/blogs/${post.slug}`}
            className="h-12 w-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full group-hover:bg-[#00FF94] group-hover:text-black transition-all duration-500"
          >
            <ArrowUpRight size={20} />
          </Link>
        </footer>
      </div>
    </motion.article>
  );
}
