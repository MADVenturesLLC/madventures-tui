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

**Target design, not yet implemented.** The three bullets below (`BrokerClient`,
`reduceLedgerEvent`, `live_runtime_not_certified`) describe the Phase 3A plan's
forward architecture — none of these symbols exist in `packages/` or `apps/`
at the current `main` head. Do not search for them as current code; cite the
spec/plan, not this section, for what's actually implemented today.

- One foreground supervisor. `BrokerClient` is the planned only TUI/adapter
  boundary. No PTY descriptor, subprocess handle, ledger handle, or shared
  mutable state is intended to cross it.
- Supervisor exit is intended to kill every governed process fail-closed.
- Append-only single ledger chain. `packages/ledger/src/rebuild.ts` exists
  today and exports `rebuildState`/`rebuildBrokerState`; the plan's named
  reducer (`reduceLedgerEvent`) is not yet implemented under that name.
- Production live startup is intended to remain structurally unavailable
  until Phase 3B certification; the specific error code
  `live_runtime_not_certified` does not exist in source yet.
- React in `apps/madbridge/src/tui/**` is presentation-only today: it projects
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

```text
packages/protocol/             # wire protocol, events, envelopes, canonical JSON
packages/policy/               # scope, path, model, review-independence checks
packages/ledger/               # append-only hash-chained SQLite ledger
packages/artifact-store/       # content-addressed artifact storage
packages/broker/               # ownership, sessions, supervisor, reconciliation
packages/adapter-claude-code/  # Claude Code adapter
packages/adapter-antigravity/  # Antigravity (agy) adapter
packages/pty-host/             # per-child PTY host (present on main; omitted from README)
packages/preflight/            # `mad preflight` — local fail-on-machine bug catcher (v0,
                               #   Founder-authorized off-roadmap build). Runs local
                               #   checks (typecheck, tests, tui-chaos, forbidden-import
                               #   scan, optional build-memory gate), exits nonzero on
                               #   failure, writes only .mad/preflight/. Makes no
                               #   network calls and claims no authority: NOT Phase 0,
                               #   NOT occupancy, NOT Gateway honesty, NOT a merge gate.
packages/founder-act/          # `mad founder-act` — sealed, content-addressed FounderAct
                               #   authorization objects (v0, Founder-authorized
                               #   off-roadmap build). JSON acts for merge, commission,
                               #   hold, freeze, reopen, authorize_review; sha256
                               #   integrity seal only (NOT a signature). Chat is not
                               #   authority; the CLI is the only writer. NOT Gateway
                               #   attestation, NOT Phase 0, NOT occupancy, NOT a merge
                               #   itself — a merge act names a head SHA and the human
                               #   Founder still performs the merge.
packages/honesty-compiler/     # `mad-honesty-compile` — honesty IR + compiler gate (v0,
                               #   Founder-authorized off-roadmap build). Parses a closed
                               #   ClaimIR (honesty/claims.json or a handoff "Declared
                               #   claims" block), rung-typechecks via @mad/claim-boundary,
                               #   binds evidence (build-memory, argus packets,
                               #   proving-ground ids, test suites), emits one
                               #   @mad/single-verdict verdict or fails closed. NOT merge
                               #   authority, NOT Phase 0, NOT Gateway honesty.
apps/madbridge/                # CLI (`madv-tui`) + TUI
apps/seal-studio/              # Seal Studio (v0, Founder-authorized off-roadmap
                               #   joy surface): compose a FounderAct draft, watch its
                               #   integrity hash settle live, seal via the two-step
                               #   ritual. Hash seal only — never claims more. Seal
                               #   endpoint is dev-server-only (`bun run seal-studio`,
                               #   :5183); built output ships none.
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
- Push the branch, then open a pull request. Do not push to `main`.
- Do not resolve review threads unless the Founder directs it.
- Work that produced only filesystem artifacts is **custodied**, never
  "merged".

## Attribution

`DEC-20260820-01` is cited elsewhere as binding this repository to
`DEC-20260718-05`. Both decisions live in FounderOS, not this repository —
neither has a corresponding file here, and this repo cannot verify their
ratification status from its own tree. Treat the rule below as this
repository's own operative requirement regardless of that citation's status;
if you need `DEC-20260820-01`/`DEC-20260718-05`'s status confirmed, return
`FOUNDER_DECISION_REQUIRED` rather than assuming either is (or isn't) ratified.

Role-accountable commits and pull-request bodies carry:

```text
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
- `.github/CODEOWNERS` — default owner `@MADVenturesLLC/owners`
