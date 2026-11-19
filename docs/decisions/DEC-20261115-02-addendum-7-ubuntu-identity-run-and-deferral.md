DEC-20261115-02 ADDENDUM 7: the Ubuntu identity run, and madv-surface's admission after a tool-free probe

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** `DEC-20261115-02` B9, B10 and B11 for madv-surface; how M0 completes
> **Read with:** `DEC-20261115-02` and its Addenda 1 to 6; `DEC-20261108-04` B6 and B7; `DEC-20261114-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The Ubuntu investigation.** After the check of Addendum 6 B4 passed, my guarded command ran the primitives of B8 item 3 and B15 item 2 once each on my Ubuntu PC into `/home/michaeldaley/builds/m0-investigation-ubuntu`, whose `MANIFEST.sha256` has SHA-256 `e0b4fdef6cb93f682fa7f6431352c642beae1b4bf7a29cc8419bd3d0b1c408fd` and covers 142 files, none holding the key or a string of the pattern of Addendum 4 B1. Every check that decided whether the command went on passed.

A2. **madv-surface on my Ubuntu PC.** Item 1 matched A4, item 2 printed `madv-surface 0.1.1`, and item 3 exited 0 with the fields of B4. Captures 04 and 06 each exited 0 with `system/init`, `model_response`, `assistant` and `result/success`, the `model_response` naming `MiniMax-M3.1-Flash`. Capture 05's `model_response` named `MiniMax-M3.1-Flash`; the model then called `list_dir` on `.`, which returned nothing, and `search` for the pattern `model`, which returned `no matches`; the one-turn limit ended the run with `result/error_max_turns`, exit 1 and no standard error. Capture 07 requested `MiniMax-M3.1-Flash-Preview` and exited 0 with a `model_response` naming `MiniMax-M3.1-Flash` and `result/success`.

A3. **Claude Code on both hosts.** On my Ubuntu PC all 18 items exited 0; every `system/init` of captures 09 to 13 shows `dontAsk` and no MCP server, plugin or tool; captures 10 and 11 were served by `claude-fable-5-2`, canonical, provider `firstParty`, with positive output tokens and no tool call. My record run there, with the script I accepted under Addendum 5 B6, SHA-256 `b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593`, passed 75 checks and stored a record with `overall` `pass`, SHA-256 `eecac7b942288ecec1ebb6069a76f62e66ad726940615d0da9638f5a75112207`, its logs indexed by `LOGS.sha256` with SHA-256 `19c1d3ffdf8ca5a1996a20469c45f6a800ac22aaf842c42248ff694a72a28c15`. My MacBook's record of Addendum 5 B6 has SHA-256 `2b3314bfcb3a8714966d7f07da5b8290320e2a2dfb634d13899b1e8cb7f6edd3` and `overall` `pass`.

A4. **Why capture 05 failed.** madv-surface 0.1.1 gives its reviewer role the tools `read_file`, `list_dir` and `search`, and no flag removes them (`src/cli.ts` at the release commit). B3 item 1 runs the identity probe with `--max-turns 1`, so a tool call ends the run before any answer, and the parser of B3 fails it, as preflight would. Across both hosts, 2 of 8 MiniMax calls with this prompt turned to tools first, my MacBook's capture 07 and my Ubuntu PC's capture 05, each the same read-only search of an empty directory.

A5. **The standing commission.** `DEC-20261108-04` B6 lets the attestation prompt, whose fixed text the probe sends, cause at most 2 provider round-trips and 0 tool calls, and B7 makes the identity probe one request. A probe that lets a tool call finish would break both. While madv-surface offers its model tools in the probe, any start can fail closed this way. The drafting assistant first recommended raising `--max-turns` without reading B6 and B7; the error is its own.

A6. **The drafting assistant.** It wrote my commands and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **The halt.** B9 item 2 is not met on my Ubuntu PC, and the halt under B9 was correct. The madv-surface captures of both hosts stand as evidence only. No madv-surface record is written from them.

B2. **My MacBook's madv-surface record.** My guarded command moves the madv-surface record my MacBook stored under Addendum 5 B6, SHA-256 `63463700ab6e500123fc64411a24b7bd8b8a92e395796544b0a8cbcab6f97792`, unchanged, out of the capability store into `/Users/michaeldaley/builds/m0-r1-records/withdrawn/`, and checks that the store holds no madv-surface record. Its copy on the transfer branch stays as evidence of what was observed. Until B4, madv-surface has no capability record on either host, and preflight refuses it.

B3. **Claude Code.** B15 item 4 is met on both hosts by the records of A3. B15 item 1's version `2.1.325` stands, and the governed configurations stay as Addendum 5 B2 and Addendum 6 B2 and B3 left them.

B4. **madv-surface's admission.** madv-surface is admitted only after a release of madv-surface in which the probe offers its model no tools, released under its own act as `DEC-20261114-01` released 0.1.1. A later act of mine then changes the madv-surface registration to that release and its probe, runs B8 on both hosts once more, and writes its records under B10. B9 and B10 apply to those runs, not to the runs of A2 and of Addendum 5.

B5. **The rest of M0.** M0 goes on to Phase 2 and its merge with madv-surface unadmitted. Its code for madv-surface, the registration, adapter, parser and allowlist of Phase 1, merges as built and is changed only by the later act of B4. The investigation packet of B11 holds both hosts' investigations, the halts and rulings of Addenda 5 to 7, the two Claude Code records of A3 with the SHA-256 of each stored file, the record of B2 as withdrawn, and every limitation. The builder's Phase 2 starts under a resume message I sign.

B6. **The record.** M0's build log, in its Phase 2 part, and its pull request description record A1 to A5 in short and this addendum by its SHA-256.

B7. **Filing and counting.** This addendum takes effect when I sign it, and is filed unchanged with the act that records M0's merge, with Addenda 1 to 6. These are new Founder rulings, which Phase 3A plan §11.3 does not count. Nothing else in `DEC-20261115-02` or its Addenda 1 to 6 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-17

Actor-Id: founder
