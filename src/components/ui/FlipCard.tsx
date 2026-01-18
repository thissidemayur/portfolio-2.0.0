import { cn } from "@/lib/utils";

interface TechDetail {
  label: string;
  value: string;
}

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  subtitle?: string;
  details?: TechDetail[];
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  title,
  details,
  subtitle,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  // FIXED: Defining the rotation logic that was missing
  const rotationClass = {
    x: [
      "group-hover:[transform:rotateX(180deg)]",
      "[transform:rotateX(180deg)]",
    ],
    y: [
      "group-hover:[transform:rotateY(180deg)]",
      "[transform:rotateY(180deg)]",
    ],
  };
  const self = rotationClass[rotate];

  return (
    <div
      className={cn("group h-full w-full [perspective:1000px]", className)}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
          self[0] // Now 'self' is defined
        )}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-2xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent rounded-2xl" />
          <div className="absolute bottom-5 left-5">
            <p className="text-[10px] text-blue-400 font-mono mb-1 tracking-widest">
              PROJECT_VIEW
            </p>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        {/* BACK FACE: SYSTEM MANIFEST */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-[#0a0a0a] p-6 text-slate-200 [backface-visibility:hidden] border border-white/10 shadow-2xl",
            self[1]
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
                {subtitle}
              </h1>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
            </div>

            {/* ORGANIZED POINTS */}
            <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
              {details?.map((item, idx) => (
                <div
                  key={idx}
                  className="group/item border-b border-white/5 pb-2"
                >
                  <p className="text-[8px] text-white/30 uppercase font-mono mb-1 group-hover/item:text-blue-400 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[10px] font-medium text-white/90">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}
