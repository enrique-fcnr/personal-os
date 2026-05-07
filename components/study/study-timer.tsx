"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

// 8 pomodoros = ideal study day (~3h20 of pure focus)
const DAILY_TARGET = 8;
const FOCUS_SECS   = 25 * 60;
const BREAK_SECS   = 5  * 60;

type Phase = "idle" | "focus" | "paused" | "break" | "done";

function fmt(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

export default function StudyTimer() {
  const searchParams = useSearchParams();
  const [phase, setPhase]         = useState<Phase>(searchParams.get("autostart") === "1" ? "focus" : "idle");
  const [remaining, setRemaining] = useState(FOCUS_SECS);
  const [sessions, setSessions]   = useState(0);

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const remainingRef = useRef(FOCUS_SECS);
  const phaseRef     = useRef<Phase>("idle");

  phaseRef.current     = phase;
  remainingRef.current = remaining;

  const clearTimer = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  useEffect(() => {
    if (phase !== "focus" && phase !== "break") { clearTimer(); return; }

    clearTimer();
    intervalRef.current = setInterval(() => {
      const next = remainingRef.current - 1;
      if (next <= 0) {
        clearTimer();
        if (phaseRef.current === "focus") {
          setSessions((s) => s + 1);
          setPhase("break");
          setRemaining(BREAK_SECS);
          remainingRef.current = BREAK_SECS;
        } else {
          setPhase("idle");
          setRemaining(FOCUS_SECS);
          remainingRef.current = FOCUS_SECS;
        }
      } else {
        setRemaining(next);
      }
    }, 1000);

    return clearTimer;
  }, [phase]);

  const start  = () => { setRemaining(FOCUS_SECS); remainingRef.current = FOCUS_SECS; setPhase("focus"); };
  const pause  = () => setPhase("paused");
  const resume = () => setPhase("focus");
  const finish = () => { clearTimer(); setSessions((s) => s + 1); setPhase("idle"); setRemaining(FOCUS_SECS); remainingRef.current = FOCUS_SECS; };
  const reset  = () => { clearTimer(); setSessions(0); setPhase("idle"); setRemaining(FOCUS_SECS); remainingRef.current = FOCUS_SECS; };
  const skipBreak = () => { clearTimer(); setPhase("idle"); setRemaining(FOCUS_SECS); remainingRef.current = FOCUS_SECS; };

  const isBreak  = phase === "break";
  const total    = isBreak ? BREAK_SECS : FOCUS_SECS;
  const progress = phase === "idle" ? 0 : Math.round(((total - remaining) / total) * 100);

  const timerColor = { idle: "text-white/20", focus: "text-brand-sky", paused: "text-brand-orange", break: "text-green-400", done: "text-white/40" }[phase];
  const barColor   = { idle: "bg-brand-sky", focus: "bg-brand-sky", paused: "bg-brand-orange", break: "bg-green-400", done: "bg-white/20" }[phase];

  const statusLabel = {
    idle:   null,
    focus:  <><span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse" />Foco</>,
    paused: <><span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />Pausado</>,
    break:  <><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Pausa</>,
    done:   null,
  }[phase];

  const statusColor = { idle: "", focus: "text-brand-sky", paused: "text-brand-orange", break: "text-green-400", done: "" }[phase];

  return (
    <div className="glass-card rounded-2xl p-5 relative">
      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-[0.07]">
        <Timer className="w-20 h-20 text-brand-sky" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-brand-sky" />
          <span className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Pomodoro · {isBreak ? "Pausa Ativa" : "Focus Timer"}
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
          {isBreak ? "Pausa · próximo bloco em breve" : "Remaining"}
        </p>
      </div>

      {/* Session dots */}
      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-inter text-[9px] text-white/30 uppercase tracking-widest">
            Sessões hoje
          </span>
          <span className="font-inter text-[9px] text-white/30 uppercase tracking-widest">
            {sessions}/{DAILY_TARGET}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: DAILY_TARGET }).map((_, i) => {
            const completed = i < sessions;
            const active    = i === sessions && (phase === "focus" || phase === "paused");
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all duration-500",
                  completed ? "bg-brand-sky" :
                  active    ? "bg-brand-sky/50 animate-pulse" :
                              "bg-white/[0.08]"
                )}
              />
            );
          })}
        </div>
        <p className="font-inter text-[9px] text-white/20 uppercase tracking-widest">
          Meta: {DAILY_TARGET} pomodoros · {DAILY_TARGET * 25} min de foco
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-[10px] text-white/30 font-inter uppercase tracking-wider">
          <span>{isBreak ? "Pausa" : "Session Progress"}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-1000", barColor)}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {phase === "idle" && (
          <button onClick={start} className="col-span-2 bg-brand-sky hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95">
            Iniciar Sessão
          </button>
        )}
        {phase === "focus" && (
          <>
            <button onClick={pause} className="glass-effect border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all">
              Pausar
            </button>
            <button onClick={finish} className="bg-brand-orange hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95">
              Finalizar
            </button>
          </>
        )}
        {phase === "paused" && (
          <>
            <button onClick={resume} className="bg-brand-sky hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95">
              Retomar
            </button>
            <button onClick={finish} className="bg-brand-orange hover:brightness-110 text-white font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all active:scale-95">
              Finalizar
            </button>
          </>
        )}
        {phase === "break" && (
          <button onClick={skipBreak} className="col-span-2 glass-effect border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-inter text-[10px] uppercase tracking-widest h-10 rounded-sm transition-all">
            Pular Pausa
          </button>
        )}
      </div>

      {/* Reset link */}
      {sessions > 0 && phase === "idle" && (
        <button onClick={reset} className="mt-3 w-full font-inter text-[9px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors text-center">
          Resetar dia
        </button>
      )}
    </div>
  );
}
