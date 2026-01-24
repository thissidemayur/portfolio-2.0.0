"use server"
import { SignJWT } from "jose";
import { cookies } from "next/headers"

export async function loginAction(pass: string) {
  if (pass !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "Invalid Credentials" };
  }
  // create a payload
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
  // set cookies;

  (await cookies()).set("admin_session", token, {
    httpOnly: true, //prevent js to access
    secure: process.env.NODE_ENV === "production", //only over https
    path: "/", //avliable at all routes
    maxAge: 60 * 60 * 24, //1 hr
    sameSite: "strict", //prevent csrf
  });
  return { success: true };
}