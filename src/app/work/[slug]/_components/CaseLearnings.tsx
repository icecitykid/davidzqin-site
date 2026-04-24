import type { CaseStudyLearning } from "@/lib/case-studies";

type Props = { learnings: readonly CaseStudyLearning[] };

export function CaseLearnings({ learnings }: Props) {
  if (learnings.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-dzq-content">
      <ul className="m-0 grid list-none gap-dzq-space-7 p-0 grid-cols-2 md:grid-cols-3 lg:[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {learnings.map((learning, i) => (
          <li key={i} className="flex flex-col gap-dzq-space-3">
            <p className="m-0 text-dzq-md font-dzq-medium text-dzq-fg-2">
              {learning.label}
            </p>
            <p className="m-0 font-dzq-display text-dzq-3xl font-dzq-bold leading-none tracking-tight text-dzq-fg-1">
              {learning.headline}
            </p>
            {learning.body && (
              <p className="m-0 text-dzq-lg leading-snug text-dzq-ink">
                {learning.body}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
