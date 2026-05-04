"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudyImmersiveMedia } from "@/lib/case-studies";
import { ImmersiveMedia } from "./ImmersiveMedia";

type Props = {
  id?: string;
  /** CSS aspect ratio for each phone frame (e.g. `"440/872"`). Defaults to `"440/872"`. */
  aspect?: string;
  media: readonly CaseStudyImmersiveMedia[];
};

/**
 * Generic phone row used for the original phone-trio plus the 4-screen
 * onboarding scroll, sport-rep grid, and Nike-app concept grid.
 *
 * GSAP scroll-triggered fade/slide-in matches the original phone-trio
 * timeline; `prefers-reduced-motion` skips the animation entirely.
 */
export function ImmersivePhoneRow({ id, aspect = "440/872", media }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  itemsRef.current = [];

  const setItem = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
      const items = itemsRef.current;
      if (items.length === 0) return;

      if (isMobile) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
        return;
      }

      // Desktop: subtle scrub-driven reveal (mirrors the original phone-trio).
      gsap.set(items, { opacity: 0, y: 60 });
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
      })
        .to(items, { opacity: 1, duration: 0.3 }, 0)
        .to(items, { y: 0, duration: 1 }, 0);
    },
    { scope: sectionRef, dependencies: [media] },
  );

  // Map item count → desktop column count.
  const colsClass =
    media.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : media.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section
      ref={sectionRef}
      id={id}
      className="mx-auto w-full max-w-[1385px] scroll-mt-[72px] px-dzq-space-6 py-dzq-space-9"
    >
      <div className={`grid grid-cols-1 gap-[32px] ${colsClass}`}>
        {media.map((item, i) => (
          <div
            key={i}
            ref={setItem}
            className="relative overflow-hidden rounded-[60px] will-change-transform after:pointer-events-none after:absolute after:inset-0 after:rounded-[60px] after:ring-1 after:ring-inset after:ring-slate-100"
            style={{ aspectRatio: aspect }}
          >
            <ImmersiveMedia
              media={item}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
