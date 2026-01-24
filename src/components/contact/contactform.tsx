"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; // Import Sonner
import {
  Send,
  Terminal as TerminalIcon,
  Layout,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { handleContactSubmission } from "@/actions/contact.dal";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required (min 5 chars)"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
const [sessionId] = useState(() =>
    Math.random().toString(36).substring(2, 11).toUpperCase(),
  );

  const [view, setView] = useState<"modern" | "terminal">("modern");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);

    // Sonner: Loading state
    const toastId = toast.loading("Initiating handshake...");

    try {
      const result = await handleContactSubmission(data);
      if (result.success) {
        setIsSubmitted(true);
        reset();
        // Sonner: Success
        toast.success(result.message, { id: toastId });
      } else {
        const errorMsg = result.message || "Protocol Error: Signal lost.";
        setServerError(errorMsg);
        // Sonner: Error
        toast.error(errorMsg, { id: toastId });
      }
    } catch (error) {
      const fatalMsg = "Fatal: Communication bridge collapsed.";
      setServerError(fatalMsg);
      toast.error(fatalMsg, { id: toastId });
    }
  };

  return (
    <div className="relative">
      {/* TOGGLE SWITCH */}
      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={() => setView("modern")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "modern" ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "text-white/40 hover:text-white"}`}
        >
          <Layout size={14} /> Modern_UI
        </button>
        <button
          onClick={() => setView("terminal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "terminal" ? "bg-[#00FF94] text-black shadow-[0_0_20px_rgba(0,255,148,0.2)]" : "text-white/40 hover:text-white"}`}
        >
          <TerminalIcon size={14} /> DevOps_Console
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === "modern" ? (
          <motion.div
            key="modern"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-[3rem]"
          >
            {isSubmitted ? (
              <SuccessState onReset={() => setIsSubmitted(false)} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <input
                      {...register("name")}
                      placeholder="Full Name"
                      className={`w-full bg-black/40 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-2xl p-4 outline-none focus:border-[#00FF94]/50 transition-all text-sm`}
                    />
                    {errors.name && (
                      <p className="text-[10px] font-mono text-red-500 ml-2 uppercase">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      {...register("email")}
                      placeholder="Email Address"
                      className={`w-full bg-black/40 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-2xl p-4 outline-none focus:border-[#00FF94]/50 transition-all text-sm`}
                    />
                    {errors.email && (
                      <p className="text-[10px] font-mono text-red-500 ml-2 uppercase">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    {...register("subject")}
                    placeholder="Subject"
                    className={`w-full bg-black/40 border ${errors.subject ? "border-red-500/50" : "border-white/10"} rounded-2xl p-4 outline-none focus:border-[#00FF94]/50 transition-all text-sm`}
                  />
                </div>

                <div className="space-y-2">
                  <textarea
                    {...register("message")}
                    placeholder="Message..."
                    rows={5}
                    className={`w-full bg-black/40 border ${errors.message ? "border-red-500/50" : "border-white/10"} rounded-3xl p-6 outline-none focus:border-[#00FF94]/50 transition-all text-sm resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-5 bg-white text-black font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-[#00FF94] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Send size={16} /> TRANSMIT
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden font-mono min-h-[500px] shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[10px] text-white/20 tracking-widest uppercase font-bold italic">
                root@mayur-os: /dev/contact
              </span>
            </div>

            <div className="p-8 space-y-4 text-xs md:text-sm leading-relaxed">
              {/* Terminal content remains exactly as you had it, just using the new sessionId */}
              <div className="flex gap-2">
                <span className="text-[#00FF94]">guest@portfolio:</span>
                <span className="text-white">
                  ~$ initiate-handshake --secure
                </span>
              </div>
              <p className="text-white/40 italic">
                {"//"} Establishing connection...
              </p>

              <div className="space-y-2 border-l border-white/10 pl-4 ml-2 text-white/40">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isSubmitting ? "bg-yellow-500 animate-ping" : isSubmitted ? "bg-[#00FF94]" : "bg-white/20"}`}
                  />
                  <p>
                    {isSubmitting
                      ? "ENCRYPTING..."
                      : isSubmitted
                        ? "DELIVERED"
                        : "AWAITING..."}
                  </p>
                </div>
              </div>

              {isSubmitted && (
                <div className="pt-4 text-[10px]">
                  <p className="text-[#00FF94] font-bold">
                    {">"} HANDSHAKE_SUCCESSFUL
                  </p>
                  <p className="text-white/20 uppercase tracking-widest mt-1">
                    Session: {sessionId}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <span className="text-[#00FF94]">guest@portfolio:</span>
                <span className="text-white italic tracking-tighter">
                  {isSubmitting
                    ? "processing..."
                    : isSubmitted
                      ? "standby"
                      : "listening..."}
                </span>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-5 bg-[#00FF94]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SuccessState component...
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
      <div className="h-20 w-20 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center text-[#00FF94]">
        <CheckCircle2 size={40} />
      </div>
      <div className="space-y-2 text-white">
        <h3 className="text-2xl font-bold uppercase tracking-tighter italic">
          Transmission_Complete
        </h3>
        <button
          onClick={onReset}
          className="mt-4 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Send Another
        </button>
      </div>
    </div>
  );
}
