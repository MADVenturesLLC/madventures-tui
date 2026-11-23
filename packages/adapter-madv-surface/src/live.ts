import { detectMadvFailure } from "./detectors";
import { EVIDENCE_DEADLINE_MS, MadvSurfaceParser, encodeAttestationInput, encodeUserInput,
  type MadvFailureCause, type MadvResult } from "./index";

const PROMPT = "Reply with your model identifier and nothing else.";
type Cause = MadvFailureCause | "attestation_deadline" | "attestation_cancelled" |
  "attestation_tool_call" | "attestation_round_trips" | "attestation_budget_exhausted";
interface Input {
  executionId: string;
  sessionId: string;
  model: string;
  signal: AbortSignal;
  reportFailure(cause: string): void;
  registration: { auth_failure_detection: readonly string[]; supported_versions: readonly string[]; provider: string; independence_domain: string };
  host: { handle: {
    facts(): AsyncIterable<{ kind: string; bytes?: Uint8Array; code?: number | null; signal?: string | null }>;
    send(frame: { kind: "input"; bytes: Uint8Array }): void;
  } };
}
type Failure = { ok: false; surface: "madv-surface"; cause: Cause; reason: Cause; parserReason?: string };
type Verdict = Failure | { ok: true; evidenceKind: "actual_session"; provider: string;
  model: string; cliVersion: string; sendUserInput(text: string): boolean };

export function attestMadvSession(input: Input, reserveWrite: () => boolean = () => true): Promise<Verdict> {
  const { promise, resolve } = Promise.withResolvers<Verdict>();
  let deadline = Infinity;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let failure: Failure | undefined;
  let ready = false;
  let closed = false;

  function stop(cause: Cause, parserReason?: string): void {
    if (failure) return;
    failure = { ok: false, surface: "madv-surface", cause, reason: cause, ...(parserReason === undefined ? {} : { parserReason }) };
    clearTimeout(timer);
    input.reportFailure(cause);
  }
  const abort = () => stop("attestation_cancelled");
  const parser = new MadvSurfaceParser({
    executionId: input.executionId, sessionId: input.sessionId, model: input.model,
    authFailureDetection: input.registration.auth_failure_detection,
    supportedVersions: input.registration.supported_versions, provider: input.registration.provider,
    independenceDomain: input.registration.independence_domain,
    onAttested(version) {
      if (performance.now() >= deadline) { stop("attestation_deadline"); return; }
      clearTimeout(timer);
      ready = true;
      resolve({ ok: true, evidenceKind: "actual_session", provider: input.registration.provider,
        model: input.model, cliVersion: version, sendUserInput });
    },
  });
  function inspect(result: MadvResult): void {
    const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "parsed", result });
    if (detection) stop(parser.attestationFailure ?? detection.cause, detection.reason);
  }
  function write(frame: string): void {
    input.host.handle.send({ kind: "input", bytes: new TextEncoder().encode(frame) });
  }
  function sendUserInput(text: string): boolean {
    if (closed || !ready || failure) return false;
    inspect(parser.beginRequest());
    if (failure) return false;
    clearTimeout(timer);
    timer = setTimeout(() => inspect(parser.checkDeadline()), EVIDENCE_DEADLINE_MS);
    try { write(encodeUserInput(text)); } catch { stop("provider_error"); }
    return !failure;
  }
  async function consume(): Promise<void> {
    try {
      for await (const fact of input.host.handle.facts()) {
        if (failure) break;
        if (!ready && performance.now() >= deadline) { stop("attestation_deadline"); break; }
        if (fact.kind === "output" && fact.bytes) inspect(parser.push(fact.bytes));
        if (fact.kind === "exited") {
          const exitCode = fact.code ?? 1;
          const result = parser.finish(exitCode, fact.signal ?? null);
          const detection = detectMadvFailure(input.registration.auth_failure_detection, { kind: "child_exit", exitCode });
          if (detection && !parser.attestationFailure) stop(detection.cause, detection.reason);
          else inspect(result);
          break;
        }
        if (failure) break;
      }
      if (!failure) inspect(parser.finish(0));
    } catch { stop("identity_mismatch", "malformed_stream"); }
    finally {
      closed = true;
      clearTimeout(timer);
      input.signal.removeEventListener("abort", abort);
      if (failure) resolve(failure);
      else if (!ready) resolve({ ok: false, surface: "madv-surface", cause: "identity_unavailable",
        reason: "identity_unavailable", parserReason: "result_missing" });
    }
  }
  input.signal.addEventListener("abort", abort, { once: true });
  void consume();
  if (input.signal.aborted) abort();
  else if (!reserveWrite()) stop("attestation_budget_exhausted");
  else {
    deadline = performance.now() + EVIDENCE_DEADLINE_MS;
    timer = setTimeout(() => stop("attestation_deadline"), EVIDENCE_DEADLINE_MS);
    try { write(encodeAttestationInput(PROMPT)); } catch { stop("provider_error"); }
  }
  return promise;
}
