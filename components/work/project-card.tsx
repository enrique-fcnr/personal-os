"use client";

import { Calendar, Pencil, Check, GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ReactNode, useState } from "react";

export interface ProjectCardData {
  title: string;
  dept: string;
  startDate: string; // ISO: YYYY-MM-DD
  endDate: string;   // ISO: YYYY-MM-DD
  icon: ReactNode;
}

interface ProjectCardProps extends ProjectCardData {
  onUpdate: (patch: Partial<Pick<ProjectCardData, "title" | "dept" | "startDate" | "endDate">>) => void;
  onCycleIcon: () => void;
  onDelete: () => void;
  reordering?: boolean;
}

type Urgency = "green" | "blue" | "orange";

function calcUrgency(startDate: string, endDate: string): { pct: number; urgency: Urgency; label: string } {
  const start = new Date(startDate).getTime();
  const end   = new Date(endDate).getTime();
  const now   = Date.now();

  if (now >= end) return { pct: 100, urgency: "orange", label: "Atrasado" };

  const total   = end - start;
  const elapsed = now - start;
  const pct     = total <= 0 ? 0 : Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)));

  if (pct <= 50) return { pct, urgency: "green", label: "Prazo Longo" };
  if (pct <= 85) return { pct, urgency: "blue",  label: "No Prazo"    };
  return              { pct, urgency: "orange", label: "Urgente"      };
}

const STATUS_STYLES: Record<Urgency, string> = {
  green:  "text-green-400 bg-green-400/10 border-green-400/30",
  blue:   "text-brand-blue bg-brand-blue/10 border-brand-blue/30",
  orange: "text-brand-orange bg-brand-orange/10 border-brand-orange/30",
};

const BORDER_STYLES: Record<Urgency, string> = {
  green:  "border-l-green-400",
  blue:   "border-l-brand-blue",
  orange: "border-l-brand-orange",
};

const BAR_STYLES: Record<Urgency, string> = {
  green:  "bg-green-400",
  blue:   "bg-brand-blue",
  orange: "bg-brand-orange",
};

function fmtDate(iso: string) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-");
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
}

function InlineText({ value, onSave, className }: { value: string; onSave: (v: string) => void; className?: string }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed) onSave(trimmed); else setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
          className={cn("bg-transparent border-b border-white/30 focus:border-white/60 outline-none", className)}
        />
        <button onMouseDown={(e) => { e.preventDefault(); commit(); }} className="shrink-0 text-white/40 hover:text-white transition-colors">
          <Check className="w-3 h-3" />
        </button>
      </span>
    );
  }

  return (
    <span className="group/f inline-flex items-center gap-1.5 cursor-pointer" onClick={() => { setDraft(value); setEditing(true); }}>
      <span className={className}>{value}</span>
      <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/f:opacity-40 transition-opacity shrink-0" />
    </span>
  );
}

function DateField({ value, onSave, className }: { value: string; onSave: (v: string) => void; className?: string }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = (val: string) => {
    if (val) onSave(val);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        type="date"
        autoFocus
        defaultValue={value}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft || value)}
        className="bg-transparent border-b border-white/30 focus:border-white/60 outline-none text-[10px] font-inter uppercase tracking-wider text-white/60 w-28 [color-scheme:dark]"
      />
    );
  }

  return (
    <span className="group/d inline-flex items-center gap-1.5 cursor-pointer" onClick={() => setEditing(true)}>
      <span className={className}>{fmtDate(value)}</span>
      <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/d:opacity-40 transition-opacity shrink-0" />
    </span>
  );
}

export default function ProjectCard({
  title, dept, startDate, endDate, icon,
  onUpdate, onCycleIcon, onDelete, reordering,
}: ProjectCardProps) {
  const [confirming, setConfirming] = useState(false);
  const { pct, urgency, label } = calcUrgency(startDate, endDate);

  return (
    <div className={cn("glass-card rounded-xl p-5 border-l-4 hover:bg-white/[0.04] transition-all duration-200 flex gap-3", BORDER_STYLES[urgency])}>
      {reordering && (
        <div className="flex items-center shrink-0 text-white/20 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onCycleIcon}
              title="Trocar ícone"
              className="w-11 h-11 rounded-lg glass-effect flex items-center justify-center text-brand-blue shrink-0 hover:bg-white/10 transition-colors"
            >
              {icon}
            </button>
            <div>
              <h4 className="text-white font-medium font-inter text-sm">
                <InlineText value={title} onSave={(v) => onUpdate({ title: v })} className="text-white font-medium font-inter text-sm" />
              </h4>
              <p className="text-[10px] text-white/40 font-inter uppercase tracking-widest mt-0.5">
                <InlineText value={dept} onSave={(v) => onUpdate({ dept: v })} className="text-[10px] text-white/40 font-inter uppercase tracking-widest" />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn("text-[10px] font-bold font-inter uppercase tracking-wider border rounded-full px-3 py-1", STATUS_STYLES[urgency])}>
              {label}
            </span>
            {confirming ? (
              <span className="flex items-center gap-1.5">
                <span className="text-[9px] font-inter text-white/40 uppercase tracking-wider">Confirmar?</span>
                <button onClick={() => { onDelete(); setConfirming(false); }} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">
                  Sim
                </button>
                <button onClick={() => setConfirming(false)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">
                  Não
                </button>
              </span>
            ) : (
              <button onClick={() => setConfirming(true)} className="text-white/20 hover:text-red-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-[10px] text-white/30 font-inter uppercase tracking-wider mb-1.5">
            <span>Tempo Decorrido</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all", BAR_STYLES[urgency])} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-1.5 text-[10px] text-white/40 font-inter uppercase tracking-wider">
          <Calendar className="w-3 h-3 shrink-0" />
          <DateField value={startDate} onSave={(v) => onUpdate({ startDate: v })} className="text-[10px] text-white/40 font-inter uppercase tracking-wider" />
          <span className="text-white/20 self-center">→</span>
          <DateField value={endDate} onSave={(v) => onUpdate({ endDate: v })} className="text-[10px] text-white/40 font-inter uppercase tracking-wider" />
        </div>
      </div>
    </div>
  );
}
