/**
 * Password-wall primitives for gated case studies.
 *
 * Everything here is Edge-runtime safe (Web Crypto only, no Node APIs) so it
 * can run inside `src/middleware.ts` as well as in server actions.
 *
 * The unlock cookie never stores the password. Instead it holds an HMAC token
 * bound to the slug and keyed by the current password, so rotating
 * `CASE_STUDY_PASSWORD` instantly invalidates every previously issued cookie.
 */

const encoder = new TextEncoder();

function getPassword(): string | null {
  return process.env.CASE_STUDY_PASSWORD ?? null;
}

async function hmacHex(message: string, key: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(message),
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time string comparison to avoid leaking length/timing info. */
function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

/** Whether a password is configured at all (used to surface setup errors). */
export function isUnlockConfigured(): boolean {
  return getPassword() !== null;
}

/** Deterministic unlock token for a slug, or `null` if no password is set. */
export async function createUnlockToken(slug: string): Promise<string | null> {
  const password = getPassword();
  if (!password) return null;
  return hmacHex(`unlock:${slug}`, password);
}

export async function verifyUnlockToken(
  slug: string,
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const expected = await createUnlockToken(slug);
  if (!expected) return false;
  return timingSafeEqual(token, expected);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const password = getPassword();
  if (!password) return false;
  return timingSafeEqual(candidate, password);
}
