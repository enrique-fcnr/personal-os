import { MessageSquare, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface ProjectCardData {
  title: string;
  dept: string;
  progress: number;
  status: string;
  statusColor: "blue" | "orange" | "green";
  date: string;
  comments: number;
  icon: ReactNode;
  avatars: string[];
}

const STATUS_STYLES = {
  blue: "text-brand-blue bg-brand-blue/10 border-brand-blue/30",
  orange: "text-brand-orange bg-brand-orange/10 border-brand-orange/30",
  green: "text-green-400 bg-green-400/10 border-green-400/30",
};

const BORDER_STYLES = {
  blue: "border-l-brand-blue",
  orange: "border-l-brand-orange",
  green: "border-l-green-400",
};

const BAR_STYLES = {
  blue: "bg-brand-blue",
  orange: "bg-brand-orange",
  green: "bg-green-400",
};

export default function ProjectCard({
  title,
  dept,
  progress,
  status,
  statusColor,
  date,
  comments,
  icon,
  avatars,
}: ProjectCardData) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 border-l-4 hover:bg-white/[0.04] transition-all duration-200",
        BORDER_STYLES[statusColor]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg glass-effect flex items-center justify-center text-brand-blue shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="text-white font-medium font-inter text-sm">{title}</h4>
            <p className="text-[10px] text-white/40 font-['Space_Grotesk'] uppercase tracking-widest mt-0.5">
              {dept}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "text-[10px] font-bold font-['Space_Grotesk'] uppercase tracking-wider border rounded-full px-3 py-1 shrink-0",
            STATUS_STYLES[statusColor]
          )}
        >
          {status}
        </span>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-[10px] text-white/30 font-['Space_Grotesk'] uppercase tracking-wider mb-1.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full", BAR_STYLES[statusColor])}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {avatars.map((url, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-brand-dark overflow-hidden"
              style={{ zIndex: avatars.length - i }}
            >
              <img src={url} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-5 text-[10px] text-white/40 font-['Space_Grotesk'] uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3 h-3" />
            {comments}
          </span>
        </div>
      </div>
    </div>
  );
}
