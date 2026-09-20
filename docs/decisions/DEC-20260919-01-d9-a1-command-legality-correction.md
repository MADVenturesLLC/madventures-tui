<!-- PROVENANCE — read before relying on anything below -->

> **Provenance warning.** This file is **not** the instrument the Consolidated
> B2 Execution Authorization names as its source, and the reader must not treat
> it as one.
>
> - §I.1 of that authorization requires this path to carry
>   `DEC-20260919-01-d9-a1-command-legality-correction.md` at sha256
>   `bc4dd982c462681b196f546aeacdafec54cc42db0d3dc95ca8b29173224cfa14`, and to
>   **stop** if the created file does not hash to that value.
> - That file was not available to the builder seat. What follows is the
>   **unsigned** predecessor draft,
>   `FOUNDER-D9-A1-B2-SCOPE-FOR-SIGNATURE-a8ecdc8a.md`, sha256
>   `99b355a5b8e0ce4cb69e86e13625359b9f8464b298958757d42857f07a8e8351`, filed
>   here on the Founder's explicit instruction and recorded as a deviation
>   rather than presented as compliance.
> - Its own line below reads `Status: NOT ISSUED, NOT IN FORCE`, and its Part E
>   signature block carries a name with a blank date. **Nothing in this file is
>   a Founder authorization.**
>
> **Where it contradicts itself, the shipped behaviour follows Option 1.**
> Part A1(i) directs an unconditional `invariant_failure` when
> `snapshot.executions === null`, at a predicate that gates
> `EXECUTION_SCOPED_COMMAND_KINDS` — which includes `pty_terminate`. Part A1(ii)
> states the opposite: "The `pty_terminate` path stays ungated." The issued
> `DEC-20260919-01` resolved that conflict as **Option 1**, and §C2 of the
> Consolidated B2 Execution Authorization records that a guard on the wider
> `EXECUTION_SCOPED_COMMAND_KINDS` set is **wrong**. The implementation scopes
> the guard to `WRITER_ONLY_COMMAND_KINDS` (`pty_input`, `pty_resize`) only;
> `pty_terminate` against a null collection is permitted, verified
> `{"ok": true}`.
>
> **Replace this file with the issued `bc4dd982…` copy when it is available**,
> and delete this provenance block at that time.

---

# FOR SIGNATURE — Founder Decision D9-A1: amendment to D9 (B2 scope correction)
> **Status: NOT ISSUED, NOT IN FORCE until the Founder signs below.**
> **Amends:** D9 (`ISSUED-FOUNDER-D9-SNAPSHOT-SOURCES-a8ecdc8a.md`, signed 2026-09-19T01:16Z).
> D9's Part A rulings (items 1–11) are **not** reopened, restated, or altered by this amendment.
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** unchanged from D9 — `origin/main` = `a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c`
> (tree `a9343ee1d38fe0b199d2ab513e88c88722b6489b`). Re-verified 2026-09-19 by `git fetch`.
> Additional governing files pinned at this base:
> - `packages/broker/src/command-legality.ts` sha256 `4efd1dfec7ad1c509ecff3ee8a94abb94062e4053d4419b89aa53115b55caaeb`
> - `packages/broker/test/command-legality.test.ts` sha256 `dacd913db302018206c6f4e7dc1904727f150959e8b283e10101cb221675a013` (21 `test(` calls)
>
> **Why this amendment exists (Architect finding, 2026-09-19, verified by the Founder's
> orchestrator):** D9 Part B item 12 types `executions` as `readonly ExecutionSnapshot[] | null`,
> but `command-legality.ts` reads `snapshot.executions.some(...)` (predicate 4, line 145) and
> `snapshot.executions.find(...)` (clause A, line 184) without a null guard, and the test helper
> `baseSnapshotWithExecutionState` (line 155) maps over it. Under `strict: true`, `bunx tsc
> --noEmit` exits 2 with three `TS18047` errors on a tree carrying item 12 alone. D9 item 9
> *ruled* the behaviour for `executions: null` but Part D item 18 barred the file that would
> implement it, and item 13 covered only the contract-test fixture. The instrument's own gate
> could not pass as scoped. This amendment authorizes exactly the code item 9 already pins.

---

Founder Decision D9-A1 — amendment to D9

Repository: MADVenturesLLC/madventures-tui
Date: 2026-09-19

I, Michael Daley, Founder of MAD Ventures and Founder OS, amend D9 as follows.

## Part A — Scope widening (replaces D9 Part B item 13; supersedes D9 Part D item 18 as to the two files named here)

A1. **`packages/broker/src/command-legality.ts`** — exactly two null guards, each routing to
    the error D9 item 9 pins. No other change to this file.

    (i) **Predicate 4** (execution existence, at base lines 144–150). Before the
        `snapshot.executions.some(...)` call: if `snapshot.executions === null`, return
        `{ ok: false, error: "invariant_failure", detail: "executions not produced by the snapshot" }`.
        Rationale: a null array is not "the named execution is absent" (`execution_not_found`);
        it is "the snapshot cannot resolve any execution", which is the clause A / clause B stop.

    (ii) **Clause A readiness limb** (predicate 6, at base lines 184–191). The existing
        `targetExecution === undefined` branch already returns
        `{ ok: false, error: "invariant_failure", detail: "target execution state cannot be resolved" }`.
        Guard the `.find(...)` so that `snapshot.executions === null` reaches that same branch
        (e.g. `const targetExecution = snapshot.executions?.find(...)`). The existing comment
        stating this branch is "unreachable defensive code" is amended to say it is reachable
        when `executions` is `null` under D9. The `pty_terminate` path stays ungated.

    Predicate order is unchanged. No new error code. No behavioural change for any non-null
    `executions` — the existing 21 tests must pass unmodified in their assertions.

A2. **`packages/broker/test/command-legality.test.ts`** — exactly two changes.

    (i) `baseSnapshotWithExecutionState` (base line 155): narrow to the non-null case with the
        smallest edit that restores `tsc` exit 0 (e.g. `(snapshot.executions ?? []).map(...)`).
        Its callers and assertions are unchanged.

    (ii) **One added test**, placed after the three `[added]` tests and before the original
        eighteen, verbatim name:
        `test("a writer-only command against executions: null fails with invariant_failure before readiness is evaluated")`
        Fixture: `baseSnapshot()` with `executions: null`; command `pty_input` carrying the
        current positive token and the bound session; expect `ok: false`,
        `error: "invariant_failure"`. This test is RED on the base file and GREEN only with A1(i).

    **The Task 21 test contract becomes 22.** The plan's Task 21 block Step 1/Step 4 counts
    (21 → 22) and its test list are amended in the B2 docs commit as part of D9 Part C
    item 16; no other Task 21 block text changes.

A3. D9 Part B item 13 continues to govern `packages/broker/test/broker-client-contract.test.ts`
    (narrowest fixture change, never a new invented value).

## Part B — Branch and writer ruling (B2 blocker 2)

B1. B2 is authored **only** on `docs/m9-d9-plan-open-7-ratification` by the mt-architect seat
    holding the B2 commission. No other seat writes the B2 scope.

B2. The worktree `~/MADVenturesOPs/worktrees/mtui-b2-d9-snapshot-sources` on local branch
    `build/b2-d9-snapshot-sources` (dirty at `a8ecdc8a` with the item-12 diff, no remote, no
    commission) is **unauthorized work**. Disposition: `git checkout -- .` in that worktree,
    `git worktree remove` it, delete the local branch, nothing pushed. The Architect records the
    fact (path, branch, mtime, diff --stat) in the B2 PR body under "Retained history / concurrent
    writer", and does not recover any content from it. If the Founder started that worktree
    personally, the Founder says so before signing and this item is struck.

## Part C — Instrument custody (B2 item 3)

C1. The ISSUED D9 instrument's line 2 is corrected from
    `> **Status: NOT ISSUED, NOT IN FORCE until the Founder signs below.**` to
    `> **Status: ISSUED — signed 2026-09-19T01:16Z; amended by D9-A1**`. The pre-correction
    sha256 (`0597a11866d62062c20b4135d5af588f83edf2f843c7774d8f526df384315aa8`) and the
    post-correction sha256 are both recorded in a one-line custody note beside it. The
    trailing-newline duplicate `FOUNDER ISSUED-D9-SNAPSHOT-a8ecdc8a.md` is moved to
    `m9/superseded/`. The unsigned draft `FOUNDER-D9-SNAPSHOT-SOURCES-FOR-SIGNATURE-a8ecdc8a.md`
    is deleted at the Founder's direction (2026-09-19) — the ISSUED copy is the record.

C2. The B2 commission is re-issued naming both instruments (D9 and D9-A1) with their sha256s,
    the widened scope, the branch ruling, and the 22-test gate.

## Part D — Boundaries (unchanged from D9 except as stated)

D1. This amendment authorizes the B2 publication with the scope in Part A added to D9's
    Part B and Part C. It does NOT authorize Task 21b implementation (D10), Task 22, the M9
    checkpoint, `snapshot.ts`, or any change to `runtime-broker.ts`, `ownership-machine.ts`,
    or the ledger.

D2. Gate under this amendment: `bunx tsc --noEmit` exit 0; `bun test packages/broker` 0 fail
    with `command-legality.test.ts` **22/22**; `bun run verify` exit 0; `git diff --check`
    clean; changed paths exactly the D9 Part B/C list plus the two files in Part A.

D3. Merge of B2 is a separate Founder act naming the exact head SHA after independent
    review at that head. Stop conditions apply unmodified.

## Part E — Signature

Signed:

— Michael Daley

Date: ____________________ (2026-09-19)

Actor-Id: founder
