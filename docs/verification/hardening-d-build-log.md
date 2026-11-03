# Hardening D build log

Authority: DEC-20261103-01 B6, DEC-20261013-03 B2 item 2 and B4,
DEC-20261102-02 B3 and B4, DEC-20261102-04 A4, and DEC-20261023-01
Part B. Builder: session:claude-code/hardening-d-r1, role builder,
execution surface claude-code, on the Founder's Ubuntu PC. No GitHub
operation, MCP server, other agent, subagent, skill, plugin, memory
lookup or host installation was used. The only network commands were
`git fetch origin main` and `bun install --frozen-lockfile`.

Logs are under `/home/michaeldaley/builds/hardening-d-r1-pr/logs/` on the
Ubuntu PC, one file per run. The first line of each log is the `uptime`
reading taken immediately before the run; the rest is the run's full
output through `tee`. Exit statuses are those of the command itself.

## Preconditions and baseline

Working directory `/home/michaeldaley/builds/madventures-tui-hardening-d-r1`,
branch `build/hardening-d-r1`, HEAD and fetched `origin/main` both
`6010de734d82ddebfc68ba0d75c8d4b65ec0e095`, so no path changed between
them. The tree was clean and this log did not exist. Git identity
`daley40-lab`, `293512385+daley40-lab@users.noreply.github.com`.

On `origin/main` every authority file has the SHA-256 the builder prompt
gives: DEC-20261103-01 `43dc423e060b0e7ae04a0e7a0c302a5e38497cc212d704a5a37421d78aa1dd3a`,
DEC-20261013-03 `249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7`,
DEC-20261102-02 `04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550`,
DEC-20261102-04 `313bfedb64c0ff1eca5fa65024385bd3fc6400a63b3f616a1994de519fbffab2`,
DEC-20261023-01 `bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5`,
the plan `400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2`,
the spec `c09fe4849a4a61bf3e1494b77267020e00bd1d7b3015e3b2332ec5d71b07f769`
and `AGENTS.md` `0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca`.
Each act has Status ISSUED and the Founder's signature.

Host: `uname -sm` prints `Linux x86_64`. `/usr/bin/awk` resolves to
`/usr/bin/mawk`, `mawk 1.3.4 20260129`. `/usr/bin/cut` resolves to
`/usr/lib/cargo/bin/coreutils/cut`, `cut (uutils coreutils) 0.10.0`
(package rust-coreutils 0.10.0-1ubuntu2~26.04.1). The host also has GNU
cut as `/usr/bin/gnucut`, `cut (GNU coreutils) 9.7`.

Runtime check (command -v bun, sha256sum of it, bun --version and
Bun.revision, under the per-command PATH of DEC-20261013-03 B4): every
check returned `/home/michaeldaley/ubuntu-b7-custody/qrt/bun-linux-x64/bun`,
SHA-256 `0ff409d2612304b9109f78c3498c685e29f67589b5f7ed60bae23ae10dcd58bb`,
version `1.4.1`, revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`.
It ran at the start, before the baseline, before the baseline bare
`bun test`, and before item 1's first test run.

`bun.lock` SHA-256 before and after install:
`34224c0133c44d967c4a4da8b75bf11093c573c47e42bcaf502c6d6f61c3e7c0`.
Install set the executable bit on `packages/founder-act/src/main.ts`;
`git checkout` restored it once. That is not a finding.

Baseline, each once, in the foreground:

| Command | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- |
| `bun install --frozen-lockfile` | 0.02 | 0 | 53 packages | `4a786e21d8242f3d15daa69c9f521297be8b9481ff5ce9ce30a58e0d70aaa471` |
| `bun x tsc --noEmit` | 0.02 | 0 | clean | `e074e1a966db2abb9a0be90decc6c82d1be3a621320f8ff74c36db50e5eb7e03` |
| `bun test packages/broker` | 0.02 | 1 | 306 pass, 1 fail | `9e980794004689ea77c839117eae16c617d25ab72528ccc4a77e560eceb9efba` |
| `bun test packages/pty-host` | 0.01 | 0 | 49 pass, 0 fail | `0f753e86f8f2183c774a0cf59a915c87c8393e2c90a669a2093ddc64266d4239` |
| `bun test test/phase3a` | 0.01 | 0 | 152 pass, 0 fail | `5c38525b4a534598ed916371c658e42eda58fe9c90751275f1a37d29b1fb9666` |
| bare `bun test` | 0.24 | 1 | 1895 pass, 1 fail | `546aa9b3118a0a80ee9001c5eb24477164e9228e9d8bb90d588e6fd0c6d20400` |

Both failures are the one DEC-20261103-01
A4 records, "governed-child environment forwarding: exact key-set equality
with the launch-frame env, ambient canary absent (C7 evidence 7)":
`expect(observedKeys).toEqual(expectedKeys)` at
`packages/broker/test/pty-host-supervisor.test.ts:1364`, expected
`MADV_FIXTURE_MARKER` and `PATH`, received only `PATH`. The ordering-race
test of item 2 passed in both baseline runs that include it.

## Item 1: test 4 (DEC-20261103-01 B6 item 2)

Built on commit `6010de734d82ddebfc68ba0d75c8d4b65ec0e095`.

Files changed:
- `packages/broker/test/pty-host-supervisor.test.ts`, only the Linux
  branch of the environment-forwarding test.
- `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`,
  only the Linux cell of section 1.5 row 4.
- `docs/verification/hardening-d-build-log.md` (new).

### Reliance at the base

`packages/broker/test/pty-host-supervisor.test.ts:1302-1312` at the base:
the fixture was `/usr/bin/awk` on both platforms; the Linux program was
`BEGIN{RS="\\0"; s=""} {i=index($0,"="); if(i>0) s = s substr($0,1,i-1) ","} END{print "@@MADV_ENVKEYS " s "@@"; system("sleep 2")}`
with argv `[linuxProgram, "/proc/self/environ"]`; the macOS program was
`BEGIN{s="";for(k in ENVIRON) s=s k ",";print "@@MADV_ENVKEYS " s "@@";system("sleep 2")}`.
Lines 1343-1354 scanned `output` facts for `@@MADV_ENVKEYS ...@@` within
an 8000 ms deadline; lines 1362-1376 hold the assertions; the test
timeout is 25000 ms. Spec section 1.5 row 4 (line 206) named the Linux
oracle "`/usr/bin/awk` reading `/proc/self/environ`". The Linux program's
`system("sleep 2")` started `/bin/sh`, which the item forbids.
`packages/pty-host/src/main.ts:479-490`: on a child's own exit the host
awaits PTY settlement, closes output, then emits `drained` and `exited`,
so every `output` fact precedes `drained`.

### Change

The Linux fixture is `/usr/bin/cut` with argv
`-z -s -d = -f 1 /proc/self/environ`: it reads the kernel environment
block as NUL-terminated records, skips any record without `=`, and prints
each record's text before its first `=`, NUL-terminated. It is not an
interpreter, starts no shell or other process, and emits key names only.
It prints no marker, so on Linux the read loop takes the key list when the
host's `drained` fact arrives: the accumulated output split at NUL,
empty entries dropped, joined with commas into `markerPayload`. Every
assertion, the 8000 ms read deadline and the 25000 ms test timeout are
unchanged. The macOS program and argv are byte-identical. The shared
`fixture` declaration now dispatches on `isLinux`, declared one line
earlier, and keeps `/usr/bin/awk` for macOS. Comments describing the
oracle were updated. Spec section 1.5 row 4's Linux cell now reads
"`/usr/bin/cut -z -s -d = -f 1 /proc/self/environ`, emitting
NUL-terminated key names, read until the host's `drained` fact"; no other
byte of the spec changed.

### Runs

| Run | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- |
| Failing run: baseline `bun test packages/broker` at the base | 0.02 | 1 | test 4 fails, only `PATH` seen | `9e980794004689ea77c839117eae16c617d25ab72528ccc4a77e560eceb9efba` |
| Failing run: baseline bare `bun test` at the base | 0.24 | 1 | test 4 fails, only `PATH` seen | `546aa9b3118a0a80ee9001c5eb24477164e9228e9d8bb90d588e6fd0c6d20400` |
| Test 4 alone after the change (`-t "governed-child environment forwarding"`) | 0.09 | 0 | 1 pass | `df4e3cd1fa9085f86cd58c5bb143c5eb35cfa468986f0a7adc5e72abb26874b6` |
| Test 4 alone under the leaked-key break | 0.08 | 1 | 1 fail, extra key `MADV_HARDENING_D_BREAK` | `96569da9491ad4816f03498ea909fe5ce246dc614ac021e81efcd5cb20ecbce1` |
| Test 4 alone, diagnostic with `/usr/bin/gnucut` | 0.06 | 0 | 1 pass | `58be1e52aeae366ded283beade20581c0348547863dc38fa20809c41421d6e57` |
| `bun x tsc --noEmit` | 0.06 | 0 | clean | `b27414406682ae0ba5450d2ae890f6d72403b280f9a516712ceaebf7f85820fc` |
| `bun test packages/broker/test/pty-host-supervisor.test.ts` | 0.06 | 0 | 27 pass, 0 fail | `95ba814c0f6f04ec3d328a5d9eafbf9cda64d3a93abb2f2cc3112c9899c1a5c3` |
| `bun test packages/broker` | 0.20 | 0 | 307 pass, 0 fail | `a16075ca9bbd8b20b97bf329c6b3581041c12b13e67c3ef046fed50d74698dc0` |
| Oracle diagnostic `oracle-probe.ts` (scratchpad, not a test) | 0.32 | 0 | see below | `0b04e1941eb305267d6efc3699d7588b43fa410810b469d810ec0db7bf6d6c8a` |

`git diff --check` exited 0.

Failing run reason: at the base, mawk 1.3.4 20260129 with a terminal as
standard output read `/proc/self/environ` only up to its first NUL, so
the oracle saw `PATH` alone (DEC-20261013-03 A3, DEC-20261103-01 A4).

Break: `packages/pty-host/src/terminal.ts` (SHA-256
`ffe4a3b6cb10b643a87115b1216fe9e50c654c3c4f02c88d6f961c974a7fa0e1`) was
changed so that `spawnGoverned` adds one synthetic key,
`MADV_HARDENING_D_BREAK`, to the governed child's environment, shown with
`git diff`. The new Linux oracle reported the extra key and the test
failed at its key-set equality. The file was restored with `git checkout`;
its SHA-256 is again
`ffe4a3b6cb10b643a87115b1216fe9e50c654c3c4f02c88d6f961c974a7fa0e1`.

Diagnostic with GNU cut: the test file (SHA-256
`d72dd5698000624cf1fe8ff781c9802d81741726c664cf869fe11750e32b377d` with
the change) had its Linux fixture path set to `/usr/bin/gnucut`, shown
with `diff -u` against a copy; the test passed through the real
supervisor, host and PTY; the copy was restored and the SHA-256 is again
`d72dd5698000624cf1fe8ff781c9802d81741726c664cf869fe11750e32b377d`.

Oracle diagnostic: a scratchpad script (SHA-256
`5e1a741d6a2672e86de58d60ef8819dc5f1603b30b63838118dcffb651d26686`) ran
each candidate under `Bun.Terminal`, standard output a PTY, with a
synthetic two-key environment. `/usr/bin/cut` and `/usr/bin/gnucut` with
`-z -s -d = -f 1 /proc/self/environ` each emitted 25 bytes,
`PATH` NUL `MADV_FIXTURE_MARKER` NUL. `/usr/bin/awk` with the base Linux
program, minus `system()`, emitted only `PATH`. An earlier identical run
of the script printed to the console only; the logged run above is the
record.

Variants covered: the Linux test runs `/usr/bin/cut`, and its evidence
covers uutils coreutils cut 0.10.0 (the test itself, through the real
chain) and GNU coreutils cut 9.7 (the diagnostic test run and the probe).
The Linux oracle no longer runs awk, so it does not depend on which awk a
host has; mawk 1.3.4 20260129 is covered only as the cause of the base
failure. The ubuntu-24.04 runner image's cut and awk were not run here;
that behavior is verified by Verify and code-review after the Founder
pushes. This host does not run the macOS branch; Verify (macOS) does.

Tests changed: "governed-child environment forwarding: exact key-set
equality with the launch-frame env, ambient canary absent (C7 evidence 7)".
`packages/broker/test/pty-host-supervisor.test.ts` passes 27 of 27.

Deviations: none. Halts: none.

## Item 2: the ordering race (DEC-20261103-01 B6 item 3)

Built on commit `8b4d10475b4d7dcc295357757f9dd1dcfeeea836`.

Files changed:
- `test/phase3a/harness-lifecycle.test.ts`, only the test "a refused
  pty_input or pty_resize never reaches the child".
- `docs/verification/hardening-d-build-log.md`.

### Reliance at the base

`test/phase3a/harness-lifecycle.test.ts:184-188` at the base:

```ts
    let text = "";
    while (!text.includes("FIXTURE_RESIZE 91 29\r\n")) text += new TextDecoder().decode((await nextFrame(output)).bytes);
    expect(text).toContain("ACCEPTED_INPUT");
    expect(text).not.toContain("REFUSED_INPUT");
    expect(text).not.toContain("FIXTURE_RESIZE 77 23");
```

The loop stops at the resize report, so an echo of the accepted input
that arrives after it is never read (DEC-20261103-01 A2 item 4). The
fixture, `test/phase3a/fixture-adapters.ts:36` and `:39-46`, echoes stdin
from a `data` handler and reports a size change from a 10 ms interval,
so the two outputs have no fixed order. `nextFrame` bounds each read at
2000 ms and the test's timeout is 15000 ms.

### Change

The loop reads until the output holds both `ACCEPTED_INPUT` and
`FIXTURE_RESIZE 91 29\r\n`, under the same `nextFrame` bound and test
timeout. Every assertion is unchanged, including that neither
`REFUSED_INPUT` nor `FIXTURE_RESIZE 77 23` reaches the output. One
comment line was added.

### Runs

The runtime check before this item's first test run returned the
custodied build as recorded above.

| Run | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- |
| The test alone under the break, before the change | 0.27 | 1 | 1 fail | `be881d554a3c476318eb5b2ab77ea784ed7991636288268565faf20f06ed8df9` |
| The test alone under the break, after the change | 0.25 | 0 | 1 pass | `4d4088907a1f2486dd27ed7b69d0b963013d004cc4170f057c5004f31eddfff9` |
| `bun test test/phase3a/harness-lifecycle.test.ts`, run 1 | 0.21 | 0 | 9 pass, 0 fail | `622fc38b658511734eb8090b0ff1932efe0265aedf64c07387582ce14ce9b390` |
| run 2 | 0.21 | 0 | 9 pass, 0 fail | `f89b86979572e38a806a3b206e892d3fd9099cdb17d3b1f4ac967be30fdab5a2` |
| run 3 | 0.21 | 0 | 9 pass, 0 fail | `9e0249131f1c333c8c62cd6054f981681130a2b14a0c8fdf4ad8f2ebe9b98364` |
| run 4 | 0.21 | 0 | 9 pass, 0 fail | `673f1ca36b57a5f533012eba7d344c5a3902f86a8e79c3eb61bae97fbdcfc004` |
| run 5 | 0.21 | 0 | 9 pass, 0 fail | `6225893f967035f0f8e82aec25d0972f266a528280394821f613cf236d1b08f2` |
| run 6 | 0.36 | 0 | 9 pass, 0 fail | `f495df30e07671ec717a9527ac9aa6970c38e46dfb98071ff15fc27f1f8fa86f` |
| run 7 | 0.36 | 0 | 9 pass, 0 fail | `042c4554e8f201db36c4ca28c2e6631745c41b224370dfee80e01af199cedca8` |
| run 8 | 0.36 | 0 | 9 pass, 0 fail | `ee7d2231df993d548579dbaff9c75939e995a35432e671f3ec1764eefabe7958` |
| run 9 | 0.36 | 0 | 9 pass, 0 fail | `874e9ae90a268a8ed5b7c1d27e3f00cfa4c7ad13d61275aa1c741e6ec25b08a5` |
| run 10 | 0.36 | 0 | 9 pass, 0 fail | `d151dc25a929586beb4385bfa6cdb085114e9bee5bc91bc9d24d109d69789153` |
| run 11 | 0.36 | 0 | 9 pass, 0 fail | `af6e2a01a534bb7910e466e157f4c3596331cdfae3c878835c8947f487a13eae` |
| run 12 | 0.41 | 0 | 9 pass, 0 fail | `ed9afc14b49a1e7d9ff9b7429a47570a6eafcdf2681dea627a674418c2ef326f` |
| run 13 | 0.41 | 0 | 9 pass, 0 fail | `93e980ef5c5d78d019594016cb16a649bf70d846bcec579f1f662aef1052df5d` |
| run 14 | 0.41 | 0 | 9 pass, 0 fail | `c8b5fced31120bb1b2282ba4464da79da73567bddcf34faad566755a4b415c5f` |
| run 15 | 0.41 | 0 | 9 pass, 0 fail | `8cc5bdeea379adf606efc2a0c1547ac5ed9d62e731ca185e0a7ca1e1b38c515c` |
| run 16 | 0.41 | 0 | 9 pass, 0 fail | `6601f3b292dca6aba390fea605ac0a2a124d6ba66df10df85080b08024fe4f8d` |
| run 17 | 0.41 | 0 | 9 pass, 0 fail | `a41dff1833abcbeb61a026df234f35030fed5e97bacc98660be6c073680f66c8` |
| run 18 | 0.62 | 0 | 9 pass, 0 fail | `89214f30262e7b4b6e4bc2660205642ef090d883644d664782186a6d22ab9c84` |
| run 19 | 0.62 | 0 | 9 pass, 0 fail | `0c2824d7edb65799181c4aedd9a4d04cd0a99e94fffcd6d326fa74e81f119348` |
| run 20 | 0.62 | 0 | 9 pass, 0 fail | `7958466012b0240d52f8ade5272f86f7842fde37691c7db7e97d90491db4cf03` |
| `bun x tsc --noEmit` | 0.57 | 0 | clean | `ea4cbd8f86b8a0975dad95512a85f5ea00101217ca9449f28e5e200218068788` |
| `bun test test/phase3a` | 0.57 | 0 | 152 pass, 0 fail | `0ea8e72ee43e301463ef728323ea7b7a1baab2fc0235fef7255b481f794038ce` |

`git diff --check` exited 0.

Break: `test/phase3a/fixture-adapters.ts` (SHA-256
`45cb50f6be3b3755a917f6fe6c0ada2716d950f465a7078015328ce171648d50`) was
changed so that the fixture writes each echo 100 ms after receiving it,
which makes the resize report reach the output before the echo of the
accepted input; shown with `git diff`. Before the change the test failed:
"Expected to contain: "ACCEPTED_INPUT"", received
"FIXTURE_RESIZE 91 29\r\n", at `harness-lifecycle.test.ts:186`. After
the change it passed under the same break. The file was restored with
`git checkout`; its SHA-256 is again
`45cb50f6be3b3755a917f6fe6c0ada2716d950f465a7078015328ce171648d50`.

Tests changed: "a refused pty_input or pty_resize never reaches the
child". `test/phase3a/harness-lifecycle.test.ts` passes 9 of 9, twenty
runs in a row.

Deviations: none. Halts: none.

## Item 3: the deadline test (DEC-20261103-01 B6 item 4)

Built on commit `2abb5fa1db17a2ce8f75597e25366a1e754158b2`.

Files changed:
- `packages/broker/test/acknowledgement-deadline.test.ts`.
- `docs/verification/hardening-d-build-log.md`.

No production file changed for this item.

### Reliance at the base

`packages/broker/src/pty-host-supervisor.ts:1056-1082`, the
acknowledgement window of `escalateWedgedHost` (inside
`runOwnedEscalation`):

```ts
    let timer: ReturnType<typeof setTimeout> | undefined;
    ...
    const deadlineWon = new Promise<"deadline">((resolve) => {
      const checkDeadline = (): void => {
        const remaining = ackDeadline - performance.now();
        // A timer may fire early; only the monotonic clock ends the window.
        if (remaining > 0) timer = setTimeout(checkDeadline, remaining);
        else resolve("deadline");
      };
      timer = setTimeout(checkDeadline, Math.max(0, ackDeadline - performance.now()));
    });
    const winner = await Promise.race([ackWon, exitWon, deadlineWon]);
    if (timer !== undefined) clearTimeout(timer);
```

with `ackDeadline = tAttempt + HOST_DEADLINES_MS.ack` at line 1037 and
classification at lines 1129-1131, where `probeSignal0(hostPid)` calls
`process.kill(hostPid, 0)`. The ack race settles on `termination_started`
or a matching `ack` (lines 745-749).

`packages/broker/test/acknowledgement-deadline.test.ts` at the base held
one test, "an early acknowledgement timer waits until 250 ms before
classifying a silent host as failed". It captured only the first
`setTimeout` (`mockImplementationOnce`), fired it once early, restored
the real timer, and asserted the window's end only through production's
own `outcome.observedMs.ackWindowEndedMs >= 250`. A re-arm that happens
only once, or a re-armed timer left uncleared, passed it
(DEC-20261103-01 A2 items 1 and 3).

### Change

A helper parks the first two timers of at most 250 ms that the code under
test arms: each is backed by an inert real timer, so `clearTimeout`
accepts its handle, its callback runs only when the test fires it, and
`clearTimeout` is observed.

- "an early acknowledgement timer waits until 250 ms before classifying a
  silent host as failed" (changed, same name): for a SIGSTOPped host it
  fires the acknowledgement timer early, then fires the timer that
  re-arms, also early, two consecutive early firings, both before 250 ms;
  the next re-arm is a real timer. It records `performance.now()` just
  before calling `escalateWedgedHost` and again when the signal-0
  classification probe of the host PID runs, through a pass-through spy
  on `process.kill`, and asserts that difference is at least 250 ms. Every
  earlier assertion stays, including `ackWindowEndedMs >= 250`, S3, the
  reason, `escalated` and `sessionInterruptionRequired`.
- "an acknowledgement after an early acknowledgement timer leaves no
  acknowledgement timer live" (new): for a responsive host, it fires the
  acknowledgement timer early, checks that the window re-armed and that
  the acknowledgement is still pending, and keeps the re-armed timer
  parked so only the acknowledgement can end the window. It then asserts
  S1, not escalated, and that every timer the window armed has fired or
  been cleared, the re-armed one cleared.

### Runs

The runtime check before this item's first test run returned the
custodied build as recorded above.

| Run | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- |
| `bun x tsc --noEmit` | 0.08 | 0 | clean | `326db05180bf50d3ead3a3e3df560c65d943e57eb032f84a07679ff24d138cbf` |
| `bun test packages/broker/test/acknowledgement-deadline.test.ts` at HEAD | 0.07 | 0 | 2 pass, 0 fail | `6e664b0f876e70e2001f086f3133cfa386fbb6d3613e40443430e69f778d07dc` |
| Same file under the re-arm-once break | 0.06 | 1 | 1 pass, 1 fail | `ac245bc65686ab19dbf803f217420abc8a4adc1611c92b09e206cf03629ec4e5` |
| Same file under the uncleared re-arm break | 0.05 | 1 | 1 pass, 1 fail | `2da3afb9377117dd0de7baae8629c8427ed5784397e900700bc5676763adb88f` |
| `bun test packages/broker` | 0.05 | 0 | 308 pass, 0 fail | `c3dcdc32fcd3c89cb39ee656d789a2a49d892bd60ed71b9ff6c081c54b26d5ba` |

`git diff --check` exited 0.

Break 1, re-arm only once: `packages/broker/src/pty-host-supervisor.ts`
(SHA-256 `1ac42c07ee5424ea05391b3eef2fc7d254988291fccd1a45172d25bbc9258ad3`)
was changed to count re-arms and re-arm only on the first early firing
(`let rearms = 0;` and `if (remaining > 0 && rearms++ < 1)`), shown with
`git diff`. The first test failed: `expect(classifiedAt! - started)
.toBeGreaterThanOrEqual(HOST_ACK_MS)`, "Expected: >= 250, Received:
0.4198340000000016", at `acknowledgement-deadline.test.ts:102`. Restored
with `git checkout`; SHA-256 again
`1ac42c07ee5424ea05391b3eef2fc7d254988291fccd1a45172d25bbc9258ad3`.

Break 2, re-armed timer left uncleared: the same file was changed so the
re-arm no longer assigns `timer` (`if (remaining > 0)
setTimeout(checkDeadline, remaining);`), so `clearTimeout(timer)` after
the race clears only the first timer; shown with `git diff`. The second
test failed: "Expected length: 0, Received length: 1", one live timer, at
`acknowledgement-deadline.test.ts:153`. Restored with `git checkout`;
SHA-256 again
`1ac42c07ee5424ea05391b3eef2fc7d254988291fccd1a45172d25bbc9258ad3`.

Tests: "an early acknowledgement timer waits until 250 ms before
classifying a silent host as failed" (changed) and "an acknowledgement
after an early acknowledgement timer leaves no acknowledgement timer
live" (added). `packages/broker/test/acknowledgement-deadline.test.ts`
passes 2 of 2.

Deviations: none. Halts: none.

## Item 4: the lifeline-EOF timer (DEC-20261103-01 B6 item 5)

Built on commit `6afeab9e9706e386e40c9d8c807e00098a46d89a`.

Files changed:
- `packages/pty-host/src/main.ts`, only the lifeline-EOF timer.
- `packages/pty-host/test/eof-timer-early-fire.test.ts` (new).
- `docs/verification/hardening-d-build-log.md`.

### Reliance at the base

`packages/pty-host/src/signals.ts:33-43` defines `HOST_DEADLINES_MS` with
`outerBound: 5000`. `packages/pty-host/src/main.ts:615-683`: on stdin EOF,
`runSteadyState` calls `onLifelineEof(session.pgid, emit)` and races
`session.child.exited` against a timer; the timer at line 662 was

```ts
          eofTimer = setTimeout(() => {
            const err = new Error("lifeline-EOF child exit exceeded the §9.8 outer bound");
            if (!eofRaceSettled) {
              eofRaceSettled = true;
              rejectExit(err);
            }
            // If the race already settled, this timer's callback is a
            // no-op — the error is never thrown into a settled promise.
          }, HOST_DEADLINES_MS.outerBound);
```

It treated its first firing as the outer bound without reading the
monotonic clock, the defect `DEC-20261102-04` A4 records for
`escalateWedgedHost`, so a timer that fired early ended the wait early.
On rejection, lines 672-683 write "lifeline-EOF containment incomplete"
to stderr, set exit code 1 and close the session with no `drained` or
`exited`.

### Change

The timer records `eofArmedAt = performance.now()` when it is armed. Its
callback computes the time left until `eofArmedAt +
HOST_DEADLINES_MS.outerBound`; if any is left and the race has not
settled, it re-arms for the remainder and returns. Otherwise it behaves
exactly as before: it rejects with the same error if the race is still
open, and is a no-op if it has settled. A re-arm is stored in `eofTimer`,
so the child-exit handlers clear the live timer. Nothing else in the file
changed.

### Test

"a lifeline-EOF timer that fires early does not end the wait before the
§9.8 outer bound" in the new file
`packages/pty-host/test/eof-timer-early-fire.test.ts`. It runs the real
`runSteadyState` over a real governed child (`/bin/sleep 300` in its own
process group under a real `Bun.Terminal`) whose `exited` is replaced by
a promise that never settles, as T12 in `eof-timer.test.ts` does, so only
the timer can end the wait. For the test's duration it replaces the
global `setTimeout` so the first two timers armed with a delay between
1000 ms and 5000 ms (only the lifeline-EOF timer and its re-arms) run
their callbacks after 50 ms; every other timer is real. No production
seam is used. It records the time just before the command channel
reports EOF and the time the "lifeline-EOF containment incomplete"
diagnostic is written, and asserts that the timer was armed for 5000 ms
and fired early, that the wait ended no earlier than 5000 ms after the
EOF, and that the fail-closed path is unchanged: the outer-bound error,
"failing closed", exit code 1, no `drained` or `exited` fact, and the
frame reader closed once. The test-owned outer bound is 5000 ms.

### Runs

The runtime check before this item's first test run returned the
custodied build as recorded above.

| Run | Load (1 min) | Exit | Result | Log SHA-256 |
| --- | --- | --- | --- | --- |
| `bun x tsc --noEmit` with the new test | 0.12 | 0 | clean | `63a005eaaaf0cf76789e69c40a51f0d034a156bdb01599ba0ea39929163002f1` |
| The new test against the code before the change | 0.35 | 1 | 1 fail | `b655ab9d7b88dc835af22198dfb7e63b70fdba9aececc9e5103fece3a73d2aa7` |
| `bun x tsc --noEmit` after the change | 0.27 | 0 | clean | `5989ed43620abcf4146cf7517a7dedbc86c7dbb4daffff13788f6a297098baa4` |
| The new test after the change | 0.27 | 0 | 1 pass | `33a1c4b8320ce7b4da4cd578d927d5102d0cd870f5656184354b24fb8857c4ce` |
| `bun test packages/pty-host` | 0.23 | 0 | 50 pass, 0 fail | `4b0a49a5fe04921d73d4db0889f8a79a2fa44acf6c31cbc735d4eb1866326341` |
| `bun test packages/broker` | 0.13 | 0 | 308 pass, 0 fail | `10526e29a1576517245fcebd056e3eb4d82ed699087ec6855363b3950b4fb7a7` |

`git diff --check` exited 0.

Failing run: with `packages/pty-host/src/main.ts` at SHA-256
`39981ecb4670a188a13b0251f54fba7634c51889da3d88c23371db4c95dfbc17`, the
code before the change, the test failed at
`eof-timer-early-fire.test.ts:133`: `expect(waitEndedAt! - eofAt!)
.toBeGreaterThanOrEqual(OUTER_BOUND_MS)`, "Expected: >= 5000, Received:
50.438661". The early firing ended the wait about 50 ms after the EOF.
No break was needed: this item has a production change.

Tests added: "a lifeline-EOF timer that fires early does not end the wait
before the §9.8 outer bound". `eof-timer-early-fire.test.ts` passes 1 of
1; `packages/pty-host` passes 50 of 50.

Deviations: none. Halts: none.
