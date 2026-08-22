# M17 Step-8 Gate Evidence — Apple Silicon MacBook (2026-08-22)

**Date filed:** 2026-08-22
**Repository:** madventures-tui
**Candidate SHA:** `56435bfe61978abed2cbcdb9b6c4e52550dc222d`
**Host:** Apple Silicon MacBook (arm64, macOS 26.6.1)
**Filed by:** aggregator (`builder`, surface Claude Code), on the Founder's
2026-08-22 evidence-verification and filing direction.

**What this record is.** The verification record for the Founder-submitted
Apple Silicon host transcript of the M17 Step-8 checkpoint runs on the
corrected candidate — the evidence the Step-8 gate review judges. It is
**not** a plan-Task-39 §6.5 host report: those are host-authored, come from
Task 39's own future host runs (Founder ruling 2026-08-21), and carry their
own checksums. The host-originated artifact behind this record is the raw
terminal transcript identified below; this record extracts and verifies it
and alters nothing in it.

**Immutability.** This record is filed immutable. Any future correction is
a new dated record citing this one; this file is not edited.

## Source evidence (host-originated)

| Field | Value |
|---|---|
| Submitted filename | `MACBOOKTEST2.txt` (upload id `55352082-MACBOOKTEST2.txt`) |
| Submitted by | Founder, 2026-08-22, M17 Task 39 dual-host evidence submission |
| Size | 556,775 bytes, 11,188 lines |
| SHA-256 | `a75ab8511786df22e461e6074d0bbeb173a270797ee9b5eab5b2c711d2038f69` |

## Host identity (as recorded in the transcript)

| Field | Value |
|---|---|
| Architecture (`uname -m`) | `arm64` |
| macOS (`sw_vers`) | macOS 26.6.1, build 25G76 |
| Bun version | 1.3.14 (0d9b296a) — matches the other host, per the completion-lane rule |
| Bun binary SHA-256 | `e0c90ec15d33363e6b70713d56bc3b2c7585c17f40a0fe0f8fd9305901d4e233` at `/Users/michaeldaley/.bun/bin/bun` (identity field only; cross-host hash comparison is ruled out — different builds per architecture) |
| Worktree | `~/madventures-tui-m17-56435b-macbook`, created `git worktree add --detach` at the candidate |
| Install | `bun install --frozen-lockfile` — `62 packages installed [119.00ms]` |

## Candidate resolution

The transcript records the checkout as:

```
56435bf (origin/claude/new-session-iy03t7) fix(spike): M17 Step 8 correction — exact_binary_io records write outcome, length, and bytes independently
Preparing worktree (detached HEAD 56435bf)
HEAD is now at 56435bf fix(spike): M17 Step 8 correction — exact_binary_io records write outcome, length, and bytes independently
```

Verified 2026-08-22 against the repository: prefix `56435bf` matches
exactly one commit across all refs (`git rev-list --all | grep -c
"^56435bf"` = 1), resolving to
`56435bfe61978abed2cbcdb9b6c4e52550dc222d`, whose subject matches the
transcript's verbatim. All three runs executed inside the one detached
worktree prepared at that commit, with no intervening checkout.

## The three runs (verbatim spike lines)

Run banners at transcript lines 56, 3767, 7478; each run is a full
`bun test` of the suite. Spike output per run:

```
[spike] host=darwin/arm64 bun=1.3.14
[spike] pty_tty_allocation=3ms(pass) exact_binary_io=0ms(pass) resize_propagation=2ms(pass) process_group_and_signals=21ms(pass) child_and_grandchild_termination=21ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2075ms(pass) lifeline_eof=51ms(pass) pty_host_death=47ms(pass) sigstop_wedged_direct_pgid=287ms(pass) child_ignores_sigterm=726ms(pass) clean_exit_reporting=2053ms(pass) measured_timing=2075ms(pass)

[spike] host=darwin/arm64 bun=1.3.14
[spike] pty_tty_allocation=2ms(pass) exact_binary_io=1ms(pass) resize_propagation=3ms(pass) process_group_and_signals=27ms(pass) child_and_grandchild_termination=23ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2097ms(pass) lifeline_eof=60ms(pass) pty_host_death=97ms(pass) sigstop_wedged_direct_pgid=288ms(pass) child_ignores_sigterm=728ms(pass) clean_exit_reporting=2073ms(pass) measured_timing=2097ms(pass)

[spike] host=darwin/arm64 bun=1.3.14
[spike] pty_tty_allocation=2ms(pass) exact_binary_io=1ms(pass) resize_propagation=3ms(pass) process_group_and_signals=25ms(pass) child_and_grandchild_termination=22ms(pass) two_ptys_plus_adapter_no_leak=0ms(pass) supervisor_exit_modes=2099ms(pass) lifeline_eof=59ms(pass) pty_host_death=56ms(pass) sigstop_wedged_direct_pgid=295ms(pass) child_ignores_sigterm=725ms(pass) clean_exit_reporting=2051ms(pass) measured_timing=2099ms(pass)
```

Suite summaries: `761 pass / 0 fail / 2831 expect() calls / Ran 761 tests
across 40 files` in `[19.28s]`, `[18.74s]`, `[18.27s]`. Zero `(fail)`,
zero `(skip)`, zero `(todo)` markers and zero `[spike] FAIL` blocks
anywhere in the transcript; every `fail`/`error` string occurrence is a
`(pass)`-marked test *name* (fail-closed behavior tests).

## Verification against the required conditions

| # | Condition | Verdict | Evidence |
|---|---|---|---|
| 1 | Exact candidate SHA every run | PASS | Candidate-resolution section: one detached worktree at `56435bf` (unique prefix → full SHA), all three runs inside it |
| 2 | Host identity recorded | PASS | `arm64`, macOS 26.6.1/25G76, Bun 1.3.14 + binary hash |
| 3 | Three consecutive full runs | PASS | Banners RUN 1/2/3 back-to-back in one session, one line apart from the prior summary; full suite each |
| 4 | All criteria pass every run | PASS | 13/13 `(pass)` in all three spike lines; `761 pass / 0 fail` ×3 |
| 5 | Eventual received length = payload length | PASS | `exact_binary_io` passes; at the candidate SHA the evaluator (`evaluateExactBinaryIo`) passes only when `got === PAYLOAD_BYTES` (4096) — `lengthExact` is a conjunct |
| 6 | Eventual received bytes = payload bytes | PASS | Same evaluator: `byteExact` (always-computed full comparison) is a conjunct |
| 7 | Write-return telemetry under the Step-8 ruling | PASS | Evaluator takes `wrote` as telemetry only — it appears in no pass conjunct; `writeOk` (no exception) is required. Synthetic proof on this host: `step-8 synthetic: short flush count with exact eventual delivery passes` passed in all three runs, alongside the three failure-direction synthetics |
| 8 | Backpressure/drain behavior | PASS | Under the Step-8 ruling drain is neither required nor relied upon on Bun 1.3.14; the evaluator has no drain term; first byte arrived in 0–1 ms |
| 9 | Every independent timing bound | PASS | `exact_binary_io` 0/1/1 ms ≤ 250 (ack); all eight killing criteria ≤ 5000 ms outer bound (max observed 2099 ms); WEDGE/SWEEP assertions inside the passing suite (`761 pass`) |
| 10 | No failure hidden by aggregate | PASS | Each of the 13 criteria printed individually per run; zero FAIL blocks; the compound-criterion test asserts every sub-assertion true and passed |

## Completion-lane conformance (Founder authorization, 2026-08-21)

Dedicated detached worktree at the candidate — yes. Frozen-lockfile
install — yes, `62 packages installed`, and `bun install
--frozen-lockfile` aborts rather than mutates the lockfile. Full suite
×3 and `bunx tsc --noEmit` — yes (see capture notes on tsc). Hard stop,
nothing from Task 39 — yes; the transcript ends at the shell prompt
after the final silent commands. `bun --version` matches the other host
(1.3.14 = 1.3.14).

## Capture notes and limitations (stated, not repaired)

- **`TERM` and shell were not captured** by the host script; the
  transcript retains no value for either. Recorded here as not retained
  — not reconstructed.
- **`bunx tsc --noEmit` and the closing `git status --short` produced no
  output** between the final run summary and the returning prompt. For
  both commands, silence is the success signature (TypeScript errors and
  dirty-tree entries print); the on-host `$M17_EVIDENCE` tee files hold
  the authoritative empty outputs. The pre-install `git status --short`
  was likewise silent.
- **The explicit `git diff -- bun.lock package.json` named in the
  completion lane was not run.** The condition it checks is established
  two other ways: `--frozen-lockfile` fails rather than changes the
  lockfile, and the silent `git status --short` after the runs would
  have shown any tracked-file modification.
- **The full 40-character SHA is not printed in the transcript**; the
  abbreviated `56435bf` plus verbatim subject plus branch ref resolve
  uniquely, as verified in the candidate-resolution section.

## Verdict

**PASS — all ten required conditions established for this host.** Three
consecutive full-suite runs at the exact corrected candidate, all
thirteen §3.6 criteria passing each run under the Founder's Step-8
ruling.

This record grants nothing: no production adapter, no merge, no Bun
upgrade, no later milestone. Plan-Task-39's own steps (its host-authored
§6.5 reports and report-validation test) remain unexecuted and require
their own host runs per the 2026-08-21 ruling.
