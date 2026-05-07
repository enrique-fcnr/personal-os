"use client";

import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { WEEK } from "@/components/workout/weekly-schedule";

type WorkoutType = "HIPERTROFIA" | "CARDIO" | "FORÇA" | "MOBILIDADE" | "DESCANSO";

type Intensity = "LEVE" | "MODERADO" | "INTENSO";

const KCAL: Record<WorkoutType, number> = {
  DESCANSO:    180,
  MOBILIDADE:  280,
  HIPERTROFIA: 380,
  FORÇA:       450,
  CARDIO:      540,
};

const INTENSITY: Record<WorkoutType, Intensity> = {
  DESCANSO:    "LEVE",
  MOBILIDADE:  "LEVE",
  HIPERTROFIA: "MODERADO",
  FORÇA:       "MODERADO",
  CARDIO:      "INTENSO",
};

const INTENSITY_STYLES: Record<Intensity, { bar: string; text: string }> = {
  LEVE:     { bar: "bg-brand-sky",    text: "text-brand-sky"    },
  MODERADO: { bar: "bg-brand-orange", text: "text-brand-orange" },
  INTENSO:  { bar: "bg-[#FACC15]",   text: "text-[#FACC15]"   },
};

type Props = { completedDays: Set<number> };

export default function CaloricCard({ completedDays }: Props) {
  const completedList = Array.from(completedDays).map((i) => WEEK[i]).filter(Boolean);

  const totalKcal = completedList.reduce((sum, d) => sum + KCAL[d.type as WorkoutType], 0);

  const byIntensity = completedList.reduce<Record<Intensity, number>>(
    (acc, d) => {
      const key = INTENSITY[d.type as WorkoutType];
      acc[key] += KCAL[d.type as WorkoutType];
      return acc;
    },
    { LEVE: 0, MODERADO: 0, INTENSO: 0 }
  );

  const intensities: Intensity[] = ["LEVE", "MODERADO", "INTENSO"];
  const hasBurn = totalKcal > 0;

  // weekly target ~2800 kcal (7 sessions avg)
  const TARGET_WEEK = 2_800;
  const weekPct = Math.min(100, Math.round((totalKcal / TARGET_WEEK) * 100));

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-3.5 h-3.5 text-brand-orange" />
        <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Gasto Calórico Estimado
        </p>
      </div>

      {/* Total */}
      <div className="flex items-end gap-3 mb-4">
        <p className="font-bayon text-4xl text-white leading-none">
          {totalKcal.toLocaleString("pt-BR")}
        </p>
        <div className="pb-1">
          <span className="font-inter text-xs text-white/40 uppercase tracking-widest">kcal</span>
          <p className="font-inter text-[9px] text-white/25 uppercase tracking-widest">
            {weekPct}% da meta semanal
          </p>
        </div>
      </div>

      {/* Intensity bar */}
      <div className={cn("h-2 rounded-full overflow-hidden flex gap-0.5", !hasBurn && "bg-white/5")}>
        {hasBurn
          ? intensities.map((key) => {
              const w = totalKcal > 0 ? (byIntensity[key] / totalKcal) * 100 : 0;
              if (w === 0) return null;
              return (
                <div
                  key={key}
                  className={cn("h-full rounded-sm transition-all duration-700", INTENSITY_STYLES[key].bar)}
                  style={{ width: `${w}%` }}
                />
              );
            })
          : <div className="h-full w-full bg-white/5 rounded-full" />
        }
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {intensities.map((key) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={cn("w-2 h-2 rounded-sm shrink-0", INTENSITY_STYLES[key].bar)} />
            <span className="font-inter text-[9px] text-white/35 uppercase tracking-widest">{key}</span>
            <span className="font-inter text-[9px] text-white/20">
              {byIntensity[key] > 0 ? byIntensity[key].toLocaleString("pt-BR") : "—"}
            </span>
          </div>
        ))}
      </div>

      {!hasBurn && (
        <p className="font-inter text-[10px] text-white/20 mt-3 uppercase tracking-widest">
          Conclua treinos para ver o gasto acumulado
        </p>
      )}
    </div>
  );
}
