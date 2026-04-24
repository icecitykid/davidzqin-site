"use client";

import { useEffect, useState } from "react";

export type UseActiveAnchorOptions = {
  /** Element IDs to observe, in document order. Should be stable across renders. */
  ids: readonly string[];
  /** IntersectionObserver rootMargin (mirrors useScrollReveal style). */
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * Tracks which anchor section is currently in the active "viewport band"
 * (defined by `rootMargin`). Mirrors the shape of `useScrollReveal`:
 * options object, IntersectionObserver under the hood, cleanup on unmount.
 *
 * Returns the id of the active section, or `null` while the page is above
 * the first section.
 */
export function useActiveAnchor(options: UseActiveAnchorOptions): string | null {
  const { ids } = options;
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rootMargin = options.rootMargin ?? "-40% 0px -40% 0px";
    const threshold = options.threshold ?? 0;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      setActiveId(elements[0].id);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, options.rootMargin, options.threshold]);

  return activeId;
}
