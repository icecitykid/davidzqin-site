import type { ComponentType } from "react";
import { ArtAightBet } from "@/components/art/ArtAightBet";
import { ArtAthleteHQ } from "@/components/art/ArtAthleteHQ";
import { ArtShopify } from "@/components/art/ArtShopify";
import { CASE_SLUGS, TITLES, type CaseSlug } from "./work";

/**
 * Co-located content for case study detail pages.
 *
 * Slug identity, URL routing, and human-readable titles live in
 * `./work.ts` (single source of truth). This module imports those and
 * extends each slug with long-form narrative content used by
 * `src/app/work/[slug]/page.tsx`.
 */

export type CaseStudyMedia = {
  src: string;
  type: "image" | "video";
  /** Poster frame for video media. */
  poster?: string;
  alt: string;
};

export type CaseStudySection = {
  /** Short label above the section heading (e.g. "Problem"). */
  kicker: string;
  paragraph: string;
  /** Pull-quote style closer for the section. */
  punchline: string;
  media: CaseStudyMedia[];
};

export type CaseStudyLearning = {
  /** Short tag (e.g. "01", "Craft", "Process"). */
  label: string;
  headline: string;
  body?: string;
};

/** Content for the homepage CaseCard tied to this slug. */
export type CaseStudyCard = {
  /** Right-side meta line, e.g. "2024 · Nike Valiant Labs". */
  year: string;
  /** Right-aligned summary in the meta strip below the card. */
  description: string;
  /** Big headline shown in the hover overlay. */
  overlayTitle: string;
  /** Sub-line shown beneath the overlay headline. */
  overlayDescription: string;
};

/** Sticky nav item for the GSAP “immersive” case layout (`AthleteHQImmersive`). */
export type CaseStudyImmersiveNavItem = {
  readonly id: string;
  readonly label: string;
};

export type CaseStudyImmersivePhone = {
  readonly src: string;
  readonly alt: string;
};

export type CaseStudyImmersiveStatement = {
  readonly id: string;
  readonly leftText: string;
  /** Use blank lines (`\n\n`) for multiple paragraphs. */
  readonly rightText: string;
};

export type CaseStudyImmersiveStat = {
  readonly endValue: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly trailingText?: string;
  readonly descriptor: string;
  readonly duration?: number;
};

/**
 * Full-bleed hero + phone grid + statement blocks + stat grid (AthleteHQ).
 * When present on a `CaseStudy`, `[slug]/page` renders `AthleteHQImmersive`
 * instead of the default `CaseHero` / `CaseSection` template.
 */
export type CaseStudyImmersiveLayout = {
  readonly nav: readonly CaseStudyImmersiveNavItem[];
  readonly hero: {
    readonly backgroundSrc: string;
    readonly backgroundAlt: string;
  };
  /** `id` on the spacer `<div />` after the hero (first scroll target). */
  readonly introAnchorId: string;
  readonly phoneTrioAnchorId: string;
  readonly resultsAnchorId: string;
  readonly phones: readonly [
    CaseStudyImmersivePhone,
    CaseStudyImmersivePhone,
    CaseStudyImmersivePhone,
  ];
  readonly statements: readonly CaseStudyImmersiveStatement[];
  readonly stats: readonly CaseStudyImmersiveStat[];
};

export type CaseStudy = {
  slug: CaseSlug;
  /** Inherited from `TITLES` in `./work.ts`; convenience for renderers. */
  title: string;
  tagline: string;
  heroParagraph: string;
  role: string[];
  company: string;
  heroMedia: CaseStudyMedia;
  sections: CaseStudySection[];
  learnings: CaseStudyLearning[];
  team: string[];
  /** Homepage CaseCard content. Edits here propagate to `/`. */
  card: CaseStudyCard;
  /** Optional GSAP-driven layout; see `CaseStudyImmersiveLayout`. */
  immersive?: CaseStudyImmersiveLayout;
};

const EMPTY_MEDIA: CaseStudyMedia = { src: "", type: "image", alt: "" };

export const CASE_STUDIES: Record<CaseSlug, CaseStudy> = {
  athletehq: {
    slug: "athletehq",
    title: TITLES.athletehq,
    tagline:
      "Building Nike Sport Marketing’s first system for knowing its athletes.",
    heroParagraph: "",
    role: [],
    company: "",
    heroMedia: EMPTY_MEDIA,
    sections: [],
    learnings: [],
    team: [
      "Nike Valiant Labs / Advanced Innovation Collective",
      "Nike Sports Marketing",
      "Nike Sport Research Lab",
    ],
    card: {
      year: "2024 · Nike Valiant Labs",
      description:
        "An athlete app for Nike athletes to tell their untold stories + a real-time database to match them to the right Nike moment.",
      overlayTitle:
        "An athlete app for Nike athletes to tell their untold stories.",
      overlayDescription:
        "Plus a real-time database that matches them to the right Nike moment.",
    },
    immersive: {
      nav: [
        { id: "intro", label: "Overview" },
        { id: "phone-trio", label: "Design" },
        { id: "results", label: "Results" },
      ],
      hero: {
        backgroundSrc: "/assets/work/athletehq-landing.png",
        backgroundAlt: "",
      },
      introAnchorId: "intro",
      phoneTrioAnchorId: "phone-trio",
      resultsAnchorId: "results",
      phones: [
        {
          src: "/assets/work/athletehq-landing.png",
          alt: "AthleteHQ landing screen",
        },
        {
          src: "/assets/work/athletehq-profile-1-1.png",
          alt: "AthleteHQ profile screen",
        },
        {
          src: "/assets/work/athletehq-profile-3.png",
          alt: "AthleteHQ profile interstitial",
        },
      ],
      statements: [
        {
          id: "statement-1",
          leftText: "Seen as a whole individual — beyond just a performer",
          rightText: `Athletes wanted to be seen as whole people, not just as performance. Sports Marketing needed visibility they'd never had.

The app onboards an athlete in under 3 minutes — replacing a 45-minute Airtable intake — and surfaces the identity, interests, and goals that make matching possible.`,
        },
        {
          id: "statement-2",
          leftText: "Right athlete. Right moment. Right opportunity.",
          rightText:
            "Sport reps needed to find the right athlete for the right moment without paging through spreadsheets. Live dashboards, filter, and real-time polls replaced weeks of manual briefs.",
        },
        {
          id: "statement-3",
          leftText: "Beyond the swoosh.",
          rightText:
            "Beyond MVP, I worked with another Senior Designer to help envision what athlete-led commerce could look like — athlete picks, personal stories, and fundraisers stitched into the shopping experience. It gave Sports Marketing a north star to point engineering and leadership toward.",
        },
      ],
      stats: [
        {
          endValue: 3,
          decimals: 0,
          suffix: " min",
          descriptor: "Time to Onboard",
        },
        {
          endValue: 100,
          decimals: 0,
          suffix: "%",
          trailingText: "complete",
          descriptor: "Key Profile Data",
        },
        {
          endValue: 72,
          decimals: 0,
          suffix: "%",
          descriptor: "First Week Engagement",
        },
        {
          endValue: 4.7,
          decimals: 1,
          suffix: "/5",
          descriptor: "Athlete Satisfaction",
        },
      ],
    },
  },
  aightbet: {
    slug: "aightbet",
    title: TITLES.aightbet,
    tagline: "",
    heroParagraph: "",
    role: [],
    company: "",
    heroMedia: EMPTY_MEDIA,
    sections: [],
    learnings: [],
    team: [],
    card: {
      year: "2025 · Vibe Coded",
      description:
        "A social betting app that turns casual trash talk into structured bets with real outcomes.",
      overlayTitle:
        "Turn casual trash talk into structured bets with real outcomes.",
      overlayDescription:
        "A social betting app for friends. Built solo on weekends.",
    },
  },
  shopify: {
    slug: "shopify",
    title: TITLES.shopify,
    tagline: "",
    heroParagraph: "",
    role: [],
    company: "",
    heroMedia: EMPTY_MEDIA,
    sections: [],
    learnings: [],
    team: [],
    card: {
      year: "2022 · Shopify",
      description:
        "Redesign for Shopify Logistics’ warehouse robot configuration tool.",
      overlayTitle: "Warehouse robot configuration, redesigned.",
      overlayDescription:
        "Turning a dense engineer-only tool into something ops teams could run without fear.",
    },
  },
};

/**
 * Slug → art component for the homepage CaseCard. Kept separate from
 * `CASE_STUDIES` so the data record stays serialisable; consumers render
 * with `<Art />` to instantiate fresh per card.
 */
export const CASE_ART: Record<CaseSlug, ComponentType> = {
  athletehq: ArtAthleteHQ,
  aightbet: ArtAightBet,
  shopify: ArtShopify,
};

/**
 * Typed lookup. Accepts a narrowed `CaseSlug` (callers should validate
 * untrusted input via `isCaseSlug` from `./work.ts` first) and returns the
 * matching `CaseStudy` with its `slug` field narrowed to the literal type.
 */
export function getCaseStudy<S extends CaseSlug>(
  slug: S,
): CaseStudy & { slug: S } {
  return CASE_STUDIES[slug] as CaseStudy & { slug: S };
}

/**
 * Iteration helper that preserves the canonical order from `CASE_SLUGS`.
 */
export function listCaseStudies(): readonly CaseStudy[] {
  return CASE_SLUGS.map((slug) => CASE_STUDIES[slug]);
}
