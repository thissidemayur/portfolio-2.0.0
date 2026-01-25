// app/admin/certificates/actions.ts
"use server";
import { createCertificate, deleteCertificate, updateCertificate } from "@/dal/certificates.dal";
import { iCertificate } from "@/types/database";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleHomeVisibility(id: number, currentState: boolean) {
  try {
    await updateCertificate(id, { show_on_home: !currentState });

    revalidateTag("certificates", "max");
    revalidatePath("/");
    revalidatePath("/certificates");
   
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

    revalidateTag("certificates", "max");

    revalidatePath("/");
    revalidatePath("/certificates");
   
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

    revalidateTag("certificates", "max");

    revalidatePath("/");
    revalidatePath("/certificates");
    

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

    revalidateTag("certificates","max")

    revalidatePath("/")
    revalidatePath("/certificates")

    return { success: true };
  } catch (error) {
    console.error("Creation_Error:", error);
    return { success: false, error: "Failed to create certificate" };
  }
}