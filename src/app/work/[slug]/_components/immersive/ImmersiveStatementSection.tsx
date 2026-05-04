"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type ImmersiveStatementSectionProps = {
  id?: string;
  /** Short headline (~3–6 words). Newlines stack as separate lines. */
  leftText: string;
  /** Longer explanation. Blank lines (\n\n) break paragraphs. */
  rightText: string;
  className?: string;
};

/**
 * Mirrors Figma statement frames (4138:1903, 4138:3194, 4138:3640):
 * - Heading 36px medium black, fixed ≤411px wide
 * - Body 24px regular #334155, max ≈716px
 * - 128px gap between columns, centered horizontally on viewport
 * - Heading newlines render as stacked lines.
 */
export function ImmersiveStatementSection({
  id,
  leftText,
  rightText,
  className,
}: ImmersiveStatementSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLHeadingElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
        const yOffset = isMobile ? 16 : 32;

        const targets = [leftRef.current, rightRef.current];
        gsap.set(targets, { opacity: 0, y: yOffset });

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(leftRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
            gsap.to(rightRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.12,
            });
          },
        });
      }
    },
    { scope: rootRef },
  );

  const headingLines = leftText.split("\n");

  return (
    <section
      ref={rootRef}
      id={id}
      className={[
        "mx-auto w-full max-w-[1410px] px-dzq-space-6 py-[clamp(80px,12vw,160px)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto flex w-full max-w-[1255px] flex-col items-start gap-dzq-space-9 md:flex-row md:items-start md:justify-center md:gap-[clamp(48px,9vw,128px)]">
        <h2
          ref={leftRef}
          className="m-0 w-full font-dzq-display text-[clamp(28px,4vw,36px)] font-dzq-medium leading-tight tracking-tight text-dzq-fg-1 will-change-transform md:w-[411px] md:shrink-0"
        >
          {headingLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div
          ref={rightRef}
          className="w-full text-[clamp(18px,2vw,24px)] leading-snug text-[#334155] will-change-transform md:max-w-[716px]"
        >
          {rightText
            .split(/\n{2,}/)
            .filter((p) => p.trim().length > 0)
            .map((paragraph, i) => (
              <p key={i} className="m-0 mb-[1em] last:mb-0">
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}
