// app/admin/certificates/actions.ts
"use server";
import { createCertificate, deleteCertificate, updateCertificate } from "@/dal/certificates.dal";
import { iCertificate } from "@/types/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleHomeVisibility(id: number, currentState: boolean) {
  try {
    await updateCertificate(id, { show_on_home: !currentState });

    // Refresh the data on the certification page and homepage
    revalidatePath("/certification");
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to toglle certificate home visibibity",
    };
  }
}

export async function removeCertAction(id: number) {
  try {
    await deleteCertificate(id);
    // Refresh the admin and public certification pages
    revalidatePath("/admin/certifications");
    revalidatePath("/certification");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete" };
  }
}

export async function updateCertAction(
  id: number,
  data: Partial<iCertificate>,
) {
  let isSuccessful = false;
  try {
    const formattedData = {
      ...data,
      expiry_date: data.expiry_date || null,
      verify_link: data.verify_link || null,
      credential_url: data.credential_url || null,
    };

    await updateCertificate(id, formattedData);

    revalidatePath("/admin/certifications");
    revalidatePath("/certification");

    isSuccessful = true;
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update certificate" };
  }

  if (isSuccessful) {
    redirect("/admin/certifications");
  }
}

export async function createCertAction(data: Omit<iCertificate,'id'>) {
  try {
    const formattedData = {
      ...data,
      expiry_date: data.expiry_date || null,
      verify_link: data.verify_link || null,
      credential_url: data.credential_url || null,
    };

    await createCertificate(formattedData);

    revalidatePath("/admin/certifications");
    revalidatePath("/certification");

    return { success: true };
  } catch (error) {
    console.error("Creation_Error:", error);
    return { success: false, error: "Failed to create certificate" };
  }
}