// app/about/AcademicSection.tsx
import MotionWrapper from "./MotionWrapper";
import { academicMilestones } from "@/lib/constant";
import { CheckCircle2 } from "lucide-react";

export default function AcademicSection() {
  return (
    <section className="mb-40">
      <h2 className="text-3xl font-black uppercase italic mb-12">
        Academic Journey
      </h2>

      <div className="space-y-8">
        {academicMilestones.map((m) => (
          <MotionWrapper key={m.semester}>
            <article className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem]">
              <h3 className="text-xl font-bold uppercase italic mb-2">
                {m.focus}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{m.details}</p>
              <span className="flex items-center gap-2 text-[10px] font-mono uppercase text-white/30">
                <CheckCircle2 size={12} className="text-blue-500" />
                Engineering Verified
              </span>
            </article>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
