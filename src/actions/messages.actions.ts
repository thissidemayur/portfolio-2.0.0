"use server";

import { markMessageRead, deleteMessage } from "@/dal/messages.dal";
import { revalidatePath, revalidateTag } from "next/cache";

export async function markAsReadAction(id: number) {
  try {
    await markMessageRead(id);
    revalidateTag("count-messages","max");
       revalidatePath("/")
       revalidatePath("/admin");
       revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update message status." };
  }
}

export async function deleteMessageAction(id: number) {
  try {
    await deleteMessage(id);
       revalidateTag("count-messages", "max");
       revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete message." };
  }
}
