import { getMessages } from "@/dal/messages.dal";
import { ArrowLeft, Radio } from "lucide-react";
import MessageRow from "@/components/admin/MessageRow";
import { IMsg } from "@/types/database";
import Link from "next/link";
import { Suspense } from "react";
import MessagesLoading from "@/components/admin/SuspenseMessage";

// 1. Create the Data-Fetching Component
async function MessageList() {
  // THE AWAIT HAPPENS INSIDE THE SUSPENSE BOUNDARY
  const messages = await getMessages();

  if (messages.length === 0) {
    return (
      <div className="p-20 border border-dashed border-white/5 rounded-[2.5rem] text-center">
        <p className="text-white/10 font-mono text-sm tracking-widest uppercase">
          NO_INCOMING_SIGNALS_DETECTED
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg: IMsg) => (
        <MessageRow key={msg.id} msg={msg} />
      ))}
    </div>
  );
}

// 2. The Main Page (The "Shell")
export default function AdminMessagesPage() {
  // NOTICE: No "await" here!
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* THIS PART LANDS IN THE BROWSER INSTANTLY */}
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

      {/* THE SERVER SENDS THE FALLBACK WHILE MessageList IS BUSY */}
      <Suspense fallback={<MessagesLoading />}>
        <MessageList />
      </Suspense>
    </div>
  );
}
