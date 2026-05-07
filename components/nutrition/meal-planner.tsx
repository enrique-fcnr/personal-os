"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type MealStatus = "READY" | "OUT OF STOCK" | "PREP READY" | "PLANNED";

type Meal = {
  id: number;
  day: string;
  period: string;
  name: string;
  kcal: number;
  status: MealStatus;
  image?: string;
};

const STATUS_STYLES: Record<MealStatus, string> = {
  "READY":       "text-green-400",
  "PREP READY":  "text-brand-sky",
  "PLANNED":     "text-white/30",
  "OUT OF STOCK":"text-[#F87171]",
};

const MEALS: Meal[] = [
  {
    id: 1, day: "SEG", period: "ALMOÇO",
    name: "Salmão Selvagem com Aspargos",
    kcal: 420, status: "READY",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
  },
  { id: 2, day: "TER", period: "ALMOÇO",  name: "Bowl de Quinoa e Frango Grelhado", kcal: 540, status: "PREP READY" },
  { id: 3, day: "QUA", period: "JANTAR",  name: "Bife Ancho com Purê de Couve-Flor", kcal: 610, status: "OUT OF STOCK" },
  { id: 4, day: "QUI", period: "ALMOÇO",  name: "Frango ao Limão com Batata Doce",  kcal: 490, status: "PLANNED"    },
  { id: 5, day: "SEX", period: "JANTAR",  name: "Atum com Arroz de Couve-Flor",     kcal: 380, status: "PLANNED"    },
  { id: 6, day: "SAB", period: "ALMOÇO",  name: "Costela Low & Slow com Salada",    kcal: 720, status: "PLANNED"    },
  { id: 7, day: "DOM", period: "ALMOÇO",  name: "Omelete de Espinafre e Feta",      kcal: 340, status: "PLANNED"    },
];

export default function MealPlanner() {
  const [index, setIndex] = useState(0);

  const hero = MEALS[index];
  const others = MEALS.filter((_, i) => i !== index).slice(0, 2);

  const prev = () => setIndex((i) => (i - 1 + MEALS.length) % MEALS.length);
  const next = () => setIndex((i) => (i + 1) % MEALS.length);

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-bayon text-xl text-white uppercase tracking-wide">Planejamento Semanal</p>
        <div className="flex gap-2">
          <button onClick={prev} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero meal */}
      <div className="relative rounded-xl overflow-hidden mb-4 flex-shrink-0" style={{ height: "180px" }}>
        {hero.image ? (
          <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="font-inter text-[9px] uppercase tracking-widest bg-brand-sky text-white px-2 py-1 rounded-sm">
            Próxima Refeição
          </span>
        </div>

        {/* Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-bayon text-xl text-white uppercase leading-tight mb-1">{hero.name}</p>
          <p className="font-inter text-[10px] text-white/60">
            {hero.kcal}kcal · {hero.day} · {hero.period}
          </p>
        </div>
      </div>

      {/* Other meals */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {others.map((meal) => (
          <div key={meal.id} className="border border-white/8 bg-white/[0.02] rounded-xl p-3 flex flex-col justify-between group hover:bg-white/[0.04] transition-all">
            <div className="flex items-start justify-between mb-3">
              <p className="font-inter text-[9px] uppercase tracking-widest text-white/35">
                {meal.day} · {meal.period}
              </p>
              <button className="text-white/0 group-hover:text-white/20 hover:!text-white/60 transition-colors">
                <Pencil className="w-3 h-3" />
              </button>
            </div>
            <div>
              <p className="font-inter text-sm text-white/85 leading-snug mb-2">{meal.name}</p>
              <div className="flex items-center justify-between">
                <span className="font-inter text-[9px] text-white/30 uppercase tracking-widest">{meal.kcal} KCAL</span>
                <span className={cn("font-inter text-[9px] uppercase tracking-widest", STATUS_STYLES[meal.status])}>
                  {meal.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
