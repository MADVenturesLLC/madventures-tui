# PLAN-OPEN-2 — Per-Adapter Environment Allowlists

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** Task 37 and tasks dependent on M16. Does not block independently reachable Tasks 38–39.
**Repository:** `MADVenturesLLC/madventures-tui`

---

## Claude Code (`claude-code-v1`)

```ts
const CLAUDE_CODE_V1: EnvironmentAllowlistV1 = {
  ref: "claude-code-v1",
  variables: [
    { name: "HOME", required: true, secret: false },
    { name: "PATH", required: true, secret: false },
    { name: "SHELL", required: true, secret: false },
    { name: "TERM", required: true, secret: false },
    { name: "TMPDIR", required: true, secret: false },
    { name: "CLAUDE_CONFIG_DIR", required: true, secret: false },

    { name: "LANG", required: false, secret: false },
    { name: "LC_ALL", required: false, secret: false },
    { name: "LC_CTYPE", required: false, secret: false },
    { name: "USER", required: false, secret: false },
  ],
};
```

## Antigravity (`antigravity-v1`)

```ts
const ANTIGRAVITY_V1: EnvironmentAllowlistV1 = {
  ref: "antigravity-v1",
  variables: [
    { name: "HOME", required: true, secret: false },
    { name: "PATH", required: true, secret: false },
    { name: "SHELL", required: true, secret: false },
    { name: "TERM", required: true, secret: false },
    { name: "TMPDIR", required: true, secret: false },

    { name: "LANG", required: false, secret: false },
    { name: "LC_ALL", required: false, secret: false },
    { name: "LC_CTYPE", required: false, secret: false },
    { name: "USER", required: false, secret: false },
  ],
};
```

---

## `CLAUDE_CONFIG_DIR` — shared installation-profile contract

The approved installation path is `<passwd-home>/.claude-madventures-v5`, where `<passwd-home>` is resolved from the authenticated user's passwd entry.

**Installation:** During installation, the launcher configuration resolves `<passwd-home>` from `getpwuid(getuid())` and records that installation-scoped value. The live POSIX launcher (`madbridge-claude-v5`) contains an installation-resolved export — it does not dynamically call `getpwuid` at each invocation.

**Launcher:** `madbridge-claude-v5` exports the installation-scoped value before executing Claude Code.

**Supervisor:** The supervisor inherits `CLAUDE_CONFIG_DIR` through that governed process environment. Before `buildAllowlistedEnvironment()` runs, the supervisor independently derives the expected value from `getpwuid(getuid())` and validates that ambient `CLAUDE_CONFIG_DIR` exists and equals it byte-for-byte. Missing or differing ambient `CLAUDE_CONFIG_DIR` fails closed.

**Constructed environment:** `buildAllowlistedEnvironment()` copies the validated ambient value into the constructed environment.

**Four-way equality:** A subsequent invocation of `madbridge-claude-v5` may re-export the same installation-scoped value idempotently. A differing value violates four-way equality and fails closed.

**No alternate variable or personal path:** The allowlist contains exactly `CLAUDE_CONFIG_DIR`. The repository must not commit a personal absolute path or introduce `MADBRIDGE_CLAUDE_CONFIG_DIR`.

---

## Authentication posture

### Claude Code

Claude Code evaluates cloud-provider routing first, then `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `apiKeyHelper`, `CLAUDE_CODE_OAUTH_TOKEN`, and finally subscription OAuth credentials. It also loads settings through managed, CLI (`--settings`), local (`.claude/settings.local.json`), project (`.claude/settings.json`), and user (`CLAUDE_CONFIG_DIR/settings.json`) scopes. Any of these scopes can inject an override-capable credential or redirect the provider route.

### Process-environment exclusions

The following variables are excluded from the constructed environment. Their presence in the ambient environment triggers no action beyond the standard non-allowlisted discard rule.

```text
ANTHROPIC_API_KEY
ANTHROPIC_AUTH_TOKEN
ANTHROPIC_BASE_URL
CLAUDE_CODE_OAUTH_TOKEN
ANTHROPIC_MODEL
CLAUDE_CODE_SUBAGENT_MODEL
GH_TOKEN
GITHUB_TOKEN
SSH_AUTH_SOCK
MADV_STORAGE_DIR
MADV_SESSION_ID
MADV_EXECUTION_ID
MADV_RUNTIME_DIR
MADV_SOCKET_PATH
```

### Configuration-source invariant

The supervisor must validate every effective settings source — managed, CLI, local (`.claude/settings.local.json`), project (`.claude/settings.json`), and user (`CLAUDE_CONFIG_DIR/settings.json`). For every `env` object in every effective settings source:

- Every key must belong to the approved `claude-code-v1` environment allowlist.
- Every resulting value must be byte-for-byte equal to the constructed environment.
- Any non-allowlisted key or differing value fails closed.

Additionally:

- `apiKeyHelper` must be absent from every effective settings source.
- For `claude-code-v1`, the governed invocation MUST NOT contain a `--settings` argument. Any occurrence fails closed.

These are configuration-source invariants, distinct from the process-environment discard rule above.

### Antigravity

Antigravity's active CLI session tokens are maintained through its host-owned login/keyring mechanism. Google API keys, ADC/cloud variables, and OAuth-token environment variables are excluded. `HOME` permits access to the CLI's host-owned configuration paths.

---

## Auth-readiness predicate (Claude Code)

The verified `claude auth status` output for Claude Code 2.1.233 is:

```json
{
  "loggedIn": true,
  "authMethod": "claude.ai",
  "apiProvider": "firstParty",
  "email": "***",
  "orgId": "***",
  "orgName": "***",
  "subscriptionType": "max"
}
```

The exact passing auth-readiness predicate is:

```text
loggedIn === true
authMethod === "claude.ai"
apiProvider === "firstParty"
subscriptionType === "max"
```

Exit code 0 alone is insufficient — it proves only "logged in," not that subscription OAuth is the active credential source. All four fields must match exactly. Any mismatch, missing field, or non-zero exit code fails the auth probe.

If a future Claude Code version changes the output shape, removes these fields, or the approved non-interactive probe (`["auth", "status"]`) no longer exposes them, Claude Code is classified as ineligible until a qualifying primitive is approved.

---

## Four-way equality semantics

1. **Missing required variables** → `buildAllowlistedEnvironment()` throws `MissingRequiredVariableError` (Task 37). Any Task 45 translation to a preflight failure code follows the approved preflight contract.
2. **Missing optional variables** → permitted (variable is absent from the constructed environment).
3. **Non-allowlisted ambient variables** → discarded (dropped, not treated as preflight failures).
4. The resulting constructed environment is reused **byte-for-byte** across:
   1. identity probe
   2. auth probe
   3. PTY host
   4. governed child

---

## Secret posture

Both profiles contain **zero `secret: true` variables**. The OAuth material lives in the macOS keychain and is accessed by the provider binary directly — no secret passes through the environment.

Secret-redaction behavior must still be tested using a fixture registration with a `secret: true` variable. Future API-key or gateway authentication requires a separately approved environment reference (e.g., `claude-code-v2`) rather than broadening these OAuth profiles.
