"use client";

import TopNav from "@/components/top-nav";
import HydrationCard from "@/components/nutrition/hydration-card";
import MacrosCard from "@/components/nutrition/macros-card";
import SupplementsCard from "@/components/nutrition/supplements-card";
import MealPlanner from "@/components/nutrition/meal-planner";
import MetabolicLoadCard from "@/components/nutrition/metabolic-load-card";

export default function NutritionPage() {
  return (
    <main className="flex h-screen w-full bg-brand-dark overflow-hidden relative">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,28,64,0.98) 0%, rgba(52,211,153,0.06) 55%, rgba(10,28,64,0.98) 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-green-500/4 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-brand-sky/4 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-bayon text-5xl text-white uppercase tracking-wide leading-none">
                  Terminal de Nutrição
                </h2>
                <p className="font-inter text-white/40 text-sm mt-2">
                  Fuel Optimization · Protocolo Diário
                </p>
              </div>
              <div className="text-right">
                <p className="font-inter text-[10px] uppercase tracking-widest text-white/60">
                  Calorias Hoje
                </p>
                <p className="font-bayon text-2xl text-green-400">1.840 kcal</p>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-5">

              {/* Row 1: Metabolic load + Hydration */}
              <div className="col-span-12 lg:col-span-7">
                <MetabolicLoadCard />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <HydrationCard />
              </div>

              {/* Row 2: Macros full width */}
              <div className="col-span-12">
                <MacrosCard />
              </div>

              {/* Row 3: Supplements + Meal planner */}
              <div className="col-span-12 lg:col-span-4">
                <SupplementsCard />
              </div>
              <div className="col-span-12 lg:col-span-8">
                <MealPlanner />
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 mt-2">
              <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Protocolo Ativo · Cutting Phase
              </span>
              <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest">
                Personal OS · Nutrition Module
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
