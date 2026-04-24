"use client";

import { useEffect, type RefObject } from "react";

/**
 * Translates the referenced element vertically as the page scrolls,
 * scaled by `speed`. Uses requestAnimationFrame to coalesce scroll events.
 *
 * - `speed` of 0 means no parallax (element scrolls with the page).
 * - Positive values (0.3–0.6 feel subtle) push the element down as the
 *   user scrolls down, so it appears to "lag behind" the rest of the page,
 *   creating a sense of depth.
 *
 * Disabled entirely under `prefers-reduced-motion`. Cleans up the scroll
 * listener and pending animation frame on unmount.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number,
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let latestY = window.scrollY;

    const apply = () => {
      frame = 0;
      el.style.transform = `translate3d(0, ${latestY * speed}px, 0)`;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (frame === 0) frame = requestAnimationFrame(apply);
    };

    el.style.willChange = "transform";
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, [ref, speed]);
}
