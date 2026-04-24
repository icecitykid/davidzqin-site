type Props = { team: readonly string[] };

export function CaseCredits({ team }: Props) {
  if (team.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-dzq-content">
      <p className="m-0 text-dzq-md font-dzq-medium text-dzq-fg-2">Team</p>
      <ul className="m-0 mt-dzq-space-5 flex list-none flex-col gap-dzq-space-2 p-0 text-dzq-lg text-dzq-fg-1">
        {team.map((member, i) => (
          <li key={i}>{member}</li>
        ))}
      </ul>
    </section>
  );
}
