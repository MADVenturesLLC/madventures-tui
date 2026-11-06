ADDENDUM 2 TO DEC-20261104-02: the printed timings taken when the test reads each fact, and Hardening F continued by one commit

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261104-02`, filed at `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6`, SHA-256 `011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5`, as Addendum 1 amended it, SHA-256 `eb5bee7bf4c0c6564b0653ab89029fa32a1c7adc2566137ccf8a92835c965723`
> **Builder prompt it continues:** SHA-256 `174b024dac8fbc56c3911037604ca423d039211e2f592b4818b7a4b43f9a5c55`
> **Read with:** `DEC-20261104-02` B3 items 2 to 4 and 7, B7 item 6 and B9 item 2; Addendum 1 B2 to B4; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The build.** The builder `session:claude-code/hardening-f-r1`, on `build/hardening-f-r1` in `/home/michaeldaley/builds/madventures-tui-hardening-f-r1` on the Ubuntu PC, made commit `9b9ca51ed17b407cc676ac099694c6c0d9537a63` on `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6` and reported no halt. In its five runs of the changed test file, the second test printed a `grace_ms` from 2020.20 to 2024.59, and the first test printed a `termination_started_ms` of about 20 in four runs and 0.53 in one. The branch has not been pushed. These are the builder's reported facts; the drafting assistant has not seen its logs.

A2. **The cause.** In `spawnSignalsHost` of `packages/pty-host/test/signals.test.ts` at `03e9efec79eaeacb0ff185e2d84cf94a14aa46e6`, each chunk the reader reads calls `wake`, at line 107, which empties the list of waiters, at lines 85 to 87. A waiter woken by a chunk that does not hold its fact is then found only by its re-check every 20 ms, at line 134. A printed time can therefore be up to one re-check later than the moment the fact was read, and later still under load. The builder recorded this in its build log, and the drafting assistant confirmed it from the code.

A3. **Why it matters.** A late `termination_started` lowers `grace_ms`, and a late `exited` raises it. So `grace_ms` can fall below 2,000 although the host waited the full grace, or exceed it by time the host did not spend. Under Addendum 1 B4, a value below 2,000 halts Task 58 on a host, and the MacBook's first load averages in the hunt of `DEC-20261104-01` A9 reached 9.28.

A4. **The drafting assistant.** It drafted `DEC-20261104-02`, Addendum 1, which chose this measure, and this addendum. None of that is an independent review.

## Part B: Founder rulings

B1. **The measure.** In `spawnSignalsHost`, the reader records the `performance.now()` time at which it decodes each fact, and the session gives that time for a fact. Every value the two tests print is taken from those times, measured from `t0`: `termination_started_ms` in the first test, and in the second test `termination_started_ms` and `exited_ms`, with `grace_ms` their difference. The lines keep the form of Addendum 1 B2. The waiters, the re-check, every assertion and timeout, and the values the assertions use do not change.

B2. **Hardening F continues.** The builder of A1 continues in the same session, branch and clone with one more commit on `9b9ca51ed17b407cc676ac099694c6c0d9537a63`. The commit makes the change of B1 in `packages/pty-host/test/signals.test.ts` and adds a section on this addendum to `docs/verification/hardening-f-build-log.md`. The paths stay those of B3 item 3, the gates of B3 item 4 with Addendum 1 B3 run again in full, and the halts of B3 item 7 with Addendum 1 B3 apply. If that session has ended, the build halts for my ruling.

B3. **Task 58.** Each report gives the values of B1, under B9 item 2 and Addendum 1 B4, which stand.

B4. **Counting and filing.** These are new Founder rulings, which plan §11.3 does not count. No review verdict has been given on Hardening F, and this adds no round. This addendum takes effect when I sign it and is filed unchanged with my next act, with Addendum 1.

## Part C: The builder's next steps

C1. Confirm that this addendum, at `/home/michaeldaley/builds/hardening-f-r1-pr/DEC-20261104-02-addendum-2-fact-arrival-times.md`, has the SHA-256 the Founder gives you, that HEAD is `9b9ca51ed17b407cc676ac099694c6c0d9537a63` on `build/hardening-f-r1`, and that the tree is clean.

C2. Make the change of B1 and nothing else in the test file. Show its diff against `9b9ca51ed17b407cc676ac099694c6c0d9537a63`.

C3. Run the runtime check and every gate of FINAL GATES of your builder prompt again, in its order, under its rules for logs, the load and halts, with log names that overwrite no earlier log. Quote both printed lines from each of the five runs of the changed file.

C4. Add the build log section: this addendum, the cause of A2, the change, and the new gates with each log's SHA-256. Commit both paths with parent `9b9ca51ed17b407cc676ac099694c6c0d9537a63` and the subject `test(pty-host): time the printed facts when the reader decodes them`, under the rules of ATTRIBUTION AND COMMITS of your builder prompt.

C5. Update `pr-body.md` to cover both commits, keep `pr-title.txt`, and run both attribution-shape checks again. Report as FINAL REPORT of your builder prompt says, for both commits.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-05

Actor-Id: founder
