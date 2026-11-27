FOUNDER NOTE ON THE COPILOT REVIEW: MADVenturesLLC/madventures-tui#256

Head: 6b3a38365854ed39a4bd291be1d48d5045cd109e

I, Michael Daley, Founder of MAD Ventures, close the comment of Copilot's review 6082231961 on this head with no change to this pull request.

1. Comment 4714755234, on apps/madbridge/src/tui/live/subscribe.ts at lines 20 to 22. Its account is right. When the client fails to give a snapshot, or the mapper throws, after a projection has been given, the adapter gives that last projection once more with connected false (line 21) and stops (line 22). The status bar's writer word comes from describeOwner (apps/madbridge/src/tui/components/StatusBar.tsx lines 347 to 369, used at line 46), which reads ownershipState, activeWriter and fencingToken and not connected; so a retained projection whose ownership is owned renders NOT CONNECTED (line 106) beside the last writer and its token. describeOwner read no connected state at the binding base either. The identity readers already treat such a writer as historical: apps/madbridge/src/tui/components/agent-identity.ts states, at lines 83 to 90, as it did at the base, that a writer claim is valid only while the session is connected, gives no current writer when connected is false (line 99), and gives STREAM ENDED as the liveness word (line 132). The status bar does not follow that rule.
2. It breaches no ruling. B17 of DEC-20261125-01 requires this path: if the mapper throws or the client fails to give a snapshot, the adapter gives the last projection it gave once more with connected false, so that the TUI shows the stream as ended, as it does for a closed client. B16, in its last paragraph, requires that a value that is present renders as it does at the base. Clearing the writer and token in that projection would depart from B17, and making the owner formatter require a connected state would change how a present value renders, which B16 does not ask of M2. The Tier-2 review of this head passed items 3 and 4, which assess both, and did not raise this point.
3. Under B15 nothing under apps/ calls the adapter or the composition before M6, and the Tier-2 review found no file M2 adds reachable from apps/madbridge/src/cli.ts, so no session reaches this path before then.
4. I carry it to the act that records this merge: it rules how the status bar, and any other reader of the writer, the ownership and the fencing token, presents them when connected is false, so that a retained writer is not shown as current, consistent with the rule apps/madbridge/src/tui/components/agent-identity.ts states; and it requires the change it rules, with tests of a projection given after a failed read and after a closed client, before M6 gives the adapter a caller.
5. Copilot's review is not a countable verdict under Phase 3A plan section 11.3 and adds no round. A correction commit would need a new head, a new Tier-2 review and my runs of B22 on both hosts, and this note does not call for one. This pull request merges on my merge authorization at this head, on the Tier-2 PASS that comments 7206983505 and 7206983775 carry.

— Michael Daley

Date: 2026-11-27

Actor-Id: founder
