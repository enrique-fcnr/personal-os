"use client";

import { cn } from "@/lib/utils";

type WorkoutType = "HIPERTROFIA" | "CARDIO" | "FORÇA" | "MOBILIDADE" | "DESCANSO";

type DayPlan = {
  day: string;
  date: number;
  type: WorkoutType;
  session: string;
  muscles: string;
};

const TYPE_STYLES: Record<WorkoutType, string> = {
  HIPERTROFIA: "text-brand-orange border-brand-orange/40 bg-brand-orange/10",
  CARDIO:      "text-brand-sky border-brand-sky/40 bg-brand-sky/10",
  FORÇA:       "text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10",
  MOBILIDADE:  "text-green-400 border-green-400/40 bg-green-400/10",
  DESCANSO:    "text-white/25 border-white/10 bg-white/5",
};

const WEEK: DayPlan[] = [
  { day: "SEG", date: 5,  type: "HIPERTROFIA", session: "Hipertrofia Funcional",    muscles: "Peito · Tríceps"  },
  { day: "TER", date: 6,  type: "CARDIO",      session: "Zone 2 + HIIT",            muscles: "Cardiovascular"   },
  { day: "QUA", date: 7,  type: "FORÇA",       session: "Lower Power",              muscles: "Quad · Posterior" },
  { day: "QUI", date: 8,  type: "HIPERTROFIA", session: "Pull Day",                 muscles: "Costas · Bíceps"  },
  { day: "SEX", date: 9,  type: "MOBILIDADE",  session: "Mobilidade & Recuperação", muscles: "Full body"        },
  { day: "SAB", date: 10, type: "FORÇA",       session: "Upper Strength",           muscles: "Ombros · Trapézio"},
  { day: "DOM", date: 11, type: "DESCANSO",    session: "Descanso Ativo",           muscles: "—"               },
];

type Props = {
  activeDay: number;
  onSelect: (i: number) => void;
  completedDays: Set<number>;
};

export default function WeeklySchedule({ activeDay, onSelect, completedDays }: Props) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-4">
        Semana de Treino
      </p>
      <div className="grid grid-cols-7 gap-2">
        {WEEK.map((d, i) => {
          const active    = i === activeDay;
          const completed = completedDays.has(i);
          const rest      = d.type === "DESCANSO";

          return (
            <div key={d.day} className="relative flex flex-col">
              <button
                onClick={() => onSelect(i)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center flex-1",
                  completed
                    ? "bg-green-500/10 border-green-500/30"
                    : active
                      ? "bg-brand-orange/15 border-brand-orange/40"
                      : "border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                )}
              >
                <span className={cn(
                  "font-inter text-[10px] uppercase tracking-widest",
                  completed ? "text-green-400" : active ? "text-brand-orange" : "text-white/40"
                )}>
                  {d.day}
                </span>
                <span className={cn(
                  "font-bayon text-xl leading-none",
                  completed ? "text-green-400" : active ? "text-white" : rest ? "text-white/20" : "text-white/60"
                )}>
                  {d.date}
                </span>
                <span className={cn(
                  "font-inter text-[8px] uppercase tracking-widest border rounded-sm px-1.5 py-0.5 w-full text-center leading-tight",
                  completed ? "text-green-400 border-green-400/40 bg-green-400/10" : TYPE_STYLES[d.type]
                )}>
                  {completed ? "FEITO" : d.type}
                </span>
                <span className="font-inter text-[9px] text-white/30 leading-tight hidden lg:block">
                  {d.muscles}
                </span>
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export { WEEK };
export type { DayPlan, WorkoutType };
