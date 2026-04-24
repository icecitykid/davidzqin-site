"use client";

import { useRef } from "react";
import { useParallax } from "@/hooks/useParallax";

/**
 * Subtle geometric decor for the AthleteHQ hero — three shapes drifting
 * at slightly different speeds to add depth without competing with the
 * hero media. All shapes use `currentColor` so they pick up `text-dzq-fg-1`.
 */
export function HeroDecorAthleteHQ() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useParallax(ringRef, 0.45);
  useParallax(dotRef, 0.3);
  useParallax(barRef, 0.55);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-dzq-fg-1"
    >
      {/* Outline ring, top-right, drifts mid-fast */}
      <div
        ref={ringRef}
        className="absolute -right-[5%] top-[6%] h-[420px] w-[420px] opacity-[0.08]"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* Filled dot, bottom-left, drifts slow */}
      <div
        ref={dotRef}
        className="absolute -left-[4%] bottom-[10%] h-[220px] w-[220px] opacity-[0.06]"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="48" fill="currentColor" />
        </svg>
      </div>

      {/* Diagonal hairline, mid, drifts fastest */}
      <div ref={barRef} className="absolute left-[42%] top-[58%]">
        <div className="h-[260px] w-px origin-center rotate-[-18deg] bg-current opacity-[0.12]" />
      </div>
    </div>
  );
}
