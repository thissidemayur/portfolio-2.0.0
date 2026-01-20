import React from "react";

interface BlogContentProps {
  content: string; // HTML string from your CMS/Markdown
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <section className="relative">
      
      <div
        className="
          prose prose-invert prose-blue max-w-none
          prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic
          prose-p:text-gray-400 prose-p:leading-relaxed
          prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/5
          prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
