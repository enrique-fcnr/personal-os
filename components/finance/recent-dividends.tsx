"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Dividend = { id: number; ticker: string; name: string; type: string; date: string; value: string; currency: "R$" | "$"; color: string };

const COLORS = ["bg-brand-blue", "bg-brand-orange", "bg-brand-sky", "bg-[#FACC15]", "bg-green-500", "bg-purple-500"];
const TYPES  = ["Dividendo", "Rendimento", "JCP", "Cupom"];

const INITIAL: Dividend[] = [
  { id: 1, ticker: "AAPL",  name: "Apple Inc.",       type: "Dividendo",  date: "Abr 28", value: "142,50",  currency: "$",  color: "bg-brand-blue"   },
  { id: 2, ticker: "HGLG",  name: "HGLG11",           type: "Rendimento", date: "Abr 22", value: "840,00",  currency: "R$", color: "bg-brand-orange" },
  { id: 3, ticker: "VTI",   name: "Vanguard Total",   type: "Dividendo",  date: "Abr 15", value: "310,22",  currency: "$",  color: "bg-brand-sky"    },
];

let nextId  = INITIAL.length + 1;
let nextClr = INITIAL.length % COLORS.length;

const nowDate = () => {
  const d = new Date();
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
};

export default function RecentDividends() {
  const [items, setItems]     = useState<Dividend[]>(INITIAL);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [adding, setAdding]   = useState(false);
  const [form, setForm]       = useState({ ticker: "", name: "", type: "Dividendo", value: "", currency: "R$" as "R$" | "$" });

  const add = () => {
    if (!form.ticker.trim() || !form.value.trim()) return;
    const color = COLORS[nextClr % COLORS.length];
    nextClr++;
    setItems((p) => [...p, {
      id: nextId++,
      ticker: form.ticker.toUpperCase().slice(0, 6),
      name: form.name || form.ticker.toUpperCase(),
      type: form.type,
      date: nowDate(),
      value: form.value,
      currency: form.currency,
      color,
    }]);
    setForm({ ticker: "", name: "", type: "Dividendo", value: "", currency: "R$" });
    setAdding(false);
  };

  const remove = (id: number) => { setItems((p) => p.filter((x) => x.id !== id)); setConfirmId(null); };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Proventos Recentes
        </p>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-blue hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-4 pb-4 border-b border-white/5 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              autoFocus
              placeholder="Ticker (ex: PETR4)"
              value={form.ticker}
              onChange={(e) => setForm((f) => ({ ...f, ticker: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 placeholder:text-white/20 pb-1 uppercase"
            />
            <input
              placeholder="Nome do ativo"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 placeholder:text-white/20 pb-1"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-end">
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-[10px] uppercase tracking-wider text-white/60 pb-1 [color-scheme:dark]"
            >
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as "R$" | "$" }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-[10px] text-white/60 pb-1 [color-scheme:dark]"
            >
              <option value="R$">R$</option>
              <option value="$">US$</option>
            </select>
            <div className="flex items-end gap-2">
              <input
                placeholder="0,00"
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") add(); if (e.key === "Escape") setAdding(false); }}
                className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 placeholder:text-white/20 pb-1 w-0"
              />
              <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-blue hover:text-white transition-colors shrink-0 pb-1">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 group">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-inter text-[9px] font-bold shrink-0", item.color)}>
              {item.ticker}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter text-sm text-white/80">{item.name}</p>
              <p className="font-inter text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
                {item.type} • {item.date}
              </p>
            </div>
            <p className="font-inter text-sm text-green-400 font-medium shrink-0">
              +{item.currency} {item.value}
            </p>
            <div className="shrink-0">
              {confirmId === item.id ? (
                <span className="flex items-center gap-1.5">
                  <span className="text-[9px] font-inter text-white/40 uppercase tracking-wider">Confirmar?</span>
                  <button onClick={() => remove(item.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                  <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                </span>
              ) : (
                <button onClick={() => setConfirmId(item.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
