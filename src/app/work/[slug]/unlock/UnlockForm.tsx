"use client";

import { useActionState } from "react";
import { unlockAction, type UnlockState } from "./actions";

const initialState: UnlockState = { error: null };

export function UnlockForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState(
    unlockAction,
    initialState,
  );

  return (
    <form action={formAction} className="case-gate__form" noValidate>
      <input type="hidden" name="slug" value={slug} />
      <label htmlFor="case-gate-password" className="case-gate__label">
        Password
      </label>
      <input
        id="case-gate-password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "case-gate-error" : undefined}
        className="case-gate__input"
      />
      {state.error ? (
        <p id="case-gate-error" role="alert" className="case-gate__error">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="case-gate__submit" disabled={pending}>
        {pending ? "Unlocking…" : "View case study"}
      </button>
    </form>
  );
}
