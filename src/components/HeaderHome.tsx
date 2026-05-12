"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LOGO_SRC } from "@/lib/constants";

/**
 * Home header with a scroll-aware glass effect.
 * - At the page top (not yet sticky): transparent background.
 * - Once the user scrolls even 1px (header becomes sticky): frosted glass.
 */
export function HeaderHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    /*
     * Two-layer pattern (mirrors `.immersive-case__header` + `.hdr--case`):
     * - Outer shell: position sticky, spans 100% of the body = full viewport
     *   width. The glass background is applied here so it truly bleeds edge-
     *   to-edge regardless of the page's max-width.
     * - Inner header: max-width + auto margins + page-aligned padding to keep
     *   the nav content aligned with the rest of the page content.
     */
    <div className={`hdr--home-shell${scrolled ? " hdr--home-shell--scrolled" : ""}`}>
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
