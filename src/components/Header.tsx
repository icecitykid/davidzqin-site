import Link from "next/link";
import { HeaderCase } from "@/components/HeaderCase";
import { HeaderHome } from "@/components/HeaderHome";

export type HeaderVariant = "home" | "about" | "case";

export function Header({ variant }: { variant: HeaderVariant }) {
  if (variant === "about") {
    return (
      <header className="hdr hdr--about">
        <Link href="/" className="back" aria-label="Back to all projects">
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
            <path d="M 21 6 L 1 6 M 7 1 L 1 6 L 7 11" />
          </svg>
          All Projects
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/about" aria-current="page">
            About
          </Link>
        </nav>
      </header>
    );
  }

  if (variant === "case") {
    return <HeaderCase />;
  }

  return <HeaderHome />;
}
