"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Terminal as TerminalIcon,
  Layout,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

// 1. Define Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required (min 5 chars)"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [view, setView] = useState<"modern" | "terminal">("modern");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form Data:", data);
    setIsSubmitted(true);
    reset();
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
                  {/* Name Input */}
                  <div className="space-y-2">
                    <input
                      {...register("name")}
                      placeholder="Full Name"
                      className={`w-full bg-black/40 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-2xl p-4 outline-none focus:border-[#00FF94]/50 transition-all text-sm`}
                    />
                    {errors.name && (
                      <p className="text-[10px] font-mono text-red-500 ml-2 uppercase tracking-widest">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <input
                      {...register("email")}
                      placeholder="Email Address"
                      className={`w-full bg-black/40 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-2xl p-4 outline-none focus:border-[#00FF94]/50 transition-all text-sm`}
                    />
                    {errors.email && (
                      <p className="text-[10px] font-mono text-red-500 ml-2 uppercase tracking-widest">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <input
                    {...register("subject")}
                    placeholder="Subject / Project Title"
                    className={`w-full bg-black/40 border ${errors.subject ? "border-red-500/50" : "border-white/10"} rounded-2xl p-4 outline-none focus:border-[#00FF94]/50 transition-all text-sm`}
                  />
                  {errors.subject && (
                    <p className="text-[10px] font-mono text-red-500 ml-2 uppercase tracking-widest">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <textarea
                    {...register("message")}
                    placeholder="Briefly describe your inquiry..."
                    rows={5}
                    className={`w-full bg-black/40 border ${errors.message ? "border-red-500/50" : "border-white/10"} rounded-3xl p-6 outline-none focus:border-[#00FF94]/50 transition-all text-sm resize-none`}
                  />
                  {errors.message && (
                    <p className="text-[10px] font-mono text-red-500 ml-2 uppercase tracking-widest">
                      {errors.message.message}
                    </p>
                  )}
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
                      <Send size={16} /> TRANSMIT_MESSAGE
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
              <div className="flex gap-2">
                <span className="text-[#00FF94]">guest@portfolio:</span>
                <span className="text-white">
                  ~$ initiate-handshake --secure
                </span>
              </div>

              <p className="text-white/40 animate-pulse italic">
                {"//"} Establishing connection to LPU_Phagwara_Node...
              </p>

              <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl space-y-2">
                <p className="text-blue-400 font-bold tracking-wider">
                  [SYSTEM_INFO]
                </p>
                <p className="text-white/60">
                  This terminal acts as a read-only debug console for the
                  communication bridge.
                </p>
                <p className="text-[#FFBD2E] border-t border-white/5 pt-2 mt-2">
                  <span className="font-bold underline">ATTENTION:</span> Direct
                  CLI input is disabled in this environment. Please switch back
                  to <span className="text-white">Modern_UI</span> to populate
                  the message buffers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <p className="text-white/20 uppercase text-[10px]">
                    Encryption
                  </p>
                  <p className="text-[#00FF94]">AES-256-GCM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/20 uppercase text-[10px]">
                    Buffer_Status
                  </p>
                  <p className="text-blue-400">READY_TO_RECEIVE</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <span className="text-[#00FF94]">guest@portfolio:</span>
                <span className="text-white italic tracking-tighter animate-pulse">
                  listening_for_payload...
                </span>
              </div>
              <div className="w-2 h-5 bg-[#00FF94] animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Success State Component
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
      <div className="h-20 w-20 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center text-[#00FF94]">
        <CheckCircle2 size={40} />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold uppercase tracking-tighter italic">
          Transmission_Complete
        </h3>
        <p className="text-white/40 text-sm max-w-xs mx-auto">
          Your data packet has been successfully routed to Mayur&apos;s primary
          node. Expect a response within 24 standard cycles.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
      >
        Send Another Message
      </button>
    </div>
  );
}
