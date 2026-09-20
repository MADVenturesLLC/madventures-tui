// apps/seal-studio/src/lib/seal-client.ts
// Browser-side call into the dev-only /api/seal endpoint. Pure logic, fully
// unit-tested without a DOM: the gate order is blocked → invalid → sealed.

export interface SealRequestPayload {
  mode: "founder" | "demo";
  confirmed: boolean;
  id: string;
  issued_at: string;
  kind: string;
  subject: string;
  scope: string[];
  head_sha?: string;
  reason_code: string;
  expires_at?: string;
}

export type SealAttempt =
  | { status: "blocked"; reason: string }
  | { status: "invalid"; errors: string[] }
  | { status: "sealed"; act_sha256: string; body_sha256: string; path: string; demo: boolean; already_sealed: boolean }
  | { status: "error"; message: string };

/**
 * The client never decides honesty: it sends `confirmed` only when the UI
 * ritual completed, and treats any server refusal as final. A blocked
 * attempt (confirm not set) never reaches the network at all.
 */
export async function attemptSeal(
  payload: SealRequestPayload,
  deps: { fetchFn?: typeof fetch; confirmed: boolean; errors: string[] },
): Promise<SealAttempt> {
  if (!deps.confirmed) {
    return {
      status: "blocked",
      reason: "Blocked — the Founder confirm is not set. Nothing was written; no request was sent.",
    };
  }
  if (deps.errors.length > 0) {
    return { status: "invalid", errors: deps.errors };
  }
  const doFetch = deps.fetchFn ?? fetch;
  try {
    const res = await doFetch("/api/seal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body: unknown = await res.json();
    if (typeof body !== "object" || body === null) {
      return { status: "error", message: `seal endpoint returned a non-object (HTTP ${res.status})` };
    }
    const rec = body as Record<string, unknown>;
    if (rec["ok"] !== true) {
      const errors = Array.isArray(rec["errors"]) ? (rec["errors"] as unknown[]).map(String) : ["seal refused"];
      return { status: "invalid", errors };
    }
    const actSha = rec["act_sha256"];
    const bodySha = rec["body_sha256"];
    const path = rec["path"];
    if (typeof actSha !== "string" || typeof path !== "string") {
      return { status: "error", message: "seal endpoint returned an incomplete result" };
    }
    return {
      status: "sealed",
      act_sha256: actSha,
      body_sha256: typeof bodySha === "string" ? bodySha : "",
      path,
      demo: rec["demo"] === true,
      already_sealed: rec["already_sealed"] === true,
    };
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
