"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: number; label: string; tag: string };

const INITIAL: Item[] = [
  { id: 1, label: "Assistir aula 7 — LLMs e Contexto",      tag: "CURSO"   },
  { id: 2, label: "Ler capítulo 8 — Princípios de Design",  tag: "LEITURA" },
  { id: 3, label: "Resolver exercícios de teoria dos jogos", tag: "PRÁTICA" },
];

const TAGS = ["CURSO", "LEITURA", "PRÁTICA", "REVISÃO"] as const;

const TAG_COLORS: Record<string, string> = {
  CURSO:   "text-brand-sky border-brand-sky/30 bg-brand-sky/10",
  LEITURA: "text-[#FACC15] border-[#FACC15]/30 bg-[#FACC15]/10",
  PRÁTICA: "text-green-400 border-green-400/30 bg-green-400/10",
  REVISÃO: "text-brand-orange border-brand-orange/30 bg-brand-orange/10",
};

let nextId = INITIAL.length + 1;

export default function StudyTodo() {
  const [items, setItems]     = useState<Item[]>(INITIAL);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [adding, setAdding]   = useState(false);

  const cycleTag = (id: number) =>
    setItems((prev) => prev.map((x) =>
      x.id === id
        ? { ...x, tag: TAGS[(TAGS.indexOf(x.tag as typeof TAGS[number]) + 1) % TAGS.length] }
        : x
    ));

  const toggle = (id: number) =>
    setDoneIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const remove = (id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setDoneIds((prev) => prev.filter((x) => x !== id));
  };

  const addItem = () => {
    const label = inputValue.trim();
    if (!label) { setAdding(false); return; }
    setItems((prev) => [...prev, { id: nextId++, label, tag: "CURSO" }]);
    setInputValue("");
    setAdding(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Tarefas de Estudo
        </h3>
        <span className="text-[10px] font-inter text-white/30">
          {doneIds.length}/{items.length} concluídas
        </span>
      </div>

      <div className="space-y-4">
        {items.map(({ id, label, tag }) => {
          const done = doneIds.includes(id);
          return (
            <div key={id} className="flex items-center gap-4 group">
              <button
                onClick={() => toggle(id)}
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all",
                  done ? "bg-brand-sky border-brand-sky" : "border-white/20 hover:border-white/50"
                )}
              >
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <p className={cn("flex-1 text-sm font-medium font-inter transition-all", done ? "line-through text-white/30" : "text-white/90")}>
                {label}
              </p>

              <button
                onClick={() => cycleTag(id)}
                className={cn("text-[9px] font-inter uppercase tracking-wider border rounded-sm px-1.5 py-0.5 shrink-0 transition-all hover:opacity-70", TAG_COLORS[tag] ?? "text-white/50 border-white/10 bg-white/5")}
              >
                {tag}
              </button>

              <button
                onClick={() => remove(id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-white/20 hover:text-red-400 shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {adding ? (
        <div className="mt-4 flex items-center gap-2">
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
              if (e.key === "Escape") { setAdding(false); setInputValue(""); }
            }}
            placeholder="Nova tarefa..."
            className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none text-sm text-white/90 placeholder:text-white/20 pb-1 transition-colors font-inter"
          />
          <button onClick={addItem} className="text-brand-sky hover:text-white transition-colors text-[10px] font-inter uppercase tracking-widest shrink-0">Add</button>
          <button onClick={() => { setAdding(false); setInputValue(""); }} className="text-white/20 hover:text-white/60 transition-colors text-[10px] font-inter uppercase tracking-widest shrink-0">Esc</button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-4 w-full flex items-center gap-2 text-white/20 hover:text-white/60 transition-colors"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[10px] font-inter uppercase tracking-widest">Adicionar tarefa</span>
        </button>
      )}
    </div>
  );
}
