# MADVentures TUI V1 — Build Record and Trust Boundary Review

**Repo:** `MADVenturesLLC/madventures-tui`
**Working host:** iMac (`michaels-imac.local`), path `~/madventures-tui`
**Code state described:** `f9e36d5` (branch `main`, working tree clean)
**GitHub `origin/main`:** `a0b4301`
**Unpushed commits at time of writing:** 7 code commits, plus the docs-only commit carrying this file
**Date of record:** 2026-08-08
**Author of record:** Socrates (Hermes local agent), from direct inspection of the iMac working tree

> **Self-reference note.** This document is committed as `docs/STATUS.md` in a
> docs-only commit applied on top of `f9e36d5`. That commit changes no source,
> test, or config file, so every code claim below remains accurate for the tree
> it describes. The commit carrying this file will therefore have a SHA later
> than `f9e36d5`; that is expected and is not drift.

---

## 1. Status summary

| Item | State |
| --- | --- |
| Tasks 1-12 | Implemented and committed locally |
| Test suite | 343 pass, 0 fail, 958 expect() calls, 32 files, 908ms |
| Typecheck | `bunx tsc --noEmit` clean |
| Pushed to GitHub | **No.** 7 commits local only |
| Trust boundary | **Not ready.** 5 open defects, see section 5 |
| Recommended next action | Remediation before Task 7 forward work |

Truthful-reporting state per FounderOS vocabulary: **implemented** and **verified** at the test-suite level. **Not** merged, **not** deployed, **not** activated. The green suite does not certify the security model, see section 5.

---

## 2. What was built

Local-first, governed live bridge between Claude Code CLI and Antigravity CLI. The neutral `madbridge` broker owns validation, session lifecycle, writer fencing, typed routing, SQLite evidence, and content-addressed artifacts. The OpenTUI React app projects broker state and never treats terminal prose as authority.

- Product/interface: MADVentures TUI Experience
- Command: `madv-tui`. Broker: `madbridge`. Protocol: `madbridge-protocol/v1`
- Apple Silicon macOS V1, Unix-domain socket only, no TCP listener

### Workspace layout

```
apps/madbridge/               Founder command + OpenTUI React TUI
packages/protocol/            madbridge-protocol/v1 types, parsers, wire
packages/policy/              fail-closed action evaluation, path/command/egress
packages/ledger/              SQLite append-only hash-chained event store
packages/artifact-store/      content-addressed artifact storage
packages/broker/              session machine, ownership machine, socket, MCP, PTY
packages/adapter-claude-code/ Claude Code adapter
packages/adapter-antigravity/ Antigravity adapter
test/acceptance/              disposable-repo acceptance gate
```

90 TypeScript/TSX source files across `apps/` and `packages/`.

---

## 3. Commit history (this build)

| SHA | Task | Subject |
| --- | --- | --- |
| `a0b4301` | plan | docs: finalize V1 plan with expanded tasks 6-12 details **(last pushed)** |
| `d0af6e2` | 6 | feat: add authenticated madbridge broker |
| `1796aab` | 7 | feat: add governed claude and antigravity adapters |
| `ece6387` | 8 | feat: add madventures governed terminal experience |
| `65f4e3d` | 9 | feat: add madv-tui command surface |
| `4f3a291` | 10 | feat: add fail closed session recovery |
| `c3fc284` | 11 | refactor: retire prototype bridge duplicates |
| `f9e36d5` | 12 | test: verify madventures tui version 1 |

Tasks 1-5 were delivered in earlier commits already on `origin/main`. Task 2 remediation landed as `60811b1` (broad negative-control tests).

---

## 4. Test inventory (32 files, 343 tests)

**Protocol** canonical-json, events, task-envelope, wire
**Policy** engine, negative-controls, path-policy
**Ledger** hash-chain, ledger, rebuild
**Artifact store** store
**Broker** broker, mcp-contract, ownership-machine, reconciliation, session-machine, socket
**Adapters** attestation, integration, parity (x2 surfaces, shared parity suite)
**App** cli, doctor
**Architecture** architecture-boundaries (React never imports policy or ledger)

**Acceptance (`test/acceptance/`, 84 tests)**
- `two-way-collaboration.test.ts` — collaboration + artifact publication
- `ownership-transfer.test.ts` — transfer + negative controls (concurrent writers, stale tokens, replay, injection)
- `interruption-recovery.test.ts` — fail-closed interruption, reconciliation, resume
- `evidence-manifest.test.ts` — hash-chain verification
- `disposable-repo.ts` — harness

---

## 5. Open defects — trust boundary NOT ready

Five findings raised by the Founder from GitHub `a0b4301`, all confirmed against the iMac working tree. Three are worse than originally described.

### 5.1 HIGH — Hash chain and artifact "sha256" are not SHA-256

**[OBSERVED]** `Bun.hash` is Wyhash, 64-bit, non-cryptographic.

Live check: `Bun.hash("a")` returns `28d2053309d28531` (16 hex chars). `.padStart(64,"0")` means **48 of 64 hex characters are literal zero padding**. 64 bits of entropy presented as 256. Birthday-bound collision resistance approximately 2^32, reachable on a laptop.

Affected:
- `packages/ledger/src/hash-chain.ts:8` — pads to 64
- `packages/artifact-store/src/store.ts:96` — pads to 64
- `packages/protocol/src/events.ts:115` — **does not pad**, emits 16-char hashes
- `packages/protocol/src/canonical-json.ts:42` — `sha256CanonicalSync`, comment admits non-cryptographic

Correct implementation already exists at `canonical-json.ts:28`, `sha256Canonical()` using `crypto.subtle.digest("SHA-256", ...)`. It is async and largely unused.

**Additional [OBSERVED] defect:** `store.ts:3` comment claims the store "fsyncs". Grep confirms **no fsync or fdatasync anywhere in the file**. The durability claim is false alongside the hash claim.

Tests prove determinism and hex shape only, never SHA-256 correctness against known vectors.

*Rejected alternative:* keep `Bun.hash` for a fast non-security path, layer SHA-256 only on the ledger. Rejected because artifact storage is content addressing where dedup correctness depends on collision resistance, and a mixed scheme guarantees reintroduction of the wrong primitive.

### 5.2 HIGH — Path enforcement is string-based, not filesystem-safe

**[OBSERVED]** `packages/policy/src/path-policy.ts` uses no `realpath`, no `lstat`, no component-by-component symlink rejection. The "symlink escape" test uses `src/../secrets.env` and never creates a symlink.

**Second hole not in the original findings:** containment is `normalized.startsWith(repoRoot)`, a raw string prefix test. With repoRoot `/Users/x/repo`, the path `/Users/x/repo-secrets/creds.env` **passes containment** because it literally starts with that prefix. Sibling-directory escape. **Certain** the check is defeated. **Likely** exploitable end to end, since it still requires a permissive glob such as `**` to reach an allow decision.

**[OBSERVED]** `packages/policy/src/engine.ts:38` — `const REPO_ROOT = process.cwd()`, module-level, evaluated once at import. Wrong source (should be the task envelope repo root) and frozen at import time.

*Rejected alternative:* change the prefix test to `repoRoot + "/"` and move on. Closes one hole, leaves symlinks fully open. Requires realpath plus per-component lstat.

### 5.3 HIGH — Task envelope authority hash is never verified

**[OBSERVED]** `packages/protocol/src/task-envelope.ts:4` imports `sha256Canonical` and **never calls it**. Dead import. The parser terminates with `return raw as unknown as TaskEnvelopeV1`, an unchecked cast.

Never validated:
- `envelope_hash` recomputation, or even that it is a string
- `initial_writer` is a member of `executions`
- `expires_at` parses, or is in the future
- `executionId` uniqueness across executions
- `effort` field presence or value
- `repository_fingerprint` shape

The only production check is `start.ts:51`, which asserts the field is non-empty. For the declared sole authority source, that is a presence check, not authority verification.

### 5.4 MEDIUM/HIGH — Paused sessions cannot be interrupted, and production silently routes around it

**[OBSERVED]** `packages/broker/src/session-machine.ts:38` — `paused: new Set(["resume"])`. Line 68 handles `paused -> interrupted` and is unreachable. `session-machine.test.ts:56` asserts the rejection, locking the wrong behavior into the suite.

**Worse than dead code:** `packages/broker/src/reconciliation.ts:266-272` — `interruptSession()` wraps the transition in try/catch and on throw **forces `{kind:"interrupted"}` anyway**.

Consequence: the real broker interrupt path already works by swallowing an exception. The state machine forbids the transition, production performs it regardless, and the violation is invisible. The invariant is enforced nowhere. This is a worse posture than a simply missing transition, because it defeats detection.

### 5.5 MEDIUM/HIGH — Ownership transfer accept does not enforce intended receiver

**[OBSERVED]** `packages/broker/src/ownership-machine.ts:93-105` — `receiver_accept` in state `sender-released` checks `event.repositoryFingerprint.sha256 !== state.repositoryFingerprint.sha256` only.

Missing:
- `event.executionId === state.transferTo` (the state carries `transferTo` and ignores it)
- `event.worktreeId === state.worktreeId`

Any execution presenting a matching fingerprint takes ownership and bumps the fencing token. The single check performed is a 64-bit `Bun.hash` comparison, so 5.1 and 5.5 compound.

---

## 6. Scope correction for future reviews

The Founder's review was conducted against GitHub `a0b4301`, believing Task 7 adapter files were uncommitted local changes. **[OBSERVED]** they are not. Tasks 6-12 are all committed and unpushed. The reviewed tree was missing roughly half the build.

Process fix: push before requesting review, or review the host tree directly. A six-commit gap between review target and working tree caused a material scope error.

---

## 7. Recommended remediation sequence

These are not five parallel fixes. Hashing is upstream of 5.3 and 5.5, and it invalidates fixtures across 32 test files, so any other fix landed first has to be retested afterward.

1. **SHA-256 everywhere, alone, first.** Replace all `Bun.hash` usage. Add known-vector tests (not determinism tests). Implement real fsync in the artifact store or delete the claim.
2. **Envelope hash recomputation** plus full authority consistency (initial_writer membership, expiry, uniqueness, fingerprint shape). Remove the unchecked cast.
3. **Path enforcement** via realpath plus per-component lstat. Fix the sibling-prefix escape. Source repo root from the task envelope, not `process.cwd()`. Add a test that creates a real symlink.
4. **Paused interruption.** Allow `paused -> interrupted` in the transition table, invert the test, and **delete the try/catch bypass** in `reconciliation.ts` so violations surface.
5. **Receiver identity enforcement** on `receiver_accept`.
6. Then resume forward feature work.

**Before any of it:** push the 7 commits. Not because the code is ready, but because stale review targets caused the scope error in section 6.

Push command, run from iMac Terminal:

```
cd ~/madventures-tui && git push
```

---

## 8. Errors resolved during Tasks 7-12 (for the skill record)

- Adapter attestation command key mismatch (`model show` corrected to `config get model`)
- `launch()` bypassing the injected shell, routed through the shell abstraction so tests run without the real CLI
- OpenTUI prop names (`borderBottomStyle`, `overflowY`)
- TypeScript `exactOptionalPropertyTypes` conflicts and `never` exhaustiveness failures
- Reconciliation undefined variable after rename, plus string-literal-union type narrowing (TS2367)
- Credential fencing token alignment in acceptance tests

All captured in the `madventures-tui-builder` skill pitfalls section.

---

## 9. Verification commands

Run from the iMac:

```
cd ~/madventures-tui
export PATH="$HOME/.bun/bin:$PATH"
bun run verify          # bunx tsc --noEmit && bun test
```

Expected at `f9e36d5`: typecheck clean, 343 pass, 0 fail.

Note: `bun` is at `~/.bun/bin/bun` and is not on the default SSH PATH.

---

## 10. Standing judgement

The architecture is right. Package separation (protocol, policy, ledger, artifact-store, broker, adapters) is correct and the plan document is practical and task-based. The TUI scaffold has the right three-pane concept but remains a scaffold; the title border and final visual treatment are not in GitHub main.

The build is promising. The trust boundary is not ready. Do not describe the governance or evidence model as functional until section 5 is closed.
