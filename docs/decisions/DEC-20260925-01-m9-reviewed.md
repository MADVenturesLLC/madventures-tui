FOUNDER-ACT-20260925-M9-REVIEWED: the M9 review checkpoint, F3, and records

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Binding base:** `origin/main` = `1f012be616d430cb95df6c74f6f478559fd65208`
> (tree `ba1cc1505d4fe926b16f2ed4e4296345f88c9840`)

***

I, Michael Daley, Founder of MAD Ventures and Founder OS, rule and authorize as follows.

## Part A — Basis

A1. M9 is Tasks 20 and 21 (plan §11.2): the closed `BrokerClient` contract in
    `packages/broker/src/client.ts` and the pinned §9.3 legality matrix in
    `packages/broker/src/command-legality.ts`. Both are on `main`.
A2. The independent static M9 review (Codex, 2026-09-24 17:13 UTC) returned FAIL (STATIC)
    with findings F1–F4. FOUNDER-ACT-20260924-M9-HARDEN (sha256
    `89799bf08e4b2b30e72fdd869159d4ea366499f1afa3525f6896e442738f01f4`) closed F1, F2 and F4
    with tests only; PR #99 merged at `1f012be616d430cb95df6c74f6f478559fd65208` under my
    authorization of 2026-09-25T09:24Z, after Codex's E5 re-review of head
    `5d8b2ea9dbcabf114183c1181931f29821a8a84a` returned PASS (STATIC) with no findings.
A3. F3 remains open: plan Task 20 Step 4 (L1378) says "expected GREEN: 4 pass", and
    Step 1 (L1375) names four tests, while `packages/broker/test/broker-client-contract.test.ts`
    has carried five since its first commit (`322ad79`, 2026-09-15). The fifth,
    `client.ts consumes the authoritative OwnershipState and declares no ownership union`,
    is Step 6's inspection made into a test. The source is right; the plan's count is wrong.
A4. One further record is stale: the header comment of
    `packages/broker/test/command-legality.test.ts` (L3) says "Twenty-two named tests"; the
    file has 26 (M9-HARDEN C5 amended D9-A2 B1 from 22 to 26). M9-HARDEN C4 allowed one
    comment change and the header was not it (PR #99 Choices made #6; Copilot thread
    `r4100709581`, deferred to this act).
A5. M9-HARDEN itself is not yet filed under `docs/decisions/`; the M10 docs act was
    (`DEC-20260924-03`). This act files it.

## Part B — Rulings

B1. **M9 is reviewed.** The §11.2 reviewer checkpoint for M9 ("Plato/Codex") is satisfied by
    the 2026-09-24 static review, M9-HARDEN's closure of F1, F2 and F4, the E5 PASS on the
    merged head, and this act's closure of F3. The Task 22 precondition "M9 reviewed" is
    met on the merge of this act's PR and not before.
B2. **F3 is closed by correcting the plan, not the test.** Task 20 Step 1 gains
    the fifth title; Step 4 reads "5 pass". No test is added, removed or renamed.
B3. **D9-A2 B1's count of 22 stands amended to 26** as M9-HARDEN C5 ruled. `DEC-20260919-02`
    is not edited; this clause is the record. What D9-A2 B2 protects is unchanged: the
    original 21 tests and the D9-A1 test keep their assertions; M9-HARDEN's four are added
    and its five C2 rows are strengthened.
B4. **The header is corrected to the file's actual inventory** (C2 below). This is a comment
    change only; no test and no source changes.
B5. **M9 measured at the binding base** (2026-09-25, tree identical to PR #99's head):
    `bunx tsc --noEmit` exit 0; `bun test packages/broker/test/broker-client-contract.test.ts`
    5 pass; `bun test packages/broker/test/command-legality.test.ts` 26 pass;
    `bun test packages/broker` 252 pass, 0 fail, 13 files. The builder re-measures all four
    at the base and at the final head (D1).

## Part C — Scope (exactly these paths)

C1. `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` (modify), four edits:
    (a) L1375, Task 20 Step 1: after the fourth `test(...)` clause, append
        `; test("client.ts consumes the authoritative OwnershipState and declares no ownership union")
        asserting that client.ts imports OwnershipState from ./ownership-machine exactly once and
        declares no ownership-state union of its own (Step 6's inspection, as a test)`.
    (b) L1378, Task 20 Step 4: "expected GREEN: 4 pass" → "expected GREEN: 5 pass".
    (c) L1562, Task 22 precondition: replace the line with
        `- M9 reviewed (FOUNDER-ACT-20260925-M9-REVIEWED, \`DEC-20260925-01\`, B1).`
    (d) L3459, §11.2 M9 row: `| M9 | 20–21 | 2 | Plato/Codex |` →
        `| M9 | 20–21 | 2 | Plato/Codex — reviewed 2026-09-25 (\`DEC-20260925-01\`) |`.
    Nothing else in the plan changes.
C2. `packages/broker/test/command-legality.test.ts` (modify), the header comment L3–L9 only,
    to read:
    ```
    // section 9.3; plan Task 21). Twenty-six named tests: three added by the
    // 2026-09-17 Founder amendment (the F1 unknown-field closure, clause A's
    // readiness limb, clause B's fencing-token positivity limb), one added by
    // D9 Part B item 12 (the null-executions writer-only closure), four added
    // by FOUNDER-ACT-20260924-M9-HARDEN (F1, F2, F4), ten matrix rows, four
    // retained, four originally-new (execution_not_found, invalid_dimensions,
    // invalid_command precedence, and the D7 non-writer negative proof).
    ```
    L1–L2 and L10 onward are byte-identical. No `test(` line changes.
C3. `docs/decisions/DEC-20260924-05-m9-harden-act.md` (add): FOUNDER-ACT-20260924-M9-HARDEN,
    byte-for-byte from the file I supply, sha256
    `89799bf08e4b2b30e72fdd869159d4ea366499f1afa3525f6896e442738f01f4`.
C4. `docs/decisions/DEC-20260925-01-m9-reviewed.md` (add): this act, byte-for-byte from the
    file I supply, sha256 `<filled at issuance>`.
C5. Nothing else. No `src/**` change, no other test, no spec change, no manifest, lockfile,
    `.github/**` or `apps/**` change.
C6. Before the first edit, re-derive at the base and stop on any mismatch:
    - plan = `3a6ed404218b60f227bb98baa1ead06188cfc2f0d16000eeeba0c2b044973bb6`
    - `packages/broker/test/command-legality.test.ts` =
      `8cbf66b86938fc735c4e682867fbe1a09c32f02fb5d4213fe02e32cb421e54dc`
    - `packages/broker/test/broker-client-contract.test.ts` =
      `cf0cb0cbfbba0e809294f05f71cb136d2e1d95bd72c398f34b673c61732ffc8a` (not edited; pinned)
    - `packages/broker/src/command-legality.ts` =
      `d5f2bb874d65547acf65c31dc197f431018edf95e033063729f2e15cedd3f808` (not edited; pinned)
    - `packages/broker/src/client.ts` =
      `8fd3801e79a1ace282152005983eb0fc5a3accbb9e6174c9f5390232033d43b7` (not edited; pinned)

## Part D — Verification

D1. Before and after: `bunx tsc --noEmit` exits 0; the three `bun test` commands in B5 give
    5 / 26 / 252 pass at the base and the same at the head. Any change in a count is a stop.
D2. `git diff --name-only origin/main...HEAD` lists exactly C1–C4. `git diff --check` is
    clean. `git diff` against the base on `src/**` is empty. The only diff hunk in the test
    file is the header comment; `grep -c '^test(' packages/broker/test/command-legality.test.ts`
    is 26 at base and head.
D3. Plan hunks: exactly the four C1 edits, verified by `git diff --stat` (one file) and by
    reading the diff; no other line changes.

## Part E — Commit, PR, review

E1. Binding: `Role-Id: builder`, `Actor-Id: session:claude-code/m9-reviewed-r1`,
    `Execution-Surface: claude-code`. A new session; not the author of PR #99's commit.
    Branch `docs/m9-reviewed-r1`.
E2. Two commits, in this order, each ending with exactly the three E1 trailers and nothing
    after them, no amend, rebase or force-push after pushing:
    1. `docs(decisions): file FOUNDER-ACT-20260924-M9-HARDEN and FOUNDER-ACT-20260925-M9-REVIEWED`
       — C3 and C4.
    2. `docs(plan,test): close F3 and record the M9 review checkpoint`
       — C1 and C2.
E3. Open a DRAFT PR against `main`. Set the body last, with `update_pull_request`, after the
    bots post. The body carries: the base and C6 hashes; a table mapping C1(a)–(d), C2, C3
    and C4 to line numbers at the head; the D1 counts; a "Choices made" table; the trailers
    as its last lines; no `---` line. Verify with `git interpret-trailers --parse` over the
    title, a blank line and the live body.
E4. Stop and report on: a hash mismatch; an edit needed outside C1–C4; a count change (D1);
    any request to widen scope. Deliver the branch, PR number, commit SHAs, diff stat, D1–D3
    evidence and the trailer-parse output. Then stop.
E5. Merge is a separate act naming the exact head, as for PR #98 and #99. Codex
    re-review is not required for this PR: it changes no source and no test assertion.

## Part F — Consequences

F1. On the merge of this act's PR, the Task 22 precondition "M9 reviewed" is met. The Task 22
    act is then re-bound to that `main` (M9-HARDEN F2) before I sign it, and rules the
    `snapshotSeq` carrying mechanism deferred at PR #98 thread T6.
F2. Cursor Bugbot has not run on any PR since #98 (usage limit). My #98 and #99 waivers set no
    precedent for source PRs. Before the Task 22 PR leaves draft, either Bugbot runs again or
    the Task 22 act names its substitute.

## Part G — Not authorized

Task 22; any `src/**` change; any test assertion change; any spec change; either M10 review
checkpoint; closing `PLAN-OPEN-7`; the three "For Founder ruling" items; ready-for-review;
merging; M15, M16, M20+; `apps/madbridge/src/tui/**`.

## Part H — Signature

Signed:

— Michael Daley

Date: 2026-09-25
Actor-Id: founder
