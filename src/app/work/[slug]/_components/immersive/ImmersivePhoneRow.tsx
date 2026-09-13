"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudyImmersiveMedia } from "@/lib/case-studies";
import { ImmersiveMedia } from "./ImmersiveMedia";

type Props = {
  id?: string;
  /** CSS aspect ratio for each phone frame (e.g. `"440/872"`). Defaults to `"440/872"`. */
  aspect?: string;
  /**
   * Per-phone corner radius in px. Defaults to `40` to match the case-study
   * design system — every chrome-less screen in the AthleteHQ + AightBet
   * Figma uses `border-radius: 40`. Individual scenes can still override
   * via the row `radius` prop or the per-item `radius` field on the media.
   */
  radius?: number;
  /**
   * When true, swap the otherwise-invisible inset slate-100 ring for a
   * visible slate-300 hairline so each phone reads as a bordered card.
   */
  border?: boolean;
  media: readonly CaseStudyImmersiveMedia[];
};

/**
 * Generic phone row used for the original phone-trio plus the 4-screen
 * onboarding scroll, sport-rep grid, and Nike-app concept grid.
 *
 * GSAP scroll-triggered fade/slide-in matches the original phone-trio
 * timeline; `prefers-reduced-motion` skips the animation entirely.
 */
export function ImmersivePhoneRow({
  id,
  aspect = "440/872",
  radius = 40,
  border = false,
  media,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const setItem = (index: number, el: HTMLDivElement | null) => {
    if (el) {
      itemsRef.current[index] = el;
    } else {
      delete itemsRef.current[index];
    }
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
      const items = itemsRef.current.slice(0, media.length).filter(Boolean);
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

  // Map item count → desktop column count. Single-item rows render
  // centered at a constrained width so a lone phone (e.g. an embedded
  // video walkthrough) doesn't stretch into the empty thirds beside it.
  const isSingle = media.length === 1;
  const colsClass = isSingle
    ? "md:grid-cols-1"
    : media.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : media.length === 2
        ? "md:grid-cols-2"
        : media.length === 4
          ? "md:grid-cols-4"
          : "md:grid-cols-3";
  const gridClass = isSingle
    ? "mx-auto grid w-full max-w-[486px] grid-cols-1"
    : `grid w-full grid-cols-1 items-start gap-[32px] ${colsClass}`;
  const itemSizes = isSingle
    ? "(max-width: 768px) 100vw, 486px"
    : media.length === 4
      ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
      : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw";

  return (
    <section
      ref={sectionRef}
      id={id}
      className="mx-auto w-full max-w-[1385px] scroll-mt-[72px] px-dzq-space-6 py-dzq-space-9"
    >
      <div className={gridClass}>
        {media.map((item, i) => (
          <div
            key={i}
            ref={(el) => setItem(i, el)}
            className={`relative min-w-0 w-full overflow-hidden rounded-[var(--phone-radius)] bg-slate-100 will-change-transform after:pointer-events-none after:absolute after:inset-0 after:rounded-[var(--phone-radius)] after:ring-1 after:ring-inset ${
              border ? "after:ring-slate-300" : "after:ring-slate-100"
            }`}
            style={
              {
                aspectRatio: aspect,
                "--phone-radius": `${item.radius ?? radius}px`,
              } as CSSProperties
            }
          >
            <ImmersiveMedia
              media={item}
              sizes={itemSizes}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
