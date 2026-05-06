const ALLOCATIONS = [
  { label: "Ações (Brasil & EUA)", pct: 55, color: "bg-brand-blue" },
  { label: "Renda Fixa / Tesouro", pct: 25, color: "bg-brand-sky" },
  { label: "Real Estate (FIIs)",   pct: 12, color: "bg-brand-orange" },
  { label: "Criptoativos",         pct: 8,  color: "bg-[#FACC15]" },
];

export default function AssetAllocation() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60 mb-5">
        Alocação de Ativos
      </p>

      <div className="flex flex-col gap-4">
        {ALLOCATIONS.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1.5">
              <span className="font-inter text-xs text-white/70">{item.label}</span>
              <span className="font-inter text-xs text-white/50">{item.pct}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-5 w-full border border-[#FACC15]/30 text-[#FACC15] hover:bg-[#FACC15]/10 font-inter text-[10px] uppercase tracking-widest py-2.5 rounded-sm transition-all">
        Rebalancear Carteira
      </button>
    </div>
  );
}
