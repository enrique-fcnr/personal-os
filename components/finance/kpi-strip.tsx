"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Pencil, Check } from "lucide-react";

const fmt  = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 0 });
const parse = (s: string) => parseFloat(s.replace(/\./g, "").replace(",", ".")) || 0;

function SalaryCard() {
  const [current, setCurrent]   = useState(12_500);
  const [previous, setPrevious] = useState(11_100);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(fmt(current));

  const diff    = current - previous;
  const pct     = previous > 0 ? ((diff / previous) * 100).toFixed(1) : "0.0";
  const up      = diff >= 0;

  const commit = () => {
    const val = parse(draft);
    if (val > 0) { setPrevious(current); setCurrent(val); }
    else setDraft(fmt(current));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
        Salário Atual
      </p>

      {editing ? (
        <div className="flex items-center gap-2">
          <span className="font-inter text-sm text-white/40">R$</span>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(fmt(current)); setEditing(false); } }}
            className="flex-1 bg-transparent border-b border-white/30 focus:border-white/60 outline-none font-bayon text-3xl text-white leading-none w-0"
          />
          <button onMouseDown={(e) => { e.preventDefault(); commit(); }} className="text-white/40 hover:text-white transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDraft(fmt(current)); setEditing(true); }}
          className="group flex items-center gap-2 text-left"
        >
          <p className="font-bayon text-3xl text-white leading-none">R$ {fmt(current)}</p>
          <Pencil className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-opacity" />
        </button>
      )}

      <div className={`flex items-center gap-1 mt-2 font-inter text-xs ${up ? "text-green-400" : "text-brand-orange"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {up ? "+" : ""}{pct}% vs mês anterior
      </div>
      <p className="font-inter text-[9px] text-white/25 mt-1 uppercase tracking-widest">
        Anterior: R$ {fmt(previous)}
      </p>
    </div>
  );
}

function FreelanceCard() {
  const [current, setCurrent]   = useState(4_800);
  const [previous, setPrevious] = useState(3_200);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(fmt(current));

  const diff    = current - previous;
  const pct     = previous > 0 ? ((diff / previous) * 100).toFixed(1) : "0.0";
  const up      = diff >= 0;

  const commit = () => {
    const val = parse(draft);
    if (val > 0) { setPrevious(current); setCurrent(val); }
    else setDraft(fmt(current));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
        Freelances
      </p>

      {editing ? (
        <div className="flex items-center gap-2">
          <span className="font-inter text-sm text-white/40">R$</span>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(fmt(current)); setEditing(false); } }}
            className="flex-1 bg-transparent border-b border-white/30 focus:border-white/60 outline-none font-bayon text-3xl text-white leading-none w-0"
          />
          <button onMouseDown={(e) => { e.preventDefault(); commit(); }} className="text-white/40 hover:text-white transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDraft(fmt(current)); setEditing(true); }}
          className="group flex items-center gap-2 text-left"
        >
          <p className="font-bayon text-3xl text-white leading-none">R$ {fmt(current)}</p>
          <Pencil className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-opacity" />
        </button>
      )}

      <div className={`flex items-center gap-1 mt-2 font-inter text-xs ${up ? "text-green-400" : "text-brand-orange"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {up ? "+" : ""}{pct}% vs mês anterior
      </div>
      <p className="font-inter text-[9px] text-white/25 mt-1 uppercase tracking-widest">
        Anterior: R$ {fmt(previous)}
      </p>
    </div>
  );
}

function GoalsHitCard() {
  const [current, setCurrent]   = useState(18_400);
  const [previous, setPrevious] = useState(12_000);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(fmt(current));

  const diff    = current - previous;
  const pct     = previous > 0 ? ((diff / previous) * 100).toFixed(1) : "0.0";
  const up      = diff >= 0;

  const commit = () => {
    const val = parse(draft);
    if (val > 0) { setPrevious(current); setCurrent(val); }
    else setDraft(fmt(current));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
        Metas Atingidas
      </p>

      {editing ? (
        <div className="flex items-center gap-2">
          <span className="font-inter text-sm text-white/40">R$</span>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(fmt(current)); setEditing(false); } }}
            className="flex-1 bg-transparent border-b border-white/30 focus:border-white/60 outline-none font-bayon text-3xl text-white leading-none w-0"
          />
          <button onMouseDown={(e) => { e.preventDefault(); commit(); }} className="text-white/40 hover:text-white transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDraft(fmt(current)); setEditing(true); }}
          className="group flex items-center gap-2 text-left"
        >
          <p className="font-bayon text-3xl text-white leading-none">R$ {fmt(current)}</p>
          <Pencil className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-opacity" />
        </button>
      )}

      <div className={`flex items-center gap-1 mt-2 font-inter text-xs ${up ? "text-green-400" : "text-brand-orange"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {up ? "+" : ""}{pct}% vs mês anterior
      </div>
      <p className="font-inter text-[9px] text-white/25 mt-1 uppercase tracking-widest">
        Anterior: R$ {fmt(previous)}
      </p>
    </div>
  );
}

function InvestedCard() {
  const [current, setCurrent]   = useState(3_200);
  const [previous, setPrevious] = useState(2_750);
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(fmt(current));

  const diff    = current - previous;
  const pct     = previous > 0 ? ((diff / previous) * 100).toFixed(1) : "0.0";
  const up      = diff >= 0;

  const commit = () => {
    const val = parse(draft);
    if (val > 0) { setPrevious(current); setCurrent(val); }
    else setDraft(fmt(current));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
        Investido no Mês
      </p>

      {editing ? (
        <div className="flex items-center gap-2">
          <span className="font-inter text-sm text-white/40">R$</span>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(fmt(current)); setEditing(false); } }}
            className="flex-1 bg-transparent border-b border-white/30 focus:border-white/60 outline-none font-bayon text-3xl text-white leading-none w-0"
          />
          <button onMouseDown={(e) => { e.preventDefault(); commit(); }} className="text-white/40 hover:text-white transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDraft(fmt(current)); setEditing(true); }}
          className="group flex items-center gap-2 text-left"
        >
          <p className="font-bayon text-3xl text-white leading-none">R$ {fmt(current)}</p>
          <Pencil className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-opacity" />
        </button>
      )}

      <div className={`flex items-center gap-1 mt-2 font-inter text-xs ${up ? "text-green-400" : "text-brand-orange"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {up ? "+" : ""}{pct}% vs mês anterior
      </div>
      <p className="font-inter text-[9px] text-white/25 mt-1 uppercase tracking-widest">
        Anterior: R$ {fmt(previous)}
      </p>
    </div>
  );
}

export default function KpiStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <SalaryCard />

      <FreelanceCard />

      <GoalsHitCard />

      <InvestedCard />
    </div>
  );
}
