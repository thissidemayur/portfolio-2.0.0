"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BlogCard({ post, idx }: { post: any; idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -10 }}
      className={`group p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:border-emerald-500/30 ${
        post.isFeatured
          ? "md:col-span-2 lg:col-span-2 bg-emerald-500/[0.02]"
          : ""
      }`}
    >
      <header className="flex justify-between items-start mb-8">
        <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-white/10">
          {post.category}
        </span>
        <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono font-black uppercase">
          <ShieldCheck size={14} />
          {post.verifiedBy}
        </div>
      </header>

      <Link href={`/blogs/${post.slug || "#"}`}>
        <h2
          className={`${post.isFeatured ? "text-3xl md:text-4xl" : "text-xl"} font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors`}
        >
          {post.title}
        </h2>
      </Link>

      <p className="text-gray-400 text-sm mb-12 line-clamp-3 leading-relaxed">
        {post.excerpt}
      </p>

      <footer className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {post.readTime}
          </span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <div className="p-3 bg-white/5 rounded-full group-hover:bg-emerald-500 group-hover:text-black transition-all">
          <ArrowUpRight size={18} />
        </div>
      </footer>
    </motion.article>
  );
}
