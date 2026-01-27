"use client";
import React, { useState } from "react";
import {
  Mail,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Terminal,
} from "lucide-react";
import MessageActions from "./MessageActions";
import { IMsg } from "@/types/database";

export default function MessageRow({ msg }: { msg: IMsg }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative group bg-[#0A0A0A] border rounded-[2rem] transition-all duration-500 overflow-hidden ${
        msg.is_read
          ? "border-white/5 opacity-60"
          : "border-[#00FF94]/20 shadow-[0_0_30px_rgba(0,255,148,0.02)]"
      }`}
    >
      {/* Unread Indicator */}
      {!msg.is_read && (
        <div className="absolute top-8 left-0 w-1 h-8 bg-[#00FF94] rounded-r-full shadow-[0_0_15px_#00FF94]" />
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* SENDER IDENTITY */}
          <div className="lg:w-1/4 space-y-2">
            <div className="flex items-center gap-2 text-white/90">
              <User size={14} className="text-[#00FF94]" />
              <span className="font-bold text-sm tracking-tight">
                {msg.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase truncate">
              <Mail size={12} />
              <span>{msg.email}</span>
            </div>
          </div>

          {/* SUBJECT & PREVIEW */}
          <div className="lg:w-2/4 space-y-1">
            <h3 className="text-[#00FF94] font-black uppercase text-[10px] tracking-widest italic flex items-center gap-2">
              <Terminal size={10} /> Subject: {msg.subject}
            </h3>
            <p
              className={`text-white/60 text-sm transition-all duration-300 ${isOpen ? "opacity-0 h-0" : "opacity-100 line-clamp-1"}`}
            >
              {msg.message}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="lg:w-1/4 flex items-center justify-between lg:justify-end gap-4 border-t border-white/5 lg:border-none pt-4 lg:pt-0">
            <div className="flex items-center gap-2 text-white/10 text-[9px] font-mono lg:hidden">
              <Clock size={10} />
              <span suppressHydrationWarning>
                {new Date(msg.received_at)
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 16)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  isOpen
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
              >
                {isOpen ? (
                  <>
                    <ChevronUp size={14} /> Close
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} /> Open
                  </>
                )}
              </button>
              <MessageActions id={msg.id} isRead={msg.is_read} />
            </div>
          </div>
        </div>

        {/* EXPANDED CONTENT AREA */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            isOpen
              ? "grid-rows-[1fr] mt-8 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  Message_Body_Decrypted:
                </span>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={10} />{" "}
                  {new Date(msg.received_at)
                    .toISOString()
                    .replace("T", " ")
                    .substring(0, 16)}{" "}
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {msg.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
