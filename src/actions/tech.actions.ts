"use server";

import {
  addTechnology,
  deleteTechnologyById,
  updateTechnologyById,
} from "@/dal/tech.dal";
import { iTech } from "@/types/database";
import { revalidatePath } from "next/cache";

export async function addTechAction(data: iTech) {
  try {
    await addTechnology(data);
    revalidatePath("/admin/tech");
    revalidatePath("/admin/projects/new"); // Update the selector in project forms
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add technology." };
  }
}

export async function deleteTechAction(id: number) {
  try {
    await deleteTechnologyById(id);
    revalidatePath("/admin/tech");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Cannot delete tech if it is linked to projects.",
    };
  }
}

export async function toggleMainStackAction(
  id: number,
  currentStatus: boolean,
) {
  try {
    await updateTechnologyById(id, { is_main_stack: !currentStatus });
    revalidatePath("/admin/tech");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update stack status." };
  }
}
