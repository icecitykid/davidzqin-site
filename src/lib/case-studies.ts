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
  },
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
