import { Rocket, Layers, Database, SlidersHorizontal } from "lucide-react";
import ProjectCard, { type ProjectCardData } from "./project-card";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&q=80",
];

type ProjectEntry = Omit<ProjectCardData, "icon"> & { iconName: keyof typeof ICONS };

const ICONS = {
  rocket: <Rocket className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
};

const PROJECTS: ProjectEntry[] = [
  {
    title: "Lançamento Alpha — Nexus Pro",
    dept: "Departamento de Inovação",
    progress: 75,
    status: "75% Concluído",
    statusColor: "blue",
    date: "12 Dez",
    comments: 18,
    iconName: "rocket",
    avatars: AVATARS,
  },
  {
    title: "Rebranding Identidade Corporativa",
    dept: "Marketing & Comunicação",
    progress: 33,
    status: "Atrasado",
    statusColor: "orange",
    date: "05 Dez",
    comments: 42,
    iconName: "layers",
    avatars: [AVATARS[0], AVATARS[1]],
  },
  {
    title: "Otimização de Bancos de Dados Q3",
    dept: "Operacional / Data",
    progress: 90,
    status: "Em Testes",
    statusColor: "green",
    date: "15 Jan",
    comments: 9,
    iconName: "database",
    avatars: [AVATARS[2]],
  },
];

export default function ProjectPipeline() {
  return (
    <div className="glass-card rounded-2xl flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex justify-between items-center shrink-0">
        <div>
          <h3 className="font-['Space_Grotesk'] uppercase tracking-widest text-[10px] text-white/60">
            Pipeline de Projetos
          </h3>
          <p className="text-xs text-white/30 mt-1 font-inter">
            Status global de entregas estratégicas
          </p>
        </div>
        <button className="glass-effect border border-white/10 hover:bg-white/10 p-2 rounded-sm transition-colors">
          <SlidersHorizontal className="w-4 h-4 text-white/50" />
        </button>
      </div>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
            icon={ICONS[project.iconName]}
          />
        ))}
      </div>
    </div>
  );
}
