import type { CaseSlug } from "./work";

/**
 * Case study slugs that sit behind the password wall. Add a slug here to gate
 * it; the route stays protected by `src/middleware.ts` until a visitor unlocks
 * it with the shared password (`CASE_STUDY_PASSWORD`).
 */
export const PROTECTED_CASE_SLUGS: readonly CaseSlug[] = ["shopify"] as const;

export function isProtectedCase(slug: string): slug is CaseSlug {
  return (PROTECTED_CASE_SLUGS as readonly string[]).includes(slug);
}

const UNLOCK_COOKIE_PREFIX = "cs_unlock_";

/** Per-slug cookie name so unlocking one case study doesn't unlock others. */
export function unlockCookieName(slug: string): string {
  return `${UNLOCK_COOKIE_PREFIX}${slug}`;
}
