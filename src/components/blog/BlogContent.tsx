
interface BlogContentProps {
  content: string; // HTML string from your CMS/Markdown
}
export default function BlogContent({ content }: BlogContentProps) {
  return (
    <section className="relative group">
      {/* Decorative side accent */}
      <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/5 to-transparent hidden xl:block" />

      <div
        className="
          prose prose-invert prose-blue max-w-none
          /* Headings: Matching your OS aesthetic */
          prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic
          prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
          
          /* Body Text */
          prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-lg
          
          /* Links */
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-white transition-colors
          
          /* Blockquotes: Futuristic look */
          prose-blockquote:border-l-2 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 
          prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-white/80
          
          /* Lists & Code */
          prose-li:text-gray-400
          prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl
          
          /* Media */
          prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}