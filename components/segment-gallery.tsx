"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Segment } from "@/lib/types";

interface SegmentCardProps {
  segment: Segment;
  isActive: boolean;
  onSelect: (id: string) => void;
}

function SegmentCard({ segment, isActive, onSelect }: SegmentCardProps) {
  return (
    <button
      onClick={() => onSelect(segment.id)}
      className={cn(
        "relative flex-none w-48 h-32 rounded-xl overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.04] hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
        isActive ? "glass-card-active animate-glow-pulse" : "glass-effect"
      )}
    >
      <Image
        src={segment.thumbnail}
        alt={segment.label}
        fill
        className={cn(
          "object-cover transition-opacity duration-300",
          isActive ? "opacity-40" : "opacity-25"
        )}
        sizes="192px"
      />
      {/* Bottom label */}
      <span className="absolute bottom-3 left-3 font-bayon text-lg text-white tracking-widest uppercase leading-none drop-shadow-lg">
        {segment.label}
      </span>
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-orange" />
      )}
    </button>
  );
}

interface SegmentGalleryProps {
  segments: Segment[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function SegmentGallery({
  segments,
  activeId,
  onSelect,
}: SegmentGalleryProps) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
      {segments.map((segment) => (
        <SegmentCard
          key={segment.id}
          segment={segment}
          isActive={segment.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
