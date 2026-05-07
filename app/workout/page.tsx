"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TopNav from "@/components/top-nav";
import WeeklySchedule from "@/components/workout/weekly-schedule";
import SessionCard from "@/components/workout/session-card";
import WeeklyWorkoutRing from "@/components/workout/hrv-card";
import SleepCard from "@/components/workout/sleep-card";
import VolumeChart from "@/components/workout/volume-chart";

function WorkoutContent() {
  const searchParams                      = useSearchParams();
  const autoStart                         = searchParams.get("autostart") === "1";
  const [activeDay, setActiveDay]         = useState(0);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const markDayComplete = (i: number) => {
    setCompletedDays((prev) => { const next = new Set(prev); next.add(i); return next; });
  };

  return (
    <main className="flex h-screen w-full bg-brand-dark overflow-hidden relative">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,28,64,0.98) 0%, rgba(230,112,30,0.07) 55%, rgba(10,28,64,0.98) 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-orange/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-brand-orange/4 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-bayon text-5xl text-white uppercase tracking-wide leading-none">
                  Terminal de Treino
                </h2>
                <p className="font-inter text-white/40 text-sm mt-2">
                  Performance Engine · Protocolo Semanal
                </p>
              </div>
              <div className="text-right">
                <p className="font-inter text-[10px] uppercase tracking-widest text-white/60">
                  Treinos no Mês
                </p>
                <p className="font-bayon text-2xl text-brand-orange">18 treinos</p>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-5">
              {/* Row 1: Weekly schedule */}
              <div className="col-span-12">
                <WeeklySchedule
                  activeDay={activeDay}
                  onSelect={setActiveDay}
                  completedDays={completedDays}
                />
              </div>

              {/* Row 2: Session + right column */}
              <div className="col-span-12 lg:col-span-8">
                <SessionCard dayIndex={activeDay} onComplete={() => markDayComplete(activeDay)} autoStart={autoStart} />
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
                <WeeklyWorkoutRing completedDays={completedDays.size} />
                <SleepCard completedDays={completedDays} />
              </div>

              {/* Row 3: Volume chart */}
              <div className="col-span-12">
                <VolumeChart />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 mt-2">
              <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                Protocolo Ativo · Mesociclo 3
              </span>
              <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest">
                Personal OS · Workout Module
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function WorkoutPage() {
  return (
    <Suspense fallback={null}>
      <WorkoutContent />
    </Suspense>
  );
}
