FOUNDER-ACT-20261010-LINUX-HOST-SCOPE: the Ubuntu PC added to Phase 3A as a supported and certified host

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `acab0dfadc4e4650ddeaadb836bc516156766848`
> **Amends, by direction in Part B:** spec `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` (SHA-256 `764801aebeaf9686ed63523cea7f79120320725caa5be4cd55e9556259b6d88f`), plan `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` (SHA-256 `bdd91837de5eba742e9a2f61553db74c164b58bae9d6fa1b8f96ee748ef18ed8`), `PLAN-OPEN-2-environment-allowlists.md` (SHA-256 `6f570ea8123c824687953cc64b793587b9a5acb4db56729c29bec383f694e1b0`)
> **Read with:** `DEC-20261010-01`, plan section 11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **My decision.** On 2026-10-10 I decided that my new Ubuntu PC will be the main computer that runs the build room, that the build stays supported on the MacBook as well so I can work on either, and that the iMac and the MacBook stay available for certification. I chose to add Linux within Phase 3A, before M20, rather than in a later phase.

A2. **The host, as I observed it on 2026-10-10.** Ubuntu 26.04.1 LTS, kernel 7.0.0-38-generic, `x86_64`. User `michaeldaley`, uid 1000, home `/home/michaeldaley`, passwd shell `/bin/bash`, `SHELL` `/bin/bash`, `TERM` `xterm-ghostty`, `TMPDIR` unset. `git`, `gh`, `agy` and `claude` are installed. Bun and Codex are not.

A3. **What the current documents say.** Spec section 1.4 excludes Linux from Phase 3A. Spec sections 3.6 and 6.5 and plan M17, M26 and section 8 certify on the iMac and the MacBook only, and section 6.5 bars machine-specific code branches. Spec section 5.2 puts test roots under the macOS per-user private temporary tree. `PLAN-OPEN-2` makes `TMPDIR` required and places Claude Code's sign-in material in the macOS keychain. The capability record merged under Task 35 has `host.macos_version` and `host.macos_build` fields.

A4. **What already runs on Linux.** The required CI check Verify runs the full suite on `ubuntu-24.04` `x86_64` with a qualified Bun build, and it has passed on every Phase 3A pull request.

A5. **Why now.** M17 to M19 (the PTY spike, the PTY host and process containment) are already built. M17 passed on both Macs on 2026-08-22 at candidate `56435bfe61978abed2cbcdb9b6c4e52550dc222d`, and M18 and M19 landed under their own authorizations, which `DEC-20260831-01` item 1 confirms. The Task 39 record notes that the spike also passed 13 of 13 in a Linux container, as an observation and not host evidence. M20 to M26, including the final certification, are not yet built. Adding Linux now means the remaining milestones are built for both platforms, and the landed M17 to M19 work gets a Linux check rather than a rebuild.

## Part B: Founder rulings

B1. **Scope.** Phase 3A supports macOS and Linux. On Linux it supports exactly one host profile: Ubuntu 26.04 LTS on `x86_64`, as on the PC in A2. Other Linux distributions and architectures, Windows and remote hosts stay excluded.

B2. **Certification.** Every gate that names the iMac and the MacBook adds the Ubuntu PC as a third host. The same reviewed commit must pass on all three. M17, which passed on both Macs on 2026-08-22, is not reopened there. Instead, the Ubuntu PC runs the same spike criteria at a then-current `main` commit before the amendment of B6 is ratified, and any failure stops for my ruling.

B3. **One codebase.** Code may branch on the operating system only where an operating-system facility differs. Each such branch is named in the amendment of B6 and exercised on its own operating system by the CI jobs and at certification. No code branches on a host's identity, such as its name or user.

B4. **The environment rules on Linux.** The `claude-code-v1` and `antigravity-v1` allowlists do not change. `TMPDIR` stays required. On Linux the governed launcher sets `TMPDIR` to a per-user private directory owned by the installation uid with mode `0700`; the shared `/tmp` is not acceptable. Task 45 validates that, in addition to its presence. The `HOME`, `PATH`, `SHELL` and installation-identity rules apply unchanged. The rule that no secret passes through the environment stands, and both allowlists keep zero `secret: true` variables. Where Claude Code keeps its sign-in material on Linux, and what its auth-readiness probe reports there, are facts for Task 45 to establish on this host. If either differs from what `PLAN-OPEN-2` assumes, Task 45 stops for my ruling.

B5. **The capability record.** The record's macOS host fields cannot describe this host. A separate task act amends the record before any capability record is produced or evaluated on Linux. Until then, no capability record is written on Linux.

B6. **The amendment owed.** Before Task 45 is authorized, one docs-only pull request amends spec sections 1.4, 3.5, 3.6, 5.2 and 6.5, plan M17, M26 and section 8, and `PLAN-OPEN-2`, to give effect to B1 to B5, and updates the approval record. The drafting assistant drafts it, and it takes effect only by a separate Founder act that ratifies its exact text.

B7. **Task 37.** Task 37 does not depend on the platform and proceeds under its own act once this act is on `main`. Its review runs on the Ubuntu PC, so that Linux evidence exists from M16 on.

B8. **Work hosts.** I may run builders, reviewers, filing sessions and my own commands from any of the three hosts. Each report names the host it ran on. Each host uses Bun 1.4.2, the version the MacBook reported for Task 36, until the amendment of B6 fixes the gate versions.

B9. **Counting.** This is a new Founder ruling, which plan section 11.3 does not count as a correction round. Rubric milestone 1 stays at 5 and rubric milestone 4 at 3.

## Part C: Filing

C1. One docs-only pull request files this act, and changes nothing else.

## Part D: Not authorized

- The amendment text of B6, which needs its own act to take effect.
- Any change to code, tests, `bun.lock`, a manifest, the plan, a spec or `PLAN-OPEN-2` under this act.
- The capability-record change of B5, the Linux spike run of B2, Task 45 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-10

Actor-Id: founder
