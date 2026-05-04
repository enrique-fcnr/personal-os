"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const INITIAL_PRIORITIES = [
  { id: 1, label: "Aprovar Budget Q4", tag: "URGENTE" },
  { id: 2, label: "Review de Arquitetura S3", tag: "TECNOLOGIA" },
  { id: 3, label: "One-on-One: Diretores", tag: "GESTÃO" },
];

const TAG_COLORS: Record<string, string> = {
  URGENTE: "text-brand-orange border-brand-orange/30 bg-brand-orange/10",
  TECNOLOGIA: "text-brand-blue border-brand-blue/30 bg-brand-blue/10",
  GESTÃO: "text-white/50 border-white/10 bg-white/5",
};

export default function PriorityList() {
  const [doneIds, setDoneIds] = useState<number[]>([1]);

  const toggle = (id: number) =>
    setDoneIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-['Space_Grotesk'] uppercase tracking-widest text-[10px] text-white/60">
          Prioridades do Dia
        </h3>
        <span className="text-[10px] font-['Space_Grotesk'] text-white/30">
          {INITIAL_PRIORITIES.length} itens
        </span>
      </div>

      <div className="space-y-4">
        {INITIAL_PRIORITIES.map(({ id, label, tag }) => {
          const done = doneIds.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className="w-full flex items-center gap-4 text-left cursor-pointer group"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all",
                  done
                    ? "bg-brand-blue border-brand-blue"
                    : "border-white/20 group-hover:border-white/50"
                )}
              >
                {done && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <p
                className={cn(
                  "flex-1 text-sm font-medium transition-all",
                  done ? "line-through text-white/30" : "text-white/90"
                )}
              >
                {label}
              </p>

              <span
                className={cn(
                  "text-[9px] font-['Space_Grotesk'] uppercase tracking-wider border rounded-sm px-1.5 py-0.5 shrink-0",
                  TAG_COLORS[tag] ?? "text-white/50 border-white/10 bg-white/5"
                )}
              >
                {tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
