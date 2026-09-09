# @mad/proving-ground — Adversarial Proving Ground v0

> **PROVING_GROUND — NOT PHASE_0 — NOT OCCUPANCY_PROOF**

A durable adversarial challenge runner: known defect classes become
reproducible failing cases, then checked-in regressions. Deterministic seeds,
independent law oracles, explicit skips. This is chaos + hunt + law-oracle
energy — **not** a Gateway, not Room Runtime Phase 0, not an occupancy daemon,
not Mission Control.

## Commands

```bash
bun packages/proving-ground/src/cli.ts init        # scaffold testdata dirs (idempotent)
bun packages/proving-ground/src/cli.ts list        # challenge registry
bun packages/proving-ground/src/cli.ts run --suite v0            # full suite -> REP-v1-pg packet
bun packages/proving-ground/src/cli.ts run --challenge pg-cb-lies --seed 42
bun packages/proving-ground/src/cli.ts minimize --case cb-incomplete-executed-minus-merge
bun packages/proving-ground/src/cli.ts promote --case cb-overbroad-executed-self-disclaimer \
    --reason "durable law regression"
```

`run` exits 0 only when zero challenges FAIL. `unsupported` (prereq missing)
and `spec_only` (documented deferral) are recorded outcomes that never
masquerade as green.

## v0 challenge suite

| id | kind | what it proves |
| --- | --- | --- |
| `pg-cb-lies` | malformed_authority | Every lie the law forbids (omission, contradiction, unknown enums, duplicates, stowaway fields) is rejected with its typed code; lying prose never upgrades a rung; a shape-valid "merge-ready" boundary is accepted (shape ≠ evidence, audit A3). 14 authored cases + 64 seeded mutations per run. |
| `pg-tui-governance` | tui_governance | Thin wrapper over the existing `tui-chaos` CLI (`governance_focus`): the governed Founder decision surface stays governed in a live headless TUI — no PTY stack reimplemented here. Skips explicitly when `tui-chaos`/`node` are absent. |
| `pg-agents-drift` | static_instruction_drift | Audit-A5 class: when a symbol exists in code, AGENTS.md must no longer claim its absence (pin-based, deterministic). |
| `pg-a1-spec` | spec_card | Audit A1 (reserve-before-spawn worker race) as a durable deferral record: defect, oracle sketch, owner (Phase 0 integrate track in founder-os-build-room), forbidden-here paths. Spec-only is the deliverable — this repo must not fix it. |

## Promotion: failing case → durable regression

`promote` writes the case as a fixture under
`testdata/proving-ground/regressions/claim-boundary/` and maintains
`packages/claim-boundary/test/promoted-regressions.test.ts`, which replays
every fixture through the real library on every `bun test`. Promoted fixtures
are law, not configuration: fix the library, never the fixture.

Current promoted regressions: `cb-incomplete-executed-minus-merge`,
`cb-overbroad-executed-self-disclaimer`, `cb-merge-ready-shape-valid`.

## Flakiness discipline (hard rules)

- Every run records its seed (default `20260906`); same seed ⇒ same vectors
  ⇒ same verdicts. Verified by unit test.
- Children spawn from explicitly resolved binaries via argument lists; the
  TUI child's environment is allowlisted by tui-chaos itself — this wrapper
  adds no environment of its own, so no ambient secrets reach the TUI.
- `flaky: true` challenges are quarantined: excluded from `--suite v0`
  (use `--include-flaky` to run them explicitly) and never allowed to gate CI.
- Skips are `unsupported` with a recorded reason. A skip is never a pass.

## Evidence packet (REP-v1-pg)

Every `run` writes `testdata/proving-ground/runs/<run_id>/packet.json`:
`schema`, `label`, `run_id`, `git_sha`, `seed`, `challenges[]` (outcome,
oracle, cases, artifacts, citations), `promoted_regressions[]`, `summary`.
Citation fields on cases (e.g. the A3 shape-vs-evidence observation) are the
hook future Verified Build Memory will consume.

## A1 note (why there is no worker-race fix here)

The A1 defect lives in the Build Room's `C2WorkerSupervisor` and its Phase 0
proof paths — outside this repository. The Proving Ground ships the durable
spec card (`testdata/proving-ground/challenges/a1-reserve-before-spawn.spec.md`)
with the oracle sketch the owning track needs; per preflight rule this is the
complete A1 deliverable here.

## Out of scope (v0 non-goals)

Gateway crash/concurrency schedules, setsid/PGID, full OpenCode Context Source
machinery, Mission Control UI, Verified Build Memory product. PR #49's scanner
subject is closed (merged); no redo here.
