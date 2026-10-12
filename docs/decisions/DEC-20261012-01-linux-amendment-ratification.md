FOUNDER-ACT-20261012-LINUX-AMENDMENT-RATIFICATION: the Linux amendment of the spec, the plan and PLAN-OPEN-2 ratified

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `0184a80d5ddefcfa89a97f8634234f4e59d1b3ae`
> **Ratifies:** the amendment owed under `DEC-20261010-02` B6, as the patch with SHA-256 `5dd0ce4fa3e0801682f648fee803ad364d33bafb669a4795f2c8b23e9cb1f130` (86,460 bytes) against the four files in A3
> **Read with:** `DEC-20261010-02` (SHA-256 `cae5ac6b59618507f6ff3ef0f4d2cd5bca1909f328023248db8d234c4098b5a1`), `DEC-20261011-02` (SHA-256 `0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd`) read with item 3 of my merge authorization for PR #137, comment 6114226027, and `DEC-20261011-01` B4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What is owed.** `DEC-20261010-02` B6 requires one docs-only pull request that amends the spec, the plan and `PLAN-OPEN-2` to give effect to its B1 to B5, and updates the approval record, with effect only through a separate act that ratifies the exact text. Its B2 requires the Ubuntu PC to run the spike criteria at a then-current `main` commit before that ratification. `DEC-20261011-01` B4 requires the amendment to be on `main` before Task 45 is authorized. This is the ratifying act.

A2. **The Ubuntu spike run.** Under `DEC-20261011-02` B4, I ran the run script (SHA-256 `7fa843bc930207253c8e438051d1afb23517e29895d6bb59f71cb73d4626240c`) on the Ubuntu PC. It completed on 2026-10-11 (UTC) at `main` commit `0184a80d5ddefcfa89a97f8634234f4e59d1b3ae`, with Bun 1.4.2 (revision `744846f844374847c902b5e7fd59b4342a51ef99`) on Ubuntu 26.04.1 LTS, kernel 7.0.0-38-generic, `x86_64`. All thirteen §3.6 criteria passed in each of three consecutive runs of `bun test test/phase3a`, at 60 pass and 0 fail each. `bunx tsc --noEmit` was clean. The full suite showed 1,580 pass and 3 fail, the three being tests 4, 5 and 6 of `DEC-20261011-02` A2, each failing as A2 records. Tests 1, 2 and 3 passed. The worktree was clean at the end, after the mode restore that `DEC-20261011-02` B4 item 2 allows. The script wrote its report to `/home/michaeldaley/ubuntu-spike-evidence/report/2026-10-11-bun-terminal-spike-ubuntu.md`: file SHA-256 `670653fd50a6107f40503a9942d59b5574f83101d3a345708d97cbfa208b8e88`, 231 lines, internal `Report SHA-256` `2106e3371468b97318dc34d7d88220ccaba8597664caf997f786358dac265cf9`.

A3. **The amendment text.** Each of the four files has the same SHA-256 on `0184a80d5ddefcfa89a97f8634234f4e59d1b3ae` as on `70221e5e63a6ae0678154c871b2482a0c52fc6c7`. The patch in the header changes them as follows:

| File | SHA-256 before | SHA-256 after |
| --- | --- | --- |
| `docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md` | `764801aebeaf9686ed63523cea7f79120320725caa5be4cd55e9556259b6d88f` | `7a5ada083f5e29af397099eb307282242bc1d241ad091d75b8b010065debd286` |
| `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` | `bdd91837de5eba742e9a2f61553db74c164b58bae9d6fa1b8f96ee748ef18ed8` | `400ae9b9b3bb83cf63a6432f04a11cfd6142e9530bdc80d36a941f7ec85e08e2` |
| `docs/decisions/PLAN-OPEN-2-environment-allowlists.md` | `6f570ea8123c824687953cc64b793587b9a5acb4db56729c29bec383f694e1b0` | `7ceb367c48adb1954e107ed7cdfd5578277f88c1acadb21561e043d24a95417f` |
| `docs/decisions/PLAN-OPEN-approval-record.md` | `ef35eb392799dc44aca339c69779a4ea86dd515ddb35663dc481b05cd162373b` | `14e79fd47697fb2251b2e04008cd0245801a486fbb745728ce7fb8819fd216eb` |

A4. **What the text does.** It adds spec §1.5 with the three certification hosts, the gate runtime, the CI runtime's identity, the Node.js prerequisite and the closed list of seven operating-system branches. It narrows the §1.4 exclusion to Linux profiles other than Ubuntu 26.04 LTS on `x86_64`. It states one containment claim for both operating systems in §3.5. It keeps the M17 Mac record historical in §3.6 and adds the Ubuntu run. It separates test fixture roots from the launcher's `TMPDIR` in §5.2. It defers Linux capability records in §5.5 and plan §§8.6 and 9.3. It makes every certification gate three-host in the spec, the plan and plan §8, with Linux forms of the §8.3 commands. It adds the `TMPDIR` trusted-value rule and the Linux secret-posture assumption to `PLAN-OPEN-2`, and Revision 6.2 to the approval record.

A5. **My decisions on the draft.** On 2026-10-11 I took the drafting assistant's five recommendations:

1. B6's list of sections is a floor, and every forward-looking statement in the spec and the plan that names only the Macs is amended.
2. On Linux `TMPDIR` is `XDG_RUNTIME_DIR`, the launch fails closed when that is unset, and Task 45 validates `TMPDIR` the same way on both operating systems.
3. Test fixture roots may sit under the shared `/tmp` on Linux.
4. The Ubuntu spike report is named by its run date and filed outside the Task 39 report test.
5. Certification pins Bun and the architecture, and records the operating-system version and build at the run.

On 2026-10-12, after the run in A2, I directed draft 2, which adds three things: the run's facts, the Node.js prerequisite, and the provisional status of Bun 1.4.2.

A6. **Why Bun 1.4.2 is provisional.** Tests 4 to 6 pass in CI, which runs the custodied Bun revision `69cb78c9097cebd3bdb832d9fff8b7d23abce09e`. Tests 5 and 6 fail on the Ubuntu PC with Bun 1.4.2, and also in the drafting assistant's own Linux container with Bun 1.3.11. Test 4 fails on the PC and passes in that container. The cause may lie in the Bun build. That has not been established. M26 requires zero failures on every host, so the certification runtime stays open until the act of `DEC-20261011-02` B7 settles it.

A7. **Why Node.js.** The `tui-chaos` suite cannot run its PTY transport without `node` on `PATH`. Node.js v22.22.1 was present on the Ubuntu PC in the run of A2, and tests 1 to 3 passed. `DEC-20261011-02` B6 applied only if `node` was missing, so it did not take effect. I adopt the prerequisite on its own merits.

A8. **The drafting assistant.** It drafted the amendment, the run script and this act, and it checked the hashes in A2 and A3. None of that is an independent review.

## Part B: Founder rulings

B1. **Ratification.** I ratify the amendment text in A3 as giving effect to `DEC-20261010-02` B1 to B5. It takes effect when it is on `main` together with this act.

B2. **The list of B6 is extended.** The amendment owed under `DEC-20261010-02` B6 extends to every section the text amends, beyond the sections B6 names.

B3. **The Ubuntu spike evidence.** The report in A2 is accepted as the spike run of `DEC-20261010-02` B2. That condition is met. The report is filed byte-identically at `docs/verification/2026-10-11-bun-terminal-spike-ubuntu.md`. It is not a Task 39 report.

B4. **The certification runtime.** Bun 1.4.2 is the certification runtime provisionally, as spec §1.5 states. The act of `DEC-20261011-02` B7 fixes it.

B5. **Phase 3B documents.** References in the Phase 3B spec and plan to dual-host Phase 3A reports, or to both Founder Macs, are read as the three-host reports of spec §6.5. Those documents are not edited by this act.

B6. **Open items carried forward.** Each stays open for a later act:

1. Tests 4 to 6 of `DEC-20261011-02` A2 and the provisional runtime of B4, under `DEC-20261011-02` B7.
2. Tests 1 to 3, which passed in the run of A2 and stay in the known-failure set of `DEC-20261011-02` B2 until a later act closes them.
3. The capability-record change of `DEC-20261010-02` B5.
4. Where Antigravity keeps its session tokens on Linux, for the act that authorizes Task 56.

B7. **Approval record.** After the filing pull request merges, I post the Revision 6.2 entry on issue #18. It records the patch identity in the header, the approval record's new SHA-256 in A3, and the merge commit.

B8. **What this opens.** With this act on `main`, the precondition of `DEC-20261011-01` B4 for Task 45 is met. Task 45 and every later task still need their own act.

B9. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. Rubric milestone 1 stays at **5** and rubric milestone 4 at **3**.

## Part C: Filing

C1. One docs-only pull request files this act, applies the patch to the four files in A3, and adds the report of B3. It changes nothing else.

## Part D: Not authorized

- Any change to code, tests, `bun.lock` or a manifest.
- Any edit of the Phase 3B documents.
- Any act on the items of B6.
- Task 45 and every later task.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-12

Actor-Id: founder
