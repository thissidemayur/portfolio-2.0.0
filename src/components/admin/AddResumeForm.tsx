"use client";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { iResume } from "@/types/database";
import {
  Save,
  Plus,
  Trash2,
  X,
  Briefcase,
  GraduationCap,
  Trophy,
  Layout,
  Code,
  Terminal,
  Clock,
  MapPin,
  Link as LinkIcon,
  CheckCircle,
} from "lucide-react";
import { uploadNewResume } from "@/dal/resumes.dal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ResumeAdminForm = ({
  initialData,
  onClose,
}: {
  initialData?: iResume | null;
  onClose: () => void;
}) => {
  const { register, control, handleSubmit } = useForm<iResume>({
    defaultValues: initialData || {
      version_name: "",
      category: "GENERAL",
      is_latest: true,
      summary: [],
      skills: [{ category: "", items: [] }],
      experience: [],
      projects: [],
      education: [],
      achievements: [],
    },
  });

  // Root Level Field Arrays for Complex Objects
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experience" });
  const {
    fields: projFields,
    append: appendProj,
    remove: removeProj,
  } = useFieldArray({ control, name: "projects" });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "education" });

  const router = useRouter()
  const onSubmit = async (data: iResume) => {
    const toastId = toast.loading("Initializing data uplink...");
    try {
      const result = await uploadNewResume(data);

      // Check if your server action returns a custom error object
      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Resume system synchronized.", {
        id: toastId,
        description: `Version ${data.version_name} is now live.`,
        icon: <CheckCircle className="text-emerald-500" size={16} />,
      });
      router.push("/admin/resumes")

    } catch (error) {
      console.error("DATA_SYNC_FAILURE:", error);
      toast.error("Something went wrong" )
      // Specific UX for the Duplicate Key error we saw earlier
      
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto space-y-10 md:space-y-16 pb-40 px-4 md:px-0"
    >
      {/* 1. STICKY SYSTEM CONTROL - Full Responsive */}
      <div className="flex flex-col md:flex-row justify-between items-center sticky top-0 bg-[#050505]/95 backdrop-blur-xl z-50 py-4 md:py-6 border-b border-white/10 gap-4 px-0.5 md:px-2">
        {/* TOP ROW: Navigation & Brand */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={onClose}
              type="button"
              className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl font-black uppercase tracking-tighter italic leading-none">
                Resume_Architect
              </h1>
              <span className="text-[8px] md:text-[9px] font-mono text-[#00FF94] mt-1">
                BUILD: 2026.01.25
              </span>
            </div>
          </div>

          {/* MOBILE ONLY SAVE BUTTON (Icon Only to save space) */}
          <button
            type="submit"
            className="md:hidden bg-[#00FF94] text-black p-3 rounded-xl shadow-[0_0_15px_rgba(0,255,148,0.4)] active:scale-95 transition-all"
          >
            <Save size={20} />
          </button>
        </div>

        {/* BOTTOM ROW (Mobile) / RIGHT SIDE (Desktop): Controls */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 md:gap-8 bg-white/[0.02] md:bg-transparent p-3 md:p-0 rounded-2xl border border-white/5 md:border-none">
          {/* Master Toggle - Visible on all devices */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                {...register("is_latest")}
                className="w-5 h-5 accent-[#00FF94] rounded-md cursor-pointer"
              />
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
              LATEST_BUILD
            </span>
          </label>

          {/* DESKTOP SAVE BUTTON (Hidden on mobile because of the icon button above) */}
          <button
            type="submit"
            className="hidden md:block bg-[#00FF94] text-black px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,255,148,0.1)] hover:shadow-[0_0_40px_rgba(0,255,148,0.3)] transition-all"
          >
            Save_Changes
          </button>

          {/* MOBILE STATUS TEXT (Optional hint for mobile) */}
          <div className="md:hidden text-[8px] font-mono text-white/20 uppercase tracking-widest">
            Ready_To_Sync
          </div>
        </div>
      </div>

      {/* 2. VERSION & CATEGORY */}
      <section className="bg-[#0A0A0A] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase text-white/20 ml-2 tracking-widest">
            Version_Label
          </label>
          <input
            {...register("version_name")}
            placeholder="e.g. Fullstack_v1_LPU"
            className="w-full bg-transparent text-xl md:text-2xl font-black outline-none border-b-2 border-white/5 focus:border-[#00FF94] pb-2 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase text-white/20 ml-2 tracking-widest">
            Resume_Category
          </label>
          <select
            {...register("category")}
            className="w-full bg-transparent text-lg md:text-xl font-bold text-[#00FF94] outline-none border-b-2 border-white/5 focus:border-[#00FF94] pb-2 appearance-none"
          >
            <option value="GENERAL">GENERAL</option>
            <option value="FULLSTACK">FULLSTACK</option>
            <option value="BACKEND">BACKEND</option>
            <option value="DEVOPS">DEVOPS</option>
          </select>
        </div>
      </section>

      {/* 3. SUMMARY SECTION (Tag Input for Paragraph Chunks) */}
      <section className="space-y-6">
        <SectionHeader
          title="Professional_Summary"
          icon={<Terminal size={18} />}
        />
        <Controller
          control={control}
          name="summary"
          render={({ field }) => (
            <FocusTagInput
              tags={field.value}
              onChange={field.onChange}
              isTextArea
              placeholder="Describe your technical background... (Shift+Enter for newline, Enter to save chunk)"
            />
          )}
        />
      </section>

      {/* 4. SKILLS SECTION (Categorized Complexity) */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <SectionHeader title="Skill_Categories" icon={<Layout size={18} />} />
          <button
            type="button"
            onClick={() => appendSkill({ category: "", items: [] })}
            className="text-[10px] font-black uppercase bg-white/5 px-2 py-2 rounded-xl"
          >
            + Add_Group
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillFields.map((field, index) => (
            <div
              key={field.id}
              className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] space-y-6 relative group"
            >
              <button
                onClick={() => removeSkill(index)}
                className="absolute top-6 right-6 text-white/5 group-hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <input
                {...register(`skills.${index}.category`)}
                placeholder="Category Name"
                className="w-full bg-transparent border-b border-white/5 text-[#00FF94] font-black uppercase text-sm outline-none focus:border-[#00FF94] pb-2"
              />
              <Controller
                control={control}
                name={`skills.${index}.items`}
                render={({ field }) => (
                  <FocusTagInput
                    tags={field.value}
                    onChange={field.onChange}
                    placeholder="Type skill and press Enter..."
                  />
                )}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION (With Location & Duration) */}
      <section className="space-y-10">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <SectionHeader title="Experience" icon={<Briefcase size={18} />} />
          <button
            type="button"
            onClick={() =>
              appendExp({
                company: "",
                role: "",
                duration: "",
                location: "",
                points: [],
              })
            }
            className="text-[10px] font-black uppercase bg-white/5 px-4 py-2 rounded-xl"
          >
            + Add_Entry
          </button>
        </div>
        {expFields.map((field, index) => (
          <div
            key={field.id}
            className="bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-8 relative"
          >
            <button
              onClick={() => removeExp(index)}
              className="absolute top-8 right-8 text-white/5 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <input
                {...register(`experience.${index}.company`)}
                placeholder="Company/Org"
                className="col-span-1 md:col-span-2 text-2xl md:text-3xl font-black bg-transparent border-b-2 border-white/5 focus:border-[#00FF94] outline-none pb-2"
              />
              <input
                {...register(`experience.${index}.role`)}
                placeholder="Your Title"
                className="bg-transparent border-b-2 border-white/5 text-lg font-bold text-[#00FF94] outline-none pb-2"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <Clock size={14} className="text-white/20" />
                  <input
                    {...register(`experience.${index}.duration`)}
                    placeholder="MMM YYYY - PRESENT"
                    className="bg-transparent text-xs w-full outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <MapPin size={14} className="text-white/20" />
                  <input
                    {...register(`experience.${index}.location`)}
                    placeholder="City, State"
                    className="bg-transparent text-xs w-full outline-none"
                  />
                </div>
              </div>
            </div>
            <Controller
              control={control}
              name={`experience.${index}.points`}
              render={({ field }) => (
                <FocusTagInput
                  tags={field.value}
                  onChange={field.onChange}
                  isTextArea
                  placeholder="Describe impact... (Enter to push bullet)"
                />
              )}
            />
          </div>
        ))}
      </section>

      {/* 6. PROJECTS SECTION (Title, Tech, Duration, Link, Details) */}
      <section className="space-y-10">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <SectionHeader title="Projects" icon={<Code size={18} />} />
          <button
            type="button"
            onClick={() =>
              appendProj({
                title: "",
                tech: "",
                duration: "",
                link: "",
                details: [],
              })
            }
            className="text-[10px] font-black uppercase bg-white/5 px-4 py-2 rounded-xl"
          >
            + Add_Project
          </button>
        </div>
        {projFields.map((field, index) => (
          <div
            key={field.id}
            className="bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-8 relative"
          >
            <button
              onClick={() => removeProj(index)}
              className="absolute top-8 right-8 text-white/5 hover:text-red-500"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <input
                {...register(`projects.${index}.title`)}
                placeholder="Project Name"
                className="col-span-1 md:col-span-2 text-2xl font-black bg-transparent border-b-2 border-white/5 focus:border-blue-400 outline-none pb-2"
              />
              <input
                {...register(`projects.${index}.tech`)}
                placeholder="Stack (e.g. Next.js, Go)"
                className="bg-transparent border-b-2 border-white/5 text-sm text-blue-400 outline-none pb-2"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <Clock size={14} className="text-white/20" />
                  <input
                    {...register(`projects.${index}.duration`)}
                    placeholder="Timeline"
                    className="bg-transparent text-xs w-full outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <LinkIcon size={14} className="text-white/20" />
                  <input
                    {...register(`projects.${index}.link`)}
                    placeholder="Repo/Live URL"
                    className="bg-transparent text-xs w-full outline-none font-mono"
                  />
                </div>
              </div>
            </div>
            <Controller
              control={control}
              name={`projects.${index}.details`}
              render={({ field }) => (
                <FocusTagInput
                  tags={field.value}
                  onChange={field.onChange}
                  isTextArea
                  placeholder="Technical contributions... (Enter to push)"
                />
              )}
            />
          </div>
        ))}
      </section>

      {/* 7. EDUCATION & ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionHeader title="Achievements" icon={<Trophy size={18} />} />
          <Controller
            control={control}
            name="achievements"
            render={({ field }) => (
              <FocusTagInput
                tags={field.value}
                onChange={field.onChange}
                placeholder="Push achievement and press Enter..."
              />
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <SectionHeader
              title="Education"
              icon={<GraduationCap size={18} />}
            />
            <button
              type="button"
              onClick={() =>
                appendEdu({
                  institution: "",
                  degree: "",
                  score: "",
                  duration: "",
                  location: "",
                })
              }
              className="p-1 text-[#00FF94] hover:rotate-90 transition-transform"
            >
              <Plus size={20} />
            </button>
          </div>
          {eduFields.map((field, index) => (
            <div
              key={field.id}
              className="p-8 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] space-y-6 relative"
            >
              <button
                onClick={() => removeEdu(index)}
                className="absolute top-6 right-6 text-white/5 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
              <input
                {...register(`education.${index}.institution`)}
                placeholder="LPU"
                className="w-full bg-transparent font-black text-xl text-white outline-none border-b border-white/10 pb-2"
              />
              <div className="grid grid-cols-1 gap-6">
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="B.Tech CSE"
                  className="bg-transparent text-sm text-[#00FF94] font-bold border-b border-white/5 pb-1 outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/20 uppercase font-mono">
                      Score
                    </label>
                    <input
                      {...register(`education.${index}.score`)}
                      className="bg-transparent text-xs text-white/60 w-full outline-none border-b border-white/5 pb-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/20 uppercase font-mono">
                      Timeline
                    </label>
                    <input
                      {...register(`education.${index}.duration`)}
                      className="bg-transparent text-xs text-white/60 w-full outline-none border-b border-white/5 pb-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/20 uppercase font-mono">
                      City
                    </label>
                    <input
                      {...register(`education.${index}.location`)}
                      className="bg-transparent text-xs text-white/60 w-full outline-none border-b border-white/5 pb-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </form>
  );
};

// --- CORE UTILITY COMPONENTS ---

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-white/5 rounded-xl text-[#00FF94] border border-white/5">
        {icon}
      </div>
      <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white/80">
        {title}
      </h2>
    </div>
  );
}

const FocusTagInput = ({
  tags = [],
  onChange,
  placeholder,
  isTextArea = false,
}: {
  tags: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  isTextArea?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleAdd = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onChange([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        {isTextArea ? (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder={placeholder}
            className="w-full bg-black/40 border-2 border-white/5 rounded-[2rem] p-8 text-sm text-white outline-none focus:border-[#00FF94]/30 min-h-[140px] transition-all resize-none shadow-inner"
          />
        ) : (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder={placeholder}
            className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-6 text-sm text-white outline-none focus:border-[#00FF94]/30 transition-all shadow-inner"
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group animate-in fade-in slide-in-from-left-2"
          >
            <span className="text-[#00FF94] font-mono text-[10px] mt-1">
              [{i + 1}]
            </span>
            <span className="text-[13px] text-white/70 leading-relaxed flex-1 whitespace-pre-wrap">
              {tag}
            </span>
            <button
              type="button"
              onClick={() => onChange(tags.filter((_, idx) => idx !== i))}
              className="text-white/10 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
