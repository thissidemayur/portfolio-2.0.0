import { getBlogById } from "@/dal/blogs.dal";
import {BlogForm} from "@/components/admin/AddBlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params
  const blog = await getBlogById(parseInt( id));
  if (!blog) notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <h1 className="text-3xl font-black italic uppercase tracking-tighter">
        Update_Entry
      </h1>
      <BlogForm initialData={blog} isEdit={true} />
    </div>
  );
}
