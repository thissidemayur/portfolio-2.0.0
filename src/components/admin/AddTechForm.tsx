"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addTechAction } from "@/app/admin/tech/action";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { TechCategory } from "@/types/database";

// 1. Define Schema based on your iTech type
const techSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum([
    "languages & runtimes",
    "frontend",
    "backend",
    "database & ORMs",
    "devops",
    "tools",
    "other",
  ]),
  icon_slug: z.string().min(1, "Icon slug is required"),
  is_main_stack: z.boolean().default(false),
});

type TechFormValues = z.infer<typeof techSchema>;

export default function AddTechForm() {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TechFormValues>({
    resolver: zodResolver(techSchema),
    defaultValues: {
      is_main_stack: false,
      category: "languages & runtimes",
    },
  });

  const onSubmit = async (data: TechFormValues) => {
    // data is already formatted correctly by RHF + Zod
    const result = await addTechAction(data);

    if (result.success) {
      reset();
      setIsExpanded(false);
    } else {
      alert(result.error);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF94] hover:text-black transition-all group"
      >
        <Plus
          size={14}
          className="group-hover:rotate-90 transition-transform"
        />
        Register_New_Tech
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#0A0A0A] border border-[#00FF94]/30 p-6 rounded-2xl flex flex-wrap gap-4 items-start animate-in fade-in zoom-in duration-300"
    >
      {/* Name Field */}
      <div className="space-y-1">
        <label className="text-[9px] font-mono text-white/30 uppercase ml-1">
          Name
        </label>
        <input
          {...register("name")}
          placeholder="e.g., PostgreSQL"
          className={`bg-black border ${errors.name ? "border-red-500" : "border-white/10"} rounded-lg p-2 text-xs outline-none focus:border-[#00FF94] w-40`}
        />
      </div>

      {/* Category Field */}
      <div className="space-y-1">
        <label className="text-[9px] font-mono text-white/30 uppercase ml-1">
          Category
        </label>
        <select
          {...register("category")}
          className="bg-black border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-[#00FF94] h-[34px]"
        >
          <option value="languages & runtimes">Languages & Runtimes</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database & ORMs">Database & ORMs</option>
          <option value="devops">DevOps</option>
          <option value="tools">Tools</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Icon Slug Field */}
      <div className="space-y-1">
        <label className="text-[9px] font-mono text-white/30 uppercase ml-1">
          Icon_Slug
        </label>
        <input
          {...register("icon_slug")}
          placeholder="e.g. nodejs-plain"
          className={`bg-black border ${errors.icon_slug ? "border-red-500" : "border-white/10"} rounded-lg p-2 text-xs outline-none focus:border-[#00FF94] w-40`}
        />
      </div>

      {/* Main Stack Checkbox */}
      <div className="flex items-center gap-2 h-[58px] px-2">
        <input
          type="checkbox"
          id="is_main_stack"
          {...register("is_main_stack")}
          className="w-4 h-4 rounded border-white/10 bg-black checked:bg-[#00FF94] accent-[#00FF94]"
        />
        <label
          htmlFor="is_main_stack"
          className="text-[9px] font-mono text-white/30 uppercase cursor-pointer"
        >
          Main_Stack
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-2 h-[58px] items-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00FF94] text-black px-6 py-2 rounded-lg text-[10px] font-black uppercase hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] disabled:opacity-50 transition-all flex items-center gap-2  hover:cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            "Save"
          )}
        </button>
        <button
          onClick={() => {
            setIsExpanded(false);
            reset();
          }}
          type="button"
          className="  hover:cursor-pointer text-white/20 text-[10px] uppercase font-bold p-2 hover:text-red-500 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Error Feedback */}
      {(errors.name || errors.icon_slug) && (
        <div className="w-full flex items-center gap-2 text-red-500 text-[9px] font-mono mt-2 uppercase">
          <AlertCircle size={10} />
          <span>Validation Error: All fields marked with * are required</span>
        </div>
      )}
    </form>
  );
}
