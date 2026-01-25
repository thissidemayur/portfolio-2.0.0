"use server";

import {
  deleteResumeById,
  markResumeAsLatest,
  updateResumeDetails,
  uploadNewResume,
} from "@/dal/resumes.dal";
import { revalidatePath } from "next/cache";
import { ResumeType, iResume } from "@/types/database";

/**
 * Creates a new resume record.
 * The DAL 'uploadNewResume' handles the transaction to unset
 * previous 'is_latest' flags if the new one is set to true.
 */
export async function uploadResumeAction(
  data: Omit<iResume, "id" | "created_at">,
) {
  try {
    await uploadNewResume(data);

    // Refresh the data for both the admin dashboard and the public site
    revalidatePath("/admin/resumes");
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
    revalidatePath("/admin/resumes");
    return { success: true };
  } catch (error) {
    console.error("Update Action Error:", error);
    return { success: false, error: "Failed to update resume details." };
  }
}


export async function setLatestAction(id: number, focus_area: ResumeType) {
  try {
    await markResumeAsLatest(id, focus_area);

    revalidatePath("/admin/resumes");
    revalidatePath("/"); // Update public hero/about download button

    return { success: true };
  } catch (error) {
    console.error("Set Latest Action Error:", error);
    return { success: false, error: "Failed to update deployment status." };
  }
}


export async function deleteResumeAction(id: number) {
  try {
    await deleteResumeById(id);
    revalidatePath("/admin/resumes");
    return { success: true };
  } catch (error) {
    console.error("Delete Action Error:", error);
    return {
      success: false,
      error: "Deletion failed. Ensure the record exists.",
    };
  }
}
