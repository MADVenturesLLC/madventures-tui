FOUNDER-ACT-20261102-PHASE-3A-HARDENING-BUILDS: the two hardening builds of DEC-20261102-01 B1, and the Hermes rule for them

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `aa47038b0e4b5ea94eed40f0e6e14da5be053c37` (the merge of pull request 209)
> **Governs:** the twelve items of `DEC-20261102-01` B1
> **Read with:** `DEC-20261102-01` A3, B1, B4 and B7; `DEC-20261101-01` B5 and B6; `DEC-20261028-01` B5; `DEC-20261031-01`; `DEC-20261023-01` Part B; plan §11.3; spec §9.8

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What remains.** `DEC-20261102-01` B1 takes up items 1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 17 and 18 in hardening builds, each authorized by its own act and merged before Task 58's candidate commit is fixed. This act authorizes them.

A2. **The budgets.** The correction-round log shows rubric milestone 10 at 2 for the Codex builder sessions of the M23 and M24 build, rubric milestone 6 at 2 and rubric milestone 7 at 3, each for a builder since reassigned, and no round for Codex under rubric milestones 5, 6, 7 or 9. Items 5, 12, 13, 17 and 18 touch rubric milestone 10. The others do not.

A3. **Hermes.** On 2026-11-02 the Hermes processes that kept returning were traced to an MCP server named `hermes` in the configurations of Claude Code, of Codex and of a workspace open in Cursor, which each started it as a child process. Hermes was therefore available to the governed Claude Code and Codex sessions of the M23 and M24 build and of the filings since. A count-only check of the Codex session logs from 2026-10-28 to 2026-11-02 found no call of any Hermes tool, and the only log of a governed session that mentions Hermes does so in its prompt text. The Claude Code filing sessions were not checked the same way.

A4. **The drafting assistant.** It drafted this act and proposed the split, the builders and the Hermes rule. None of that is an independent review.

## Part B: Founder rulings

B1. **Two builds.** Each runs from a binding base on `main` that contains the merge of this act's filing, named in its builder prompt, on its own branch and pull request:
1. **Hardening A**, on `build/hardening-a-r1`: items 1, 3, 4, 7, 8, 9 and 10, by a fresh Codex CLI session on my MacBook with Actor-Id `session:codex/hardening-a-r1`.
2. **Hardening B**, on `build/hardening-b-r1`: items 5, 12, 13, 17 and 18, by a fresh Claude Code session on my MacBook with Actor-Id `session:claude-code/hardening-b-r1`.
They may run in either order or at once.

B2. **Paths.** A build changes only these paths, and no `bun.lock`, manifest, `AGENTS.md` or decision record:
1. Hardening A: `packages/broker/src/pty-host-supervisor.ts`, only for item 1; test files under `packages/broker/test/`, `packages/pty-host/test/`, `packages/supervisor/test/` and `apps/madbridge/test/doctor.test.ts`; and `docs/verification/hardening-a-build-log.md`.
2. Hardening B: `apps/madbridge/src/commands/export-evidence.ts`, only for items 13 and 18; `packages/artifact-store/src/manifest.ts`, only if item 18 cannot be met without it; test files under `test/phase3a/` and `apps/madbridge/test/`; `test/phase3a/runtime-harness.ts` and `test/phase3a/fixture-adapters.ts`, only as the tests of items 5 and 17 need; and `docs/verification/hardening-b-build-log.md`.

B3. **What each item needs.** Each item is met as `DEC-20261102-01` B1 states. A test for a production change fails without that change. A test for behavior production already has fails under a deliberate break of that behavior, made, shown and restored, with the restored file's SHA-256. Items 9 and 17 halt for my ruling if they need a production change.

B4. **Gates.** `DEC-20261023-01` Part B governs every run, with the macOS certification runtime and the load rule of `DEC-20261028-02` addendum 9 item 5: record the load, do not pause for it. Each build runs `bunx tsc --noEmit`, its focused tests, `bun test test/phase3a` and the full suite, and `git diff --check`, and writes its build log with each command, exit status and log SHA-256. A build is reviewed only after Verify and Verify (macOS) pass at its head on GitHub.

B5. **Hermes during the builds, answering `DEC-20261101-01` B5.**
1. Every governed Claude Code session starts with `claude --strict-mcp-config` and loads no MCP server. Every governed Codex session starts with the `hermes` MCP server disabled. After each start I confirm the Hermes count is 0, and a session that loads Hermes stops.
2. `DEC-20261028-01` B5 is amended so: Hermes is stopped while any guarded command of mine for this repository runs, and every such command stops if it finds a Hermes process. Hermes may run at other times, including while a builder or reviewer works, provided no governed session loads it and Hermes acts on nothing in this repository. Hermes never uses my decivantiq credentials in this repository.

B6. **Review.** Each build's final head is reviewed by a fresh Gemini 4 session on Antigravity on my MacBook, reviewer id `antigravity`, under a review prompt I sign. A FAIL with a substantive finding is answered by one correction commit under an addendum I sign and a new review. A second FAIL halts for my ruling. Each verdict counts under plan §11.3 for that build's builder, under the rubric milestone of each path its substantive findings touch.

B7. **Pull requests and merge.** The builder makes no GitHub call. My guarded command pushes its branch, opens the pull request as a draft, and marks it ready after the verdict. Neither pull request touches a governance path, so under `AGENTS.md` as `DEC-20261031-01` amended it each may merge on the required checks without a per-pull-request act. I merge each only after a posted Tier-2 PASS at its exact head, by merge commit through my guarded command, re-running held code-review runs one at a time as `DEC-20261101-01` B6 requires.

B8. **Filing sessions.** A filing session that a filing prompt I sign names may push its branch and open its draft pull request as `daley40-lab`, as every filing prompt has directed; the `AGENTS.md` rule that builder sessions make no GitHub call does not apply to it. Every agent clone sets `git config user.name` and `user.email` to `daley40-lab` and its no-reply address.

B9. **Halts.** The list is closed. A build halts and reports to me only when: a path outside B2 would change; items 9 or 17 need a production change; a test fails in a run whose first load average was 2.0 or more, which it does not rerun; a governed session loads Hermes; or the binding base differs from its prompt.

B10. **Counting and records.** These are new Founder rulings, which plan §11.3 does not count. No checkpoint closes. The next act I sign files the verdict entries of both builds in the correction-round log.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3 and changes nothing else. It merges by a Founder act naming its exact head.

## Part D: Not authorized

- Any path beyond B2, any change to `bun.lock`, a manifest, the plan, the spec, `AGENTS.md` or another decision record.
- Any item not in B1, any Phase 3B item, Task 57, Task 58 and Task 59.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-02

Actor-Id: founder
