"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Area = { label: string; mastery: number; color: string; note: string };

const INITIAL: Area[] = [
  { label: "IA & Machine Learning",     mastery: 74, color: "bg-brand-sky",    note: "LLMs, RAG, Fine-tuning" },
  { label: "Finanças Quantitativas",    mastery: 58, color: "bg-[#FACC15]",   note: "Derivativos, Risk Mgmt" },
  { label: "Sistemas Distribuídos",     mastery: 65, color: "bg-brand-blue",  note: "Kafka, CQRS, Event Sourcing" },
  { label: "Produto & Estratégia",      mastery: 82, color: "bg-green-400",   note: "OKRs, Discovery, GTM" },
  { label: "Engenharia de Software",    mastery: 88, color: "bg-brand-orange",note: "Clean Arch, DDD, TDD" },
  { label: "Neurociência & Psicologia", mastery: 40, color: "bg-purple-400",  note: "Aprendizado, Comportamento" },
];

function masteryLabel(m: number) {
  if (m >= 80) return "Avançado";
  if (m >= 55) return "Intermediário";
  if (m >= 30) return "Básico";
  return "Iniciante";
}

function masteryColor(m: number) {
  if (m >= 80) return "text-green-400";
  if (m >= 55) return "text-brand-sky";
  if (m >= 30) return "text-[#FACC15]";
  return "text-brand-orange";
}

export default function KnowledgeMap() {
  const [areas, setAreas] = useState<Area[]>(INITIAL);
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts]   = useState<string[]>(INITIAL.map((a) => String(a.mastery)));

  const apply = () => {
    setAreas((prev) =>
      prev.map((a, i) => {
        const v = Math.min(100, Math.max(0, parseInt(drafts[i]) || 0));
        return { ...a, mastery: v };
      })
    );
    setEditing(false);
  };

  const cancel = () => {
    setDrafts(areas.map((a) => String(a.mastery)));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-5">
        Mapa de Conhecimento
      </p>

      <div className="flex flex-col gap-4 flex-1">
        {areas.map((area, i) => (
          <div key={area.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="min-w-0 flex-1">
                <span className="font-inter text-xs text-white/70">{area.label}</span>
                <p className="font-inter text-[9px] text-white/25 mt-0.5">{area.note}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                {editing ? (
                  <div className="flex items-center gap-1">
                    <input
                      value={drafts[i]}
                      onChange={(e) => setDrafts((d) => d.map((v, j) => j === i ? e.target.value : v))}
                      onKeyDown={(e) => { if (e.key === "Enter") apply(); if (e.key === "Escape") cancel(); }}
                      className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 text-right w-12"
                    />
                    <span className="font-inter text-[9px] text-white/30">%</span>
                  </div>
                ) : (
                  <>
                    <span className={cn("font-inter text-[10px]", masteryColor(area.mastery))}>
                      {masteryLabel(area.mastery)}
                    </span>
                    <span className="font-inter text-[10px] text-white/30">{area.mastery}%</span>
                  </>
                )}
              </div>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-700", area.color)}
                style={{ width: `${area.mastery}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="flex gap-2 mt-5">
          <button onClick={apply} className="flex-1 bg-brand-sky/10 border border-brand-sky/30 text-brand-sky hover:bg-brand-sky/20 font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all">
            Aplicar
          </button>
          <button onClick={cancel} className="flex-1 glass-effect border border-white/10 text-white/40 hover:text-white font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all">
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDrafts(areas.map((a) => String(a.mastery))); setEditing(true); }}
          className="mt-5 w-full border border-brand-sky/30 text-brand-sky hover:bg-brand-sky/10 font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all"
        >
          Atualizar Domínio
        </button>
      )}
    </div>
  );
}
