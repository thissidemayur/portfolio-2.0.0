"use client";

import { useId } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen"; // Ensure path is correct
import { ChevronRight, Zap, ShieldCheck, Clock } from "lucide-react";

export function HireMayurExpandableButton() {
  const nameId = useId();
  const emailId = useId();
  const projectTypeId = useId();
  const timelineId = useId();
  const messageId = useId();

  return (
    <ExpandableScreen
      layoutId="hire-mayur-card"
      triggerRadius="12px"
      contentRadius="32px"
    >
      {/* TRIGGER BUTTON */}
      <ExpandableScreenTrigger>
        <span className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-blue-700 shadow-[0_15px_30px_rgba(37,99,235,0.3)]">
          Initiate Project Sync <ChevronRight size={14} />
        </span>
      </ExpandableScreenTrigger>

      {/* EXPANDED CONTENT */}
      <ExpandableScreenContent className="bg-[#0a0a0a] border border-white/10 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1200px] mx-auto items-center p-8 sm:p-12 lg:p-20 gap-12 lg:gap-20">
          {/* LEFT SIDE: VALUE PROPOSITION */}
          <div className="flex-1 flex flex-col justify-center space-y-8 w-full">
            <div className="space-y-2">
              <span className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                Project_Discovery
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter italic uppercase">
                Secure your <span className="text-white/20">Slot</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Clock />,
                  text: "24/7 Synchronous Communication during dev cycles.",
                },
                {
                  icon: <Zap />,
                  text: "Next.js 15 & GoLang optimized high-speed architecture.",
                },
                {
                  icon: <ShieldCheck />,
                  text: "LPU Engineering verified standards & documentation.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    {item.icon}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed italic">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* TESTIMONIAL / TRUST AREA */}
            <div className="pt-8 mt-8 border-t border-white/5">
              <p className="text-lg text-white/80 font-medium italic mb-6">
                "Mayur's approach to systems engineering significantly reduced
                our infrastructure latency."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-widest">
                    Industry Partner
                  </p>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    DevOps Collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DISCOVERY FORM */}
          <div className="flex-1 w-full bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor={nameId}
                    className="text-[9px] font-mono font-black text-white/30 mb-2 block tracking-widest uppercase"
                  >
                    NAME *
                  </Label>
                  <Input
                    id={nameId}
                    placeholder="Full Name"
                    className="bg-black/50 border-white/10 text-white rounded-xl focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={emailId}
                    className="text-[9px] font-mono font-black text-white/30 mb-2 block tracking-widest uppercase"
                  >
                    EMAIL *
                  </Label>
                  <Input
                    id={emailId}
                    type="email"
                    placeholder="Email Address"
                    className="bg-black/50 border-white/10 text-white rounded-xl focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label
                    htmlFor={projectTypeId}
                    className="text-[9px] font-mono font-black text-white/30 mb-2 block tracking-widest uppercase"
                  >
                    PROJECT TYPE
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-black/50 border-white/10 text-white rounded-xl">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                      <SelectItem value="saas">SaaS Development</SelectItem>
                      <SelectItem value="systems">Systems / GoLang</SelectItem>
                      <SelectItem value="devops">DevOps / Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-32">
                  <Label
                    htmlFor={timelineId}
                    className="text-[9px] font-mono font-black text-white/30 mb-2 block tracking-widest uppercase"
                  >
                    TIMELINE
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-black/50 border-white/10 text-white rounded-xl">
                      <SelectValue placeholder="Weeks" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                      <SelectItem value="2-4">2-4w</SelectItem>
                      <SelectItem value="4-8">4-8w</SelectItem>
                      <SelectItem value="long">8w+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label
                  htmlFor={messageId}
                  className="text-[9px] font-mono font-black text-white/30 mb-2 block tracking-widest uppercase"
                >
                  PROJECT BRIEF
                </Label>
                <Textarea
                  id={messageId}
                  rows={4}
                  placeholder="Tell me about the challenges we're solving..."
                  className="bg-black/50 border-white/10 text-white rounded-2xl resize-none focus:ring-blue-500/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 bg-white text-black hover:bg-blue-600 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-xl transition-all shadow-xl"
              >
                Submit Discovery Request
              </Button>
            </form>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
