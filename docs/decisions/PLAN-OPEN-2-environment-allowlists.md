# PLAN-OPEN-2 — Per-Adapter Environment Allowlists

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** Task 37 and tasks dependent on M16. Does not block independently reachable Tasks 38–39.
**Repository:** `MADVenturesLLC/madventures-tui`
**Founder approval record:** [Phase 3A PLAN-OPEN Rulings — Founder Approval Record](PLAN-OPEN-approval-record.md)

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

## Installation identity boundary

Each governed adapter installation is per-user. There is no cross-user
handoff.

The common per-user installation profile used by both `claude-code-v1` and
`antigravity-v1` records:

- `installation_uid` — `os.userInfo().uid` at installation time
- `passwd_home` — `os.userInfo().homedir`
- `approved_path` — the PATH approved by the governed installer

`os.userInfo()` represents the current effective OS user. On POSIX, it returns
information from the passwd entry corresponding to that effective user,
including the UID, home directory, and shell used by this ruling. The standard
Node.js interface used by the TypeScript runtime is sufficient; no direct FFI
or native `getpwuid()` call is required.

The `claude-code-v1` profile additionally records:

- `claude_config_dir` — `<passwd_home>/.claude-madventures-v5`

Invocation is eligible only when **all** of the following are true:

1. `os.userInfo().uid` equals the recorded `installation_uid`
2. `os.userInfo().homedir` equals the recorded `passwd_home`
3. *(claude-code-v1 only)* The recorded `claude_config_dir` equals
   `<recorded-passwd-home>/.claude-madventures-v5`
4. *(claude-code-v1 only)* Ambient `CLAUDE_CONFIG_DIR` exists and equals
   the recorded value byte-for-byte
5. Ambient `HOME` exists and equals the recorded `passwd_home` byte-for-byte

Predicates 1, 2, and 5 apply to both adapters. Predicates 3 and 4 apply only to
`claude-code-v1`.

A different UID fails closed even if two passwd entries happen to share the same
home path. Missing or differing `HOME` fails closed as `home_mismatch`. A
required `HOME` value is never copied into the constructed environment until
this validation passes.

These checks are preconditions to environment construction;
`buildAllowlistedEnvironment()` is not reached if any fails.

---

## `SHELL` — trusted producer

Ambient `SHELL` must exist and equal `os.userInfo().shell`
byte-for-byte. Missing or differing `SHELL` fails closed.

This rule applies to both `claude-code-v1` and `antigravity-v1`.

## `PATH` — trusted producer

The trusted `PATH` producer is the common per-user installation profile used by
both governed adapters. Before `buildAllowlistedEnvironment()` runs, the
supervisor reads the recorded `approved_path`, validates every component under
the rules below, and requires ambient `PATH` to equal the recorded value
byte-for-byte. The validated value is then copied into the constructed
environment. A provider launcher may only inherit or idempotently re-export that
same value; it is not the authority.

The installer may record only `PATH` entries that:

- are absolute;
- contain no empty component;
- resolve to existing directories;
- are owned by root or the recorded `installation_uid`; and
- are not group-writable or world-writable.

Missing or differing `PATH`, or an invalid recorded component, fails closed.
Runtime ambient `PATH` is not the authority.

This rule applies to both `claude-code-v1` and `antigravity-v1`.

## `HOME` — trusted producer

Ambient `HOME` must exist and equal the recorded `passwd_home` byte-for-byte.
Missing or differing `HOME` fails closed as `home_mismatch`.

This rule applies to both `claude-code-v1` and `antigravity-v1`.

## `CLAUDE_CONFIG_DIR` — claude-code-v1 only

The recorded `claude_config_dir` is `<passwd_home>/.claude-madventures-v5`.
Ambient `CLAUDE_CONFIG_DIR` must exist and equal the recorded value
byte-for-byte. Missing or differing `CLAUDE_CONFIG_DIR` fails closed.

This rule applies only to `claude-code-v1`.

**No alternate variable or personal path:** The repository must not commit a
personal absolute path or introduce `MADBRIDGE_CLAUDE_CONFIG_DIR`.
`claude-code-v1` uses only the installation-profile `claude_config_dir` and the
allowlisted `CLAUDE_CONFIG_DIR`.

If the live launcher or installation profile cannot yet satisfy the `PATH`,
`SHELL`, `HOME`, or `CLAUDE_CONFIG_DIR` requirements, the affected profile
remains ineligible rather than falling back.

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

### Provider-routing and endpoint invariant

For `claude-code-v1`, the approved settings-source allowlist for
provider-routing and endpoint overrides is empty.

Across every effective settings source — managed, CLI, local
(`.claude/settings.local.json`), project (`.claude/settings.json`), and user
(`CLAUDE_CONFIG_DIR/settings.json`) — the following are prohibited regardless
of value:

- any top-level provider-routing or endpoint control, including
  `apiProvider` or `customApiUrl`;
- `apiKeyHelper`;
- any endpoint override supplied through `env`, including
  `ANTHROPIC_BASE_URL`, `ANTHROPIC_BEDROCK_BASE_URL`,
  `ANTHROPIC_BEDROCK_MANTLE_BASE_URL`, `ANTHROPIC_VERTEX_BASE_URL`, or
  `ANTHROPIC_FOUNDRY_BASE_URL`;
- any provider selector supplied through `env`, including
  `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_MANTLE`,
  `CLAUDE_CODE_USE_VERTEX`, or `CLAUDE_CODE_USE_FOUNDRY`; and
- any additional control recognized by the supported CLI version as selecting
  a provider, endpoint, proxy, or gateway.

The existing environment-allowlist rule independently rejects these variables
because none belongs to `claude-code-v1`. Their presence in any effective
settings source fails closed.

After settings-source validation, the approved auth-readiness probe must report
`apiProvider === "firstParty"`. This field is probe evidence, not an allowed
settings control. Any other result fails as `auth_not_ready`, and no governed
child is launched.

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

The parser requires a JSON object containing all four predicate fields with
these exact types and values. Missing fields, incorrect types, mismatched
values, malformed JSON, or a non-zero exit code fail the auth probe. Unrelated
additive fields are permitted and ignored; they do not change eligibility.

### Bounded auth-probe execution

The approved `["auth", "status"]` probe has these exact execution bounds:

- execution deadline: `5_000` milliseconds, measured with a monotonic clock
  from probe invocation through spawn, normal exit observation, and normal
  reaping;
- forced-cleanup budget: at most `1_000` additional milliseconds, measured with
  a monotonic clock — a `SIGTERM` grace of no more than the first `500`
  milliseconds, then `SIGKILL` if the probe is still alive with no more than
  the remaining `500` milliseconds to observe and reap termination;
- maximum total elapsed time: `6_000` milliseconds, the execution deadline plus
  the forced-cleanup budget;
- stdout limit: `65_536` raw bytes; and
- stderr limit: `65_536` raw bytes.

Exactly `65_536` bytes on either stream is permitted. Receiving the first byte
beyond either limit is oversized output and fails closed.

Any failure to spawn the probe, including a missing executable or a permission
error, produces `auth_not_ready`. The execution deadline starts at probe
invocation, so a probe that fails to spawn consumes bounded time and fails
closed without a result.

The probe accepts the preflight cancellation signal. Cancellation before spawn
prevents the probe from starting. Cancellation after spawn, timeout, or
oversized output terminates the probe within the forced-cleanup budget: the
supervisor sends `SIGTERM`, waits no more than the first `500` milliseconds of
grace, sends `SIGKILL` if the probe is still alive, and observes and reaps the
termination within the remaining `500` milliseconds. Cleanup or reaping failure
is fail-closed `auth_not_ready`, and no governed launch may proceed after
cleanup-budget exhaustion.

The following each produce `auth_not_ready`:

- timeout;
- spawn failure, including a missing executable or permission error;
- cancellation;
- termination by any signal;
- stdout exceeding its limit;
- stderr exceeding its limit;
- failure to terminate and reap within the bounded cleanup path;
- malformed JSON;
- a missing, incorrectly typed, or mismatched predicate field; or
- a non-zero exit code.

Parsing occurs only after a clean zero-status exit within the execution
deadline, normal reaping complete, and both output limits respected. Raw stdout
and stderr are never included in diagnostics or evidence.

Diagnostics and evidence may contain only:

- the normalized auth-readiness result (`pass` or `auth_not_ready`);
- the approved probe primitive;
- exit or signal status;
- stream names; and
- stream byte counts.

`email`, `orgId`, `orgName`, and every unapproved additive field must always be
omitted or redacted.

These bounds apply only to the auth-readiness probe. They do not amend §9.8,
which remains the normative deadline table for PTY-host response and
termination.

Task 45 must include deterministic tests for spawn failure, execution-deadline
accounting through normal reaping, forced-cleanup-budget accounting (the
`SIGTERM` grace, `SIGKILL` escalation, and reaping within the `1_000`
millisecond budget), cleanup-budget exhaustion, metadata-only evidence and
redaction on successful output and every failure path, timeout, pre-spawn
cancellation, post-spawn cancellation, signal termination, stdout overflow,
stderr overflow, forced `SIGKILL`, and successful bounded execution.

`subscriptionType === "max"` is intentional. The `claude-code-v1` profile
authorizes the Max subscription tier only. Any other subscription tier requires
a separately Founder-approved profile or ruling.

If a future Claude Code version removes, renames, changes the type of, or
changes the meaning of a required predicate field — or the approved
non-interactive probe (`["auth", "status"]`) no longer exposes it — Claude Code
is ineligible until a qualifying primitive is approved.

---

## Enforcement ownership

Task 37 implements the pure allowlist constructor. It copies required and
present optional variables only after its caller supplies an eligible ambient
environment; it does not read or validate the installation profile.

Task 45 owns the preflight validation of:

- installation UID and passwd home;
- `HOME`;
- `CLAUDE_CONFIG_DIR`;
- `PATH`;
- `SHELL`;
- `TERM`;
- `TMPDIR`;
- effective Claude Code settings sources; and
- absence of `apiKeyHelper` and `--settings`.

Task 45 must complete these environment-independent checks before calling
`buildAllowlistedEnvironment()`, and must construct the allowlisted environment
exactly once. After construction succeeds, Task 45 runs the identity probe and
the auth-readiness probe using that exact constructed environment. No governed
process may launch until both probes succeed. An identity-probe failure
continues to map to `identity_mismatch` under the existing PLAN-OPEN-1 and
Task 45 contract; this revision does not alter that mapping.

Missing or differing `HOME` produces `home_mismatch`. An invalid installation
UID, passwd-home relationship, installation profile, `CLAUDE_CONFIG_DIR`,
`PATH`, `SHELL`, `TERM`, `TMPDIR`, effective settings source, `apiKeyHelper`,
or `--settings` argument produces `auth_not_ready`, and a non-passing
auth-readiness result likewise produces `auth_not_ready`. No governed process
is launched. This ruling does not add a new `PreflightFailure` member;
`PreflightFailure` remains exactly eleven members.

---

## Four-way equality semantics

1. **Missing required variables** → Task 45 validates `TERM` and `TMPDIR` before `buildAllowlistedEnvironment()`; a missing `TERM` or `TMPDIR` maps to `auth_not_ready`. `buildAllowlistedEnvironment()` still throws `MissingRequiredVariableError` (Task 37) for any required variable that reaches it, and Task 45 catches that error and maps it to `auth_not_ready` as a fail-closed fallback.
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
