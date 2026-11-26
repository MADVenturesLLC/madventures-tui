## Phase 3B M2

Offline implementation and evidence under DEC-20261125-01 at `6b3a38365854ed39a4bd291be1d48d5045cd109e` on `build/3b-m2-r1`. Binding base `c383353885abb526a5471ef764be3cffc558a6ff`. The full run and the final-head gates both passed.

R1 · B16 and B19 items 3–4. BrokerSnapshot and LedgerEntryProjection in types.ts retain absence. useBrokerState carries the connection through and starts disconnected. StatusBar, buildStatusLine and the writer helpers distinguish unknown connection, ownership and token values. GovernancePane distinguishes absent collections from present empty collections. The identity, ClaudePane, AntigravityPane, DockStrip, IncidentBand and EventLog readers show the applicable UNKNOWN or em dash. The full suite exercised present-value rendering and the original NOCONN entry point.

R2 · B15–B16 and B19 items 1–2. clientSnapshotToProjection checks the complete client shape, including nested rows, enum values and the discriminated ownership variant. approvalColor maps approval state. Errors name the member and fault. The pinned table includes sender-released. The signed resume governs repositoryFingerprint and the type-specific empty cases.

R3 · B17 and B19 item 5. waitForSnapshotTick uses the named 100 ms interval and settles on cancellation. This caps continuous pulls at roughly ten per second while preserving prompt updates. The package index exports the wait beside the live port.

R4 · B17 and B19 item 5. subscribeToClient reads immediately, then waits between pulls. It compares mapped projections, delivers the closed projection and ends delivery on failure or unsubscribe. App’s existing subscribe prop was sufficient. The separate B4 correction narrows an indexed first frame in its new test after the test checks the length and connection.

R5 · B8, B18 and B19 item 7. liveFailureCause accepts child_exited and host_exited. reportFailure maps them to child_failure and pty_host_failure after activation and preserves reattestation_failed detail before activation. Both consume loops distinguish a drained fact, a child exit and fact-stream EOF after handover. Exited facts retain parser, reader or registration causes. The shared test harness observes actual build failures and durable interruption or Founder-close rows.

R6 · B5 and B19 items 8–9. Two Claude wire tests exercise an unregistered retry error against the installed rules. Eighteen madv cases exercise every mapped status, an unknown status and a signal on both sides of real build activation. The target attester consumes synthetic wire facts through the public live port. Tests observe its reported cause and the build result.

R7 · B19 items 6–7 and B21. recordOfflineFrames takes every sample from the presented client, persists it, reloads it and renders builder, governance and event views. child-ends.ts records the build cases. The evidence packet cites the 18 source files and the source manifest. No test fabricates a pre-activation or disconnected snapshot.

## Changed paths

| Path | Change |
|---|---|
| apps/madbridge/src/tui/components/DockStrip.tsx | DockStrip writes the absent writer token as an em dash. |
| apps/madbridge/src/tui/components/EventLog.tsx | EventLog formats a null row token with an em dash. |
| apps/madbridge/src/tui/components/IncidentBand.tsx | IncidentBand preserves an absent token. |
| apps/madbridge/src/tui/components/StatusBar.tsx | StatusBar, buildStatusLine and writer formatting carry nullable connection, ownership and token. |
| apps/madbridge/src/tui/components/agent-identity.ts | livenessWord and identity lookups distinguish an unknown connection. |
| apps/madbridge/src/tui/hooks/useBrokerState.ts | The hook carries nullable connection state. |
| apps/madbridge/src/tui/live/projection.ts | clientSnapshotToProjection, approvalColor and the shape checks implement B16. |
| apps/madbridge/src/tui/live/subscribe.ts | subscribeToClient drives paced getSnapshot reads and unsubscription. |
| apps/madbridge/src/tui/panes/AntigravityPane.tsx | The execution pane displays an absent writer token. |
| apps/madbridge/src/tui/panes/ClaudePane.tsx | The execution pane displays an absent writer token. |
| apps/madbridge/src/tui/panes/GovernancePane.tsx | The governance projection distinguishes unknown ownership, executions, transfers and permissions. |
| apps/madbridge/src/tui/types.ts | BrokerSnapshot and LedgerEntryProjection admit the specified null members. |
| apps/madbridge/test/tui-projection.test.tsx | Narrow the fourteen compiler-reported nullable reads. |
| docs/verification/phase-3b-m2-build-log.md | Record the commission, task detail, receipts and results. |
| docs/verification/phase-3b-m2-evidence.md | Cite offline source transcripts and rendered frames. |
| packages/adapter-claude-code/src/live.ts | attestClaudeSession and consume preserve reader finish and distinguish exit from EOF. |
| packages/adapter-claude-code/test/retry.test.ts | Test unregistered retry errors on both sides of handover. |
| packages/adapter-madv-surface/src/live.ts | attestMadvSession and consume preserve parser and registration causes and distinguish exit from EOF. |
| packages/adapter-madv-surface/test/exit-causes.test.ts | Test attester exit classification at both build stages. |
| packages/adapter-madv-surface/test/live.test.ts | Expect host_exited after the madv encoding test stream ends. |
| packages/supervisor/src/build.ts | liveFailureCause and reportFailure implement the two terminal causes. |
| packages/supervisor/src/index.ts | Export waitForSnapshotTick. |
| packages/supervisor/src/snapshot-timer.ts | Provide the abortable pacing wait. |
| packages/supervisor/test/snapshot-timer.test.ts | Exercise the interval and cancellation. |
| scripts/phase3b/child-ends.ts | Record build-level exit observations. |
| scripts/phase3b/recorded-frames.tsx | recordStream, render and recordOfflineFrames capture and present the healthy run. |
| test/phase3a/harness-separation.test.ts | Repin build.ts at line 30. |
| test/phase3b/absence.test.tsx | Render actual UI components and compare unknown and empty inputs. |
| test/phase3b/child-end.test.ts | Assert terminal causes and Founder close at the build and isolated drains in both monitors. |
| test/phase3b/child-end.ts | observeChildEnd reads the actual build result and durable closure. |
| test/phase3b/end-stand-in.ts | attestationEvents and the private executable produce registered wire shapes and controlled exits. |
| test/phase3b/m2-offline.ts | prepareM2 installs only disposable executables and capability records. |
| test/phase3b/projection.test.ts | Pin table outputs and validate rejected unknown shapes. |
| test/phase3b/recorded-frames.test.tsx | Verify recorded client data and scripted views. |
| test/phase3b/snapshot-input.ts | Supply synthetic client inputs for projection tests. |
| test/phase3b/subscribe.test.ts | Exercise sequence, closure, faults and cancellation. |

## Evidence

Build log SHA-256 `5daf3959fe98858d6a9dcb2c2b033f462011318ec2ca5ab7dacb3cf3ae56c727`. Evidence packet SHA-256 `0fff814b75bd1c105542772dd407572a256dd6e4d966559033cbb4799c2bc973`. The 18 source artifacts are recorded in the external evidence manifest, SHA-256 `5b262e643fee404f1ca88f922bec3e8e308d44bc287ab5104266aa6833e24e31`.

The healthy stream captured active, closing and closed phases. The final post-close read rejected. The rendered views and sixteen build-level terminal observations are tied to their raw sources in the packet.

## B22 at the closing commit

507-gate-runtime.log · da06d955a4ecf05eb1ea40996d0fcf0499a170a224c56ce9cd77457dffddec1c · Thu Nov 26 16:39:33 UTC 2026 to Thu Nov 26 16:39:33 UTC 2026 · 11:39  up 5 days,  3:07, 1 user, load averages: 1.80 2.26 2.23 · exit 0

509-gate-install.log · 052d93e4012cf61b45f994a292b6261447a133825378e797231369c980498685 · Thu Nov 26 16:42:10 UTC 2026 to Thu Nov 26 16:42:10 UTC 2026 · 11:42  up 5 days,  3:09, 1 user, load averages: 1.54 2.02 2.13 · exit 0

~~~text
Checked 87 installs across 131 packages (no changes) [9.00ms]
~~~

510-gate-lock-check.log · 0b1edadd95fa4ca70ee9da551355764f21b9886125b7144cd3d02a361c5fc236 · Thu Nov 26 16:42:10 UTC 2026 to Thu Nov 26 16:42:10 UTC 2026 · 11:42  1 user, load averages: 1.54 2.02 2.13 · exit 0

TypeScript completed without diagnostics. 512-gate-types.log · 18496df67aae75b33fa001963d440c2f8058c54dd010dfb298b9117ef62cce97 · Thu Nov 26 16:43:25 UTC 2026 to Thu Nov 26 16:43:29 UTC 2026 · 11:43  up 5 days,  3:11, 1 user, load averages: 0.84 1.71 2.00 · exit 0

513-gate-suite-runtime.log · e7c4df79454407f5e9fcd0241e0b6f785b31c5c3d94230ea0e6d3aeb47fbefb1 · Thu Nov 26 16:43:31 UTC 2026 to Thu Nov 26 16:43:31 UTC 2026 · 11:43  up 5 days,  3:11, 1 user, load averages: 1.01 1.73 2.01 · exit 0

515-gate-suite.log · 41116afdf1ff5faa85f10438b1ae5aae87b5196f046f32f673449bbd5c470131 · Thu Nov 26 16:53:09 UTC 2026 to Thu Nov 26 16:57:39 UTC 2026 · 11:53  up 5 days,  3:20, 1 user, load averages: 1.32 1.61 1.78 · exit 0

~~~text
 2139 pass
 0 fail
 28426 expect() calls
Ran 2139 tests across 168 files. [269.82s]
~~~

Logged waits · 506-gate-runtime-load.log · b0f15aed3bf14934263529e80320ccaffac29ed9ee5500d41b08a17f6fc093c6 · 508-gate-install-load.log · 1ceb17b82dc042d25b1e909658d93d372c4bbeff4629a3d7e78e085dfc618b6f · 511-gate-types-load.log · b8a923db49a1a300322ee7abdeb346d7c87ad336b00a352568a9cef2a7a272d8 · 514-gate-suite-load.log · 73b378b16158e058bf544ec546b7858c952391d7d9b71ae3aa8e7bff3b747b6b

The baseline and head verdict lists compare by file, full name and multiplicity. 518-gate-compare.log · e948c0f2edbac11361dcd2f8266c5347f0480a49cbe4fe9dcc2bdb1c715b0a41.

~~~text
Every one of 2089 baseline tests passed under its original file and name.
Tests: 2089 + 50 = 2139.
Files: 160 + 8 = 168.
Failed 0, skipped 0, todo 0.
~~~

## Test coverage

| B19 item | New file | Passing test |
|---:|---|---|
| 8 | packages/adapter-claude-code/test/retry.test.ts | an unregistered api_retry error preserves the active monitor |
| 8 | packages/adapter-claude-code/test/retry.test.ts | an unregistered api_retry error preserves the attestation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 0 gives child_exited after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 0 gives identity_unavailable before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 1 gives provider_error after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 1 gives provider_error before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 3 gives identity_unavailable after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 3 gives identity_unavailable before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 4 gives identity_mismatch after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 4 gives identity_mismatch before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 42 gives provider_error after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 42 gives provider_error before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 5 gives auth_failed after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 5 gives auth_failed before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 6 gives endpoint_refused after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 6 gives endpoint_refused before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 7 gives model_refused after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv code 7 gives model_refused before activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv signal gives provider_error after activation |
| 9 | packages/adapter-madv-surface/test/exit-causes.test.ts | madv signal gives provider_error before activation |
| 5 | packages/supervisor/test/snapshot-timer.test.ts | the snapshot wait paces reads and settles promptly on cancellation |
| 3 | test/phase3b/absence.test.tsx | a null connection is unknown in bars, panes and docks |
| 4 | test/phase3b/absence.test.tsx | a null token stays absent in writer, incident and session_open frames |
| 3 | test/phase3b/absence.test.tsx | absent execution and ownership facts stay absent and queue depth stays hidden |
| 3 | test/phase3b/absence.test.tsx | governance distinguishes unknown transfers and permissions from empty collections |
| 7 | test/phase3b/child-end.test.ts | Founder close on the active composition records no interruption |
| 7 | test/phase3b/child-end.test.ts | claude-code before activation reports child_exited |
| 7 | test/phase3b/child-end.test.ts | claude-code before activation reports host_exited |
| 7 | test/phase3b/child-end.test.ts | claude-code clean exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | claude-code drained alone leaves the monitor active |
| 7 | test/phase3b/child-end.test.ts | claude-code host end records pty_host_failure |
| 7 | test/phase3b/child-end.test.ts | claude-code malformed partial line records identity_mismatch |
| 7 | test/phase3b/child-end.test.ts | claude-code nonzero exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | claude-code signalled exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface before activation reports child_exited |
| 7 | test/phase3b/child-end.test.ts | madv-surface before activation reports host_exited |
| 7 | test/phase3b/child-end.test.ts | madv-surface clean exit records child_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface drained alone leaves the monitor active |
| 7 | test/phase3b/child-end.test.ts | madv-surface host end records pty_host_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface malformed partial line records identity_mismatch |
| 7 | test/phase3b/child-end.test.ts | madv-surface nonzero exit records adapter_failure |
| 7 | test/phase3b/child-end.test.ts | madv-surface open tool records identity_mismatch |
| 7 | test/phase3b/child-end.test.ts | madv-surface pending request records identity_mismatch |
| 2 | test/phase3b/projection.test.ts | the mapper rejects unknown shapes without disclosing supplied values |
| 1 | test/phase3b/projection.test.ts | the pinned table maps every broker member and declared phase and ownership kind |
| 6 | test/phase3b/recorded-frames.test.tsx | the healthy offline client's recorded stream renders activation through Founder close |
| 5 | test/phase3b/subscribe.test.ts | a first failure gives no projection |
| 5 | test/phase3b/subscribe.test.ts | mapping and read failures end delivery from the last projection |
| 5 | test/phase3b/subscribe.test.ts | subscription gives the first, changed and closed projections exactly once |
| 5 | test/phase3b/subscribe.test.ts | unsubscribe cancels pacing and suppresses in-flight delivery |

## Existing tests

B20 and EXISTING TESTS item 2 permitted only the compiler-reported non-null assertions in apps/madbridge/test/tui-projection.test.tsx at lines 152, 154–155, 173–179, 209–211 and 377. Item 3 changed only line 52 of packages/adapter-madv-surface/test/live.test.ts to expect host_exited at EOF after handover. Item 1 changed only line 30 of test/phase3a/harness-separation.test.ts. No assertion or expected value was otherwise removed or weakened. The baseline and head name comparison includes all three files.

## Deliberate breaks

All 50 additions failed at least one targeted break. All 26 restores matched their committed SHA-256. The build log gives each diff, isolated file’s outcomes and restore receipt.

| Deliberate break | Diff / red run / restoration | Failed tests in the isolated file |
|---|---|---:|
| transfers-diff | 131 / 134 / 135 | 1 |
| permissions-diff | 136 / 140 / 141 | 1 |
| connection-diff | 142 / 145 / 146 | 1 |
| ownership-diff | 147 / 150 / 151 | 1 |
| row-token-diff | 152 / 155 / 156 | 1 |
| sender-diff | 172 / 175 / 176 | 1 |
| kind-diff | 177 / 180 / 181 | 1 |
| interval-diff | 196 / 199 / 200 | 1 |
| duplicate-diff | 213 / 216 / 217 | 1 |
| closed-diff | 218 / 221 / 222 | 1 |
| after-failure-diff | 223 / 226 / 227 | 1 |
| first-failure-diff | 228 / 231 / 232 | 1 |
| unsubscribe-diff | 233 / 236 / 237 | 1 |
| child-map-diff | 321 / 324 / 325 | 4 |
| claude-eof-diff | 326 / 329 / 330 | 2 |
| madv-eof-diff | 331 / 334 / 335 | 2 |
| claude-drain-diff | 336 / 339 / 340 | 5 |
| madv-drain-diff | 341 / 344 / 345 | 5 |
| claude-finish-diff | 346 / 349 / 350 | 1 |
| madv-finish-diff | 351 / 354 / 355 | 4 |
| early-cause-diff | 356 / 359 / 360 | 6 |
| founder-close-diff | 361 / 364 / 365 | 1 |
| retry-match-diff | 378 / 381 / 382 | 2 |
| exit-six-diff | 383 / 386 / 387 | 2 |
| exit-dispatch-diff | 388 / 391 / 392 | 18 |
| frame-break-diff | 435 / 438 / 439 | 1 |

## Deviations

The first halt preceded all edits. The Founder upheld it and issued the repositoryFingerprint interpretation in the signed resume. Halt report m2-halt-1-report.md SHA-256 f142dce9b2aa8e0ffe5702ede8deebbbcdf63a1ef2022d230d82172e82c541bb. Log 067 SHA-256 eadbcf61ed99cd20ec86b1eb049a972ec3847aa96f84a11e038de0aa1e1373b3. Resume SHA-256 f9f431738c29b2fea9b485d779fb9f4540c70d4553e55e3ee999dd6425eda3d0. This added no review round.

B19 item 6 begins with the first snapshot from the presented client. The composition supplies that client only after activation and closes the ledger after closing the client. All four recorded samples were connected. Founder close completed and the post-close read rejected. The evidence gives the observed ending without inventing a disconnected frame.

The permission-rendering break exhausted its first 20-minute load wait in log 138. The Founder reported two quiet readings. Log 139 released the run at 1.93. All 26 deliberate breaks were performed.

The R5 fixture gained an exit witness for the macOS single-child state probe. The witness first establishes its original parent under the disposable root and then observes kernel reparenting. The private executable answers only for that exact PID and fails closed otherwise. It enumerates no processes. Log 302 shows ENOENT for the absent utility in the original approved PATH. No production host, private configuration or registration changed.

The Founder-close break routes the active composition through a real interruption, producing a durable counterexample. Removing only a phase check could leave the broker’s closing-state transition guard in effect. The two exit-cause tests became per-stage and per-status cases. R6 also broke the whole exit dispatch to demonstrate all eighteen cases individually. R7 additionally uses React act for delivering replayed samples, publishes the rendered files together, and records completion of Founder close independently of the availability of a post-close snapshot.

The install set the executable bit on packages/founder-act/src/main.ts. Each restoration first compared its blob with HEAD. bun.lock retained SHA-256 a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830. The test output included a React act warning during frame setup. The rendered snapshots and their assertions passed.

R4’s new comparison spread an indexed projection that TypeScript considered optional. The same diagnostic appeared in log 308. The command’s initial one-minute load was 1.41. Commit 53c80aad02ac89131d7a0bcd8188ae1c66653902 added a non-null assertion at line 68 after the existing length and connection assertions. The D3 restart began at log 457. Frozen install, type check and bare suite passed.

DEC-20261024-01 B2 · packages/supervisor/src/build.ts changed from 50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d to 0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553 in cbf123a6e2285b5ff4a470cb4da449d5ce10ea0b. Only line 30 of the separation test changed. Its single allowed call, host.handle.facts()[Symbol.asyncIterator](), is unchanged. No exception was added.

Quoted diff with trailing whitespace removed. 472-full-pin.log · 1dd0467fe7fd5c300beaeb064b8f55344a07bf433a1514ce4611bafea3eed869.

>     diff --git a/test/phase3a/harness-separation.test.ts b/test/phase3a/harness-separation.test.ts
>     index 326687a..6079ae7 100644
>     --- a/test/phase3a/harness-separation.test.ts
>     +++ b/test/phase3a/harness-separation.test.ts
>     @@ -27,7 +27,7 @@ const EXCEPTIONS: Readonly<Record<string, { sha256: string; call?: string }>> =
>          sha256: "9210012a505848a7379ab7b9cf9d840f33197de58f85b23c359653760479c603", call: "PAYLOAD_SHAPE[knownType](payload)",
>        },
>        "packages/supervisor/src/build.ts": {
>     -    sha256: "50074c2fc50b12cf2083a87c5d71bf665d3241ba1c2f5f37d5e922dfaa67db8d", call: "host.handle.facts()[Symbol.asyncIterator]()",
>     +    sha256: "0b329d97e88a13bd58902fe7dd1afe971d52c61bbf310862230465fd1fdd3553", call: "host.handle.facts()[Symbol.asyncIterator]()",
>        },
>      };
>

## Limitations and Founder work

No snapshot of a real surface has yet been projected. A caller holds no client before activation. The client’s execution snapshot carries no B8 exit observation. The adapter retains the supervisor’s relative import under plan §2D item 5.

No live call was made. No real surface was run. No real key was used. No Founder configuration folder was read. No capability record was written or renewed outside a disposable storage root created by a test or evidence script. No request left the host other than any package downloads of the frozen install. The builder made no GitHub call.

The Founder’s check of this session record, the guarded draft push, the Founder’s B22 runs on both certification hosts, PR verification and independent review are pending. There are no declined breaks. Every live run remains outside this slice.

Role-Id: builder
Actor-Id: session:codex/3b-m2-r1
Execution-Surface: codex
