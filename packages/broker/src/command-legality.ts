// packages/broker/src/command-legality.ts
// Phase 3A M9 Task 21: the pinned command legality matrix (specification
// section 9.3; plan Task 21). A pure decision function only — no state, no
// I/O, no behavior beyond the matrix.
//
// Eight ordered predicates, first failure wins (spec §9.3, plan Task 21):
//   1. command shape            -> invalid_command (unknown kind OR unknown field)
//   2. principal authorization  -> unauthorized
//   3. session identity         -> session_mismatch
//   4. execution existence      -> execution_not_found
//   5. active-writer identity   -> unauthorized (pty_input/pty_resize only)
//   6. phase / incident         -> session_not_writable | incident_active
//   7. fencing token            -> stale_fencing_token
//   8. dimensions               -> invalid_dimensions (pty_resize only)
//
// No code outside the fourteen-member BrokerErrorCode union is returned.
// `unauthorized` intentionally carries both the governance-authority refusal
// (predicate 2) and the active-writer refusal (predicate 5) — Founder ruling
// D5/§5. `detail` is a sanitized fixed-vocabulary literal: never a task
// envelope, environment value, command payload, or execution identity.

import type { BrokerCommand, BrokerErrorCode, BrokerSnapshot, ClientPrincipal } from "./client";

export type CommandLegalityResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: BrokerErrorCode; readonly detail: string };

/** The closed set of BrokerCommand kinds this module knows how to judge. */
const KNOWN_COMMAND_KINDS = new Set<string>([
  "pty_input",
  "pty_resize",
  "pty_terminate",
  "approval_resolve",
  "session_pause",
  "session_resume",
  "session_close",
]);

/**
 * Predicate 1's per-kind closed field set, read directly from the
 * BrokerCommand union in ./client (not invented, not loosened, not
 * duplicated as a second doctrine). An unknown/extra field on an otherwise
 * known command kind fails predicate 1 exactly as an unknown kind does.
 */
const ALLOWED_FIELDS_BY_KIND: Readonly<Record<string, ReadonlySet<string>>> = {
  pty_input: new Set(["kind", "commandId", "sessionId", "executionId", "fencingToken", "bytes"]),
  pty_resize: new Set(["kind", "commandId", "sessionId", "executionId", "fencingToken", "cols", "rows"]),
  pty_terminate: new Set(["kind", "commandId", "sessionId", "executionId", "reason"]),
  approval_resolve: new Set(["kind", "commandId", "sessionId", "approvalId", "decision"]),
  session_pause: new Set(["kind", "commandId", "sessionId", "reason"]),
  session_resume: new Set(["kind", "commandId", "sessionId"]),
  session_close: new Set(["kind", "commandId", "sessionId", "reason"]),
};

/** Founder-governance commands: an `execution` principal may never issue these (predicate 2). */
const GOVERNANCE_COMMAND_KINDS = new Set<string>([
  "approval_resolve",
  "session_pause",
  "session_resume",
  "session_close",
]);

/** Commands that carry an `executionId` and are subject to predicate 4 (execution existence). */
const EXECUTION_SCOPED_COMMAND_KINDS = new Set<string>(["pty_input", "pty_resize", "pty_terminate"]);

/** Writer-only commands: subject to predicate 5 (active-writer identity) and predicate 7 (fencing token). */
const WRITER_ONLY_COMMAND_KINDS = new Set<string>(["pty_input", "pty_resize"]);

/**
 * Predicate 8's dimension rule. Deliberately the same rule the PTY host and
 * broker codecs already apply as `isDimension` — written inline here rather
 * than imported, so this module's only import stays `./client`, and so no
 * second doctrine of "valid dimension" is created.
 */
function isValidDimension(value: unknown): boolean {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

/**
 * Judge one command against one snapshot for one principal. Consumes
 * `BrokerSnapshot.activeWriterExecutionId` as the sole active-writer
 * authority; creates no second ownership, fencing, or lifecycle authority.
 */
export function evaluateCommandLegality(
  command: BrokerCommand,
  snapshot: BrokerSnapshot,
  principal: ClientPrincipal,
): CommandLegalityResult {
  // Predicate 1 — command shape. Evaluated first on both request() and
  // publish(); no default coercion. `command.kind` is read through an
  // unknown-shaped view because a genuinely malformed command (an unknown
  // variant, or a known variant with an unknown field) cannot be excluded by
  // the BrokerCommand type alone at the runtime boundary.
  const kind = (command as { readonly kind?: unknown }).kind;
  if (typeof kind !== "string" || !KNOWN_COMMAND_KINDS.has(kind)) {
    return { ok: false, error: "invalid_command", detail: "unknown command variant" };
  }
  // A known kind carrying a field outside its own closed field set is
  // equally malformed (spec §9.3: "unknown variant OR unknown field").
  // kind is already validated against KNOWN_COMMAND_KINDS above, so it is
  // always present as a key of ALLOWED_FIELDS_BY_KIND; the fallback empty
  // set is unreachable defensive code, not a loosening of the check.
  const allowedFields = ALLOWED_FIELDS_BY_KIND[kind] ?? new Set<string>();
  const presentFields = Object.keys(command as Record<string, unknown>);
  if (presentFields.some((field) => !allowedFields.has(field))) {
    return { ok: false, error: "invalid_command", detail: "unknown field on command" };
  }

  // Predicate 2 — principal authorization. An `execution` principal may
  // never issue a governance command, regardless of any other field.
  if (principal.kind === "execution" && GOVERNANCE_COMMAND_KINDS.has(kind)) {
    return { ok: false, error: "unauthorized", detail: "execution principal cannot issue a governance command" };
  }

  // Predicate 3 — session identity.
  if (command.sessionId !== snapshot.sessionId) {
    return { ok: false, error: "session_mismatch", detail: "command session does not match the bound session" };
  }

  // Predicate 4 — execution existence. Only execution-scoped commands carry
  // an executionId to check.
  if (EXECUTION_SCOPED_COMMAND_KINDS.has(kind)) {
    const executionId = (command as { readonly executionId: string }).executionId;
    const exists = snapshot.executions.some((execution) => execution.identity.execution_id === executionId);
    if (!exists) {
      return { ok: false, error: "execution_not_found", detail: "named execution is absent from the snapshot" };
    }
  }

  // Predicate 5 — active-writer identity. pty_input and pty_resize ONLY.
  // pty_terminate is never gated here (mechanical fail-closed teardown must
  // not be blockable by a non-writer). A current positive fencing token is
  // necessary but not sufficient: an execution that exists but is not the
  // active writer is refused here, whatever token it presents. A null
  // activeWriterExecutionId fails this predicate for writer-only commands.
  if (WRITER_ONLY_COMMAND_KINDS.has(kind)) {
    const executionId = (command as { readonly executionId: string }).executionId;
    if (snapshot.activeWriterExecutionId === null || executionId !== snapshot.activeWriterExecutionId) {
      return { ok: false, error: "unauthorized", detail: "execution is not the active writer" };
    }
  }

  // Predicate 6 — phase / incident, the ten-row matrix. Reachable only past
  // predicates 1-5.
  const phase = snapshot.phase;
  const incidentActive = snapshot.incident !== null;

  switch (kind) {
    case "pty_input":
    case "pty_resize": {
      // Listed order: non-active phase first, then active + incident.
      if (phase !== "active") {
        return { ok: false, error: "session_not_writable", detail: "session phase does not accept PTY input" };
      }
      if (incidentActive) {
        return { ok: false, error: "incident_active", detail: "an incident is active" };
      }
      break;
    }
    case "pty_terminate": {
      // Legal in starting/active/paused/interrupted/closing; closed only is refused.
      if (phase === "closed") {
        return { ok: false, error: "session_not_writable", detail: "session is already closed" };
      }
      break;
    }
    case "approval_resolve":
    case "session_pause":
    case "session_close": {
      // The four governance commands: incident test PRECEDES the phase test,
      // because active + incident yields incident_active before a bare
      // non-active check would otherwise fire.
      if (phase === "active" && incidentActive) {
        return { ok: false, error: "incident_active", detail: "an incident is active" };
      }
      if (phase !== "active") {
        return { ok: false, error: "session_not_writable", detail: "session phase does not accept this command" };
      }
      break;
    }
    case "session_resume": {
      // Legal only from paused; no incident test (resume out of an incident
      // is not part of this contract's ten rows).
      if (phase !== "paused") {
        return { ok: false, error: "session_not_writable", detail: "session phase does not accept this command" };
      }
      break;
    }
  }

  // Predicate 7 — fencing token. Reachable only in an otherwise legal state.
  // Pause neither invalidates nor increments the token, so this predicate
  // fires identically whether the session is active or was paused and
  // resumed. Only writer-only commands carry a fencingToken to check.
  if (WRITER_ONLY_COMMAND_KINDS.has(kind)) {
    const fencingToken = (command as { readonly fencingToken: number }).fencingToken;
    if (fencingToken !== snapshot.fencingToken) {
      return { ok: false, error: "stale_fencing_token", detail: "fencing token is not the current token" };
    }
  }

  // Predicate 8 — dimensions. pty_resize only. Either dimension invalid is
  // sufficient.
  if (kind === "pty_resize") {
    const { cols, rows } = command as { readonly cols: unknown; readonly rows: unknown };
    if (!isValidDimension(cols) || !isValidDimension(rows)) {
      return { ok: false, error: "invalid_dimensions", detail: "resize dimensions must be positive safe integers" };
    }
  }

  return { ok: true };
}
