import { Metadata } from "next";
import BlogFilters from "@/components/blog/BlogFilter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllBlog } from "@/dal/blogs.dal";
import { iBlog } from "@/types/database";

export const metadata: Metadata = {
  title: "Engineering Logs | Mayur Pal",
  description:
    "A collection of technical and non-technical articles and project notes by Mayur Pal, covering web development, cloud systems.",
};

export default async function BlogPage() {
  const posts: iBlog[] = await getAllBlog({offset:0});
 
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://thissidemayur.me/blogs/#blog",
        url: "https://thissidemayur.me/blogs",
        name: "Engineering Logs | Mayur Pal",
        description:
          "Technical insights and project walkthroughs covering Full-Stack and DevOps.",
        publisher: { "@id": "https://thissidemayur.me/#organization" },
        // 1. THIS TELLS CRAWLERS ABOUT EVERY POST
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `https://thissidemayur.me/blogs/${post.slug}`,
          datePublished: post.published_at,
          abstract: post.summary,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://thissidemayur.me",
          },
          { "@type": "ListItem", position: 2, name: "Engineering Logs" },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-8 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        <header className="mb-20 space-y-6">
          <nav className="mb-2">
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back
            </Link>
          </nav>
          {/* Simple explanation for Non-Tech visitors */}
          <div className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] uppercase tracking-[0.5em] font-black">
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
        <BlogFilters initialPosts={posts} />
      </div>
    </main>
  );
}
