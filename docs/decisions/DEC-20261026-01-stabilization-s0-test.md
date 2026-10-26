FOUNDER-ACT-20261026-STABILIZATION-S0-TEST: the dead-host containment test joins the stabilization build

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `418a0269b5d360690e3c5cd7c83663f022d1eba7`
> **Binding base:** for the stabilization build, the `origin/main` commit its builder prompt names, which must contain this act and the merge of Task 25
> **Read with:** `AGENTS.md`; `DEC-20261023-01` Parts B and D; my merge authorization of pull request 193, item 2

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header, `packages/broker/test/pty-host-supervisor.test.ts` lines 805 to 860 and 1049 to 1100, the `Test (non-UTC timezone)` step of `.github/workflows/verify.yml`, the failure annotation and log of job 121182952630 of CI run 40198007336, and `DEC-20261023-01` Part D. It ran no test.

A2. **The failure.** On the first attempt of Verify (macOS) for pull request 193, the test `S0: a dead host with a stdin-inheriting descendant still triggers mandatory child-PGID containment (C7 evidence 3)` failed in the step that runs the suite with `TZ` set to `America/New_York`, at line 1079: just after the test kills the PTY host, it asserts that the fixture child's process group is still alive, and the group was already gone. The same test passed at the same commit in the same job's UTC step, in the Task 25 builder's and reviewer's full suites on my MacBook, and on the job's second attempt. Task 25 changed no file that test exercises. Its cause is not established.

A3. **What the test relies on.** The test writes its fixture to the fixed path `/tmp/t44-stdin-inheritor.sh`, a shell loop that ignores `SIGTERM` only, and treats the survival of that child after its host is killed as a precondition of the containment it then checks.

A4. **The drafting assistant.** It drafted this act and the acts it amends. None of that is an independent review.

## Part B: Founder rulings

B1. **Scope.** `DEC-20261023-01` D1 is amended so: the stabilization build also hardens the test of A2, and also changes `packages/broker/test/pty-host-supervisor.test.ts`, only for that test, its fixture and any helper only that test uses.

B2. **The ruling for this test.** The builder first establishes, with evidence it quotes, why the fixture's process group can be gone at line 1079, and reports that cause before any change. If the cause lies in production code under `packages/*/src` or `apps/*/src`, the builder stops. Otherwise it removes that cause from the test's own setup, for example by writing the fixture under a disposable `mkdtemp` root the test owns, or by having the fixture ignore a signal the evidence shows it receives. Every assertion of the test stays, and no timeout is raised.

B3. **Verification.** `DEC-20261023-01` D3 is amended so: `bun test packages/broker/test/pty-host-supervisor.test.ts` passes five times in a row, each run separately in the foreground, and then five times in a row with `TZ=America/New_York`, before bare `bun test`. D2 adds one break: the mandatory child-PGID kill of the S0 path in `packages/broker/src/pty-host-supervisor.ts` removed, which must fail the hardened test. The break is restored and committed to no file.

B4. **Everything else.** `DEC-20261023-01` Parts B and D stand as this act amends them, including D4's builder, reviewer, commit subject and trailers.

B5. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3. The stabilization build starts only after it merges.

## Part D: Not authorized

- Any change to `pty-host-supervisor.test.ts` outside B1, or to any production file.
- Any timing exception or known-failure set on any host.
- Any change to the plan, the spec or any decision record other than this filing.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-26

Actor-Id: founder
