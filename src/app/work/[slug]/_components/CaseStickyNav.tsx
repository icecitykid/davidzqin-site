"use client";

import type { MouseEvent } from "react";
import { useActiveAnchor } from "@/hooks/useActiveAnchor";

const ANCHORS = [
  { id: "overview", label: "Overview" },
  { id: "design", label: "Design" },
  { id: "results", label: "Results" },
] as const;

const ANCHOR_IDS: readonly string[] = ANCHORS.map((a) => a.id);

export function CaseStickyNav() {
  const activeId = useActiveAnchor({ ids: ANCHOR_IDS });

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

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-0 z-50 -mx-[40px] border-b border-dzq-border bg-dzq-bg"
    >
      <ul className="m-0 mx-auto flex h-[64px] max-w-dzq-content list-none items-center gap-dzq-space-7 px-[40px] py-0 text-dzq-base font-dzq-medium">
        {ANCHORS.map((anchor) => {
          const isActive = activeId === anchor.id;
          return (
            <li key={anchor.id}>
              <a
                href={`#${anchor.id}`}
                onClick={(event) => handleClick(event, anchor.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative block py-dzq-space-2 transition-colors duration-dzq-fast ease-dzq-out after:absolute after:bottom-0 after:left-0 after:h-px after:bg-current after:transition-[right] after:duration-dzq-med after:ease-dzq-out ${
                  isActive
                    ? "text-dzq-fg-1 after:right-0"
                    : "text-dzq-fg-2 hover:text-dzq-fg-1 after:right-full"
                }`}
              >
                {anchor.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
