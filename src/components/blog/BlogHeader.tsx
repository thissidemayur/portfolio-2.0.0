interface BlogHeaderProps {
  title: string;
  date: string;
  readingTime: string;
  tags?: string[];
}
export default function BlogHeader({ title, date, readingTime, tags }: BlogHeaderProps ) {
  return (
    <header className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] font-mono text-blue-500 uppercase font-bold tracking-widest bg-blue-500/10 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
        {title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-white/40 font-medium">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span>•</span>
        <span>{readingTime} min read</span>
      </div>
    </header>
  );
}
