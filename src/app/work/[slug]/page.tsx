import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroDecorAightBet } from "@/components/art/HeroDecorAightBet";
import { HeroDecorAthleteHQ } from "@/components/art/HeroDecorAthleteHQ";
import { getCaseStudy } from "@/lib/case-studies";
import { CASE_SLUGS, isCaseSlug } from "@/lib/work";
import { CaseCredits } from "./_components/CaseCredits";
import { CaseHero } from "./_components/CaseHero";
import { CaseLearnings } from "./_components/CaseLearnings";
import { CaseNextProject } from "./_components/CaseNextProject";
import { CaseSection } from "./_components/CaseSection";
import { CaseStickyNav } from "./_components/CaseStickyNav";

const AthleteHQImmersive = dynamic(() =>
  import("./_components/immersive/AthleteHQImmersive").then(
    (m) => m.AthleteHQImmersive,
  ),
);

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) return {};

  const study = getCaseStudy(slug);
  const title = `${study.title} — Case study`;
  const description =
    study.tagline ||
    `Case study placeholder for ${study.title}. Full write-up coming soon.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${slug}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function WorkCasePage({ params }: Props) {
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();

  const study = getCaseStudy(slug);

  if (study.immersive) {
    return (
      <div className="page" id="top">
        <Header variant="case" />
        <AthleteHQImmersive
          layout={study.immersive}
          title={study.title}
          slug={study.slug}
        />
        <div className="pb-[140px]" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="page" id="top">
      <Header variant="home" />

      <CaseStickyNav />

      <main className="flex flex-col gap-dzq-space-10 pb-dzq-space-9">
        <div id="overview" className="relative scroll-mt-[80px]">
          {study.slug === "athletehq" && <HeroDecorAthleteHQ />}
          {study.slug === "aightbet" && <HeroDecorAightBet />}
          <div className="relative">
            <CaseHero study={study} />
          </div>
        </div>

        <div
          id="design"
          className="flex flex-col gap-dzq-space-10 scroll-mt-[80px]"
        >
          {study.sections.map((section, i) => (
            <CaseSection key={i} section={section} />
          ))}
        </div>

        <div id="results" className="scroll-mt-[80px]">
          <CaseLearnings learnings={study.learnings} />
        </div>

        <CaseCredits team={study.team} />
        <CaseNextProject currentSlug={study.slug} />
      </main>

      <Footer />
    </div>
  );
}
