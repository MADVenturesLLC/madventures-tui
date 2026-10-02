FOUNDER-ACT-20261002-M14-TASK34: Task 34 accepted subject to one correction, node-pty harness carve-out ruled, M14 review requirement set

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `d950bd77225c7abc7c1cb42e3ab2d72542824541`
> **Task 34 merge:** PR #93, merge commit `a2a55bfa31390194904f71c6931e6bc8801df897`, 2026-09-22
> **Task 33 merge:** PR #94, merge commit `4477bf824892f2e3311843e33f163bc52ac9e5fe`, 2026-09-23
> **Read with:** `DEC-20260924-03` (the M10 docs act, Part A2), `PLAN-OPEN-4` (node-pty disposition), `PLAN-OPEN-6` (root scripts) and plan Task 34 and Task 35.

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What is open.** `DEC-20260924-03` A2 records that the M14 review checkpoint stays open pending a separate Task 34 acceptance ruling, and that M15 is deferred behind it, not waived. Task 35 requires "M14 reviewed" and a `PLAN-OPEN-3` ruling. `PLAN-OPEN-3` was approved on 2026-08-15. This act addresses the M14 half. Task 35 itself is not authorized here.

A2. **What the drafter observed.** The drafter is an assistant. This is its own reading and is not an independent review.

- Task 33, static, on `d950bd77225c7abc7c1cb42e3ab2d72542824541`: `packages/broker/src/index.ts` exports none of the eight quarantined names and none of the socket, MCP or pty-manager modules. The only importer of `socket.ts` is `packages/broker/test/socket.test.ts`. No production source contains `unix://`. The preserved modules, both adapter `mcp-config.ts` files and `createFakeByteRouter` are present.
- Task 34, static: the root scripts `broker` and `mcp` are absent. `test:phase3a`, `test:arch`, `test:adversarial` and `verify:phase3a` are present. `packages/broker/package.json` declares no `node-pty`.
- Executed, in a disposable checkout of `d950bd77225c7abc7c1cb42e3ab2d72542824541` on Linux with Bun 1.3.11: `bun install --frozen-lockfile` exit 0; `bun test test/phase3a/architecture-phase3a.test.ts` 41 pass, 0 fail, 472 expect calls; `bunx tsc --noEmit` exit 0. Not run: the full `bun test`, any macOS host, and Bun 1.3.14, the version CI pins.

A3. **Finding F1: the node-pty premise changed after `PLAN-OPEN-4`.** `PLAN-OPEN-4` records that `node-pty` was "not imported anywhere in the tree" and requires the resolved `node-pty@1.1.0` entry to come out of `bun.lock`. `packages/tui-chaos`, added later, declares `node-pty` and imports it in its pty bridge. So `bun.lock` still resolves `node-pty@1.1.0` and `node-addon-api@7.1.1`, the `packages/tui-chaos` workspace block lists `node-pty`, and the root `package.json` keeps `trustedDependencies: node-pty`. The Task 34 builder handled this with a named `tui-chaos` carve-out in the architecture test and disclosed it in the PR. No Founder ruling authorizes the carve-out.

A4. **Finding F2: the lockfile assertion cannot fail.** The test named "no workspace or root manifest declares a native PTY dependency and the lockfile carries no resolved native PTY entry" scans `bun.lock` with a flag that is set only by a line containing `"@madventures/broker@workspace"`. `bun.lock` has no such line. The broker's package entry reads `@madventures/broker@workspace:packages/broker`, with no closing quote after `workspace`, and its dependencies sit in the workspace block that opens with `"packages/broker": {`. The flag is never set, so the broker lockfile check never fires. The drafter checked this by mutation. With `"node-pty": "^1.1.0"` added to the `packages/broker` block of `bun.lock` in a disposable checkout, the test still passed (1 pass, 0 fail). The checkout was restored. An advisory review on PR #93 reported the same flaw at head `cb04434feafcb045002134b3ee538c7689b9607f`, and the code on `main` still has it. The separate `packages/broker/package.json` assertion in the same test does work, so the manifest is protected and the lockfile edge is not.

A5. **Reviews on record that the drafter could read.** PR #93: an advisory review PASS-WITH-ADVISORIES and a Copilot review with two medium findings. PR #94: a Copilot review with three findings and an approval at head `b38f0c2b73cab252e320f6d02dc3c7d3c7260066`. The drafter did not read how each thread ended. The drafter found no independent non-authoring review of Task 33 or Task 34 under the Part E standard used for M10. The FounderOS record is not readable to the drafter.

A6. **Order.** PR #93 (Task 34) merged on 2026-09-22 and PR #94 (Task 33) on 2026-09-23. Plan Task 34 lists "Task 33 committed" as a precondition. The filing session confirms how the two branches related before this act is filed.

## Part B: Founder rulings

B1. **Task 34 acceptance.** Task 34 is accepted as merged, subject to the single correction in C1. The M14 review checkpoint does not close until Part D is met.

B2. **The tui-chaos carve-out.** `PLAN-OPEN-4` is read as follows. Its premise, that `node-pty` is imported nowhere, was true when it was approved and is no longer true. Its aim, that `node-pty` is not an implementation choice for the production runtime (section 9.7), stands. `node-pty` is permitted in `packages/tui-chaos`, a private acceptance harness, and in the root `trustedDependencies` entry that supports it, and nowhere else. The resolved `node-pty@1.1.0` and `node-addon-api@7.1.1` entries in `bun.lock` stay while `packages/tui-chaos` needs them. This ruling does not amend `PLAN-OPEN-4` or the plan text. It applies to this carve-out only and is not precedent for any other dependency.

B3. **F2 is a defect in the deliverable.** The Task 34 invariant is that the proof detects a violation and does not only report clean. A lockfile check that cannot fail does not meet it. The correction in C1 is required. It is a Task 34 correction, and rubric milestone 9 is not changed by this act.

B4. **Everything else in the tests stands.** F1 and F2 are the only findings this act rules on. The Copilot and advisory findings the drafter did not read are not ruled here.

## Part C: Authorized scope

C1. One correction pull request, from a new branch cut at `origin/main`, with one commit changing exactly one path: `test/phase3a/architecture-phase3a.test.ts`. The commit must do all of the following.

- Replace the lockfile scan so that it reads the `workspaces` section of `bun.lock` and fails closed if the `packages/broker` workspace block cannot be found.
- Fail if any workspace block other than `packages/tui-chaos` lists `node-pty` or `node-addon-api`. This makes the carve-out of B2 an enforced rule and not only a skipped directory.
- Rename the test so its title states what it covers.
- Prove RED before GREEN: a temporary mutation that plants `node-pty` in the `packages/broker` workspace block must turn the test red, and the real `bun.lock` must pass. The mutation is local and is never committed.
- Change no other path, including `bun.lock`, `package.json`, any package manifest and `README.md`.

C2. The correction pull request is opened as a draft. Marking it ready and merging it each need a separate Founder act naming the exact head.

## Part D: What closes the M14 review

D1. After C1 merges, a non-authoring review of the exact merged head covers Task 33, Task 34 and the correction. It records a verdict of PASS, FAIL or INCONCLUSIVE with the head SHA. A substantive finding is a correction round and is counted. The reviewer id and the evidence rules are set in the act that requests the review, and not in this one.

D2. The M14 review checkpoint closes only by a Founder act that accepts that verdict. Until then Task 35 and everything after it in M15 stay unauthorized.

## Part E: Not authorized

- Task 35, M15 and every later task.
- Any change to `bun.lock`, `package.json`, `README.md`, a package manifest, `PLAN-OPEN-4`, `PLAN-OPEN-6` or the plan.
- Marking the correction pull request ready, merging it, or posting any Founder authorization from a session.
- Treating B2 as precedent for any other dependency or package.

## Part F: Verification

F1. The filing session for this act confirms, before it commits: `origin/main` is the SHA in the header or a docs-only descendant of it; the two merge commits above are on `main`; this act's text is the signed text with Status ISSUED, the signature in Part G and no bracketed placeholder; and the identifier `DEC-20261002-01` is free in this repository and in FounderOS.

F2. The filing pull request is a draft and changes exactly two paths: this act, filed as `docs/decisions/DEC-20261002-01-m14-task34-acceptance.md`, and `docs/verification/phase-3a-correction-rounds.md` with one new section after the last, headed `## M14 review preparation (Task 34 correction)`. The section records the date, this act as authority, findings F1 and F2 with the mutation result, and that no round is added by this act.

## Part G: Signature

Signed:

— Michael Daley

Date: 2026-10-02

Actor-Id: founder
