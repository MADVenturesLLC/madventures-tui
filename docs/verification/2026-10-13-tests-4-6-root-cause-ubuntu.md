# Tests 4 to 6 root cause on the Ubuntu PC: FOUNDER_DECISION_REQUIRED (stopped, no fix)

I found the cause of all three tests. None of them can be fixed within the two test files under the act's B3, so I stopped. I made no branch, commit, push or pull request, and the clone is clean.

## 1. Harness and model
Claude Code; Opus 5.5 (`claude-opus-5-5`).

## 2. Preconditions
| # | Result |
|---|---|
| 1 (as Addendum 2 amends it) | **PASS, case 2.** origin is `https://github.com/MADVenturesLLC/madventures-tui.git`. HEAD is detached at `03dda124e9d6faa59abda6a3817410bcdf1765f8` with a clean tree. origin/main is `3f9b414c0ffcaf6955873f757cb55b97b2de77a1`. The diff from HEAD lists exactly the four paths: `.github/workflows/tui-chaos.yml`, `.github/workflows/verify.yml`, `CONTRIBUTING.md` and `docs/decisions/DEC-20261012-04-macos-runner-migration.md`. |
| 2 | **PASS.** All five hashes match: `e91b25f4fbb0f23101f96793afe3a85951372efbc83148602e38ccb2a873c4f1`, `ec6c39229959f4d3dd0c55ff948caa7d8a98cda1b915ddb2ddc3bf81a68de79b`, `dc284625464eac90b16161b6c204a2e68f03b7a7133de0296cf569b16fde4a9b`, `1880dc7b75f611c68b756ea2f7b00ac1c813ad241d859ea71033154dd2bcc6c0`, `bf598164168443359793854df69a7789e360fc2c8ca4d9fe68eeaf60faa9f939`. |
| 3 | **PASS.** Stock Bun is at `/home/michaeldaley/.bun/bin/bun` (realpath is the same path): 1.4.2, revision `744846f844374847c902b5e7fd59b4342a51ef99`, SHA-256 `a83d263767d839e4d2649ca8e35d07159c7afc99afdc96d731ced29e056dda0c`. The custodied build matches: 1.4.1, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`, SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`. node is `/usr/bin/node`, v22.22.1. |
| 4 | **PASS.** The install exited 0 and `bun.lock` is unchanged (`bf598164…f939`). It turned `packages/founder-act/src/main.ts` to mode 100755 with no content change; I restored 100644 and the tree was clean again. |
| 5 | `Linux 7.0.0-38-generic x86_64`; `PRETTY_NAME="Ubuntu 26.04.1 LTS"`; user `michaeldaley`; `TERM=xterm-ghostty`; standard input is not a terminal. |
| 6 | **PASS.** `daley40-lab` through GH_TOKEN is the active account. An inactive keyring login is also listed; I did not use it. No 401. |

## 3. Reproduction
All 18 runs failed, with exit code 1, 0 pass and 1 fail each, the same as the investigation report.

| Runtime | Test 4 | Test 5 | Test 6 |
|---|---|---|---|
| stock 1.4.2 | 22, 19, 19 ms | 4.01 s ×3 | 4.02 s ×3 |
| custodied 1.4.1 | 26, 21, 21 ms | 4.01 s ×3 | 4.02 s ×3 |

One more run of each test with stock Bun under a pseudo-terminal (`script -qec`) failed the same way. So whether the session has a terminal is not a factor.

First failure output, verbatim. It is the same under both runtimes, apart from the version banner and timings.
- **Test 4:** `error: expect(received).toEqual(expected)` at `pty-host-supervisor.test.ts:1358:26`
  ```
  @@ -1,3 +1,2 @@
    [
  -   "MADV_FIXTURE_MARKER",
      "PATH",
  - Expected  - 1
  + Received  + 0
  ```
- **Tests 5 and 6:** `error: condition not observed within 4000ms` at `waitForCondition (main-guard.test.ts:160:19)`, reached from `waitForFact` at line 170. The test lines are `main-guard.test.ts:362:14` for test 5 and `:482:14` for test 6. Both are the wait for the `exited` fact. Test 6 had already passed its output, `launched` and `ready` assertions.

## 4. Causes

### Test 4: cause found, in the host's awk and the test's oracle as spec §1.5 row 4 defines it
**Cause:** this PC's `/usr/bin/awk` is mawk 1.3.4 20260129 (SHA-256 `438ac087e52c691608650661eaa63e08036a8ac504b69a826a4d722deaa2962d`). When its standard output is a terminal, it switches on its interactive mode ("line-buffered input"). Every file is then read as lines, whatever `RS` is set to, and each read stops at the first NUL. In the test, awk's standard output is the `Bun.Terminal` PTY. So the NUL-separated contents of `/proc/self/environ` arrive as one record that ends after `PATH=…`, and only `PATH` is emitted.

Hypotheses I tested, in order:
1. **awk treats `RS="\0"` as paragraph mode: refuted.** Run without a terminal, the same program prints `PATH,MADV_FIXTURE_MARKER` (`NR=2`) and `A,B,C` (`NR=3`) for a test file.
2. **A terminal changes how awk reads: confirmed.** The same commands under `script` give `PATH,` with `NR=1`, and `A,` with `NR=1`.
3. **Which stream triggers it: standard output.** Terminal stdin with stdout sent to a file gives `NR=3`. Stdin from `/dev/null` with terminal stdout gives `NR=1`.
4. **Changes that stay within awk: refuted.** Under a terminal, none of these work: `split()` inside the record, `getline < "/proc/self/environ"`, or the `-W posix` and `-W traditional` options. `-W noninteractive` and `-W binary` are rejected as "vacuous option".
5. **The forwarding chain itself is correct: confirmed.** As a temporary diagnostic I set `isLinux = false`, which makes Linux use the macOS ENVIRON oracle. Test 4 then **passed** with the custodied binary.

**Where it lies:** an operating-system package of the supported Linux profile, together with the test's oracle. Spec §1.5 row 4 fixes that oracle as "`/usr/bin/awk` reading `/proc/self/environ`".

**Minimal fix:** a different Linux oracle. For example, ENVIRON is clean under mawk; earlier probes found it injects keys under gawk. Any such change alters operating-system branch row 4, which "requires a Founder act that amends this table before the change lands". So it is outside B3.

**Relation to CI (inference only):** ubuntu-24.04 ships mawk 20240123, the version the drafting assistant's container showed working. I have no access to the runner to confirm this.

### Tests 5 and 6: cause found, in Bun (PR 40304) and in how the test picks the host's runtime
**Cause:** `spawnLiveHost` starts the PTY host as `Bun.spawn(["bun", MAIN_ENTRY, …])` (`main-guard.test.ts:118`). That `bun` is the one on `PATH`, which on this PC is stock 1.4.2. So the "custodied" runs above still ran the host under stock Bun.

Under stock Bun on Linux, `Bun.Terminal`'s `exit` callback never fires when a detached child exits on its own. The host's natural-exit path (`main.ts`, the `await_pty` branch) then gives up through `awaitPtyClosure(…, 3000)`. It fails closed: it writes to stderr, exits 1, and emits neither `drained` nor `exited`.

Evidence:
- **Diagnostic in the test:** spawning the host with `process.execPath` makes tests 5 and 6 **pass 3 of 3** with the custodied binary, in 19 to 22 ms. With stock Bun they still fail at 4.01 and 4.02 s.
- **Driving the host directly** with a script under `/tmp` that launches `/bin/sh -c 'echo M; exit 7'`:
  - Stock host: `{"ms":3016,"hostExit":1,"kinds":["launched","ready","output"],"stderr":"pty-host: pty closure failure: PTY did not close within 3000ms\n"}`
  - Custodied host: `{"ms":14,"hostExit":0,"kinds":["launched","ready","output","drained","exited(7)"],"stderr":""}`
- **Why CI passes:** the CI action puts the custodied build on `PATH`, so the host there gets the fix. The "factor of the PC" in A3 of the act, for tests 5 and 6, is that the `bun` on this PC's `PATH` is stock.

**Where it lies:** the root cause is in Bun (the fix of PR 40304 is missing from 1.4.2), and production code depends on it. The test file only decides which Bun runs the host.

## 5. The PR 40304 answer
**Yes. Tests 5 and 6 depend on the fix, and so does production.**

What the diff shows:
- On POSIX, the PR sets `OWNS_TERMINAL` for a `detached` child of an existing `Terminal`. That child's exit then tears down the PTY slave, so the `exit` callback fires.
- It also turns a Linux EIO on the master into a clean exit status (`on_reader_error`).

`spawnGoverned` (`terminal.ts`) is exactly that case: an existing `Bun.Terminal` with `detached: true`. And `makeSessionCloser`'s natural-exit branch needs `ptyClosed` to settle within `PTY_CLOSE_WAIT_MS`.

This is a dependency of the production natural-exit path, not only of the tests. My direct run of the real `packages/pty-host/src/main.ts` under stock 1.4.2 fails closed, with host exit 1 and no `exited` fact.

**Supports:** the stock host times out at 3016 ms, the custodied host completes in 14 ms, and the result flips only when the host's runtime changes.

**Would refute it:** a stock 1.4.2 host completing a natural exit on Linux, or the custodied host failing it. I saw neither.

Note: the PR head is now `7f7156bf8ca03e8343f24f1e815af0701a0364db`. The custodied build is the earlier anchor `69cb78c9…`, and I did not compare the two.

**Addendum 1 (MacBook) comparison:**
- **Test 4:** unrelated. macOS takes the ENVIRON branch, not `/proc` with mawk.
- **Tests 5 and 6:** they agree with my explanation but are not evidence for it. The PR text says macOS revokes the PTY in the kernel when the session leader exits, so stock 1.4.2 would fire the callback there, while Linux needs the fix.

## 6. Decision
**STOP AND REPORT.**
- Test 4's fix would change the operating-system branch of spec §1.5 row 4, which needs a Founder act.
- The root cause of tests 5 and 6 is in Bun and is a dependency of production code.

Both fall under B3's "the cause or the fix lies anywhere else" (the spec, Bun, production code). B3 also allows no partial fix.

## 7. Proposed patch (not committed)
This change to `packages/pty-host/test/main-guard.test.ts`, at lines 73 and 118, runs the host on the same runtime as the test:
```diff
-  const proc = Bun.spawn(["bun", MAIN_ENTRY, ...args], {
+  const proc = Bun.spawn([process.execPath, MAIN_ENTRY, ...args], {
```
With it, tests 5 and 6 pass 3 of 3 with the custodied binary and still fail with stock Bun. It changes no assertion or timeout. It does not fix the dependency on Bun, so it would only make the suite say honestly which runtime it tested.

Test 4 has no proposed patch inside the two files that keeps spec row 4. ENVIRON on Linux passes here, but it needs a §1.5 amendment.

## 8. Diagnostics, all reverted
1. `pty-host-supervisor.test.ts`: `isLinux = false`, reverted with `git checkout`.
2. `main-guard.test.ts`: `process.execPath` at lines 73 and 118, reverted with `git checkout`.

Probe scripts and outputs are in `/tmp/b3rc/`, outside the clone. Final `git status --porcelain` is empty, and HEAD is `03dda124e9d6faa59abda6a3817410bcdf1765f8`.

## 9. Executed versus only read
**Executed:** everything above.

**Read only:** the act, the investigation report, DEC-20261011-02 A2 and A3, spec §1.5, `terminal.ts`, the natural-exit path of `main.ts`, and the PR 40304 diff through `gh api`.

**Not run**, because there was no fix:
- `test/phase3a` and the full suite
- `tsc`
- the build gate and the attribution-shape check
- any CI

## 10. Deviations
- The first stop on precondition 1 was later cleared by Addendum 2.
- The probe scripts I wrote under `/tmp` ran `/usr/bin/env -i` with two fixed variables to launch awk. This is not the `env` that prints the environment, and nothing printed a value.

Otherwise none.

## 11. Next decision for the Founder
The B6 act has to rule on the certification runtime. On Linux, the production natural-exit path fails closed under stock Bun 1.4.2, and passes only with a Bun that carries PR 40304. The same act could also amend spec §1.5 row 4 to give test 4 a Linux oracle that works when awk's output is a terminal, and authorize the `process.execPath` test change.
