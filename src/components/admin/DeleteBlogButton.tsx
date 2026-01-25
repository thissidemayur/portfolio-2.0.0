"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteBlogAction } from "@/actions/blog.actions"; // We'll create this action
import { useRouter } from "next/navigation";

export  function DeleteBlogButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    // Standard system confirmation
    if (
      !confirm(
        `CAUTION: Are you sure you want to purge "${title}" from the database?`,
      )
    )
      return;

    setIsDeleting(true);
    try {
      const result = await deleteBlogAction(id);
      if (result.success) {
        router.refresh(); // Updates the server component list
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Deletion Error:", error);
      alert("System Error: Failed to communicate with the database.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/50 hover:text-red-500 transition-all disabled:opacity-50"
      title="Delete Entry"
    >
      {isDeleting ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}
