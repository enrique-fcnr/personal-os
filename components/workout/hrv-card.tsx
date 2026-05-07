"use client";

import { cn } from "@/lib/utils";

const TARGET = 7;

function statusInfo(done: number) {
  const pct = done / TARGET;
  if (pct >= 1)    return { label: "Semana perfeita!",  color: "text-green-400",    stroke: "#4ade80" };
  if (pct >= 0.71) return { label: "Quase lá",          color: "text-brand-sky",    stroke: "#5BB3FD" };
  if (pct >= 0.43) return { label: "No caminho certo",  color: "text-[#FACC15]",   stroke: "#FACC15" };
  return                  { label: "Continue firme",    color: "text-brand-orange", stroke: "#E6701E" };
}

type Props = { completedDays: number };

export default function WeeklyWorkoutRing({ completedDays }: Props) {
  const pct    = Math.min(100, (completedDays / TARGET) * 100);
  const status = statusInfo(completedDays);

  const RADIUS = 54;
  const CIRC   = 2 * Math.PI * RADIUS;
  const dash   = CIRC * (pct / 100);

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-4">
        Treinos na Semana
      </p>

      <div className="flex items-center gap-6">
        {/* Ring */}
        <div className="relative w-[120px] h-[120px] shrink-0 flex items-center justify-center">
          <svg className="-rotate-90 absolute inset-0" viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r={RADIUS} fill="none"
              stroke={status.stroke} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${CIRC}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="z-10 text-center">
            <p className={cn("font-bayon text-4xl leading-none", status.color)}>
              {Math.round(pct)}%
            </p>
            <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mt-0.5">
              {completedDays}/{TARGET} dias
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <p className={cn("font-inter text-sm font-medium uppercase tracking-widest", status.color)}>
            {status.label}
          </p>
          <p className="font-inter text-[10px] text-white/30 leading-relaxed">
            Marque cada dia como concluído diretamente no calendário semanal acima.
          </p>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: TARGET }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all duration-500",
                  i < completedDays ? status.stroke === "#4ade80" ? "bg-green-400" : i < completedDays ? "bg-[var(--s)]" : "bg-white/[0.08]" : "bg-white/[0.08]"
                )}
                style={i < completedDays ? { backgroundColor: status.stroke } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
