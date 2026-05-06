import TopNav from "@/components/top-nav";
import KpiStrip from "@/components/finance/kpi-strip";
import PortfolioChart from "@/components/finance/portfolio-chart";
import AssetAllocation from "@/components/finance/asset-allocation";
import RecentDividends from "@/components/finance/recent-dividends";
import DailyBalance from "@/components/finance/daily-balance";
import DailyCashflow from "@/components/finance/daily-cashflow";
import { Clock } from "lucide-react";

export const metadata = { title: "Personal OS | Finance" };

export default function FinancePage() {
  return (
    <main className="flex h-screen w-full bg-brand-dark overflow-hidden relative">
      {/* Background gradient */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,28,64,0.98) 0%, rgba(250,204,21,0.08) 55%, rgba(10,28,64,0.98) 100%)",
        }}
      />
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] bg-[#FACC15]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-[#FACC15]/4 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {/* Page header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-bayon text-5xl text-white uppercase tracking-wide leading-none">
                  Terminal de Finanças
                </h2>
                <p className="font-inter text-white/40 text-sm mt-2">
                  Consolidado Multi-Custódia
                </p>
              </div>
              <div className="text-right">
                <p className="font-inter text-[10px] uppercase tracking-widest text-white/60">
                  Patrimônio
                </p>
                <p className="font-bayon text-2xl text-[#FACC15]">R$ 2.482.900</p>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-5">
              {/* Row 1: KPI Strip */}
              <div className="col-span-12">
                <KpiStrip />
              </div>

              {/* Row 2: Chart + right column */}
              <div className="col-span-12 lg:col-span-7">
                <PortfolioChart />
              </div>
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
                <AssetAllocation />
                <RecentDividends />
              </div>

              {/* Row 3: Monthly Balance + Cashflow */}
              <div className="col-span-12 lg:col-span-3">
                <DailyBalance />
              </div>
              <div className="col-span-12 lg:col-span-9">
                <DailyCashflow />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 mt-2">
              <div className="flex gap-4">
                <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Conexão Segura: Ativa
                </span>
                <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Última Atualização: Agora Mesmo
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest hover:text-white/50 cursor-pointer transition-colors">
                  Termos de Uso
                </span>
                <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest hover:text-white/50 cursor-pointer transition-colors">
                  Privacidade
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
