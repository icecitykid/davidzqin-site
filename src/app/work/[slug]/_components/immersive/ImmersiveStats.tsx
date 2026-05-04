"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudyImmersiveStats } from "@/lib/case-studies";
import { ReadMoreButton } from "./ReadMoreButton";
import { StatBlock } from "./StatBlock";

type Props = {
  id: string;
  stats: CaseStudyImmersiveStats;
};

/**
 * Mirrors the Figma `Stats section` (4138:3975):
 * - Container max-w 1334px, two columns (323fr / 887fr) with 124px gap
 * - Team list on the left: "Team" label 18px medium #64748B, members 24px #334155
 * - 2×2 stat grid on the right (rows ~138px, cols ~129px)
 *   - Each cell: 18px medium #334155 label, 48px bold value, 24px #334155 body
 * - Centered "Full Case Study" pill button beneath, separated by 150px gap.
 */
export function ImmersiveStats({ id, stats }: Props) {
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
      id={id}
      className="mx-auto w-full max-w-[1334px] scroll-mt-[72px] px-dzq-space-6 py-[clamp(80px,10vw,160px)]"
    >
      <div className="flex flex-col gap-[clamp(64px,10vw,150px)]">
        <div className="grid grid-cols-1 items-start gap-dzq-space-9 md:grid-cols-[minmax(0,323fr)_minmax(0,887fr)] md:gap-[clamp(48px,9vw,124px)]">
          {/* Team column */}
          <div className="flex max-w-[323px] flex-col gap-dzq-space-7">
            <p className="m-0 text-[18px] font-dzq-medium leading-none text-[#64748B]">
              Team
            </p>
            <ul className="m-0 flex list-none flex-col gap-[1em] p-0 text-[clamp(18px,2vw,24px)] leading-snug text-[#334155]">
              {stats.team.map((member, i) => (
                <li key={i}>{member}</li>
              ))}
            </ul>
          </div>

          {/* Stat 2×2 */}
          <div className="grid grid-cols-1 gap-x-[clamp(48px,9vw,129px)] gap-y-[clamp(64px,10vw,138px)] sm:grid-cols-2">
            {stats.items.map((stat, i) => (
              <div key={i} className="flex max-w-[379px] flex-col gap-dzq-space-3">
                <p className="m-0 text-[18px] font-dzq-medium leading-none text-[#334155]">
                  {stat.label}
                </p>
                <StatBlock
                  endValue={stat.endValue}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  trailingText={stat.trailingText}
                  duration={stat.duration}
                  descriptor={stat.description}
                  start={active}
                />
              </div>
            ))}
          </div>
        </div>

        {stats.readMore && (
          <div className="flex w-full justify-center">
            <ReadMoreButton
              label={stats.readMore.label}
              href={stats.readMore.href}
            />
          </div>
        )}
      </div>
    </section>
  );
}
