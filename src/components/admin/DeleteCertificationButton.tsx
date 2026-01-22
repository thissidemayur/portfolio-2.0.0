"use client";
import { removeCertAction } from "@/app/admin/certifications/action";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteCertButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this credential?")) return;

    setIsDeleting(true);
    await removeCertAction(id);
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 transition-colors ${isDeleting ? "opacity-20" : "text-gray-500 hover:text-red-500"}`}
    >
      <Trash2 size={16} />
    </button>
  );
}
