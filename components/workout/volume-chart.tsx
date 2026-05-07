"use client";

import { cn } from "@/lib/utils";

type MuscleGroup = { label: string; sets: number; target: number; color: string };

const GROUPS: MuscleGroup[] = [
  { label: "Costas",   sets: 16, target: 18, color: "bg-brand-orange" },
  { label: "Peito",    sets: 12, target: 16, color: "bg-brand-sky"    },
  { label: "Pernas",   sets: 18, target: 20, color: "bg-[#FACC15]"    },
  { label: "Ombros",   sets: 10, target: 12, color: "bg-green-400"    },
  { label: "Bíceps",   sets: 8,  target: 10, color: "bg-purple-400"   },
  { label: "Tríceps",  sets: 9,  target: 10, color: "bg-brand-blue"   },
];

const MAX = 24;

function statusLabel(sets: number, target: number) {
  const pct = (sets / target) * 100;
  if (pct >= 100) return { text: "No alvo", color: "text-green-400" };
  if (pct >= 75)  return { text: "Próximo", color: "text-brand-sky"  };
  return               { text: "Abaixo",   color: "text-brand-orange" };
}

export default function VolumeChart() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Volume Semanal por Grupo Muscular
        </p>
        <p className="font-inter text-[10px] text-white/30 uppercase tracking-widest">
          Séries · semana atual
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {GROUPS.map((g) => {
          const pct    = Math.min(100, (g.sets / MAX) * 100);
          const tgtPct = Math.min(100, (g.target / MAX) * 100);
          const status = statusLabel(g.sets, g.target);
          return (
            <div key={g.label} className="flex items-center gap-4">
              <span className="font-inter text-xs text-white/60 w-16 shrink-0">{g.label}</span>
              <div className="flex-1 relative h-2 bg-white/5 rounded-full overflow-hidden">
                {/* Target marker */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-white/20"
                  style={{ left: `${tgtPct}%` }}
                />
                {/* Sets bar */}
                <div
                  className={cn("h-full rounded-full transition-all duration-700", g.color)}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-inter text-xs text-white/50 tabular-nums w-12 text-right">
                  {g.sets}<span className="text-white/25">/{g.target}</span>
                </span>
                <span className={cn("font-inter text-[9px] uppercase tracking-widest w-14", status.color)}>
                  {status.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-px h-3 bg-white/20" />
          <span className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Meta semanal</span>
        </div>
        <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest">
          Total: {GROUPS.reduce((a, g) => a + g.sets, 0)} séries · Meta: {GROUPS.reduce((a, g) => a + g.target, 0)}
        </span>
      </div>
    </div>
  );
}
