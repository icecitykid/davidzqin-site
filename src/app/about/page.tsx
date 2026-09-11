import type { Metadata } from "next";
import { AboutPortrait } from "@/components/AboutPortrait";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "About — David Z. Qin",
  description:
    "David Qin is a product designer working on systems and experiences behind high-performing products. Previously at Nike and Shopify.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — David Z. Qin",
    description:
      "David Qin is a product designer working on systems and experiences behind high-performing products. Previously at Nike and Shopify.",
    url: "/about",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "David Z. Qin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — David Z. Qin",
    description:
      "David Qin is a product designer working on systems and experiences behind high-performing products. Previously at Nike and Shopify.",
    images: ["/og.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="about-root">
      <div className="page">
        <Header variant="about" />

        <main>
          <section className="about-grid" aria-labelledby="about-heading">
            <h1 id="about-heading" className="visually-hidden">
              About David Qin
            </h1>

            <div className="portrait fade-up">
              <AboutPortrait />
            </div>

            <div className="about-copy">
              <div className="lead fade-up d1">
                <p>
                  I&apos;m David Qin, a designer of systems and experiences behind
                  high-performing products.
                </p>
                <p>
                  From athlete platforms at Nike to internal tools at Shopify: I
                  turn complex workflows into products teams love.
                </p>
              </div>

              <div className="body fade-up d2">
                <p>
                  I design products where complexity is unavoidable — early-stage,
                  ambiguous ideas, logistics systems, internal tools, and spaces
                  that don&apos;t have clear answers yet.
                </p>
                <p>
                  My job is to make them simple, scalable, and delightful. I think
                  in systems, collaborate deeply with fellow builders, and optimize
                  for products that hold up under real-world constraints.
                </p>
                <p>Previously at Nike and Shopify.</p>
                <p>
                  Currently exploring how AI changes the way products are designed and
                  built. The line between design, engineering, and product is blurring
                  and I&apos;m bullish for it.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
