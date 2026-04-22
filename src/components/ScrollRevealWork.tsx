"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ScrollRevealWork({ children }: { children: ReactNode }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="work">
      {children}
    </div>
  );
}
