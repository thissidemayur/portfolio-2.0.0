"use server";

import {
  deleteResumeById,
  markResumeAsLatest,
  updateResumeDetails,
  uploadNewResume,
} from "@/dal/resumes.dal";
import { revalidatePath, revalidateTag } from "next/cache";
import { ResumeType, iResume } from "@/types/database";
import { da } from "zod/v4/locales";


export async function uploadResumeAction(
  data: Omit<iResume, "id" | "created_at">,
) {
  try {
    const updated = await uploadNewResume(data);

    revalidateTag("resumes","max")
    revalidateTag(`resume-${updated.category}`,"max")
    revalidatePath("/resume");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Upload Action Error:", error);
    return {
      success: false,
      error: "Critical: Failed to sync resume to database.",
    };
  }
}


export async function updateResumeAction(
  id: number,
  details: Partial<Omit<iResume, "id" | "created_at">>,
) {
  try {
    await updateResumeDetails(id, details);
      revalidateTag("resumes", "max");
      revalidateTag(`resume-${details.category}`,"max")
      revalidatePath("/resume");
      revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update Action Error:", error);
    return { success: false, error: "Failed to update resume details." };
  }
}


export async function setLatestAction(id: number, category: ResumeType) {
  try {
    await markResumeAsLatest(id, category);

     revalidateTag("resumes", "max");
     revalidateTag(`resume-${category}`, "max");
     revalidatePath("/resume");
     revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Set Latest Action Error:", error);
    return { success: false, error: "Failed to update deployment status." };
  }
}


export async function deleteResumeAction(id: number) {
  try {
    await deleteResumeById(id);
      revalidateTag("resumes", "max");
      revalidatePath("/resume");
      revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Action Error:", error);
    return {
      success: false,
      error: "Deletion failed. Ensure the record exists.",
    };
  }
}
