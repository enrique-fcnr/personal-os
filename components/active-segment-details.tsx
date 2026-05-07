"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Zap } from "lucide-react";
import { Segment } from "@/lib/types";

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&q=80",
];

interface ActiveSegmentDetailsProps {
  segment: Segment;
}

export default function ActiveSegmentDetails({
  segment,
}: ActiveSegmentDetailsProps) {
  const router = useRouter();

  const handleCta = () => {
    if (!segment.href) return;
    const autostart = segment.id === "work" || segment.id === "study" || segment.id === "workout";
    router.push(autostart ? `${segment.href}?autostart=1` : segment.href);
  };

  return (
    <div className="glass-effect rounded-2xl px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      {/* Left: Title + meta */}
      <div className="flex flex-col gap-4">
        <h2
          className="font-bayon text-5xl lg:text-6xl uppercase tracking-wide text-white leading-none animate-fade-in-up"
          key={segment.id}
        >
          {segment.detailTitle}
        </h2>

        <div className="flex items-center gap-4">
          {/* Avatar stack */}
          <div className="flex items-center">
            {AVATAR_URLS.map((url, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-full border-2 border-brand-dark overflow-hidden"
                style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: 3 - i }}
              >
                <img
                  src={url}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Task count badge */}
          <Badge
            className="bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 font-inter text-xs font-normal px-3 py-1 rounded-full"
          >
            <Zap className="w-3 h-3 mr-1.5 text-brand-orange" />
            {segment.taskCount} active tasks
          </Badge>
        </div>
      </div>

      {/* Right: Timer + CTA */}
      <div className="flex flex-col items-start md:items-end gap-4">
        <div className="text-right" key={segment.id + "-status"}>
          <p
            className="font-bayon text-5xl lg:text-6xl leading-none animate-fade-in-up"
            style={{ color: segment.accentColor }}
          >
            {segment.statusPrimary}
          </p>
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-white/40 mt-1">
            {segment.statusSub}
          </p>
        </div>

        <Button
          onClick={handleCta}
          className="bg-brand-orange hover:bg-brand-orange/85 text-white font-inter font-semibold text-sm tracking-widest uppercase px-8 py-3 rounded-full h-auto group transition-all duration-200"
        >
          {segment.ctaLabel}
          <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </div>
  );
}
