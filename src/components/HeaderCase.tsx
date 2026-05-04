"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Case-study top bar: transparent over the hero with white type; after the
 * hero scrolls off, switches to site ink so links stay readable on light
 * sections (no solid white bar).
 */
export function HeaderCase() {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const update = () => {
      const r = hero.getBoundingClientRect();
      setOnLight(r.bottom < 72);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={`hdr hdr--case${onLight ? " hdr--case--on-light" : ""}`}
    >
      <Link
        href="/"
        className="hdr--case__back"
        aria-label="Back to all projects"
      >
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
          className="hdr--case__arrow"
        >
          <path d="M 21 6 L 1 6 M 7 1 L 1 6 L 7 11" />
        </svg>
        <span>All Projects</span>
      </Link>
      <nav className="hdr--case__nav" aria-label="Primary">
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
