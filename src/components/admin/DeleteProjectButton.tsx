// src/components/admin/DeleteProjectButton.tsx
"use client";

import { deleteProjectAction } from "@/actions/projects.actions"; // Import Action
import { Trash2 } from "lucide-react";

export  function DeleteProjectButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const handleDelete = async () => {
    if (!confirm(`Delete ${title}?`)) return;

    const result = await deleteProjectAction(id); // Calling the Server Action
    if (!result.success) alert(result.error);
  };

  return (
    <button onClick={handleDelete} className="text-red-500">
      <Trash2 size={18} />
    </button>
  );
}
