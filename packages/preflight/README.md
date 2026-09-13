# @mad/preflight — `mad preflight`

Local fail-on-machine-before-push bug catcher. Run it before you push or
open a PR; if anything is broken, it fails **on your machine, with a reason
and evidence**, instead of leaving the discovery to CI.

```bash
bun run preflight            # all checks, human summary
bun run preflight --json     # + machine-readable JSON as the LAST stdout line
bun run preflight --bail     # stop at the first failure
bun run preflight --only tsc --only imports
bun run preflight --cwd /path/to/madventures-tui
```

Binding philosophy (commission `GLM-20260912-MAD-PREFLIGHT-V0`): exit
non-zero on any failed check; a silent pass is not a feature. One human
summary plus one machine-readable line so projector/CI can consume it later.

## What it is NOT

`PREFLIGHT_LOCAL_V0` is the only claim a preflight receipt makes, and it is
**not evidence of**:

- `PHASE_0`
- `OCCUPANCY_PROOF`
- `GATEWAY_HONESTY`
- `ROOM_RUNTIME`

It is not a merge authority, not a review, not CI. In claim-boundary terms a
preflight receipt sits at rung **executed**: it proves local checks ran on
one machine at one moment — nothing above that rung. When `@mad/claim-boundary`
is resolvable (it is, on base main), the report carries the rung-derived
`claim_boundary` block alongside the four hardcoded v0 strings above; those
four sit outside claim-boundary's closed rung vocabulary, which is why they
are spelled out literally.

## Checks (deterministic order)

| # | Name | What it runs | Notes |
| - | ---- | ------------ | ----- |
| 1 | `tsc` | `bunx tsc --noEmit` | The repo's own verify-backbone typecheck — one typed source of truth, no weaker second. |
| 2 | `test` | `bun test` | The full suite at the repo root — the same backbone `verify` uses. |
| 3 | `tui-chaos` | `bun packages/tui-chaos/src/cli.ts run` | tui-chaos's supported fixture/chaos entry, reused verbatim — never rewritten. SKIPs with an explicit reason if the package is absent on the base. |
| 4 | `imports` | pure scan, no process | Fails on any import statement in **production source** (`packages/*/src`, `apps/*/src`) whose specifier hits the denylist below. Prose never matches (statement-leading import/export-from/require pattern — the repo convention from claim-boundary's purity test). Test files are out of scope: boundary tests legitimately import governed packages to exercise them. |
| 5 | `memory` | `mad-build-memory status <subject>` | **ON by default for the spine subjects** (`@mad/build-memory`, `@mad/single-verdict`, `apps/projector-mc`) whenever `@mad/build-memory` exists on the base. `--subjects a,b` overrides the list. `STALE`/`UNKNOWN`/`INVALIDATED` → fail with code `MEMORY_STALE`; a subject with no record is UNKNOWN by the library contract and FAILS — preflight never invents a VALID/SHIP. A bound store is required: if `.mad/build-memory.json` does not exist, the check SKIPs with an explicit "no memory store bound yet" reason. |

**Why full `bun test` instead of changed-package scoping:** a change to
`packages/protocol` can break `packages/broker` tests without protocol's own
tests failing. v0 prefers honest whole-tree coverage over speed; scoping can
return as an explicit, documented optimization later.

### Forbidden-import denylist

The `imports` check fails when any **production source file** under
`packages/*/src` or `apps/*/src` imports:

- `@madventures/broker`
- `@madventures/pty-host`
- `@madventures/adapter-claude-code`
- `@madventures/adapter-antigravity`
- `gateway-daemon`
- anything matching `room-runtime-worker`

The first five are lifted verbatim from claim-boundary's own purity test
("source never imports governance infrastructure") — that test is the repo's
existing convention for what must never be imported. `room-runtime-worker`
covers the Room Runtime stack (it has no package name today, so the path
fragment is the stable specifier). No source file on base main imports any
of these, so a clean tree passes. Allowlist prefixes are supported in code
(`importAllowlist` option); add a CLI flag when a real need appears.

## Exit codes

| Code | Meaning |
| ---- | ------- |
| 0 | All enabled checks passed (SKIPs allowed, always with an explicit reason). |
| 1 | One or more checks failed. |
| 2 | Preflight tooling error: at least one check could not start (missing binary, bad config, timeout kill). A tooling error dominates a plain failure. |

Default mode runs **all** checks and aggregates; `--bail` stops at the first
FAIL. Each check gets a per-check time budget (default 10 min) — blowing it
is a tooling error, not a silent hang.

## Report

Human summary plus a single-line JSON object (last stdout line with
`--json`, only output with `--json-only`):

```json
{"claim":"PREFLIGHT_LOCAL_V0","not_evidence_of":["PHASE_0","OCCUPANCY_PROOF","GATEWAY_HONESTY","ROOM_RUNTIME"],"claim_boundary":{...},"run_id":"...","checks":[...],"totals":{"pass":3,"fail":0,"skip":2},"wall_clock_ms":1234,"exit_code":0}
```

Per check: `name`, `status` (`PASS|FAIL|SKIP`), `ms`, `summary`, and for
command-backed checks the underlying `exit_code` plus an `evidence` path.

Artifacts land in `.mad/preflight/<run-id>/` (gitignored): one
`<check>.log` per check (command, cwd, exit code, stdout, stderr),
`report.json`, `report.txt`.

## Configuration

Commands live in `checks.json` (data, not code), validated at load: argv
arrays run via `Bun.spawn` — no shell is ever invoked. The only CLI-supplied
value that reaches a subprocess argv is a build-memory subject, and it must
pass a strict charset gate ([A-Za-z0-9] start, then [A-Za-z0-9._/-], max
128) so it can never be mistaken for a flag.

## Platform

macOS / Linux builder assumption (Windows not required for v0). Bun 1.3.x,
matching the repo toolchain. Local only: preflight makes no network calls of
any kind.

## Tests

```bash
bun test packages/preflight
```

Covers: aggregation and exit codes, SKIP-vs-FAIL semantics, the planted
forbidden-import fixture (temp dir), fake-runner failure paths, bail
behavior, the `MEMORY_STALE` path via a scripted status runner, config
validation, and the exact honesty fields in the JSON report.
