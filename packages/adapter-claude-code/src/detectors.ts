type Observation =
  | { kind: "auth_status"; exitCode: number }
  | { kind: "event"; event: Readonly<Record<string, unknown>> };

export function detectClaudeFailure(rules: readonly string[], observation: Observation):
  { surface: "claude-code"; cause: "auth_failed" | "identity_mismatch" } | undefined {
  if (observation.kind === "auth_status") {
    if (rules.includes("auth_status_exit_code:" + observation.exitCode)) return { surface: "claude-code", cause: "auth_failed" };
  } else {
    const event = observation.event;
    if (event.type === "system" && event.subtype === "model_refusal_fallback") {
      return { surface: "claude-code", cause: "identity_mismatch" };
    }
    if (event.type === "system" && event.subtype === "api_retry" && typeof event.error === "string" &&
      rules.includes("system/api_retry.error:" + event.error)) return { surface: "claude-code", cause: "auth_failed" };
  }
}
