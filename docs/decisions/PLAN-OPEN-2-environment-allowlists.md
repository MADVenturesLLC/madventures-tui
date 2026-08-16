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

## Installation identity boundary

Each governed adapter installation is per-user. There is no cross-user
handoff.

The common per-user installation profile used by both `claude-code-v1` and
`antigravity-v1` records:

- `installation_uid` — `os.userInfo().uid` at installation time
- `passwd_home` — `os.userInfo().homedir`
- `approved_path` — the PATH approved by the governed installer

`os.userInfo()` represents the authenticated user's passwd entry through the
standard Node.js interface used by the TypeScript runtime. No direct FFI or
native `getpwuid()` call is required.

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
- effective Claude Code settings sources;
- absence of `apiKeyHelper` and `--settings`; and
- the auth-readiness predicate.

Task 45 must complete these checks before calling
`buildAllowlistedEnvironment()`. Missing or differing `HOME` produces
`home_mismatch`. An invalid installation UID, passwd-home relationship,
installation profile, `CLAUDE_CONFIG_DIR`, `PATH`, `SHELL`, effective settings
source, `apiKeyHelper`, `--settings` argument, or auth-readiness result produces
`auth_not_ready`. No governed process is launched. This ruling does not add a
new `PreflightFailure` member.

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
