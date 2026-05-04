import Link from "next/link";

type Props = {
  label: string;
  href: string;
  ariaLabel?: string;
};

/**
 * Pill button matching the home page `.cta` style. Used by Intro and Stats
 * sections in immersive case studies. Uses an external `<a>` for absolute
 * URLs (e.g. the AthleteHQ Figma deck) and `<Link>` for in-app routes.
 */
export function ReadMoreButton({ label, href, ariaLabel }: Props) {
  const isExternal = /^https?:\/\//.test(href);
  const inner = (
    <>
      {label}
      <svg
        width="22"
        height="12"
        viewBox="0 0 22 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M 1 6 L 21 6 M 15 1 L 21 6 L 15 11" />
      </svg>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cta"
        aria-label={ariaLabel ?? label}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="cta" aria-label={ariaLabel ?? label}>
      {inner}
    </Link>
  );
}
