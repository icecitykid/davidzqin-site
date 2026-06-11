import { NextResponse, type NextRequest } from "next/server";
import { verifyUnlockToken } from "@/lib/case-auth";
import { isProtectedCase, unlockCookieName } from "@/lib/protected-cases";

/**
 * Gate protected case studies. A locked `/work/<slug>` request is rewritten to
 * the unlock screen so the protected page is never sent to the browser until a
 * valid unlock cookie is present. The URL stays on `/work/<slug>`.
 */
export async function middleware(req: NextRequest) {
  const match = req.nextUrl.pathname.match(/^\/work\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const slug = match[1];
  if (!isProtectedCase(slug)) return NextResponse.next();

  const token = req.cookies.get(unlockCookieName(slug))?.value;
  if (await verifyUnlockToken(slug, token)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/work/${slug}/unlock`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/work/:slug",
};
