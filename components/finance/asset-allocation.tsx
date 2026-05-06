"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Asset = { label: string; color: string; value: number };

const INITIAL: Asset[] = [
  { label: "Ações (Brasil & EUA)", color: "bg-brand-blue",    value: 136_675 },
  { label: "Renda Fixa / Tesouro", color: "bg-brand-sky",     value: 62_125  },
  { label: "Real Estate (FIIs)",   color: "bg-brand-orange",  value: 29_820  },
  { label: "Criptoativos",         color: "bg-[#FACC15]",     value: 19_880  },
];

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const parse = (s: string) =>
  parseFloat(s.replace(/\./g, "").replace(",", ".")) || 0;

export default function AssetAllocation() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL);
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<string[]>(INITIAL.map((a) => fmt(a.value)));

  const total = assets.reduce((s, a) => s + a.value, 0);
  const pct = (v: number) => total === 0 ? 0 : Math.round((v / total) * 100);

  const apply = () => {
    setAssets((prev) =>
      prev.map((a, i) => ({ ...a, value: parse(drafts[i]) }))
    );
    setEditing(false);
  };

  const cancel = () => {
    setDrafts(assets.map((a) => fmt(a.value)));
    setEditing(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-5">
        Alocação de Ativos
      </p>

      <div className="flex flex-col gap-4">
        {assets.map((item, i) => {
          const p = pct(item.value);
          return (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-inter text-xs text-white/70">{item.label}</span>
                {editing ? (
                  <div className="flex items-center gap-1">
                    <span className="font-inter text-[10px] text-white/30">R$</span>
                    <input
                      value={drafts[i]}
                      onChange={(e) =>
                        setDrafts((d) => d.map((v, j) => j === i ? e.target.value : v))
                      }
                      onKeyDown={(e) => { if (e.key === "Enter") apply(); if (e.key === "Escape") cancel(); }}
                      className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 text-right w-24"
                    />
                  </div>
                ) : (
                  <span className="font-inter text-xs text-white/50">{p}%</span>
                )}
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", item.color)}
                  style={{ width: `${p}%` }}
                />
              </div>
              {editing && (
                <p className="font-inter text-[9px] text-white/25 mt-1 text-right">{p}% do total</p>
              )}
            </div>
          );
        })}
      </div>

      {editing ? (
        <div className="flex gap-2 mt-5">
          <button
            onClick={apply}
            className="flex-1 bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] hover:bg-[#FACC15]/20 font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all"
          >
            Aplicar
          </button>
          <button
            onClick={cancel}
            className="flex-1 glass-effect border border-white/10 text-white/40 hover:text-white font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDrafts(assets.map((a) => fmt(a.value))); setEditing(true); }}
          className="mt-5 w-full border border-[#FACC15]/30 text-[#FACC15] hover:bg-[#FACC15]/10 font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all"
        >
          Rebalancear Carteira
        </button>
      )}
    </div>
  );
}
