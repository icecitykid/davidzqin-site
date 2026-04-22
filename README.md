# davidzqin-site

Personal portfolio site for David Z. Qin, built with **Next.js 15** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Typography

**Helvetica Neue** is the primary typeface in the stack; **Inter** is loaded with `next/font/google` as the first fallback (see `src/app/layout.tsx` and `--dzq-font-sans` in `src/app/globals.css`).

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, Inter variable, default `metadata`, `metadataBase`, OG defaults |
| `src/app/globals.css` | Design tokens (`:root` `--dzq-*`), base styles, home/about/case CSS, artwork tiles, reduced motion |
| `tailwind.config.ts` | Maps `var(--dzq-*)` to Tailwind utilities (`bg-dzq-fg-1`, `text-dzq-fg-2`, `rounded-dzq-radius-lg`, …) |
| `src/app/page.tsx` | Homepage (`/`) |
| `src/app/about/page.tsx` | About page (`/about`) |
| `src/app/work/[slug]/page.tsx` | Case study template (`/work/...`) |
| `src/components/Header.tsx` | Site header (`variant`: `home` \| `about`) |
| `src/components/Footer.tsx` | Footer (`variant`: `home` \| `about`) |
| `src/components/CaseCard.tsx` | Case study card (link, art slot, overlay, meta) |
| `src/components/ScrollRevealWork.tsx` | Client wrapper; wires `useScrollReveal` to the work grid |
| `src/hooks/useScrollReveal.ts` | IntersectionObserver hook; adds `in` class, 60ms stagger |
| `src/components/art/` | `ArtAthleteHQ`, `ArtAightBet`, `ArtShopify` gradient tiles |
| `src/lib/work.ts` | Allowed case-study slugs and titles |
| `public/assets/` | Static assets (logos, optional `david-portrait.jpg`) |
| `public/og.png` | Placeholder Open Graph image (replace with a 1200×630 asset) |

## Design tokens

Tokens live in **`src/app/globals.css`** under `:root` as `--dzq-*` custom properties (names unchanged from the original static CSS).

Tailwind utilities are generated from **`tailwind.config.ts`** so you can write, for example:

- `bg-dzq-bg-alt` `text-dzq-fg-2` `border-dzq-border`
- `p-dzq-space-5` `gap-dzq-space-4`
- `rounded-dzq-radius-lg` `shadow-dzq-shadow-card`
- `font-dzq-sans` `text-dzq-lg`

## Adding a new case study

1. **Slug** — Pick a URL segment (e.g. `my-project`). Add it to `CASE_SLUGS` in `src/lib/work.ts` and add a human-readable title in `TITLES`.
2. **Homepage card** — In `src/app/page.tsx`, add a `<CaseCard … />` inside `<ScrollRevealWork>` with `href="/work/your-slug"`, copy, and either reuse an art component or add one under `src/components/art/`.
3. **Case page** — `generateStaticParams` will pick up the new slug automatically. Replace the placeholder body in `src/app/work/[slug]/page.tsx` with real sections (or split into `src/app/work/[slug]/_components/` as the page grows).
4. **Metadata** — Extend `generateMetadata` in `page.tsx` if the slug needs custom title/description/OG fields beyond the defaults.
5. **Optional** — Add images under `public/` (or use `next/image` with configured hosts) and reference them from the case page.

## Commands

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Notes

- Portrait on `/about` expects `public/assets/david-portrait.jpg`; until it exists, the `<img>` hides itself on error and the circular frame shows the gradient empty state (same behavior as the static HTML).
- **`public/og.png`** is a tiny placeholder; replace with a proper 1200×630 image for social previews.
- Resume is served from **`public/assets/Zehao_Qin_2026_Resume.pdf`** (`RESUME_SRC` in `src/lib/constants.ts`). Replace that file and constant if you ship a newer PDF.
