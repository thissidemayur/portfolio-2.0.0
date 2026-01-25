"use server";

import { addNewBlog, deleteBlog, updateBlog } from "@/dal/blogs.dal";
import { iBlog } from "@/types/database";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createBlogAction(
  blogData: Omit<iBlog, "id" | "updated_at" | "published_at">,
) {
  try {
    const result = await addNewBlog(blogData);

    revalidateTag("blogs", "max");

    revalidatePath("/");
    revalidatePath("/blogs");

    return { success: true, id: result.id };
  } catch (error) {
    console.error("Failed while creating the blog:", error);
    return { success: false, error: "Failed to publish blog entry." };
  }
}

export async function deleteBlogAction(id: number) {
  try {
    const blog = await deleteBlog(id);

    if (blog) {
      revalidateTag("blogs", "max");
      revalidateTag(`blog-${blog.slug}`, "max");
    }

    revalidatePath("/blogs");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return { success: false, error: "Database operation failed." };
  }
}

export async function updateBlogAction(id: number, data: Partial<iBlog>) {
  try {
    const blog: iBlog = await updateBlog(id, data);

    revalidateTag("blogs", "max");
    revalidateTag(`blog-${blog.slug}`, "max");

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error(`Failed while updating the blogs: ${error}`);
    return { success: false, error: "Failed to update blog" };
  }
}
