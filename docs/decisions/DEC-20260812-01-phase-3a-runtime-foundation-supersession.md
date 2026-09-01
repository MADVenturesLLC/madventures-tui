# DEC-20260812-01 — Phase 3A Runtime Foundation Supersession

**Status:** RATIFIED and ACTIVE — Founder approval occurred at PR #9 head
`c23cd46d501813185087c27cbe81fd89b9ee3a33`, merged as
`aa16032c56fdf6c7105e99b1765ed9365d605bf4`. Confirmed by
[`DEC-20260831-01`](DEC-20260831-01-phase-3a-authority-drift-reconciliation.md)
clause 1 (2026-08-31): the "Pending Founder ratification" wording below this
line was stale metadata only and did not invalidate any task-specific
authorization, review, merge, or M17–M19 work made in reliance on this
decision.  
**Date:** 2026-08-12  
**Repository:** `MADVenturesLLC/madventures-tui`  
**Baseline SHA:** `0b942771fc07e5eb05203b1d3d641d3e8ad101f1`  
**Companion specification:**
[`docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md`](../superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md)

## Decision

Upon Founder ratification, MADVentures adopts the companion Phase 3A runtime-
foundation specification as the forward authority for runtime ownership,
startup, transport, PTY hosting, storage, command truthfulness, verification,
and certification.

The 2026-08-08 design and implementation plan remain historical evidence of
the V1 build. They are not deleted or rewritten. Where they conflict with this
decision and its companion specification, this decision supersedes them.

## Superseded design authority

The following sections of
`docs/superpowers/specs/2026-08-08-madventures-tui-design.md` are superseded for
all forward runtime work:

| Legacy section | Superseded claim | New authority |
| --- | --- | --- |
| §3 Core architecture | Daemon-shaped broker/adapter topology as the runtime mechanism | Companion §§1 and 3: one foreground supervisor, `BrokerClient`, per-child PTY hosts |
| §4 Task envelope and session startup | Production `start` launches Claude and `agy` and configures MCP | Companion §§2, 4, and 9: gated start, canonical identity admission, fixture-only 3A runtime |
| §7.1 Local transport and storage | Unix-domain socket and `run/madbridge.sock` | Companion §§4.4, 5, and 9.6–9.10: no named endpoint, Application Support storage, dormant socket |
| §10 Commands and installation behavior | Live `start` and externally observable session commands | Companion §§4.2–4.3 and 9.9: certified gate and truthful placeholders |
| §12.2 Integration verification | Unix-socket authentication and pipe-era managed PTY expectations | Companion §§3 and 6: PTY-host containment, anonymous lifelines, fixture/adversarial and dual-host gates |
| Socket/runtime layout wherever repeated | Runtime socket directory and repo/runtime assumptions | Companion §§4.4, 5.1–5.2, and 9.9–9.10 |
| §6.1 Session lifecycle | Same-session `interrupted → reconciling → active` recovery | Companion §§2.5 and 9.3–9.4: interrupt is terminal-bound; recovery is reconciliation plus a new Founder-authorized envelope; `session_resume` is pause-recovery only; `"reconciling"` is not a Phase 3A phase |
| §11 Reliability and recovery | Disconnect recovery restores `active` in the same session after re-attestation and resume | Companion §2.5: interrupt closes the session; the next session requires a new Founder-authorized envelope |

All non-conflicting principles of the 2026-08-08 design remain in force,
including broker authority, TUI-as-projection, typed events, append-only
evidence, fail-closed interruption, and Founder control.

## Superseded implementation-plan authority

`docs/superpowers/plans/2026-08-08-madventures-tui-v1.md` remains a truthful
record of what was built and verified at that time. It is not the implementation
plan for Phase 3A. The following forward-use assumptions are superseded:

- Global Constraint requiring a Unix socket and its legacy runtime/data paths;
- Task 6 socket-backed broker startup and public socket exports;
- Task 7 MCP configurations pointing to `unix://madbridge.sock`;
- Task 8 pipe-based `PtyManager` as a real managed PTY;
- Task 9 repo-local `init`, live `start`, and socket-observing session commands;
- Task 10 restart/resume behavior wherever it assumes a socket-discovered
  broker; and
- any test expectation treating socket-file existence, configured identity, or
  terminal prose as live runtime evidence.

The existing tests are not discarded. The companion specification names which
legacy expectations must be intentionally updated and requires the suite to
grow without hidden skips.

## Consequences

- Phase 3A can merge a fixture-verified runtime foundation while production
  live startup truthfully remains unavailable.
- `BrokerSocket` and MCP socket configuration become quarantined scaffolding,
  not production dependencies.
- Storage moves out of the governed repository.
- The canonical task-envelope identity evolves to support Founder-authorized
  investigated surfaces without automatic fallback.
- A real live pairing and TUI activation require a separate Phase 3B
  certification event.

## Non-decisions

This decision does not:

- approve an implementation plan;
- authorize implementation;
- certify Antigravity or any alternative execution surface;
- activate production `start`;
- authorize a daemon, socket, native PTY dependency, or credential system; or
- permit automatic or mid-session surface substitution.

## Ratification

This record becomes active only when Founder Mike approves this exact decision
record together with the companion written specification. Until then, the
architecture is approved but Phase 3A remains NO-GO for implementation planning
and implementation.
