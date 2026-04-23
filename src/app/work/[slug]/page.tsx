import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CASE_SLUGS, getCaseStudyTitle, isCaseSlug } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) return {};

  const title = getCaseStudyTitle(slug);
  return {
    title: `${title} — Case study`,
    description: `Case study placeholder for ${title}. Full write-up coming soon.`,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${title} — Case study`,
      description: `Case study placeholder for ${title}. Full write-up coming soon.`,
      url: `/work/${slug}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Case study`,
      description: `Case study placeholder for ${title}. Full write-up coming soon.`,
      images: ["/og.png"],
    },
  };
}

export default async function WorkCasePage({ params }: Props) {
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();

  const title = getCaseStudyTitle(slug);

  return (
    <div className="page" id="top">
      <Header variant="home" />
      <main className="mx-auto max-w-[720px] px-4 py-20">
        <p className="dzq-caption">
          <Link href="/" className="border-b border-dzq-border-hl pb-px hover:border-dzq-fg-1">
            Home
          </Link>
          <span aria-hidden="true"> · </span>
          <Link
            href="/#work"
            className="border-b border-dzq-border-hl pb-px hover:border-dzq-fg-1"
          >
            Selected work
          </Link>
        </p>
        <h1 className="dzq-h1 mt-8">{title}</h1>
        <p className="dzq-body mt-6">
          This case study page is a scaffold. Replace this copy with narrative,
          images, and outcomes for <strong className="text-dzq-fg-1">{slug}</strong>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
