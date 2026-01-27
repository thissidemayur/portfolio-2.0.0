"use client";
import React, { useState, useMemo } from "react";
import { iResume, ResumeType } from "@/types/database";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  LayoutGrid,
} from "lucide-react";
import { deleteResumeAction, setLatestAction } from "../../../actions/resumes.actions";
import { toast } from "sonner"; // Assuming sonner for feedback
import { ResumeAdminForm } from "@/components/admin/AddResumeForm";

export default function ResumeDashboard({ history }: { history: iResume[] }) {
  const [resumes, setResumes] = useState<iResume[]>(history);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<iResume | null>(null);
  const [activeTab, setActiveTab] = useState<ResumeType | "ALL">("ALL");

  // Grouping Logic
  const filteredResumes = useMemo(() => {
    return activeTab === "ALL"
      ? resumes
      : resumes?.filter((r) => r.category === activeTab);
  }, [resumes, activeTab]);

  const categories: (ResumeType | "ALL")[] = [
    "ALL",
    "GENERAL",
    "FULLSTACK",
    "BACKEND",
    "DEVOPS",
  ];

  const handleSetLatest = async (id: number, category: ResumeType) => {
    const res = await setLatestAction(id, category);
    if (res.success) {
      toast.success(`${category} version deployed to production`);
      // Update local state to reflect the new 'is_latest' across the category
      setResumes((prev) =>
        prev.map((r) =>
          r.category === category ? { ...r, is_latest: r.id === id } : r,
        ),
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure? This will permanently delete this version."))
      return;
    const res = await deleteResumeAction(id);
    if (res.success) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
      toast.success("Version deleted successfully");
    }
  };

  if (editorOpen) {
    return (
      <ResumeAdminForm
        initialData={selectedResume}
        onClose={() => {
          setEditorOpen(false);
          setSelectedResume(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              Resume_Vault
            </h1>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                    activeTab === cat
                      ? "bg-[#00FF94] text-black border-[#00FF94]"
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setEditorOpen(true)}
            className="bg-[#303F9F] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:shadow-[0_0_30px_rgba(48,63,159,0.3)] transition-all"
          >
            <Plus size={18} /> New_Version
          </button>
        </header>

        <div className="grid gap-6">
          {filteredResumes?.length > 0 ? (
            filteredResumes?.map((resume) => (
              <div
                key={resume.id}
                className={`group bg-[#0A0A0A] border ${resume.is_latest ? "border-[#00FF94]/30" : "border-white/10"} p-6 rounded-[2.5rem] flex flex-wrap justify-between items-center hover:bg-black transition-all`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`p-5 rounded-3xl transition-colors ${resume.is_latest ? "bg-[#00FF94]/10 text-[#00FF94]" : "bg-white/5 text-white/20"}`}
                  >
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">
                        {resume.version_name}
                      </h3>
                      {resume.is_latest && (
                        <span className="flex items-center gap-1 text-[9px] font-black bg-[#00FF94]/20 text-[#00FF94] px-2 py-0.5 rounded-full border border-[#00FF94]/20 uppercase">
                          <CheckCircle size={10} /> Active_Production
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-white/30 font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <LayoutGrid size={12} /> {resume.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Updated{" "}
                        {new Date(resume.updated_at)
                          .toISOString()
                          .replace("T", " ")
                          .substring(0, 16)}{" "}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  {!resume.is_latest && (
                    <button
                      onClick={() =>
                        handleSetLatest(resume.id, resume.category)
                      }
                      className="text-[10px] font-bold text-white/40 hover:text-[#00FF94] px-4 py-2 bg-white/5 rounded-xl border border-white/5 transition-all"
                    >
                      Deploy_Latest
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedResume(resume);
                      setEditorOpen(true);
                    }}
                    className="p-3 bg-white/5 rounded-xl hover:bg-[#303F9F]/20 hover:text-[#303F9F] transition-all"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="p-3 bg-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <p className="text-white/20 font-black uppercase tracking-widest">
                No_Versions_Found_In_{activeTab}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
