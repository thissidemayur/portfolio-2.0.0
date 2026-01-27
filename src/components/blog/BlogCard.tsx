"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, ArrowUpRight, Zap, BookOpen } from "lucide-react";
import Link from "next/link";
import { iBlog } from "@/types/database"; // Use your actual interface

export default function BlogCard({ post, idx }: { post: iBlog; idx: number }) {
  const isTech = post.category === "TECHNICAL";

  // If it's one of the first two cards, don't animate the entrance to save LCP
  const isAboveFold = idx < 2;


  return (
    <motion.article
      initial={isAboveFold ? false : { opacity: 0, y: 20 }}
      animate={isAboveFold ? { opacity: 1, y: 0 } : undefined}
      whileInView={isAboveFold ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:border-blue-500/30 ${
        post.is_featured ? "md:col-span-2 bg-blue-500/[0.01]" : ""
      }`}
    >
      <header className="flex justify-between items-start mb-8">
        <span
          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
            isTech
              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          }`}
        >
          {isTech ? (
            <Zap size={10} className="inline mr-1" />
          ) : (
            <BookOpen size={10} className="inline mr-1" />
          )}
          {post.category.replace("_", " ")}
        </span>

        <div className="flex items-center gap-2 text-[9px] text-white/20 font-mono uppercase">
          <ShieldCheck size={12} className="text-blue-500" />
          Verified_Log
        </div>
      </header>

      <Link href={`/blogs/${post.slug}`}>
        <h2
          className={`${post.is_featured ? "text-3xl md:text-5xl" : "text-2xl"} font-black text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors italic uppercase tracking-tighter`}
        >
          {post.title}
        </h2>
      </Link>

      <p className="text-gray-500 text-sm mb-12 line-clamp-3 leading-relaxed font-medium">
        {post.summary}
      </p>

      <footer className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> 5 min read
          </span>
          <time
            suppressHydrationWarning
            dateTime={new Date(post.published_at).toLocaleDateString()}
          ></time>
        </div>
        <Link
          href={`/blogs/${post.slug}`}
          className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-all"
        >
          <ArrowUpRight size={18} />
        </Link>
      </footer>
    </motion.article>
  );
}
