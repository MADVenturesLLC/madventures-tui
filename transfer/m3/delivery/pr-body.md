## Scope

DEC-20261127-01 commissions M3 on a7ceccbe96950b63646edc1dc6cc8590c957bf28. The local head is 67dce10bb771092743664dbdafa873e38748b5d4 on build/3b-m3-r1.

B13 delivers each post-attestation output fact as a per-execution frame and bounds each pane by line and byte counts. B14 routes submitted, surface-encoded lines and measured resizes through the active writer checks and the host acknowledgement path. B15 gives the second stage and dock the madv-surface identity and preserves Alt+4. B16 replaces current authority with STREAM ENDED after disconnect. B17 exercises malformed facts after activation on each surface. B18 items 1–14 are covered by the twenty tests below.

## Changes by requirement

R1. Both attesters retain their single fact loop. After the parser reads an output fact past handover, the live build supplies its bytes, session and per-execution sequence to the founder client's existing sequence check. A whole fact read during attestation stays with attestation, including a trailing partial line. Only the live build retains the production delivery function.

R2. PaneRetention stores owned bytes in arrival order for each execution. CR and LF terminate lines, CRLF counts once across frames and an unterminated nonempty final line counts once. At 10,000 lines or 2,097,152 bytes the oldest content drops first. Surviving bytes of a partial frame and a retained empty-frame marker each count as one frame. App and DockStrip subscribe to and render independent retained streams when given a client.

R3. The live founder client checks legality and serializes input and resize per execution. sendAcknowledgedCommand registers the real acknowledgement wait before writing. Its 250 ms monotonic deadline carries the original command start into direct containment and the existing 5-second outer bound. The build interrupts with pty_host_failure on host failure. The madv-surface byte sender begins the parser request and evidence deadline before sending. The execution principals and the original build keep the base request path. The build retains ownership of the private callbacks.

R4. PaneLine edits the focused surface's text, encodes one nonempty submission, and uses the snapshot read at submit. The UI sends changes in the active writer's measured pane size and displays refusal codes in uppercase with spaces. It displays NO TOKEN for a missing fencing token. The client-free prop path preserves byte pass-through. The recording pane client covers editing and resize, scripted refusals cover status words, and both real-host stand-ins cover end-to-end submission and nonwriter refusal.

R5. App, main, types, keybindings, keyboard-router, useKeyboard, both panes, GovernancePane, DockStrip, PaneTabs and agent-identity now resolve or name the madv-surface pane. MadvSurfacePane retains its original filename. Alt+4 and focus-antigravity are preserved. Existing synthetic execution identifiers and every base test name remain stable. The new focus test checks the dock, focused header, model and writer token.

R6. StatusBar.describeOwner and its compact formatting show STREAM ENDED for ended projections. GovernancePane uses the same liveness word for its authority row. The two stages and DockStrip already use livenessWord and isActiveWriter. IncidentBand retains historical evidence and EventLog renders historical entries. Separate scripted reads exercise a reader failure and a closed client. Both transfer kinds and both writers exercise the null-token readers. The pacing test observes the actual production promise and its settlement in the first microtask after unsubscribe.

R7. unsafeTestOnlyInjectHostOutput admits a copy of either complete invalid Phase 3A fixture on a known host, one at a time, at a clean read boundary. A controlled output wakes the existing stdout read. The decoder, broadcast, monitor and broker produce their normal verdicts. The two surfaces and two faults each produced the appropriate MalformedFrameError, surface failure and identity_mismatch interruption, and only the positive control reached the client. The madv-surface cause comes from reportFailure. Its private parser reason is established from the actual executed catch site. The test helper drains the expected decoder error and observes exit of its spawned host.

R8. scripts/phase3b/m3-evidence.tsx records ordered frames, child receipt and acknowledgement timing, rendered replies and nonwriter refusals, retention counts, ended projections and malformed-frame outcomes. It writes six source files outside the repository. The packet identifies each producer and transcript hash.

## Paths

```text
M	apps/madbridge/src/tui/App.tsx
M	apps/madbridge/src/tui/components/DockStrip.tsx
M	apps/madbridge/src/tui/components/PaneTabs.tsx
M	apps/madbridge/src/tui/components/StatusBar.tsx
M	apps/madbridge/src/tui/components/agent-identity.ts
M	apps/madbridge/src/tui/hooks/useKeyboard.ts
M	apps/madbridge/src/tui/keybindings.ts
M	apps/madbridge/src/tui/keyboard-router.ts
A	apps/madbridge/src/tui/live/line-buffer.ts
A	apps/madbridge/src/tui/live/retention.ts
M	apps/madbridge/src/tui/main.tsx
M	apps/madbridge/src/tui/panes/AntigravityPane.tsx
M	apps/madbridge/src/tui/panes/ClaudePane.tsx
M	apps/madbridge/src/tui/panes/GovernancePane.tsx
M	apps/madbridge/src/tui/types.ts
M	apps/madbridge/test/tui-governance-surfaces.test.tsx
M	apps/madbridge/test/tui-truth-safety.test.tsx
M	apps/madbridge/test/tui-writers-stage.test.tsx
A	docs/verification/phase-3b-m3-build-log.md
A	docs/verification/phase-3b-m3-evidence.md
M	packages/adapter-claude-code/src/live.ts
M	packages/adapter-madv-surface/src/live.ts
M	packages/broker/src/in-process-client.ts
M	packages/broker/src/pty-host-supervisor.ts
M	packages/supervisor/src/build.ts
A	scripts/phase3b/m3-evidence.tsx
M	test/phase3a/harness-separation.test.ts
M	test/phase3b/absence.test.tsx
A	test/phase3b/dispatch-observation.ts
A	test/phase3b/dispatch.test.ts
A	test/phase3b/ended-observation.tsx
A	test/phase3b/ended-stream.test.tsx
A	test/phase3b/input-view.tsx
A	test/phase3b/line-input.test.tsx
A	test/phase3b/m3-separation.test.ts
A	test/phase3b/madv-pane.test.tsx
A	test/phase3b/malformed-host.test.ts
A	test/phase3b/malformed-observation.ts
A	test/phase3b/pacing-settlement.test.ts
A	test/phase3b/pane-client.ts
A	test/phase3b/producer.test.ts
A	test/phase3b/retention.test.tsx
A	test/phase3b/transport-stand-in.ts
A	test/phase3b/transport.ts
A	test/phase3b/unbridged-stand-in.ts
A	test/phase3b/unbridged.ts
A	test/phase3b/usable-input.test.tsx
A	test/phase3b/usable-input.tsx
M	testdata/tui-chaos/goldens/governance_focus.grid.txt
M	testdata/tui-chaos/goldens/layout_resize.grid.txt
```

## Tests

| Requirement | B18 | Test file and full Bun name |
| --- | --- | --- |
| R1 | 3 | test/phase3b/producer.test.ts — the live producer delivers contiguous monitor facts for each execution and excludes attestation |
| R1 | 3 | test/phase3b/producer.test.ts — a refused output sequence interrupts the live session |
| R1 and R7 | 4 | test/phase3b/m3-separation.test.ts — production imports no private broker test seam |
| R2 | 1 | test/phase3b/retention.test.tsx — interleaved output reaches each pane and dock in host order |
| R2 | 2 | test/phase3b/retention.test.tsx — the line cap drops oldest content and counts received and retained frames and bytes |
| R2 | 2 | test/phase3b/retention.test.tsx — the byte cap retains the newest bytes including a partial frame |
| R3 | 6 | test/phase3b/dispatch.test.ts — both host commands reach the child and wait for the matching ack |
| R3 | 6 | test/phase3b/dispatch.test.ts — a missed acknowledgement contains the stopped host and interrupts the session |
| R3 | 6 | test/phase3b/dispatch.test.ts — execution clients and the original build have no host bridge |
| R3 | 7 | test/phase3b/dispatch.test.ts — the madv byte sender begins a checked request and refuses a closed monitor |
| R4 | 5 | test/phase3b/line-input.test.tsx — only Enter submits one encoded focused line and other focus sends nothing |
| R4 | 5 | test/phase3b/line-input.test.tsx — only the active focused writer resizes at a changed pane size |
| R4 | 6, 8 | test/phase3b/usable-input.test.tsx — each submitted stream-json line produces a checked stand-in response in its pane |
| R4 | 6 | test/phase3b/usable-input.test.tsx — a nonwriter submission is unauthorized in its pane and never reaches the child |
| R4 | 9 | test/phase3b/line-input.test.tsx — each refusal is shown once without retry and no token sends nothing |
| R5 | 10 | test/phase3b/madv-pane.test.tsx — Alt+4 focuses the madv-surface execution |
| R6 | 11 | test/phase3b/ended-stream.test.tsx — failed and closed streams replace current authority in every reader |
| R6 | 13 | test/phase3b/ended-stream.test.tsx — transfer-requested and sender-released show a null token as absence |
| R6 | 14 | test/phase3b/pacing-settlement.test.ts — unsubscribe settles the pending pacing wait before its deadline |
| R7 | 12 | test/phase3b/malformed-host.test.ts — malformed payloads and unknown tags interrupt each live monitor without client bytes |

Existing test changes follow EXISTING TESTS items 1 and 2. This inventory gives every changed file and line range. The two fourth-resume grid changes cover only the stamp and the rendered second dock. No base test name or assertion was lost. 578-corrected-existing-diffs.log · SHA-256 a4156b747abfd99ae609922cc67adb6153ca385bbda62d7480b925f0439168b8.

**apps/madbridge/test/tui-governance-surfaces.test.tsx**

-42 +42

-47 +47

-67 +67

-114 +114

-173 +173

-437 +437

-877 +877

-889 +889

-898 +898

-1049 +1049

-1086 +1086

-1231 +1231

-1239 +1239

**apps/madbridge/test/tui-truth-safety.test.tsx**

-540 +540

-592 +592

-640 +640

-793 +793

-1139,0 +1140

-1143 +1144

-1156 +1157

**apps/madbridge/test/tui-writers-stage.test.tsx**

-35 +35

-40 +40

-60 +60

-91 +91

-160 +160

-184 +184

-197 +197

-202 +202

-219 +219

-300 +300

-413 +413

-429 +429

-445 +445

-451 +451

-464 +464

-481 +481

-509 +509

-519 +519

-538 +538

-564 +564

-684 +684

-692 +692

-702 +702

-714 +714

-718 +718

-725 +725

-743 +743

-755,2 +755,2

-772 +772

-783 +783

-788 +788

-798 +798

-807 +807

-833 +833

-837 +837

-944 +944

-953 +953

-1038 +1038

-1056 +1056

-1079 +1079

-1091 +1091

-1098 +1098

-1128 +1128

-1145 +1145

-1148 +1148

-1157 +1157

-1161 +1161

-1163 +1163

-1177 +1177

-1181 +1181

-1193 +1193

-1197 +1197

-1292 +1292

**test/phase3a/harness-separation.test.ts**

-30 +30

**test/phase3b/absence.test.tsx**

-10 +10

-55,2 +55,2

-68 +68

-75,2 +75,2

-83 +83

-87 +87

**testdata/tui-chaos/goldens/governance_focus.grid.txt**

-1 +1

-39 +39

**testdata/tui-chaos/goldens/layout_resize.grid.txt**

-1 +1

-31 +31

## Verification

The corrected full run at a78e2d589a7d1740da86177af277472b98e9be1e passed. 556-repeat-full-test.log · SHA-256 48bdddc7f99479007ad42d1ca05f97af63ffcba85f4dde7b6195ab6a3ebb9cf1.

```text
 2159 pass
 0 fail
 28720 expect() calls
Ran 2159 tests across 178 files. [279.97s]
```

The B21 gates at 67dce10bb771092743664dbdafa873e38748b5d4 passed with Bun 1.4.2. The pinned executable and both command paths matched. The frozen install preserved bun.lock at a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The installed executable bit on packages/founder-act/src/main.ts was restored and the tree checked clean. TypeScript produced no output.

600-gate-runtime.log · SHA-256 9b8f048b92cad05e4958dc80513646ceb275858123fda18c286e156eb6568d7c — Bun runtime check — 20:21  up 6 days, 11:48, 1 user, load averages: 1.41 1.76 2.12 — Sat Nov 28 01:21:21 UTC 2026 to Sat Nov 28 01:21:21 UTC 2026 — exit status 0.

601-gate-install.log · SHA-256 83770c88fd7ffacf504d9aa32dc951256c8f6c66a91589ce2b95c731981c4c00 — bun install --frozen-lockfile — 20:21  up 6 days, 11:49, 1 user, load averages: 1.35 1.74 2.10 — Sat Nov 28 01:21:33 UTC 2026 to Sat Nov 28 01:21:33 UTC 2026 — exit status 0.

602-gate-install-state.log · SHA-256 011b426e0407f0c8b80824d8b0bfda6181b38737c99325276de30d66ee0949a4 — Post-install mode restoration, tree and lock check — 20:21  1 user, load averages: 1.21 1.70 2.08 — Sat Nov 28 01:21:41 UTC 2026 to Sat Nov 28 01:21:42 UTC 2026 — exit status 0.

603-gate-typecheck.log · SHA-256 802b2f79aabcf45453d1fdd68cef2ae0310bc9ebbb32d4c450feff304bf7dbfc — bunx tsc --noEmit — 20:21  up 6 days, 11:49, 1 user, load averages: 1.23 1.68 2.07 — Sat Nov 28 01:21:54 UTC 2026 to Sat Nov 28 01:21:57 UTC 2026 — exit status 0.

604-gate-suite-runtime.log · SHA-256 e3a577189992c7a74e48f526e33dff8d49d56556b92d73af8cc1d7601d36324a — Pre-suite Bun runtime check — 20:22  up 6 days, 11:50, 1 user, load averages: 1.07 1.56 2.00 — Sat Nov 28 01:22:56 UTC 2026 to Sat Nov 28 01:22:56 UTC 2026 — exit status 0.

608-gate-suite-wait.log · SHA-256 32e73689a5447081ec919e460fbfe1117265945eef4e8b5693b0dcabc6d1b934 — Logged load wait — 20:28  up 6 days, 11:56, 1 user, load averages: 2.70 2.29 2.17 — Sat Nov 28 01:28:39 UTC 2026 to Sat Nov 28 01:29:39 UTC 2026 — exit status 0.

609-gate-suite.log · SHA-256 04c01e982688429dfeb9fdedfe2b09b09419f938f559edab94d9857471c301a8 — bun test — 20:29  up 6 days, 11:57, 1 user, load averages: 1.91 2.14 2.12 — Sat Nov 28 01:29:39 UTC 2026 to Sat Nov 28 01:34:19 UTC 2026 — exit status 0.

```text
Checked 87 installs across 131 packages (no changes) [8.00ms]
```

```text
 2159 pass
 0 fail
 28751 expect() calls
Ran 2159 tests across 178 files. [279.92s]
```

Every one of the 2,139 baseline tests passed with the same name in the same file. Adding 20 tests in 10 new files gives 2,159 tests in 178 files. No skip or todo. 626-gate-comparison.log · SHA-256 1281f195e04beef896ce22cc2a482ba73779ff74d7efd068d3171ab95b479684.

## Breaks

The following completed deliberate breaks failed their guarded assertions. The build log contains each diff, all results from the isolated test file and the verified restore.

- R1 zero-based output sequence. Diff 087, failing run 089, restore 090.
- R1 delivered attestation output. Diff 093, failing run 095, restore 096.
- R1 accepted a sequence gap. Diff 099, failing run 101, restore 102.
- R1 production seam import. Diff 105, failing run 107, restore 108.
- R2 crossed pane streams. Diff 136, failing run 139, restore 140.
- R2 reordered same-execution frames. Diff 142, failing run 145, restore 146.
- R2 raised line cap. Diff 148, failing run 151, restore 152.
- R2 newest dropped first. Diff 154, failing run 157, restore 158.
- R2 raised byte cap. Diff 160, failing run 163, restore 164.
- R2 count omitted. Diff 166, failing run 169, restore 170.
- R3 early acknowledgement. Diff 206, failing run 209, restore 210.
- R3 deadline without escalation. Diff 212, failing run 215, restore 216.
- R3 write on the original build. Diff 224, failing run 227, restore 228.
- R3 parser request omitted. Diff 230, failing run 233, restore 234.
- R3 closed sender accepted. Diff 236, failing run 239, restore 240.
- R4 send before Enter. Diff 325, failing run 328, restore 329.
- R4 empty line sent. Diff 332, failing run 335, restore 336.
- R4 nonwriter resize. Diff 339, failing run 342, restore 343.
- R4 unencoded line. Diff 346, failing run 349, restore 350.
- R4 refusal retried. Diff 353, failing run 356, restore 357.
- R4 refusal rendered as success. Diff 360, failing run 363, restore 364.
- R4 unauthorized shown as acceptance. Diff 367, failing run 370, restore 371.
- R5 Alt+4 selected Claude. Diff 392, failing run 395, restore 396.
- R6 retained writer shown. Diff 413, failing run 416, restore 417.
- R6 null token shown as zero. Diff 420, failing run 423, restore 424.
- R6 pending pacing promise. Diff 427, failing run 430, restore 431.
- R7 production importer. Diff 451, failing run 454, restore 455.
- R7 fixture discarded. Diff 458, failing run 461, restore 462.
- R7 invalid bytes visible to the client. Diff 465, failing run 468, restore 469.

## Evidence and limitations

Build log docs/verification/phase-3b-m3-build-log.md · SHA-256 9f6df429036f43e09aefb32c550734c2473e38d99cb8accb5b5f87f1489609ed. Evidence packet docs/verification/phase-3b-m3-evidence.md · SHA-256 6bdc7fa2a766a2f6788cccbc092cfdfcd8fda359c7a114fc4af4c5799020e91b. Six source transcripts are listed in manifest SHA-256 7ac98c8586885f90346b8f6f57b0dae3bd7150e21a64c9bf8d2b419fd533aa8d.

No frame of a real surface has yet been delivered. No real surface has yet received a line. All host exchanges above used disposable stand-ins. The byte injector accepts only the two complete invalid Phase 3A records and queues one at a clean decoder boundary.

The application package does not declare the source dependencies imported by relative path. The base includes supervisor source imports in `apps/madbridge/src/tui/live/composition.ts`, `apps/madbridge/src/tui/live/subscribe.ts` and `apps/madbridge/src/commands/export-evidence.ts`. Composition also imports `packages/adapter-madv-surface/src`. The M3 files below reference package sources by relative path.

- `apps/madbridge/src/tui/live/line-buffer.ts` — `packages/adapter-claude-code/src/live`, `packages/adapter-madv-surface/src/index`.
- `test/phase3b/dispatch-observation.ts` — `packages/adapter-claude-code/src/live`, `packages/adapter-madv-surface/src/index`, `packages/broker/src/pty-host-supervisor`.
- `test/phase3b/dispatch.test.ts` — `packages/broker/src/pty-host-supervisor`.
- `test/phase3b/line-input.test.tsx` — `packages/broker/src/client`.
- `test/phase3b/malformed-observation.ts` — `packages/adapter-madv-surface/src/live.ts`, `packages/broker/src/pty-host-protocol`, `packages/broker/src/pty-host-supervisor`, `packages/supervisor/src/index`.
- `test/phase3b/pacing-settlement.test.ts` — `packages/supervisor/src/index`, `packages/supervisor/src/snapshot-timer`.
- `test/phase3b/producer.test.ts` — `packages/broker/src/in-process-client`.
- `test/phase3b/transport.ts` — `packages/supervisor/src/index`.
- `test/phase3b/unbridged.ts` — `packages/supervisor/src/build`.

## Deviations

Halt 1. The principal-bridge break failed at adapter construction in log 221 before the no-write assertion. Logs 217–222 and the cause review in 241 are inconclusive. The break was restored. Three further breaks ran in logs 223–240 before the cause review found the missed assertion. Their targeted failures and restores stand. Every subsequent break required confirmation of the preceding targeted assertion. The first halt added no round.

Halt 2. The first resume required the principal-bridge break before R4. The second resume transferred it to the Founder, declined a recording-only substitute and let the conditional test-strengthening instruction lapse. R3 code and its tests stood at the ruled commit. This halt added no round.

Declined R3 execution-principal bridge break because it requires implementing and exercising a working cross-principal write to a real PTY host. The Founder owns the break at the last commit.

Halt 3. Run 292 began at load 2.16 after wait 291 had released at 1.96. Four new R4 tests failed. The observation helper reached its 3500 ms deadline twice. The Founder ruled that lowercase mock return and backspace produced no control bytes, placing all four failures under the own-work rule at any load. Run 292 stays failed. The two helper-deadline failures were not Addendum 5 B2 timeouts. The third resume authorized a combined wait and test as one approved command, with separate logs and separate first uptime readings. The corrected run and subsequent waits for tests or evidence used it. The full B2 load rule applied again from the corrected run. This halt added no round.

The early-ack break also produced FixturePreflightFailed:identity_mismatch in log 209. Its own target failed at the acknowledgement assertion. The unbridged test passed on the committed code in 193 and 199 and under the breaks in 215, 233 and 239. In 227 the original build ran and failed at the intended no-write assertion. Log 244 identified several preflight paths that report identity_mismatch. The record does not identify which produced the observation. No additional run was made to investigate it.

The opening remains byte-identical. In its line 1568 a line number, tab and closing brace precede the status for log 028. The entry should read as follows.

028-task-design.log — 13:39  1 user, load averages: 2.34 2.50 2.65 — exit status 0. SHA-256 c3b188d41ff8ccddf0664b934df5d219a9173d4a4cc6761ff99843dc259ff080.

The first R1 zero-sequence break was restored before Bun exited. Logs 085–090 repeated it through test exit and verified restoration. The R2 render test initially checked the focus change too early in log 124. After the test awaited the update, 127 passed. The R3 type check in 195 diagnosed a widened command kind and an envelope input type. Both were fixed in 196 and passed in 197. R4 mock-key and observation corrections in 314 led to five passing tests in 317. R7's incremental type check in 440 found overly narrow inferred types on values assigned by callbacks. The typed observation record in 441 passed compilation in 442 and both tests in 444.

The R5 tests retained historical test titles and opaque fixture execution IDs while updating the rendered surface. R6 uses the existing liveness presentation in both docks and stages. In R7 the seam accepts only the two recorded invalid facts. A real stand-in output wakes the read. The post-handover private madv-surface reason is identified at the executed catch site, alongside the directly observed public cause. R8 uses one evidence entry point and six source files.

Source-inspection log 433 included an incorrect filename for the producer test. Logs 434 and 436 identified the file and read it. Inspection 491 ended with SIGPIPE from a limited display of the attribution script. Its relevant arguments were read in 492 and 494. In 498 the zsh variable path shadowed the shell command search path inside the logging subshell. That inspection exited 127 and lacks an end timestamp. Corrected inspection 499 used a separate variable and exited 0. The host search path was unaffected.

Halt 4. The R8 suite in log 490 passed 2,157 tests. Both failures came from base tests in packages/tui-chaos/test/review-corrections.test.ts. The mixed test at line 174 and layout-only test at line 225 expected the scenario command to exit 0. Its actual exit was 1. The exact grid comparison retained the former dock in two files. The Founder ruled that the files are part of the existing tests under B19. The ruling permits the stamp and the second dock row alone. This halt added no round.

The fourth resume replaced the signed, undelivered resume-m3-4-golden-grids.md, SHA-256 999f8ad1eb43319136f6ee60411da911393aa3f553c304d62c677f3e410f4160, transfer commit 8d350a4d47cab6059ee91a9fcb0caac9b3e27bab. The delivered revision includes the R8 evidence manifest in the resume checks. Logs 521 through 533 verify the prompts, workspace, prior reports, evidence and receipts.

Log 539 exhausted the twenty-minute load wait before the golden update. After the Founder supplied a 1.24 reading, log 540 measured 1.90 and log 541 started at 1.90. The wait did not start Bun. Logs 537 and 541 preserve the expected pre-update failure and the successful update. This load wait added no halt.

An early source search ended unsuccessfully in log 186. The opening records source-read exceptions in 015, 019, 036 and 041. Report check 517 rejected a bracketed excerpt and 518 corrected the excerpt before the fourth halt report was written. The corrected full-run importer inventory in 570 encountered a source Git classified as binary, and 573 encountered a word-boundary expression the Mac grep did not match. The inventory was corrected to request text records and a POSIX call pattern. Log 575 completed the inventory and CLI traversal. Log 588 rejected a draft quotation containing a configuration path literal before appending any text. The quotation omits that source line. These were reporting corrections. No repository source changed during them.

m3-halt-1-report.md · SHA-256 3a6407778d508fea8e62d165a5b84f42ab25c21222a157ee96625162da214302
m3-halt-2-report.md · SHA-256 72d3047839cf01c3339fab1eace2d04498db0143f33208ebbaffd723f87af7ee
m3-halt-3-report.md · SHA-256 2b3b927859e936617abd01c8f302b43344de058e80a36f386e58c9cbf4805d16
m3-halt-4-report.md · SHA-256 8c799d8bfb6f308b15b2cfc7be62b4ce2da0b03565d02365fba843705ce113df

The only computed call in build.ts still opens the iterator on host.handle.facts(). Line 30 of the separation test changed at R1 and R3. Quoted diff lines have trailing whitespace removed.
073-r1-pin.log · SHA-256 81ecc9959c732120b97926cbccb07298f020e64c8247148fddfbf4e507c31210
    diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
    index 6079ae7..e3c7e5b 100644
    --- a/test/phase3a/harness-separation.test.ts
    +++ b/test/phase3a/harness-separation.test.ts
    @@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
         sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
       },
       "packages/supervisor/src/build.ts": {
    -    sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts()[Symbol.asyncIterator]()",
    +    sha256: "1c1a766135f45c7bd1c07799f532fefd6ffdd2fadbe2c587821b233b45aa78bc", call: "host.handle.facts()[Symbol.asyncIterator]()",
       },
     };
190-r3-pin.log · SHA-256 ded6a5258f3100767510fac7df389ccf13018661160bdd61039eee5f013c5228
    diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
    index e3c7e5b..5468f39 100644
    --- a/test/phase3a/harness-separation.test.ts
    +++ b/test/phase3a/harness-separation.test.ts
    @@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
         sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
       },
       "packages/supervisor/src/build.ts": {
    -    sha256: "1c1a766135f45c7bd1c07799f532fefd6ffdd2fadbe2c587821b233b45aa78bc", call: "host.handle.facts()[Symbol.asyncIterator]()",
    +    sha256: "f728e1e37b0e9907f21875b2396eb2e1025718295d9bcfed7b61216ba1271854", call: "host.handle.facts()[Symbol.asyncIterator]()",
       },
     };

Command 570 and closing validation 593 each exited 1 before their logging wrappers wrote the end time and exit footer. Sources 571–575 and 594–596 document the corrections. Log numbers 605 and 606 were reserved for the final wait and test, but a read of the attribution checker took 607 first. The wait and test then took 608 and 609 so numbering advanced. No command or file used 605 or 606. A delivery precheck in 617 counted the coverage table in both the opening and closing sections. Logs 618–619 restricted the extraction to the opening and verified twenty rows. In the baseline, React reported 283 App updates outside act. The corrected full suite reported 301 across ten test files, including the new focus, retained-output and line-input tests. All of those tests passed. The captured warnings are accounted for in log 623.

## Founder delivery

The Founder retains the session-record check and the declined R3 execution-principal bridge break at this head before the guarded B22 command pushes the branch and opens a draft. The Founder runs B21 on both certification hosts. Formal review and every real-surface run remain outstanding.

Role-Id: builder
Actor-Id: session:codex/3b-m3-r1
Execution-Surface: codex
