"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth.actions";

export default function LoginPage() {
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await loginAction(pass);
    if (res.success) {
      router.push("/admin/resumes"); // Redirect to your dashboard
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 w-80">
        <h1 className="text-white font-black uppercase mb-6 tracking-widest">
          Admin_Gate
        </h1>
        <input
          type="password"
          onChange={(e) => setPass(e.target.value)}
          className="w-full bg-black border border-white/10 p-3 rounded-xl text-white mb-4"
          placeholder="Enter Master Password"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#303F9F] py-3 rounded-xl font-bold"
        >
          Unlock_Vault
        </button>
      </div>
    </div>
  );
}
