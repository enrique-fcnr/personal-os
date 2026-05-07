"use client";

import { useState, useRef } from "react";
import { Plus, X, Clock, BookOpen, GripVertical, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Course = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  progress: number;
  lastActivity: string;
  remaining: string;
  color: string;
};

const COLORS = [
  "text-brand-sky border-brand-sky/40 bg-brand-sky/10",
  "text-brand-orange border-brand-orange/40 bg-brand-orange/10",
  "text-green-400 border-green-400/40 bg-green-400/10",
  "text-[#FACC15] border-[#FACC15]/40 bg-[#FACC15]/10",
  "text-purple-400 border-purple-400/40 bg-purple-400/10",
];

const BAR_COLORS = ["bg-brand-sky", "bg-brand-orange", "bg-green-400", "bg-[#FACC15]", "bg-purple-400"];

const INITIAL: Course[] = [
  { id: 1, category: "Engenharia de Prompt Avançada", title: "LLMs e Arquiteturas de Contexto",        subtitle: "Deep Learning · AI Engineering",    progress: 68, lastActivity: "Há 2h",  remaining: "4.5h restantes", color: "0" },
  { id: 2, category: "Estratégia Quantitativa",       title: "Modelagem de Risco e Teoria dos Jogos",  subtitle: "Finanças · Matemática Aplicada",     progress: 32, lastActivity: "Ontem",  remaining: "12h restantes",  color: "1" },
  { id: 3, category: "Sistemas Distribuídos",         title: "Event Sourcing e CQRS na Prática",       subtitle: "Backend · Arquitetura",             progress: 81, lastActivity: "Há 5h",  remaining: "2h restantes",   color: "2" },
];

let nextId    = INITIAL.length + 1;
let nextColor = INITIAL.length;

export default function CourseProgress() {
  const [courses, setCourses]     = useState<Course[]>(INITIAL);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [adding, setAdding]       = useState(false);
  const [reordering, setReordering] = useState(false);
  const [form, setForm]           = useState({ category: "", title: "", subtitle: "", progress: "", remaining: "" });

  const dragIndex = useRef<number | null>(null);
  const overIndex = useRef<number | null>(null);
  const dragNode  = useRef<HTMLDivElement | null>(null);

  const onDragStart = (e: React.DragEvent, i: number) => {
    dragIndex.current = i;
    dragNode.current  = e.currentTarget as HTMLDivElement;
    dragNode.current.style.opacity = "0.4";
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    overIndex.current = i;
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragIndex.current;
    const to   = overIndex.current;
    if (from === null || to === null || from === to) return;
    setCourses((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragIndex.current = null;
    overIndex.current = null;
  };

  const onDragEnd = () => {
    if (dragNode.current) dragNode.current.style.opacity = "1";
    dragNode.current  = null;
    dragIndex.current = null;
    overIndex.current = null;
  };

  const add = () => {
    if (!form.category.trim() || !form.title.trim()) return;
    const colorIdx = nextColor % COLORS.length;
    setCourses((p) => [...p, {
      id: nextId++, category: form.category, title: form.title,
      subtitle: form.subtitle || "Curso", progress: parseInt(form.progress) || 0,
      lastActivity: "Agora", remaining: form.remaining || "—", color: String(colorIdx),
    }]);
    nextColor++;
    setForm({ category: "", title: "", subtitle: "", progress: "", remaining: "" });
    setAdding(false);
  };

  const remove = (id: number) => { setCourses((p) => p.filter((c) => c.id !== id)); setConfirmId(null); };

  return (
    <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-brand-sky" />
          <p className="font-inter uppercase tracking-widest text-[10px] text-white/60">Cursos em Andamento</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setReordering((v) => !v)}
            className={cn("transition-colors", reordering ? "text-brand-sky" : "text-white/20 hover:text-white/60")}
            title="Reorganizar"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setAdding((v) => !v)}
            className="font-inter text-[10px] uppercase tracking-widest text-brand-sky hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3 h-3" />
            Novo Curso
          </button>
        </div>
      </div>

      {adding && (
        <div className="mb-5 pb-5 border-b border-white/5 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <input autoFocus placeholder="Categoria / Área" value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Escape") setAdding(false); }}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 placeholder:text-white/20 pb-1" />
            <input placeholder="Título do curso" value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/80 placeholder:text-white/20 pb-1" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input placeholder="Subtítulo" value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1" />
            <input placeholder="Progresso %" value={form.progress}
              onChange={(e) => setForm((f) => ({ ...f, progress: e.target.value }))}
              className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1" />
            <div className="flex items-end gap-2">
              <input placeholder="Ex: 4h restantes" value={form.remaining}
                onChange={(e) => setForm((f) => ({ ...f, remaining: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") add(); }}
                className="flex-1 bg-transparent border-b border-white/20 focus:border-white/50 outline-none font-inter text-xs text-white/60 placeholder:text-white/20 pb-1 w-0" />
              <button onClick={add} className="text-[10px] font-inter uppercase tracking-widest text-brand-sky hover:text-white transition-colors shrink-0 pb-1">Add</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5 flex-1">
        {courses.map((c, i) => {
          const colorIdx = parseInt(c.color);
          const tagClass = COLORS[colorIdx % COLORS.length];
          const barClass = BAR_COLORS[colorIdx % BAR_COLORS.length];

          return (
            <div
              key={c.id}
              className={cn("group flex items-start gap-3 transition-opacity", reordering && "cursor-grab active:cursor-grabbing")}
              draggable={reordering}
              onDragStart={reordering ? (e) => onDragStart(e, i) : undefined}
              onDragOver={reordering ? (e) => onDragOver(e, i) : undefined}
              onDrop={reordering ? onDrop : undefined}
              onDragEnd={reordering ? onDragEnd : undefined}
            >
              {/* Grip handle */}
              {reordering && (
                <div className="shrink-0 mt-0.5 text-white/30 hover:text-white/60 transition-colors">
                  <GripVertical className="w-4 h-4" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("font-inter text-[9px] uppercase tracking-widest border rounded-sm px-2 py-0.5 shrink-0", tagClass)}>
                        {c.category}
                      </span>
                      <span className="font-inter text-[10px] text-white/40 shrink-0">{c.progress}% Concluído</span>
                    </div>
                    <p className="font-inter text-sm text-white/85 leading-tight">{c.title}</p>
                    <p className="font-inter text-[10px] text-white/30 mt-0.5 uppercase tracking-wider">{c.subtitle}</p>
                  </div>
                  {!reordering && (
                    <div className="shrink-0 ml-3">
                      {confirmId === c.id ? (
                        <span className="flex items-center gap-1.5">
                          <span className="text-[9px] font-inter text-white/40 uppercase tracking-wider">Confirmar?</span>
                          <button onClick={() => remove(c.id)} className="text-[9px] font-inter uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors">Sim</button>
                          <button onClick={() => setConfirmId(null)} className="text-[9px] font-inter uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors">Não</button>
                        </span>
                      ) : (
                        <button onClick={() => setConfirmId(c.id)} className="text-white/0 group-hover:text-white/20 hover:!text-red-400 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-500", barClass)} style={{ width: `${c.progress}%` }} />
                </div>

                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-inter text-[9px] text-white/25 uppercase tracking-widest">
                    Última atividade: {c.lastActivity}
                  </span>
                  <span className="text-white/15">·</span>
                  <span className="font-inter text-[9px] text-white/25 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {c.remaining}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
