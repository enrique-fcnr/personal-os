"use client";

import { useState } from "react";
import { Sparkles, Plus, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RoleCategory = "AVENTURA" | "CULTURA" | "GASTRONOMIA" | "VIAGEM" | "EXPERIÊNCIA";

const CAT_STYLES: Record<RoleCategory, string> = {
  AVENTURA:    "text-brand-orange border-brand-orange/40 bg-brand-orange/10",
  CULTURA:     "text-brand-sky border-brand-sky/40 bg-brand-sky/10",
  GASTRONOMIA: "text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10",
  VIAGEM:      "text-green-400 border-green-400/40 bg-green-400/10",
  EXPERIÊNCIA: "text-purple-400 border-purple-400/40 bg-purple-400/10",
};

type RoleIdea = {
  id: number;
  title: string;
  with: string;
  category: RoleCategory;
  priority: boolean;
  done: boolean;
};

const DEFAULT_IDEAS: RoleIdea[] = [
  { id: 1, title: "Jantar num restaurante omakase",     with: "Ana",              category: "GASTRONOMIA", priority: true,  done: false },
  { id: 2, title: "Trilha na Serra da Mantiqueira",     with: "Galera do camping", category: "AVENTURA",    priority: false, done: false },
  { id: 3, title: "Exposição de arte contemporânea",    with: "Ana",              category: "CULTURA",     priority: false, done: false },
  { id: 4, title: "Fim de semana em Arraial do Cabo",   with: "Família",          category: "VIAGEM",      priority: true,  done: false },
  { id: 5, title: "Aula de cozinha italiana",           with: "Ana",              category: "EXPERIÊNCIA", priority: false, done: true  },
];

let nextId = 10;

const CATEGORIES: RoleCategory[] = ["AVENTURA", "CULTURA", "GASTRONOMIA", "VIAGEM", "EXPERIÊNCIA"];

export default function RoleIdeas() {
  const [ideas, setIdeas]       = useState<RoleIdea[]>(DEFAULT_IDEAS);
  const [adding, setAdding]     = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [filter, setFilter]     = useState<"ALL" | "PENDENTE" | "FEITO">("ALL");
  const [form, setForm]         = useState({ title: "", with: "", category: "EXPERIÊNCIA" as RoleCategory, priority: false });

  const add = () => {
    if (!form.title.trim()) return;
    setIdeas((p) => [...p, { id: nextId++, title: form.title, with: form.with, category: form.category, priority: form.priority, done: false }]);
    setForm({ title: "", with: "", category: "EXPERIÊNCIA", priority: false });
    setAdding(false);
  };

  const toggleDone = (id: number) => {
    setIdeas((p) => p.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  };

  const togglePriority = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIdeas((p) => p.map((i) => i.id === id ? { ...i, priority: !i.priority } : i));
  };

  const remove = (id: number) => {
    setIdeas((p) => p.filter((i) => i.id !== id));
    setConfirmId(null);
  };

  const visible = ideas.filter((i) =>
    filter === "ALL" ? true : filter === "FEITO" ? i.done : !i.done
  );

  const pending = ideas.filter((i) => !i.done).length;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Ideias de Rolês
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-inter text-[9px] text-white/30 uppercase tracking-widest">
            {pending} na fila
          </span>
          <button
            onClick={() => setAdding((v) => !v)}
            className="font-inter text-[10px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3 h-3" />
            Ideia
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        {(["ALL", "PENDENTE", "FEITO"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "font-inter text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm transition-all",
              filter === f
                ? "bg-brand-orange/20 text-brand-orange border border-brand-orange/30"
                : "text-white/25 hover:text-white/50"
            )}
          >
            {f === "ALL" ? "Todos" : f === "PENDENTE" ? "Fila" : "Feito"}
          </button>
        ))}
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <input
            autoFocus
            placeholder="Ideia do rolê"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <div className="grid grid-cols-3 gap-2 items-end">
            <input
              placeholder="Com quem?"
              value={form.with}
              onChange={(e) => setForm((f) => ({ ...f, with: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
            />
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as RoleCategory }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 pb-1"
            >
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-brand-dark">{c}</option>)}
            </select>
            <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-orange hover:text-white transition-colors pb-1">
              Add
            </button>
          </div>
        </div>
      )}

      {/* Ideas list */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
        {visible.map((idea) => (
          <div
            key={idea.id}
            onClick={() => toggleDone(idea.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all group",
              idea.done
                ? "border-white/5 bg-white/[0.02] opacity-50"
                : idea.priority
                  ? "border-brand-orange/25 bg-brand-orange/[0.05] hover:bg-brand-orange/[0.08]"
                  : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
            )}
          >
            {/* Priority star */}
            <button
              onClick={(e) => togglePriority(idea.id, e)}
              className={cn("shrink-0 transition-colors", idea.priority ? "text-brand-orange" : "text-white/10 hover:text-white/30")}
            >
              <Star className="w-3.5 h-3.5" fill={idea.priority ? "currentColor" : "none"} />
            </button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={cn("font-inter text-sm transition-colors", idea.done ? "text-white/30 line-through" : "text-white/85")}>
                {idea.title}
              </p>
              {idea.with && (
                <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest mt-0.5">
                  Com {idea.with}
                </p>
              )}
            </div>

            {/* Category badge */}
            <span className={cn("font-inter text-[8px] uppercase tracking-widest border rounded-sm px-1.5 py-0.5 shrink-0", CAT_STYLES[idea.category])}>
              {idea.category}
            </span>

            {/* Remove */}
            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
              {confirmId === idea.id ? (
                <span className="flex flex-col items-end gap-1">
                  <button onClick={() => remove(idea.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                  <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                </span>
              ) : (
                <button onClick={() => setConfirmId(idea.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <p className="font-inter text-[10px] text-white/20 uppercase tracking-widest mt-1">
            Nenhuma ideia nessa categoria
          </p>
        )}
      </div>
    </div>
  );
}
