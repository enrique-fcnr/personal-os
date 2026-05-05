"use client";

import { useState, useRef } from "react";
import {
  Rocket, Layers, Database, SlidersHorizontal,
  Code, TrendingUp, Users, Globe, Zap, Shield, BarChart, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectCard, { type ProjectCardData } from "./project-card";

const ICON_KEYS = ["rocket", "layers", "database", "code", "trending", "users", "globe", "zap", "shield", "barchart"] as const;
type IconKey = typeof ICON_KEYS[number];

const ICONS: Record<IconKey, React.ReactNode> = {
  rocket:   <Rocket className="w-5 h-5" />,
  layers:   <Layers className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  code:     <Code className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
  users:    <Users className="w-5 h-5" />,
  globe:    <Globe className="w-5 h-5" />,
  zap:      <Zap className="w-5 h-5" />,
  shield:   <Shield className="w-5 h-5" />,
  barchart: <BarChart className="w-5 h-5" />,
};

type ProjectEntry = Omit<ProjectCardData, "icon"> & { iconName: IconKey };

const INITIAL_PROJECTS: ProjectEntry[] = [
  {
    title: "Lançamento Alpha — Nexus Pro",
    dept: "Departamento de Inovação",
    startDate: "2024-11-01",
    endDate: "2025-06-12",
    iconName: "rocket",
  },
  {
    title: "Rebranding Identidade Corporativa",
    dept: "Marketing & Comunicação",
    startDate: "2024-10-15",
    endDate: "2025-05-10",
    iconName: "layers",
  },
  {
    title: "Otimização de Bancos de Dados Q3",
    dept: "Operacional / Data",
    startDate: "2025-03-01",
    endDate: "2025-07-15",
    iconName: "database",
  },
];

export default function ProjectPipeline() {
  const [projects, setProjects] = useState<ProjectEntry[]>(INITIAL_PROJECTS);
  const [reordering, setReordering] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const update = (index: number, patch: Partial<Pick<ProjectEntry, "title" | "dept" | "startDate" | "endDate">>) =>
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));

  const deleteProject = (index: number) =>
    setProjects((prev) => prev.filter((_, i) => i !== index));

  const cycleIcon = (index: number) =>
    setProjects((prev) => prev.map((p, i) => {
      if (i !== index) return p;
      const next = (ICON_KEYS.indexOf(p.iconName) + 1) % ICON_KEYS.length;
      return { ...p, iconName: ICON_KEYS[next] };
    }));

  const addProject = () => {
    const today = new Date().toISOString().split("T")[0];
    setProjects((prev) => [
      ...prev,
      { title: "Novo Projeto", dept: "Departamento", startDate: today, endDate: today, iconName: "rocket" },
    ]);
  };

  const onDragStart = (e: React.DragEvent, i: number) => {
    dragNode.current = e.currentTarget as HTMLDivElement;
    dragNode.current.addEventListener("dragend", onDragEnd);
    setDragIndex(i);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (i !== overIndex) setOverIndex(i);
  };

  const onDrop = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    setProjects((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(i, 0, moved);
      return next;
    });
    setDragIndex(null);
    setOverIndex(null);
  };

  const onDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
    dragNode.current?.removeEventListener("dragend", onDragEnd);
    dragNode.current = null;
  };

  return (
    <div className="glass-card rounded-2xl flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex justify-between items-center shrink-0">
        <div>
          <h3 className="font-inter uppercase tracking-widest text-[10px] text-white/60">
            Pipeline de Projetos
          </h3>
          <p className="text-xs text-white/30 mt-1 font-inter">
            Status global de entregas estratégicas
          </p>
        </div>
        <button
          onClick={() => setReordering((v) => !v)}
          className={cn(
            "border p-2 rounded-sm transition-all",
            reordering
              ? "bg-brand-blue/20 border-brand-blue/40 text-brand-blue"
              : "glass-effect border-white/10 hover:bg-white/10 text-white/50"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {projects.map((project, i) => (
          <div
            key={i}
            draggable={reordering}
            onDragStart={reordering ? (e) => onDragStart(e, i) : undefined}
            onDragOver={reordering ? (e) => onDragOver(e, i) : undefined}
            onDrop={reordering ? (e) => onDrop(e, i) : undefined}
            className={cn(
              "transition-all duration-150",
              reordering && "cursor-grab active:cursor-grabbing",
              dragIndex === i && "opacity-40 scale-[0.98]",
              overIndex === i && dragIndex !== i && "translate-y-0.5 border-t-2 border-t-brand-blue/50"
            )}
          >
            <ProjectCard
              {...project}
              icon={ICONS[project.iconName]}
              onUpdate={(patch) => update(i, patch)}
              onCycleIcon={() => cycleIcon(i)}
              onDelete={() => deleteProject(i)}
              reordering={reordering}
            />
          </div>
        ))}

        <button
          onClick={addProject}
          className="w-full flex items-center gap-2 text-white/20 hover:text-white/60 transition-colors mt-2"
        >
          <Plus className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[10px] font-inter uppercase tracking-widest">Adicionar projeto</span>
        </button>
      </div>
    </div>
  );
}
