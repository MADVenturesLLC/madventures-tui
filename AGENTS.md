# AGENTS.md — madventures-tui (MadBridge)

Private product repository for **MadBridge**: a founder-facing governed
terminal interface that orchestrates Claude Code and Antigravity through a
shared broker with cryptographic attestation, ownership transfer, and
hash-chained evidence.

MadBridge is an **orchestration framework**, not a coding execution surface.
The TUI is an **interface**. Never register or describe MadBridge as an
execution surface (`DEC-20260820-01` clause 3).

This repository governs itself. FounderOS
`03-products/madventures-tui/` is a pointer pack, not a second source of
truth for the code.

The `founder` authorizes and reviews. The `builder` role implements. Hermes
is a **neutral orchestrator only** — never Architect and never Builder. If a
required Architect seat is unavailable, return `FOUNDER_DECISION_REQUIRED`.
Do not substitute a different model.

## Context load order

Load only what the current task needs:

1. This file.
2. `README.md` for package layout only. Do **not** treat its test counts,
   example task paths, or package map as current — they have drifted.
3. `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`
4. `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md`
5. `docs/decisions/PLAN-OPEN-*.md` and `docs/decisions/PLAN-OPEN-approval-record.md`
6. `docs/decisions/DEC-20260812-01-phase-3a-runtime-foundation-supersession.md`

When texts conflict, controlling authority is, in order:

1. The most recent, most specific Founder `PLAN-OPEN-*` ruling (ratified in
   the approval record).
2. The approved design spec and `DEC-20260812-01`.
3. The implementation plan (task file lists and interface blocks can be
   stale relative to 1 and 2).

Never silently pick one text. Cite the controlling authority. Return
`FOUNDER_DECISION_REQUIRED` when no superior text settles the question.

## What you may write

- Implementation code, tests, configuration, and CI in this repository,
  inside a Founder-authorized task scope.
- Repository documentation (`README.md`, this file, `CONTRIBUTING.md`,
  `SECURITY.md`, `docs/**`) when that documentation is in scope.
- Decision records under `docs/decisions/` only when the Founder directs it.

## What you must NOT do

- Merge to `main`, deploy, provision, mint, confirm, deny, or revoke
  anything live, or self-provision credentials.
- Authorize spend, infrastructure, or provider access (Founder act).
- Create or modify FounderOS doctrine from this repository.
- Commit secrets, credentials, API keys, tokens, or `.env` files.
- Bypass the production `madbridge start` gate, create a daemon / Unix
  socket / named runtime endpoint, or import the Phase 3A fixture harness
  from `apps/` or a published package index.
- Modify `apps/madbridge/src/tui/**` during Phase 3A unless a later Founder
  ruling explicitly authorizes that path.
- Treat a Tier-2 `PASS` as proof of correctness, or a green suite as
  authorization.
- Write files through a GitHub API file-write tool (`create_or_update_file`,
  `push_files`). Edit locally, commit, push the branch, open a pull request.

## Approval gates — stop

Stop and ask the Founder before:

- Starting a Phase 3A task. Plan approval alone starts nothing. Each task
  needs its own written Founder authorization naming the base SHA and scope.
- Merging any pull request. Required checks on `main` are `Verify`,
  `Verify (macOS)`, and `code-review`. Merge authorization is a separate
  Founder act naming the exact head SHA.
- Changing this repository's security posture (secret scanning, push
  protection, code-owner review requirement, CODEOWNERS owners).
- Certifying a live runtime, connecting the production TUI, or substituting
  a surface mid-session.

## Architecture boundaries (Phase 3A)

- One foreground supervisor. `BrokerClient` is the only TUI/adapter
  boundary. No PTY descriptor, subprocess handle, ledger handle, or shared
  mutable state crosses it.
- Supervisor exit kills every governed process fail-closed.
- Append-only single ledger chain. One lifecycle reducer:
  `packages/ledger/src/rebuild.ts` (`reduceLedgerEvent`).
- Production live startup remains structurally unavailable (`live_runtime_not_certified`).
- React in `apps/madbridge/src/tui/**` is presentation-only: it projects
  broker state and routes input. It cannot decide authority, permissions,
  ownership, evidence acceptance, hashing, or recovery.

## Commands

Toolchain: Bun 1.3.x. Workspaces: `apps/*` + `packages/*`. TypeScript.

```bash
bun install --frozen-lockfile
bunx tsc --noEmit          # hard gate: must exit 0
bun test                   # do not cite README or docs/STATUS.md counts
bun run verify             # typecheck + tests
git diff --check
```

Measure suite counts from a live `bun test` run. Never copy a number from
documentation.

In-repo skill: `.agents/skills/build-gate/` — fail-closed exact-SHA gate
used when preparing to push, open a PR, or declare a build complete.

## Layout

```
packages/protocol/             # wire protocol, events, envelopes, canonical JSON
packages/policy/               # scope, path, model, review-independence checks
packages/ledger/               # append-only hash-chained SQLite ledger
packages/artifact-store/       # content-addressed artifact storage
packages/broker/               # ownership, sessions, supervisor, reconciliation
packages/adapter-claude-code/  # Claude Code adapter
packages/adapter-antigravity/  # Antigravity (agy) adapter
packages/pty-host/             # per-child PTY host (present on main; omitted from README)
apps/madbridge/                # CLI (`madv-tui`) + TUI
docs/superpowers/              # Phase 3A spec and plan
docs/decisions/                # PLAN-OPEN rulings and DEC-20260812-01
docs/verification/             # verification records
.agents/skills/build-gate/     # OS-owned build gate
.github/                       # workflows, CODEOWNERS, qualified Bun action
```

## Git rules

- Branch from a clean `origin/main`. Never branch implementation work from
  a retained qualification or experiment branch.
- One logical change per commit. Do not amend a commit already reported to
  the Founder; land corrections as a new commit.
- Never commit secrets. Scan the staged diff before commit (see
  `CONTRIBUTING.md`).
- Identify commits with the full 40-character SHA. Identify artifacts with
  the full 64-character SHA-256. Do not abbreviate.
- "Push" means open a pull request. Do not push to `main`.
- Do not resolve review threads unless the Founder directs it.
- Work that produced only filesystem artifacts is **custodied**, never
  "merged".

## Attribution

`DEC-20260820-01` binds this repository to `DEC-20260718-05`. Role-accountable
commits and pull-request bodies carry:

```
Role-Id: <role from the originating assignment; never self-selected>
Actor-Id: <who performed the work; never a bare role name>
Execution-Surface: <registered surface_id when known>
```

`founder` is not a valid `Role-Id`. Direct-founder work uses
`Actor-Id: founder` alone. Never put `Actor-Id: founder` on agent-authored
work.

## Stop conditions

Return `FOUNDER_DECISION_REQUIRED` and do not improvise when:

- required authorization, base SHA, or scope is missing or contradictory;
- a governing doc conflicts with an approved packet;
- a required seat, model, or environment cannot be verified;
- work would need additional credentials, spend, installation, or scope;
- a mutation intended to prove a test stays green (the test did not reach
  the claim).

State what passed, what failed, what remains unchanged, and the single next
decision required.

## Related files

- `CONTRIBUTING.md` — how authorized work enters this repository
- `SECURITY.md` — how to report a vulnerability
- `.github/CODEOWNERS` — default owner `@decivantiq`
