# Tests 4 to 6 Check Report — Founder's MacBook

`DEC-20261012-03` B4 host-authored report. Generated on this host on 2026-10-12T11:59:45Z
by the run script (SHA-256 `4e1bca7a00126154eb3f6bf9fa55aec880c15ee5e6caa74f7b7562224d578535`, operator: Founder), exclusively from this host's own retained run evidence listed at the end.
Test results are recorded, not judged.

Candidate SHA: 03dda124e9d6faa59abda6a3817410bcdf1765f8
Branch: main (fresh clone at `/Users/michaeldaley/madventures-tui-b4-macbook-run`, detached at `origin/main`)
Note: `bun install` turned `packages/founder-act/src/main.ts` to mode 100755; the run restored 100644 (DEC-20261011-02 B4 item 2).

## Host

- product: `macOS`
- product_version: `27.0.1`
- build: `26A434`
- arch: `arm64`
- kernel: `27.0.0`
- term: `xterm-256color`
- stdin_is_terminal: `yes`

## Runtimes

| Field | Value |
| --- | --- |
| bun path | `/Users/michaeldaley/.bun/bin/bun` |
| bun version | `1.4.2` |
| bun revision | `744846f844374847c902b5e7fd59b4342a51ef99` |
| bun sha256 | `35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5` |
| node path | `/Users/michaeldaley/.hermes/node/bin/node` |
| node version | `v26.5.1` |

## Tests 4 to 6 run alone

| Test | Run | Exit | Pass | Fail | Summary |
| --- | --- | --- | --- | --- | --- |
| 4 | 1 | 0 | 1 | 0 | Ran 1 test across 1 file. [27.00ms] |
| 4 | 2 | 0 | 1 | 0 | Ran 1 test across 1 file. [21.00ms] |
| 4 | 3 | 0 | 1 | 0 | Ran 1 test across 1 file. [21.00ms] |
| 5 | 1 | 0 | 1 | 0 | Ran 1 test across 1 file. [29.00ms] |
| 5 | 2 | 0 | 1 | 0 | Ran 1 test across 1 file. [28.00ms] |
| 5 | 3 | 0 | 1 | 0 | Ran 1 test across 1 file. [28.00ms] |
| 6 | 1 | 0 | 1 | 0 | Ran 1 test across 1 file. [27.00ms] |
| 6 | 2 | 0 | 1 | 0 | Ran 1 test across 1 file. [26.00ms] |
| 6 | 3 | 0 | 1 | 0 | Ran 1 test across 1 file. [28.00ms] |

## Exact commands

1. host facts (sw_vers, uname -m, uname -r, TERM, whether standard input is a terminal)
2. git clone https://github.com/MADVenturesLLC/madventures-tui.git <worktree>
3. git checkout --detach origin/main
4. bun identity (path, --version, Bun.revision, SHA-256)
5. node identity (path, --version)
6. bun install --frozen-lockfile
7. tests 4, 5 and 6 alone, 3 times each
8. `git status --porcelain`

## Retained source evidence on this host (`/Users/michaeldaley/macbook-b4-evidence`)

- `clone.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `host.txt` SHA-256 `9a6eff5a19785cb6af36cd8d3b111d16d1ea10baf03e91ebd07b88e9bd018418`
- `install.txt` SHA-256 `a139730f970c55631017f38f90f7418a2a49ff1310c960de35e79edecf2f3e8b`
- `run-start.txt` SHA-256 `77bf983b802edbbd87ffb218ccea968aa1cd4ac4475ffb692ed706112ec2f8bc`
- `runtimes.txt` SHA-256 `8541291437a1971e9d516cc521d4d22c371b7b0401e61927639f1bab3495760d`
- `status-after-install.txt` SHA-256 `3955bb1ba4c194b057881b6fa0b570996de5c14d6d133dad8711a94b218f7491`
- `status-final.txt` SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- `test4-1.txt` SHA-256 `a050c03aca35ba42c67399753ad5f157b744c4b8efb082ace0824fced31590eb`
- `test4-2.txt` SHA-256 `11415aeb1576b5fa532ce62be5f4a366966e7664c97af66eeacb01d41fda5941`
- `test4-3.txt` SHA-256 `e3ff2636b8eb4d9c585570fc5b226f4f88c6cc488e70e63c41b290a0baf65ac5`
- `test5-1.txt` SHA-256 `812e3733f8ba8cc8eefd4ef5b2d97b65e617ee93fbdd6a930450dbfa40481bf5`
- `test5-2.txt` SHA-256 `7458ed5703ba6463af237578547faffbabd4959debdc0238415e04e5d28147a9`
- `test5-3.txt` SHA-256 `03b818dfa4fe69aeebd22f8a1092617d0440e20c872b4cb9ac91a57542fc7626`
- `test6-1.txt` SHA-256 `8a68988c7ca7766d96b80043aad74d1ee1d364d8bfa87b4fc5e9efba0ce1383a`
- `test6-2.txt` SHA-256 `f8abb9da36cc4d66858d529ddb29ea8c8fa4d9e889f413799c0050d09bed4562`
- `test6-3.txt` SHA-256 `ed66a367ca2d72dadabb3b155934c3a4aad786bf2c68e90071a16c88322cd99f`
Report SHA-256: b398bb8caccbb9f869e96c188bfee92790cd54cf0e042c8a7405799a8ed80b45
