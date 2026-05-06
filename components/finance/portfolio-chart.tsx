"use client";

import { useState, useMemo } from "react";

// ── Raw monthly data (Jun/2024 → Mai/2025) ─────────────────────────────────
const MONTHS = ["Jun/24","Jul/24","Ago/24","Set/24","Out/24","Nov/24","Dez/24","Jan/25","Fev/25","Mar/25","Abr/25","Mai/25"];
const SHORT   = ["Jun","Jul","Ago","Set","Out","Nov","Dez","Jan","Fev","Mar","Abr","Mai"];

const ALL_DATA = {
  salario:    [11100,11100,11100,11100,11100,11100,11100,12500,12500,12500,12500,12500],
  freelance:  [1800, 2400, 1200, 3200, 2800, 4100, 6500, 1800, 2200, 3800, 4200, 4800],
  gastos:     [8200, 8500, 9100, 8800, 8300, 9200,12000, 8900, 8200, 9100, 9500, 9200],
  investido:  [2800, 2500, 2000, 3200, 3200, 3800, 4200, 2800, 3200, 3600, 3800, 3200],
  rendAtivos: [1200, 1800, 2100, 1500, 2800, 3200, 2800, 3400, 4100, 3800, 4200, 5100],
  dividendos: [ 142,  310,  142,  840,  310,  142, 1150,  310,  142,  840, 1292,  310],
};

const PATRIMONIO_INICIAL = 85_000;

function buildPatrimonio() {
  const result: number[] = [];
  let acc = PATRIMONIO_INICIAL;
  for (let i = 0; i < 12; i++) {
    acc +=
      ALL_DATA.salario[i] +
      ALL_DATA.freelance[i] -
      ALL_DATA.gastos[i] +
      ALL_DATA.rendAtivos[i] +
      ALL_DATA.dividendos[i];
    result.push(acc);
  }
  return result;
}

const PATRIMONIO_FULL = buildPatrimonio();

const TABS = ["6M", "1A", "TUDO"] as const;
type Tab = typeof TABS[number];

const SLICE: Record<Tab, number> = { "6M": 6, "1A": 12, "TUDO": 12 };

// ── SVG helpers ─────────────────────────────────────────────────────────────
const SVG_W = 640;
const SVG_H = 200;
const PAD_L = 52;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 28;

function buildPoints(data: number[], min: number, max: number) {
  const n   = data.length;
  const rng = max - min || 1;
  return data.map((v, i) => {
    const x = PAD_L + (i / (n - 1)) * (SVG_W - PAD_L - PAD_R);
    const y = PAD_T + (1 - (v - min) / rng) * (SVG_H - PAD_T - PAD_B);
    return [x, y] as [number, number];
  });
}

function linePath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function areaPath(pts: [number, number][]) {
  const bottom = SVG_H - PAD_B;
  return (
    `M${pts[0][0].toFixed(1)},${bottom} ` +
    pts.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ") +
    ` L${pts[pts.length - 1][0].toFixed(1)},${bottom} Z`
  );
}

// ── Formatters ──────────────────────────────────────────────────────────────
const fmtK  = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);
const fmtBR = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;
const fmtPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

// ── Component ────────────────────────────────────────────────────────────────
export default function PortfolioChart() {
  const [tab, setTab] = useState<Tab>("1A");

  const n     = SLICE[tab];
  const start = 12 - n;

  const patrimonio  = PATRIMONIO_FULL.slice(start);
  const ganhos      = ALL_DATA.salario.slice(start).map((s, i) => s + ALL_DATA.freelance[start + i]);
  const gastos      = ALL_DATA.gastos.slice(start);
  const rendTotal   = ALL_DATA.rendAtivos.slice(start).map((r, i) => r + ALL_DATA.dividendos[start + i]);
  const months      = SHORT.slice(start);

  const pMin = Math.min(...patrimonio) * 0.97;
  const pMax = Math.max(...patrimonio) * 1.02;

  const pts = useMemo(() => buildPoints(patrimonio, pMin, pMax), [patrimonio, pMin, pMax]);

  // Stats
  const totalGanhos  = ganhos.reduce((a, b) => a + b, 0);
  const totalRend    = rendTotal.reduce((a, b) => a + b, 0);
  const pctCrescimento = ((patrimonio[patrimonio.length - 1] - (start === 0 ? PATRIMONIO_INICIAL : PATRIMONIO_FULL[start - 1])) /
    (start === 0 ? PATRIMONIO_INICIAL : PATRIMONIO_FULL[start - 1])) * 100;

  // Y-axis labels (5 ticks)
  const yTicks = [0, 1, 2, 3, 4].map((i) => pMin + (i / 4) * (pMax - pMin));

  // Bar chart dims
  const barAreaW  = SVG_W - PAD_L - PAD_R;
  const barSlot   = barAreaW / n;
  const barW      = Math.max(4, barSlot * 0.28);
  const maxBar    = Math.max(...ganhos, ...gastos) * 1.1;
  const barH      = SVG_H - PAD_T - PAD_B;
  const barBottom = SVG_H - PAD_B;

  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Evolução Patrimonial
          </p>
          <p className="font-inter text-xs text-white/30 mt-0.5">
            Patrimônio consolidado · salário + freelas + rendimentos − gastos
          </p>
        </div>
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-inter text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all ${
                tab === t
                  ? "bg-brand-orange text-white"
                  : "glass-effect text-white/40 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#E6701E" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E6701E" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#E6701E" />
            <stop offset="100%" stopColor="#5BB3FD" />
          </linearGradient>
        </defs>

        {/* Grid lines + Y labels */}
        {yTicks.map((v, i) => {
          const rng = pMax - pMin;
          const y   = PAD_T + (1 - (v - pMin) / rng) * (SVG_H - PAD_T - PAD_B);
          return (
            <g key={i}>
              <line x1={PAD_L} y1={y} x2={SVG_W - PAD_R} y2={y}
                stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={PAD_L - 4} y={y + 3} fontSize="8" fill="rgba(255,255,255,0.25)"
                textAnchor="end" fontFamily="Inter,sans-serif">
                {fmtK(Math.round(v))}
              </text>
            </g>
          );
        })}

        {/* Ganhos bars (blue) */}
        {ganhos.map((v, i) => {
          const x = PAD_L + (i + 0.5) * barSlot - barW - 1;
          const h = (v / maxBar) * barH * 0.38;
          return (
            <rect key={`g${i}`} x={x} y={barBottom - h} width={barW} height={h}
              fill="rgba(36,113,231,0.35)" rx="1" />
          );
        })}

        {/* Gastos bars (orange) */}
        {gastos.map((v, i) => {
          const x = PAD_L + (i + 0.5) * barSlot + 1;
          const h = (v / maxBar) * barH * 0.38;
          return (
            <rect key={`gs${i}`} x={x} y={barBottom - h} width={barW} height={h}
              fill="rgba(230,112,30,0.3)" rx="1" />
          );
        })}

        {/* Patrimônio area fill */}
        <path d={areaPath(pts)} fill="url(#pgGrad)" />

        {/* Patrimônio line */}
        <path d={linePath(pts)} stroke="url(#lineGrad)" strokeWidth="2.5"
          fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3"
            fill="#E6701E" stroke="rgba(10,28,64,0.9)" strokeWidth="1.5" />
        ))}

        {/* Month labels */}
        {months.map((m, i) => {
          const x = PAD_L + (i / (n - 1)) * (SVG_W - PAD_L - PAD_R);
          return (
            <text key={m} x={x} y={SVG_H - 4} fontSize="8"
              fill="rgba(255,255,255,0.25)" textAnchor="middle" fontFamily="Inter,sans-serif">
              {m}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-5 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-brand-orange rounded" />
          <span className="font-inter text-[10px] text-white/40">Patrimônio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-brand-blue/40 rounded-sm" />
          <span className="font-inter text-[10px] text-white/40">Ganhos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-brand-orange/30 rounded-sm" />
          <span className="font-inter text-[10px] text-white/40">Gastos</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
        <div>
          <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Crescimento</p>
          <p className={`font-bayon text-2xl leading-none mt-1 ${pctCrescimento >= 0 ? "text-green-400" : "text-brand-orange"}`}>
            {fmtPct(pctCrescimento)}
          </p>
          <p className="font-inter text-[9px] text-white/25 mt-0.5">vs início do período</p>
        </div>
        <div>
          <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Total Ganhos</p>
          <p className="font-bayon text-2xl leading-none mt-1 text-white">
            {fmtBR(totalGanhos)}
          </p>
          <p className="font-inter text-[9px] text-white/25 mt-0.5">salário + freelas</p>
        </div>
        <div>
          <p className="font-inter text-[9px] text-white/30 uppercase tracking-widest">Rend + Dividendos</p>
          <p className="font-bayon text-2xl leading-none mt-1 text-brand-sky">
            {fmtBR(totalRend)}
          </p>
          <p className="font-inter text-[9px] text-white/25 mt-0.5">ativos + proventos</p>
        </div>
      </div>
    </div>
  );
}
