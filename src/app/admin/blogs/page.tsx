import Link from "next/link";
import { Plus, PenTool, Hash, Calendar } from "lucide-react";
import { getAllBlog } from "@/dal/blogs.dal";
import {DeleteBlogButton} from "@/components/admin/DeleteBlogButton";

export default async function AdminBlogsPage() {
  const blogs = await getAllBlog({ limit: 100, offset: 0 });

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Journal_Logs <span className="text-white/20">/ Blogs</span>
          </h1>
          <p className="text-white/40 text-sm font-mono mt-1">
            Manage technical and personal entries.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="bg-[#00FF94] text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
        >
          + Create_Entry
        </Link>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
            <tr>
              <th className="p-6">Type</th>
              <th className="p-6">Title</th>
              <th className="p-6">Published</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="group hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-bold border ${
                      blog.category === "TECHNICAL"
                        ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
                        : "border-purple-500/30 text-purple-400 bg-purple-500/5"
                    }`}
                  >
                    {blog.category}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white/90">
                      {blog.title}
                    </span>
                    <span className="text-[10px] font-mono text-white/20">
                      /{blog.slug}
                    </span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Calendar size={12} />
                    {new Date(blog.published_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/blogs/${blog.id}`}
                      className="text-blue-400 hover:text-white transition-colors"
                    >
                      <PenTool size={18} />
                    </Link>
                    <DeleteBlogButton id={blog.id} title={blog.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
