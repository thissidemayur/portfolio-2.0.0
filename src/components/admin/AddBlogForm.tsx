"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Loader2, ImageIcon, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createBlogAction, updateBlogAction } from "@/actions/blog.actions";
import { iBlog } from "@/types/database";
import { RichTextEditor } from "./Editor";

// 1. Define the Zod Schema
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image_url: z.string().url("Must be a valid URL"),
  category: z.enum(["TECHNICAL", "NON_TECHNICAL"]),
  is_featured: z.boolean().default(false),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export function BlogForm({
  initialData,
  isEdit,
}: {
  initialData?: iBlog;
  isEdit?: boolean;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control, // Necessary for the Tiptap Controller
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          category: "TECHNICAL",
          is_featured: false,
          content: "",
        },
  });

  const onSubmit = async (data: BlogFormValues) => {
    const result =
      isEdit && initialData
        ? await updateBlogAction(initialData.id, data)
        : await createBlogAction(data);

    if (result.success) {
      router.push("/admin/blogs");
      router.refresh();
    } else {
      alert(result.error || "Failed to save entry.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-6">
        <section className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-white/5 space-y-6">
          <InputWrapper label="Article_Title" error={errors.title?.message}>
            <input
              {...register("title")}
              placeholder="e.g., Understanding Next.js Server Actions"
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-[#00FF94]/50 transition-all text-white"
            />
          </InputWrapper>

          <InputWrapper label="Summary" error={errors.summary?.message}>
            <textarea
              {...register("summary")}
              placeholder="Short teaser for the blog card..."
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none h-24 resize-none transition-all text-white text-sm"
            />
          </InputWrapper>

          {/* TIPTAP RICH TEXT EDITOR INTEGRATION */}
          <InputWrapper label="Content_Body" error={errors.content?.message}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor 
                  content={field.value} 
                  onChange={(html) => field.onChange(html)} 
                />
              )}
            />
          </InputWrapper>
        </section>
      </div>

      {/* Sidebar Area */}
      <div className="lg:col-span-4 space-y-6">
        <section className="bg-[#0A0A0A] p-6 rounded-[2.5rem] border border-white/5 space-y-6 sticky top-8">
          <div className="space-y-4">
            <InputWrapper label="Identifier_Slug" error={errors.slug?.message}>
              <input
                {...register("slug")}
                placeholder="my-blog-post"
                className="w-full bg-black/40 border border-white/10 p-3 rounded-lg outline-none font-mono text-xs text-white"
              />
            </InputWrapper>

            <InputWrapper label="Category_Type" error={errors.category?.message}>
              <select
                {...register("category")}
                className="w-full bg-black/40 border border-white/10 p-3 rounded-lg outline-none text-xs text-white"
              >
                <option value="TECHNICAL">TECHNICAL</option>
                <option value="NON_TECHNICAL">NON_TECHNICAL</option>
              </select>
            </InputWrapper>

            <InputWrapper label="Cover_Image_URL" error={errors.image_url?.message}>
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 p-3 rounded-lg">
                <ImageIcon size={14} className="text-white/20" />
                <input
                  {...register("image_url")}
                  placeholder="https://..."
                  className="bg-transparent outline-none text-xs w-full text-white"
                />
              </div>
            </InputWrapper>
          </div>

          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              {...register("is_featured")}
              className="w-4 h-4 accent-[#00FF94]"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Pin to Home Page
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full py-5 bg-[#00FF94] text-black font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,148,0.2)] disabled:opacity-50 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Save size={20} /> {isEdit ? "UPDATE_ENTRY" : "COMMIT_ENTRY"}
              </>
            )}
          </button>
        </section>
      </div>
    </form>
  );
}

function InputWrapper({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[9px] font-mono mt-1 ml-2 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}