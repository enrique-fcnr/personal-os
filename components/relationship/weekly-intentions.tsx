"use client";

import { useState } from "react";
import { Heart, Plus, X, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Intention = {
  id: number;
  text: string;
  person: string;
  done: boolean;
};

const DEFAULT_INTENTIONS: Intention[] = [
  { id: 1, text: "Reservar jantar surpresa",    person: "Ana",     done: false },
  { id: 2, text: "Ligar para dar parabéns",     person: "Mãe",     done: true  },
  { id: 3, text: "Marcar almoço semanal",       person: "Pedro",   done: false },
  { id: 4, text: "Enviar presente de aniversário", person: "Sobrinho", done: false },
];

let nextId = 10;

export default function WeeklyIntentions() {
  const [intentions, setIntentions] = useState<Intention[]>(DEFAULT_INTENTIONS);
  const [adding, setAdding]         = useState(false);
  const [confirmId, setConfirmId]   = useState<number | null>(null);
  const [form, setForm]             = useState({ text: "", person: "" });

  const toggle = (id: number) => {
    setIntentions((p) => p.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  };

  const add = () => {
    if (!form.text.trim()) return;
    setIntentions((p) => [...p, { id: nextId++, text: form.text, person: form.person, done: false }]);
    setForm({ text: "", person: "" });
    setAdding(false);
  };

  const remove = (id: number) => {
    setIntentions((p) => p.filter((i) => i.id !== id));
    setConfirmId(null);
  };

  const done  = intentions.filter((i) => i.done).length;
  const total = intentions.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-brand-orange" />
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Intenções da Semana
          </p>
        </div>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          Intenção
        </button>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="font-inter text-[9px] text-white/25 uppercase tracking-widest">{done}/{total} concluídas</span>
            <span className="font-inter text-[9px] text-brand-orange">{pct}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", pct === 100 ? "bg-green-400" : "bg-brand-orange")}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {/* Add form */}
      {adding && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <input
            autoFocus
            placeholder="O que queres fazer?"
            value={form.text}
            onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <div className="flex gap-2 items-end">
            <input
              placeholder="Para quem?"
              value={form.person}
              onChange={(e) => setForm((f) => ({ ...f, person: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") add(); }}
              className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
            />
            <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-orange hover:text-white transition-colors pb-1">
              Add
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-2 flex-1">
        {intentions.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            className={cn(
              "flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all group",
              item.done
                ? "border-green-500/20 bg-green-500/[0.04]"
                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
            )}
          >
            <div className="shrink-0">
              {item.done
                ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                : <Circle className="w-4 h-4 text-white/20" />
              }
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn("font-inter text-sm transition-colors", item.done ? "text-white/30 line-through" : "text-white/80")}>
                {item.text}
              </p>
              {item.person && (
                <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mt-0.5">
                  → {item.person}
                </p>
              )}
            </div>

            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
              {confirmId === item.id ? (
                <span className="flex flex-col items-end gap-1">
                  <button onClick={() => remove(item.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                  <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                </span>
              ) : (
                <button onClick={() => setConfirmId(item.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}

        {intentions.length === 0 && (
          <p className="font-inter text-[10px] text-white/20 uppercase tracking-widest mt-1">
            Nenhuma intenção registrada esta semana
          </p>
        )}
      </div>
    </div>
  );
}
