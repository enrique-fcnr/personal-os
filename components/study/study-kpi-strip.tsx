"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Pencil, Check } from "lucide-react";

const fmt  = (n: number, unit?: string) => `${n.toLocaleString("pt-BR")}${unit ? unit : ""}`;
const parse = (s: string) => parseInt(s.replace(/\D/g, ""), 10) || 0;

type KpiCardProps = {
  label: string;
  unit?: string;
  initCurrent: number;
  initPrevious: number;
  suffix?: string;
};

function KpiCard({ label, unit, initCurrent, initPrevious, suffix = "" }: KpiCardProps) {
  const [current, setCurrent]   = useState(initCurrent);
  const [previous, setPrevious] = useState(initPrevious);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(String(initCurrent));

  const diff = current - previous;
  const pct  = previous > 0 ? ((diff / previous) * 100).toFixed(1) : "0.0";
  const up   = diff >= 0;

  const commit = () => {
    const val = parse(draft);
    if (val > 0) { setPrevious(current); setCurrent(val); }
    else setDraft(String(current));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
        {label}
      </p>

      {editing ? (
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") { setDraft(String(current)); setEditing(false); }
            }}
            className="flex-1 bg-transparent border-b border-white/30 focus:border-white/60 outline-none font-bayon text-3xl text-white leading-none w-0"
          />
          <button onMouseDown={(e) => { e.preventDefault(); commit(); }} className="text-white/40 hover:text-white transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDraft(String(current)); setEditing(true); }}
          className="group flex items-center gap-2 text-left"
        >
          <p className="font-bayon text-3xl text-white leading-none">
            {fmt(current)}{unit ?? ""}{suffix}
          </p>
          <Pencil className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-opacity" />
        </button>
      )}

      <div className={`flex items-center gap-1 mt-2 font-inter text-xs ${up ? "text-green-400" : "text-brand-orange"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {up ? "+" : ""}{pct}% vs mês anterior
      </div>
      <p className="font-inter text-[9px] text-white/25 mt-1 uppercase tracking-widest">
        Anterior: {fmt(previous)}{unit ?? ""}{suffix}
      </p>
    </div>
  );
}

export default function StudyKpiStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <KpiCard label="Horas Estudadas"  initCurrent={48}  initPrevious={32}  suffix="h" />
      <KpiCard label="Cursos Ativos"    initCurrent={3}   initPrevious={2}   />
      <KpiCard label="Livros Lidos"     initCurrent={7}   initPrevious={5}   />
      <KpiCard label="Dias de Streak"   initCurrent={14}  initPrevious={9}   suffix=" dias" />
    </div>
  );
}
