import Link from "next/link";
import type { ReactNode } from "react";
import { CaseStudyChipIcon } from "@/components/CaseStudyChipIcon";

export type CaseCardProps = {
  href: string;
  ariaLabel: string;
  title: string;
  year: string;
  description: string;
  overlayTitle: string;
  overlayDescription: string;
  /** Absolutely-positioned composition that fills the card background */
  art: ReactNode;
};

/**
 * Home-page case study card (initial Next.js port from the static HTML).
 * `.case` panel with a `.frame` art wrapper, hover overlay + "Read case study"
 * chip, and a two-column `.meta` row (title + year on the left, description
 * right-aligned). Scroll-reveal via `data-scroll-reveal` (see `useScrollReveal`).
 */
export function CaseCard({
  href,
  ariaLabel,
  title,
  year,
  description,
  overlayTitle,
  overlayDescription,
  art,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="case"
      aria-label={ariaLabel}
      data-scroll-reveal
    >
      <div className="frame">
        <div className="art">{art}</div>
        <div className="overlay">
          <div className="copy">
            <div className="t">{overlayTitle}</div>
            <div className="d">{overlayDescription}</div>
            <div className="chip">
              <CaseStudyChipIcon />
              Read case study
            </div>
          </div>
        </div>
      </div>
      <div className="meta">
        <div className="left">
          <span className="t">{title}</span>
          <span className="year">{year}</span>
        </div>
        <div className="d">{description}</div>
      </div>
    </Link>
  );
}
