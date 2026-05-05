import Link from "next/link";
import type { ReactNode } from "react";

export type CaseCardProps = {
  href: string;
  ariaLabel: string;
  title: string;
  year: string;
  description: string;
  /** Absolutely-positioned composition that fills the card background */
  art: ReactNode;
};

/**
 * Home-page case study card: `.frame` art + hover gradient scrim (no overlay copy),
 * `.meta` below (title + year, then description).
 */
export function CaseCard({
  href,
  ariaLabel,
  title,
  year,
  description,
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
        <div className="overlay" aria-hidden="true" />
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
