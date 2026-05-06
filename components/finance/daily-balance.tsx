"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Goal = { id: number; label: string; current: number; target: number };

const INITIAL: Goal[] = [
  { id: 1, label: "Reserva de Emergência", current: 45_000,  target: 60_000  },
  { id: 2, label: "Viagem Europa",         current: 8_200,   target: 15_000  },
  { id: 3, label: "Entrada Imóvel",        current: 120_000, target: 300_000 },
];

let nextId = INITIAL.length + 1;

const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const parse = (s: string) => parseFloat(s.replace(/\./g, "").replace(",", ".")) || 0;

function pctColor(p: number) {
  if (p >= 80) return "bg-green-400";
  if (p >= 40) return "bg-brand-blue";
  return "bg-brand-orange";
}

export default function FinancialGoals() {
  const [goals, setGoals]         = useState<Goal[]>(INITIAL);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [adding, setAdding]       = useState(false);
  const [form, setForm]           = useState({ label: "", current: "", target: "" });

  const add = () => {
    if (!form.label.trim() || !form.target.trim()) return;
    setGoals((p) => [...p, { id: nextId++, label: form.label, current: parse(form.current), target: parse(form.target) }]);
    setForm({ label: "", current: "", target: "" });
    setAdding(false);
  };

  const remove = (id: number) => { setGoals((p) => p.filter((g) => g.id !== id)); setConfirmId(null); };

  return (
    <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Metas Financeiras
        </p>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-blue hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          Nova Meta
        </button>
      </div>

      {adding && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <input
            autoFocus
            placeholder="Nome da meta"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mb-1">Atual (R$)</p>
              <input
                placeholder="0"
                value={form.current}
                onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
              />
            </div>
            <div>
              <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mb-1">Meta (R$)</p>
              <div className="flex items-end gap-2">
                <input
                  placeholder="0"
                  value={form.target}
                  onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === "Enter") add(); if (e.key === "Escape") setAdding(false); }}
                  className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1 w-0"
                />
                <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-blue hover:text-white transition-colors shrink-0 pb-1">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 flex-1">
        {goals.map((g) => {
          const p = Math.min(100, Math.round((g.current / g.target) * 100));
          return (
            <div key={g.id} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-inter text-xs text-white/70">{g.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-inter text-[10px] text-white/40">{p}%</span>
                  {confirmId === g.id ? (
                    <span className="flex items-center gap-1.5">
                      <span className="text-[9px] font-inter text-white/40 uppercase tracking-wider">Confirmar?</span>
                      <button onClick={() => remove(g.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                      <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmId(g.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", pctColor(p))}
                  style={{ width: `${p}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-inter text-[9px] text-white/25">R$ {fmt(g.current)}</span>
                <span className="font-inter text-[9px] text-white/25">R$ {fmt(g.target)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
