"use client";
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Send,
  Terminal as TerminalIcon,
  Layout,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { handleContactSubmission } from "@/actions/contact.actions";

// Keep your schema and types identical
const contactSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required (min 5 chars)"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [sessionId, setSessionId] = useState("");
  const [view, setView] = useState<"modern" | "terminal">("modern");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    function sessId(){
          setSessionId(
            Math.random().toString(36).substring(2, 11).toUpperCase(),
          );

    }
    sessId()
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading("Initiating handshake...");
    try {
      const result = await handleContactSubmission(data);
      if (result.success) {
        setIsSubmitted(true);
        reset();
        toast.success(result.message, { id: toastId });
      } else {
        toast.error(result.message || "Protocol Error", { id: toastId });
      }
    } catch (error) {
      toast.error("Fatal Error: Communication lost.", { id: toastId });
    }
  };

  return (
    <div className="relative">
      {/* TOGGLE SWITCH - Unchanged */}
      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={() => setView("modern")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            view === "modern"
              ? "bg-white text-black shadow-lg"
              : "text-white/40 hover:text-white"
          }`}
        >
          <Layout size={14} /> Modern_UI
        </button>
        <button
          onClick={() => setView("terminal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            view === "terminal"
              ? "bg-[#00FF94] text-black"
              : "text-white/40 hover:text-white"
          }`}
        >
          <TerminalIcon size={14} /> DevOps_Console
        </button>
      </div>

      {/* CONTAINER WITH CSS TRANSITION */}
      <div className="relative overflow-hidden min-h-[500px]">
        {/* MODERN VIEW: Standard CSS Transition */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            view === "modern"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none absolute inset-0"
          } bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-[3rem]`}
        >
          {isSubmitted ? (
            <SuccessState onReset={() => setIsSubmitted(false)} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Form inputs... (Same as before) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  {...register("name")}
                  placeholder="Full Name"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:border-[#00FF94]/50 transition-all outline-none"
                />
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:border-[#00FF94]/50 transition-all outline-none"
                />
              </div>
              <input
                {...register("subject")}
                placeholder="Subject"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm outline-none"
              />
              <textarea
                {...register("message")}
                placeholder="Message..."
                rows={5}
                className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-sm resize-none outline-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-white text-black font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-[#00FF94] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
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
        </div>

        {/* TERMINAL VIEW: Standard CSS Transition */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            view === "terminal"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none absolute inset-0"
          } bg-[#050505] border border-white/10 rounded-[2.5rem] font-mono shadow-2xl overflow-hidden`}
        >
          {/* Terminal Content Header */}
          <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[10px] text-white/20 uppercase font-bold italic">
              root@mayur-os: /dev/contact
            </span>
          </div>

          <div className="p-8 space-y-4 text-xs md:text-sm">
            <div className="flex gap-2">
              <span className="text-[#00FF94]">guest@portfolio:</span>
              <span className="text-white">~$ initiate-handshake --secure</span>
            </div>
            <p className="text-white/40 italic">
             {' //'} Establishing connection...
            </p>

            {isSubmitted && (
              <div className="pt-4 text-[10px]">
                <p className="text-[#00FF94] font-bold">
                  {">"} HANDSHAKE_SUCCESSFUL
                </p>
                <p className="text-white/20 uppercase mt-1">
                  Session: {sessionId}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <span className="text-[#00FF94]">guest@portfolio:</span>
              <span className="text-white italic">
                {isSubmitting
                  ? "processing..."
                  : isSubmitted
                    ? "standby"
                    : "listening..."}
              </span>
              <span className="w-2 h-5 bg-[#00FF94] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
