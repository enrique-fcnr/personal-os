"use client";

import { Timer } from "lucide-react";

export default function DeepWorkTimer() {
  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-[0.07]">
        <Timer className="w-20 h-20 text-brand-blue" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-brand-blue" />
          <span className="font-['Space_Grotesk'] uppercase tracking-widest text-[10px] text-white/60">
            Deep Work Session
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-['Space_Grotesk'] uppercase tracking-widest text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Active
        </span>
      </div>

      {/* Countdown */}
      <div className="text-center py-2">
        <p className="font-bayon text-[72px] text-brand-blue leading-none tracking-tighter">48:12</p>
        <p className="font-['Space_Grotesk'] text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">
          Remaining
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-[10px] text-white/30 font-['Space_Grotesk'] uppercase tracking-wider">
          <span>Session Progress</span>
          <span>65%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="w-[65%] h-full bg-brand-blue rounded-full" />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button className="glass-effect border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-['Space_Grotesk'] text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all">
          Pause
        </button>
        <button className="bg-brand-orange hover:brightness-110 text-white font-['Space_Grotesk'] text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95">
          Finish Session
        </button>
      </div>
    </div>
  );
}
