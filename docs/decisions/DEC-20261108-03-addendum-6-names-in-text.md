FOUNDER-ACT-20261108-PHASE-3B-H1 ADDENDUM 6: tool names in text and the check of Addendum 2 B4, and the halt of H1's push

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** Addendum 2 to `DEC-20261108-03`, B4, as read below
> **Read with:** `DEC-20261108-03` B13; its Addenda 2 to 5; `DEC-20261108-04` Addendum 1 B5

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** After the fifth session's final report, which gives H1's head as `d09712a67db06fc6a7cee9bf0674ac8b509a8200`, my push command ran the check of Addendum 2 B4. It reported four session records started in `/Users/michaeldaley/builds/h1-r1` and a barred total of 19, and stopped before any GitHub call. Nothing was pushed.

A2. **What the 19 are.** A read-only command I then ran printed, for each of those records, its start time, its calls, the names of Addendum 2 B4 inside `exec`, and up to 50 characters either side of each, which the check of Addendum 2 A4 does not print. The records are:
1. `rollout-2026-11-08T18-51-11-01a1bd92-b707-7431-8632-1b2b88b7e5cc.jsonl`, started `2026-11-08T23:51:11.394Z`, with no call;
2. `rollout-2026-11-08T19-59-01-01a1bdd0-d3b9-7c90-b69f-f210bf3fb977.jsonl`, started `2026-11-09T00:59:01.947Z`, with no call;
3. `rollout-2026-11-08T20-04-43-01a1bdd6-0a76-7a63-869b-bcabc1a7e31a.jsonl`, started `2026-11-09T01:04:43.639Z`, with 62 calls of `exec` and 5 of `wait`;
4. `rollout-2026-11-09T18-45-22-01a1c2b3-c154-79a0-83a7-e315c72e0e8d.jsonl`, started `2026-11-09T23:45:22.800Z`, with 100 calls of `exec` and 19 of `wait`.

No top-level call is one the check counts as barred. All 19 occurrences lie in the input of four `exec` calls: in record 3, the call at `2026-11-09T01:21:15.274Z`, and in record 4, the calls at `2026-11-10T01:03:59.153Z` and `2026-11-10T01:05:33.527Z`, each text listing the harness's namespaces and tool names that names `mcp__codex_tui`, `list_mcp_resource_templates`, `list_mcp_resources`, `read_mcp_resource`, `view_image` and `spawn_agent` once each; and in record 4, the call at `2026-11-10T03:24:37.360Z`, a sentence naming the "deferred mcp__codex_tui, which is not a loaded server". The counts of each record match those four passages exactly.

A3. **Why the check stopped.** The check counts a name wherever it appears in the input of an `exec` call, not only where it is called. Addendum 2 B3 has the builder's identity report list every tool name its harness shows, so a builder that writes or prints that list through `exec` raises the count without calling any of those tools. The check was tested against planted calls only, not against text that names the tools.

A4. **The records and the sessions.** Addenda 2 to 5 describe five builder sessions, and the check found four records. Which session each record holds is not established here. The act that records H1's merge states it.

A5. **The drafting assistant.** A Claude Code session designed the check of Addendum 2 B4 and the command of A2, read their output as I pasted it, and drafted this addendum. That is not an independent review.

## Part B: Founder rulings

B1. **The reading.** In Addendum 2 B4, the counts inside `exec` are counts of calls of those tools. A name that appears only in text the builder writes, prints, reads or searches for is not a call.

B2. **H1.** The 19 occurrences of A2 are text and not calls, and H1 passes the check of Addendum 2 B4. My push command runs the check again and goes on only if it finds exactly the four records of A2, no top-level call outside those Addendum 2 B4 allows, and inside `exec` exactly the 19 occurrences of A2, by record, call time and name. Anything else halts H1 for my ruling.

B3. **Other slices.** B1 is how Addendum 2 B4 is read for every slice of `DEC-20261108-04` Part C, to which its Addendum 1 B5 applies it. Before I run a slice's check, the check is shown to pass text that names each of those tools and to stop on a call of each. An occurrence the check cannot place as text halts the slice for my ruling.

B4. **The review.** The review prompt of `DEC-20261108-03` B13 quotes the output of the check as B2 runs it, as Addendum 2 B4 requires, and the excerpts of A2.

B5. **Counting and filing.** A halt is not a verdict and adds no round. These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it and is filed unchanged with the act that records H1's merge, with Addenda 1 to 5. Nothing else in `DEC-20261108-03` or its Addenda 1 to 5 changes.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-10

Actor-Id: founder
