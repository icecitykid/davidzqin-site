"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudyImmersiveStat } from "@/lib/case-studies";
import { StatBlock } from "./StatBlock";

type Props = {
  stats: readonly CaseStudyImmersiveStat[];
  sectionId?: string;
};

export function ImmersiveResultsStats({
  stats,
  sectionId = "results",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || active) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="mx-auto w-full max-w-dzq-content scroll-mt-[72px] px-dzq-space-6 py-dzq-space-10"
    >
      <div className="grid grid-cols-2 gap-dzq-space-9 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatBlock key={i} {...stat} start={active} />
        ))}
      </div>
    </section>
  );
}
