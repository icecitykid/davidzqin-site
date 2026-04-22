import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LOGO_SRC } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidzqin.com"),
  title: "David Z. Qin — Product Designer",
  description:
    "David Z. Qin is a product designer working on systems and experiences for high-performing products. Previously Nike Valiant Labs and Shopify.",
  icons: {
    icon: LOGO_SRC,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "David Z. Qin",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "David Z. Qin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
