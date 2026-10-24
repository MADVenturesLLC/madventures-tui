FOUNDER-ACT-20261024-SEPARATION-PIN-RULE: the digest pins of the harness-separation test

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `3fa9c3f7ea2d4ee39815cffb0daa53b06b550497`
> **Binding base:** for the Task 24 correction, as `DEC-20261023-01` Part C names it; for every later task, the binding base its builder prompt names
> **Read with:** `AGENTS.md`; `DEC-20261018-02`; `DEC-20261015-05` B3; `DEC-20261023-01` Parts B and C

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read `test/phase3a/harness-separation.test.ts` at the commit in the header, lines 1 to 80 and 215 to 225, the commit that merged pull request 177 as it touched that file, and the stop report of the Task 24 correction builder as I relayed it. It ran no test.

A2. **The pin.** The harness-separation test of `DEC-20261018-02` keeps an `EXCEPTIONS` table of production files that each contain one computed call the analyzer cannot resolve. Each entry pins the file's whole SHA-256 and the one allowed call. If the file's bytes change, the test reports `exception-drift`, and the allowed call is reported as `computed-dispatch-unresolvable`, until the pin is updated. The pin exists so that any change to such a file is reviewed. It is not a ban on changing the file.

A3. **The stop.** Under `DEC-20261023-01` C1, the Task 24 correction adds the forwarding of `publish` to the broker delegate in `packages/supervisor/src/build.ts`. That changes the file's bytes from SHA-256 `bd73bb219e96bc76d3b4e544cde9152ef028ce12d02003ff67d93347f39ca35d`, the value pinned for it, so the full suite failed exactly the three tests of the harness-separation file that read the pin. `test/phase3a/harness-separation.test.ts` is not among the paths of `DEC-20261023-01` C4, so the builder stopped. Its other D3 checks passed.

A4. **The precedent.** Pull request 177 changed `build.ts` and, among its approved paths, made a digest-only change to the same pin.

A5. **The drafting assistant.** It drafted this act and the acts it amends. None of that is an independent review.

## Part B: Founder rulings

B1. **A standing pin rule.** For the rest of Phase 3A, when a task is authorized to change a file that has an entry in the `EXCEPTIONS` table of `test/phase3a/harness-separation.test.ts`, that task may also change `test/phase3a/harness-separation.test.ts`, only to set that entry's `sha256` to the SHA-256 of the file as the task commits it. It changes nothing else in that file: not the entry's `call`, not any other entry, and no line of the analyzer or its tests. The pin change is valid only if, with it, the whole harness-separation test file passes, so the analyzer finds no other route from production code to the test tree.

B2. **The review of a pin change.** The builder quotes, under Deviations, the old and new SHA-256 of the pinned file and the diff of that file, and confirms that its one allowed call is unchanged. Every Tier-2 review of such a task reads that diff and confirms that it adds no route from production code to the test tree, whether or not the analyzer could detect it.

B3. **The Task 24 correction.** Under B1, `test/phase3a/harness-separation.test.ts` is added to the paths of `DEC-20261023-01` C4, which then number eight, only for the `build.ts` entry's `sha256`. The correction builder updates that pin, then restarts D3 from its first item, as `DEC-20261023-01` B4 provides; its D1, RED runs and breaks stand.

B4. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3. The correction builder resumes only after it merges, under an addendum I sign.

## Part D: Not authorized

- Any change to `test/phase3a/harness-separation.test.ts` other than a pin of B1.
- Any new entry in the `EXCEPTIONS` table, or any change to an entry's `call`.
- Any change to the plan, the spec or any decision record other than this filing.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-24

Actor-Id: founder
