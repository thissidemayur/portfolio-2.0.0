"use server";

import { deleteProject, updateProjectDetails } from "@/dal/projects.dal";
import { revalidatePath, revalidateTag } from "next/cache";
import { createProject } from "@/dal/projects.dal";
import { iProject } from "@/types/database";

export async function deleteProjectAction(id: number) {
  try {
    const project = await deleteProject(id);
    revalidateTag("projects","max")
    revalidateTag(`project-${project.slug}`,"max")
    revalidatePath("/projects"); 
    revalidatePath(`/projects/${project.slug}`)
    revalidatePath("/")
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
     revalidateTag("projects", "max");
     revalidatePath("/projects");
     revalidatePath("/");
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
     revalidateTag("projects", "max");
     revalidateTag(`project-${data.slug}`, "max");
     revalidatePath("/projects");
     revalidatePath(`/projects/${data.slug}`);
     revalidatePath("/");
    return { success: true };
  } catch (error) {
        console.error("failed to u[date project", error);

    return { success: false, error: "Failed to update project" };
  }
}