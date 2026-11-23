// DEC-20261115-02 B3-B5; Phase 3B design 2.6. Pure parsing only:
// the PTY host owns launch, and M1 owns interruption and timer wiring.
export type MadvFailureCause =
  | "auth_failed" | "endpoint_refused" | "provider_error"
  | "identity_unavailable" | "model_refused" | "domain_unresolved" | "identity_mismatch";
const identityProbe = Symbol("identity probe");
export interface MadvContext {
  readonly [identityProbe]?: boolean;
  readonly onAttested?: (version: string) => void;
  readonly executionId: string;
  readonly sessionId: string;
  readonly model: string;
  readonly supportedVersions: readonly string[];
  readonly provider: string;
  readonly independenceDomain: string;
}
export interface BoundMadvEvent {
  readonly executionId: string;
  readonly sessionId: string;
  readonly event: Readonly<Record<string, unknown>>;
}
export interface MadvFailure {
  readonly ok: false;
  readonly cause: MadvFailureCause;
  readonly reason: string;
  readonly executionId: string;
  readonly sessionId: string;
  readonly interrupt: "whole_session";
  readonly retry: false;
}
export type MadvResult = MadvFailure | {
  readonly ok: true;
  readonly events: readonly BoundMadvEvent[];
  readonly modelResponses: number;
};
export const EVIDENCE_DEADLINE_MS = 30_000;
const precedence: readonly MadvFailureCause[] = [
  "auth_failed", "endpoint_refused", "provider_error", "identity_unavailable",
  "model_refused", "domain_unresolved", "identity_mismatch",
];
const object = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
function freezeEvent<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeEvent(child);
    Object.freeze(value);
  }
  return value;
}
function failure(context: Pick<MadvContext, "executionId" | "sessionId">, cause: MadvFailureCause, reason: string): MadvFailure {
  return Object.freeze({ ok: false, cause, reason, executionId: context.executionId, sessionId: context.sessionId, interrupt: "whole_session", retry: false });
}
export function encodeUserInput(text: string): string {
  return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
}
export function encodeAttestationInput(text: string): string {
  return JSON.stringify({ type: "user", message: { role: "user", content: text }, no_tools: true }) + "\n";
}
function eventCause(subtype: unknown): MadvFailureCause | undefined {
  switch (subtype) {
    case "auth_failed": return "auth_failed";
    case "endpoint_refused": return "endpoint_refused";
    case "provider_error": case "internal_error": return "provider_error";
    case "identity_unavailable": return "identity_unavailable";
    case "model_refused": return "model_refused";
    case "domain_unresolved": return "domain_unresolved";
    case "identity_mismatch": return "identity_mismatch";
    default: return undefined;
  }
}

/** One state machine for probes, startup evidence and every later response.
 * Call beginRequest at send and checkDeadline from the caller's monotonic
 * timer. M0 supplies typed results; it starts no timer-driven session work.
 */
export class MadvSurfaceParser {
  private readonly context: MadvContext;
  private readonly events: BoundMadvEvent[] = [];
  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
  private buffer = "";
  private version = "";
  private attested = false;
  private policyFailure?: "attestation_tool_call" | "attestation_round_trips";
  get attestationFailure() { return this.policyFailure; }
  private wireSession: string | undefined;
  private state: "init" | "waiting" | "response" | "tools" | "between" = "init";
  private readonly tools = new Map<string, string>();
  private readonly usedToolIds = new Set<string>();
  private assistantSeen = false;
  private responses = 0;
  private waitingForEvidence = true;
  private sentAt: number;
  private failed: MadvFailure | undefined;
  private finished = false;

  constructor(context: MadvContext, private readonly now: () => number = () => performance.now()) {
    this.context = Object.freeze({ ...context, supportedVersions: Object.freeze([...context.supportedVersions]) });
    this.sentAt = now();
  }
  private fail(cause: MadvFailureCause, reason: string): void {
    if (!this.failed || precedence.indexOf(cause) < precedence.indexOf(this.failed.cause)) this.failed = failure(this.context, cause, reason);
  }
  private snapshot(): MadvResult {
    return this.failed ?? Object.freeze({ ok: true, events: Object.freeze([...this.events]), modelResponses: this.responses });
  }
  beginRequest(): MadvResult {
    if (this.finished || this.state !== "between") this.fail("identity_mismatch", "event_order");
    else { this.sentAt = this.now(); this.waitingForEvidence = true; this.state = "waiting"; }
    return this.snapshot();
  }
  checkDeadline(): MadvResult {
    const elapsed = this.now() - this.sentAt;
    if (!Number.isFinite(elapsed) || elapsed < 0) this.fail("identity_mismatch", "invalid_clock");
    else if (!this.failed && this.waitingForEvidence && elapsed >= EVIDENCE_DEADLINE_MS) this.fail("identity_unavailable", "evidence_deadline");
    return this.snapshot();
  }
  push(chunk: string | Uint8Array): MadvResult {
    if (this.finished) { this.fail("identity_mismatch", "event_after_exit"); return this.snapshot(); }
    this.checkDeadline();
    try {
      this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
      let newline: number;
      while ((newline = this.buffer.indexOf("\n")) >= 0) {
        const line = this.buffer.slice(0, newline); this.buffer = this.buffer.slice(newline + 1);
        if (line.trim()) this.line(line);
      }
      // The largest release tool-result event is capped at 100 KB.
      if (this.buffer.length > 262_144) this.fail("identity_mismatch", "oversized_event");
    } catch { this.fail("identity_mismatch", "malformed_stream"); }
    return this.snapshot();
  }
  private line(line: string): void {
    let value: unknown;
    try { value = JSON.parse(line); } catch { this.fail("identity_mismatch", "malformed_stream"); return; }
    if (!object(value)) { this.fail("identity_mismatch", "malformed_event"); return; }
    const attesting = this.context.onAttested !== undefined && !this.attested;
    if (attesting && (value.type === "tool_use" || value.type === "tool_result" ||
      (value.type === "system" && value.subtype === "provider_error" && value.code === "unexpected_tool_call"))) {
      this.policyFailure ??= "attestation_tool_call";
      this.fail("provider_error", "unexpected_tool_call");
      return;
    }
    if (attesting && value.type === "model_response" && this.responses > 0) {
      this.policyFailure ??= "attestation_round_trips";
      this.fail("identity_mismatch", "extra_model_response");
      return;
    }
    const cause = value.type === "system" ? eventCause(value.subtype) : undefined;
    // A later explicit failure can outrank an earlier identity difference.
    // No further successful event or tool can escape a failed parser.
    if (cause !== undefined) {
      this.fail(cause, "surface_fail_closed");
      return;
    }
    if (this.failed) return;
    if (typeof value.session_id !== "string" || value.session_id.length === 0 || typeof value.ts !== "string") {
      this.fail("identity_mismatch", "event_binding"); return;
    }
    if (this.wireSession !== undefined && value.session_id !== this.wireSession) { this.fail("identity_mismatch", "event_binding"); return; }
    if (this.state === "init") {
      // B3 item 4: evaluate the first-init predicates in their stated order.
      if (value.type !== "system" || value.subtype !== "init"
        || value.surface !== "madv-surface"
        || typeof value.surface_version !== "string" || !this.context.supportedVersions.includes(value.surface_version)
        || value.profile !== "minimax" || value.provider !== this.context.provider
        || value.endpoint_host !== "api.minimax.io" || value.requested_model !== this.context.model) {
        this.fail("identity_mismatch", "init_predicate"); return;
      }
      if (this.context[identityProbe] && (!Array.isArray(value.tools) || value.tools.length !== 0)) {
        this.fail("identity_mismatch", "init_tools"); return;
      }
      this.version = value.surface_version;
      this.wireSession = value.session_id; this.state = "waiting";
    } else if (value.type === "model_response") {
      if (this.state !== "waiting" && !(this.state === "tools" && this.tools.size === 0)) { this.fail("identity_mismatch", "event_order"); return; }
      if (typeof value.response_model !== "string" || value.response_model.length === 0) { this.fail("identity_unavailable", "model_field_absent"); return; }
      if (/claude|anthropic/i.test(value.response_model)) { this.fail("model_refused", "anthropic_model"); return; }
      if (!/^minimax[-_]/i.test(value.response_model)) { this.fail("domain_unresolved", "unknown_family"); return; }
      if (value.response_model !== this.context.model
        || typeof value.response_id !== "string" || value.response_id.length === 0
        || value.response_independence_domain !== this.context.independenceDomain
        || value.provider !== this.context.provider || value.profile !== "minimax"
        || value.endpoint_host !== "api.minimax.io" || value.tls_verified_host !== "api.minimax.io") {
        this.fail("identity_mismatch", "response_predicate"); return;
      }
      this.responses++; this.waitingForEvidence = false; this.state = "response"; this.assistantSeen = false;
    } else if (value.type === "assistant") {
      if (this.state !== "response" || this.assistantSeen || value.response_model !== this.context.model) { this.fail("identity_mismatch", "event_order"); return; }
      this.assistantSeen = true;
    } else if (value.type === "tool_use") {
      if ((this.state !== "response" && this.state !== "tools") || typeof value.tool_use_id !== "string"
        || value.tool_use_id.length === 0 || typeof value.name !== "string" || this.usedToolIds.has(value.tool_use_id)) {
        this.fail("identity_mismatch", "event_order"); return;
      }
      this.tools.set(value.tool_use_id, value.name); this.usedToolIds.add(value.tool_use_id); this.state = "tools";
    } else if (value.type === "tool_result") {
      if (this.state !== "tools" || typeof value.tool_use_id !== "string" || !this.tools.has(value.tool_use_id)
        || this.tools.get(value.tool_use_id) !== value.name) { this.fail("identity_mismatch", "event_order"); return; }
      this.tools.delete(value.tool_use_id);
    } else if (value.type === "result") {
      if ((this.state !== "response" && this.state !== "tools") || this.tools.size !== 0) { this.fail("identity_mismatch", "event_order"); return; }
      if (value.is_error !== false || value.subtype !== "success") { this.fail("provider_error", "result_error"); return; }
      if (attesting && !this.assistantSeen) { this.fail("identity_mismatch", "assistant_missing"); return; }
      this.state = "between";
      if (attesting) {
        this.attested = true;
        this.context.onAttested?.(this.version);
      }
    } else { this.fail("identity_mismatch", "event_order"); return; }
    // A live monitor consumes events in place and needs no session-long replay.
    if (!this.context.onAttested) this.events.push(Object.freeze({ executionId: this.context.executionId, sessionId: this.context.sessionId, event: freezeEvent(value) }));
  }
  finish(exitCode: number, signal: string | number | null = null): MadvResult {
    if (!this.finished) {
      try { this.buffer += this.decoder.decode(); } catch { this.fail("identity_mismatch", "malformed_stream"); }
      if (this.buffer.trim()) this.line(this.buffer);
      this.buffer = ""; this.checkDeadline(); this.finished = true;
      if (signal !== null) this.fail("provider_error", "signal");
      switch (exitCode) {
        case 0: break;
        case 5: this.fail("auth_failed", "exit"); break;
        case 6: this.fail("endpoint_refused", "exit"); break;
        case 1: this.fail("provider_error", "exit"); break;
        case 3: this.fail("identity_unavailable", "exit"); break;
        case 7: if (this.failed?.cause !== "domain_unresolved") this.fail("model_refused", "exit"); break;
        case 4: this.fail("identity_mismatch", "exit"); break;
        default: this.fail("provider_error", "unknown_exit");
      }
      if (!this.failed && (this.responses === 0 || this.waitingForEvidence)) this.fail("identity_unavailable", "model_response_missing");
      if (!this.failed && this.context.onAttested && !this.attested) this.fail("identity_unavailable", "result_missing");
      if (!this.failed && this.tools.size !== 0) this.fail("identity_mismatch", "event_order");
    }
    return this.snapshot();
  }
}
export function parseMadvIdentity(output: string, model: string, supportedVersions: readonly string[], exitCode = 0, signal: string | number | null = null): MadvResult {
  const parser = new MadvSurfaceParser({ [identityProbe]: true, executionId: "identity-probe", sessionId: "preflight", model, supportedVersions, provider: "minimax", independenceDomain: "minimax" });
  parser.push(output);
  return parser.finish(exitCode, signal);
}
export function parseMadvAuthReadiness(output: string, exitCode = 0, signal: string | number | null = null): MadvResult {
  const context = { executionId: "auth-probe", sessionId: "preflight" };
  try {
    const value: unknown = JSON.parse(output);
    if (exitCode !== 0 || signal !== null || !object(value)
      || value.loggedIn !== true || value.authMethod !== "plan_key" || value.profile !== "minimax"
      || value.provider !== "minimax" || value.endpointHost !== "api.minimax.io"
      || value.verified !== true || value.verifyMethod !== "read_only_endpoint") return failure(context, "auth_failed", "auth_predicate");
    return Object.freeze({ ok: true, events: Object.freeze([]), modelResponses: 0 });
  } catch { return failure(context, "auth_failed", "auth_predicate"); }
}

export { attestMadvSession } from "./live";
