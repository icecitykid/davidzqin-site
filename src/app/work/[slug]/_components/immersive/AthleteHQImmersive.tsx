"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type {
  CaseStudyImmersiveLayout,
  CaseStudyImmersiveScene,
} from "@/lib/case-studies";
import type { CaseSlug } from "@/lib/work";
import { ImmersiveFullWidthScreenshot } from "./ImmersiveFullWidthScreenshot";
import { ImmersiveIntro } from "./ImmersiveIntro";
import { ImmersiveMedia } from "./ImmersiveMedia";
import { ImmersiveNextProject } from "./ImmersiveNextProject";
import { ImmersivePhoneRow } from "./ImmersivePhoneRow";
import { ImmersiveStatementSection } from "./ImmersiveStatementSection";
import { ImmersiveStats } from "./ImmersiveStats";
import { ImmersiveStickyNav } from "./ImmersiveStickyNav";

type Props = {
  layout: CaseStudyImmersiveLayout;
  title: string;
  slug: CaseSlug;
};

function SceneRenderer({ scene }: { scene: CaseStudyImmersiveScene }) {
  switch (scene.kind) {
    case "phone-row":
      return (
        <ImmersivePhoneRow
          id={scene.id}
          aspect={scene.aspect}
          media={scene.media}
        />
      );
    case "statement":
      return (
        <ImmersiveStatementSection
          id={scene.id}
          leftText={scene.leftText}
          rightText={scene.rightText}
        />
      );
    case "full-width-screenshot":
      return (
        <ImmersiveFullWidthScreenshot
          id={scene.id}
          aspect={scene.aspect}
          media={scene.media}
        />
      );
    case "full-bleed-desktop":
      return (
        <section
          id={scene.id}
          className="relative w-full scroll-mt-[72px] py-dzq-space-9"
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "1728 / 1190" }}
          >
            <ImmersiveMedia
              media={scene.media}
              sizes="100vw"
            />
            {(scene.captionTitle || scene.captionBody) && (
              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-dzq-content px-dzq-space-6 py-dzq-space-9 text-white">
                {scene.captionTitle && (
                  <h3 className="m-0 font-dzq-display text-dzq-2xl font-dzq-medium leading-tight tracking-tight">
                    {scene.captionTitle}
                  </h3>
                )}
                {scene.captionBody && (
                  <p className="mt-dzq-space-3 max-w-[640px] text-dzq-lg leading-snug">
                    {scene.captionBody}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      );
    case "phase-2-vision":
      return (
        <section
          id={scene.id}
          className="relative w-full scroll-mt-[72px] py-dzq-space-9"
        >
          <div
            className="relative w-full overflow-hidden bg-[#0c0c0c]"
            style={{ aspectRatio: "1920 / 1080" }}
          >
            <div
              className="absolute left-1/2 top-1/2 flex w-[clamp(280px,28vw,410px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[36px]"
              style={{ aspectRatio: "410 / 888" }}
            >
              <Image
                src={scene.phoneSrc}
                alt={scene.phoneAlt}
                fill
                sizes="(max-width: 768px) 60vw, 410px"
                className="object-cover"
              />
              {(scene.eyebrow || scene.headline || scene.quote) && (
                <div className="absolute inset-x-[6.4%] bottom-[6.4%] flex flex-col gap-[clamp(8px,1vw,12px)] text-white">
                  {scene.eyebrow && (
                    <p className="m-0 text-[16px] font-dzq-medium leading-[1.5]">
                      {scene.eyebrow}
                    </p>
                  )}
                  {scene.headline && (
                    <p className="m-0 text-[24px] font-dzq-medium leading-[1.2]">
                      {scene.headline}
                    </p>
                  )}
                  {scene.quote && (
                    <p className="m-0 text-[16px] font-dzq-regular leading-[1.4] text-[#B2B2B2]">
                      {scene.quote}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      );
  }
}

export function AthleteHQImmersive({ layout, title, slug }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroLockupRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      heroLockupRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    );
  });

  return (
    <>
      {/* Outside transformed wrapper so the nav is viewport-fixed. */}
      <ImmersiveStickyNav sections={layout.nav} />

      {/* Full-bleed wrapper that breaks out of `.page`'s 40px padding. */}
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
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          </div>

          <div
            ref={heroLockupRef}
            className="absolute inset-x-0 top-[40%] flex -translate-y-1/2 items-center justify-center gap-dzq-space-6 px-dzq-space-6 will-change-transform"
          >
            {layout.hero.logoSrc && (
              <Image
                src={layout.hero.logoSrc}
                alt={layout.hero.logoAlt ?? ""}
                width={layout.hero.logoWidth ?? 142}
                height={layout.hero.logoHeight ?? 143}
                className="h-[clamp(56px,9vw,143px)] w-auto"
                priority
              />
            )}
            <h1 className="m-0 font-dzq-display text-[clamp(48px,8vw,96px)] font-dzq-medium leading-none tracking-tight text-white">
              {title}
            </h1>
          </div>
        </section>

        {layout.intro && (
          <ImmersiveIntro id={layout.introAnchorId} intro={layout.intro} />
        )}

        {layout.scenes.map((scene, i) => (
          <SceneRenderer key={scene.id ?? i} scene={scene} />
        ))}

        <ImmersiveStats id={layout.resultsAnchorId} stats={layout.stats} />

        {layout.nextProject && (
          <ImmersiveNextProject
            currentSlug={slug}
            next={layout.nextProject}
          />
        )}
      </div>
    </>
  );
}
