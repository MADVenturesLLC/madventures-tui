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

## Authentication posture

### Claude Code

Claude Code evaluates cloud-provider routing first, then `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `apiKeyHelper`, `CLAUDE_CODE_OAUTH_TOKEN`, and finally subscription OAuth credentials. All override-capable credential variables are excluded from `claude-code-v1`, preserving the governed subscription-login route.

Explicitly excluded:

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

### Antigravity

Antigravity's active CLI session tokens are maintained through its host-owned login/keyring mechanism. Google API keys, ADC/cloud variables, and OAuth-token environment variables are excluded. `HOME` permits access to the CLI's host-owned configuration paths.

Explicitly excluded: Google API keys, cloud credentials, OAuth tokens, and all `MADV_*` variables.

---

## Four-way equality semantics

1. **Missing required variables** → fail closed.
2. **Missing optional variables** → permitted (variable is absent from the constructed environment).
3. **Non-allowlisted ambient variables** → discarded (dropped, not treated as preflight failures).
4. The resulting constructed environment is reused **byte-for-byte** across:
   1. identity probe
   2. auth probe
   3. PTY host
   4. governed child

### `CLAUDE_CONFIG_DIR` launcher condition

`CLAUDE_CONFIG_DIR` must already exist with the governed value in the supervisor's ambient environment before `buildAllowlistedEnvironment()` runs. The launcher's later export cannot satisfy a missing required variable; it may only repeat the same value idempotently.

The live launcher `madbridge-claude-v5` (`~/.local/bin/madbridge-claude-v5`) exports:

```sh
export CLAUDE_CONFIG_DIR="/Users/michaeldaley/.claude-madventures-v5"
```

The supervisor must construct the environment with this exact value. When the launcher re-exports it, the assignment is idempotent and four-way equality passes.

---

## Secret posture

Both profiles contain **zero `secret: true` variables**. The OAuth material lives in the macOS keychain and is accessed by the provider binary directly — no secret passes through the environment.

Secret-redaction behavior must still be tested using a fixture registration with a `secret: true` variable. Future API-key or gateway authentication requires a separately approved environment reference (e.g., `claude-code-v2`) rather than broadening these OAuth profiles.
