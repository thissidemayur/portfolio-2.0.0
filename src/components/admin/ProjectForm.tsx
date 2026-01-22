"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Save,
  Loader2,
  Trash2,
  Globe,
  Github,
  Image as ImageIcon,
  AlertCircle,
  Code,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/admin/projects/action";
import { iProject, iTech } from "@/types/database";

// Define the Schema Type for Zod
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  image_url: z.string().url("Must be a valid URL"),
  live_url: z.string().url().optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL"),
  is_featured: z.boolean().default(false),
  problem_statement: z.string().min(1, "Problem statement is required"),
  solution_approach: z.string().min(1, "Solution approach is required"),
  key_learnings: z
    .array(z.string().min(1, "Learning cannot be empty"))
    .min(1, "Add at least one learning"),
  challenges_faced: z
    .array(z.string().min(1, "Challenge cannot be empty"))
    .min(1, "Add at least one challenge"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  allTech: iTech[];
  initialData?: iProject & { tech_ids?: number[] };
  isEdit?: boolean;
}

export function ProjectForm({
  allTech,
  initialData,
  isEdit = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [selectedTechIds, setSelectedTechIds] = useState<number[]>(
    initialData?.tech_ids || [],
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? { ...initialData, live_url: initialData.live_url || "" }
      : {
          key_learnings: [""],
          challenges_faced: [""],
          is_featured: false,
        },
  });

  const {
    fields: lFields,
    append: lAppend,
    remove: lRemove,
  } = useFieldArray({ control, name: "key_learnings" });
  const {
    fields: cFields,
    append: cAppend,
    remove: cRemove,
  } = useFieldArray({ control, name: "challenges_faced" });

  const onSubmit = async (data: ProjectFormValues) => {
    if (selectedTechIds.length === 0)
      return alert("Select at least one technology.");
    const result =
      isEdit && initialData
        ? await updateProjectAction(initialData.id, data, selectedTechIds)
        : await createProjectAction(data, selectedTechIds);

    if (result.success) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
    >
      {/* LEFT COLUMN: Main Content */}
      <div className="lg:col-span-8 space-y-6">
        <section className="bg-[#0A0A0A] p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <InputWrapper label="Title" error={errors.title?.message}>
              <input
                {...register("title")}
                className="w-full bg-black/40 border border-white/10 p-3 md:p-4 rounded-xl outline-none focus:border-[#00FF94]/50 transition-all"
              />
            </InputWrapper>
            <InputWrapper label="Slug" error={errors.slug?.message}>
              <input
                {...register("slug")}
                className="w-full bg-black/40 border border-white/10 p-3 md:p-4 rounded-xl outline-none font-mono text-sm"
              />
            </InputWrapper>
          </div>

          <InputWrapper label="Summary" error={errors.summary?.message}>
            <textarea
              {...register("summary")}
              className="w-full bg-black/40 border border-white/10 p-3 md:p-4 rounded-xl outline-none h-24 resize-none transition-all"
            />
          </InputWrapper>

          <InputWrapper
            label="Content (Markdown/HTML)"
            error={errors.content?.message}
          >
            <textarea
              {...register("content")}
              className="w-full bg-black/40 border border-white/10 p-3 md:p-4 rounded-xl outline-none h-64 md:h-96 font-mono text-xs leading-relaxed"
            />
          </InputWrapper>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWrapper
            label="Problem Statement"
            error={errors.problem_statement?.message}
          >
            <textarea
              {...register("problem_statement")}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none h-40 resize-none"
            />
          </InputWrapper>
          <InputWrapper
            label="Solution Approach"
            error={errors.solution_approach?.message}
          >
            <textarea
              {...register("solution_approach")}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none h-40 resize-none"
            />
          </InputWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArrayInputSection
            title="Key_Learnings"
            name="key_learnings"
            fields={lFields}
            register={register}
            append={lAppend}
            remove={lRemove}
            errors={errors}
          />
          <ArrayInputSection
            title="Challenges_Faced"
            name="challenges_faced"
            fields={cFields}
            register={register}
            append={cAppend}
            remove={cRemove}
            errors={errors}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar (Stacks on mobile) */}
      <div className="lg:col-span-4 space-y-6">
        <section className="bg-[#0A0A0A] p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-4">
          <h3 className="text-[10px] font-mono uppercase text-white/20 px-2 tracking-widest">
            Deploy_Assets
          </h3>
          <div className="space-y-4">
            <InputWrapper label="Preview URL" error={errors.image_url?.message}>
              <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl">
                <ImageIcon size={14} className="text-white/30" />
                <input
                  {...register("image_url")}
                  className="bg-transparent outline-none text-[11px] font-mono w-full text-blue-400"
                />
              </div>
            </InputWrapper>
            <InputWrapper label="Live Link" error={errors.live_url?.message}>
              <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl">
                <Globe size={14} className="text-white/30" />
                <input
                  {...register("live_url")}
                  className="bg-transparent outline-none text-[11px] font-mono w-full text-white/60"
                />
              </div>
            </InputWrapper>
            <InputWrapper label="Github Repo" error={errors.repo_url?.message}>
              <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl">
                <Github size={14} className="text-white/30" />
                <input
                  {...register("repo_url")}
                  className="bg-transparent outline-none text-[11px] font-mono w-full text-white/60"
                />
              </div>
            </InputWrapper>
          </div>
        </section>

        <section className="bg-[#0A0A0A] p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-mono uppercase text-white/20 tracking-widest">
              Tech_Stack
            </h3>
            <span className="text-[10px] font-mono text-[#00FF94]">
              {selectedTechIds.length} Active
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {allTech.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() =>
                  setSelectedTechIds((prev) =>
                    prev.includes(t.id)
                      ? prev.filter((x) => x !== t.id)
                      : [...prev, t.id],
                  )
                }
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all active:scale-95 ${selectedTechIds.includes(t.id) ? "bg-[#00FF94] text-black border-[#00FF94]" : "bg-white/5 text-white/40 border-white/10"}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="sticky bottom-4 lg:relative w-full py-5 bg-[#00FF94] text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,255,148,0.3)] disabled:opacity-50 transition-all z-10"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Save size={18} />{" "}
              {isEdit ? "Update_Production_Build" : "Launch_New_Build"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// Sub-components
function InputWrapper({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-2 font-bold">
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

function ArrayInputSection({
  title,
  name,
  fields,
  register,
  append,
  remove,
  errors,
}: any) {
  return (
    <div className="bg-[#0A0A0A] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-5">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] font-mono uppercase text-white/30 tracking-widest font-bold">
          {title}
        </h3>
        <button
          type="button"
          onClick={() => append("")}
          className="text-[#00FF94] text-[10px] font-black tracking-widest border border-[#00FF94]/20 px-2 py-1 rounded-md hover:bg-[#00FF94]/5 transition-all"
        >
          + ADD
        </button>
      </div>
      <div className="space-y-3">
        {fields.map((field: any, i: number) => (
          <div
            key={field.id}
            className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div className="flex gap-2">
              <input
                {...register(`${name}.${i}`)}
                placeholder="Action/Result..."
                className="flex-1 bg-black/20 border border-white/5 p-3 rounded-xl text-xs md:text-sm outline-none focus:border-[#00FF94]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-2 text-red-500/30 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {errors[name]?.[i] && (
              <p className="text-red-500 text-[8px] font-mono ml-2 italic">
                Entry cannot be empty
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
