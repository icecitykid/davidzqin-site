import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/constants";

/**
 * Home header with CSS Scroll-Driven Animation glass effect.
 * No client-side JS needed — the glass activates at 1px of scroll purely
 * via CSS `animation-timeline: scroll()`, ensuring identical rendering on
 * local dev and Vercel production.
 */
export function HeaderHome() {
  return (
    <div className="hdr--home-shell">
      <header className="hdr hdr--home">
        <Link href="/" className="brand" aria-label="David Z. Qin — home">
          <Image src={LOGO_SRC} alt="" width={30} height={40} unoptimized />
          <div className="name">David Z. Qin</div>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/about">About</Link>
        </nav>
      </header>
    </div>
  );
}
