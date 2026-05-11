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
  /** Summary below title + year on the home card. */
  description: string;
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
      /**
       * Override the per-phone corner radius in px. Defaults to `60` to
       * preserve the original homepage-card / phone-trio look. Set to `40`
       * to match the 4-screen scroll (Figma `4138:1912`) — Figma uses 40px
       * for every chrome-less screen in the AthleteHQ case.
       */
      readonly radius?: number;
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
    }
  | {
      /**
       * Mirrors Figma `Group 613` (4136:4065) — a full-width dark deck-style
       * panel with a single Nike-app phone mockup centered over it. Used for
       * the AthleteHQ Phase 2 vision section.
       */
      readonly kind: "phase-2-vision";
      readonly id?: string;
      readonly phoneSrc: string;
      readonly phoneAlt: string;
      /** Optional eyebrow / headline / quote rendered on top of the phone. */
      readonly eyebrow?: string;
      readonly headline?: string;
      readonly quote?: string;
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
  /** Override the right-column label above `company` (defaults to "Company"). */
  readonly companyLabel?: string;
  readonly readMore?: CaseStudyImmersiveLink;
};

export type CaseStudyImmersiveStats = {
  readonly team: readonly string[];
  readonly items: readonly CaseStudyImmersiveStat[];
  readonly readMore?: CaseStudyImmersiveLink;
};

/**
 * Lightweight alternative to `CaseStudyImmersiveStats` used by case studies
 * whose results section is a list of takeaways rather than a stat grid
 * (e.g. AightBet's "What I learned" block).
 */
export type CaseStudyImmersiveLearnings = {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly readMore?: CaseStudyImmersiveLink;
};

export type CaseStudyImmersiveHero = {
  /**
   * Visual treatment for the hero. `"image"` renders a full-bleed background
   * photo with parallax (AthleteHQ); `"dark-with-phones"` renders a solid
   * black hero with cross gridlines and ghosted phone screens at the right
   * (AightBet). Defaults to `"image"`.
   */
  readonly variant?: "image" | "dark-with-phones";
  /** Required when `variant === "image"`. */
  readonly backgroundSrc?: string;
  readonly backgroundAlt?: string;
  /** Optional logo glyph rendered next to the title in a horizontal lockup. */
  readonly logoSrc?: string;
  readonly logoAlt?: string;
  readonly logoWidth?: number;
  readonly logoHeight?: number;
  /** Used by `variant === "dark-with-phones"` — phones tucked into the hero. */
  readonly heroPhones?: readonly CaseStudyImmersiveMedia[];
  /** CSS aspect ratio for each hero phone, defaults to `293/637`. */
  readonly heroPhoneAspect?: string;
};

export type CaseStudyImmersiveNextProject = {
  /** Eyebrow text above the wordmark; defaults to "Next project". */
  readonly eyebrow?: string;
  /** Image variant — full-width wordmark. */
  readonly logoSrc?: string;
  readonly logoAlt?: string;
  readonly logoWidth?: number;
  readonly logoHeight?: number;
  /** Text variant — rendered when `logoSrc` is omitted. */
  readonly headline?: string;
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
  /**
   * Numeric stat grid (AthleteHQ). Mutually exclusive with `learnings`.
   * Renderers should render `learnings` if present, otherwise `stats`.
   */
  readonly stats?: CaseStudyImmersiveStats;
  /** Takeaways block (AightBet). Mutually exclusive with `stats`. */
  readonly learnings?: CaseStudyImmersiveLearnings;
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

/** Long-form deck used by every Read More button on the AightBet case. */
const AIGHTBET_DECK_HREF = "https://www.figma.com/deck/Q1wjzMaofpDlNdFjDOK1ch";

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
    },
    immersive: {
      nav: [
        { id: "intro", label: "Overview" },
        { id: "phone-trio", label: "Design" },
        { id: "results", label: "Results" },
      ],
      hero: {
        backgroundSrc: "/assets/davidzqin.com/full-bleed-hero.png",
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
        subtitle: `Nike signs 10,000 athletes but only meaningfully engages 5% of them. Sports Marketing was running a 20-year-old process of phone calls and spreadsheets with no real-time data.

I led end-to-end designs on a new system — an athlete-facing mobile app, an internal web and mobile portal for Sports Marketing. The MVP shipped during the 2024 Track and Field World Championships.`,
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
          // Order matches Figma 4138:1872 (Landing → Interstitial-3 →
          // Interstitial-1-1). Updated 2026-05 alongside re-exports of all
          // three screens.
          media: [
            {
              src: "/assets/davidzqin.com/landing-screen-1.png",
              type: "image",
              alt: "AthleteHQ landing screen — Good Morning, Raevyn",
            },
            {
              src: "/assets/davidzqin.com/2-profile-interstitial-3.png",
              type: "image",
              alt: "Athlete profile interstitial — Raevyn's Picks",
            },
            {
              src: "/assets/davidzqin.com/2-profile-interstitial-1-1.png",
              type: "image",
              alt: "Athlete profile interstitial — Concierge milestones",
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
          // Matches Figma `4138:1912` (4-screen scroll): each phone is
          // 393×852 with a 40px corner radius. The earlier `440/872`
          // value was inherited from the phone-trio above (4210:1278) and
          // made the screens read too wide / too rounded vs. design.
          aspect: "393/852",
          radius: 40,
          media: [
            {
              // Re-encoded MP4 derived from the original .mov: cropped to
              // strip the device chrome (bezels/notch/buttons) baked into
              // the source recording, then padded with slate-100 to land at
              // the row's 393/852 wrapper aspect so it visually rhymes
              // with the still phones beside it.
              src: "/assets/davidzqin.com/onboarding-screen-recording.mp4",
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
              // Re-encoded with the same crop+pad treatment as the
              // onboarding video so it sits flush with the surrounding
              // still phones.
              src: "/assets/davidzqin.com/sport-rep-landing-screen-recording.mp4",
              type: "video",
              alt: "Sport rep portal landing screen recording",
            },
            {
              src: "/assets/davidzqin.com/sport-rep-mobile-1-2.png",
              type: "image",
              alt: "Sport rep mobile — Today brief, Celebrating, Your Crew",
            },
            {
              src: "/assets/davidzqin.com/sport-rep-mobile-2-1.png",
              type: "image",
              alt: "Sport rep mobile — Polls feed",
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
          kind: "phase-2-vision",
          id: "scene-vision",
          phoneSrc: "/assets/davidzqin.com/nike-app-onboarding-1.png",
          phoneAlt: "AthleteHQ Phase 2 — athlete-led commerce concept",
          eyebrow: "Runner",
          headline: "Raevyn Rogers",
          quote:
            "There's power in knowing what you're capable of and peace when you channel it. So we keep smiling.",
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
    tagline:
      "Turning group-chat trash talk into real bets you can settle.",
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
    },
    immersive: {
      nav: [
        { id: "intro", label: "Overview" },
        { id: "phone-trio", label: "Design" },
        { id: "results", label: "Results" },
      ],
      hero: {
        variant: "dark-with-phones",
        logoSrc: "/assets/davidzqin.com/aightbet-cap.svg",
        logoAlt: "AightBet logo",
        logoWidth: 172,
        logoHeight: 106,
        heroPhoneAspect: "293/637",
        heroPhones: [
          {
            src: "/assets/davidzqin.com/aightbet-interstitial.png",
            type: "image",
            alt: "AightBet interstitial — bet created confirmation",
          },
          {
            src: "/assets/davidzqin.com/aightbet-home.png",
            type: "image",
            alt: "AightBet home — active bets feed",
          },
          {
            src: "/assets/davidzqin.com/aightbet-bet-details.png",
            type: "image",
            alt: "AightBet bet details — proof and outcome",
          },
        ],
      },
      introAnchorId: "intro",
      designAnchorId: "phone-trio",
      resultsAnchorId: "results",
      intro: {
        title:
          "Turning group-chat trash talk into real bets you can settle.",
        subtitle: `Bets between friends happen constantly: "$20 says you won't do it". They die the same day. No one tracks them, no one settles them, and the only record is a group chat someone will scroll past tomorrow. AightBet turns that into a light structured layer: create the bet, track the outcome, settle up.

I designed and built the MVP solo using Figma + Cursor — a social betting app that sits between BeReal, Venmo, and Kalshi.`,
        role: [
          "Vibe-coding",
          "Product Design",
          "Product Strategy",
          "Prototyping",
          "Creative Direction",
        ],
        company: "Personal Project",
        companyLabel: "Vibe-coded",
        readMore: { label: "Full Case Study", href: AIGHTBET_DECK_HREF },
      },
      scenes: [
        {
          kind: "phone-row",
          id: "phone-trio",
          aspect: "402/874",
          media: [
            {
              src: "/assets/davidzqin.com/aightbet-home.png",
              type: "image",
              alt: "AightBet home — active bets feed",
            },
            {
              src: "/assets/davidzqin.com/aightbet-confirmation.png",
              type: "image",
              alt: "AightBet bet confirmation",
            },
            {
              src: "/assets/davidzqin.com/aightbet-interstitial.png",
              type: "image",
              alt: "AightBet interstitial — bet created",
            },
          ],
        },
        {
          kind: "statement",
          id: "statement-1",
          leftText: "Social, financial, predictive — in one tap.",
          rightText: `Friend bets already sit at the intersection of three behaviours people do every day: social posting, sending money, and making predictions. No single app handles that combination. AightBet's job is to make the bet itself feel as casual as a group-chat reply, while quietly handling the structure underneath.`,
        },
        {
          kind: "phone-row",
          id: "scene-create-flow",
          aspect: "399/873",
          media: [
            {
              src: "/assets/davidzqin.com/aightbet-bet-details.png",
              type: "image",
              alt: "AightBet bet details — what's the bet?",
            },
            {
              src: "/assets/davidzqin.com/aightbet-stake.png",
              type: "image",
              alt: "AightBet stake — set the wager",
            },
            {
              src: "/assets/davidzqin.com/aightbet-participants.png",
              type: "image",
              alt: "AightBet participants — invite friends",
            },
          ],
        },
        {
          kind: "statement",
          id: "statement-2",
          leftText: "Create a bet in fewer taps than writing one.",
          rightText: `The create-bet flow was the hardest part to get right. It had to capture stakes, participants, and a clear resolution condition without feeling like filing a form. I iterated in Figma, pushed the design into Cursor via Figma MCP, and kept tightening the flow until creating a bet felt faster than typing it out in iMessage.`,
        },
        {
          kind: "phone-row",
          id: "scene-create-v1",
          aspect: "486/1011",
          media: [
            {
              src: "/assets/davidzqin.com/aightbet-create-bet-v1.mov",
              type: "video",
              alt: "AightBet create-bet flow — early prototype",
            },
          ],
        },
        {
          kind: "statement",
          id: "statement-3",
          leftText: "One builder, full stack, live prototype.",
          rightText: `I ran product, engineering, and design at once. Figma stayed the source of truth for system decisions; Cursor handled implementation; small features like the image uploader were vibe-coded directly. The real bottleneck wasn't ideation — AI accelerates that — it was the translation layer between tools.`,
        },
        {
          kind: "phone-row",
          id: "scene-create-live",
          aspect: "486/1056",
          media: [
            {
              src: "/assets/davidzqin.com/aightbet-create-bet-live.mov",
              type: "video",
              alt: "AightBet create-bet flow — live build",
            },
          ],
        },
      ],
      learnings: {
        title: "What I learned",
        paragraphs: [
          "AI speeds exploration, not decisions — the hard calls still need human judgment.",
          "Figma stays the anchor — as soon as Cursor became source of truth, decisions got noisy.",
          "Tool translation is the bottleneck — the gap between Figma and code ate more time than either tool alone.",
          "Solo full-stack is a superpower and a trap — you move fast; you also lose the friction that makes you think twice.",
        ],
        readMore: { label: "Full Case Study", href: AIGHTBET_DECK_HREF },
      },
      nextProject: {
        eyebrow: "Next Project",
        headline: "Shopify Fulfilment Config Manager Redesign",
      },
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
