DEC-20261112-03 ADDENDUM 1: H2's resumed session and its read-only turn

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** how `DEC-20261108-03` Addendum 10 B6 is read for H2
> **Read with:** `DEC-20261112-03`; `DEC-20261112-02` B2 and B5; `DEC-20261108-04` B9, Part D and its Addendum 1 B4 to B6; `DEC-20261108-03` Addenda 2, 4, 6, 10 and 11; `DEC-20261023-01` Part B

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The session.** H2's builder session, `session:codex/3b-h2-r1`, runs in `/Users/michaeldaley/builds/h2-r1` under the builder prompt I signed, SHA-256 `ebcbfe9c313d5778721e3c90fe66f78f3faeac1e321419dd7e558969ae4b58be`, and my two resume messages, SHA-256 `4c5e03d21b743769334af175f4e400c9ee2d93bc7ebb2c0a368a5bc73b08b4ed` and `88c0afdeb42dfb522e7e874c2eb4fc44504ceac5e7da522596d40b2b4b0b3863`. Its one record, `rollout-2026-11-12T11-37-48-01a1d09f-6162-7dd1-ad17-ac8ce4e01efe.jsonl`, started at `2026-11-12T16:38:04.887Z` and names `cli_version` `0.167.0`. Its turns at `16:38:05.162Z`, `18:38:06.511Z` and `19:05:33.065Z` record approval `on-request`, the approvals reviewer `user`, sandbox `workspace-write` with network access off, the folder `/Users/michaeldaley/builds/h2-r1`, the model `gpt-6.1-sol` and the effort `xhigh`. The session made `764e3df5c616ff04043bb3d4fd72682bdbd35c4d`, which opens the build log, and `9cc055c3c4d643672fefe2b4c5d0ef78eb2572bd`, which adds the Linux capability record.

A2. **The close.** After the session's last call, at `2026-11-12T21:56:07.555Z`, I closed it by accident and resumed it through `/Users/michaeldaley/builds/codex-governed`, without its sandbox and approval options. Its fourth turn, at `2026-11-12T21:56:35.893Z`, records sandbox `read-only` with no network access value, approval `on-request`, the approvals reviewer `user`, the folder `/Users/michaeldaley/builds/h2-r1`, the model `gpt-6.1-sol` and the effort `xhigh`. In that turn the session called no tool. As its builder prompt requires, it reported the sandbox and stopped, at `21:57:02.685Z`.

A3. **The state at the stop.** HEAD is `9cc055c3c4d643672fefe2b4c5d0ef78eb2572bd`. The working tree holds the uncommitted work of the third commit: changes to `packages/storage/src/capability-store.ts` and `packages/storage/src/index.ts`, and the new file `packages/storage/test/linux-capability-store.test.ts`. In `capability-store.ts` it also holds the deliberate break of logs 150 and 151, which changes the write flag `wx` to `w`. The builder's copy of that file before the break, `/private/tmp/3b-h2-resume-rlms2sz7/retention-before.ts`, has SHA-256 `d81ba19a418daa253a94bbe9d17558abdfa8d44021f879f70dc26bd2a0569778` and differs from the file by that one line. No run of the test the break targets was logged: log 151 is the last. No governed background server or updater runs.

A4. **The rule it meets.** Addendum 10 B6 has my check require, for every record after record 6, that every turn record sandbox `workspace-write` with network access off, and halts the slice for my ruling otherwise.

A5. **The drafting assistant.** A Claude Code session drafted the builder prompt, both resume messages, my check and this addendum, and read the facts of A1 to A3 from the output of my read-only command. That is not an independent review.

## Part B: Founder rulings

B1. **The turn.** The read-only turn of A2 is a deviation of my environment, not of the builder's work. I accept it, for that turn alone, as a material deviation from Addendum 10 B6. It is not a halt under `DEC-20261108-04` Part D.

B2. **The check.** For H2, my check of Addendum 2 B4, as Addenda 6 B1 and 10 B6 and `DEC-20261112-02` B2 and B5 read it, passes the turn of A2 only if, in the record of A1, it is the turn at `2026-11-12T21:56:35.893Z`, records exactly what A2 states, and no call lies between it and the next turn. Every other turn of every record started in `/Users/michaeldaley/builds/h2-r1` meets Addendum 10 B6 as written. Before the check runs, its self-test also shows that it passes that turn, and stops on a call inside it and on a read-only turn at any other time.

B3. **Resumption.** The session resumes in the same record, started by me through `/Users/michaeldaley/builds/codex-governed` with `resume 01a1d09f-6162-7dd1-ad17-ac8ce4e01efe -s workspace-write -a on-request` from inside `/Users/michaeldaley/builds/h2-r1`, under a resume message I sign that names this addendum. Before anything else, the builder confirms that its harness shows sandbox `workspace-write` and approval `on-request`, and the state of A3. The break of A3 stands: the builder runs the test it targets as that break's first run, then restores the file from its copy as my first resume message says, and continues.

B4. **No wider leave.** This addendum covers the one turn of A2. A later turn whose sandbox or approval differs stops the session as its builder prompt says, and halts H2 for my ruling.

B5. **Counting and filing.** A stop is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it, as the addenda of `DEC-20261108-03` did, and is filed unchanged with the act that records H2's merge. Nothing else in `DEC-20261112-03` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-12

Actor-Id: founder
