"use client";

import { Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";

const ROWS = [
  {
    desc: "Rendimento Dividendos",
    tipo: "GANHO",
    tipoColor: "text-green-400 bg-green-400/10 border-green-400/20",
    cat: "Investimentos",
    date: "Hoje, 10:45",
    val: "+R$ 840,00",
    valColor: "text-green-400",
    income: true,
  },
  {
    desc: "Assinatura Software SaaS",
    tipo: "GASTO",
    tipoColor: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
    cat: "Operacional",
    date: "Hoje, 09:12",
    val: "-R$ 159,90",
    valColor: "text-brand-orange",
    income: false,
  },
  {
    desc: "Consultoria Estratégica",
    tipo: "GANHO",
    tipoColor: "text-green-400 bg-green-400/10 border-green-400/20",
    cat: "Serviços",
    date: "Ontem, 16:30",
    val: "+R$ 4.500,00",
    valColor: "text-green-400",
    income: true,
  },
  {
    desc: "Manutenção Escritório",
    tipo: "GASTO",
    tipoColor: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
    cat: "Infraestrutura",
    date: "Ontem, 14:15",
    val: "-R$ 890,00",
    valColor: "text-brand-orange",
    income: false,
  },
];

export default function DailyCashflow() {
  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
          Entradas e Saídas Diárias
        </p>
        <button
          onClick={() => {}}
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
            +R$ 5.340,00
          </span>
        </p>
        <p className="font-inter text-[10px] text-white/40 uppercase tracking-widest">
          Total Gastos:
          <span className="font-inter text-sm text-brand-orange font-medium ml-1 normal-case tracking-normal">
            -R$ 1.049,90
          </span>
        </p>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 pb-2 border-b border-white/5">
        {["Descrição", "Tipo", "Categoria", "Data", "Valor"].map((h) => (
          <p key={h} className="font-inter text-[9px] text-white/30 uppercase tracking-widest">
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      {ROWS.map((row) => (
        <div key={row.desc} className="grid grid-cols-5 py-3 border-b border-white/5 items-center">
          <div className="flex items-center gap-2">
            {row.income
              ? <ArrowUpRight className="w-3 h-3 text-green-400 shrink-0" />
              : <ArrowDownRight className="w-3 h-3 text-brand-orange shrink-0" />
            }
            <span className="font-inter text-sm text-white/80 truncate">{row.desc}</span>
          </div>
          <div>
            <span className={`font-inter text-[9px] uppercase tracking-wider border rounded-sm px-2 py-0.5 ${row.tipoColor}`}>
              {row.tipo}
            </span>
          </div>
          <p className="font-inter text-xs text-white/40">{row.cat}</p>
          <p className="font-inter text-xs text-white/30">{row.date}</p>
          <p className={`font-inter text-sm font-medium text-right ${row.valColor}`}>{row.val}</p>
        </div>
      ))}
    </div>
  );
}
