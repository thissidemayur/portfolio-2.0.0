"use client";
import { Star, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  deleteTechAction,
  toggleMainStackAction,
} from "@/actions/tech.actions";

export default function TechActions({
  id,
  isMain,
}: {
  id: number;
  isMain: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const onToggle = async () => {
    setLoading(true);
    await toggleMainStackAction(id, isMain);
    setLoading(false);
  };

  const onDelete = async () => {
    if (!confirm("Delete this technology? It may affect project tags.")) return;
    setLoading(true);
    const res = await deleteTechAction(id);
    if (!res.success) alert(res.error);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        disabled={loading}
        className={`p-2 rounded-lg transition-all ${isMain ? "text-[#00FF94] bg-[#00FF94]/10" : "text-white/10 hover:text-white"}  hover:cursor-pointer`}
      >
        <Star size={16} fill={isMain ? "currentColor" : "none"} />
      </button>
      <button
        onClick={onDelete}
        disabled={loading}
        className="p-2 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all hover:cursor-pointer "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
