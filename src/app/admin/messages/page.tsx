import { getMessages } from "@/dal/messages.dal";
import { Mail, Clock, User, ArrowLeft, Radio } from "lucide-react";
import MessageRow from "@/components/admin/MessageRow"; // New Client Component
import { IMsg } from "@/types/database";
import Link from "next/link";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* SYSTEM NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back_to_System
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#00FF94] uppercase tracking-widest">
          <Radio size={12} className="animate-pulse" />
          Receiver_Online
        </div>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
          Signal_Receiver <span className="text-white/10">/ Inbox</span>
        </h1>
        <p className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]">
          Intercepting_Communication_Packets
        </p>
      </header>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-20 border border-dashed border-white/5 rounded-[2.5rem] text-center">
            <p className="text-white/10 font-mono text-sm tracking-widest uppercase">
              NO_INCOMING_SIGNALS_DETECTED
            </p>
          </div>
        ) : (
          messages.map((msg: IMsg) => (
            /* We pass the message to a client component for the expand logic */
            <MessageRow key={msg.id} msg={msg} />
          ))
        )}
      </div>
    </div>
  );
}
