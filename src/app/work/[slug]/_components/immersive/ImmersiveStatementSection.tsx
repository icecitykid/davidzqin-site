"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type ImmersiveStatementSectionProps = {
  id?: string;
  /** Short headline (~3–6 words). */
  leftText: string;
  /** Longer explanation. Blank lines (\n\n) break paragraphs. */
  rightText: string;
  /** Column split. Currently only "50/50" is supported. */
  layout?: "50/50";
  className?: string;
};

export function ImmersiveStatementSection({
  id,
  leftText,
  rightText,
  layout = "50/50",
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

  const columnsClass = layout === "50/50" ? "md:grid-cols-2" : "md:grid-cols-2";

  return (
    <section
      ref={rootRef}
      id={id}
      className={[
        "mx-auto w-full max-w-dzq-content px-dzq-space-6 py-dzq-space-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={`grid grid-cols-1 items-start gap-dzq-space-10 ${columnsClass}`}
      >
        <h2
          ref={leftRef}
          className="m-0 font-dzq-display text-dzq-2xl font-dzq-medium leading-tight tracking-tight text-dzq-fg-1 will-change-transform"
        >
          {leftText}
        </h2>

        <div
          ref={rightRef}
          className="text-dzq-lg leading-snug text-dzq-fg-2 will-change-transform"
        >
          {rightText
            .split(/\n{2,}/)
            .filter((p) => p.trim().length > 0)
            .map((paragraph, i) => (
              <p key={i} className="m-0 mb-dzq-space-5 last:mb-0">
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}
