// src/app/admin/projects/actions.ts
"use server";

import { deleteProject, updateProjectDetails } from "@/dal/projects.dal";
import { revalidatePath } from "next/cache";
import { createProject } from "@/dal/projects.dal";
import { iProject } from "@/types/database";

export async function deleteProjectAction(id: number) {
  try {
    await deleteProject(id);
    revalidatePath("/admin/projects"); // Clears cache so the list updates
    return { success: true };
  } catch (error) {
    console.error('failed to delete project',error)
    return { success: false, error: "Failed to delete" };
  }
}

export async function createProjectAction(
  details: Omit<iProject, "id" | "created_at">,
  techIds: number[],
) {
  try {
    const projectId = await createProject(details, techIds);
    // This clears the cache so the public /projects and admin list show the new data immediately
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true, id: projectId };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Critical: Database deployment failed." };
  }
}

export async function updateProjectAction(
  id: number,
  data: Partial<iProject>,
  techIds: number[],
) {
  try {
    await updateProjectDetails(id, { ...data, techIds });
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${data.slug}`);
    return { success: true };
  } catch (error) {
        console.error("failed to u[date project", error);

    return { success: false, error: "Failed to update project" };
  }
}