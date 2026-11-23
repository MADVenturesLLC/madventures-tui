import type { MadvResult, MadvFailureCause } from "./index";

type Observation =
  | { kind: "auth_status"; exitCode: number; verified?: unknown }
  | { kind: "event"; type: unknown; subtype: unknown }
  | { kind: "child_exit"; exitCode: number }
  | { kind: "parsed"; result: MadvResult };

export function detectMadvFailure(rules: readonly string[], observation: Observation):
  { surface: "madv-surface"; cause: MadvFailureCause; reason: string } | undefined {
  switch (observation.kind) {
    case "auth_status":
      if (rules.includes("auth_status_exit_code:" + observation.exitCode) ||
        (observation.verified === false && rules.includes("auth_status.verified:false"))) {
        return { surface: "madv-surface", cause: "auth_failed", reason: "auth_predicate" };
      }
      break;
    case "event":
      if (observation.type === "system" && observation.subtype === "auth_failed" && rules.includes("system/auth_failed")) {
        return { surface: "madv-surface", cause: "auth_failed", reason: "surface_fail_closed" };
      }
      break;
    case "child_exit":
      if (rules.includes("exit_code:" + observation.exitCode)) return { surface: "madv-surface", cause: "auth_failed", reason: "exit" };
      break;
    case "parsed":
      if (!observation.result.ok) return { surface: "madv-surface", cause: observation.result.cause, reason: observation.result.reason };
  }
}
