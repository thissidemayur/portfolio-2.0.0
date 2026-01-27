"use server";

import {
  addTechnology,
  deleteTechnologyById,
  toggleMainStackById,
  updateTechnologyById,
} from "@/dal/tech.dal";
import { revalidatePath, revalidateTag } from "next/cache";
import { iTech } from "@/types/database";

export async function addTechAction(data: Omit<iTech, "id">) {
  try {
    await addTechnology(data);

    revalidateTag("technologies", "max");
    // Also invalidate projects because they display these tech names
    revalidateTag("projects", "max");

    revalidatePath("/");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add technology" };
  }
}

export async function updateTechAction(id: number, data: Partial<iTech>) {
  try {
    await updateTechnologyById(id, data);

    revalidateTag("technologies", "max");
    revalidateTag("projects", "max");

    revalidatePath("/");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}

export async function deleteTechAction(id: number) {
  try {
    await deleteTechnologyById(id);

    revalidateTag("technologies", "max");
    revalidateTag("projects", "max");

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Cannot delete: Tech might be linked to projects",
    };
  }
}

export async function toggleMainStackAction(id: number, isMain: boolean) {
  try {
    await toggleMainStackById(id, isMain);

    revalidateTag("technologies","max");

    revalidatePath("/");

    revalidatePath("/projects");

    return { success: true };
  } catch (error) {
    console.error("Main Stack Toggle Error:", error);
    return { success: false, error: "Failed to update stack status" };
  }
}