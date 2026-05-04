import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC, RESUME_SRC } from "@/lib/constants";

const LINKEDIN_URL = "https://www.linkedin.com/in/davidqin";

export type FooterVariant = "default" | "immersiveEnd";

type FooterProps = {
  /** AthleteHQ immersive: flush under Next project, dark bar, light type. */
  variant?: FooterVariant;
};

export function Footer({ variant = "default" }: FooterProps) {
  const immersiveEnd = variant === "immersiveEnd";

  return (
    <footer className={immersiveEnd ? "ftr ftr--immersive-end" : "ftr"}>
      <div className="left">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center"
          aria-label="David Z. Qin — home"
        >
          <Image src={LOGO_SRC} alt="" width={30} height={40} unoptimized />
        </Link>
        <span>© 2026</span>
      </div>
      <div className="right">
        <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          Linkedin
        </Link>
        <Link href={RESUME_SRC} target="_blank" rel="noopener noreferrer">
          Resume
        </Link>
      </div>
    </footer>
  );
}
