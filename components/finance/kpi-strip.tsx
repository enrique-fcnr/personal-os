import { TrendingUp } from "lucide-react";

export default function KpiStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Patrimônio Líquido */}
      <div className="glass-card rounded-2xl p-5">
        <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
          Patrimônio Líquido
        </p>
        <p className="font-bayon text-3xl text-white leading-none">R$ 2.482.900</p>
        <p className="font-inter text-xs text-green-400 mt-2">+12,4%</p>
      </div>

      {/* Renda Passiva Mensal */}
      <div className="glass-card rounded-2xl p-5">
        <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
          Renda Passiva Mensal
        </p>
        <p className="font-bayon text-3xl text-white leading-none">R$ 14.250</p>
        <p className="font-inter text-xs text-green-400 mt-2">+R$ 840</p>
        <p className="font-inter text-[9px] text-white/30 mt-2 uppercase tracking-widest">
          Projeção: 112% da meta
        </p>
      </div>

      {/* Taxa de Poupança */}
      <div className="glass-card rounded-2xl p-5">
        <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
          Taxa de Poupança
        </p>
        <p className="font-bayon text-3xl text-white leading-none">42,5%</p>
        <p className="font-inter text-xs text-green-400 mt-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Em alta
        </p>
      </div>

      {/* Volatilidade (VIX) */}
      <div className="glass-card rounded-2xl p-5 border border-[#FACC15]/30">
        <p className="font-inter text-[10px] text-white/50 uppercase tracking-widest mb-3">
          Volatilidade (VIX)
        </p>
        <p className="font-bayon text-3xl text-white leading-none">14,2</p>
        <div className="mt-2">
          <span className="bg-green-400/10 text-green-400 border border-green-400/20 text-[9px] font-inter uppercase px-2 py-0.5 rounded-sm">
            BAIXA
          </span>
        </div>
        <p className="text-[9px] text-white/30 uppercase tracking-widest mt-2 font-inter">
          Status do Mercado: Estável
        </p>
      </div>
    </div>
  );
}
