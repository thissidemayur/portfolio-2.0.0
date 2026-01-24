"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
} from "lucide-react";

export const ResumeAdminForm = ({
  initialData,
  onClose,
}: {
  initialData?: iResume | null;
  onClose: () => void;
}) => {
  const { register, control, handleSubmit } = useForm<iResume>({
    defaultValues: initialData || {
      category: "GENERAL",
      is_latest: true,
      summary: [""],
      skills: ["Languages: C++, Java, JavaScript"],
      experiece: [{ company: "", role: "", duration: "", points: [""] }],
      projects: [{ title: "", tech: "", details: [""] }],
      education: [
        {
          institution: "Lovely Professional University",
          degree: "B.Tech CSE",
          score: "9.23",
          location: "Phagwara, Punjab",
          duration: "2020 - 2024",
        },
      ],
      achievements: [""],
    },
  });

  // Array Managers
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experiece" });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "education" });
  const {
    fields: projFields,
    append: appendProj,
    remove: removeProj,
  } = useFieldArray({ control, name: "projects" });
  

  const {
    fields: summaryFields,
    append: appendSummary,
    remove: removeSummary,
  } = useFieldArray({ control, name: "summary" as any });

  const {
    fields: achFields,
    append: appendAch,
    remove: removeAch,
  } = useFieldArray({ control, name: "achievements" as any });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex justify-between items-center sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50 py-4 border-b border-white/10">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X />
        </button>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 gap-x-5">
          <input
            type="checkbox"
            {...register("is_latest")}
            id="is_latest"
            className="w-4 h-4 accent-[#00FF94]"
          />
          <label
            htmlFor="is_latest"
            className="text-[10px] font-black uppercase cursor-pointer"
          >
            Set_As_Latest
          </label>

          <button
            type="submit"
            className="bg-[#303F9F] px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(48,63,159,0.4)] transition-all"
          >
            <Save size={18} /> Save_All_Changes
          </button>
        </div>
      </div>

      {/* 1. Core Meta */}
      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 grid grid-cols-2 gap-6">
        <div className="space-y-2 col-span-2 sm:col-span-1">
          <label className="text-[10px] uppercase font-bold text-white/40 ml-1">
            Version_Label
          </label>
          <input
            {...register("version_name")}
            className="w-full bg-black border border-white/10 p-4 rounded-2xl"
            placeholder="Specialized_Fullstack_v1"
          />
        </div>
        <div className="space-y-2 col-span-2 sm:col-span-1">
          <label className="text-[10px] uppercase font-bold text-white/40 ml-1">
            Primary_Category
          </label>
          <select
            {...register("category")}
            className="w-full bg-black border border-white/10 p-4 rounded-2xl uppercase font-bold"
          >
            <option value="GENERAL">General</option>
            <option value="FULLSTACK">Fullstack</option>
            <option value="BACKEND">Backend</option>
            <option value="DEVOPS">DevOps</option>
          </select>
        </div>
      </section>

      {/* 2. Skills Section (Key: Values) */}
      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-[#00FF94]">
          <Layout size={18} />
          <h2 className="text-xs font-black uppercase tracking-widest">
            Skills_Inventory
          </h2>
        </div>
        <div className="grid gap-3">
          {/* Mapping the skills array directly as string inputs */}
          <SkillInput control={control} register={register} />
        </div>
      </section>

      {/* Summary Section (Dynamic String Array) */}
      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase text-[#00FF94] tracking-widest">
            Professional_Summary
          </h2>

          <button
            type="button"
            onClick={() => appendSummary("")}
            className="text-[10px] uppercase font-black bg-white/5 px-3 py-1 rounded-lg"
          >
            + Add_Para
          </button>
        </div>

        {summaryFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <textarea
              {...register(`summary.${index}` as any)}
              className="w-full bg-black border border-white/5 p-4 rounded-2xl text-[11px] min-h-[80px]"
              placeholder="Enter professional summary paragraph..."
            />

            <button
              type="button"
              onClick={() => removeSummary(index)}
              className="text-red-500/50 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* Projects Section (Complex Nested Object) */}

      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center text-[#00FF94]">
          <div className="flex items-center gap-2">
            <Code size={18} />

            <h2 className="text-xs font-black uppercase tracking-widest">
              Technical_Projects
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              appendProj({
                title: "",
                tech: "",
                duration: "",
                details: [""],
                link: "",
              })
            }
            className="text-[10px] uppercase font-black bg-white/5 px-3 py-1 rounded-lg"
          >
            + Add_Project
          </button>
        </div>

        {projFields.map((field, index) => (
          <div
            key={field.id}
            className="p-8 bg-black rounded-3xl border border-white/5 space-y-4 relative"
          >
            <input
              {...register(`projects.${index}.title`)}
              placeholder="Project Title (e.g. Fkart App)"
              className="bg-transparent border-b border-white/10 p-2 w-full font-bold text-xl text-[#303F9F]"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register(`projects.${index}.tech`)}
                placeholder="Stack (e.g. MERN Stack)"
                className="bg-transparent border-b border-white/10 p-2 text-sm"
              />

              <input
                {...register(`projects.${index}.duration`)}
                placeholder="Jul 2022 - Aug 2022"
                className="bg-transparent border-b border-white/10 p-2 text-sm"
              />
            </div>

            <input
              {...register(`projects.${index}.link`)}
              placeholder="Live/Repo Link (https://...)"
              className="w-full bg-white/5 p-2 rounded-lg text-[10px] italic"
            />

            <ProjectDetails
              index={index}
              register={register}
              control={control}
            />

            <button
              type="button"
              onClick={() => removeProj(index)}
              className="absolute top-6 right-6 text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </section>

      {/* Achievements Section (Dynamic String Array) */}

      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center text-[#00FF94]">
          <div className="flex items-center gap-2">
            <Trophy size={18} />

            <h2 className="text-xs font-black uppercase tracking-widest">
              Key_Achievements
            </h2>
          </div>

          <button
            type="button"
            onClick={() => appendAch("")}
            className="text-[10px] uppercase font-black bg-white/5 px-3 py-1 rounded-lg"
          >
            + Add_Achievement
          </button>
        </div>

        {achFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`achievements.${index}` as any)}
              className="w-full bg-black border border-white/5 p-3 rounded-2xl text-[11px]"
              placeholder="e.g. Full Stack Certification from Edureka"
            />

            <button
              type="button"
              onClick={() => removeAch(index)}
              className="text-red-500/50 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* 3. Education (Nested Fields) */}
      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#00FF94]">
            <GraduationCap size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest">
              Education_History
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              appendEdu({
                institution: "",
                degree: "",
                score: "",
                duration: "",
              })
            }
            className="text-[10px] uppercase font-black bg-white/5 px-4 py-2 rounded-xl"
          >
            + Add_Edu
          </button>
        </div>
        {eduFields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-2 gap-4 p-6 bg-black rounded-2xl border border-white/5 relative"
          >
            <input
              {...register(`education.${index}.institution`)}
              placeholder="Lovely Professional University"
              className="bg-transparent border-b border-white/10 p-2 col-span-2 font-bold text-lg"
            />
            <input
              {...register(`education.${index}.degree`)}
              placeholder="B.Tech CSE"
              className="bg-transparent border-b border-white/10 p-2"
            />
            <input
              {...register(`education.${index}.score`)}
              placeholder="CGPA: 9.23"
              className="bg-transparent border-b border-white/10 p-2"
            />
            <input
              {...register(`education.${index}.duration`)}
              placeholder="2020 - 2024"
              className="bg-transparent border-b border-white/10 p-2"
            />
            <input
              {...register(`education.${index}.location`)}
              placeholder="Punjab, India"
              className="bg-transparent border-b border-white/10 p-2"
            />
            <button
              type="button"
              onClick={() => removeEdu(index)}
              className="absolute top-4 right-4 text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* 4. Experience (Deeply Nested with Points) */}
      <section className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#00FF94]">
            <Briefcase size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest">
              Work_Experience
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              appendExp({ company: "", role: "", duration: "", points: [""] })
            }
            className="text-[10px] uppercase font-black bg-white/5 px-4 py-2 rounded-xl"
          >
            + Add_Exp
          </button>
        </div>
        {expFields.map((field, index) => (
          <ExperienceCard
            key={field.id}
            index={index}
            register={register}
            control={control}
            remove={() => removeExp(index)}
          />
        ))}
      </section>
    </form>
  );
};

// Helper Components for Points and Skills
const ExperienceCard = ({ index, register, control, remove }: any) => {
  const {
    fields,
    append,
    remove: removePoint,
  } = useFieldArray({ control, name: `experiece.${index}.points` as any });
  return (
    <div className="p-8 bg-black rounded-3xl border border-white/5 space-y-4 relative">
      <input
        {...register(`experiece.${index}.company`)}
        placeholder="JP Morgan Chase & Co."
        className="bg-transparent border-b border-white/10 p-2 w-full font-bold text-xl text-[#303F9F]"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          {...register(`experiece.${index}.role`)}
          placeholder="SEP Intern"
          className="bg-transparent border-b border-white/10 p-2"
        />
        <input
          {...register(`experiece.${index}.duration`)}
          placeholder="May 2023 - Jul 2023"
          className="bg-transparent border-b border-white/10 p-2"
        />
      </div>
      <div className="space-y-2 mt-4">
        <p className="text-[10px] font-black uppercase text-white/20">
          Bullet_Points
        </p>
        {fields.map((f, i) => (
          <div key={f.id} className="flex gap-2">
            <textarea
              {...register(`experiece.${index}.points.${i}` as any)}
              className="w-full bg-white/5 p-3 rounded-xl text-[11px]"
              placeholder="Built dynamic UI components..."
            />
            <button
              type="button"
              onClick={() => removePoint(i)}
              className="text-red-500/50 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append("")}
          className="text-[10px] text-[#00FF94] font-bold"
        >
          + Add Point
        </button>
      </div>
      <button
        type="button"
        onClick={remove}
        className="absolute top-6 right-6 text-red-500 hover:scale-110 transition-transform"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

const SkillInput = ({ control, register }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills" as any,
  });
  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3">
          <input
            {...register(`skills.${index}`)}
            placeholder="Languages: C++, Java, Python"
            className="w-full bg-black border border-white/5 p-4 rounded-2xl text-[11px]"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="p-4 bg-red-500/10 text-red-500 rounded-2xl"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("")}
        className="text-[10px] font-black uppercase text-white/30 hover:text-white"
      >
        + Add_Skill_Category
      </button>
    </div>
  );
};


const ProjectDetails = ({ index, register, control }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `projects.${index}.details` as any,
  });
  return (
    <div className="space-y-2 mt-4">
      <p className="text-[10px] font-black uppercase text-white/20">
        Project_Bullet_Points
      </p>
      {fields.map((f, i) => (
        <div key={f.id} className="flex gap-2">
          <textarea
            {...register(`projects.${index}.details.${i}` as any)}
            className="w-full bg-white/5 p-3 rounded-xl text-[11px]"
            placeholder="Implemented REST APIs..."
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-500/50 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("")}
        className="text-[10px] text-[#00FF94] font-bold"
      >
        + Add Detail
      </button>
    </div>
  );
};