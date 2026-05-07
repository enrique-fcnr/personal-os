"use client";

import { cn } from "@/lib/utils";

type Macro = {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  border: string;
  text: string;
};

const MACROS: Macro[] = [
  { label: "Proteína",      current: 164, target: 200, unit: "g", color: "bg-brand-sky",    border: "border-brand-sky/40",    text: "text-brand-sky"    },
  { label: "Carboidratos",  current: 112, target: 250, unit: "g", color: "bg-brand-orange", border: "border-brand-orange/40", text: "text-brand-orange" },
  { label: "Gorduras",      current: 48,  target: 80,  unit: "g", color: "bg-[#F87171]",    border: "border-[#F87171]/40",    text: "text-[#F87171]"    },
];

export default function MacrosCard() {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {MACROS.map((m) => {
        const pct = Math.min(100, Math.round((m.current / m.target) * 100));
        return (
          <div
            key={m.label}
            className={cn("glass-card rounded-2xl p-4 border flex flex-col justify-between", m.border)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <p className="font-inter uppercase tracking-widest text-[9px] text-white/50">
                {m.label}
              </p>
              <span className={cn("font-inter text-[11px] font-semibold", m.text)}>
                {pct}%
              </span>
            </div>

            {/* Value */}
            <div className="flex items-end gap-1.5 mb-3">
              <p className="font-bayon text-4xl text-white leading-none">
                {m.current}{m.unit.toUpperCase()}
              </p>
              <p className="font-inter text-sm text-white/30 leading-none mb-0.5">
                / {m.target}{m.unit}
              </p>
            </div>

            {/* Bar */}
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-700", m.color)}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
