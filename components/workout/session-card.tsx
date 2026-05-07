"use client";

import { useState } from "react";
import { Plus, X, Zap, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Exercise = {
  id: number;
  name: string;
  desc: string;
  sets: number;
  reps: number | string;
  weight: string;
};

type Session = { name: string; day: string; exercises: Exercise[] };

const SESSIONS: Session[] = [
  {
    name: "Hipertrofia Funcional", day: "DIA 4/6",
    exercises: [
      { id: 1, name: "Levantamento Terra",           desc: "Foco em cadeia posterior e estabilidade", sets: 4, reps: 8,  weight: "140 KG" },
      { id: 2, name: "Supino Inclinado com Halteres", desc: "Controle excêntrico de 3 segundos",      sets: 3, reps: 10, weight: "45 KG"  },
      { id: 3, name: "Remada Curvada Pendlay",        desc: "Explosão concêntrica",                   sets: 4, reps: 8,  weight: "90 KG"  },
    ],
  },
  {
    name: "Zone 2 + HIIT", day: "DIA 1/4",
    exercises: [
      { id: 1, name: "Corrida Zone 2",        desc: "FC entre 130–145 bpm por 30 min",      sets: 1, reps: "30 min", weight: "—" },
      { id: 2, name: "Sprints HIIT",          desc: "20s esforço máximo / 40s recuperação", sets: 8, reps: "20s",    weight: "—" },
      { id: 3, name: "Alongamento dinâmico",  desc: "Mobilidade pós-treino",                sets: 1, reps: "10 min", weight: "—" },
    ],
  },
  {
    name: "Lower Power", day: "DIA 3/5",
    exercises: [
      { id: 1, name: "Agachamento Livre",     desc: "Profundidade total, core ativado",      sets: 5, reps: 5,  weight: "120 KG" },
      { id: 2, name: "Leg Press 45°",         desc: "Amplitude completa",                   sets: 4, reps: 10, weight: "200 KG" },
      { id: 3, name: "Stiff-Legged Deadlift", desc: "Isquiotibiais em tensão máxima",       sets: 3, reps: 10, weight: "80 KG"  },
      { id: 4, name: "Panturrilha em Pé",     desc: "3s negativa",                          sets: 4, reps: 15, weight: "60 KG"  },
    ],
  },
  {
    name: "Pull Day", day: "DIA 2/6",
    exercises: [
      { id: 1, name: "Barra Fixa Pronada",    desc: "Amplitude total, sem balanço",         sets: 4, reps: 8,  weight: "PC+10" },
      { id: 2, name: "Remada Unilateral",     desc: "Cotovelo próximo ao corpo",            sets: 4, reps: 10, weight: "40 KG" },
      { id: 3, name: "Rosca Direta c/ Barra", desc: "Sem momentum",                        sets: 3, reps: 12, weight: "35 KG" },
    ],
  },
  {
    name: "Mobilidade & Recuperação", day: "DIA 5/5",
    exercises: [
      { id: 1, name: "Foam Rolling",          desc: "Grupos musculares da semana",          sets: 1, reps: "10 min", weight: "—"     },
      { id: 2, name: "Hip Flexor Stretch",    desc: "90s cada lado",                        sets: 3, reps: "90s",    weight: "—"     },
      { id: 3, name: "Turkish Get-up",        desc: "Mobilidade integrada",                 sets: 3, reps: 5,        weight: "16 KG" },
    ],
  },
  {
    name: "Upper Strength", day: "DIA 4/6",
    exercises: [
      { id: 1, name: "Supino Reto c/ Barra",  desc: "Pausa de 1s no peito",                sets: 5, reps: 5,  weight: "100 KG" },
      { id: 2, name: "Desenvolvimento Militar",desc: "Strict press",                        sets: 4, reps: 6,  weight: "60 KG"  },
      { id: 3, name: "Dip Paralelas",         desc: "Peso corporal + carga extra",          sets: 3, reps: 10, weight: "PC+20"  },
    ],
  },
  {
    name: "Descanso Ativo", day: "DOM",
    exercises: [
      { id: 1, name: "Caminhada leve",            desc: "30–45 min em ritmo confortável",   sets: 1, reps: "40 min", weight: "—" },
      { id: 2, name: "Respiração diafragmática",  desc: "Ativação parassimpática",          sets: 1, reps: "10 min", weight: "—" },
    ],
  },
];

let nextExId = 100;

type Props = { dayIndex: number; onComplete?: () => void; autoStart?: boolean };

export default function SessionCard({ dayIndex, onComplete, autoStart = false }: Props) {
  const base = SESSIONS[dayIndex] ?? SESSIONS[0];

  const [exercises, setExercises]   = useState<Exercise[]>(base.exercises);
  const [prevDay, setPrevDay]       = useState(dayIndex);
  const [confirmId, setConfirmId]   = useState<number | null>(null);
  const [adding, setAdding]         = useState(false);
  const [started, setStarted]       = useState(autoStart);
  const [doneIds, setDoneIds]       = useState<Set<number>>(new Set());
  const [form, setForm]             = useState({ name: "", desc: "", sets: "", reps: "", weight: "" });

  if (dayIndex !== prevDay) {
    setPrevDay(dayIndex);
    setExercises(SESSIONS[dayIndex]?.exercises ?? SESSIONS[0].exercises);
    setStarted(false);
    setDoneIds(new Set());
    setConfirmId(null);
    setAdding(false);
  }

  const toggleDone = (id: number) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const add = () => {
    if (!form.name.trim()) return;
    setExercises((p) => [...p, {
      id: nextExId++, name: form.name, desc: form.desc,
      sets: parseInt(form.sets) || 3, reps: form.reps || 10, weight: form.weight || "—",
    }]);
    setForm({ name: "", desc: "", sets: "", reps: "", weight: "" });
    setAdding(false);
  };

  const remove = (id: number) => {
    setExercises((p) => p.filter((e) => e.id !== id));
    setDoneIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
    setConfirmId(null);
  };

  const handleStart = () => {
    if (started) {
      if (allDone) onComplete?.();
      setStarted(false);
      setDoneIds(new Set());
    } else {
      setStarted(true);
      setAdding(false);
    }
  };

  const completed = doneIds.size;
  const total     = exercises.length;
  const allDone   = completed === total && total > 0;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-orange" />
          <div>
            <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">Sessão</p>
            <p className="font-bayon text-xl text-white uppercase leading-tight">{base.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {started && (
            <span className="font-inter text-[10px] uppercase tracking-widest text-brand-orange border border-brand-orange/30 rounded-sm px-2 py-1">
              {completed}/{total} concluídos
            </span>
          )}
          {!started && (
            <span className="font-inter text-[10px] uppercase tracking-widest text-white/30 border border-white/10 rounded-sm px-2 py-1">
              {base.day}
            </span>
          )}
          {!started && (
            <button
              onClick={() => setAdding((v) => !v)}
              className="font-inter text-[10px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3" />
              Exercício
            </button>
          )}
        </div>
      </div>

      {/* Add form */}
      {adding && !started && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <input autoFocus placeholder="Nome do exercício" value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1" />
            <input placeholder="Descrição / dica" value={form.desc}
              onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1" />
          </div>
          <div className="grid grid-cols-4 gap-2 items-end">
            <input placeholder="Séries" value={form.sets}
              onChange={(e) => setForm((f) => ({ ...f, sets: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1" />
            <input placeholder="Reps / tempo" value={form.reps}
              onChange={(e) => setForm((f) => ({ ...f, reps: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1" />
            <input placeholder="Peso / carga" value={form.weight}
              onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") add(); }}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1" />
            <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-orange hover:text-white transition-colors pb-1">Add</button>
          </div>
        </div>
      )}

      {/* Progress bar (shown during session) */}
      {started && total > 0 && (
        <div className="mb-4">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", allDone ? "bg-green-400" : "bg-brand-orange")}
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Exercise list */}
      <div className="flex flex-col gap-3 flex-1">
        {exercises.map((ex, i) => {
          const done = doneIds.has(ex.id);
          return (
            <div
              key={ex.id}
              onClick={started ? () => toggleDone(ex.id) : undefined}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl border transition-all group",
                started && "cursor-pointer select-none",
                done
                  ? "border-green-500/30 bg-green-500/[0.06]"
                  : started
                    ? "border-brand-orange/20 bg-brand-orange/[0.04] hover:bg-brand-orange/[0.08]"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
              )}
            >
              {/* Number / check */}
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all",
                done
                  ? "bg-green-500/20 border border-green-500/40"
                  : started
                    ? "bg-brand-orange/15 border border-brand-orange/30"
                    : "bg-brand-orange/15 border border-brand-orange/25"
              )}>
                {started ? (
                  done
                    ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                    : <Circle className="w-4 h-4 text-brand-orange/50" />
                ) : (
                  <span className="font-inter text-[10px] font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={cn("font-inter text-sm font-medium transition-colors", done ? "text-white/40 line-through" : "text-white/90")}>
                  {ex.name}
                </p>
                <p className="font-inter text-[10px] text-white/35 mt-0.5">{ex.desc}</p>
              </div>

              {/* Sets / weight */}
              <div className="text-right shrink-0">
                <p className={cn("font-bayon text-base leading-none transition-colors", done ? "text-white/25" : "text-white")}>
                  {ex.sets} <span className="text-white/40 text-sm">×</span> {ex.reps}
                </p>
                <p className="font-inter text-[10px] text-white/35 uppercase tracking-widest mt-0.5">{ex.weight}</p>
              </div>

              {/* Remove (only when not in session) */}
              {!started && (
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {confirmId === ex.id ? (
                    <span className="flex flex-col items-end gap-1">
                      <button onClick={() => remove(ex.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                      <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmId(ex.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={handleStart}
        className={cn(
          "mt-5 w-full h-12 rounded-xl font-inter text-[11px] uppercase tracking-[0.2em] font-medium transition-all",
          allDone
            ? "bg-green-500 hover:brightness-110 text-white active:scale-[0.99]"
            : started
              ? "bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30"
              : "bg-brand-orange hover:brightness-110 text-white active:scale-[0.99]"
        )}
      >
        {allDone
          ? `✓ Treino Concluído · ${completed}/${total} exercícios`
          : started
            ? `Em andamento · ${completed}/${total} · Toque para encerrar`
            : "Iniciar Protocolo de Treino"}
      </button>
    </div>
  );
}
