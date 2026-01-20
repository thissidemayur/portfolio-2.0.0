"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  verifiedBy: string;
  isFeatured?: boolean;
  slug: string;
}

export default function BlogFilters({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Logic: Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesTab = activeTab === "All" || post.category === activeTab;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, initialPosts]);

  const categories = ["All", "Core CS", "Architecture", "AI", "MERN Stack"];

  return (
    <div className="space-y-12">
      {/* 1. FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-y border-white/5 py-8">
        {/* Category Tabs */}
        <nav className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics or keywords..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* 2. RESULTS GRID */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.slug || idx} post={post} idx={idx} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-white/10 rounded-[3rem]">
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            No matching logs found for your query.
          </p>
        </div>
      )}
    </div>
  );
}
