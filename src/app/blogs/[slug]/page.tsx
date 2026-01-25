import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import BlogFooter from "@/components/blog/BlogFooter";
import { getBlogBySlug, getPublicBlogBySlug } from "@/dal/blogs.dal";
import { iBlog } from "@/types/database";

// Next.js 15 uses a Promise for params
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: iBlog = await getPublicBlogBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Mayur Pal`,
    description: post.summary, // Summary is better for SEO than full content
    alternates: { canonical: `https://thissidemayur.me/blogs/${slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime:
        post.published_at instanceof Date
          ? post.published_at.toISOString()
          : post.published_at,
      authors: ["Mayur Pal"],
      images: [post.image_url],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: iBlog = await getBlogBySlug(slug);

  if (!post) notFound();

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

  return (
    <article className="min-h-screen bg-[#050505] text-white pt-32 pb-24 selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <nav className="mb-12">
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back_To_Logs
          </Link>
        </nav>

        {/* Note: Reading time and tags are derived or hardcoded since they aren't in your SQL iBlog interface yet */}
        <BlogHeader
          title={post.title}
          date={
            post.published_at instanceof Date
              ? post.published_at.toISOString()
              : post.published_at
          }
          readingTime="5" // Hardcoded or calculated
          tags={[post.category]} // Wrapping your BlogType in an array
        />

        <main className="mt-12">
          <BlogContent content={post.content} />
        </main>

        <footer className="mt-24">
          <hr className="border-white/10 mb-16" />
          <BlogFooter />
        </footer>
      </div>
    </article>
  );
}
