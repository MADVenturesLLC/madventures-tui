# Phase 3A PLAN-OPEN Rulings — Founder Approval Record

**Approver:** Michael Alberto Daley, Founder and President, MAD Ventures Holdings LLC
**Original ruling date:** 2026-08-15
**Final content ratification date:** 2026-08-18
**Repository:** `MADVenturesLLC/madventures-tui`
**PR:** `#17`
**Branch:** `governance/phase-3a-plan-open-rulings`
**Base:** `main` @ `e68e57b19d9b601a832caa884518d978b1d895ab`
**Approval baseline:** `4f9bb946713d255e98fcdcce7a28840b35342a31`
**Independent approval artifact:** https://github.com/MADVenturesLLC/madventures-tui/issues/18

This record binds the Founder approval of the Phase 3A PLAN-OPEN rulings to
exact content identities. It is the stable, repository-local provenance artifact
for the decision documents below. The post-pointer SHA-256 values identify the
content of each decision as it stands with this record's pointer applied.

## Approved documents

| Document | Exact SHA-256 (post-pointer) |
|---|---|
| `PLAN-OPEN-1-identity-authentication.md` | `196b91b8c9ffbda3d4319c4a8abc96c20ffe16950ba23864eb8780de356f5aee` |
| `PLAN-OPEN-2-environment-allowlists.md` | `2aaa7da7caa7c8df19200a4d87ddc8ec063b94dcc5eb471e7a6adc6d499ec429` |
| `PLAN-OPEN-3-capability-horizon.md` | `cca3061b91ffc9eb231003f5e5d7c20230f47cf8c2378f6f1241d57309618562` |
| `PLAN-OPEN-4-node-pty-removal.md` | `e662936c0a2f91b25c4f9f38d791bb59182b22cc4ed19ce577afa81e34eeb460` |
| `PLAN-OPEN-6-root-scripts.md` | `26270a7af4c932dd122bfd6ed3383e845bb655886a8d7efe8e152939ce7a957f` |
| `2026-08-12-phase-3a-runtime-foundation.md` (Task 34, Task 35, Task 36, Task 45, and Task 48 amendments) | `1c7b3ab504d634081e933b9b8851ebe2e32ea7cd71a697534cfc245f95ce5708` |

## Scope and blocking scope

| Decision | Authorized scope | Blocking scope |
|---|---|---|
| PLAN-OPEN-1 | Closed production registry values for `claude-code` and `antigravity`, including executable, provider, independence domain, organization, supported versions, identity/authentication probes, failure detection, environment reference, eligibility limitations, and the `AdapterRegistrationV1.provider` interface correction | Task 6 and registry-dependent downstream tasks; does not block independently reachable Stage 0 Tasks 38–39 |
| PLAN-OPEN-2 | Exact `claude-code-v1` and `antigravity-v1` environment allowlists; per-user installation identity; trusted `HOME`, `PATH`, `SHELL`, `TERM`, `TMPDIR`, and `CLAUDE_CONFIG_DIR`; Claude settings-source, provider-routing, and endpoint invariants; Max subscription auth predicate; bounded and redacted auth-probe execution with a `5,000` ms execution deadline, at most a `1,000` ms forced-cleanup budget, and a `6,000` ms maximum total elapsed time; enforcement ownership; and four-way environment equality | Task 37 and tasks dependent on M16; does not block independently reachable Tasks 38–39 |
| PLAN-OPEN-3 | Thirty-day expiration horizon; exact staleness order; eight-field host comparison; strict stored-timestamp parsing with canonical UTC round-trip validation and the exact 30-day relationship; pass-and-fresh `latestFreshRecord()` selection with descending `evaluated_at` and canonical-filename lexical tie-breaking; exclusive-create collision rejection; and append-only historical preservation | M15 (Tasks 35–36) |
| PLAN-OPEN-4 | Remove `node-pty`; regenerate the lockfile; remove orphaned `node-addon-api` when no remaining dependency requires it; and add no replacement native dependency | Task 34 (manifest edit) |
| PLAN-OPEN-6 | Remove root `broker` and `mcp` scripts; recognize the four plan-required script names; defer their command bodies to Task 34; and authorize no file outside root `package.json` | Task 34 (script removal) |
| Phase 3A plan | Task 34 amendment covering its file list, lockfile regeneration, README deletion instruction, and commit list; and Task 48 amendment adding the isolated fixture-harness no-socket runtime test; Revision 5.10 strengthens the Task 34 depth-bound test to cover both depth 6 (detected) and depth 7 (ignored) using two isolated disposable roots, strengthens the Task 34 native-dependency test to inspect all dependency-bearing manifest sections (`dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`) in workspace and root manifests plus `bun.lock` and assert removal of the broker workspace dependency edge and resolved `node-pty` and `node-addon-api` entries, strengthens the Task 34 script test to assert the `broker` and `mcp` keys are absent regardless of value, and strengthens the three Task 48 harness-separation structural tests to a fail-closed AST structural analyzer using the TypeScript compiler API covering all six §9.11 reachability forms plus standalone logical gates with const, method-alias, and namespace-import resolution and seeded positive fixtures for every evasion class; Revision 5.11 requires every Task 34 CLI and TUI child and the Task 48 fixture-harness child to use a distinct disposable `MADV_RUNTIME_DIR` and to assert both `<MADV_RUNTIME_DIR>/broker.sock` and `/tmp/madv-broker-runtime/broker.sock` are absent at every assertion point, adds strict stored-timestamp parsing, canonical UTC round-trip validation, the exact 30-day relationship, and invalid-`now` rejection to Task 35, adds deterministic equal-`evaluated_at` selection by descending canonical filename and exclusive-create collision rejection to Task 36, and adds missing-`TERM`, missing-`TMPDIR`, caught `MissingRequiredVariableError`, execution-deadline, SIGTERM-cleanup, SIGKILL-escalation, successful-reap, and cleanup-budget-exhaustion tests to Task 45 | Tasks 34, 35, 36, 45, and 48 (amended plan) |

## Approval lineage

| Stage | Patch SHA-256 | Bytes | Commit |
|---|---|---|---|
| Original package | unavailable | unavailable | `b524cc5d42838f7de8b3a9c737b2ba98a189e28c` |
| Correction round 1 | `662e792e84cc4465c7e26814725f9da4fb860395652a189d511b2b6ac9e64307` | 17,515 | `d950a4e637bfcc960eabdd1c7d93186e03777d72` |
| Revision 5.4 | `dc878291dfb0a3a291e858d65b3359715d21d9a0468404119af8ee678caee756` | 8,971 | `33f435d4cea53c6e8096bcb92a3a99fdfb7bc894` |
| Revision 5.5 | `ac719dc5382e7112727378d9cd4c598ba627529a31c25d9d9f7eeb6f3f94bdab` | 3,413 | `98582ae4b24a9d6bbc604a693494bb44934db000` |
| Revision 5.6 | `6553d456bdd470516c57b58f8fa9de6d28ac885fad548b7f28b2f7334e37b038` | 3,424 | `4f9bb946713d255e98fcdcce7a28840b35342a31` |
| Revision 5.7 | `7770b2df7a2e09b3d80bd521ba241b4706a0163e73a0b96b8741fddd82d00ffb` | 8,162 | `fb6670f214fde4e14e82d3be691b9c1ae6f80454` |
| Revision 5.8 | Recorded in [Founder authorization artifact #18](https://github.com/MADVenturesLLC/madventures-tui/issues/18) | Recorded in issue #18 | Post-approval commit recorded in issue #18 |
| Revision 5.9 | Recorded in [Founder authorization artifact #18](https://github.com/MADVenturesLLC/madventures-tui/issues/18) | Recorded in issue #18 | Post-approval commit recorded in issue #18 |
| Revision 5.10 | Recorded in [Founder authorization artifact #18](https://github.com/MADVenturesLLC/madventures-tui/issues/18) | Recorded in issue #18 | Post-approval commit recorded in issue #18 |
| Revision 5.11 | Recorded in [Founder authorization artifact #18](https://github.com/MADVenturesLLC/madventures-tui/issues/18) | Recorded in issue #18 | Post-approval commit recorded in issue #18 |

Because Revisions 5.8, 5.9, 5.10, and 5.11 change this approval record itself, their patch SHA-256 values,
byte counts, resulting approval-record SHA-256, and commit identities are recorded
externally in Founder authorization artifact #18 rather than embedded
self-referentially in this file.

## Provenance note

Each correction revision with a listed patch SHA-256 was Founder-approved by
that exact patch identity before application. The original package commit
`b524cc5…` is recorded with its patch SHA-256 and byte count marked unavailable,
because no standalone patch artifact was produced for that initial commit.

The post-pointer document SHA-256 values in this record identify the final
Founder-ratified decision content. No authorization is inferred or backfilled.

The approval record's own SHA-256 is not embedded in itself; it is reported in
Founder authorization artifact #18, the verification report, and the PR body.
All three values must match.

## Ratification boundary

This approval is documentation ratification only. It does not authorize merge,
implementation, task execution, thread resolution, deployment, or activation.
