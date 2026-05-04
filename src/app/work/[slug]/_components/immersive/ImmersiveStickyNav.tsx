"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { CaseStudyImmersiveNavItem } from "@/lib/case-studies";

type Props = {
  sections: readonly CaseStudyImmersiveNavItem[];
};

export function ImmersiveStickyNav({ sections }: Props) {
  const [active, setActive] = useState<string | null>(
    () => sections[0]?.id ?? null,
  );

  useGSAP(() => {
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
    });
  }, [sections]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
  };

  const linkClass = (isActive: boolean) => {
    const base =
      "relative block py-dzq-space-2 text-dzq-base font-dzq-medium transition-colors duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:bg-current after:transition-[right] after:duration-300 after:ease-out";
    const color = isActive
      ? "text-dzq-fg-1"
      : "text-dzq-fg-muted hover:text-dzq-fg-1";
    const bar = isActive ? "after:right-0" : "after:right-full";
    return `${base} ${color} ${bar}`;
  };

  return (
    <nav
      aria-label="Case study sections"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-1/2 z-[50] w-[min(877px,calc(100vw-32px))] -translate-x-1/2 rounded-dzq-radius-lg bg-white px-dzq-space-8 py-dzq-space-4 shadow-[0_4px_17px_rgba(0,0,0,0.1)]"
    >
      <div className="flex items-baseline justify-between gap-dzq-space-6 text-dzq-base font-dzq-medium">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              aria-current={isActive ? "true" : undefined}
              className={linkClass(isActive)}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
