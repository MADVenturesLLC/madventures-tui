FOUNDER-ACT-20261013-IMAC-OUT-OF-SCOPE: the iMac removed as a certification host, and macOS on x86_64 removed from the supported host profiles

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `4b1bbebc9db1dfe8e3176bcccd30ba9cf2106491` (this text; the first was drafted at `3f9b414c0ffcaf6955873f757cb55b97b2de77a1`)
> **Ratifies:** the patch with SHA-256 `7ec602b353cb3b3013dcfc48f75ab2ab45075d59ba5fe740f9a0dbead2e9c28a` (6,579 bytes) against `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` as it stands after the patch of `DEC-20261013-03`
> **Replaces:** two earlier signed texts of this act, neither filed: SHA-256 `89533d5540de10f78fd8f0f70a828ca2287e2fe4416ff4ee0b5bc47bf31f6360`, whose A2 item 3 and mention of Hermes in Part D are removed, and SHA-256 `411a0456d5afd0e11cbc68175e8f139035f54ba7382a5ef62ff2fc56b0f9b75f`, whose A4 and B5 described `DEC-20261013-01` B8 as three hosts before that act's r2 text, which names two, was filed
> **Read with:** `DEC-20261010-02` B1 and B6; `DEC-20261012-01` B5; `DEC-20261013-01` B8; `DEC-20261013-03`; spec §§0, 1.4, 1.5, 6.5, 6.8, 6.9 and 8

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The decision.** I remove the Founder's iMac from Phase 3A entirely. It stops being a certification host, and macOS on `x86_64` stops being a supported host profile.

A2. **Why.**

1. No certification runtime is available for it under `DEC-20261013-03`. `.github/actions/setup-qualified-bun` holds custodied archives only for `Linux-x86_64` and `Darwin-arm64`, and no CI job runs macOS on `x86_64`.
2. It is the oldest host on record: spec §3.6 records it at macOS 13.7.8 for the M17 run.

A3. **What it costs.** macOS certification rests on one host, the MacBook, on `arm64`. Intel Macs are not supported. `checkPlatform` in `apps/madbridge/src/commands/doctor.ts` still reports `ok` on any macOS; spec §1.5 row 2 already says that check reports support and admits nothing, and this act does not change it.

A4. **Where three hosts appear.** Spec §0's scope list and §§1.4, 1.5, 6.5, 6.8, 6.9 and 8; plan item 20, §8 with its Host A procedure, M26 and Task 58; and the Phase 3B spec and plan, through `DEC-20261012-01` B5. `DEC-20261013-01`, as filed on `main`, already runs its host-facts check on the MacBook and the Ubuntu PC only. The comment above the `verify-macos` job in `.github/workflows/verify.yml` names an Intel CI lane as the next Founder decision.

A5. **The drafting assistant.** It found those references with `git grep` at the commit in the header and built the patch on top of the patch of `DEC-20261013-03`. None of that is an independent review.

## Part B: Founder rulings

B1. **Supported host profiles.** Phase 3A supports exactly two host profiles: macOS on `arm64`, and Ubuntu 26.04 LTS on `x86_64`. macOS on `x86_64` is excluded. This amends `DEC-20261010-02` B1.

B2. **Certification hosts.** The certification hosts are the Founder's MacBook and the Founder's Ubuntu PC. The iMac runs no certification run, host-facts check or other gate work in Phase 3A.

B3. **Ratification.** I ratify the patch in the header. It changes spec §0's scope list and §§1.4, 1.5, 6.5, 6.8, 6.9 and 8 to the two hosts of B2. It takes effect when it is on `main` together with this act.

B4. **Documents not edited.** The plan, the Phase 3B spec and plan, and `docs/STATUS.md` are not edited by this act. Each reference in them to the iMac or Host A as a certification host, to three hosts or three reports, or to Intel macOS as supported, is read under B1 and B2. The plan's Host A procedure does not run, and M26 produces two certification reports. `DEC-20261012-01` B5 is read as the two-host reports of spec §6.5.

B5. **The Task 45 host-facts check.** `DEC-20261013-01` B8 already runs on the two hosts of B2, and this act changes nothing in it.

B6. **The Intel CI lane.** The decision the `verify-macos` comment defers is made: no Intel macOS lane is added. The comment is read under this act and is not edited by it.

B7. **History.** The M17 records of the iMac, its spike report, `test/phase3a/spike/bun-terminal-spike-reports.test.ts`, the spec §3.6 table, the list of the three host spike reports in spec §4, and the V1 validation on the iMac stay as they are.

B8. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. Rubric milestone 1 stays at **5**, rubric milestone 4 at **3**, and rubric milestone 6 at **0**.

## Part C: Filing

C1. One docs-only pull request files this act and applies the patch, and changes nothing else. It opens only after `DEC-20261013-03` and its patches are on `main`, when the spec's SHA-256 is `2045c4ec33ef12a77fa03a922c66fa6d8c9035d4c8f8dfff7c23e47337c17e6c`; afterwards it is `913a7b20b74cda89224e40a32866556d5375755dd9810d0ba9cdfbed068a5a27`. It merges only when every required check succeeds, under my separate merge authorization.

## Part D: Not authorized

- Any change to production code, including `checkPlatform`, to a test, a workflow, `.github/actions/setup-qualified-bun`, the plan, the Phase 3B documents or `docs/STATUS.md`.
- Any change to the iMac or to any host's configuration.
- Any change to the M17 record or the iMac's spike report.
- Task 46 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-13

Actor-Id: founder
