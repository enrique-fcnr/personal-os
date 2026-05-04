import TopNav from "@/components/top-nav";
import DeepWorkTimer from "@/components/work/deep-work-timer";
import KpiWidget from "@/components/work/kpi-widget";
import PriorityList from "@/components/work/priority-list";
import ProjectPipeline from "@/components/work/project-pipeline";

export const metadata = { title: "Personal OS | Work" };

export default function WorkPage() {
  return (
    <main className="flex h-screen w-full bg-brand-dark overflow-hidden relative">
      {/* Background gradient */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,28,64,0.98) 0%, rgba(36,113,231,0.2) 55%, rgba(10,28,64,0.98) 100%)",
        }}
      />
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] bg-brand-blue/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-brand-orange/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {/* Page header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-bayon text-5xl text-white uppercase tracking-wide leading-none">
                  Terminal de Trabalho
                </h2>
                <p className="font-inter text-white/40 text-sm mt-2">
                  Foco Atual:{" "}
                  <span className="text-brand-sky">
                    Expansão Q4 &amp; Infraestrutura de Dados
                  </span>
                </p>
              </div>
              <div className="hidden md:flex gap-8">
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-['Space_Grotesk']">
                    CPU Load
                  </p>
                  <p className="font-bayon text-2xl text-brand-orange leading-none mt-0.5">
                    24.8%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-['Space_Grotesk']">
                    Network
                  </p>
                  <p className="font-bayon text-2xl text-brand-blue leading-none mt-0.5">
                    Stable
                  </p>
                </div>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-5">
              {/* Left column */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
                <DeepWorkTimer />
                <div className="grid grid-cols-2 gap-5">
                  <KpiWidget
                    label="ROI Anual"
                    value="+14.2%"
                    color="text-brand-blue"
                    barColor="bg-brand-blue"
                    bars={[40, 55, 48, 70, 62, 80, 72]}
                  />
                  <KpiWidget
                    label="Efficiency"
                    value="94%"
                    color="text-[#34D399]"
                    barColor="bg-[#34D399]"
                    bars={[80, 85, 88, 90, 87, 94, 94]}
                  />
                </div>
                <PriorityList />
              </div>

              {/* Right column */}
              <div className="col-span-12 lg:col-span-8">
                <ProjectPipeline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
