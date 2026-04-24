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
};

const EMPTY_MEDIA: CaseStudyMedia = { src: "", type: "image", alt: "" };

export const CASE_STUDIES: Record<CaseSlug, CaseStudy> = {
  athletehq: {
    slug: "athletehq",
    title: TITLES.athletehq,
    tagline: "",
    heroParagraph: "",
    role: [],
    company: "",
    heroMedia: EMPTY_MEDIA,
    sections: [],
    learnings: [],
    team: [],
    card: {
      year: "2024 · Nike Valiant Labs",
      description:
        "An athlete app for Nike athletes to tell their untold stories + a real-time database to match them to the right Nike moment.",
      overlayTitle:
        "An athlete app for Nike athletes to tell their untold stories.",
      overlayDescription:
        "Plus a real-time database that matches them to the right Nike moment.",
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
