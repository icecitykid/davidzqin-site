import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC, RESUME_SRC } from "@/lib/constants";

export type FooterVariant = "home" | "about";

const LINKEDIN_URL = "https://www.linkedin.com/in/davidqin";

export function Footer({ variant }: { variant: FooterVariant }) {
  if (variant === "about") {
    return (
      <footer className="ftr-slim">
        <div className="left">© 2026. Made by David Qin</div>
        <div className="right">
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </Link>
          <Link href="mailto:hi@davidzqin.com">Email</Link>
          <Link href={RESUME_SRC} target="_blank" rel="noopener noreferrer">
            Resume
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="ftr">
      <div className="left">
        <Image src={LOGO_SRC} alt="" width={30} height={40} unoptimized />
        <span>© 2026. Made by David Qin</span>
      </div>
      <div className="right">
        <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          Linkedin
        </Link>
        <Link href="mailto:hi@davidzqin.com">Email</Link>
        <Link href={RESUME_SRC} target="_blank" rel="noopener noreferrer">
          Resume
        </Link>
      </div>
    </footer>
  );
}
