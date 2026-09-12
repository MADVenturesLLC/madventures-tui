// apps/projector-mc/src/lib/intent.ts
// Founder-act intent stubs. These are TYPED INTENT EVENTS ONLY: they go to
// the console (stdout of the dev server / browser console) and to the
// session intent log. They never call GitHub, never merge, never touch the
// Gateway. Merge authorization remains a Founder act on the real surface.

import type { VerdictRecord } from "@mad/single-verdict";

export const FOUNDER_INTENTS = ["APPROVE_MERGE", "HOLD"] as const;
export type FounderIntentName = (typeof FOUNDER_INTENTS)[number];

export type FounderIntent = {
  type: "founder_intent";
  intent: FounderIntentName;
  subject: string;
  sha: string;
  at: string;
  note: "typed intent only — no GitHub, no merge, no gateway";
};

export function makeFounderIntent(name: FounderIntentName, verdict: VerdictRecord): FounderIntent {
  return {
    type: "founder_intent",
    intent: name,
    subject: verdict.subject.name,
    sha: verdict.subject.sha,
    at: new Date().toISOString(),
    note: "typed intent only — no GitHub, no merge, no gateway",
  };
}

/** Emit to the console and return the typed event for the session log. */
export function emitFounderIntent(name: FounderIntentName, verdict: VerdictRecord): FounderIntent {
  const event = makeFounderIntent(name, verdict);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event));
  return event;
}
