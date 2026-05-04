import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/constants";

export type HeaderVariant = "home" | "about" | "case";

export function Header({ variant }: { variant: HeaderVariant }) {
  if (variant === "about") {
    return (
      <header className="hdr">
        <Link href="/" className="back" aria-label="Back to selected work">
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
          Selected Work
        </Link>
        <nav aria-label="Primary">
          <Link href="/about" className="nav-link" aria-current="page">
            About
          </Link>
        </nav>
      </header>
    );
  }

  if (variant === "case") {
    return (
      <header className="hdr hdr--home">
        <Link href="/" className="brand" aria-label="Back to all projects">
          <Image src={LOGO_SRC} alt="" width={30} height={40} unoptimized />
          <div className="name">All Projects</div>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/about">About</Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="hdr hdr--home">
      <Link href="/" className="brand" aria-label="David Z. Qin — home">
        <Image src={LOGO_SRC} alt="" width={30} height={40} unoptimized />
        <div className="name">David Z. Qin</div>
      </Link>
      <nav className="nav" aria-label="Primary">
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
