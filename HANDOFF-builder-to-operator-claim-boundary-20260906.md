# HANDOFF — builder → operator — @mad/claim-boundary (2026-09-06)

Builder: Hephaestus / GLM (agent-authored; `Actor-Id: decivantiq` carries the
commit identity when this lands). This packet binds the exact tree Argus will
verify. It makes no merge, approval, or Phase 0 claim of any kind.

## BINDING SUBJECT

- **head_sha:** `a919512240b1f04adbfcf605d61a188b367ec2d3` (full 40-char)
- **index_tree_sha:** `ca4151967116a4f4b30642778a2e3143abf9b8f9` — `git write-tree`
  over the staged index, which contains every file this packet covers. HEAD has
  no claim-boundary content: **all work is staged, deliberately uncommitted**
  (Mimosa L3 pre-commit gate is blocking commits project-wide on pre-existing
  findings outside this task's blast radius — disclosed in KNOWN ISSUES). Argus
  must verify the staged tree, not HEAD.
- **branch:** `Headless-TUI-Acceptance-Chaos-Explorer`
  (merge-base with `main` = `a6dd0bfe1068736b2259f9d555bb307972766335`; the
  branch additionally carries pre-existing M4/M5 ledger/protocol commits that
  are NOT part of this handoff)
- **package_path:** `packages/claim-boundary`
- **package_name:** `@mad/claim-boundary` (confirmed from
  `packages/claim-boundary/package.json`; `dependencies` and
  `devDependencies` fields are absent entirely — zero deps)
- **tree_clean:** **no** — by design: (a) this package is staged but uncommitted
  (gate), (b) the staged index also holds the separate, previously-authorized
  PILLAR-1 tui-chaos changeset awaiting its own gate decision, (c) pre-existing
  untracked environment files (`.claude-backups/`, `.claude/`, `.mimosa/`,
  `IMACTASK39.txt`, `MACBOOKTASK39.txt`, `iMacTest2.txt`) and generated run
  artifacts (`testdata/tui-chaos/runs/`) are present and belong to nothing here.

### Per-file custody (SHA-256, computed 2026-09-06)

```
317781fbe8edd5c605a06f59f28a5b1c20010efbc03c760b79619550ff859e84  packages/claim-boundary/package.json
f156686258e9ce120f7ab1d460a1d72b5f7d69c7693bb904fac4c1b937fa6aec  packages/claim-boundary/README.md
ef308dfad192a09d6b7ed90a564e65653ae2e651db7b48974db95e4bf2075a05  packages/claim-boundary/src/index.ts
c640759fa2fef118407f532ba4322bafef2d4dcfcc1be0e8ffa8bcb2670030f4  packages/claim-boundary/test/claim-boundary.test.ts
bfe6ac675b68fb5fdf86cea19efab9d6f045246057dc34e4aff02e8530b8bfd6  tsconfig.json
75f04bebf354c045fca81802baec3d037942bc3ee1b338046028853f3f8ec1f3  bun.lock
```

## HOW TO VERIFY (copy-paste commands, from repo root, in order)

```bash
# 0. Bind check — head and staged tree must match this packet
git rev-parse HEAD                 # expect a919512240b1f04adbfcf605d61a188b367ec2d3
git write-tree                     # expect ca4151967116a4f4b30642778a2e3143abf9b8f9
git rev-parse --abbrev-ref HEAD    # expect Headless-TUI-Acceptance-Chaos-Explorer
git status --porcelain             # compare against BLAST RADIUS below

# 1. Package identity (expect @mad/claim-boundary, no dependencies fields)
python3 -c "import json; p=json.load(open('packages/claim-boundary/package.json')); print(p['name'], p.get('dependencies'), p.get('devDependencies'))"

# 2. Package tests (hard requirement: exit 0, 21 pass / 0 fail)
bun test packages/claim-boundary; echo "exit=$?"

# 3. Repo typecheck (hard gate; covers this package — no tsconfig include filter)
bunx tsc --noEmit; echo "exit=$?"

# 4. Isolation: zero forbidden imports in package source (expect no output)
grep -rn -E "(from[[:space:]]+|require\([[:space:]]*|import[[:space:]]+)[\"'][^\"']*(gateway-daemon|@madventures/broker|pty-host|adapter-claude-code|adapter-antigravity)" packages/claim-boundary/src/

# 5. Rung ladder order — read from SOURCE, not this packet:
sed -n '29,40p' packages/claim-boundary/src/index.ts   # EVIDENCE_RUNGS
sed -n '43,54p' packages/claim-boundary/src/index.ts   # EVIDENCE_CLAIMS

# 6. Full repo suite (context: 1000 pass / 0 fail as of bind time)
bun test
```

## TEST RESULTS (builder-run, 2026-09-06)

| Command | Exit | Summary |
| --- | --- | --- |
| `bun test packages/claim-boundary` | 0 | 21 pass / 0 fail, 119 expect() calls, 1 file |
| `bunx tsc --noEmit` | 0 | clean (repo-wide, strict config incl. `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`) |
| `bun test` (full repo) | 0 | 1000 pass / 0 fail, 4374 expect() calls, 61 files |
| forbidden-import grep (step 4 above) | 1 (no matches) | zero imports of gateway-daemon / broker / pty-host / adapters in package source |

Runtime smoke (informational): `import("@mad/claim-boundary")` resolves through
the workspace link; `makeClaimBoundary("executed")` yields
`not_evidence_of: ["attestation","verification","review","ci","merge"]`.

## BLAST RADIUS

**Paths touched by THIS handoff (6):**

- `packages/claim-boundary/package.json`
- `packages/claim-boundary/README.md`
- `packages/claim-boundary/src/index.ts`
- `packages/claim-boundary/test/claim-boundary.test.ts`
- `tsconfig.json` — one line: `"@mad/claim-boundary": ["./packages/claim-boundary/src/index.ts"]` added to `paths` (workspace norm for cross-package imports)
- `bun.lock` — workspace registration of `packages/claim-boundary` (generated; also carries the separately-authorized PILLAR-1 dependency entries)

**out_of_band (staged in the same index, NOT part of this handoff):** the
PILLAR-1 tui-chaos changeset — `.github/workflows/tui-chaos.yml`,
`apps/madbridge/src/fixture/harness.ts`, `apps/madbridge/src/tui/main.tsx`,
`package.json` (root: `test:tui-chaos` script + `trustedDependencies`),
`packages/tui-chaos/**` (20 files), `testdata/tui-chaos/goldens/*.grid.txt`,
plus the bun.lock/tsconfig shared-wiring overlap. Argus reviewing
claim-boundary can ignore these; they are listed so the binding tree is fully
accounted for. `git diff --stat main...HEAD` additionally shows the branch's
pre-existing M4/M5 commits (merge-base `a6dd0bf…`) — also not this handoff.

## INVARIANTS CLAIMED (for Argus to check, not trust)

1. **Closed enums** — `EvidenceRung`/`EvidenceClaim` derive from `as const`
   tuples (`src/index.ts:29-40`, `:43-54`); `RUNG_TO_CLAIM` is
   `satisfies`-checked exhaustive (`:64-75`); validation rejects anything
   outside the vocabulary (`UNKNOWN_RUNG`, `UNKNOWN_CLAIM`).
2. **`not_evidence_of` exactly = claims above rung** — `forcedNotEvidenceOf`
   (`src/index.ts` `forcedNotEvidenceOf`, ~line 117) returns
   `EVIDENCE_CLAIMS.slice(index+1)`; validation requires set equality
   (`INCOMPLETE_NOT_EVIDENCE_OF` for omissions, `OVERBROAD_NOT_EVIDENCE_OF`
   for contradictions); `provenClaims ∪ forcedNotEvidenceOf` partitions the
   claim set for every rung (tested exhaustively; golden table in
   `test/claim-boundary.test.ts` FORCED constant).
3. **Gloss never semantic** — `makeClaimBoundary`/`parseClaimBoundary` carry
   gloss through but derive semantics only from the rung; tested with a lying
   gloss ("fully verified, reviewed, CI green, and merged" at rung
   `prepared` → still proves exactly `preparation`).
4. **`EXIT_CODE_0_MUST_NOT_PROVE` covered by tests** — exported constant
   (`[verification, review, ci, merge]`); tests assert every rung ≤ `attested`
   disclaims all four; the `executed` case is the exit-code-0 lie itself.
5. **Zero runtime deps on gateway/broker/pty-host** — no `dependencies`/
   `devDependencies` fields at all; static source scan over import specifiers
   finds zero forbidden imports; failure mode is a test, not an honor system.
6. **Fail-closed ladder** — `ladderInvariantViolations()` runs inside every
   derive/validate; a corrupted ladder yields `LADDER_INVARIANT_VIOLATION`
   instead of a derived boundary.

## KNOWN ISSUES

- **note (process, not code):** commits are blocked repo-wide by the Mimosa L3
  pre-commit gate on pre-existing findings unrelated to this package
  (`apps/madbridge/src/commands/doctor.ts:53`,
  `test/phase3a/spike/bun-terminal-spike.ts`,
  `packages/pty-host/test/eof-timer.test.ts`,
  `packages/broker/test/pty-host-supervisor.test.ts`). This is why the binding
  is a staged index tree SHA rather than a commit SHA. No bypass was used.
- **note:** the `not_evidence_of` field accepts any array order (set semantics);
  canonical ladder order is produced by `canonicalClaimBoundary`/
  `parseClaimBoundary`. Consumers that hash receipts should hash the canonical
  form. Documented in README.
- **minor:** `README.md` banner was amended by one line at handoff time
  (`LIBRARY — NOT PHASE_0 — NOT OCCUPANCY — NO GATEWAY — NO FAKE ROOM.`) to
  satisfy step 6 of the handoff template; sha256 above reflects the amended
  file. No other file was touched after tests ran.

## SHA-256 of this handoff file

A file cannot contain its own digest (embedding it changes it), so the
authoritative SHA-256 is recorded **out of band** in the builder's report to
the operator. Operator: verify by running

```bash
shasum -a 256 HANDOFF-builder-to-operator-claim-boundary-20260906.md
```

and comparing against the hash in the builder's report.
