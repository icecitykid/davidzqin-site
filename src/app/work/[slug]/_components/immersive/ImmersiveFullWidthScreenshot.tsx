"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudyImmersiveMedia } from "@/lib/case-studies";
import { ImmersiveMedia } from "./ImmersiveMedia";

type Props = {
  id?: string;
  aspect?: string;
  media: CaseStudyImmersiveMedia;
};

export function ImmersiveFullWidthScreenshot({
  id,
  aspect = "1412/1004",
  media,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = frameRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="mx-auto w-full max-w-[1412px] scroll-mt-[72px] px-dzq-space-6 py-dzq-space-9"
    >
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden rounded-[60px] will-change-transform after:pointer-events-none after:absolute after:inset-0 after:rounded-[60px] after:ring-1 after:ring-inset after:ring-slate-100"
        style={{ aspectRatio: aspect }}
      >
        <ImmersiveMedia
          media={media}
          sizes="(max-width: 1280px) 100vw, 1412px"
        />
      </div>
    </section>
  );
}
