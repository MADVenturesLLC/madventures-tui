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
