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
  params: { slug: string };
}) {
  const { slug } = await params;
  const post: iBlog = await getPublicBlogBySlug(slug);

  // Unified Schema Structure
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
  if (!post) NotFound();

  return (
    <article className="min-h-screen bg-[#050505] text-white pt-24 pb-24 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation */}
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
            Entry_Node: {post.id}
          </span>
        </nav>

        {/* Cover Image Section */}
        <div className="relative aspect-[21/9] w-full mb-16 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        </div>

        {/* Header Section */}
        <div className="max-w-3xl mx-auto">
          <BlogHeader
            title={post.title}
            date={
              post.published_at instanceof Date
                ? post.published_at.toISOString()
                : post.published_at
            }
            readingTime="5"
            tags={[post.category]}
          />

          {/* Main Content Area */}
          <main className="mt-16">
            <BlogContent content={post.content} />
          </main>

          {/* Footer */}
          <footer className="mt-24 pt-16 border-t border-white/5">
            <BlogFooter />
          </footer>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
