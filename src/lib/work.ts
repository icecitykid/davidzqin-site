export const CASE_SLUGS = ["athletehq", "aightbet", "shopify"] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

/** Case study URL — must match `src/app/work/[slug]/page.tsx` static params. */
export function workHref(slug: CaseSlug): string {
  return `/work/${slug}`;
}

export const TITLES: Record<CaseSlug, string> = {
  athletehq: "Nike AthleteHQ",
  aightbet: "AightBet",
  shopify: "Shopify Logistics Config Manager",
};

export function isCaseSlug(slug: string): slug is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(slug);
}

export function getCaseStudyTitle(slug: CaseSlug): string {
  return TITLES[slug];
}
