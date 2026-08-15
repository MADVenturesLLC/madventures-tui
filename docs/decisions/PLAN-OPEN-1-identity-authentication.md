# PLAN-OPEN-1 — Identity and Authentication Design

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** Task 6 and registry-dependent downstream tasks; does not block independently reachable Stage 0 Tasks 38–39
**Repository:** `MADVenturesLLC/madventures-tui`

---

## Claude Code (`claude-code`)

| Field | Value |
|---|---|
| `surface` | `"claude-code"` |
| `executable_name` | `"madbridge-claude-v5"` |
| `provider` | `"anthropic"` |
| `independence_domain` | `"anthropic"` |
| `organization_id` | `"anthropic"` |
| `identity_probe.parse` | `"json"` |
| `identity_probe.argv` | `["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"]` |
| `auth_readiness_probe.parse` | `"json"` |
| `auth_readiness_probe.argv` | `["auth", "status"]` |
| `non_interactive_flags` | `["--print", "--input-format", "stream-json", "--output-format", "stream-json", "--verbose", "--no-session-persistence"]` |
| `environment_allowlist_ref` | `"claude-code-v1"` |
| `supported_versions` | `["2.1.233"]` |
| `auth_failure_detection` | `["auth_status_exit_code:1", "system/api_retry.error:authentication_failed", "system/api_retry.error:oauth_org_not_allowed"]` |
| `limitations` | `["fable is requested intent only; live eligibility requires exact equality with system/init.model"]` |

**argv semantics:** `identity_probe.argv` and `auth_readiness_probe.argv` contain arguments only and do not repeat `executable_name`. The supervisor prepends `executable_name` to construct the full command.

Task 45 appends `["--model", envelope.model]` to `identity_probe.argv` and supplies the controlled stream-JSON probe input on stdin.

**Identity evidence:** `system/init.model` from a controlled stream-JSON session. The attestation parser MUST use the resolved model from `system/init`; the `--model fable` flag alone is never passing evidence. Claude documents `system/init` as carrying session model metadata.

**Live status:** Fail closed unless `system/init` reports the exact model requested by the envelope. Automatic fallback to Sonnet, Grok, or another model is prohibited. A mismatch, missing initialization event, authentication failure, or unsupported CLI version fails closed.

**`non_interactive_flags` contains only fixed flags.** `--model` is dynamic (envelope-supplied) and is NOT stored as a fixed flag. The launch descriptor later supplies `["--model", envelope.model]`. `fable` is a requested alias, not exact identity evidence. The governed session remains ineligible until `system/init.model` reveals the exact resolved model ID and it exactly matches the envelope.

## Antigravity (`antigravity`)

| Field | Value |
|---|---|
| `surface` | `"antigravity"` |
| `executable_name` | `"agy"` |
| `provider` | `"google"` |
| `independence_domain` | `"google"` |
| `organization_id` | `"google"` |
| `identity_probe.parse` | `"kv"` |
| `identity_probe.argv` | `["config", "get", "model"]` |
| `auth_readiness_probe` | `null` |
| `non_interactive_flags` | `[]` |
| `environment_allowlist_ref` | `"antigravity-v1"` |
| `supported_versions` | `["1.1.13"]` |
| `auth_failure_detection` | `[]` |
| `limitations` | `["configuration-only identity evidence — no actual-session identity primitive exists", "no documented non-mutating non-interactive auth-readiness primitive"]` |

**Identity evidence:** `agy config get model` is configuration-only failing evidence per the rubric (§2.2). It is explicitly recorded as such.

**Live status:** Ineligible until a qualifying actual-session identity primitive and auth-readiness primitive exist. The `identity_probe` is recorded for investigation purposes only; the surface is excluded from the candidate pair for live sessions.

---

## Interface correction

The `AdapterRegistrationV1` type carries `readonly provider: string;` as already approved by the Founder. `ExecutionIdentity` already carries `provider` from Task 5.

---

## Scope corrections

1. **Task 6 creates the closed registry only** — does NOT rewrite `packages/adapter-claude-code/src/attestation.ts` or `packages/adapter-antigravity/src/attestation.ts`. Those attesters remain unchanged until their respective tasks.

2. **Task ownership:**

| Concern | Task |
|---|---|
| Identity schema alignment (`ExecutionIdentity` migration) | Task 5 |
| Closed registry creation (values from this ruling) | Task 6 |
| Durable capability evidence (investigation records) | Tasks 35–36 |
| Pure preflight with actual-session identity probes | Task 45 |
| Live re-attestation | Task 46 |
