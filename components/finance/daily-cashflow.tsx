"use client";

import { useState } from "react";
import { Plus, ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  id: number;
  desc: string;
  tipo: "GANHO" | "GASTO";
  cat: string;
  date: string;
  val: string;
};

const INITIAL_ROWS: Row[] = [
  { id: 1, desc: "Rendimento Dividendos",   tipo: "GANHO", cat: "Investimentos", date: "Abr 28",  val: "840,00"    },
  { id: 2, desc: "Assinatura Software SaaS", tipo: "GASTO", cat: "Operacional",   date: "Abr 22",  val: "159,90"    },
  { id: 3, desc: "Consultoria Estratégica",  tipo: "GANHO", cat: "Serviços",      date: "Abr 15",  val: "4.500,00"  },
  { id: 4, desc: "Manutenção Escritório",    tipo: "GASTO", cat: "Infraestrutura",date: "Abr 10",  val: "890,00"    },
];

const TIPO_STYLES = {
  GANHO: "text-green-400 bg-green-400/10 border-green-400/20",
  GASTO: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
};

let nextId = INITIAL_ROWS.length + 1;

const now = () => {
  const d = new Date();
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
};

export default function DailyCashflow() {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ desc: "", tipo: "GANHO" as "GANHO" | "GASTO", cat: "", val: "" });

  const remove = (id: number) => { setRows((p) => p.filter((r) => r.id !== id)); setConfirmId(null); };

  const addRow = () => {
    if (!form.desc.trim() || !form.val.trim()) return;
    setRows((p) => [...p, { id: nextId++, desc: form.desc, tipo: form.tipo, cat: form.cat || "—", date: now(), val: form.val }]);
    setForm({ desc: "", tipo: "GANHO", cat: "", val: "" });
    setAdding(false);
  };

  const ganhos = rows.filter((r) => r.tipo === "GANHO").reduce((acc, r) => acc + parseFloat(r.val.replace(/\./g, "").replace(",", ".")), 0);
  const gastos = rows.filter((r) => r.tipo === "GASTO").reduce((acc, r) => acc + parseFloat(r.val.replace(/\./g, "").replace(",", ".")), 0);

  const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Entradas e Saídas Mensais
        </p>
        <button
          onClick={() => setAdding((v) => !v)}
          className="font-inter text-[10px] uppercase tracking-widest text-brand-blue hover:text-white transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          Adicionar Transação
        </button>
      </div>

      {/* Summary */}
      <div className="mt-2 mb-5 flex gap-6">
        <p className="font-inter text-[10px] text-white/40 uppercase tracking-widest">
          Total Ganhos:
          <span className="font-inter text-sm text-green-400 font-medium ml-1 normal-case tracking-normal">
            +R$ {fmt(ganhos)}
          </span>
        </p>
        <p className="font-inter text-[10px] text-white/40 uppercase tracking-widest">
          Total Gastos:
          <span className="font-inter text-sm text-brand-orange font-medium ml-1 normal-case tracking-normal">
            -R$ {fmt(gastos)}
          </span>
        </p>
      </div>

      {/* Add form */}
      {adding && (
        <div className="grid grid-cols-5 gap-2 mb-4 pb-4 border-b border-white/5">
          <input
            autoFocus
            placeholder="Descrição"
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Enter") addRow(); if (e.key === "Escape") setAdding(false); }}
            className="col-span-2 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1"
          />
          <select
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value as "GANHO" | "GASTO" }))}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-[10px] uppercase tracking-wider text-white/60 pb-1 [color-scheme:dark]"
          >
            <option value="GANHO">Ganho</option>
            <option value="GASTO">Gasto</option>
          </select>
          <input
            placeholder="Categoria"
            value={form.cat}
            onChange={(e) => setForm((f) => ({ ...f, cat: e.target.value }))}
            className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1"
          />
          <div className="flex items-end gap-2">
            <input
              placeholder="0,00"
              value={form.val}
              onChange={(e) => setForm((f) => ({ ...f, val: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") addRow(); }}
              className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-sm text-white/80 placeholder:text-white/20 pb-1 w-0"
            />
            <button onClick={addRow} className="text-[10px] font-inter uppercase tracking-widest text-brand-blue hover:text-white transition-colors shrink-0 pb-1">Add</button>
          </div>
        </div>
      )}

      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_1fr_1fr_auto_auto] gap-x-4 pb-2 border-b border-white/5">
        {["Descrição", "Tipo", "Categoria", "Data", "Valor", ""].map((h, i) => (
          <p key={i} className="font-inter text-[9px] text-white/30 uppercase tracking-widest">{h}</p>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row) => (
        <div key={row.id} className="grid grid-cols-[1fr_auto_1fr_1fr_auto_auto] gap-x-4 py-3 border-b border-white/5 items-center">
          <div className="flex items-center gap-2 min-w-0">
            {row.tipo === "GANHO"
              ? <ArrowUpRight className="w-3 h-3 text-green-400 shrink-0" />
              : <ArrowDownRight className="w-3 h-3 text-brand-orange shrink-0" />
            }
            <span className="font-inter text-sm text-white/80 truncate">{row.desc}</span>
          </div>
          <span className={cn("font-inter text-[9px] uppercase tracking-wider border rounded-sm px-2 py-0.5 shrink-0", TIPO_STYLES[row.tipo])}>
            {row.tipo}
          </span>
          <p className="font-inter text-xs text-white/40 truncate">{row.cat}</p>
          <p className="font-inter text-xs text-white/30">{row.date}</p>
          <p className={cn("font-inter text-sm font-medium text-right shrink-0", row.tipo === "GANHO" ? "text-green-400" : "text-brand-orange")}>
            {row.tipo === "GANHO" ? "+" : "-"}R$ {row.val}
          </p>
          <div className="flex items-center justify-end shrink-0">
            {confirmId === row.id ? (
              <span className="flex items-center gap-1.5">
                <span className="text-[9px] font-inter text-white/40 uppercase tracking-wider">Confirmar?</span>
                <button onClick={() => remove(row.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
              </span>
            ) : (
              <button onClick={() => setConfirmId(row.id)} className="text-white/20 hover:text-red-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
