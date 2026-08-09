# MadBridge TUI V1 — Verification Evidence

**Date:** 2026-08-08  
**Repository:** madventures-tui  
**Protocol Version:** madbridge-protocol/v1  

---

## Environment

| Check | Status | Detail |
|-------|--------|--------|
| Platform | ok | darwin/x64 |
| Bun | ok | 1.3.14 |
| Claude Code | warn | claude not found in PATH |
| agy | warn | agy not found in PATH |
| OpenTUI | ok | @opentui/core resolvable |
| Exact Model Visibility | warn | config not found for: antigravity |
| Directory Permissions | ok | /Users/michaeldaley/madventures-tui read/write |
| Adapter Protocol | ok | protocol=madbridge-protocol/v1 |

### Doctor JSON Output

```json
{"ok":true,"checks":[{"name":"platform","status":"ok","detail":"darwin/x64"},{"name":"bun","status":"ok","detail":"1.3.14"},{"name":"claude-code","status":"warn","detail":"claude not found in PATH"},{"name":"agy","status":"warn","detail":"agy not found in PATH"},{"name":"opentui","status":"ok","detail":"@opentui/core resolvable"},{"name":"exact-model-visibility","status":"warn","detail":"config not found for: antigravity"},{"name":"directory-permissions","status":"ok","detail":"/Users/michaeldaley/madventures-tui read/write"},{"name":"adapter-protocol","status":"ok","detail":"protocol=madbridge-protocol/v1"}]}
```

**Notes:**
- The `doctor` command performed read-only checks only — no filesystem mutations occurred.
- Platform is `darwin/x64` (Intel Mac). The `doctor` command correctly detects and reports architecture without mutation.
- Claude Code and agy are not installed on the verification host; both adapter capability results are reported as `warn` (not `fail`). This is a known limitation, not a regression.
- The `exact-model-visibility` check reports `warn` for antigravity config absence — adapter attestation fails closed in this state.

---

## Acceptance Gate Results

### bun install --frozen-lockfile

```
bun install v1.3.14 (0d9b296a)

Done! Checked 47 packages (no changes) [5.00ms]
```

### bun run typecheck

```
$ bunx tsc --noEmit
```

Result: **PASS** (no errors)

### bun test

```
343 pass
0 fail
958 expect() calls
Ran 343 tests across 32 files. [912.00ms]
```

Result: **PASS** — all 343 tests pass (259 pre-existing + 84 new acceptance tests)

### bun run apps/madbridge/src/cli.ts doctor --json

```json
{"ok":true,"checks":[{"name":"platform","status":"ok","detail":"darwin/x64"},{"name":"bun","status":"ok","detail":"1.3.14"},{"name":"claude-code","status":"warn","detail":"claude not found in PATH"},{"name":"agy","status":"warn","detail":"agy not found in PATH"},{"name":"opentui","status":"ok","detail":"@opentui/core resolvable"},{"name":"exact-model-visibility","status":"warn","detail":"config not found for: antigravity"},{"name":"directory-permissions","status":"ok","detail":"/Users/michaeldaley/madventures-tui read/write"},{"name":"adapter-protocol","status":"ok","detail":"protocol=madbridge-protocol/v1"}]}
```

Result: **PASS** — `ok: true`, no filesystem mutations

### bun run apps/madbridge/src/cli.ts verify-ledger --json

```json
{"ok":true,"valid":true,"count":1,"head":"000000000000000000000000000000000000000000000000264cd2970a141820"}
```

Result: **PASS** — complete valid chain, 1 event, hash chain verified from genesis to head

---

## Tested Versions

| Component | Version |
|-----------|---------|
| Git SHA | c3fc284c485246711a00d8ade56e32a69fbb31fc |
| Bun | 1.3.14 |
| Claude Code | not installed (warn) |
| agy | not installed (warn) |
| Protocol | madbridge-protocol/v1 |

---

## Adapter Capability Status

| Adapter | Status | Notes |
|---------|--------|-------|
| Claude Code | warn | `claude` binary not found in PATH on verification host |
| Antigravity | warn | `agy` binary not found in PATH; no machine-verifiable exact-model primitive |

Both adapters fail closed when the CLI binary or exact model is unverifiable. The attestation tests (`packages/adapter-claude-code/test/attestation.test.ts`, `packages/adapter-antigravity/test/attestation.test.ts`) verify this behavior using fake shells.

---

## Ledger Verification

- **Valid:** true
- **Event count:** 1
- **Head hash:** `000000000000000000000000000000000000000000000000264cd2970a141820`
- **Chain integrity:** Verified from genesis (`0`×64) to head

---

## Manifest Hash

The manifest is generated at evidence-export time from the artifact store and ledger head hash. No artifacts were published during this verification run, so the manifest contains zero artifacts with the ledger head as the anchor.

---

## Acceptance Test Coverage

### test/acceptance/disposable-repo.ts
- Isolated temporary Git repository fixture with worktrees
- Safety: refuses production repo paths and `main`/`master` branch names
- Returns cleanup handles for complete teardown

### test/acceptance/two-way-collaboration.test.ts
- Typed Claude→Antigravity and Antigravity→Claude messages
- Action request, accept, reject through the broker
- Bounded artifact publication (hash verification, size limits, deduplication)
- Inbox acknowledgement via subscription
- Absence of arbitrary shell/filesystem MCP tools (exactly 16 `bridge.*` tools)
- Disposable repo fixture safety checks

### test/acceptance/ownership-transfer.test.ts
- Full ownership transfer cycle in both directions (Claude→Antigravity, Antigravity→Claude)
- Concurrent writer rejection
- Stale token rejection (release, transfer request, assertCurrentWriter)
- Write after release rejection
- Wrong fingerprint rejection
- Unauthorized path/command/data/egress rejection
- Forged credential rejection (wrong executionId, wrong token, empty path)
- Expired envelope rejection (policy + event parsing)
- Replay prevention (event ID uniqueness, token invalidation after interruption)
- Unsupported protocol rejection
- Oversized payload rejection
- Model mismatch rejection (unknown model, auto, empty, cross-surface)
- Self-review rejection
- Terminal prose is inert (cannot grant authority, cannot bypass model verification)

### test/acceptance/interruption-recovery.test.ts
- CLI exit interruption (Claude and Antigravity)
- Adapter disconnect interruption
- Broker restart interruption
- Fail-closed: no auto-resume, token marked unusable
- Incident event preserves repository fingerprint
- Restart and re-attestation: matching fingerprints, re-attestation requirement, changed paths without contents, mismatch detection
- Typed resume: success with Founder event, failure without, failure on ambiguous/mismatch
- Resume through broker issues new fencing token
- Complete hash-chain verification (clean, tampered, empty)
- Deterministic state rebuild from verified ledger events

### test/acceptance/evidence-manifest.test.ts
- Manifest matches actual artifact store contents
- Empty manifest with zero artifacts
- Manifest ledger head hash matches ledger verify head
- Evidence export sanitizes output (no secrets, API keys redacted)
- CLI verify-ledger on real ledger (valid chain, missing ledger)
- Protocol version consistency

---

## Known Fail-Closed Capability Limitations

1. **Antigravity model attestation:** agy has no machine-verifiable exact-model primitive on the installed version. Attestation returns `ModelIdentityUnverifiable` and the execution is kept out of `active`. Model identity is never inferred from terminal prose.

2. **Claude Code not installed on verification host:** The `doctor` check reports `warn` for `claude-code`. Adapter attestation tests use fake shells to verify both success and fail-closed paths.

3. **agy not installed on verification host:** The `doctor` check reports `warn` for `agy`. Same fail-closed behavior applies.

4. **Exact-model visibility:** The `doctor` check reports `warn` for antigravity config absence. Claude Code config may be present if installed.

5. **No auto-resume:** On any monitored process or adapter disconnect, the session atomically moves to `interrupted` and the current writer token is marked unusable. Recovery requires explicit reconciliation, re-attestation, and a typed Founder resume event.

6. **Terminal text is inert:** Claimed approvals, model assertions, or authority claims in terminal text have no effect on policy evaluation. Only the typed `authorization_reference` from the task envelope creates authority.

---

## Security Notes

- No secrets, API keys, or raw transcripts appear in this evidence file.
- All acceptance tests use the in-memory broker (`createInMemoryBrokerForTest`) — no real CLI processes are spawned.
- The disposable repository fixture creates temporary directories outside the production repository and cleans them up after each test.
- Evidence export (CLI `export-evidence` command) redacts known secret patterns (`sk-*`, `ghp_*`, `Bearer` tokens, password/secret/token assignments) from output.

---

## Addendum A — 2026-08-09 post-remediation verification (main @ fd8322e)

### PR merge table

| PR | Merge SHA | Subject |
| --- | --- | --- |
| #1 | `dcef949` | Fix MADVentures TUI trust-boundary defects |
| #2 | `e6c3ea8` | fix: align ledger replay with session machine |
| #3 | `0f262c4` | fix: synthesize broker replay start from activity |
| #4 | `fd8322e` | fix: make duplicate broker interrupts idempotent |

### Fresh builder-run outputs

**`bun install --frozen-lockfile`:**

```
bun install v1.3.14 (0d9b296a)

Done! Checked 47 packages (no changes) [8.00ms]
```

**`bunx tsc --noEmit`:**

```
EXIT:0
```

Result: **PASS** (no errors, TypeScript clean)

**`bun test`:**

```
401 pass
0 fail
1100 expect() calls
Ran 401 tests across 32 files. [9.11s]
```

Result: **PASS** — all 401 tests pass

### Hashing annotation

The earlier zero-padded ledger head recorded in the original Ledger Verification section above (`000000000000000000000000000000000000000000000000264cd2970a141820`) is a preserved pre-remediation Wyhash-era artifact. It is **not** evidence of current hashing. Current code uses cryptographic SHA-256; no `Bun.hash` remains in `packages/` or `apps/`.

### Review SHA supersession

The pre-remediation review SHA `c3fc284` recorded in the Tested Versions table above is superseded through `fd8322e`.

---

## Addendum B — operational readiness gate (pending Founder-host run)

This addendum remains pending an actual Founder-host run. It must not be completed from the builder environment.

### Command sequence

```bash
export PATH="$HOME/.bun/bin:$PATH"
cd ~/madventures-tui
git fetch origin
git rev-parse HEAD
git rev-parse origin/main
uname -m
bun install --frozen-lockfile
bunx tsc --noEmit
bun test
bun run apps/madbridge/src/cli.ts doctor --json
bun run apps/madbridge/src/cli.ts verify-ledger --json
```

### Readiness rules

1. **Doctor exit code and top-level `ok` are insufficient.** All eight individual doctor checks must be status `"ok"`.
2. **`platform`** requires status `"ok"` and evidence capture of platform detail plus `uname -m`. `darwin/x64` is allowed.
3. **`claude-code`**, **`agy`**, and **`exact-model-visibility`** must each be `"ok"`.
4. **Directory writability:** repo root and `~/Library/Application Support/MADVentures/` must be writable.
5. **`ledger_not_found`** is acceptable before init; an existing ledger must verify valid.

### Evidence slots (to be filled by Founder-host run)

- **Founder-host date:** _<pending>_
- **Host:** _<pending>_
- **`uname -m`:** _<pending>_
- **SHA (`git rev-parse HEAD`):** _<pending>_
- **Raw doctor JSON:** _<pending>_
- **`claude --version`:** _<pending>_
- **`agy --version`:** _<pending>_
- **Raw verify-ledger JSON:** _<pending>_

### Status labels

- **READY FOR FOUNDER RELEASE DECISION**
- **DEVELOPMENT COMPLETE — OPERATIONAL ENVIRONMENT BLOCKED**
