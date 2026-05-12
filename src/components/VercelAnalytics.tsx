"use client";

import dynamic from "next/dynamic";

/**
 * Loads Vercel Web Analytics only in the browser. Keeping it out of the
 * server bundle avoids intermittent dev/prod errors where Webpack resolves a
 * missing `./vendor-chunks/@vercel.js` next to route chunks after cache/HMR drift.
 */
const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
  { ssr: false },
);

export function VercelAnalytics() {
  return <Analytics />;
}
