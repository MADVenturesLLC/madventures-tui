DEC-20261123-01 ADDENDUM 2: input echo on the PTY host's terminal

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261123-01` B21, B22 and B26, and the limitation of its B17 item 5, for the change of B1 below; `DEC-20261108-04` Part C and Part D items 1 and 4, for the same; and the builder prompt of M1, where this addendum says otherwise
> **Read with:** `DEC-20261123-01` B16, B17, B21, B22, B23, B26 and B29, and its Addendum 1; `DEC-20261108-04` Part C and Part D items 1 and 4; `DEC-20261023-01` B4; Phase 3B plan §1 item 1 and §2; the builder prompt of M1, SHA-256 `683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** The builder of M1, `session:codex/3b-m1-r1`, halted at `d5d40d6dcd90a930c106cec55ea836c5cc4400ce`, with R1 to R6 committed and R7 not, and reported in `pr/m1-report.md`, SHA-256 `90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d`. In R7, the tests of the healthy start, the refused fourth call, the cancellation and the monitor after activation each stopped at the first attestation of the Claude Code stand-in: logs 478 and 485, SHA-256 `333b22d8f796847764115addaad45f820e2c21fa1641aab8146f8a178b6da4f4` and `fe9321c5f103632aac2c50e3ff6c7d52a5e7bb8f38f4142beef053b8abbe0c16`. A temporary observer, log 488, SHA-256 `243098c8752897de10961d27818816b9f0633e75c9d252666837ef0a23b168f6`, found that the first frame back was the written prompt itself, before the stand-in had started its script or made its first read, and that the attester rejected it as `attestation_malformed`, as B17 item 5 requires.

A2. **The cause.** `packages/pty-host/src/terminal.ts` creates the governed child's terminal with Bun's defaults, under which the terminal echoes its input, and then spawns the child; `packages/pty-host/src/main.ts` announces readiness after that; and the host's command interface has no setting for echo, as logs 489, 490 and 492 show, SHA-256 `e1496522201d4b89d1c4e28597b35a6492ff54297248ddad7f94f58b088ab8d7`, `ce89e745788f560e27d51f67515b7a3f6384655af476832851b2357609a8fac6` and `ff38c8360a60dfee864be9819a6dc8a5fa32c139398d36bdb02935477015151a`. The prompt can reach the terminal before the child runs, as log 488 shows, so no child, stand-in or real surface can reliably stop the echo by changing its own terminal. Phase 3A's own stand-ins set raw mode on their input after they start, in `test/phase3a/fixture-adapters.ts`, which cannot help a prompt written before then. B22 lists neither file, so the builder halted under B26, as it should. At the base, the Phase 3A test `a valid session lifecycle emits every fact in order exactly once, with no truncation`, in `packages/pty-host/test/main-guard.test.ts`, expects that echo: line 309 waits for `ping` twice, the local echo and the output of `/bin/cat`, as its comment says, and line 335 expects exactly that output.

A3. **What follows.** A real surface reached through this host meets the same echo unless it turns echo off before the prompt arrives, so without a change its governed start could fail its attestation. B17 item 5 left to a later act what a live run shows about echo. This addendum does not rule on that: it turns the PTY host's own echo off, and an echoed line still fails.

A4. **The drafting assistant.** A Claude Code session drafted this addendum and the resume message that delivers it, and checked A2 against the code at the base. In its own container, on Linux under Bun 1.4.2 at revision `744846f844374847c902b5e7fd59b4342a51ef99`, it saw a line written to a child that had not read come back as output under the terminal's defaults and not once the echo bit was cleared before the spawn; and it ran the 2048 tests of the base with and without that bit cleared and saw only the test A2 names change its result, failing with the bit cleared and passing with the change of B1 item 2. Phase 3A's spike, at lines 629 and 630 of `test/phase3a/spike/bun-terminal-spike.ts`, sets raw mode and output flags on a terminal before its spawn, the point at which B1 item 1 clears only the echo bit. That is a drafting check, not evidence of M1, and not an independent review.

## Part B: Founder rulings

B1. **The change.** B22 is amended to add, for this alone:
1. `packages/pty-host/src/terminal.ts`: after it creates the governed child's terminal and before it spawns the child, and so before the PTY host announces readiness and before any input can reach that terminal, the host clears the echo bit, `ECHO`, which is 8 on macOS and on Linux, in the terminal's local flags, which Bun 1.4.2 exposes as `localFlags`, and leaves every other flag as it was. It does not use raw mode, and it adds no check of its own: an echo that remained would fail the attestation, as B2 says, and the test of B3 item 1 shows that none comes back. Nothing else in the PTY host changes: not `packages/pty-host/src/main.ts`, its frames, its command interface, its readiness, its signals, its launch, or the order in which it hashes and then runs the child. No dependency is added.
2. Lines 309 and 335 of `packages/pty-host/test/main-guard.test.ts`, in the test A2 names: line 309 waits for `"ping\r\n"`, its comment naming only the output of `/bin/cat`, and line 335 expects exactly `"ping\r\n"`. Nothing else in that file changes, the test's name included.

B2. **B17 stands.** An echoed line that reaches an attester still fails, as B17 item 5 says. The limitation that B17 item 5 has the evidence packet state now reads: the PTY host turns echo off before the child starts; whether a real surface turns it back on is not established offline.

B3. **Tests and breaks,** added to B21, under its rules and Addendum 1:
1. a new test file under `test/phase3b/`, with a test that writes a line to a child that has not yet read it and shows that the line does not come back as output;
2. the break that removes the change of B1 item 1, on which that test and the test A2 names, as B1 item 2 leaves it, each fail;
3. the tests of R7 that stopped at the first attestation, which then pass;
4. the tests of B21 item 3 for an echoed input line, for each surface, which still fail the attestation as B17 item 5 says; one that relied on the terminal's echo has its stand-in write its input back as its own output instead, a self-fix under `DEC-20261023-01` B4, made in R7's commit if that test is not yet committed, or else in a further commit, next in the order of ATTRIBUTION AND COMMITS, named for what it fixes.
Every other test of the binding base, the other Phase 3A tests of the PTY host among them, passes unchanged; if one would have to change, the build halts.

B4. **Paths and halts.** B26 reads with the paths of B1 added, and with B1 item 2 naming the one test of the binding base that changes; any other change outside B22 still halts. With B29, this addendum amends B22, and `DEC-20261108-04` Part C and Part D item 1, for these paths, and Part D item 4 for the test of B1 item 2, and is the amendment Phase 3B plan §1 item 1 requires for these paths.

B5. **Delivery and record.** The builder receives this addendum in its prompt folder, with its SHA-256, by a resume message I sign. The change of B1 and the test file of B3 item 1 are one commit of their own, made before R7's, its subject naming what it does and its body naming this addendum. The build log, the pull request description and the act that records M1's merge name this addendum by its SHA-256 and quote the diffs of B1; the Tier-2 review of M1 reads them as changes to a Phase 3A runtime component and a Phase 3A test, and confirms that they change nothing but echo. A comment in `packages/broker/test/pty-host-supervisor.test.ts` that cites lines of `terminal.ts` stays as it is, since B22 does not let that file change. How keyboard input from the TUI is shown with echo off is for M3's act. This addendum is filed unchanged with the act that records M1's merge.

B6. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it. Nothing else in `DEC-20261123-01`, its Addendum 1 or the builder prompt changes; where the builder prompt says otherwise, this addendum rules.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-24

Actor-Id: founder
