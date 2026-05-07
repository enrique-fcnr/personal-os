"use client";

import { useState } from "react";
import { FlaskConical, Plus, X, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type SupContext = "PÓS-CAFÉ" | "PRÉ-TREINO" | "PÓS-TREINO" | "PRÉ-SONO" | "JEJUM";

const CTX_COLOR: Record<SupContext, string> = {
  "PÓS-CAFÉ":   "bg-brand-sky",
  "PRÉ-TREINO": "bg-brand-orange",
  "PÓS-TREINO": "bg-brand-sky",
  "PRÉ-SONO":   "bg-[#FACC15]",
  "JEJUM":      "bg-white/30",
};

type Supplement = {
  id: number;
  name: string;
  time: string;
  context: SupContext;
  done: boolean;
};

const DEFAULT_SUPS: Supplement[] = [
  { id: 1, name: "Omega-3 & Vitamina D3",  time: "08:00", context: "PÓS-CAFÉ",   done: true  },
  { id: 2, name: "Magnésio Treonato",       time: "21:30", context: "PRÉ-SONO",   done: false },
  { id: 3, name: "Creatina Monoidratada",   time: "14:00", context: "PÓS-TREINO", done: false },
];

let nextId = 10;
const CONTEXTS: SupContext[] = ["PÓS-CAFÉ", "PRÉ-TREINO", "PÓS-TREINO", "PRÉ-SONO", "JEJUM"];

export default function SupplementsCard() {
  const [sups, setSups]         = useState<Supplement[]>(DEFAULT_SUPS);
  const [adding, setAdding]     = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [form, setForm]         = useState({ name: "", time: "", context: "PÓS-CAFÉ" as SupContext });

  const toggle = (id: number) => setSups((p) => p.map((s) => s.id === id ? { ...s, done: !s.done } : s));

  const add = () => {
    if (!form.name.trim()) return;
    setSups((p) => [...p, { id: nextId++, name: form.name, time: form.time, context: form.context, done: false }]);
    setForm({ name: "", time: "", context: "PÓS-CAFÉ" });
    setAdding(false);
  };

  const remove = (id: number) => {
    setSups((p) => p.filter((s) => s.id !== id));
    setConfirmId(null);
  };

  const done = sups.filter((s) => s.done).length;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-bayon text-xl text-white uppercase tracking-wide">Suplementação</p>
        <button
          onClick={() => setAdding((v) => !v)}
          className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-orange hover:border-brand-orange/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <input
            autoFocus
            placeholder="Nome do suplemento"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <div className="grid grid-cols-3 gap-2 items-end">
            <input
              placeholder="Horário"
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
            />
            <select
              value={form.context}
              onChange={(e) => setForm((f) => ({ ...f, context: e.target.value as SupContext }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 pb-1"
            >
              {CONTEXTS.map((c) => <option key={c} value={c} className="bg-brand-dark">{c}</option>)}
            </select>
            <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-orange hover:text-white transition-colors pb-1">
              Add
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-2 flex-1">
        {sups.map((s) => (
          <div
            key={s.id}
            onClick={() => toggle(s.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all group",
              s.done ? "border-white/5 bg-white/[0.02] opacity-60" : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04]"
            )}
          >
            {/* Dot */}
            <div className={cn("w-2 h-2 rounded-full shrink-0", CTX_COLOR[s.context])} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={cn("font-inter text-sm transition-colors", s.done ? "text-white/30 line-through" : "text-white/85")}>
                {s.name}
              </p>
              <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mt-0.5">
                {s.time}{s.time && " · "}{s.context}
              </p>
            </div>

            {/* Check / remove */}
            <div className="shrink-0 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {confirmId === s.id ? (
                <span className="flex gap-2">
                  <button onClick={() => remove(s.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400">Sim</button>
                  <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30">Não</button>
                </span>
              ) : (
                <button onClick={() => setConfirmId(s.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
              <div onClick={() => toggle(s.id)} className="cursor-pointer">
                {s.done
                  ? <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                  : <Circle className="w-4 h-4 text-white/15" />
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer count */}
      <p className="font-inter text-[9px] text-white/20 uppercase tracking-widest mt-4">
        {done}/{sups.length} tomados hoje
      </p>
    </div>
  );
}
