const PROMPT = "Reply with your model identifier and nothing else.";
const DEADLINE_MS = 30_000;

export function encodeUserInput(text: string): string {
  return JSON.stringify({ type: "user", message: { role: "user", content: text } }) + "\n";
}

type Cause = "attestation_missing" | "attestation_malformed" | "attestation_duplicate" |
  "identity_mismatch" | "auth_failed" | "attestation_deadline" | "attestation_cancelled" |
  "attestation_tool_call" | "attestation_round_trips" | "attestation_budget_exhausted";
type Verdict =
  | { ok: true; evidenceKind: "actual_session"; provider: "anthropic"; model: string; cliVersion: string }
  | { ok: false; surface: "claude-code"; cause: Cause; reason: Cause };

interface Fact { kind: string; bytes?: Uint8Array }
interface Input {
  model: string;
  signal: AbortSignal;
  reportFailure(reason: string): void;
  registration: { supported_versions: readonly string[]; auth_failure_detection: readonly string[] };
  host: { handle: {
    send(frame: { kind: "input"; bytes: Uint8Array }): void;
    facts(): AsyncIterable<Fact>;
  } };
}

const object = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const nonempty = (value: unknown): value is string => typeof value === "string" && value.length > 0;

function matchesUsage(value: unknown, model: string, requireEvidence: boolean): boolean {
  if (!object(value)) return false;
  const entries = Object.entries(value);
  return (!requireEvidence || entries.length > 0) && entries.every(([key, usage]) =>
    key === model && object(usage) && usage.canonicalModel === model && usage.provider === "firstParty");
}

class ClaudeReader {
  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
  private tail = "";
  private session: string | undefined;
  version = "";
  complete = false;
  private assistantSeen = false;
  private readonly models = new Map<string, string>();
  private retries = 0;

  constructor(private readonly input: Input, private readonly passed: () => void) {}

  push(bytes: Uint8Array): Cause | undefined {
    try {
      this.tail += this.decoder.decode(bytes, { stream: true });
      let newline: number;
      while ((newline = this.tail.indexOf("\n")) >= 0) {
        const line = this.tail.slice(0, newline);
        this.tail = this.tail.slice(newline + 1);
        const failure = this.event(JSON.parse(line));
        if (failure) return failure;
      }
    } catch { return "attestation_malformed"; }
  }

  finish(): Cause | undefined {
    try {
      this.tail += this.decoder.decode();
      if (this.tail.length) return this.event(JSON.parse(this.tail));
    } catch { return "attestation_malformed"; }
  }

  private event(event: unknown): Cause | undefined {
    if (!object(event) || !nonempty(event.type)) return "attestation_malformed";
    if (this.complete && event.type !== "assistant" && event.type !== "result" &&
      !(event.type === "system" && (event.subtype === "model_refusal_fallback" || event.subtype === "api_retry"))) return;
    if (!nonempty(event.session_id)) return "attestation_malformed";
    if (this.session !== undefined && event.session_id !== this.session) return "attestation_duplicate";
    if (event.type === "system" && event.subtype === "model_refusal_fallback") return "identity_mismatch";
    if (event.type === "system" && event.subtype === "api_retry" && typeof event.error === "string" &&
      this.input.registration.auth_failure_detection.includes("system/api_retry.error:" + event.error)) return "auth_failed";
    if (!this.complete && event.parent_tool_use_id != null) return "attestation_tool_call";

    if (event.type === "system" && event.subtype === "init") {
      if (this.session !== undefined) return this.complete ? undefined : "attestation_duplicate";
      if (event.model !== this.input.model || !nonempty(event.claude_code_version) ||
        !this.input.registration.supported_versions.includes(event.claude_code_version)) return "identity_mismatch";
      this.session = event.session_id;
      this.version = event.claude_code_version;
      return;
    }
    if (this.session === undefined) return "attestation_malformed";
    if (event.type === "assistant") {
      const msg = event.message;
      if (!object(msg) || !nonempty(msg.id) || !nonempty(msg.model)) return "attestation_malformed";
      const previous = this.models.get(msg.id);
      if (previous !== undefined && previous !== msg.model) return "attestation_duplicate";
      if (msg.model !== this.input.model) return "identity_mismatch";
      if (!this.complete) {
        if (!Array.isArray(msg.content)) return "attestation_malformed";
        if (msg.content.some(item => !object(item) || (item.type !== "text" && item.type !== "thinking"))) return "attestation_tool_call";
      }
      this.models.set(msg.id, msg.model);
      this.assistantSeen = true;
      return;
    }
    if (event.type === "result") {
      if (!this.assistantSeen) return this.complete ? "attestation_duplicate" : "attestation_missing";
      if (!this.complete) {
        if (event.permission_denials !== undefined) {
          if (!Array.isArray(event.permission_denials)) return "attestation_malformed";
          if (event.permission_denials.length > 0) return "attestation_tool_call";
        }
        if (typeof event.num_turns !== "number" || !Number.isSafeInteger(event.num_turns) || event.num_turns < 1) {
          return "attestation_malformed";
        }
        if (event.num_turns + this.retries > 2) return "attestation_round_trips";
      }
      if (event.subtype !== "success" || event.is_error !== false ||
        !matchesUsage(event.modelUsage, this.input.model, true) ||
        (event.model_usage_since_last_result !== undefined &&
          !matchesUsage(event.model_usage_since_last_result, this.input.model, false))) return "identity_mismatch";
      this.assistantSeen = false;
      if (!this.complete) {
        this.complete = true;
        this.passed();
      }
      return;
    }
    if (this.complete || event.type === "rate_limit_event") return;
    if (event.type === "system") {
      if (event.subtype === "api_retry") { this.retries++; return; }
      if (event.subtype === "thinking_tokens" || event.subtype === "informational" || event.subtype === "commands_changed") return;
    }
    return "attestation_malformed";
  }
}

export function attestClaudeSession(input: Input, reserveWrite: () => boolean = () => true): Promise<Verdict> {
  const { promise, resolve } = Promise.withResolvers<Verdict>();
  let deadline = Infinity;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let failed: Cause | undefined;
  function stop(cause: Cause): void {
    if (failed) return;
    failed = cause;
    clearTimeout(timer);
    input.reportFailure(cause);
  }
  const abort = () => stop("attestation_cancelled");
  const reader = new ClaudeReader(input, () => {
    if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
    clearTimeout(timer);
    resolve({ ok: true, evidenceKind: "actual_session", provider: "anthropic", model: input.model, cliVersion: reader.version });
  });
  async function consume(): Promise<void> {
    try {
      for await (const fact of input.host.handle.facts()) {
        if (failed) break;
        if (!reader.complete && performance.now() >= deadline) { stop("attestation_deadline"); break; }
        if (fact.kind === "output" && fact.bytes) {
          const cause = reader.push(fact.bytes);
          if (cause) stop(cause);
        } else if (fact.kind === "exited" || fact.kind === "drained") {
          stop(reader.finish() ?? "attestation_missing");
        }
        if (failed) break;
      }
      if (!failed) stop(reader.finish() ?? "attestation_missing");
    } catch { stop("attestation_malformed"); }
    finally {
      clearTimeout(timer);
      input.signal.removeEventListener("abort", abort);
      const cause = failed ?? "attestation_missing";
      resolve({ ok: false, surface: "claude-code", cause, reason: cause });
    }
  }
  input.signal.addEventListener("abort", abort, { once: true });
  void consume();
  if (input.signal.aborted) abort();
  else if (!reserveWrite()) stop("attestation_budget_exhausted");
  else {
    deadline = performance.now() + DEADLINE_MS;
    timer = setTimeout(() => stop("attestation_deadline"), DEADLINE_MS);
    try { input.host.handle.send({ kind: "input", bytes: new TextEncoder().encode(encodeUserInput(PROMPT)) }); }
    catch { stop("attestation_missing"); }
  }
  return promise;
}
