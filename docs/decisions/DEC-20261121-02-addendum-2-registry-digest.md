DEC-20261121-02 ADDENDUM 2: the registry digest that the Phase 3A harness-separation test pins

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261121-02` B5 item 3
> **Read with:** `DEC-20261121-02` A3, B2, B5, B12 and Part D, and its Addendum 1; `DEC-20261115-02` Addendum 1 B3 item 3; `DEC-20261024-01` B1 and B2

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** Under my first resume message, SHA-256 `be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5`, the admission builder ran the full run of Phase 1 again at `f73b5649afff86b558978cb76d09132bc0a7396a` under Bun 1.4.2. Bare `bun test` ended with 2,032 pass and 3 fail across 150 files; the builder reports every test of the base present, after the renames Addendum 1 allows, and all eight tests it added passing. All three failures come from one pin. Line 24 of `test/phase3a/harness-separation.test.ts` holds the SHA-256 of `packages/protocol/src/adapter-registry.ts`, in the entry of the `EXCEPTIONS` table that is the exact-byte exception the Task 48 supplement approved for the one call of `Symbol.iterator` on `source` in that file, so any change to that file is drift. The two values of B2 change that file. B5 item 3 does not list `test/phase3a/`, so the builder halted under B12, as it should. Its second halt report has SHA-256 `a527426c3fe481189e36e9bcbc5142c130bccfe9abecde1f42c5f6d96a51c6fd`.

A2. **The facts.** At `0678bd4412d5aaed963ae20f101959bd92f79811`, `packages/protocol/src/adapter-registry.ts` has SHA-256 `fe5fd51a559890adf9e1d87a7d0c73d62e9500dbc0cfcda0f1da9ac9aa938453`, the value line 24 pins. That file with the two changes of B2 and no other has SHA-256 `6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4`, the value the builder reports at its head. M0 met the same pin, and `DEC-20261115-02` Addendum 1 B3 item 3 let line 24 take the digest of the registry at M0's head. `DEC-20261024-01` B1 and B2 set the same kind of pin change as a standing rule for Phase 3A. `DEC-20261121-02` left it out. That is an error in its drafting.

A3. **The drafting assistant.** A Claude Code session drafted `DEC-20261121-02` and this addendum, and checked A2 against the repository. That is not an independent review.

## Part B: Founder rulings

B1. **The pin.** `DEC-20261121-02` B5 item 3 is amended for this one line: in `test/phase3a/harness-separation.test.ts`, the `sha256` of the `packages/protocol/src/adapter-registry.ts` entry, at line 24, becomes `6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4`. Nothing else in that file changes: not that entry's `call`, not any other entry, and no line of the analyzer or its tests; and no other file under `test/phase3a/` changes. I approve the exact bytes of `packages/protocol/src/adapter-registry.ts` at the builder's head, SHA-256 `6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4`, as the exception the Task 48 supplement approved, on two conditions, as `DEC-20261024-01` B1 and B2 set them: that file's diff against the base changes only the two values of B2, and with the new pin the whole of `test/phase3a/harness-separation.test.ts` passes, with its one allowed call, that of `Symbol.iterator` on `source`, unchanged.

B2. **The work.** The builder makes the change of B1 in one commit of its own, with parent `f73b5649afff86b558978cb76d09132bc0a7396a`, before the fifth commit of its builder prompt's ATTRIBUTION AND COMMITS, named for what it changes. It then runs the full run of Phase 1 again from its first step, and does R4 at the head where that full run passes, as the resume message that delivers this addendum says. Under Deviations, its build log and its final report quote the old and new SHA-256 of `packages/protocol/src/adapter-registry.ts`, its diff against the base, and the diff of line 24, and confirm that the one allowed call is unchanged.

B3. **Halts.** B12 and Part D are read with the line of B1 added to the paths of B5 item 3. Any other change outside those paths still halts.

B4. **Delivery and record.** The builder receives this addendum in its prompt folder, with its SHA-256, by a resume message I sign. The build log, the pull request description and the act that records the admission build's merge name this addendum by its SHA-256 and the change it allows, and the review of the build reads the diff of B2. It is filed unchanged with that act, with Addendum 1.

B5. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it. Nothing else in `DEC-20261121-02` or its Addendum 1 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-22

Actor-Id: founder
