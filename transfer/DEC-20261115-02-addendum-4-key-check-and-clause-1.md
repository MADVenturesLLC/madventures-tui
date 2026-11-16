DEC-20261115-02 ADDENDUM 4: the key check and the record script's statement of clause 1

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** how `DEC-20261115-02` B8 item 1 checks the outputs of the investigation; the record script of its B7 item 1, B10 and B15 item 3
> **Read with:** `DEC-20261115-02` and its Addenda 1 to 3; M0's builder prompt, R6; Phase 3A design §2.2; Phase 3B design §2.6 item 1; `DEC-20261103-02` B3 and B6

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The prefix in madv-surface's own output.** At madv-surface's release commit `91bfb38549bcab37740d2c4564c371ee390a63e7`, every stream-json run emits a `system/init` event that carries the profile's `billing_guard` text (`src/agent.ts` line 156). For the `minimax` profile that text is "The enforced sk-cp- key prefix keeps every request on an M Plan key; plan and pay-as-you-go keys share the host and only a pay-as-you-go key charges the account balance." (`src/profiles.ts` line 162). madv-surface's own redaction takes for a key the pattern `sk-` followed by at least eight characters from letters, digits, `_`, `.` and `-` (`src/redact.ts` line 8), which that sentence does not match.

A2. **What follows.** `DEC-20261115-02` B8 item 1 has each command check that no output it keeps contains the prefix `sk-cp-`. Read as written, every capture of B8 item 3 items 4 to 6 fails that check on that sentence alone. The record script of Phase 1, `record/m0-record.ts`, SHA-256 `de3ea7cc7ded52c5ab14eed40280d420ce375e9c56b12cfd838cf2010a5550dd`, refuses any file it reads, or record it builds, that holds `sk-cp-` or `sk-ant-`, as item c of R6 of the builder prompt told it to, so it would refuse those captures and build no madv-surface record. The drafting assistant wrote B8 item 1 and R6 without reading the `billing_guard` text; the errors are its own.

A3. **Clause 1 in the record script.** For madv-surface the script states that the first clause of Phase 3A design §2.2, "a documented CLI or API primitive returning the resolved provider and exact model for the actual session", is met whenever its identity result passes. `DEC-20261115-02` B9 rests on the `model_response` event, the structured per-response metadata of the second clause (Phase 3B design §2.6 item 1), and the probe that emits it is a process apart from the governed session (Phase 3A design §2.2). The first clause is not established, as the script's own Claude Code branch states for Claude Code.

A4. **The drafting assistant's verification of Phase 1.** After my push command, the drafting assistant fetched `build/3b-m0-r1` at `7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3` and the evidence of `DEC-20261115-02` Addendum 3 B3 on the transfer branch, found each hash the builder reported, and read the production diff, the adapter's parser against the event order of madv-surface's release source and its recorded samples, and the record script. Under Bun 1.4.4 in its own Linux container, at that head, the frozen install and `bunx tsc --noEmit` passed, and bare `bun test` ran 2015 tests across 146 files with 2007 pass and 8 fail, the same 8 tests that fail there at the unchanged base, on storage-root ownership and process timing; that is not a certification runtime. Apart from A2 and A3 it found no defect. That is not an independent review.

## Part B: Founder rulings

B1. **The key check.** `DEC-20261115-02` B8 item 1 is read so that each command checks that no output it keeps contains the key itself, compared as an exact string, or any string that madv-surface's own redaction takes for a key: `sk-` followed by at least eight characters from letters, digits, `_`, `.` and `-`. The prefix inside the `billing_guard` text of A1 is not a key, and the outputs that hold it are kept. My commands for `DEC-20261115-02` B15 item 2 apply the same pattern to their outputs.

B2. **The record script.** The builder changes `record/m0-record.ts` in two ways and no other:
1. its refusal of item c of R6 applies to a string of the pattern of B1, in place of the bare prefixes `sk-cp-` and `sk-ant-`; the script holds no key, so the comparison with the key itself is my command's;
2. for madv-surface, `sanitized_facts` states that the first clause of Phase 3A design §2.2 is not established, and that the result rests on the second clause, the `model_response` fields of captures 04 to 07 that it names.

B3. **How.** Under a resume message I sign, in its session, the builder makes the changes of B2, shows the changed script and its diff in full, runs again each synthetic run of item f of R6 with every synthetic `system/init` event of madv-surface carrying the `billing_guard` text of A1, adds one run whose capture holds a synthetic string of the pattern of B1, which the script refuses, and halts with a report. It makes no commit and changes nothing in its clone. Addendum 3 B4 applies from that message.

B4. **Order.** My investigation of `DEC-20261115-02` B8 and B15 item 2 on my MacBook may run before or while the builder works under B3; my record runs of B10 and B15 item 3 use only the script of B3, after my check of it.

B5. **The record.** M0's build log, in its Phase 2 part, and its pull request description record A1 to A3 in short, the script of B3 by its SHA-256, and this addendum by its SHA-256.

B6. **Filing and counting.** This addendum takes effect when I sign it, and is filed unchanged with the act that records M0's merge, with Addenda 1 to 3. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` or its Addenda 1 to 3 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-16

Actor-Id: founder
