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

/** Sticky nav item for the GSAP "immersive" case layout. */
export type CaseStudyImmersiveNavItem = {
  readonly id: string;
  readonly label: string;
};

/** Image or video used inside an immersive scene. */
export type CaseStudyImmersiveMedia = {
  readonly src: string;
  readonly type: "image" | "video";
  /** Poster frame for `type: "video"`. */
  readonly poster?: string;
  readonly alt: string;
  /**
   * Override `object-fit`. Defaults to `"cover"`. Use `"contain"` for assets
   * whose native aspect ratio doesn't match the frame so they letterbox
   * instead of cropping.
   */
  readonly objectFit?: "cover" | "contain";
};

/** Discriminated union of all scene shapes the immersive layout supports. */
export type CaseStudyImmersiveScene =
  | {
      readonly kind: "phone-row";
      /** Optional anchor id (used for sticky-nav targets like `phone-trio`). */
      readonly id?: string;
      /** CSS aspect ratio for each phone frame, e.g. `"440/872"` or `"375/812"`. */
      readonly aspect?: string;
      readonly media: readonly CaseStudyImmersiveMedia[];
    }
  | {
      readonly kind: "statement";
      readonly id: string;
      readonly leftText: string;
      /** Use blank lines (`\n\n`) for multiple paragraphs. */
      readonly rightText: string;
    }
  | {
      readonly kind: "full-width-screenshot";
      readonly id?: string;
      readonly aspect?: string;
      readonly media: CaseStudyImmersiveMedia;
    }
  | {
      readonly kind: "full-bleed-desktop";
      readonly id?: string;
      readonly media: CaseStudyImmersiveMedia;
      readonly captionTitle?: string;
      readonly captionBody?: string;
    };

export type CaseStudyImmersiveStat = {
  readonly label: string;
  readonly endValue: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly trailingText?: string;
  readonly description: string;
  readonly duration?: number;
};

export type CaseStudyImmersiveLink = {
  readonly label: string;
  readonly href: string;
};

export type CaseStudyImmersiveIntro = {
  readonly title: string;
  readonly subtitle: string;
  readonly role: readonly string[];
  readonly company: string;
  readonly readMore?: CaseStudyImmersiveLink;
};

export type CaseStudyImmersiveStats = {
  readonly team: readonly string[];
  readonly items: readonly CaseStudyImmersiveStat[];
  readonly readMore?: CaseStudyImmersiveLink;
};

export type CaseStudyImmersiveHero = {
  readonly backgroundSrc: string;
  readonly backgroundAlt: string;
  /** Optional logo glyph rendered next to the title in a horizontal lockup. */
  readonly logoSrc?: string;
  readonly logoAlt?: string;
  readonly logoWidth?: number;
  readonly logoHeight?: number;
};

export type CaseStudyImmersiveNextProject = {
  /** Eyebrow text above the wordmark; defaults to "Next project". */
  readonly eyebrow?: string;
  readonly logoSrc: string;
  readonly logoAlt: string;
  readonly logoWidth: number;
  readonly logoHeight: number;
};

/**
 * Full-bleed hero + intro + ordered scenes + stats + next-project.
 * When present on a `CaseStudy`, `[slug]/page` renders `AthleteHQImmersive`
 * instead of the default `CaseHero` / `CaseSection` template.
 */
export type CaseStudyImmersiveLayout = {
  readonly nav: readonly CaseStudyImmersiveNavItem[];
  readonly hero: CaseStudyImmersiveHero;
  /** Sticky-nav scroll targets — must match `nav[].id`. */
  readonly introAnchorId: string;
  readonly designAnchorId: string;
  readonly resultsAnchorId: string;
  readonly intro?: CaseStudyImmersiveIntro;
  readonly scenes: readonly CaseStudyImmersiveScene[];
  readonly stats: CaseStudyImmersiveStats;
  readonly nextProject?: CaseStudyImmersiveNextProject;
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

/** Long-form deck used by every Read More button on the AthleteHQ case. */
const ATHLETEHQ_DECK_HREF = "https://www.figma.com/deck/Ochn7B9rnOy3v0MXV13too";

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
        logoSrc: "/assets/davidzqin.com/ahq-graphic-logo-2.png",
        logoAlt: "AthleteHQ logo",
        logoWidth: 142,
        logoHeight: 143,
      },
      introAnchorId: "intro",
      designAnchorId: "phone-trio",
      resultsAnchorId: "results",
      intro: {
        title:
          "Building Nike Sport Marketing’s first system for knowing its athletes.",
        // Figma deliberately splits the body into two paragraphs.
        subtitle: `Nike signs 10,000 athletes but only meaningfully engages 5% of them. Sports Marketing was running a 20-year-old process of phone calls and spreadsheets with no real-time data, no way to match athletes to opportunities, and no direct line to the athletes themselves.

I led end-to-end designs on a new system — an athlete-facing mobile app, an internal web and mobile portal for Sports Marketing, and the long-term vision for a consumer product. The MVP shipped during the 2024 Track and Field World Championships.`,
        role: [
          "Product Design",
          "Prototyping",
          "Data Visualization",
          "Product Strategy",
          "User Research",
        ],
        company: "Nike, Valiant Labs",
        readMore: { label: "Full Case Study", href: ATHLETEHQ_DECK_HREF },
      },
      scenes: [
        {
          kind: "phone-row",
          id: "phone-trio",
          aspect: "440/872",
          media: [
            {
              src: "/assets/davidzqin.com/landing-screen-1.png",
              type: "image",
              alt: "AthleteHQ landing screen",
            },
            {
              src: "/assets/davidzqin.com/2-profile-interstitial-1-1.png",
              type: "image",
              alt: "Athlete profile interstitial — interests",
            },
            {
              src: "/assets/davidzqin.com/2-profile-interstitial-3.png",
              type: "image",
              alt: "Athlete profile interstitial — identity",
            },
          ],
        },
        {
          kind: "statement",
          id: "statement-1",
          leftText: "Seen as a whole individual - beyond just a performer",
          rightText: `Athletes wanted to be seen as whole people, not just as performance. Sports Marketing needed visibility they'd never had.

The app onboards an athlete in under 3 minutes — replacing a 45-minute Airtable intake — and surfaces the identity, interests, and goals that make matching possible.`,
        },
        {
          kind: "phone-row",
          id: "scene-onboarding",
          aspect: "440/872",
          media: [
            {
              src: "/assets/onboarding-screen-recording.mov",
              type: "video",
              alt: "Athlete onboarding screen recording",
            },
            {
              src: "/assets/davidzqin.com/0-b-value-prop.png",
              type: "image",
              alt: "Onboarding — connect to Nike services",
            },
            {
              src: "/assets/davidzqin.com/4-sport.png",
              type: "image",
              alt: "Onboarding — choose your sport",
            },
            {
              src: "/assets/davidzqin.com/7-relevant-community-screen.png",
              type: "image",
              alt: "Onboarding — relevant community screen",
              objectFit: "contain",
            },
          ],
        },
        {
          kind: "statement",
          id: "statement-2",
          leftText: "Right athlete.\nRight moment.\nRight opportunity.",
          rightText:
            "Sport reps needed to find the right athlete for the right moment without paging through spreadsheets. Live dashboards, filter, and real-time polls replaced weeks of manual briefs.",
        },
        {
          kind: "phone-row",
          id: "scene-sport-rep",
          aspect: "440/872",
          media: [
            {
              src: "/assets/sport-rep-landing-screen-recording.mov",
              type: "video",
              alt: "Sport rep portal landing screen recording",
            },
            {
              src: "/assets/davidzqin.com/sport-rep-mobile-1-1.png",
              type: "image",
              alt: "Sport rep mobile — athlete dashboard",
            },
            {
              src: "/assets/davidzqin.com/sport-rep-mobile-2-1.png",
              type: "image",
              alt: "Sport rep mobile — quick poll",
            },
          ],
        },
        {
          kind: "full-width-screenshot",
          id: "scene-webapp",
          aspect: "1412/1004",
          media: {
            src: "/assets/davidzqin.com/webapp-profile-2.png",
            type: "image",
            alt: "Sport rep web app — athlete profile view",
          },
        },
        {
          kind: "statement",
          id: "statement-3",
          leftText: "Beyond the swoosh.",
          rightText:
            "Beyond MVP, I worked with another Senior Designer to help envision what athlete-led commerce could look like — athlete picks, personal stories, and fundraisers stitched into the shopping experience. It gave Sports Marketing a north star to point engineering and leadership toward.",
        },
        {
          kind: "full-bleed-desktop",
          id: "scene-vision",
          media: {
            src: "/assets/davidzqin.com/athletehq-phase-2-vision.png",
            type: "image",
            alt: "Athlete HQ Phase 2 vision — athlete-led commerce concept",
          },
        },
        {
          kind: "phone-row",
          id: "scene-nikeapp",
          aspect: "375/812",
          media: [
            {
              src: "/assets/davidzqin.com/nike-app-onboarding.png",
              type: "image",
              alt: "Nike app concept — athlete onboarding",
            },
            {
              src: "/assets/davidzqin.com/nike-app-stories-content-title-cards-text-below.png",
              type: "image",
              alt: "Nike app concept — athlete stories",
            },
            {
              src: "/assets/davidzqin.com/nike-app-onboarding-1.png",
              type: "image",
              alt: "Nike app concept — athlete-led commerce",
            },
          ],
        },
      ],
      stats: {
        team: [
          "Nike Valiant Labs / Advanced Innovation Collective",
          "Nike Sports Marketing",
          "Nike Sport Research Lab",
        ],
        items: [
          {
            label: "Time to Onboard",
            endValue: 3,
            decimals: 0,
            suffix: " min",
            description:
              "dropped from a 45-minute Airtable form to under 3 minutes in-app.",
          },
          {
            label: "Key Profile Data",
            endValue: 100,
            decimals: 0,
            suffix: "%",
            trailingText: "complete",
            description:
              "up from 60% completion on the legacy spreadsheet process.",
          },
          {
            label: "First Week Engagement",
            endValue: 72,
            decimals: 0,
            suffix: "%",
            description:
              "72% of invited athletes answered a poll within 7 days of onboarding.",
          },
          {
            label: "Athlete Satisfaction",
            endValue: 4.7,
            decimals: 1,
            suffix: "/5",
            description:
              "4.7 / 5 average rating from athletes on the MVP post-launch.",
          },
        ],
        readMore: { label: "Full Case Study", href: ATHLETEHQ_DECK_HREF },
      },
      nextProject: {
        eyebrow: "Next project",
        logoSrc: "/assets/davidzqin.com/next-project-aightbet-logo.png",
        logoAlt: "AightBet",
        logoWidth: 854,
        logoHeight: 145,
      },
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
