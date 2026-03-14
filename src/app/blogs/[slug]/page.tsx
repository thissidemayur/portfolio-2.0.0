import NotFound from "@/app/not-found";
import BlogContent from "@/components/blog/BlogContent";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogHeader from "@/components/blog/BlogHeader";
import { getPublicBlogBySlug } from "@/dal/blogs.dal";
import { iBlog } from "@/types/database";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: iBlog = await getPublicBlogBySlug(slug);

  // 1. Safety First: If no post, stop immediately
  if (!post) return NotFound();

  // 2. Content is now simple Markdown string
  const content = post.content;

  // 3. Structured Data (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://thissidemayur.me/blogs/${slug}/#post`,
        headline: post.title,
        description: post.summary,
        datePublished:
          post.published_at instanceof Date
            ? post.published_at.toISOString()
            : post.published_at,
        dateModified: post.updated_at
          ? post.updated_at instanceof Date
            ? post.updated_at.toISOString()
            : post.updated_at
          : post.published_at instanceof Date
            ? post.published_at.toISOString()
            : post.published_at,
        image: post.image_url,
        author: { "@id": "https://thissidemayur.me/#person" },
        publisher: { "@id": "https://thissidemayur.me/#organization" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://thissidemayur.me/blogs/${slug}`,
        },
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
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: "https://thissidemayur.me/blogs",
          },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-[#050505] text-white pt-24 pb-24 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-6">
        <nav className="mb-8 flex justify-between items-center">
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-[0.3em] uppercase"
          >
            <ArrowLeft
              size={12}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </Link>
          <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.5em]">
            Node_ID: {post.id}
          </span>
        </nav>

        {/* 1. Add 'group' to the container */}
<div className="group relative aspect-[21/9] w-full mb-16 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
  <Image
    src={post.image_url}
    alt={post.title}
    fill
    priority
    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
  />
  
  {/* 3. Add pointer-events-none so the mouse "passes through" to the image */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000" />
</div>

        <div className="max-w-3xl mx-auto">
          <BlogHeader
            title={post.title}
            date={post.published_at.toString()}
            readingTime="5"
            tags={[post.category]}
          />

          <main className="mt-16">
            {/* The Markdown Component handles everything now */}
            <BlogContent content={content} />
          </main>

          <footer className="mt-24 pt-16 border-t border-white/5">
            <BlogFooter />
          </footer>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
