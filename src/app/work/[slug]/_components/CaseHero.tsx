import type { CaseStudy } from "@/lib/case-studies";
import { CaseMedia } from "./CaseMedia";

export function CaseHero({ study }: { study: CaseStudy }) {
  const hasMedia = study.heroMedia.src.length > 0;
  const hasMeta = study.role.length > 0 || study.company.length > 0;
  const hasBody = study.heroParagraph.length > 0 || hasMeta;

  return (
    <header className="mx-auto w-full max-w-dzq-content">
      {hasMedia && (
        <div className="relative aspect-[1664/750] w-full overflow-hidden rounded-dzq-radius-lg bg-dzq-bg-card">
          <CaseMedia
            media={study.heroMedia}
            priority
            sizes="(max-width: 900px) 100vw, 1664px"
          />
        </div>
      )}

      <div className="mt-dzq-space-9">
        <h1 className="m-0 font-dzq-display text-dzq-4xl font-dzq-medium leading-none tracking-tight text-dzq-fg-1">
          {study.title}
        </h1>

        {study.tagline && (
          <p className="mt-dzq-space-5 max-w-[900px] text-dzq-2xl font-dzq-medium leading-tight tracking-tight text-dzq-fg-1">
            {study.tagline}
          </p>
        )}
      </div>

      {hasBody && (
        <div className="mt-dzq-space-8 grid gap-dzq-space-8 md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] md:gap-dzq-space-10">
          {study.heroParagraph && (
            <p className="m-0 max-w-[64ch] text-dzq-lg leading-snug text-dzq-ink">
              {study.heroParagraph}
            </p>
          )}

          {hasMeta && (
            <aside className="flex flex-col gap-dzq-space-7">
              {study.role.length > 0 && (
                <div className="flex flex-col gap-dzq-space-5">
                  <p className="m-0 text-dzq-md font-dzq-medium text-dzq-fg-2">
                    Role
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-dzq-space-2 p-0 text-dzq-lg text-dzq-fg-1">
                    {study.role.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {study.company && (
                <div className="flex flex-col gap-dzq-space-5">
                  <p className="m-0 text-dzq-md font-dzq-medium text-dzq-fg-2">
                    Company
                  </p>
                  <p className="m-0 text-dzq-lg text-dzq-fg-1">
                    {study.company}
                  </p>
                </div>
              )}
            </aside>
          )}
        </div>
      )}
    </header>
  );
}
