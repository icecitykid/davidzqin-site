import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArtAightBet } from "@/components/art/ArtAightBet";
import { ArtAthleteHQ } from "@/components/art/ArtAthleteHQ";
import { ArtShopify } from "@/components/art/ArtShopify";
import { CaseCard } from "@/components/CaseCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollRevealWork } from "@/components/ScrollRevealWork";
import { workHref } from "@/lib/work";

export const metadata: Metadata = {
  title: "David Z. Qin — Product Designer",
  description:
    "David Z. Qin is a product designer working on systems and experiences for high-performing products. Previously Nike Valiant Labs and Shopify.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "David Z. Qin — Product Designer",
    description:
      "David Z. Qin is a product designer working on systems and experiences for high-performing products. Previously Nike Valiant Labs and Shopify.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "David Z. Qin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Z. Qin — Product Designer",
    description:
      "David Z. Qin is a product designer working on systems and experiences for high-performing products. Previously Nike Valiant Labs and Shopify.",
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return (
    <div className="page" id="top">
      <Header variant="home" />

      <section className="hero">
        <h1 className="hero-reveal">
          <span style={{ animationDelay: "0ms" }}>
            I&apos;m David Qin. I design systems and experiences for
            high-performing products.
          </span>
          <br />
          <br />
          <span className="muted" style={{ animationDelay: "200ms" }}>
            From athlete platforms at{" "}
            <span className="hero-inline">
              <Image
                src="/assets/Nike%20logo.svg"
                alt=""
                width={35}
                height={35}
                className="hero-inline-icon"
                aria-hidden="true"
                unoptimized
              />
              Nike
            </span>{" "}
            to internal tools at{" "}
            <span className="hero-inline">
              <Image
                src="/assets/Shopify%20logo.svg"
                alt=""
                width={32}
                height={37}
                className="hero-inline-icon"
                aria-hidden="true"
                unoptimized
              />
              Shopify
            </span>
            , I turn complex workflows into products teams love.
          </span>
        </h1>

        <div className="cta-row">
          <Link href="/about" className="cta" aria-label="Read more about David">
            Read more
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
          </Link>
        </div>
      </section>

      <section id="work" aria-labelledby="work-label">
        <div className="section-head">
          <div className="label" id="work-label">
            Selected Work
          </div>
          <div className="rule" role="presentation" />
        </div>

        <ScrollRevealWork>
          <CaseCard
            href={workHref("nike-athletehq")}
            ariaLabel="Nike AthleteHQ — read case study"
            title="Nike AthleteHQ"
            year="2024 · Nike Valiant Labs"
            description="An athlete app for Nike athletes to tell their untold stories + a real-time database to match them to the right Nike moment."
            overlayTitle="An athlete app for Nike athletes to tell their untold stories."
            overlayDescription="Plus a real-time database that matches them to the right Nike moment."
            art={<ArtAthleteHQ />}
          />
          <CaseCard
            href={workHref("aightbet")}
            ariaLabel="AightBet — read case study"
            title="AightBet"
            year="2025 · Vibe Coded"
            description="A social betting app that turns casual trash talk into structured bets with real outcomes."
            overlayTitle="Turn casual trash talk into structured bets with real outcomes."
            overlayDescription="A social betting app for friends. Built solo on weekends."
            art={<ArtAightBet />}
          />
          <CaseCard
            href={workHref("shopify-logistics")}
            ariaLabel="Shopify Logistics Configuration Manager — read case study"
            title="Shopify Logistics Configuration Manager"
            year="2022 · Shopify"
            description="Redesign for Shopify Logistics’ warehouse robot configuration tool."
            overlayTitle="Warehouse robot configuration, redesigned."
            overlayDescription="Turning a dense engineer-only tool into something ops teams could run without fear."
            art={<ArtShopify />}
          />
        </ScrollRevealWork>
      </section>

      <Footer variant="home" />
    </div>
  );
}
