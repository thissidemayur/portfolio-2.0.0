"use server";

import { saveContactMessage } from "@/dal/messages.dal";
import ContactTemplate from "@/emails/ContactTemplate";
import { resend } from "@/lib/resend";
import { revalidatePath } from "next/cache";

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mayur Pal <contact@thissidemayur.me>",
      to: email,
      subject: subject,
      react: ContactTemplate({ name }),
    });

    if (error) {
      console.error("Resend error while sending contact email: \n", error);
      return { success: false, message: "Email failed to Send" };
    }
    return { success: true, message: "Email Sent Successfully!" };
  } catch (error) {
    console.error("Server Error while sending email \n:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function handleContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
 try {
     await saveContactMessage(data);
        revalidatePath("/admin");
         revalidatePath("/admin/messages");
   
     const emailResult = await sendContactEmail(data);
      
       if(!emailResult.success) {
           return {
             success: true,
             message: "Message saved, but email notification failed.",
           };
   
       }
   
       return { success: true, message: "Transmission complete and archived." };
   
 } catch (error) {
    console.error("Critical Failure in Contact Action:", error);
    return {
      success: false,
      message: "System error: Failed to process request.",
    };
 }}