"use client";

import { useState } from "react";

const PORTFOLIO = [22, 28, 24, 35, 40, 32, 46, 44, 55, 68, 80, 92];
const IBOV      = [30, 26, 33, 30, 36, 42, 38, 47, 42, 52, 56, 60];
const VOLUME    = [30, 45, 25, 60, 40, 35, 55, 70, 45, 80, 90, 75];
const MONTHS    = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

const W = 500;
function toX(i: number) { return (i / 11) * W; }
function toY(val: number) { return 120 - ((val / 100) * 110); }
function makeLine(data: number[]) {
  return data.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
}

function makePolygon(data: number[]) {
  const points = data.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
  const first = `${toX(0).toFixed(1)},120`;
  const last  = `${toX(11).toFixed(1)},120`;
  return `${toX(0).toFixed(1)},120 ${points} ${last}`;
}

const TABS = ["1A", "5A", "TUDO"] as const;

export default function PortfolioChart() {
  const [tab, setTab] = useState<"1A" | "5A" | "TUDO">("1A");

  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Performance do Portfólio
          </p>
          <p className="font-inter text-xs text-white/30 mt-1">
            Consolidado multi-custódia (12 meses)
          </p>
        </div>
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-inter text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all ${
                tab === t
                  ? "bg-brand-blue text-white"
                  : "glass-effect text-white/40 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox="0 0 500 170" width="100%" preserveAspectRatio="none">
        {/* Grid lines */}
        {[40, 70, 100].map((y) => (
          <line
            key={y}
            x1={0} y1={y} x2={500} y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Portfolio fill */}
        <polygon
          points={makePolygon(PORTFOLIO)}
          fill="rgba(230,112,30,0.08)"
        />

        {/* IBOV line */}
        <path
          d={makeLine(IBOV)}
          stroke="#5BB3FD"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Portfolio line */}
        <path
          d={makeLine(PORTFOLIO)}
          stroke="#E6701E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Volume bars */}
        {VOLUME.map((vol, i) => {
          const h = (vol / 100) * 22;
          return (
            <rect
              key={i}
              x={toX(i) - 8}
              y={155 - h}
              width={16}
              height={h}
              fill="rgba(255,255,255,0.08)"
            />
          );
        })}

        {/* Month labels */}
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={toX(i)}
            y={165}
            fontSize="8"
            fill="rgba(255,255,255,0.2)"
            textAnchor="middle"
            fontFamily="Inter,sans-serif"
          >
            {m}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-brand-orange" />
          <span className="font-inter text-[10px] text-white/40">Portfólio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-brand-sky" />
          <span className="font-inter text-[10px] text-white/40">IBOV</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="flex justify-between mt-4 pt-4 border-t border-white/5">
        <div>
          <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Alpha (vs IBOV)</p>
          <p className="font-bayon text-2xl leading-none mt-1 text-green-400">+4,2%</p>
        </div>
        <div>
          <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Índice Sharpe</p>
          <p className="font-bayon text-2xl leading-none mt-1 text-white">2,14</p>
        </div>
        <div>
          <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Drawdown Máx</p>
          <p className="font-bayon text-2xl leading-none mt-1 text-red-400">-6,8%</p>
        </div>
      </div>
    </div>
  );
}
