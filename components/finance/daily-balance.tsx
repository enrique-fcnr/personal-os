import { CheckCircle2 } from "lucide-react";

export default function DailyBalance() {
  return (
    <div className="glass-card rounded-2xl p-5 h-full">
      <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
        Saldo Líquido Hoje
      </p>
      <p className="font-bayon text-4xl text-green-400 leading-none mt-3">
        +R$ 1.250,00
      </p>
      <div className="flex items-center gap-2 mt-4">
        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
        <span className="font-inter text-[10px] text-white/40 uppercase tracking-widest">
          Metas de Economia Atingidas
        </span>
      </div>
    </div>
  );
}
