FOUNDER-ACT-20260924-M9-HARDEN: test-only hardening of M9 legality coverage

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `origin/main` = `f513c7637a825b55354c93b8c69ceac62a6d4c13`
> (tree `565569c28f66eb30bc0581f22e137fb983bb1d5f`)

***

I, Michael Daley, Founder of MAD Ventures and Founder OS, rule and authorize as follows.

## Part A — Basis

A1. The independent static M9 review (Codex, 2026-09-24 17:13 UTC, FAIL (STATIC)) found
    that `packages/broker/src/command-legality.ts` implements the M9 rules, but two
    authority-path rules have no test that would catch a regression:
    - F1: nothing asserts that `pty_terminate` is admitted when `executions` is `null`,
      or when the target execution is not ready. Widening the D9-A1 guard to
      `pty_terminate` would stay green.
    - F2: no test presents a readiness failure (predicate 6) together with a stale token
      (predicate 7), so swapping those checks would stay green.
    F4 (Minor): each "any phase" matrix row checks only one phase.
A2. This act fixes F1, F2 and F4 with tests only. The source is not changed.
A3. F3 (plan Task 20 says "4 pass"; the file has 5) is left to the "M9 reviewed" act.

## Part B — Scope

B1. Exactly one path: `packages/broker/test/command-legality.test.ts` (modify).
B2. Nothing else. No change to any `src/**` file, any other test, docs, the plan,
    manifests, the lockfile, `.github/**`, or `apps/**` (including
    `apps/madbridge/src/tui/**`).
B3. Before the first edit, re-derive the sha256 of these files at the base and stop on
    any mismatch:
    - `packages/broker/test/command-legality.test.ts` =
      `d2d497a65d7609a2bd2265ea2e10c970d211f1b1a3e4ad1d7e63decdd3e5a2d8`
    - `packages/broker/src/command-legality.ts` =
      `d5f2bb874d65547acf65c31dc197f431018edf95e033063729f2e15cedd3f808`

## Part C — The tests

C1. Add four tests, titles verbatim:
    1. `pty_terminate against executions: null is admitted`
       An otherwise legal `pty_terminate` with `executions: null` returns `{ ok: true }`.
    2. `pty_terminate against a non-ready execution is admitted`
       An otherwise legal `pty_terminate` whose target execution is not `ready` returns
       `{ ok: true }`.
    3. `a writer-only command failing both readiness and the fencing token yields the readiness refusal`
       A `pty_input` whose target execution is not `ready` and whose token is stale
       returns exactly `{ ok: false, error: "invariant_failure", detail: "target execution is not ready" }`.
    4. `pty_terminate is legal in every phase except closed`
       Table-driven over every `LifecyclePhase`: `{ ok: true }` for starting, active,
       paused, interrupted and closing; the existing closed refusal for closed.
C2. Strengthen these five existing tests so each runs a table over every phase its name
    covers. Titles are unchanged, and each keeps its original phase in the table:
    - `legality row: pty_input in any non-active phase yields session_not_writable`
      (starting, paused, interrupted, closing, closed)
    - `legality row: approval_resolve in any non-active phase yields session_not_writable`
      (same five)
    - `legality row: session_pause in any other phase yields session_not_writable`
      (same five)
    - `legality row: session_resume in any other phase yields session_not_writable`
      (starting, active, interrupted, closing, closed)
    - `legality row: session_close in any other phase yields session_not_writable`
      (starting, paused, interrupted, closing, closed)
    Each asserts the exact error and detail its row already asserts.
C3. No other test is changed. Of the other 17 original tests, 16 stay byte-identical.
    The D9-A1 test changes only in the comment named in C4; its code and assertions are
    unchanged.
C4. Correct the comment at the D9-A1 test that says asserting `pty_terminate` "would
    invert the ruling". It should say that `pty_terminate` stays ungated and is asserted
    in test C1.1. This is the only comment change.
C5. This act amends D9-A2 B1's count for this file from 22 to 26. What D9-A2 B2 protects
    is unchanged, apart from the five C2 tests, which are strengthened, not weakened.
C6. The new and strengthened tests must pass against the unchanged source. If any of them
    fails against the base source, stop and report: that would be a source defect, not a
    test task.

## Part D — Verification

D1. Before and after, on the base and on the final head: `bunx tsc --noEmit` exits 0,
    and `bun test packages/broker/test/command-legality.test.ts` and
    `bun test packages/broker` pass. Record the counts. The legality file goes from 22 to
    26 passing; the package total rises by exactly 4.
D2. Mutation probes, MEASURED. Run each in a disposable copy of the source, restore it
    byte-identically after each, and show the named test turning RED:
    (a) widen the D9-A1 null guard to `pty_terminate` → C1.1
    (b) make `pty_terminate` require a ready execution → C1.2
    (c) move the predicate-7 token check ahead of the predicate-6 readiness check → C1.3
    (d) admit `session_pause` in `closing` → the strengthened session_pause row
    (e) refuse `pty_terminate` in `paused` → C1.4
    (f) remove the D9-A1 guard → the existing D9-A1 test
    (g) drop the positive-token check → the existing non-positive-token test
    Report each probe as: mutation | test(s) that went RED, verbatim | caught.
    An uncaught probe is a stop condition.
D3. `git diff --name-only origin/main...HEAD` lists exactly B1. `git diff --check` is clean.
    `git diff` against the base on `src/**` is empty.

## Part E — Commit, PR, review

E1. Binding: `Role-Id: builder`, `Actor-Id: session:claude-code/m9-harden-r1`,
    `Execution-Surface: claude-code`. This must be a new session, not an author of any
    M9 commit. Branch `build/m9-test-hardening-r1`.
E2. One commit, message exactly `test(broker): harden M9 legality coverage (F1, F2, F4)`,
    ending with exactly the three E1 trailers (each 72 characters or fewer) and nothing
    after them. No amend, rebase, or force-push after pushing.
E3. Open a DRAFT PR against `main`. Set the body last, with `update_pull_request`, after
    the bots post. The body carries:
    - the base and the B3 hashes;
    - a table mapping C1-C5 to test names and line numbers;
    - the D1 counts and the D2 probe table;
    - a "Choices made" table;
    - the trailers as its last lines.
    It contains no `---` line. Verify with `git interpret-trailers --parse` over the
    title, a blank line, and the live body.
E4. Stop and report on:
    - a hash mismatch;
    - an edit needed outside B1;
    - a new test that fails against the base source (C6);
    - an uncaught probe;
    - any request to widen scope.
    Deliver the branch, PR number, commit SHA, diff stat, D1-D3 evidence and the
    trailer-parse output. Then stop.
E5. Codex re-reviews this PR's diff and the D2 probe table before any merge act.

## Part F — Consequences

F1. After this PR merges, I will issue the "M9 reviewed" act on the new `main`.
F2. The Task 22 act drafted at base `f513c763…` will be re-bound to the new `main` before
    I sign it.

## Part G — Not authorized

Any source change; any test outside B1; Task 22; the "M9 reviewed" act; any docs or plan
edit; ready-for-review; merging (a separate act naming the exact head); M15, M16, M20+;
`apps/madbridge/src/tui/**`.

## Part H — Signature

Signed:

— Michael Daley

Date: 2026-09-24
Actor-Id: founder
