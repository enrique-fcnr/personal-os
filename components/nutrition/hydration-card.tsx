"use client";

import { useState } from "react";
import { Droplets, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS   = ["S", "T", "Q", "Q", "S", "S", "D"];
const TODAY  = 6;

const INITIAL_WEEK = [true, true, false, true, true, true, false];

export default function HydrationCard() {
  const [week, setWeek] = useState(INITIAL_WEEK);

  const toggle = (i: number) =>
    setWeek((w) => { const next = [...w]; next[i] = !next[i]; return next; });

  const daysOk   = week.filter(Boolean).length;
  const weekDone = daysOk === 7;
  const todayOk  = week[TODAY];

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col items-center text-center h-full">
      <Droplets className="w-6 h-6 text-brand-sky mb-3 mt-1" />

      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-4">
        Hidratação
      </p>

      {/* Main CTA — marca hoje */}
      <button
        onClick={() => toggle(TODAY)}
        className={cn(
          "w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 mb-4",
          todayOk
            ? "border-green-400/60 bg-green-400/10"
            : "border-brand-sky/40 bg-brand-sky/5 hover:bg-brand-sky/10"
        )}
      >
        {todayOk
          ? <Check className="w-8 h-8 text-green-400" />
          : <Droplets className="w-8 h-8 text-brand-sky/50" />
        }
      </button>

      <p className={cn(
        "font-inter text-[11px] uppercase tracking-widest mb-1",
        todayOk ? "text-green-400" : "text-white/40"
      )}>
        {todayOk ? "3.5L concluído hoje" : "Marcar 3.5L de hoje"}
      </p>

      {/* Weekly dots */}
      <div className="flex gap-1.5 w-full mt-6 mb-3">
        {DAYS.map((day, i) => {
          const done    = week[i];
          const isToday = i === TODAY;
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="flex flex-col items-center gap-1.5 flex-1 group"
            >
              <div className={cn(
                "w-full h-1.5 rounded-full transition-all duration-300",
                done    ? "bg-green-400"              :
                isToday ? "bg-brand-sky/30 group-hover:bg-brand-sky/50" :
                          "bg-white/8 group-hover:bg-white/15"
              )} />
              <span className={cn(
                "font-inter text-[8px] uppercase tracking-widest transition-colors",
                done    ? "text-green-400" :
                isToday ? "text-brand-sky" :
                          "text-white/20"
              )}>
                {day}
              </span>
            </button>
          );
        })}
      </div>

      <p className={cn(
        "font-inter text-[9px] uppercase tracking-widest",
        weekDone ? "text-green-400" : "text-white/25"
      )}>
        {weekDone ? "Semana perfeita!" : `${daysOk}/7 dias na meta`}
      </p>
    </div>
  );
}
