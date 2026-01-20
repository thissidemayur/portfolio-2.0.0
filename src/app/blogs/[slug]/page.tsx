import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import BlogFooter from "@/components/blog/BlogFooter";

interface Params {
  slug: string;
}

// 1. DYNAMIC METADATA (SEO)
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug); // Your data fetcher
  if (!post) return {};

  return {
    title: `${post.title} | Mayur Pal`,
    description: post.description,
    alternates: { canonical: `https://thissidemayur.me/blogs/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Mayur Pal"],
      images: [post.ogImage || "/default-blog-og.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thissidemayur.me/blogs/${params.slug}`,
    },
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@id": "https://thissidemayur.me/#person" },
    publisher: {
      "@type": "Organization",
      name: "Mayur Pal",
      logo: {
        "@type": "ImageObject",
        url: "https://thissidemayur.me/logo.png",
      },
    },
  };

  return (
    <article className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* 2. SEMANTIC HEADER */}
        <BlogHeader
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
          tags={post.tags}
        />

        {/* 3. SEMANTIC MAIN CONTENT */}
        <main className="prose prose-invert prose-blue max-w-none mt-12">
          <BlogContent content={post.content} />
        </main>

        {/* 4. FOOTER */}
        <hr className="my-16 border-white/10" />
        <BlogFooter />
      </div>
    </article>
  );
}
