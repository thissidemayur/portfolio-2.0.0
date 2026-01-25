"use server";

import { addNewBlog, deleteBlog, updateBlog } from "@/dal/blogs.dal";
import { iBlog } from "@/types/database";
import { revalidatePath } from "next/cache";

export async function createBlogAction(
  blogData: Omit<iBlog, "id" | "updated_at" | "published_at">,
) {
  try {
    const result = await addNewBlog(blogData);

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Failed while creating the blog:", error);
    return { success: false, error: "Failed to publish blog entry." };
  }
}

export async function deleteBlogAction(id: number) {
  try {
    await deleteBlog(id);

    // Clear cache for both the admin panel and the public blog list
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");

    return { success: true };
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return { success: false, error: "Database operation failed." };
  }
}

export async function updateBlogAction(id: number, data: Partial<iBlog>) {
  try {
    await updateBlog(id, data);
    revalidatePath("/admin/blogs");
    revalidatePath(`/blogs/${data.slug}`);
    return { success: true };
  } catch (error) {
    console.error(`failed while updating the blogs: ${error}`)
    return { success: false, error: "Failed to update blog" };
  }
}