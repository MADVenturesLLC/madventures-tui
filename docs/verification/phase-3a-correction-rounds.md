# Phase 3A — Correction-Round Record

**Task:** 60 (Stage 0, the only task outside M1–M26)
**Rubric §7.2 milestone:** 1
**Authority:** plan §11.3 (`docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` at
`1b46856a646266d3c7eb9882cc74f0c5f9f4cfb5`), applied verbatim.
**Implementation base:** `70c6a2359feb88cc4e3cc21301e18221313f6f8e`

This file is the running correction-round log required by plan §11.3. It is written when a verdict
occurs and is never reconstructed at qualification time. It records every review verdict under both its
plan milestone (Task 60) and rubric milestone (1); the reassignment trigger evaluates the
rubric-milestone total.

## Round 1

- **Verdict target:** `dd92efadf8256169470109d378ac1c016505e2a7`
- **Reviewer:** Antigravity Tier-2 (per plan §11.3, countable verdicts come from either Plato/Codex
  pre-commit review or Gemini Antigravity Tier-2 review)
- **Findings:** incomplete raw help evidence and inaccurate universal P2 claim
  - §5.2 help outputs partially reproduced as "byte-identical" markers rather than in full;
  - §5.3 model list truncated;
  - the universal claim "no event or field carries a model or provider identifier" was false as written
    — `stream-json`'s `init` carries `model` when `--model` is supplied explicitly;
  - exit statuses captured under a defective `zsh` harness (`${PIPESTATUS[0]}` expands empty in zsh)
    were blank and therefore unverified.
- **Resolution:** correction round 1 implemented by Claude Opus 5 (provisional implementer), committed
  as `cd703916be04ddc56f6cab95368b92b7a4fb6b66` (docs only).

## Round 2

- **Verdict target:** `cd703916be04ddc56f6cab95368b92b7a4fb6b66`
- **Reviewer:** Antigravity Tier-2 (per plan §11.3)
- **Findings:** remaining output elisions, unverified config-probe exit status, and overclaimed
  request-echo semantics
  - §5.2 of `cd70391` still elided `agy help`, `agy agents --help`, `agy help agent`, `agy help models`
    as "byte-identical… not reproduced", and §5.3 truncated the model catalog — every command's output
    must be reproduced in full, including repeated identical outputs;
  - `agy config get model`'s exit status was recorded as "non-zero" by inference from its error text
    without observation — the observed status is **0**;
  - §7 of `cd70391` claimed as proven that `init.model` "is an echo of requested intent, not resolved
    fact" — the evidence supports only conditional presence consistent with an echo, not proof of echo
    semantics, and no documented contract establishes `init.model` as exact-model actual-use
    attestation.
- **Resolution:** correction round 2 implemented by Hermes (local model `deepseek-v4-flash`), per
  Founder reassignment of the correction author (see below), committed as a docs-only commit on
  `evidence/phase-3a-antigravity-preliminary` (exact SHA verifiable in repository history).

## Current count

- **Round 1:** 1 (rubric milestone 1)
- **Round 2:** 2 (rubric milestone 1)
- **Total:** **2** of 2 (the §7.3 two-round budget for rubric milestone 1)

## Accounting notes (per plan §11.3)

- **Plan-authoring reviews do not count.** Reviews of the implementation-plan document
  (`1b46856…`/`70c6a23…`) before implementation authorization are plan-authoring history, not
  implementation correction rounds. The rubric-milestone counter began at zero with the first verdict
  on implemented milestone work (`dd92efa…`).
- **Implementing the existing round-2 verdict does not create round 3.** Round 2 was one review verdict
  for milestone 1 identifying substantive defects; all substantive findings in that verdict count as one
  round. The round-2 implementation (this revision) is not itself a countable verdict.
- **Task 1 and every other task remain unauthorized and unstarted.** This record covers Task 60 only.
  Nothing here authorizes any other Phase 3A task.
- **Founder reassigned the correction author from Opus 5 to Hermes before the automatic "more than two
  rounds" trigger.** Per plan §11.3, reassignment is *required* at more than two correction rounds on
  one milestone; here the Founder reassigned the correction author before that trigger, and sound
  artifacts remain preserved: the prior evidence document (`cd70391`) and this record remain intact in
  the repository's history. Per plan §11.4, the same builder rubric applies to any Founder-authorized
  successor builder from the moment of reassignment; sound code is preserved if reassignment occurs.

## Verification

No timestamps, reviewer identities, or verdict links are invented in this record beyond the commit SHAs
and reviewer role recorded above, which are verifiable in the repository history and the review
trail.

---

# Phase 3A Task 5 — Correction-Round Record

**Task:** 5
**Plan milestone:** M2
**Rubric §7.2 milestone:** 3
**Authority:** Founder Task 5 correction-round-1 authorization for the signed-envelope hash contract.
This section is appended after the Task 60 record. The earlier Task 5 scope reconciliation remains an
authority-boundary ruling under plan §10 item 17 and does not count as a correction round.

## Round 1

- **Verdict target:** `43300d438daf845821c7336a5a4e27cf12d45471`
- **Reviewer:** Plato/Codex pre-merge verification
- **Finding:** normalization mutated a successfully verified signed envelope, leaving returned contents
  inconsistent with `envelope_hash`
- **Resolution:** fail-closed rejection of noncanonical wire domains plus the two named regression
  tests, implemented in the same follow-up commit as this record; exact SHA is verifiable from history
- **Current Task 5 count:** 1 of 2
- **Task 6 remains unauthorized.**

## Round 2

- **Verdict target:** `41d213b65b249ae9773f5efc5c8a6bdb66896f4c`
- **Reviewer:** Plato/Codex pre-merge verification of CodeRabbit's corrected-SHA feedback
- **Findings in the single verdict:**
  - canonical hash regression test did not directly compare returned hash to the pre-parse signed hash;
  - the `rejects unknown surface` name misclassified malformed syntax, while CodeRabbit's proposed valid-unknown rejection would improperly introduce Task 6 eligibility into Task 5
- **Resolution:** preserve both pre-parse-hash and recomputation assertions; rename the malformed-syntax test; add the syntactically valid unregistered-surface schema-layer test
- **Resolution implemented in the same follow-up commit; exact SHA is verifiable from history**
- **Current Task 5 count:** 2 of 2
- **No reassignment trigger yet; plan requires reassignment only at more than two rounds**
- **Task 6 remains unauthorized.**

# Phase 3A M19 Task 42 — Bounded Scope Clarification Record

**Date:** 2026-08-28
**Founder ruling:** Michael Daley (Founder implementation authorization for M19 Tasks 42–44, bound to M19 section SHA-256 `411500a3fad1b8107c52f7c8591381d7d825ee9379194c7edc14484d7d39f61b`; pre-implementation Tier-2 verdict `PASS-WITH-ADVISORIES`, artifact SHA-256 `1b22f3fb1a4927b2d9a1ba65f6b305ca2451dba5e713254f260d6cc070deba5a`; approved implementation base `7001409894c3757b2c77b307c2758ca15b3a064d`).
**Implementation branch:** `build/m19-tasks42-44-r1` @ `7001409894c3757b2c77b307c2758ca15b3a064d`

## Conflict recorded

Task 42's plan file list (plan §5, lines 2070–2077) omits `packages/pty-host/test/main-guard.test.ts`, but Task 42 Step 3 wires `verifyAndLaunch` hash verification into `packages/pty-host/src/main.ts` (in the list), and Step 5 requires `bun test packages/pty-host packages/broker` green. The M18 `main-guard.test.ts` launches real children (`/bin/cat`, `/bin/sh`) with fake `sha256` values (`"a".repeat(64)` … `"f".repeat(64)`, `"0".repeat(64)` at lines 260, 315, 353, 365, 394, 428, 787). With verification live, those fixtures fail with `ArtifactHashMismatch` before `ready`, breaking the lifecycle tests. Plan rule 24 forbids skipping or disabling required tests.

## Founder ruling (verbatim direction)

> Stop Task 42 before modifying the tests. The plan's Task 42 production integration and full-suite-green requirement conflict with the omission of main-guard.test.ts from the file list. Treat this as a bounded scope clarification: add packages/pty-host/test/main-guard.test.ts to Task 42's test scope. Keep verifyAndLaunch wired into main.ts; do not defer integration. Update successful launch fixtures to use a real executable and computed matching SHA-256. Preserve negative mismatch tests and assert fail-closed behavior with no child created. Do not skip tests or weaken production hash verification. Record the clarification before editing, then rerun Task 42 RED→GREEN, the full pty-host suite, broker suite, and typecheck. Stop at the Task 42 checkpoint.

## Scope effect

- **Added to Task 42 test scope:** `packages/pty-host/test/main-guard.test.ts` (modify — real executable + computed SHA-256 for successful-launch fixtures; negative mismatch tests preserved).
- **Unchanged:** Task 42 production files (`launch.ts`, `main.ts`, `pty-host-supervisor.ts`, broker `index.ts`), new test files (`launch.test.ts`, `pty-host-supervisor.test.ts`), Task 43/44 scope, adapter `launch()` deferral to M20, and all non-authorizations in the Founder's M19 authorization.
- **No test is skipped, disabled, or weakened.** Production hash verification is not weakened.

## 2026-08-28 — M19 Task 42, independent review round 1 (REQUEST CHANGES → remediation)

**Review verdict:** REQUEST CHANGES on PR #35 head `eb7a02d96be5dfd8239d776285eb33a914242386`. Two blocking findings, one major.

**Accepted findings (validated against spec):**
1. BLOCKING — lifeline descriptor contract not implemented: `spawnPtyHost` used ordinary `stdin: "pipe"` with no explicit close-on-exec write-end ownership marking, no duplicate-descriptor closure, and no EOF-as-death observability proof. §3.2 (sole write-end ownership, close-on-exec) and §3.3 step 2–3 require the descriptor-level lifeline.
2. BLOCKING — `test("the child is created after the lifeline is established")` was synthetic: the ordering signal was inserted by the test itself, not observed from a real supervisor→host→child pipe. Tautology confirmed.
3. MAJOR — `env: { ...process.env }` violates §3.2/§5.4 host passes only the allowlisted environment; ambient inheritance is prohibited.

**Remediation probes (both via real process experiments):**
- Parent-death test (layered harness): child with plain stdin pipe observed `STDIN-EOF at 780 ms` after supervisor SIGKILL — stdin-pipe-as-lifeline EOF detection works at the descriptor level.
- Bun `ipc` channel also detects parent death but is NOT the spec mechanism; not used.
- Extra-fd `stdio` arrays in `Bun.spawn` proved unreliable (`EBADF` via posix_spawn); lifeline stays on stdin as §3.2 mandates.

**Remediation scope (same Task 42, new commit on the same branch):**
- `spawnPtyHost` implements the §3.2 descriptor contract explicitly: the supervisor holds the sole write end of the host's inherited stdin pipe (a `FileSink` owned only by the supervisor), never leaks that fd to any other process (close-on-exec hygiene by construction — no duplicate references exist), closes unintended duplicates, and passes ONLY `descriptor.env` as the host's environment (§3.2/§5.4 allowlisted environment; no ambient inheritance).
- Ordering test rewritten to observe the REAL pipeline: supervisor spawns host; host script records `lifeline_checked` after its first stdin readiness observation and before child spawn; test asserts `lifeline_established` < `hash` < `exec` from real stream events.

## 2026-08-28 — M19 Task 42, Founder approval at exact head (advisory accepted)

**Founder disposition:** Task 42 APPROVED at exact head `6dc79e6d9d872e4f52fa28b81794b924c09fcbd2`, subject to the recorded Tier-2 verdict (`PASS-WITH-ADVISORIES`, artifact `tier2-m19-t42-remediation-6dc79e6.txt`, SHA-256 `9cc67b95d2c2d6d1cbe76f93a82eb96f03e02a341ac7ad60457426035edcf901`) and the advisory disposition below.

**Advisory disposition (Founder-ruled):** the round-2 advisory (redundant `stdinSink.flush()` after `stdinSink.end()` in `closeStdin`, `packages/broker/src/pty-host-supervisor.ts`) is ACCEPTED for Task 42. Recorded as theoretical redundancy under `FileSink` semantics; no failure was observed. No new head was created; the reviewed commit is unmodified. The advisory is not re-proposed for Task 42.

**Explicit non-authorizations (Founder, verbatim scope):** this approval does not authorize Task 43, Task 44, PR merge, or any Phase 4 work.

**Task 42 gate state:** implementation approved; PR #35 remains draft and unmerged; per-task Step 8 checkpoint for Task 43 awaits separate Founder authorization.

## 2026-08-28 — M19 Tasks 42+43 combined Tier-2 review and Founder advisory disposition

**Review verdict:** PASS-WITH-ADVISORIES at head `f157d1369b612bff0ae9721a54d7f817cbd64c1b` (gemini-3.1-pro-high, combined Task 42+43 review; artifact `tier2-m19-t42-t43-f157d136.txt`, SHA-256 `5bf91b7b2541aafb0349fc7641c86174a19508b68452f1ea7de553711d526052`). No blocking or major findings; no required Founder decision points.

**Founder disposition (2026-08-28):**
1. Advisory 1 (main.ts injected-seam SIGKILL ESRCH race) — FIX in one narrowly scoped follow-up commit, preserving fail-closed semantics and existing tests. Implemented: ESRCH swallowed (group already gone = desired terminal state), all other errno codes propagate.
2. Advisory 2 (unused `emit` parameter in `onLifelineEof` signature) — ACCEPTED without change. The parameter is retained for interface symmetry with `terminateChildGroup`; recorded here as the disposition of record.

**Correction round 2 (same date):** the first remediation commit `df19365` inverted the filter (positive-match throw swallowed code-less errors). Fresh Tier-2 review returned FAIL with one Major (artifact `tier2-m19-advisory-df19365-FAIL.txt`, SHA-256 `bf400cef666bc965baf408ff79031382d05da758c09b948d5fd13d0aef529074`). Founder correction authorization 2026-08-28: explicit allow-list implemented (swallow ONLY code === "ESRCH"; re-throw EPERM, code-less Errors, null, primitives, other codes). New regression test added: a code-less generic SIGKILL failure must propagate (runSteadyState rejects with the exact error) and containment stays fail-closed (no drained/exited facts). Prior FAIL verdict carried no weight; the new head requires fresh Tier-2 review.

## 2026-08-29 — M19 Tasks 42+43 CodeRabbit round: 13-comment triage and remediation

**CodeRabbit verdict on the Task 42+43 surface:** CHANGES_REQUESTED — 13 actionable comments (1 Critical, 4 Major, 8 Minor) + 6 nitpicks, at PR #35 head `ed85c184` (later docs-only commit `0bf77142` — verified docs-only child, source surface byte-identical — rebind approved by Founder).

**Founder dispositions (2026-08-29):**
- CR-1 (launch.ts TOCTOU between hashFile and Bun.spawn, Critical): ACCEPTED as the documented §2.2 residual — "a binary that truthfully attests one identity during the probe and lies during the governed session remains a documented residual; the system does not claim to solve malicious-provider misrepresentation." No code change; the plan's adjacent-to-exec re-hash is the ratified mitigation. Descriptor-bound execution would need a PLAN-OPEN amendment.
- CR-7 (env-allowlist test asserts a tautology, Minor): DEFERRED to Task 44 with explicit scope record — direct host-environment observation stays with the Task 44 fixture harness per the earlier Founder scoping; the tautological assertion and its scope note remain as-is in this round.
- OPEN-1 (drain correctness vs §9.8 grace SIGKILL, deterministic Verify (macOS) CI failure): FIX the fixture while preserving all 50-line and drained/exited assertions. Root cause verified empirically: one `sleep 0.01` process spawn per tail line takes ~60 ms on CI, so the 50-line tail raced the 2 s SIGKILL and lines 31-49 died in the PTY buffer. Fixture now spaces lines with in-shell sleeps (no process spawn per line), completing well inside the grace; every line, the final marker, and all drain-predicate assertions are unchanged.

**Remediated in this round (Founding-authorized bounded scope):**
- CR-2: supervisor send/closeStdin EPIPE guard (host-death terminal state; non-EPIPE propagates).
- CR-3: single stdout pump at spawn time; facts() returns subscriber views of one shared queue; reportedPgid recorded pump-side (killPgid no longer stream-consumption-dependent; repeated facts() calls safe).
- CR-3a: EOF-path child-exit wait bounded by the §9.8 outer bound; expiry fails closed (diagnostic, non-zero, no success facts).
- CR-3b: EOF-path ptySettled flag fixed — the prior Promise.race against Promise.resolve() always settled immediately, dead-coding the await_pty join; now a settlement flag on the live ptyClosed promise selects the ptyPath.
- CR-5: supervisor lifeline test updated to the Task 43 EOF contract (stream ends after child termination; no termination_started on EOF).
- CR-6: test cleanup uses the supervisor's killPgid containment primitive (no orphaned child groups).
- CR-8: grace_waited measured from the SIGTERM (grace actually consumed), not function entry.
- CR-9: realKillCalls counter replaced by a kill recorder asserting every real kill targets a NEGATIVE pid; vacuous >= 0 bound removed.
- CR-10: SIGKILL rung asserted directly (signal === "SIGKILL", code null) instead of the permissive disjunction.
- CR-11: grandchild test waits for the GC_READY marker before terminate (no vacuous pass on a missing grandchild).
- CR-4 (test strictness informational note): no code change required, per Founder.

## 2026-08-29 — M19 Task 42+43 Tier-2 FAIL round: three blocking findings corrected

**Review verdict:** FAIL at `4d2d14b` (artifact `tier2-m19-remediation-4d2d14b-FAIL.txt`, SHA-256 `703dc1c14ec11bea8297f2039a185146ebfcdadac78aedf22d7e16516239ce54`) — three Blocking findings in the CodeRabbit-remediation batch's new code. Founder correction authorization 2026-08-29 (correcting commit on top, allowed files: supervisor/src+test, pty-host main/src+test, correction log).

**Findings → fixes:**
1. BLOCKING (supervisor pump): late facts() subscribers hung in the 5-minute safety net — queue.closed never set post-settlement — AND no history replay, so late subscribers missed `launched` (killPgid blind). Fix: a bounded global history (cap 256) records every fact at the pump; facts() takes a subscribe-time atomic snapshot (settled + error + history) — post-settlement subscribers replay history and terminate immediately; pre-settlement subscribers attach to the live queue. `launched` remains available to killPgid regardless of consumption.
2. BLOCKING (main.ts EOF race): the deadline race's losing IIFE threw into a settled promise 5 s after clean containment — an unhandled rejection that could crash the host. Fix: a settlement-aware deadline — shared settled flag, clearTimeout on any settle path, the timer's throw is a no-op after settlement, and child.exited rejection paths are race-guarded identically.
3. New regression tests prove each finding: (a) late subscriber replays history and receives `launched`; (b) post-settlement subscriber terminates immediately (no 5-min hang); (c) killPgid works with facts() never consumed (launched history feeds it); (d) the EOF deadline timer fires no unhandled rejection after clean containment (verified across the full 5 s window).

**Verification at the corrected head:** new regression tests pass; signals 5/5; packages/pty-host+broker 132 pass / 0 fail (two consecutive runs); tsc exit 0. Prior FAIL carried no weight.

## 2026-08-29 — M19 Task 42+43 Tier-2 FAIL round 6: subscription race corrected

**Review verdict:** FAIL at `9bcf015` (artifact `tier2-m19-correction-9bcf015-FAIL.txt`, SHA-256 `c7e4b3de3dd0d241aff6384e101f4baeae66026223c5770453313cdb0cd2b80c`) — 1 Blocking + 2 Major in the pump subscription strategy. The EOF-timer fix (round-4 finding 3) was VERIFIED remediated; four regression tests confirmed genuine.

**Founder correction authorization 2026-08-29:** synchronous subscription attach + no-loss replay + settlement broadcast + launched pin; three new regression tests required.

**Findings → fixes (all in supervisor.ts):**
1. BLOCKING race-to-hang + 2. MAJOR async-gap data loss: the subscribe-to-subscribers attachment now happens SYNCHRONOUSLY at generator start, BEFORE yielding the backlog — facts the pump enqueues during backlog replay are queued into the live subscriber (no loss), and pump settlement reaches the queue via the normal finally broadcast (no hang). Backlog replay skips facts already fanned into the live queue (dedupe via attach-time snapshot of queue.items).
3. MAJOR launched eviction: the first launched fact is PINNED against history-cap trimming — when the cap triggers, the trim start never passes the pinned launched index, so late replay always includes it (bounded memory preserved; cap still 256 with half-trim).

**New regression tests (3):** settlement during backlog replay reaches the subscriber without hanging (real pipe, closeStdin raced against replay); facts enqueued during replay are not lost (10 resize acks asserted while replay yields); launched survives history pressure and is replayed to late subscribers with the real pgid (noisy child forcing the cap).

**Also corrected during this round (test fixture only):** the settlement-during-replay test originally used /bin/cat — its EOF path ends via the PTY-unsettled 3 s fail-closed join (verified: 'PTY did not close within 3000ms'), a separate concern from the subscription race; fixture switched to /bin/sh + foreground sleep whose PTY settles promptly, isolating the subscription-race assertion. The /bin/cat 3 s join remains an observable behavior for the wedged/EOF surfaces Task 44 covers.

**Verification at the corrected head:** 3 new regressions pass; supervisor suite 9/9; pty-host+broker full suites green (132+ tests); tsc exit 0. Prior FAIL carried no weight; new head requires fresh Tier-2 review.

## 2026-08-29 — M19 Task 42+43 Tier-2 review round 7: EOF-path PTY settlement race corrected

**Review status at `2345e70`:** Tier-2 review not yet dispatched for the round-6 head. Independent re-verification at `2345e70` uncovered a pre-existing production EOF-path defect in the cross-test/full-suite runs the round-6 commit message claimed as "135 pass / 0 fail". The Builder's verification report was inaccurate: eof-timer.test.ts and signals.test.ts "lifeline EOF terminates the child process group without a terminate command" intermittently fail under full-suite runs. The handoff (HANDOFF-m19-t42-43-state-20260829.md) flagged this as the ONE OPEN ISSUE for diagnosis before Task 43 is declared verified.

**Empirical failure baseline (independent re-verification at `2345e70`, eof-timer.test.ts alone, fixture `/bin/sh -c "echo EOF_TIMER_READY; sleep 300"`):**
- 10 isolated runs of `bun test packages/pty-host/test/eof-timer.test.ts`: 9 pass (5667 ms) / 1 fail (15635 ms) — ~10% failure rate.
- Diagnostic trace of the failure (host stderr): `pty-host: pty closure failure: PTY did not close within 3000ms`; final fact kinds = `launched,ready` only (no `drained`/`exited`); host.exitCode = 1.
- 3 consecutive runs of `bun test packages/pty-host packages/broker` (the handoff's "full suite"): 135 pass / 0 fail in 3 runs but with intermittent noise (one in-suite drain-correctness flake is pre-existing and unaffected by this fix; eof-timer itself flipped on the order of `bun test eof-timer.test.ts signals.test.ts` vs `bun test signals.test.ts eof-timer.test.ts` — eof-timer first ⇒ both fail; signals first ⇒ both pass, deterministically reproducible).

**Root cause (microtask-ordering race):** The EOF-path close call (`packages/pty-host/src/main.ts:682` pre-fix) passed `signal: false`, relying on natural PTY settlement via `session.ptyClosed`. The host's `ptySettledNow` flag (lines 673-682) is updated by `session.ptyClosed.then(...)` — a microtask. The flag check uses `await new Promise((res) => setTimeout(res, 0))` (one macrotask) to give the `ptyClosed.then` callback a chance to fire before the close() call. The failure mode: `ptyClosed` settles strictly AFTER `child.exited` because `Bun.Terminal`'s `exit` callback is observed strictly after every `data` callback the PTY will ever deliver (`packages/pty-host/src/terminal.ts:38-44`). When the race goes the other way, the host takes the `ptyPath === "await_pty"` branch (lines 419-462) where `signal: false` means lines 436-442 do NOT execute the explicit `session.terminal.close()`. The host waits 3 s for `ptyClosed` to settle naturally, hits `PtyClosureTimeoutError`, fails closed with stderr `pty-host: pty closure failure: PTY did not close within 3000ms`, and returns WITHOUT emitting `drained`/`exited`. That is the production EOF-path defect the handoff suspected.

**Fix (one-line semantic change, `packages/pty-host/src/main.ts:682`):**
- Before: `await close({ announce: false, signal: false, ptyPath: ptySettledNow ? "pty_already_settled_success" : "await_pty" })`
- After: `await close({ announce: false, signal: true, ptyPath: ptySettledNow ? "pty_already_settled_success" : "await_pty" })`

**Why this is correct and minimal:**
1. The child was already signaled by `onLifelineEof(session.pgid, emit)` at line 606, so re-entering `terminateChildGroup` is safe — the seam's `kill(-pgid, "SIGTERM")` against the dead group throws `ESRCH`, which the explicit allow-list (the df19365/ed85c18 corrected seam at lines 367-378) swallows. Everything else still propagates (fail-closed semantics preserved; no blanket catches introduced).
2. `emitStarted: opts.announce` (line 350) is `false` here, so no `termination_started` is emitted. Containment stays silent on EOF — the rule that `termination_started` publishes ONLY on the explicit terminate-command path is preserved.
3. No `ack` is emitted because `opts.announce === false`. The rule that no termination acknowledgment fires on containment paths is preserved.
4. The critical effect: `opts.signal === true` enters the `if (opts.signal)` branch at lines 436-442 and explicitly calls `session.terminal.close()`, which deterministically forces master-side PTY settlement, resolving `ptyClosed` immediately. The 3 s `awaitPtyClosure` race becomes a no-op because the PTY has already settled (or settles within one macrotask after `terminal.close()`).
5. Scope: only the EOF path is touched. The natural-child-exit path (line 574 `close({ signal: false })`) is unchanged — it correctly relies on natural settlement for unforced exits, preserving the data-integrity guarantee that the host never discards last output through a force-close.
6. §9.8 deadlines (250/500/2000/5000) unchanged; monotonic clock only; negative-PGID signaling preserved across all containment rungs.
7. **No test assertions weakened, skipped, filtered, or edited.** Existing eof-timer test (and all 44 pty-host tests, 8 broker tests, 3 supervisor tests) pass unchanged.

**Empirical baseline at the corrected head:**
- `bun test packages/pty-host/test/eof-timer.test.ts` alone, 10 consecutive runs: 10 pass (5645-5668 ms each, deterministic; no flakes observed).
- `bun test packages/pty-host/test/eof-timer.test.ts packages/pty-host/test/signals.test.ts`, 3 consecutive runs: 6 pass / 0 fail every run (eof-timer first, signals second — the previously-failing order).
- `bun test packages/pty-host`, 3 consecutive runs: 44 pass / 0 fail every run.
- `bun test packages/pty-host packages/broker`, 3 consecutive runs: **135 pass / 0 fail every run** (the handoff's full-suite invariant is now satisfied across 3 consecutive runs).
- Diagnostic trace at the corrected head: `[pty-host-diag: EOF-path close ptySettledNow=true]` consistently; final fact kinds = `launched,ready,output,drained,exited`; host.exitCode = 0.

**Authorization:** Founder correction authorization 2026-08-29 (verbal, in-chat) authorized a single round-7 commit on top of exact parent `2345e703c6bc9968b8fb2f54018956ee91c8fcf6`, allowed files: `packages/pty-host/src/main.ts` and `docs/verification/phase-3a-correction-rounds.md`. Production correction: change EOF-path close `signal: false` to `signal: true`; preserve `announce: false`; preserve silent EOF containment; preserve the explicit ESRCH allow-list; do not alter §9.8 deadlines or natural-child-exit behavior. Correction record must document the 10% failure baseline, the microtask-ordering race, the `ptySettledNow`/`await_pty` interaction, the one-line fix, and the three consecutive 135/135 full-suite runs.

**Required next steps:** fresh Tier-2 review at the new head (round-7 commit) BEFORE any push. Round-6's Tier-2 review has NOT been dispatched; the round-7 head will require fresh review covering the EOF-path change with the same brief convention (exact head/tree/parent + M19 section SHA `411500a3fad1b8107c52f7c8591381d7d825ee9379194c7edc14484d7d39f61b` + full diff; prior verdicts never carry). Push, PR #35 thread resolution, CodeRabbit re-review, and merge authorization at exact SHA all require separate explicit Founder authorization. Task 44 remains unauthorized.

## 2026-08-29 — M19 Task 43 round 8: CodeRabbit findings remediation + T12 bounded fail-closed proof

**Scope (Founder authorization 2026-08-29, in-chat):** fold all round-8 CodeRabbit/Tier-2 observations into one revision on top of parent `97c98f2983a33cff925d5750b7142a5675b4cf31`. Allowed files: `packages/broker/src/pty-host-supervisor.ts`, `packages/broker/test/pty-host-supervisor.test.ts`, `packages/pty-host/src/main.ts`, `packages/pty-host/test/eof-timer.test.ts`, `packages/pty-host/test/main-guard.test.ts`, `docs/verification/2026-08-28-wf17-ground-truth-security-controls.md`, this correction log. Commit/push/PR edits/Task 44 explicitly out of scope until post-Tier-2.

**Findings → fixes:**
1. **CR-7 (supervisor history growth without bound):** the `launched` pin lived INSIDE `history`; a trim that would evict it reset `start` to the pinned index, so `history.slice(0)` kept everything — unbounded growth on every session. Fix: the pinned fact moves to a separate `pinnedLaunchedFact` variable that is never trimmed; `history` now trims unconditionally at the cap; late-subscriber backlog construction prepends the pinned fact when it is no longer inside the tail. New regression `history is bounded by the cap regardless of how many facts the pump emits` drives 1024 resize-ack facts and asserts the late replay is the bounded tail (≤400 observed), with `launched` still present.
2. **T12 (EOF fail-closed timeout could still await an unbounded reaper):** `makeSessionCloser` gained an `awaitChildExit?: boolean` option (default `true` — all existing paths unchanged); the EOF §9.8 timeout call site passes `awaitChildExit: false`, so the fail-closed join completes from already-known child lifecycle fields + PTY settlement + frameReader close without re-awaiting `session.child.exited`.
3. **T12 semantic verification (Founder directive 2026-08-29: bounded FAIL-CLOSED containment, not bounded completion):** proven with a real-process fixture in `eof-timer.test.ts`. A real `spawnGoverned` child (`sh` ignoring SIGTERM) in a real detached process group runs the real §3.4 ladder (SIGTERM → 2 s grace → real SIGKILL at ~2 s); ONLY the reaper observation is stalled (a Proxy over the real child whose `exited` never settles) — empirically the deepest reachable harness, since SIGKILL is untrappable and the detached direct child is always in the signaled group, so no real child can survive the ladder past the 5 s bound. Asserted: (1) `runSteadyState` returns with elapsed ≥ 4.5 s and < 7 s (the real deadline elapsed — no short-circuit); (2) no `drained`/`exited` lifecycle frames on the fact channel (decoded through the real wire codec; `output` frames may legitimately arrive); (3) stderr carries `lifeline-EOF containment incomplete` / `failing closed` and `process.exitCode === 1`; (4) the REAL governed group is gone — signal-0 `kill(-pgid, 0)` probe reaches ESRCH within 2 s (no `ps -p`, no patched cleanup kills). A control test observes the pre-T12 failure mode directly: with default `awaitChildExit: true` the closer stays pending on a stalled reaper past 400 ms and never reaches its join phase; with `false` the same seam completes immediately.
4. **CR-10/CR-13/T10 (test cleanup hardening, broker suite):** all eight `process.kill(handle.hostPid, "SIGKILL")` cleanup sites in `pty-host-supervisor.test.ts` are guarded — a host that already exited naturally throws ESRCH from a bare kill and would replace the real test result. `eof-timer.test.ts` cleanup hardened: host declared outside `try`, bounded `finally` (close stdin, 2 s settlement wait, SIGKILL host, negative-pgid SIGKILL group). `main-guard.test.ts` drain-correctness fixture timings reduced (per-line sleep 0.015→0.003, foreground sleep 1→0.3): ~330 ms per run against a multi-second grace budget (10/10 previously flaking at 2–2.5 s → 10/10 green).
5. **T11 (test-honesty in `a facts() subscriber created after pump settlement terminates immediately`):** the blanket `catch { lateErrored = err }` is replaced by discrimination — only recognizable pump stream errors (`kill`/`stream`/`EPIPE`/`terminated`/`End of file`) are recorded for the final assertion; the self-thrown hang detectors and any other real failure re-throw so the test fails with its true cause. (Empirically the SIGKILLed pump normally ends cleanly via `done`; the error path is genuine but narrow.)
6. **T5/T6/T7 (WF-17 ground-truth doc):** title date disambiguated (recorded 2026-08-28; Founder check run 2026-08-29T02:15:58Z); command blocks labelled ```sh; the captured-output block (which embeds inner triple fences) is wrapped in 4-backtick outer fences so the embedded record renders intact.

**Verification:** supervisor suite 10/10 (incl. new bounded-tail regression); eof-timer 3/3 (incl. the two new T12 tests); pty-host full suite green ×3; broker full suites green ×3; `main-guard -t "drain correctness"` 10/10 ≈330 ms; project `tsc` exit 0.

**Next steps:** fresh Tier-2 review at the round-8 head BEFORE any push (prior verdicts never carry). Push, PR #35 thread resolution, CodeRabbit re-review, merge authorization at exact SHA, and Task 44 all require separate explicit Founder authorization.

## 2026-08-29 — M19 Task 43 round 9: post-settlement replay defect (Greptile T6) fixed

**Review status at `96f2a1aba574d27d3f3f3e636ffc2afb251057b6`:** round-8 Tier-2 PASS (artifact `tier2-m19-t42-t43-96f2a1a-PASS.txt`, SHA-256 `e541240f5129a2919f532ce454c56d920eb09b643fae67d8aab7dc31b68dc273`), pushed to `build/m19-tasks42-44-r1`, PR #35 readied; fresh CodeRabbit review on the head returned COMMENTED with two Trivial nitpicks (N1 vacuous-pass risk in the bounded-history test; N2 dead `settle` helper). Read-only adjudication of the seven unresolved threads then confirmed a genuine defect raised by Greptile P1 at this head: **T6 — closed queue skips fact replay**.

**Defect (VERIFIED by direct probe before fixing):** in `facts()`, a subscriber created after pump settlement attaches its queue with `closed: true`, and the backlog loop's per-frame `if (queue.closed) break` aborted replay immediately — the late subscriber received an EMPTY stream (observed: 0 frames while history held `launched` + `ready`). This contradicts the round-4/round-6 replay contract stated in the code itself. The existing post-settlement test accepted either outcome (immediate done OR replay) and could not fail on it.

**Fix (Founder round-9 authorization 2026-08-29, T6 only + optional N1/N2):** the per-frame `closed` break is removed — the backlog is a static snapshot captured at synchronous attach, so replaying it cannot race the live stream; `closed` gates only the live-wait phase, preserving every other path byte-for-byte. Post-settlement subscribers now replay the complete captured backlog and then terminate immediately (round-4 finding-1 contract preserved). New regression test `a post-settlement subscriber replays the pinned launched fact before terminating (T6 regression)` asserts first value `launched`, fast termination, no duplicate replay; **genuineness verified by mutation check: with the src fix stashed the test FAILS; restored it passes.** Folded: **N1** — bounded-history test lower bound `count > 0` → `count > 100` (empirically replay lands at ~253, 5/5 stable probes; prevents vacuous pass if the cap is never exercised); **N2** — removed the never-called `settle` helper in the EOF deadline race (all three sites already inline the identical body; behavior unchanged).

**Verification at the round-9 head:** supervisor suite 11/11 (incl. the new T6 regression); combined `bun test packages/pty-host packages/broker` 139 pass / 0 fail × 3 consecutive runs (138 + the new regression); `bun run typecheck` exit 0. Scope: three code files — `packages/broker/src/pty-host-supervisor.ts` (+8/−1), `packages/broker/test/pty-host-supervisor.test.ts` (T6 regression + N1), `packages/pty-host/src/main.ts` (N2, dead-code removal only) — plus this log (four files total). No thread replies/resolutions, no push, no merge, no Task 44 work.

**Next steps:** fresh Tier-2 review at the round-9 head BEFORE any push (prior verdicts never carry). Threads T1/T2/T3/T4/T5/T7 dispositions and replies remain pending Founder direction; push, CodeRabbit re-review, thread resolution, merge authorization at exact SHA each require separate explicit Founder authorization.

## 2026-08-29 — M19 Task 43 round 10: abandoned-subscriber queue retention fixed (T7-CR)

**Review status at `1bd9679344dee239e26bb001187d31554a8182ba`:** round-9 Tier-2 PASS (artifact `tier2-m19-t42-t43-1bd9679-PASS.txt`, SHA-256 `6e5c66d9e7dd230f9649f8cd3fdfb673af150628b5a1609afb5df608373be98b`), pushed; fresh CodeRabbit review on the head (id 5059051610, CHANGES_REQUESTED) posted two actionable comments: a Major (T7-CR) and a doc nit (T6-CR). Read-only adjudication verified T7-CR as a genuine defect: `facts()` never removed its queue from `subscribers`, so a consumer that stopped iterating after `launched` left an unbounded `queue.items` accumulating every later fact — broker memory growth for a long-running host. Founder round-10 authorization 2026-08-29: fix T7-CR, fold the T6-CR wording fix, do not touch launch TOCTOU / Task 44 env scope / unrelated code; stderr pipe recorded as a separate follow-up risk (no drain change in this round).

**Fix:** the `facts()` generator body is wrapped in `try`/`finally`; the finally removes the queue from `subscribers`, marks it closed, settles and clears its waiters (no dangling 5-minute-net waiter). `enqueue()` defensively skips closed queues. A read-only `subscriberCount()` accessor was added to `PtyHostHandle` (test-observability seam; no consumer behavior change). New regression `an abandoned facts() iterator removes its subscriber queue (T7-CR regression)` asserts: 0 → attach on first next() → 1 → `iterator.return()` → 0, and stays 0 after further host output; **genuineness verified by mutation check: with the src fix stashed the test FAILS (queue retained); restored it passes.** T6-CR: round-9 log wording corrected to "three code files … plus this log (four files total)".

**Verification at the round-10 head:** supervisor suite 12/12 (incl. the new T7 regression); combined `bun test packages/pty-host packages/broker` 140 pass / 0 fail × 3 consecutive runs (139 + the new regression); `bun run typecheck` exit 0. Scope: three files — two code files (`packages/broker/src/pty-host-supervisor.ts` (try/finally + closed-skip + subscriberCount), `packages/broker/test/pty-host-supervisor.test.ts` (T7 regression)) plus this log (`docs/verification/phase-3a-correction-rounds.md`, T6-CR wording + this record). No thread replies/resolutions, no push, no merge, no Task 44 work.

**Next steps:** fresh Tier-2 review at the round-10 head BEFORE any push (prior verdicts never carry). Threads T1/T2/T3/T4/T5 dispositions and replies remain pending Founder direction; stderr-pipe backpressure recorded as a separate follow-up risk; push, CodeRabbit re-review, thread resolution, merge authorization at exact SHA each require separate explicit Founder authorization.

## 2026-08-29 — M19 Task 43 round 11: architecture-review blockers B1/B2 + contract cleanup

**Review status at `2f605f9931c0a63d213eff38d48083a35dba6080`:** independent architecture review (two reviewers, both bound to the exact head/tree/parent/M19 section) returned CONDITIONALLY ACCEPT / BLOCKED with two concrete blockers and one contract finding. Founder round-11 authorization 2026-08-29: fix B1 (hang-net), B2 (path absoluteness), remove `subscriberCount()` from the public `PtyHostHandle`; preserve accepted residuals (one-syscall TOCTOU, unread host stderr, Task 44 env/dead-host scope).

**B1 — the 300 s idle net ended a live subscription as clean end-of-stream (fail-open).** The live-wait net timer resolved `true` — the same value as real settlement — so 5 idle minutes on a live silent host returned `{ done: true }` and the finally removed the queue, losing all later facts; "stream end ≡ host death" became false. Fix: the net now wakes the wait with `false` so the loop RE-ENTERS the wait; real settlement is signalled exclusively by the waiter callback. The net period is injectable (`spawnPtyHost(descriptor, { hangNetMs })`, production default 300000 unchanged) so the regression can accelerate the horizon. New regression `a parked subscriber on a live silent host survives the hang-net boundary and receives a later fact (B1 regression)` parks a subscriber in the live-wait on a real silent /bin/cat host, crosses the accelerated 300 ms boundary, then asserts the stream is still live and a later resize-ack arrives; **genuineness verified by mutation: with the net restored to resolve(true) the test FAILS; with the fix it passes.**

**B2 — a bare/relative artifact path could hash one file and execute another.** `readFileSync(frame.path)` resolves cwd-relative while `Bun.spawn([path, ...])` PATH-resolves a slash-less command; nothing enforced absoluteness. Fix: `isAbsolutePath` guard in BOTH codec mirrors (host `frames.ts`, broker `pty-host-protocol.ts`, matching the `isDimension` precedent) rejecting non-absolute launch paths at decode, plus defense-in-depth in `verifyAndLaunch` failing closed BEFORE any hash or spawn. Regressions: launch.test.ts (bare + relative rejected, hash/spawn never called, absolute still works), frames.test.ts (host codec), pty-host-protocol.test.ts (both mirrors agree); **genuineness verified by mutation: with the launch.ts guard removed the test FAILS.**

**Contract cleanup — `subscriberCount()` removed from the public `PtyHostHandle`.** The ratified interface has exactly five members; the round-10 test seam became a sixth public member via the `index.ts` re-export. Replaced with a module-level `subscriberCountForTest(handle)` accessor (WeakMap-registered at construction; not re-exported from `index.ts`); the T7-CR regression now uses it.

**Verification at the round-11 head:** supervisor suite 13/13 (incl. B1 regression); launch 5/5, frames 6/6, protocol 4/4 (incl. B2 regressions); combined `bun test packages/pty-host packages/broker` 144 pass / 0 fail × 3 consecutive runs (140 + 4 new regressions); `bun run typecheck` exit 0. Scope: nine files — 4 src (`pty-host-supervisor.ts`, `pty-host-protocol.ts`, `frames.ts`, `launch.ts`) + 4 test mirrors + this log. No thread replies/resolutions, no push, no merge, no Task 44 work.

**Next steps:** fresh Tier-2 review at the round-11 head BEFORE any push (prior verdicts never carry). Threads T1/T2/T3/T4/T5 dispositions and replies remain pending Founder direction; stderr-pipe backpressure recorded as a separate follow-up risk; push, CodeRabbit re-review, thread resolution, merge authorization at exact SHA each require separate explicit Founder authorization.

## 2026-08-29 — M19 Task 43 round 12: hang-net stale-waiter retention + scope-count wording

**Finding at `b9e76ba35e0086fa202991fe72b026819f978f2e`:** the round-11 B1 fix made the hang-net timer wake with `false` so the live-wait re-enters instead of ending the stream — correct as far as it went, but the timer path resolved and looped **without removing its waiter callback from `queue.waiters`**. Only the settlement path removed anything (via the finally's `waiters.clear()`), so an idle subscriber accumulated one dead callback per net period: unbounded `Set` growth on a long-lived idle session, and every subsequent fan-out walked the accumulated dead set. Founder round-12 authorization 2026-08-29 scoped the round to this finding plus the correction-log scope-count wording.

**Fix (`packages/broker/src/pty-host-supervisor.ts`):** the wait now names its callback and removes it on **both** exits. The timer path deletes the callback from `queue.waiters` before resolving `false`; the settlement path clears the timer and deletes the same callback before resolving `receivedDone`. Exactly one live waiter exists per parked wait, however many net periods elapse. The B1 rule is preserved unchanged: only genuine pump settlement (`receivedDone === true`) can end the stream; the net can only ever cause a re-entry.

**Regression:** `repeated idle hang-net expirations do not accumulate stale waiters (round-12 regression)` drains the backlog, parks in the live-wait against a real silent `/bin/cat` host with the net accelerated to 120 ms, sleeps 700 ms (~5 expirations), and asserts `waiterCountForTest(handle) === 1` — not one per expiry. It then proves the stream is still functional (a resize ack is delivered, `done === false`), and that the delivering waiter also removed itself (`waiterCountForTest === 0` between yields, subscriber still attached). **Genuineness verified by mutation: with the round-11 waiter block restored the test FAILS at the waiter-count assertion; restored to the fix it passes.**

**Observability:** a second test-only accessor `waiterCountForTest(handle)` was added beside `subscriberCountForTest`, WeakMap-registered at construction. Both are module-level and neither is re-exported from `packages/broker/src/index.ts`; `PtyHostHandle` remains at its ratified five members.

**Correction-log wording:** the round-10 entry said "three code files" while listing two code files plus this log — corrected to "three files — two code files … plus this log". The round-11 entry said "8 files — 4 src + 4 test mirrors" while the commit contains nine — corrected to "nine files — 4 src + 4 test mirrors + this log".

**Verification at the round-12 head:** supervisor suite 14/14 (incl. the new round-12 regression); combined `bun test packages/pty-host packages/broker` 145 pass / 0 fail × 3 consecutive runs (144 + the new regression); `bun run typecheck` exit 0. Scope: three files — two code files (`packages/broker/src/pty-host-supervisor.ts`, `packages/broker/test/pty-host-supervisor.test.ts`) plus this log. Accepted residuals unchanged: the one-syscall adjacent hash→spawn TOCTOU boundary, the unread host stderr pipe, and Task 44 environment/dead-host escalation scope. The round-11 Tier-2 duplicate-comment advisory stands accepted and unmodified. No thread replies/resolutions, no push, no merge, no review dismissals, no Task 44 work.

**Next steps:** fresh Tier-2 review at the round-12 head BEFORE any push (prior verdicts never carry). Push, CodeRabbit re-review, thread resolution, and merge authorization at exact SHA each require separate explicit Founder authorization.

---

# Phase 3A rubric milestone 7 (M9, M10) — Correction-Round Record

**Plan milestones:** M9 (Tasks 20–21) and M10 (Tasks 21b–25)
**Rubric §7.2 milestone:** 7 (plan §4 maps both M9 and M10 to it)
**Authority:** plan §11.3, and FOUNDER-ACT-20260929-TASK22-CORRECTION
(`docs/decisions/DEC-20260929-01-task22-correction-authorization.md`), B4.

**Recorded late.** Plan §11.3 requires each verdict to be recorded when it occurs. Neither verdict
below was. Both are recorded here on 2026-09-29, when the act that counts them was filed. Nothing
below is reconstructed beyond what the cited records state.

## Round 1 (M9)

- **Verdict:** FAIL (STATIC), 2026-09-24 17:13 UTC.
- **Verdict target:** `f513c7637a825b55354c93b8c69ceac62a6d4c13`, the M9 code on `main`
  (Tasks 20 and 21).
  - This is inferred, not recorded: neither `DEC-20260924-05` nor `DEC-20260925-01` names the
    reviewed SHA.
  - Basis: `main` was `f513c7637a825b55354c93b8c69ceac62a6d4c13` from its merge at
    2026-09-24T11:29:54Z until `1f012be616d430cb95df6c74f6f478559fd65208` merged at
    2026-09-25T09:24:47Z. That window contains the review time, 2026-09-24 17:13 UTC.
    `DEC-20260924-05`, which acts on the review's findings, is bound to the same base.
- **Reviewer:** independent static M9 review (Codex), per `DEC-20260924-05` A1.
- **Findings:** F1–F4. F1, F2 and F4 were missing legality-test coverage; F3 was the plan's Task 20
  test count.
- **Resolution:**
  - F1, F2 and F4 were closed with tests only under FOUNDER-ACT-20260924-M9-HARDEN, PR #99, merged
    at `1f012be616d430cb95df6c74f6f478559fd65208`. Codex's re-review of head
    `5d8b2ea9dbcabf114183c1181931f29821a8a84a` returned PASS (STATIC).
  - F3 was closed by `DEC-20260925-01`.
- **Counted by:** FOUNDER-ACT-20260929-TASK22-CORRECTION B4. All findings in one verdict are one
  round.

## Round 2 (M10, Task 22)

- **Verdict:** FAIL, recorded 2026-09-28T11:26:00Z in PR #102 comment `5868915240`.
- **Verdict target:** `ae1cb8fc66901717a47285a0756221479ec97826`
- **Reviewer:** independent non-authoring Codex review under `DEC-20260926-01` B5.
- **Findings:** the five in FOUNDER-ACT-20260929-TASK22-CORRECTION A1:
  - the B1 stamped-type boundary;
  - the B4 no-new-authority boundary;
  - the immutable principal;
  - closure isolation (partial);
  - sequence refusal.
- **Resolution:** pending, under FOUNDER-ACT-20260929-TASK22-CORRECTION.

## Current count

- **Rubric milestone 7:** **2** of 2.
- Plan §11.3 requires reassignment at more than two rounds. The next verdict on milestone-7 work
  that identifies a substantive defect is round 3. That includes the re-review under
  FOUNDER-ACT-20260929-TASK22-CORRECTION Part E, and it requires reassignment of the implementer
  before any further correction.

## Accounting notes (per plan §11.3)

- **A stop-time finding on `84afef0a89bf55fce554ce438126ddc8bce65c32` is recorded and not counted.**
  - **Date of the finding:** 2026-09-29. Recorded late, on 2026-09-29, when the act that rules on it
    was filed. `DEC-20260929-01` B4 is the same kind of late entry.
  - **What:** a Codex stop-time check, run inside the builder session after the push of
    `84afef0a89bf55fce554ce438126ddc8bce65c32`, found that `ITERATION_DONE` in
    `packages/broker/src/in-process-client.ts` is one shared, unfrozen module-scope object handed to
    callers.
  - **Ruling:** not counted as a plan §11.3 verdict, by FOUNDER-ACT-20260929-TASK22-CORRECTION-A1 B4
    (`docs/decisions/DEC-20260929-02-task22-correction-a1.md`). It came from an in-session check on
    the builder's own work, not from an independent review. Rubric milestone 7 stays at **2** of 2.
    The next independent verdict on milestone-7 work that identifies a substantive defect is round 3,
    which requires reassignment of the implementer.

## Part E re-review of Task 22 (not a round)

- **Recorded:** 2026-09-30, from PR #102 comment `5901859473` (2026-09-30T00:48:16Z), under
  `DEC-20260929-01` E3 and `DEC-20260929-02` E3. That comment records both passes; it does not
  record the time each pass returned.
- **Verdict target:** `c6777cb51aa5cdb17ac7ff751484c463b0111738`, the head of PR #102 after both
  correction commits (`84afef0a89bf55fce554ce438126ddc8bce65c32` and
  `c6777cb51aa5cdb17ac7ff751484c463b0111738`).
- **Reviewer:** `chatgpt-5.6-sol`, independent and non-authoring. Static review: the reviewer
  executed no repository code.
- **Pass 1:** INCONCLUSIVE. Items 1 and 3 to 7 PASS. Item 2 AMBIGUOUS: the review packet omitted the
  implementation of `Ledger.readAfter()`, so the reviewer could not establish that returned
  `LedgerRow` objects are not aliased. The reviewer found no blocking or major defect.
- **Pass 2, same head:** PASS on all seven items, after a supplement adding
  `packages/ledger/src/ledger.ts` and the packet author's measurements. Advisory only
  (`DEC-20260929-02` B5): `snapshots()` pacing.
- **Counted:** neither pass. Neither identified a substantive defect, so neither is a round under
  `DEC-20260929-01` B4 or `DEC-20260929-02` B4. The Founder's merge authorization on PR #102
  (comment `5901996075`, item 3) states the same.

## Round 2 resolution

Round 2's resolution, recorded above as pending, is now closed:

- Findings 1 to 4 are Task 22 defects (`DEC-20260929-01` B1). They were corrected on PR #102 by
  `84afef0a89bf55fce554ce438126ddc8bce65c32` under FOUNDER-ACT-20260929-TASK22-CORRECTION.
- Finding 5 was not corrected in code. The first review passed foreign-session refusal and failed
  the absence of duplicate and out-of-order refusal. `DEC-20260929-01` B2 rules that Task 22 owns
  only sequence stamping and foreign-session refusal, and that duplicate, regression and gap
  handling belongs to plan Task 23. No code was added for it.
- `c6777cb51aa5cdb17ac7ff751484c463b0111738` corrected a further defect that is not one of the five:
  the shared completion result found by the stop-time check, under
  FOUNDER-ACT-20260929-TASK22-CORRECTION-A1 (`DEC-20260929-02` A2 and B2). It is not counted; see
  the accounting note above.
- The Part E PASS above confirmed findings 1 to 4 closed, and finding 5 satisfied as B2 reads it, at
  `c6777cb51aa5cdb17ac7ff751484c463b0111738`, with Copilot's three threads (merge authorization,
  item 4).
- PR #102 merged to `main` at `84f247c61116a47e5c575c963002f245465063b5`, 2026-09-30T01:02:33Z,
  under the Founder's authorization naming head `c6777cb51aa5cdb17ac7ff751484c463b0111738`.

## Count after Part E

- **Rubric milestone 7:** still **2** of 2.
- Task 22 is accepted at its M10 review checkpoint (merge authorization, item 6). The M10 milestone
  review stays open for Tasks 23 to 25.
- The next independent verdict on milestone-7 work that identifies a substantive defect is round 3,
  and it requires reassignment of the implementer before any further correction.

## Two earlier reviews of Task 22 (not rounds)

- **Recorded:** 2026-09-30, under FOUNDER-ACT-20260930-TASK22-B3-CLARIFICATION A2 to A4 and B1
  (`docs/decisions/DEC-20260930-01-task22-b3-clarification.md`). Recorded late: neither verdict was
  posted on PR #102 before the merge. The act states that both were returned before the review in
  comment `5901859473`. It does not record the time either was returned.
- **Verdict target:** `c6777cb51aa5cdb17ac7ff751484c463b0111738`, the head of PR #102 merged at
  `84f247c61116a47e5c575c963002f245465063b5`. This is the same head as the Part E re-review above.
- **Reviewers:** both returned FAIL, from an earlier packet.
  - Reviewer id `codex`. SHA-256 of its text:
    `9947b7c453ca0a4048508424b947e0d6e230e066dd01cab4db467593e6258da3`.
  - Reviewer id `chatgpt-5.6-sol`. SHA-256 of its text:
    `13f060b6f216938c5ae95acad64b38b38a5dbca991f176b12de706b0e21090e1`.
- **Finding:** item 4, in both. The output iterator's `return()` ends that iterator before the client
  closes. Both read `DEC-20260929-01` B3, "it ends only when this client closes", literally. Both
  passed items 1, 3 and 5. Items 2 and 6 were AMBIGUOUS in both.
- **Packet:** the earlier packet did not conform. It omitted `DEC-20260929-02`,
  `packages/broker/src/snapshot.ts` and the ledger source that defines `Ledger.readAfter()`, contrary
  to `DEC-20260929-02` E1 (act A3).
- **Counted:** neither. They are not Part E verdicts. They were returned on a packet that did not
  satisfy `DEC-20260929-02` E1, so they are recorded as reviews of that head and are not rounds (act
  B1). Rubric milestone 7 stays at **2** of 2, consistent with the entries above.
- **Ruling:** `DEC-20260929-01` B3 is clarified (act B2). A consumer's own `return()` ends that
  iterator only. The act authorizes no code change (act C1). It does not decide the AMBIGUOUS
  findings on items 2 and 6 (act F1).
- **Correction to the merge authorization:** item 3 of the merge authorization on PR #102 (comment
  `5901996075`) concerned the two passes in comment `5901859473`. It did not address these two
  verdicts (act B4).
- **Reference:** FOUNDER-ACT-20260930-TASK22-B3-CLARIFICATION
  (`docs/decisions/DEC-20260930-01-task22-b3-clarification.md`).

## Task 23 Part E review (round 3)

- **Recorded:** 2026-10-01, under FOUNDER-ACT-20261001-TASK23-CORRECTION
  (`docs/decisions/DEC-20261001-01-task23-correction-authorization.md`) B1 and G1.
- **Verdict target:** `0e5a930d9ba02522030356264ec4dfa6d727bf77`, the head of PR #108 (a draft), one
  commit after the Task 23 binding base `ed853080a4bea377c2f5cf274c90f740ab1c9cac`.
- **Reviewer:** `chatgpt-5.6-sol`, independent and non-authoring. Static review: the reviewer
  executed nothing.
- **Packet SHA-256:** `8da30e6decc2a4e4f79c89ff88638cc6ed1a9fb84d267ed4a7a2c1a02360ed02`.
- **Verdict text SHA-256:** `d32d7d928f6f9267d62649f1456a04eb09431438006d54f974b1e430d573a3a8`, from
  the Founder's saved copy.
- **Result:** FAIL. Items 1, 2, 3, 5 and 6 returned PASS. Items 4 and 7 returned FAIL, on one
  finding (Major M1): at that head, `unsafeTestOnlyIngestOutputFrame` reached an async ingest through
  a discarded promise, so an exception raised while ingesting its frame no longer propagated
  synchronously, against `DEC-20260930-02` B7. One advisory finding (A1): no named test exercised
  output regression, snapshot duplicate or snapshot gap.
- **Counted:** round 3 (act B1). The packet conformed (act A3). Items 4 and 7 count once. The
  advisory finding is not a round. Rubric milestone 7 stands at **3**.
- **Ruling:** the implementer is reassigned (act B2) to `session:claude-code/m10-task23-r2`. The act
  authorizes one correction commit on PR #108 (act C1). A re-review follows (act Part F), and a
  substantive finding there is round 4 (act F4).
- **Not recorded here:** the verdict text itself. It is posted verbatim on PR #108 by a session the
  Founder directs, after this pull request merges (act G2).

## Task 23 re-review (correction round 3)

- **Recorded:** 2026-10-01, under FOUNDER-ACT-20261001-TASK23-REREVIEW-ACCEPTANCE
  (`docs/decisions/DEC-20261001-02-task23-rereview-acceptance.md`) B1 to B5 and C1.
- **Verdict target:** `f72e49e850eb38d882430c37b96bc834f19ab32d`, the head of PR #108 (a draft), two
  commits after the Task 23 binding base `ed853080a4bea377c2f5cf274c90f740ab1c9cac`. Its parent is
  the correction base `0e5a930d9ba02522030356264ec4dfa6d727bf77`.
- **Reviewer:** reviewer id `codex`, accepted by act B2 as satisfying `chatgpt-5.6-sol` in
  `DEC-20261001-01` F1 and F3, for this verdict and this head only. Reviewer surface `codex`,
  authoring surface `claude-code`. Independent and non-authoring.
- **Evidence base (act B3):** a live, read-only review of the repository at the exact head. It
  executed `bunx tsc --noEmit` (exit 0), the focused test file (9 pass, 0 fail),
  `bun test packages/broker` (261 pass, 0 fail, 14 files), `bun test` (1551 pass, 0 fail, 95 files)
  and `git diff --check` (clean). It only read the correction-base RED proof, the builder's baseline
  and the PR description's evidence. The packet assembled for this head, SHA-256
  `840fa97e651eddfca305b5ed9ba55f387d99cb7bfcc9999315141fb776ca1c4c`, is not its evidence base.
- **Verdict text SHA-256:** `f4c4592d3b84c4486d07e42be64c9653e9deb1b88790572b8bd699d86b846651`, from
  the Founder's saved copy.
- **Result:** all eight F2 items PASS. Label `PASS-WITH-ADVISORIES`, read as PASS (act B1). Notes
  carried, none blocking (act B4): A1, no named test exercises output regression, snapshot duplicate
  or snapshot gap; A2, the served model id is not recorded and is not inferred; O1, the accepted
  output sequence is recorded before the byte copy, so a copy that throws leaves it advanced with no
  frame queued, which `DEC-20261001-01` B3 does not rule.
- **Counted:** no round is added (act B5). Rubric milestone 7 stands at **3**.
- **PR state the verdict reported:** `Verify` and `Verify (macOS)` success; `code-review` failure
  because one `github-code-quality` thread on test line 715 was unresolved. Act B6 rules that the
  thread needs no code change; replying, resolving and re-running a check are the Founder's own acts.
  The verdict is not merge readiness, permission to leave draft, or merge authorization.
- **Not recorded here:** the verdict text itself. It is posted verbatim on PR #108 by a session the
  Founder directs, after this pull request merges (act C2).

## Task 23 merge (M10 checkpoint)

- **Recorded:** 2026-10-02, under the Founder's merge authorization on PR #108 (comment
  `5948449666`), item 8.
- **Merged:** PR #108, at 2026-10-02T09:11:57Z, as merge commit
  `67025b487dc5fcddd687d3313b3a384f9fd7313a`, parents `1249491169d47e19afc6fe3a09a81b8b7c6ee270`
  and `f72e49e850eb38d882430c37b96bc834f19ab32d`. Method: merge commit, head pinned, no
  caller-supplied message.
- **Scope:** exactly `packages/broker/src/in-process-client.ts` and
  `packages/broker/test/in-process-client.test.ts`, against the Task 23 binding base
  `ed853080a4bea377c2f5cf274c90f740ab1c9cac`.
- **Authorizations:** ready-for-review comments `5947977129` and `5948170077` (identical text,
  posted twice); merge comment `5948449666`.
- **Checks on the head at merge:** `Verify`, `Verify (macOS)` and `code-review` (run
  `36984422939`, attempt 2) success.
- **Reviews:** the Part E review at `0e5a930d9ba02522030356264ec4dfa6d727bf77` returned FAIL
  (round 3, comment `5927922921`). The re-review at `f72e49e850eb38d882430c37b96bc834f19ab32d`
  returned `PASS-WITH-ADVISORIES` (comment `5944288206`), accepted under `DEC-20261001-02`. No
  round was added. Rubric milestone 7 stands at **3**.
- **Carried, not fixed:** O1 (`outputSeqs.set` runs before the byte copy; a failed copy on the
  test-only path leaves the last accepted `outputSeq` advanced). A later Founder act may rule on
  it.
- **Checkpoint:** Task 23 was accepted at its M10 review checkpoint. The M10 milestone review stays
  open. This entry does not authorize Task 24, Task 25 or any later task.
- **Post-merge verification:** observed on 2026-10-02, before this entry was written. The merge
  commit's parents were exactly the two above. `git diff --name-only` from the first parent to the
  merge commit listed exactly the two scope paths. `main` was at the merge commit itself, so no
  path had changed on `main` after it. `git interpret-trailers --parse` on the merge commit showed
  `Role-Id: builder`, `Actor-Id: session:claude-code/m10-task23-r2` and
  `Execution-Surface: claude-code`. `.github/scripts/attribution-shape-check.sh main` on the merge
  commit, with the script read from `main`, returned PASS, exit 0.

## M14 review preparation (Task 34 correction)

- **Recorded:** 2026-10-02, under FOUNDER-ACT-20261002-M14-TASK34
  (`docs/decisions/DEC-20261002-01-m14-task34-acceptance.md`).
- **Merges reviewed:** Task 34, PR #93, merge commit `a2a55bfa31390194904f71c6931e6bc8801df897`;
  Task 33, PR #94, merge commit `4477bf824892f2e3311843e33f163bc52ac9e5fe`.
- **Basis:** the act drafter's own reading, not an independent review. The drafter executed at
  `d950bd77225c7abc7c1cb42e3ab2d72542824541` on Linux with Bun 1.3.11: the architecture test file
  returned 41 pass, 0 fail, and `bunx tsc --noEmit` exited 0. The full suite, macOS and Bun 1.3.14
  were not run.
- **Finding F1:** the `node-pty` premise of `PLAN-OPEN-4` changed once `packages/tui-chaos` was
  added. Act B2 ruled it a carve-out for `packages/tui-chaos` and the root `trustedDependencies`
  entry only, and not precedent.
- **Finding F2:** the lockfile assertion in `test/phase3a/architecture-phase3a.test.ts` cannot fail,
  because its flag keys on a string that `bun.lock` does not contain. In the drafter's mutation
  check, a `node-pty` edge planted in the `packages/broker` lockfile block left the test passing
  (1 pass, 0 fail). Act C1 authorizes a correction.
- **Ruling:** Task 34 is accepted as merged, subject to that correction (act B1). No round is added
  by this act. The M14 review checkpoint stays open until act Part D is met. Task 35 and M15 are not
  authorized.
