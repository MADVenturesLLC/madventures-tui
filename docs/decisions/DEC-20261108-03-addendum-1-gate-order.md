FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 1: the order of H1's last gates and its build log, and the launcher's configuration

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261108-03` B6 item 5, B8 item 4 and B10 item 3, as read below
> **Read with:** `DEC-20261108-03` B6 to B8, B10, B12 and B13; `DEC-20261103-01` B3

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The conflict.** `DEC-20261108-03` B8 item 2 makes the build log the fifth and last commit. Its B8 item 4 runs the gates after the last change, and requires `git diff --name-only` against the binding base to list exactly the paths of B7, which include the build log. Its B10 item 3 requires the build log to hold every command of B8 with its result. A build log cannot hold the results of commands run after it is committed, and the builder makes no amend.

A2. **The launcher's configuration.** `DEC-20261108-03` B6 item 5 says the builder reads nothing under `~/.codex-governed`. Under `DEC-20261103-01` B3, the launcher that starts the builder's session sets `CODEX_HOME` to that directory and loads its configuration from it. Copilot's review 5819201083 of pull request 231 noted the tension in its overview, without a thread.

A3. **The drafting assistant.** A Claude Code session found A1 while drafting H1's builder prompt, after I signed `DEC-20261108-03`, checked A2, and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **The order.** After the fourth commit, the builder runs the first five gates of B8 item 4, from `bunx tsc --noEmit` to bare `bun test`, each once and in order. It then writes the build log, holding them, and makes the fifth commit. At that commit it runs the last four gates of B8 item 4, from `git diff --check` to `git ls-files --others --exclude-standard`, each once and in order, with the results B8 item 4 requires.

B2. **The record.** The results of those last four commands, each with its log's SHA-256, are recorded in the builder's final report and in the pull request description, not in the build log, and B10 item 3 is read so. The build log says that those four commands run after it is committed.

B3. **The launcher's configuration.** The ban of `DEC-20261108-03` B6 item 5 on reading under `~/.codex-governed` binds the builder's own commands and file reads. The launcher of `DEC-20261103-01` B3 loading its own configuration from that directory, when it starts the session, is not a read by the builder.

B4. **Unchanged.** The run of B12 and the review of B13 are unchanged. The review checks the last four commands against their logs.

B5. **Counting and filing.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge. Nothing else in `DEC-20261108-03` changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-08

Actor-Id: founder
