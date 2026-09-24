# DEC-20260919-01 — Founder Decision D9-A1: Command-Legality Correction (amends D9)

**Status:** ISSUED — 2026-09-19, by the Founder's direct plain-language
instruction in the live Hermes session (mt-builder profile), naming the
exact worktree, branch, base SHA, tree, and scope below, and ruling the one
open question (the `pty_terminate` guard scope) as Option 1: keep D9 item 9
— `pty_terminate` stays ungated; `pty_input`/`pty_resize` fail with
`invariant_failure` under `executions: null`.
**Repository:** `MADVenturesLLC/madventures-tui`
**Amends:** [`DEC-20260918-01`](DEC-20260918-01-d9-snapshot-projection-sources.md)
(D9, `ISSUED-FOUNDER-D9-SNAPSHOT-SOURCES-a8ecdc8a.md`, signed 2026-09-19T01:16Z).
D9's Part A rulings (items 1–11) are **not** reopened, restated, or altered
by this amendment.
**Binding base:** unchanged from D9 — `origin/main` =
`ea079827a585f8fd6d628f5f65faaea03af6df99` (tree
`e3d5f476872b47afd40a363d58d90f8daace1fca`), re-verified by fresh
`git fetch` immediately before implementation.
**Governing files pinned at this base (independently recomputed, all
matched):**

- `packages/broker/src/client.ts` sha256
  `4c48911ced583475c9ecedeef33b2fb674dab4ef33dfbbe393bfff5264f86735`
- `packages/broker/src/command-legality.ts` sha256
  `4efd1dfec7ad1c509ecff3ee8a94abb94062e4053d4419b89aa53115b55caaeb`
- `packages/broker/test/command-legality.test.ts` sha256
  `dacd913db302018206c6f4e7dc1904727f150959e8b283e10101cb221675a013`
  (21 `test(` calls confirmed)

**Why this amendment exists.** D9 Part B item 12 types `executions` as
`readonly ExecutionSnapshot[] | null`, but `command-legality.ts` read
`snapshot.executions.some(...)` (predicate 4) and
`snapshot.executions.find(...)` (clause A) without a null guard, and the
test helper `baseSnapshotWithExecutionState` mapped over it directly. Under
`strict: true`, `bunx tsc --noEmit` on a tree carrying item 12 alone
reproducibly exits 2 with exactly three `TS18047` errors (confirmed by live
run in this correction's implementing worktree). D9 item 9 *ruled* the
behaviour for `executions: null` for `pty_terminate` specifically (stays
ungated) but did not, by itself, supply a compiling null guard for the
three read sites above. This amendment supplies exactly that guard, scoped
so D9 item 9's `pty_terminate` ruling is preserved rather than
contradicted.

A prior unsigned draft of this amendment
(`m9/FOUNDER-D9-A1-B2-SCOPE-FOR-SIGNATURE-a8ecdc8a.md`, sha256
`99b355a5b8e0ce4cb69e86e13625359b9f8464b298958757d42857f07a8e8351`) proposed
guarding `EXECUTION_SCOPED_COMMAND_KINDS` as a whole (which includes
`pty_terminate`) before the `.some(...)` call. Independent verification
(transcribing that guard literally and executing it against
`executions: null` for `pty_terminate`) showed it returns
`invariant_failure` for `pty_terminate` too — directly contradicting that
same draft's own sentence that "the `pty_terminate` path stays ungated."
That draft was never signed and is superseded by this instrument, which
resolves the contradiction by scoping the null guard to
`WRITER_ONLY_COMMAND_KINDS` only.

---

Founder Decision D9-A1 — amendment to D9

Repository: MADVenturesLLC/madventures-tui
Date: 2026-09-19

I, Michael Daley, Founder of MAD Ventures and Founder OS, amend D9 as
follows.

## Part A — Command-legality null guard (replaces D9 Part B item 13 as to `command-legality.ts`; ruling: Option 1)

A1. **`packages/broker/src/command-legality.ts`** — the null guard for
    predicate 4 is scoped to `WRITER_ONLY_COMMAND_KINDS`
    (`pty_input`, `pty_resize`), not to the broader
    `EXECUTION_SCOPED_COMMAND_KINDS` (which also contains `pty_terminate`).
    D9 item 9's ruling that `pty_terminate` remains ungated is preserved
    exactly, not reopened.

    (i) **Predicate 4** (execution existence). Inside the existing
        `if (EXECUTION_SCOPED_COMMAND_KINDS.has(kind))` block, before the
        `.some(...)` call: if `snapshot.executions === null` AND `kind` is
        a member of `WRITER_ONLY_COMMAND_KINDS`, return
        `{ ok: false, error: "invariant_failure", detail: "executions not produced by the snapshot" }`.
        If `kind` is `pty_terminate` and `snapshot.executions === null`,
        predicate 4 does nothing further and control reaches predicate 6's
        `pty_terminate` case unchanged — exactly the pre-amendment
        behaviour for a non-null collection that happens not to contain the
        target, and exactly what D9 item 9 rules.
        Rationale: a null array is not "the named execution is absent"
        (`execution_not_found`) for a writer-only command; it is "the
        snapshot cannot resolve any execution", which is the clause A /
        clause B stop. For `pty_terminate` a null array carries no such
        implication — its mechanical fail-closed teardown does not depend
        on resolving an execution's readiness at all.

    (ii) **Clause A readiness limb** (predicate 6, `pty_input`/`pty_resize`
        case). The existing `targetExecution === undefined` branch already
        returns
        `{ ok: false, error: "invariant_failure", detail: "target execution state cannot be resolved" }`.
        Guard the `.find(...)` call with optional chaining
        (`snapshot.executions?.find(...)`) so the expression type-checks
        under the widened `executions: readonly ExecutionSnapshot[] | null`
        type. This branch is reached only for `pty_input`/`pty_resize`,
        both of which predicate 4 (A1(i)) has already stopped when
        `executions` is null — so the optional chaining here is a
        type-level formality confirming the null case, never a second,
        looser path to admission.

    Predicate order is unchanged. No new error code. No behavioural change
    for any non-null `executions` — the existing 21 tests must pass
    unmodified in their assertions.

A2. **`packages/broker/test/command-legality.test.ts`** — exactly two
    changes.

    (i) `baseSnapshotWithExecutionState` (base line 155): narrow to the
        non-null case with the smallest edit that restores `tsc` exit 0
        (`(snapshot.executions ?? []).map(...)`). Its callers and
        assertions are unchanged.

    (ii) **One added test**, placed after the three `[added]` tests and
        before the ten matrix rows, verbatim name:
        `test("a writer-only command against executions: null fails with invariant_failure before readiness is evaluated")`
        Fixture: `baseSnapshot()` with `executions: null`; command
        `pty_input` carrying the current positive token and the bound
        session; expect `ok: false`, `error: "invariant_failure"`,
        `detail: "executions not produced by the snapshot"`. This test is
        RED on the pre-A1(i) code (confirmed live: `TypeError: null is not
        an object` at the unguarded `.some(...)` call, 21 pass / 1 fail /
        22 total) and GREEN only with A1(i) applied (confirmed live: 22
        pass / 0 fail / 46 `expect()` calls).
        The test is deliberately kept on `pty_input`, not `pty_terminate`:
        it is the WRITER-ONLY case, and under this ruling `pty_terminate`
        is explicitly ungated — presenting `pty_terminate` here would
        assert this ruling's opposite.

    **The Task 21 test contract becomes 22.** The plan's Task 21 block
    Step 1/Step 4 counts (21 → 22) and its test list are amended in the B2
    docs commit as part of D9 Part C item 16; no other Task 21 block text
    changes.

A3. D9 Part B item 13 continues to govern
    `packages/broker/test/broker-client-contract.test.ts`. Independent
    verification found no fixture change was needed there: the file
    assigns literal (non-`null`) values to every widened member, which
    remain valid under the widened `T | null` types without modification;
    `tsc --noEmit` exits 0 with that file unchanged.

## Part B — Boundaries (unchanged from D9 except as this Part A states)

B1. This amendment authorizes exactly the code and test change in Part A,
    plus the corresponding record and plan/spec updates under D9 Part C.
    It does NOT authorize Task 21b implementation (D10), Task 22, the M9
    checkpoint, `snapshot.ts`, or any change to `runtime-broker.ts`,
    `ownership-machine.ts`, or the ledger.

B2. Gate under this amendment: `bunx tsc --noEmit` exit 0; `bun test
    packages/broker/test/command-legality.test.ts` 22/22, 0 fail; `bun
    test packages/broker` 0 fail; `bun run verify` exit 0; `git diff
    --check` clean; changed paths exactly the D9 Part B/C list plus
    `packages/broker/src/command-legality.ts` and
    `packages/broker/test/command-legality.test.ts`.

B3. Merge of B2 is a separate Founder act naming the exact head SHA after
    independent review at that head. Stop conditions apply unmodified.

## Part C — Retained concurrent writer (recorded, not resolved by this instrument)

C1. The worktree `~/MADVenturesOPs/worktrees/mtui-b2-d9-snapshot-sources`
    on local branch `build/b2-d9-snapshot-sources` was found dirty at head
    `a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c` with an uncommitted
    modification to `packages/broker/src/client.ts` (mtime 2026-09-18
    21:18:01 EDT), no upstream tracking branch, and nothing on
    `origin/build/b2-d9-snapshot-sources`. It was not written to, staged,
    committed, or cleaned by this instrument's implementation. Its
    disposition (recover, discard, or leave standing) is not ruled here
    and remains open.

## Part D — Signature

Signed:

— Michael Daley

Date: 2026-09-19
Actor-Id: founder
Authorization channel: live plain-language instruction in the Hermes
mt-builder session, per `governed-git-publication` skill discipline for
distinguishing genuine live authorization from a self-declared document.
No separate signed paper instrument exists for this specific correction;
this repository-filed record is the citable transcription of that live
instruction, prepared by the implementing seat (mt-builder) as the record
required by D9 Part C item 16's pattern, not as a self-authorizing claim.
