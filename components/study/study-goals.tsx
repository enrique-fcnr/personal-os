"use client";

import { useState } from "react";
import { Plus, X, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type GoalUnit = "horas" | "livros" | "cursos" | "% concluído" | "itens";

type Goal = {
  id: number;
  label: string;
  current: number;
  target: number;
  unit: GoalUnit;
};

const UNITS: GoalUnit[] = ["horas", "livros", "cursos", "% concluído", "itens"];

const INITIAL: Goal[] = [
  { id: 1, label: "Horas de estudo no mês",     current: 48,  target: 80,  unit: "horas"      },
  { id: 2, label: "Livros lidos no ano",         current: 7,   target: 12,  unit: "livros"     },
  { id: 3, label: "Cursos concluídos no ano",    current: 2,   target: 6,   unit: "cursos"     },
  { id: 4, label: "Curso de IA — módulos",       current: 17,  target: 25,  unit: "% concluído"},
];

let nextId = INITIAL.length + 1;

function pctColor(p: number) {
  if (p >= 80) return "bg-green-400";
  if (p >= 40) return "bg-brand-sky";
  return "bg-brand-orange";
}

const parse = (s: string) => parseFloat(s.replace(",", ".")) || 0;

export default function StudyGoals() {
  const [goals, setGoals]         = useState<Goal[]>(INITIAL);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [adding, setAdding]       = useState(false);
  const [form, setForm]           = useState({ label: "", current: "", target: "", unit: "horas" as GoalUnit });

  const add = () => {
    if (!form.label.trim() || !form.target.trim()) return;
    setGoals((p) => [...p, { id: nextId++, label: form.label, current: parse(form.current), target: parse(form.target), unit: form.unit }]);
    setForm({ label: "", current: "", target: "", unit: "horas" });
    setAdding(false);
  };

  const remove = (id: number) => { setGoals((p) => p.filter((g) => g.id !== id)); setConfirmId(null); };

  return (
    <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-brand-sky" />
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">Metas de Estudo</p>
        </div>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-sky hover:text-white transition-colors flex items-center gap-1.5"
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
          <div className="grid grid-cols-3 gap-2 items-end">
            <div>
              <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mb-1">Atual</p>
              <input
                placeholder="0"
                value={form.current}
                onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
              />
            </div>
            <div>
              <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mb-1">Meta</p>
              <input
                placeholder="0"
                value={form.target}
                onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") add(); }}
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
              />
            </div>
            <div>
              <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mb-1">Unidade</p>
              <div className="flex items-end gap-2">
                <select
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value as GoalUnit }))}
                  className="flex-1 bg-transparent border-b border-white/20 outline-none font-inter text-[10px] text-white/60 pb-1 [color-scheme:dark] w-0"
                >
                  {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
                <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-sky hover:text-white transition-colors shrink-0 pb-1">Add</button>
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
                <span className="font-inter text-[9px] text-white/25">{g.current} {g.unit}</span>
                <span className="font-inter text-[9px] text-white/25">{g.target} {g.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
