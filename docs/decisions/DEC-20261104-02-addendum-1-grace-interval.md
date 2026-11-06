ADDENDUM 1 TO DEC-20261104-02: the responsive-host grace printed from the host's confirmation, after Copilot's review of pull request 223

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261104-02`, SHA-256 `011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5`, in pull request 223 at head `13016aeebafde7170e4265757627372d46807751`
> **Read with:** `DEC-20261104-02` A4, B3 items 2, 4 and 7, B7 item 6 and B9 item 2; plan §8.5 and §11.3; spec §9.8

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **Copilot's review.** Review 5778382955 of pull request 223, at head `13016aeebafde7170e4265757627372d46807751`, opened one thread, comment 4475411465, on B3 item 2 of `DEC-20261104-02`. It says that `<total>` is measured from the terminate command and so includes the time to `termination_started`, that the responsive-host grace of plan §8.5 starts after SIGTERM, and that the post-SIGTERM interval, or the host's own `grace_waited`, should be printed and checked on its own.

A2. **The code at `27d8e83ceca252be753d7994872a3dca50494782`.**
1. In `packages/pty-host/src/signals.ts`, `terminateChildGroup` emits `termination_started` at line 132 and sends SIGTERM to the group at line 138, where the grace starts.
2. Its `grace_waited` is set at line 159 to the smaller of the time since SIGTERM and 2,000 ms. For a child that ignores SIGTERM it is therefore always exactly 2,000, not an observed value. The host's closer discards the record the ladder returns, at line 360 of `packages/pty-host/src/main.ts`, so a test that runs the host as a process cannot read it.
3. The spike defines `responsive_grace_given_ms` as the time from the command to the exit less the time from the command to the acknowledgement, at line 1616 of `test/phase3a/spike/bun-terminal-spike.ts`.
4. Plan §8.5 applies the 2,000 ms grace only after a responsive host confirms SIGTERM. B9 item 2 has each report give a measurement as the value its log prints, so under B3 item 2 as signed, the report's grace row would carry the time from the terminate command.

A3. **The drafting assistant.** It drafted `DEC-20261104-02`, including the item this addendum corrects, and this addendum. None of that is an independent review.

## Part B: Founder rulings

B1. **The finding.** Copilot is right that `<total>` is not the grace interval of plan §8.5 and that the report's grace row needs a printed value of its own. `grace_waited` is not used, for the reasons of A2 item 2.

B2. **B3 item 2 amended.** The test "a child ignoring SIGTERM is SIGKILLed after the 2 s grace" prints one line, `signals sigterm_ignored termination_started_ms=<started> exited_ms=<total> grace_ms=<grace>`, where `<grace>` is `<total>` less `<started>`. That is the time from the host's confirmation, which it emits just before it sends SIGTERM, to the `exited` fact, as the spike defines it. Every other part of B3 item 2 stands, and no assertion is added or changed.

B3. **Hardening F's gates and halts.** In each of the five runs of B3 item 4, the build log reports `grace_ms`. A `grace_ms` below 2,000 in any run is added to the halts of B3 item 7.

B4. **Task 58.** Under B9 item 2, each report gives the responsive-host child grace as `grace_ms`, with `termination_started_ms` and `exited_ms` beside it. Under B7 item 6, a `grace_ms` below 2,000 is a printed timing outside its bound.

B5. **Counting and filing.** These are new Founder rulings, which plan §11.3 does not count. Copilot's review is not a countable verdict under plan §11.3 and adds no round. This addendum takes effect when I sign it and is filed unchanged with my next act. Pull request 223 merges with `DEC-20261104-02` unchanged. Nothing else in `DEC-20261104-02` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-05

Actor-Id: founder
