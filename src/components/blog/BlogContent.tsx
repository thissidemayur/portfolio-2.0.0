
export default function BlogContent({ content }: { content: string }) {
  return (
    <section className="relative group">
      {/* Decorative side accent */}
      <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/5 to-transparent hidden xl:block" aria-hidden="true" />

      <div
        className="
          /* Ensure the prose class is applied clearly */
          prose prose-invert prose-blue max-w-none
          
          /* Headings Fix: Tiptap H1/H2/H3 */
          prose-headings:text-white prose-headings:italic prose-headings:uppercase
          prose-h1:text-4xl md:prose-h1:text-6xl prose-h1:mb-12
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4
          prose-h3:text-xl prose-h3:text-blue-400
          
          /* Bold & Italic Fix */
          prose-strong:text-white prose-strong:font-black
          prose-em:text-blue-400/80
          
          /* Paragraphs */
          prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed
          
          /* Lists: Fixes markers not showing */
          prose-li:text-gray-400 prose-ol:list-decimal prose-ul:list-disc
          
          /* Code blocks for Tiptap */
          prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-3xl prose-pre:p-6
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}