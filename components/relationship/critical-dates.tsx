"use client";

import { useState } from "react";
import { Calendar, Plus, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type EventType = "ANIVERSÁRIO" | "COMPROMISSO" | "CELEBRAÇÃO" | "LEMBRETE";

const TYPE_STYLES: Record<EventType, string> = {
  "ANIVERSÁRIO":  "text-brand-orange border-brand-orange/40 bg-brand-orange/10",
  "COMPROMISSO":  "text-brand-sky border-brand-sky/40 bg-brand-sky/10",
  "CELEBRAÇÃO":   "text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10",
  "LEMBRETE":     "text-white/40 border-white/15 bg-white/5",
};

const MONTH_INDEX: Record<string, number> = {
  JAN: 0, FEV: 1, MAR: 2, ABR: 3, MAI: 4, JUN: 5,
  JUL: 6, AGO: 7, SET: 8, OUT: 9, NOV: 10, DEZ: 11,
};

function daysUntil(day: number, month: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthIdx = MONTH_INDEX[month] ?? 0;
  let target = new Date(today.getFullYear(), monthIdx, day);
  if (target < today) target.setFullYear(today.getFullYear() + 1);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

type CriticalEvent = {
  id: number;
  day: number;
  month: string;
  title: string;
  desc: string;
  type: EventType;
};

const DEFAULT_EVENTS: CriticalEvent[] = [
  { id: 1, day: 12, month: "SET", title: "Aniversário de Casamento", desc: "Reservar jantar",           type: "CELEBRAÇÃO"  },
  { id: 2, day: 15, month: "SET", title: "Reunião de Board: Q3",     desc: "Review de alianças",        type: "COMPROMISSO" },
  { id: 3, day: 22, month: "SET", title: "Nascimento: Sobrinho",     desc: "Enviar presente",           type: "ANIVERSÁRIO" },
];

let nextId = 10;
const MONTHS = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
const TYPES: EventType[] = ["ANIVERSÁRIO","COMPROMISSO","CELEBRAÇÃO","LEMBRETE"];

export default function CriticalDates() {
  const [events, setEvents]       = useState<CriticalEvent[]>(DEFAULT_EVENTS);
  const [adding, setAdding]       = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [form, setForm]           = useState({ day: "", month: "SET", title: "", desc: "", type: "LEMBRETE" as EventType });

  const add = () => {
    if (!form.title.trim() || !form.day) return;
    setEvents((p) => [...p, { id: nextId++, day: parseInt(form.day), month: form.month, title: form.title, desc: form.desc, type: form.type }]);
    setForm({ day: "", month: "SET", title: "", desc: "", type: "LEMBRETE" });
    setAdding(false);
  };

  const remove = (id: number) => {
    setEvents((p) => p.filter((e) => e.id !== id));
    setConfirmId(null);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-brand-orange" />
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Datas Críticas
          </p>
        </div>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          Evento
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-5 pb-5 border-b border-white/5 flex flex-col gap-2">
          <input
            autoFocus
            placeholder="Título do evento"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <input
            placeholder="Descrição / ação"
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/50 placeholder:text-white/20 pb-1"
          />
          <div className="grid grid-cols-4 gap-2 items-end">
            <input
              placeholder="Dia"
              value={form.day}
              type="number"
              min={1} max={31}
              onChange={(e) => setForm((f) => ({ ...f, day: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
            />
            <select
              value={form.month}
              onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 pb-1"
            >
              {MONTHS.map((m) => <option key={m} value={m} className="bg-brand-dark">{m}</option>)}
            </select>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as EventType }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 pb-1"
            >
              {TYPES.map((t) => <option key={t} value={t} className="bg-brand-dark">{t}</option>)}
            </select>
            <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-orange hover:text-white transition-colors pb-1">
              Add
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      <div className="flex flex-col gap-3">
        {events.map((ev) => {
          const days   = daysUntil(ev.day, ev.month);
          const urgent = days <= 7;
          return (
            <div key={ev.id} className="flex items-center gap-4 group">
              {/* Date block */}
              <div className="w-10 shrink-0 text-center">
                <p className={cn("font-bayon text-2xl leading-none", urgent ? "text-brand-orange" : "text-white/80")}>
                  {ev.day}
                </p>
                <p className="font-inter text-[8px] uppercase tracking-widest text-white/30 mt-0.5">{ev.month}</p>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-inter text-sm text-white/90 font-medium truncate">{ev.title}</p>
                  <span className={cn("font-inter text-[8px] uppercase tracking-widest border rounded-sm px-1.5 py-0.5 shrink-0", TYPE_STYLES[ev.type])}>
                    {ev.type}
                  </span>
                </div>
                <p className="font-inter text-[10px] mt-0.5 text-white/35">
                  <span className={urgent ? "text-brand-orange" : ""}>
                    Faltam {days} {days === 1 ? "dia" : "dias"}
                  </span>
                  {ev.desc && (
                    <> <span className="opacity-40">·</span> {ev.desc}</>
                  )}
                </p>
              </div>

              {/* Arrow / remove */}
              <div className="shrink-0 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {confirmId === ev.id ? (
                  <span className="flex gap-2">
                    <button onClick={() => remove(ev.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                    <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                  </span>
                ) : (
                  <button onClick={() => setConfirmId(ev.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/25 transition-colors" />
              </div>
            </div>
          );
        })}

        {events.length === 0 && (
          <p className="font-inter text-[10px] text-white/20 uppercase tracking-widest">
            Nenhuma data crítica registrada
          </p>
        )}
      </div>
    </div>
  );
}
