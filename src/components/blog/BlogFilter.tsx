"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { iBlog } from "@/types/database";

export default function BlogFilters({
  initialPosts,
}: {
  initialPosts: iBlog[];
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesTab = activeTab === "All" || post.category === activeTab;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, initialPosts]);

  const categories = ["All", "TECHNICAL", "NON_TECHNICAL"];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-y border-white/5 py-10">
        <nav className="flex gap-3">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </nav>

        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER_BY_KEYWORDS..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post, idx) => (
          <BlogCard key={post.id} post={post} idx={idx} />
        ))}
      </div>
    </div>
  );
}
