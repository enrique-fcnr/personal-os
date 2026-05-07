"use client";

import { useState } from "react";
import { SEGMENTS, DEFAULT_SEGMENT_ID } from "@/lib/data";
import TopNav from "@/components/top-nav";
import CentralTitle from "@/components/central-title";
import SegmentGallery from "@/components/segment-gallery";
import ActiveSegmentDetails from "@/components/active-segment-details";

export default function DashboardPage() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_SEGMENT_ID);

  const activeSegment = SEGMENTS.find((s) => s.id === activeId) ?? SEGMENTS[0];

  return (
    <main
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between transition-all duration-700 ease-in-out"
      style={{ backgroundImage: activeSegment.heroBackground }}
    >
      {/* Gradient overlay — always on top of background, below content */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,28,64,0.82) 0%, rgba(10,28,64,0.25) 45%, rgba(10,28,64,0.88) 100%)",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <TopNav />
        <CentralTitle />
        <div className="flex justify-center px-8 pb-8">
          <div className="flex flex-col gap-5 w-fit">
            <SegmentGallery
              segments={SEGMENTS}
              activeId={activeId}
              onSelect={setActiveId}
              onHover={(id) => { if (id) setActiveId(id); }}
            />
            <ActiveSegmentDetails segment={activeSegment} />
          </div>
        </div>
      </div>
    </main>
  );
}
