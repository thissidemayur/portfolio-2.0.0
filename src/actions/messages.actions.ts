"use server";

import { markMessageRead, deleteMessage } from "@/dal/messages.dal";
import { revalidatePath } from "next/cache";

export async function markAsReadAction(id: number) {
  try {
    await markMessageRead(id);
    revalidatePath("/admin/messages");
    revalidatePath("/admin"); // Update the unread count on the dashboard overview
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update message status." };
  }
}

export async function deleteMessageAction(id: number) {
  try {
    await deleteMessage(id);
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete message." };
  }
}
