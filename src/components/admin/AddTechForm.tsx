"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addTechAction } from "@/actions/tech.actions";
import { Plus, Loader2, AlertCircle, Terminal } from "lucide-react";

// 1. Updated Schema to match Database ENUMs exactly
const techSchema = z.object({
  name: z.string().min(1, "Technology name is required"),
  category: z.enum([
    "PROGRAMMING_LANGUAGES",
    "FRONTEND",
    "BACKEND",
    "DB_ORM",
    "INFRASTRUCTURE(aws)",
    "DEVOPS",
    "TOOLS",
  ]),
  is_main_stack: z.boolean(),
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
      category: "PROGRAMMING_LANGUAGES",
    },
  });

  const onSubmit = async (data: TechFormValues) => {
    const result = await addTechAction(data);

    if (result.success) {
      reset();
      setIsExpanded(false);
    } else {
      // Direct feedback if server action fails
      console.error("Inbound_Payload_Error:", result.error);
      alert(`System Error: ${result.error}`);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00FF94] hover:text-black transition-all duration-300 group shadow-lg shadow-black"
      >
        <Plus
          size={14}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
        Initialize_New_Component
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-[#0A0A0A] border border-[#00FF94]/30 p-8 rounded-[2rem] flex flex-wrap gap-6 items-start animate-in fade-in zoom-in duration-500 shadow-[0_0_50px_rgba(0,255,148,0.05)]"
    >
      {/* Name Field */}
      <div className="flex-1 min-w-[200px] space-y-2">
        <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
          <Terminal size={10} /> Identifier
        </label>
        <input
          {...register("name")}
          autoFocus
          placeholder="e.g., Golang"
          className={`w-full bg-black border ${
            errors.name ? "border-red-500/50" : "border-white/10"
          } rounded-xl p-3 text-sm text-white outline-none focus:border-[#00FF94] transition-colors`}
        />
      </div>

      {/* Category Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          Classification
        </label>
        <select
          {...register("category")}
          className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00FF94] h-[46px] transition-colors cursor-pointer"
        >
          <option value="PROGRAMMING_LANGUAGES">Languages & Runtimes</option>
          <option value="FRONTEND">Frontend Frameworks</option>
          <option value="BACKEND">Backend Systems</option>
          <option value="DB_ORM">Database & ORMs</option>
          <option value="INFRASTRUCTURE(aws)">AWS Cloud Infra</option>
          <option value="DEVOPS">DevOps Pipelines</option>
          <option value="TOOLS">Developer Tools</option>
        </select>
      </div>

      {/* Main Stack Toggle */}
      <div className="flex flex-col justify-end h-[74px] px-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              {...register("is_main_stack")}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-[#00FF94]/20 peer-checked:border-[#00FF94]/50 transition-all"></div>
            <div className="absolute left-1 top-1 w-3 h-3 bg-white/20 rounded-full peer-checked:left-6 peer-checked:bg-[#00FF94] transition-all"></div>
          </div>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest group-hover:text-white/50 transition-colors">
            Main_Priority
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 h-[74px] items-end ml-auto">
        <button
          type="button"
          onClick={() => {
            setIsExpanded(false);
            reset();
          }}
          className="px-6 py-3 text-white/20 text-[10px] uppercase font-black tracking-widest hover:text-red-500 transition-colors cursor-pointer"
        >
          Abort
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00FF94] text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            "Commit_Change"
          )}
        </button>
      </div>

      {/* Error Logic */}
      {errors.name && (
        <div className="w-full flex items-center gap-2 text-red-500/80 text-[10px] font-mono mt-4 uppercase tracking-tighter animate-pulse">
          <AlertCircle size={12} />
          <span>Integrity Error: {errors.name.message}</span>
        </div>
      )}
    </form>
  );
}
