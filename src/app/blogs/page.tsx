import { Metadata } from "next";
import BlogFilters from "@/components/blog/BlogFilter";
import { blogPosts } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Engineering Logs | Mayur Pal",
  description:
    "A collection of technical articles and project notes by Mayur Pal, covering web development and cloud systems.",
};

export default function BlogPage() {
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: "https://thissidemayur.me/blogs",
    name: "Mayur Pal's Technical Blog",
    author: { "@id": "https://thissidemayur.me/#person" },
    description: "Technical insights and project walkthroughs by Mayur Pal.",
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-8 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        <header className="mb-20 space-y-6">
          {/* Simple explanation for Non-Tech visitors */}
          <div className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] uppercase tracking-[0.5em] font-black">
            Insight_Archive
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
            Technical <span className="text-white/20">Journal</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed font-medium">
            Welcome to my digital notebook. Here, I break down complex technical
            challenges into simple guides, sharing what I learn while building
            modern apps and cloud systems.
          </p>
        </header>

        {/* This component handles the search and category sorting */}
        <BlogFilters initialPosts={blogPosts} />
      </div>
    </main>
  );
}
