"use client";
import { useState } from "react";
import { CheckCircle, Trash2, Loader2 } from "lucide-react";
import {
  markAsReadAction,
  deleteMessageAction,
} from "@/actions/messages.actions";

export default function MessageActions({
  id,
  isRead,
}: {
  id: number;
  isRead: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleRead = async () => {
    setLoading(true);
    await markAsReadAction(id);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this message forever?")) return;
    setLoading(true);
    await deleteMessageAction(id);
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      {!isRead && (
        <button
          onClick={handleRead}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white/50 hover:bg-[#00FF94] hover:text-black transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <CheckCircle size={14} />
          )}
          MARK_READ
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-2 bg-white/5 border border-white/10 rounded-xl text-red-500/50 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
