"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createUnlockToken,
  isUnlockConfigured,
  verifyPassword,
} from "@/lib/case-auth";
import { isProtectedCase, unlockCookieName } from "@/lib/protected-cases";

export type UnlockState = { error: string | null };

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function unlockAction(
  _prevState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const slug = String(formData.get("slug") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isProtectedCase(slug)) {
    return { error: "Unknown case study." };
  }

  if (!isUnlockConfigured()) {
    return { error: "Password access isn't configured yet." };
  }

  if (!(await verifyPassword(password))) {
    return { error: "Incorrect password. Please try again." };
  }

  const token = await createUnlockToken(slug);
  if (!token) {
    return { error: "Password access isn't configured yet." };
  }

  const cookieStore = await cookies();
  cookieStore.set(unlockCookieName(slug), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  redirect(`/work/${slug}`);
}
