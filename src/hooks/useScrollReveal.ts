"use client";

import { useEffect, useRef } from "react";

export type UseScrollRevealOptions = {
  /** Elements to observe (default matches case-study cards) */
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  /** Staggered delay per item index, in ms (original: 60) */
  staggerMs?: number;
};

/**
 * IntersectionObserver scroll reveal: adds class `in` when elements enter view.
 * Mirrors the original static HTML behavior (threshold, rootMargin, stagger).
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const selector = options.selector ?? "[data-scroll-reveal]";
    const threshold = options.threshold ?? 0.12;
    const rootMargin = options.rootMargin ?? "0px 0px -8% 0px";
    const staggerMs = options.staggerMs ?? 60;

    const items = root.querySelectorAll<HTMLElement>(selector);

    const revealAll = () => {
      items.forEach((el) => el.classList.add("in"));
    };

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * staggerMs}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [options.selector, options.threshold, options.rootMargin, options.staggerMs]);

  return ref;
}
