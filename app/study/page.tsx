import { Suspense } from "react";
import TopNav from "@/components/top-nav";
import CourseProgress from "@/components/study/course-progress";
import ReadingList from "@/components/study/reading-list";
import StudyTimer from "@/components/study/study-timer";
import StudyTodo from "@/components/study/study-todo";

export const metadata = { title: "Personal OS | Study" };

export default function StudyPage() {
  return (
    <main className="flex h-screen w-full bg-brand-dark overflow-hidden relative">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,28,64,0.98) 0%, rgba(91,179,253,0.08) 55%, rgba(10,28,64,0.98) 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-sky/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-brand-sky/4 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {/* Page header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-bayon text-5xl text-white uppercase tracking-wide leading-none">
                  Terminal de Estudos
                </h2>
                <p className="font-inter text-white/40 text-sm mt-2">
                  Aprendizado Estruturado · Crescimento Contínuo
                </p>
              </div>
              <div className="text-right">
                <p className="font-inter text-[10px] uppercase tracking-widest text-white/60">Progresso Geral</p>
                <p className="font-bayon text-2xl text-brand-sky">68%</p>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-5">
              {/* Left: Timer (top) + Courses (bottom) */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
                <Suspense fallback={null}>
                  <StudyTimer />
                </Suspense>
                <CourseProgress />
              </div>

              {/* Right: Reading list + Todo */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
                <ReadingList />
                <StudyTodo />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 mt-2">
              <div className="flex gap-4">
                <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-sky" />
                  Modo Foco: Ativo
                </span>
                <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest">
                  Streak: 14 dias consecutivos
                </span>
              </div>
              <span className="font-inter text-[9px] text-white/20 uppercase tracking-widest">
                Personal OS · Study Module
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
