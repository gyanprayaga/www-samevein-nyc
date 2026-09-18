"use client";

import { useActionState } from "react";
import { subscribeAction } from "@/app/actions";
import { newsletterIdle } from "@/lib/subscribe-ui";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeAction,
    newsletterIdle,
  );

  return (
    <form className="newsletter" action={formAction}>
      <label className="newsletter__label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder=""
      />
      <input
        className="hp"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" disabled={pending}>
        {pending ? "Sending / Talking to the list…" : "Join"}
      </button>
      <p className="newsletter__status" role="status">
        {state.message}
      </p>
      {state.mock ? (
        <p className="newsletter__mock">{`Local mock — no Buttondown key`}</p>
      ) : null}
    </form>
  );
}
