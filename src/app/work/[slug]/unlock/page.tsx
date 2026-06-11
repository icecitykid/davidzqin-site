import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isProtectedCase } from "@/lib/protected-cases";
import { getCaseStudyTitle } from "@/lib/work";
import { UnlockForm } from "./UnlockForm";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: "Password required — Case study",
  robots: { index: false, follow: false },
};

export default async function UnlockPage({ params }: Props) {
  const { slug } = await params;
  if (!isProtectedCase(slug)) notFound();

  const title = getCaseStudyTitle(slug);

  return (
    <div className="page" id="top">
      <Header variant="home" />

      <main className="case-gate">
        <section className="case-gate__panel" aria-labelledby="case-gate-title">
          <p className="case-gate__eyebrow">Protected case study</p>
          <h1 id="case-gate-title" className="case-gate__title">
            {title}
          </h1>
          <p className="case-gate__copy">
            This case study is password protected. Enter the password to
            continue, or reach out if you need access.
          </p>
          <UnlockForm slug={slug} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
