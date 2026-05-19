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
import { ImmersiveLearnings } from "./ImmersiveLearnings";
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
          radius={scene.radius}
          border={scene.border}
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
                quality={95}
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

/**
 * Renders an immersive case-study page driven by `CaseStudyImmersiveLayout`.
 *
 * Two hero variants are supported:
 * - `"image"` (default, used by AthleteHQ): full-bleed background photo
 *   with parallax + optional logo glyph + title, dark overlay for legibility.
 * - `"dark-with-phones"` (used by AightBet): solid black hero with subtle
 *   cross gridlines and ghosted phone screens at the right; centered
 *   logo + title lockup on top.
 *
 * The results region renders either `layout.learnings` (paragraph block,
 * AightBet) or `layout.stats` (numeric grid + team, AthleteHQ).
 */
export function CaseImmersive({ layout, title, slug }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroLockupRef = useRef<HTMLDivElement>(null);

  const heroVariant = layout.hero.variant ?? "image";
  const isDarkHero = heroVariant === "dark-with-phones";

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    if (!isMobile && heroBgRef.current) {
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

  // Wrapper stays slate-100 across both variants so the body sections
  // (intro, statements, learnings) read as light. The hero section
  // overrides to black for the dark-with-phones variant; the next-project
  // section paints its own black bg at the end.
  const heroSectionBg = isDarkHero ? "bg-black" : "bg-slate-100";
  const heroPhones = layout.hero.heroPhones ?? [];
  const heroPhoneAspect = layout.hero.heroPhoneAspect ?? "293/637";

  return (
    <>
      {/* Outside transformed wrapper so the nav is viewport-fixed. */}
      <ImmersiveStickyNav sections={layout.nav} />

      {/* Full-bleed wrapper that breaks out of `.page`'s 40px padding. */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-slate-100">
        <section
          ref={heroRef}
          id="hero"
          className={`relative h-screen w-full overflow-hidden ${heroSectionBg}`}
        >
          {!isDarkHero && layout.hero.backgroundSrc && (
            <div
              ref={heroBgRef}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={layout.hero.backgroundSrc}
                alt={layout.hero.backgroundAlt ?? ""}
                fill
                priority
                sizes="100vw"
                quality={95}
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-black/40"
                aria-hidden="true"
              />
            </div>
          )}

          {isDarkHero && (
            <>
              {/* Subtle cross gridlines mirroring Figma 4148:1819 (lines
                  338–341 at y=383, y=762, x=442/1287 within a 1728×1128
                  frame ≈ 34/68% horizontal and 26/74% vertical splits). */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute inset-x-0 top-[34%] h-px bg-white/10" />
                <div className="absolute inset-x-0 top-[68%] h-px bg-white/10" />
                <div className="absolute inset-y-0 left-[26%] w-px bg-white/10" />
                <div className="absolute inset-y-0 left-[74%] w-px bg-white/10" />
              </div>

              {heroPhones.length > 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[clamp(16px,4vw,72px)] top-1/2 hidden -translate-y-1/2 gap-[clamp(8px,1vw,16px)] opacity-20 md:flex"
                >
                  {heroPhones.map((m, i) => (
                    <div
                      key={i}
                      className="relative w-[clamp(180px,18vw,293px)] overflow-hidden rounded-[20px]"
                      style={{ aspectRatio: heroPhoneAspect }}
                    >
                      <ImmersiveMedia
                        media={m}
                        sizes="(max-width: 1280px) 25vw, 293px"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div
            ref={heroLockupRef}
            className={`absolute inset-x-0 ${
              isDarkHero ? "top-1/2" : "top-[40%]"
            } flex -translate-y-1/2 items-center justify-center gap-dzq-space-6 px-dzq-space-6 will-change-transform`}
          >
            {layout.hero.logoSrc && (
              <Image
                src={layout.hero.logoSrc}
                alt={layout.hero.logoAlt ?? ""}
                width={layout.hero.logoWidth ?? 142}
                height={layout.hero.logoHeight ?? 143}
                className={`${
                  isDarkHero
                    ? "h-[clamp(48px,7vw,106px)]"
                    : "h-[clamp(56px,9vw,143px)]"
                } w-auto`}
                quality={95}
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

        {layout.learnings ? (
          <ImmersiveLearnings
            id={layout.resultsAnchorId}
            learnings={layout.learnings}
          />
        ) : layout.stats ? (
          <ImmersiveStats id={layout.resultsAnchorId} stats={layout.stats} />
        ) : null}

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
