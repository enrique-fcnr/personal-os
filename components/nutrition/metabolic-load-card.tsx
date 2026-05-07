"use client";

import { cn } from "@/lib/utils";

type Status = "ESTÁVEL" | "ELEVADO" | "CRÍTICO" | "BAIXO";

const STATUS_STYLES: Record<Status, { badge: string; value: string }> = {
  ESTÁVEL:  { badge: "text-brand-orange border-brand-orange/40 bg-brand-orange/10", value: "text-white"       },
  ELEVADO:  { badge: "text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10",         value: "text-[#FACC15]"  },
  CRÍTICO:  { badge: "text-[#F87171] border-[#F87171]/40 bg-[#F87171]/10",         value: "text-[#F87171]"  },
  BAIXO:    { badge: "text-brand-sky border-brand-sky/40 bg-brand-sky/10",         value: "text-brand-sky"  },
};

const WEEKLY_DATA = [38, 52, 61, 45, 70, 74, 74];
const DAYS        = ["S", "T", "Q", "Q", "S", "S", "D"];
const MAX_VAL     = 100;
const CURRENT     = 74.2;
const STATUS: Status = "ESTÁVEL";

export default function MetabolicLoadCard() {
  const style = STATUS_STYLES[STATUS];
  const max   = Math.max(...WEEKLY_DATA);

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Carga Metabólica
          </p>
          <p className="font-inter text-[9px] text-white/25 uppercase tracking-widest mt-0.5">
            Tempo Real / Integrado
          </p>
        </div>
        <span className={cn("font-inter text-[9px] uppercase tracking-widest border rounded-sm px-2 py-1", style.badge)}>
          {STATUS}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-end gap-2 mt-4 mb-6">
        <p className={cn("font-bayon text-6xl leading-none", style.value)}>
          {CURRENT}
        </p>
        <p className="font-inter text-sm text-white/30 mb-1.5 uppercase tracking-widest">GSR</p>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 flex-1 min-h-0">
        {WEEKLY_DATA.map((val, i) => {
          const isToday   = i === WEEKLY_DATA.length - 1;
          const heightPct = (val / MAX_VAL) * 100;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-full flex items-end" style={{ height: "80px" }}>
                <div
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-700",
                    isToday ? "bg-brand-sky" : val === max ? "bg-brand-sky/50" : "bg-white/10"
                  )}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className={cn(
                "font-inter text-[8px] uppercase tracking-widest",
                isToday ? "text-brand-sky" : "text-white/20"
              )}>
                {DAYS[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
