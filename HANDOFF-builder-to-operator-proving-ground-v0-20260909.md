# HANDOFF — builder → operator — Adversarial Proving Ground v0 (2026-09-09)

Builder: Hephaestus / GLM (agent-authored; `Actor-Id: decivantiq` on commit).
This packet binds the exact tree for Argus bind+verify. No merge, no Founder
approval, no Phase 0 claim of any kind is issued by this document.

## PREFLIGHT (Gate 0, recorded before code)

```
PREFLIGHT: PROCEED
A1_spawn_race: SKIP_COLLISION
A2_scanner: DONE_VIA_49
A5_agents_md: NOT_DONE
phase0_collision_paths: none
seed_challenges: pg-cb-lies, pg-tui-governance, pg-agents-drift, pg-a1-spec
```

- **A1 SKIP_COLLISION** — subject is Build Room's `C2WorkerSupervisor`
  (founder-os-build-room); this repo has no `builder/**` paths (verified:
  `ls builder` → ENOENT); `packages/pty-host` untouched. Deliverable = durable
  spec card, no code fix here.
- **A2 DONE_VIA_49** — PR #49 is MERGED (`750b701`, merge of `8915830`,
  "resolve Copilot review findings from PR #48"); audit A2 ≡ #49's subject, so
  per mission rules it was NOT redone. Post-merge observation recorded for the
  Founder (NO action taken): the merged regex
  `/^\s*(?:import\s+[^'"]*from\s+|import\s+|require\(\s*|export\s+[^'"]*from\s+)["']([^"']+)["']/gm`
  anchors to line start, so assigned-`require`
  (`const x = require("@madventures/broker");`) and dynamic-`import()`
  (`const x = await import("@madventures/broker");`) are not detected — the
  exact regression the audit predicted for #49 plus the pre-existing dynamic
  blind spot. Observation only; the scanner is #49's concluded track.
- **A5 NOT_DONE → closed in this change** — stale claims verified live at
  `AGENTS.md:87,97,100`; `reduceLedgerEvent` exists
  (`packages/ledger/src/rebuild.ts:121`, exported `index.ts:7`);
  `live_runtime_not_certified` exists with exit 78
  (`apps/madbridge/src/commands/start.ts:18,25`); `BrokerClient` absent
  (plan-only bullet kept). Drift challenge reproduced the failure pre-fix
  (evidence packet kept), then AGENTS.md was corrected in this same change.

## BINDING SUBJECT

- **head_sha:** `76579b0e5ad0fb2a3d3b68fb1c74314962049e05`
- **branch:** `Headless-TUI-Acceptance-Chaos-Explorer`
- **index_tree_sha:** `166f2e91f1d490f3d9d7b528948319d4435b8a27` (`git write-tree`
  over the staged index containing all delivery content EXCEPT this handoff
  file, which is itself also staged — the full final tree including the
  handoff is recorded out of band in the builder's report). **Nothing is
  committed** — no commit authorization was given for this task and the Mimosa
  L3 gate blocks commits project-wide; the binding is the staged tree, exactly
  like the claim-boundary handoff.
- **package_path:** `packages/proving-ground`
- **package_name:** `@mad/proving-ground` (workspace dep:
  `@mad/claim-boundary` only)
- **tree_clean:** no — staged-uncommitted by design (see above) plus
  pre-existing untracked environment files unrelated to this work.

## WHAT WAS BUILT

- **Package** `packages/proving-ground` — challenge registry, deterministic
  RNG (mulberry32, no ambient entropy), law oracle for claim-boundary lies
  (L1 omission / L2 contradiction / L3 closed vocabulary / L4 structural /
  L5 gloss-never-semantic / L6 shape≠evidence with A3 citation), four runners,
  seeded fuzz (64 mutations per run, all judged against the law), delta-debug
  style minimizer (`minimize`), promotion pipeline (`promote` → durable
  fixture + loader test), REP-v1-pg packet writer, CLI
  `init|list|run|minimize|promote`.
- **Challenges (v0 suite):** `pg-cb-lies` (malformed_authority, 14 authored +
  64 seeded cases), `pg-tui-governance` (thin wrapper over the existing
  tui-chaos CLI `governance_focus`; explicit `unsupported` when tui-chaos or
  the Node bridge runtime is absent — a skip is never a pass),
  `pg-agents-drift` (A5 pins), `pg-a1-spec` (spec card; outcome `spec_only`).
- **A5 fix** — `AGENTS.md` architecture-boundaries section corrected to the
  verified current state (challenge `pg-agents-drift` now passes).
- **A1 spec card** —
  `testdata/proving-ground/challenges/a1-reserve-before-spawn.spec.md` with
  schema `challenge-card.schema.json`; owner = Phase 0 integrate track
  (founder-os-build-room); FORBIDDEN-here paths listed in the card.
- **CI** — `.github/workflows/proving-ground.yml`: `run --suite v0` on
  ubuntu-24.04 + macos-14, evidence upload, deterministic by construction
  (fixed seed, flaky quarantine, explicit skips).
- **Suite result (final, clean):** `3 pass / 0 fail / 0 unsupported /
  1 spec-only`, **exit 0**, seed 20260906 — run twice, identical outcomes.
  Green packet run_id: `pg-20260909192912-dd4f11`.

## PROMOTED DURABLE REGRESSIONS (≥2 required; 3 delivered, checked in)

- `testdata/proving-ground/regressions/claim-boundary/cb-incomplete-executed-minus-merge.json` (L1)
- `testdata/proving-ground/regressions/claim-boundary/cb-overbroad-executed-self-disclaimer.json` (L2, "merge-ready at executed")
- `testdata/proving-ground/regressions/claim-boundary/cb-merge-ready-shape-valid.json` (L6/A3: shape-valid merge-ready must stay ACCEPTED — the library must never pretend to know entitlement)
- Loader: `packages/claim-boundary/test/promoted-regressions.test.ts` replays
  every fixture through the real library on every `bun test`; asserts ≥2
  fixtures exist. Promoted via the `promote` command with recorded reasons.

## BLAST RADIUS (staged paths, complete)

- `packages/proving-ground/**` (new package: src ×14, test ×4, README, package.json)
- `testdata/proving-ground/**` — `challenges/` (spec card + schema),
  `regressions/claim-boundary/` (3 fixtures), `evidence/`
  (repro-packet-A5-drift-prefix.json), `.gitignore` (excludes generated `runs/`)
- `packages/claim-boundary/test/promoted-regressions.test.ts` (promoted regression; the only claim-boundary file touched — `bun test packages/claim-boundary` green, 26/26)
- `AGENTS.md` (A5 drift fix only — the three stale fragments)
- `bun.lock` (workspace registration of @mad/proving-ground)
- `.github/workflows/proving-ground.yml` (CI)
- **out_of_band:** none. No Phase 0 path, pty-host, broker, gateway-daemon, or
  tui-chaos file touched. PR #49 not redone (A2=DONE_VIA_49).

## HOW TO VERIFY (copy-paste, in order)

```bash
git rev-parse HEAD                      # expect 76579b0e5ad0fb2a3d3b68fb1c74314962049e05
git write-tree                          # expect 166f2e91f1d490f3d9d7b528948319d4435b8a27
bun test packages/proving-ground        # 22 pass / 0 fail
bun test packages/claim-boundary        # 26 pass / 0 fail (incl. promoted regressions)
bunx tsc --noEmit; echo $?              # exit 0 (repo-wide hard gate)
bun packages/proving-ground/src/cli.ts list
bun packages/proving-ground/src/cli.ts run --suite v0; echo $?   # exit 0; 3 pass/0 fail/1 spec-only
bun packages/proving-ground/src/cli.ts run --suite v0 --seed 7   # different seed, same verdict outcome
bun packages/proving-ground/src/cli.ts minimize --case cb-incomplete-executed-minus-merge
# Isolation (expect no matches):
grep -rn -E "(from[[:space:]]+|require\(|import )[\"'][^\"']*(gateway-daemon|@madventures/broker|pty-host|adapter-)" packages/proving-ground/src/ | grep -v "claim-boundary"
# NOTE: the only intentional reference is the workspace dependency on
# @mad/claim-boundary (the law library); no gateway/broker/pty-host/adapter
# dependency exists (package.json declares @mad/claim-boundary only).
```

## TEST RESULTS (builder-run, 2026-09-09)

| Command | Exit | Summary |
| --- | --- | --- |
| `bun test packages/proving-ground` | 0 | 22 pass / 0 fail, 450 expect() |
| `bun test packages/claim-boundary` | 0 | 26 pass / 0 fail (21 prior + 5 promoted-regression tests) |
| `bunx tsc --noEmit` | 0 | clean |
| `bun test` (full repo) | 0 | 1063 pass / 0 fail, 72 files |
| `run --suite v0` (×2) | 0 | 3 pass / 0 fail / 1 spec-only, deterministic across reruns |
| A5 repro pre-fix run | 1 (expected) | packet preserved at `testdata/proving-ground/evidence/repro-packet-A5-drift-prefix.json` |

## INVARIANTS CLAIMED (for Argus to check, not trust)

1. **Deterministic seeds** — mulberry32; same seed reproduces identical case
   sets and verdicts (unit-tested; suite rerun identical).
2. **Skips are never green** — `unsupported` requires a recorded reason;
   `spec_only` is a deferral record; exit_ok requires zero FAILs (unit-tested
   summary math).
3. **Flaky quarantine** — `flaky: true` challenges are excluded from
   `--suite v0` without `--include-flaky`; none are flaky in v0 (mechanism
   tested via the filter path).
4. **Law oracle independence** — expectations are derived from laws L1–L6
   (`src/law.ts`), not from reading library internals; a library drift fails
   `pg-cb-lies`.
5. **Promoted regressions are durable** — loader test replays fixtures on
   every repo `bun test`; ≥2 fixtures enforced by a test.
6. **A5 closed at the source** — the drift challenge fails on stale
   instructions and passes on corrected ones (evidence packet + green run).
7. **No secret inheritance** — the wrapper spawns argument-list children from
   resolved binaries; the TUI child env is allowlisted by tui-chaos itself.
8. **Zero forbidden deps** — package.json declares `@mad/claim-boundary` only;
   no gateway/broker/pty-host/adapter imports in source.

## KNOWN ISSUES

- **note (process):** nothing is committed — Mimosa L3 blocks commits
  project-wide (pre-existing highs in files outside this blast radius, same
  situation as the claim-boundary handoff). Binding is the staged tree SHA.
  Prepared commit command available from the builder on Founder authorization.
- **note:** post-#49 scanner gap (assigned-require + dynamic-import not
  detected) is recorded in PREFLIGHT as an observation for the Founder. Per
  mission rules it was NOT fixed here; #49's track is concluded. If the
  Founder wants it closed, that is a separate, distinct authorization.
- **note:** `pg-tui-governance` depends on `packages/tui-chaos` (committed at
  `8ab9347` on this branch). On a host without `node`/`bun` it reports
  `unsupported` with the reason — CI lanes provide both.
- **note:** `minimize` supports claim-boundary vectors only (v0 scope); other
  kinds have no shrinker and the CLI says so rather than pretending.
- **minor:** `runs/` per-run packets are gitignored (custody noise); durable
  evidence lives in `testdata/proving-ground/evidence/` and promoted fixtures.

## SHA-256 of this handoff file

A file cannot contain its own digest; the authoritative SHA-256 is recorded
out of band in the builder's report. Verify with:

```bash
shasum -a 256 HANDOFF-builder-to-operator-proving-ground-v0-20260909.md
```
