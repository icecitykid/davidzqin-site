"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudyImmersiveLayout } from "@/lib/case-studies";
import { ImmersiveResultsStats } from "./ImmersiveResultsStats";
import { ImmersiveStatementSection } from "./ImmersiveStatementSection";
import { ImmersiveStickyNav } from "./ImmersiveStickyNav";

type Props = {
  layout: CaseStudyImmersiveLayout;
  title: string;
};

export function AthleteHQImmersive({ layout, title }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);

  const phoneTrioRef = useRef<HTMLElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);

  const [phoneA, phoneB, phoneC] = layout.phones;

  useGSAP(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const isMobile = window.matchMedia("(max-width: 767.98px)").matches;

      if (!isMobile) {
        gsap.to(heroBgRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        heroLogoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );

      const phones = [
        phoneLeftRef.current,
        phoneCenterRef.current,
        phoneRightRef.current,
      ];

      if (isMobile) {
        gsap.fromTo(
          phones,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: phoneTrioRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      } else {
        const sidePhones = [phoneLeftRef.current, phoneRightRef.current];

        gsap.set(phones, { opacity: 0 });
        gsap.set(sidePhones, { y: 80 });

        const phoneTrioTl = gsap.timeline({
          scrollTrigger: {
            trigger: phoneTrioRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        });

        phoneTrioTl.to(phones, { opacity: 1, duration: 0.3 }, 0);
        phoneTrioTl.to(sidePhones, { y: 0, duration: 1 }, 0);
      }
    }
  });

  return (
    <>
      {/* Outside transformed wrapper so `position: fixed` on the nav is viewport-relative */}
      <ImmersiveStickyNav sections={layout.nav} />

      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-dzq-bg">
      <section
        ref={heroRef}
        id="hero"
        className="relative h-screen w-full overflow-hidden bg-dzq-bg-dark"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-x-0 top-0 h-[130%] will-change-transform"
        >
          <Image
            src={layout.hero.backgroundSrc}
            alt={layout.hero.backgroundAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </div>

        <div
          ref={heroLogoRef}
          className="absolute inset-x-0 bottom-[20%] flex justify-center px-dzq-space-6 will-change-transform"
        >
          <h1 className="m-0 text-center font-dzq-display text-[clamp(48px,8vw,96px)] font-dzq-medium leading-none tracking-tight text-white">
            {title}
          </h1>
        </div>
      </section>

      <div id={layout.introAnchorId} className="scroll-mt-[72px]" />

      <section
        ref={phoneTrioRef}
        id={layout.phoneTrioAnchorId}
        className="mx-auto w-full max-w-[1200px] scroll-mt-[72px] px-dzq-space-6 py-[120px]"
      >
        <div className="grid grid-cols-1 gap-dzq-space-6 md:grid-cols-3">
          <div
            ref={phoneLeftRef}
            className="relative aspect-[440/872] overflow-hidden rounded-dzq-radius-xl border border-dzq-border-hl bg-dzq-bg-card will-change-transform"
          >
            <Image
              src={phoneA.src}
              alt={phoneA.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>

          <div
            ref={phoneCenterRef}
            className="relative aspect-[440/872] overflow-hidden rounded-dzq-radius-xl border border-dzq-border-hl bg-dzq-bg-card will-change-transform"
          >
            <Image
              src={phoneB.src}
              alt={phoneB.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>

          <div
            ref={phoneRightRef}
            className="relative aspect-[440/872] overflow-hidden rounded-dzq-radius-xl border border-dzq-border-hl bg-dzq-bg-card will-change-transform"
          >
            <Image
              src={phoneC.src}
              alt={phoneC.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {layout.statements.map((s) => (
        <ImmersiveStatementSection
          key={s.id}
          id={s.id}
          layout="50/50"
          leftText={s.leftText}
          rightText={s.rightText}
        />
      ))}

      <ImmersiveResultsStats
        stats={layout.stats}
        sectionId={layout.resultsAnchorId}
      />
      </div>
    </>
  );
}
