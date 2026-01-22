import {BlogForm} from "@/components/admin/AddBlogForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <header className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="p-2 bg-white/5 rounded-lg hover:bg-white/10"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          Compose_Entry
        </h1>
      </header>
      <BlogForm />
    </div>
  );
}
