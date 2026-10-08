FOUNDER-ACT-20261008-TASK35-CONTAINMENT-SCOPE: Task 35 containment scope for changed built-ins, and the Error.prototype.name setter case

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Pull request:** #119, branch `build/m15-task35-r1`, a draft
> **Correction base (PR head):** `de8854340a2ef649e4afb0904dcd2a42dd314241`
> **`origin/main` when drafted:** `6b871d3fcec9d1149f4346b0034f325a9b06e989`
> **Read with:** `DEC-20261008-01` (SHA-256 `f5ca629f4fbfc522e143301031268a4d65005c795d6b8b889d78be9e62a1755e`), `DEC-20261007-01` (SHA-256 `2f51def55ee9313afb12aa9768efc62ef3a76c969784ccb42ad4f7f41690232b`), `DEC-20261006-01`, `DEC-20261005-01`, `DEC-20261004-03`, plan section 11.3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The builder's report.** `session:codex/m15-task35-r4`, working under `DEC-20261008-01`, stopped at its step 4 with an uncommitted two-file candidate. It reports that the full suite passes with 1,571 tests and that every required break fails test 7 alone. It reports one further case, at both the correction base and its candidate: input code installs a throwing setter for `name` on `Error.prototype`, and when the parser then constructs its own rejection, the input's error reaches the caller with record content. Its evidence is `/tmp/m15-task35-r4-evidence/continuation-report.md` on my host, SHA-256 `cbc8db112834079be88bef673033c309c9a6de9a8b3618511815ce760dff8589`. It asked me to authorize hardening and a new assertion in test 7. These are the builder's claims. The drafting assistant has not reproduced the case or inspected the candidate.

A2. **What the case is.** The parser's code does nothing wrong in it. The input's code has changed a built-in that every module in the process shares, and a step of the parser that is correct when the language behaves as specified then fails. The parser depends on many such built-ins, among them the `Error` constructor and its prototype, `Object.freeze`, `Object.defineProperty`, `Reflect`, and the methods of arrays, sets and maps. Code that runs in the same realm can change any of them. Guarding them one at a time leaves the next one open, and no module can make its guarantees hold by construction against code that has already changed the realm it runs in.

A3. **Round 5 is a different defect.** The input in finding 1 of the verdict recorded in `DEC-20261008-01` A1 replaced `Array.prototype.push`. The defect counted there was in the parser's own logic: it recognized a rejection as its own through a module variable that every exported function set, so a rejection raised by another call passed through. That defect does not depend on any built-in misbehaving. `DEC-20261008-01` B5 removes it, and its B6 assertions pin the removal, including under the replaced `push`.

A4. **No caller exists.** `DEC-20261004-03` Part F authorizes no caller of the module outside tests. How records reach a future caller, and what else runs in that caller's realm, is not decided yet.

A5. **The drafter.** The drafting assistant recommended this ruling. It narrows how `DEC-20261007-01` B3's words "by construction" apply. This act states the narrowing; it is not presented as the plain reading of the earlier acts. The drafter is not a reviewer, and nothing it checked is an independent review.

A6. This act governs where its terms conflict with `DEC-20261008-01`, `DEC-20261007-01`, `DEC-20261006-01`, `DEC-20261005-01` or `DEC-20261004-03`. Every clause of those acts that is not changed here stands.

## Part B: Founder rulings

B1. **Changed built-ins.** A built-in change is any change, made by code the input supplies, to a property of the global object or of any built-in constructor, prototype or namespace object of the realm, or to their prototype chains. When an input makes a built-in change, the parser is held only to these requirements:

- (a) the assertions of `DEC-20261008-01` B6 and `DEC-20261007-01` B5;
- (b) `DEC-20261008-01` B5, which is a rule about the parser's code: no module-level variable takes part in recognizing its own rejections. It is checked by reading that code.

Any other effect of a built-in change is advisory and not a round.

B2. **Everything else stays in scope.** `DEC-20261007-01` B3, as `DEC-20261006-01` B1 reads it, and `DEC-20261008-01` B5 apply in full to every input that makes no built-in change. That includes `Proxy` traps, accessors and conversion hooks, values they throw, rejections they obtain from this module, nested and earlier calls, and replays.

B3. **The setter case.** The case in A1 is a built-in change under B1. It is advisory and not a round. Under `DEC-20261008-01` B7 it is reported, not fixed. Neither the hardening nor the assertion is authorized. The builder continues under `DEC-20261008-01` without waiting for this act. It commits its candidate as tested and reports the case as advisory under this act in its PR section.

B4. **Future callers.** Before any caller of `parseCapabilityRecord` outside tests is authorized, the act authorizing it states how records reach the caller. It also states whether code from a source other than this repository can run in the caller's realm before or during the call. If it can, that act decides what protection is owed.

B5. **Rounds.** This act is a Founder ruling made during the implementation. Plan section 11.3 does not count it. It adds no round and changes no earlier one. Round 5 stands as `DEC-20261008-01` B1 records it. Rubric milestone 1 stays at 5 and rubric milestone 4 at 3. `DEC-20261008-01` B10 stands.

B6. **The re-review.** The packet of `DEC-20261008-01` Part F also contains this act, and the reviewer applies B1 to B3 to every item. The reviewer reports any case that makes a built-in change and breaks no requirement in B1 as advisory. It reports the setter case in A1 as advisory, if it confirms it. The tenth item of `DEC-20261008-01` F2 is read with B1 and B2.

## Part C: Filing

C1. This act lands in one docs-only pull request that changes only this file. It is on `main` with its status line reading ISSUED before the re-review of `DEC-20261008-01` Part F starts.

## Part D: Not authorized

- Any commit on PR #119 beyond the one `DEC-20261008-01` C1 authorizes, and any change to it for the case in A1.
- Any test beyond the twelve in `DEC-20261004-03` C2, and any assertion beyond `DEC-20261008-01` B6.
- Leaving draft, approving or merging PR #119: each needs a separate Founder act naming the exact head.
- Any caller of the module outside tests.
- Task 36, M15 closure, and every later task.
- Any edit to a spec, the plan, `PLAN-OPEN-3` or any decision record other than filing this act.
- Running the re-review.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-08

Actor-Id: founder
