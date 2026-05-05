"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function WorkClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now
    ? now.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
    : "—";

  const timeStr = now
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    : "--:--:--";

  return (
    <div className="hidden md:flex gap-8">
      <div className="text-right">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-inter">Data</p>
        <p className="font-bayon text-2xl text-brand-orange leading-none mt-0.5 uppercase">
          {dateStr}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-inter">Horário</p>
        <p className="font-bayon text-2xl text-brand-blue leading-none mt-0.5">
          {timeStr}
        </p>
      </div>
    </div>
  );
}
