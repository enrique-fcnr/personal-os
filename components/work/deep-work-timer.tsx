"use client";

import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

const BLOCK_SECONDS = 30 * 60;

type Status = "idle" | "running" | "paused" | "done";

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function DeepWorkTimer() {
  const [status, setStatus] = useState<Status>("idle");
  const [remaining, setRemaining] = useState(BLOCK_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progress = Math.round(((BLOCK_SECONDS - remaining) / BLOCK_SECONDS) * 100);

  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setStatus("done");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [status]);

  const start = () => { setRemaining(BLOCK_SECONDS); setStatus("running"); };
  const pause = () => setStatus("paused");
  const resume = () => setStatus("running");
  const finish = () => { setStatus("idle"); setRemaining(BLOCK_SECONDS); };

  const statusLabel = {
    idle: null,
    running: <><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Active</>,
    paused: <><span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />Paused</>,
    done: <><span className="w-1.5 h-1.5 rounded-full bg-white/40" />Done</>,
  }[status];

  const statusColor = { idle: "", running: "text-green-400", paused: "text-brand-orange", done: "text-white/40" }[status];
  const timerColor = { idle: "text-white/20", running: "text-brand-blue", paused: "text-brand-orange", done: "text-white/40" }[status];

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-[0.07]">
        <Timer className="w-20 h-20 text-brand-blue" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-brand-blue" />
          <span className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Deep Work Session
          </span>
        </div>
        {statusLabel && (
          <span className={cn("flex items-center gap-1.5 text-[10px] font-inter uppercase tracking-widest", statusColor)}>
            {statusLabel}
          </span>
        )}
      </div>

      {/* Countdown */}
      <div className="text-center py-2">
        <p className={cn("font-bayon text-[72px] leading-none tracking-tighter transition-colors", timerColor)}>
          {fmt(remaining)}
        </p>
        <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">
          {status === "done" ? "Sessão Concluída" : "Remaining"}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-[10px] text-white/30 font-inter uppercase tracking-wider">
          <span>Session Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-1000", status === "paused" ? "bg-brand-orange" : "bg-brand-blue")}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {status === "idle" && (
          <button
            onClick={start}
            className="col-span-2 bg-brand-blue hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95"
          >
            Iniciar Sessão
          </button>
        )}

        {status === "running" && (
          <>
            <button
              onClick={pause}
              className="glass-effect border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all"
            >
              Pausar
            </button>
            <button
              onClick={finish}
              className="bg-brand-orange hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95"
            >
              Finalizar
            </button>
          </>
        )}

        {status === "paused" && (
          <>
            <button
              onClick={resume}
              className="bg-brand-blue hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95"
            >
              Retomar
            </button>
            <button
              onClick={finish}
              className="bg-brand-orange hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95"
            >
              Finalizar
            </button>
          </>
        )}

        {status === "done" && (
          <>
            <button
              onClick={start}
              className="bg-brand-blue hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95"
            >
              Novo Bloco
            </button>
            <button
              onClick={finish}
              className="glass-effect border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all"
            >
              Resetar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
