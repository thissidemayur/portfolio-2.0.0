"use client";
import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  FieldErrors,
  FieldArrayWithId,
  UseFormRegister,
  Control,
} from "react-hook-form"; // Added Controller
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
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createProjectAction,
  updateProjectAction,
} from "@/actions/projects.actions";
import { iProject, iTech } from "@/types/database";
import { RichTextEditor } from "./Editor";
import { toast } from "sonner";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(10, "Case study content is too short"),
  image_url: z.string().url("Must be a valid URL"),
  live_url: z.string().url().optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL"),
  // FIX: Remove .default() to satisfy the strict boolean type
  is_featured: z.boolean(),
  problem_statement: z.string().min(1, "Problem statement is required"),
  solution_approach: z.string().min(1, "Solution approach is required"),
  key_learnings: z
    .array(z.object({ value: z.string().min(1, "Learning cannot be empty") }))
    .min(1, "Add at least one learning"),
  challenges_faced: z
    .array(z.object({ value: z.string().min(1, "Challenge cannot be empty") }))
    .min(1, "Add at least one challenge"),

});

type ProjectFormValues = z.infer<typeof projectSchema>;
type ProjectSubmissionData = Omit<iProject, "id" | "created_at" | "updated_at">;
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
      ? {
          ...initialData,
          live_url: initialData.live_url || "",
          // FIX: Map strings to objects
          key_learnings: initialData.key_learnings.map((val) => ({
            value: val,
          })),
          challenges_faced: initialData.challenges_faced.map((val) => ({
            value: val,
          })),
        }
      : {
          key_learnings: [{ value: "" }],
          challenges_faced: [{ value: "" }],
          is_featured: false,
          content: "",
        },
  });

  const {
    fields: lFields,
    append: lAppend,
    remove: lRemove,
  } = useFieldArray<ProjectFormValues>({
    control,
    name: "key_learnings",
  });

  const {
    fields: cFields,
    append: cAppend,
    remove: cRemove,
  } = useFieldArray<ProjectFormValues>({
    control,
    name: "challenges_faced",
  });


  const onSubmit = async (data: ProjectFormValues) => {
    if (selectedTechIds.length === 0) {
      toast.error("Select at least one technology.");
      return;
    }

    const formattedData: ProjectSubmissionData = {
      ...data,
      key_learnings: data.key_learnings.map((item) => item.value),
      challenges_faced: data.challenges_faced.map((item) => item.value),
  
      tech_stack: [],
   
    };

    const result =
      isEdit && initialData
        ? await updateProjectAction(
            initialData.id,
            formattedData,
            selectedTechIds,
          )
        : await createProjectAction(formattedData, selectedTechIds);

    if (!result.success) {
      toast.error(result.error || "Execution_Failure: Check console logs.");
    } else {
      toast.success(result.success);
      router.push("/admin/projects");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
    >
      {/* LEFT COLUMN */}
      <div className="lg:col-span-8 space-y-6">
        <section className="bg-[#0A0A0A] p-5 md:p-8 rounded-[1.5rem] border border-white/5 space-y-6">
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

          {/* TIPTAP EDITOR REPLACES TEXTAREA */}
          <InputWrapper
            label="Full_Case_Study_Content"
            error={errors.content?.message}
          >
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

        {/* Other Sections (Problem, Solution, etc.) */}
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

        {/* Inside ProjectForm return */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArrayInputSection
            title="Key_Learnings"
            name="key_learnings"
            control={control}
            register={register}
            errors={errors}
          />
          <ArrayInputSection
            title="Challenges_Faced"
            name="challenges_faced"
            control={control}
            register={register}
            errors={errors}
          />
        </div>
        
      </div>

      {/* RIGHT COLUMN (Sidebar) */}
      <div className="lg:col-span-4 space-y-6">
        <section className="bg-[#0A0A0A] p-6 rounded-[1.5rem] border border-white/5 space-y-4">
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
            {/* Live and Repo Links */}
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

        {/* Tech Stack and Launch Button */}
        <section className="bg-[#0A0A0A] p-6 rounded-[1.5rem] border border-white/5 space-y-4">
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
          className="w-full py-5 bg-[#00FF94] text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,255,148,0.3)] disabled:opacity-50 transition-all"
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




// Define the interface using React Hook Form generics
interface ArrayInputSectionProps {
  title: string;
  // This ensures 'name' can ONLY be one of your specific array fields
  name: "key_learnings" | "challenges_faced";
  control: Control<ProjectFormValues>;
  register: UseFormRegister<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
}

function ArrayInputSection({
  title,
  name,
  control,
  register,
  errors,
}: ArrayInputSectionProps) {
  // We move useFieldArray inside to let RHF handle the specific types for this 'name'
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="bg-[#0A0A0A] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-5">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] font-mono uppercase text-white/30 tracking-[0.2em] font-bold">
          {title.replace("_", " ")}
        </h3>

        {/* Append an object with the 'value' key - fully type-checked */}
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="text-[#00FF94] text-[9px] font-black tracking-widest border border-[#00FF94]/20 px-3 py-1.5 rounded-lg hover:bg-[#00FF94]/10 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={12} strokeWidth={3} /> ADD_ENTRY
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, i) => {
          // Drill into the error object safely
          const fieldError = errors[name]?.[i]?.value;

          return (
            <div
              key={field.id}
              className="group space-y-2 animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex gap-3 items-center">
                <span className="text-[10px] font-mono text-white/10 w-4">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex-1">
                  {/* register path is now type-safe */}
                  <input
                    {...register(`${name}.${i}.value` as const)}
                    placeholder="System_log: input required..."
                    className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-xs md:text-sm text-white/80 outline-none focus:border-[#00FF94]/30 focus:bg-black/60 transition-all placeholder:text-white/5"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-2 text-white/10 hover:text-red-500 transition-colors group-hover:text-white/30"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {fieldError && (
                <p className="text-red-500 text-[8px] font-mono ml-9 flex items-center gap-1 uppercase tracking-tighter">
                  <AlertCircle size={10} />
                  {fieldError.message || "Entry_Void: Payload required"}
                </p>
              )}
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="py-8 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-2">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              No_Data_Packets_Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div className="flex justify-between items-center ml-2">
        <label className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">
          {label}
        </label>
        {error && (
          <span className="text-red-500 text-[8px] font-mono uppercase tracking-tighter">
            Error_Detected
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="text-red-500 text-[9px] font-mono mt-1 ml-2 flex items-center gap-1 animate-in fade-in slide-in-from-left-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}