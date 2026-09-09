# pg-a1 — Reserve-before-spawn worker startup race (spec-only card)

> PROVING_GROUND — NOT PHASE_0 — NOT OCCUPANCY_PROOF
> This card is a DEFERRAL RECORD, not a green test. The fix is owned elsewhere.

```json
{
  "id": "pg-a1",
  "kind": "spec_card",
  "title": "C2WorkerSupervisor concurrent same-key startup race",
  "defect_class": "check-then-act race: occupancy registry consulted before async handshake, reserved only after it completes",
  "owner": "Phase 0 integrate track — founder-os-build-room (builder/integrate-room-runtime-phase0-prereq-c)",
  "status": "owned-elsewhere",
  "oracle": {
    "assertion": "Two supervisors started concurrently with the same occupancy key yield exactly one active supervisor and one duplicate_worker rejection; the losing start() leaves no live child and no reserved key.",
    "positive_control": "Sequential same-key startup rejects the second start with duplicate_worker (existing test already proves this).",
    "failure_signature": "Promise.allSettled([a.start(), b.start()]) fulfills both; both report active; two distinct live child PIDs."
  },
  "forbidden_here": [
    "packages/pty-host/** (this repo)",
    "founder-os-build-room builder/room-runtime-phase0 paths",
    "builder/integrate-room-runtime-phase0-prereq-c paths",
    "any Gateway/occupancy daemon surface"
  ],
  "references": [
    "Plato audit 2026-09-06, finding A1 (reproduced probe: concurrent same-key startup, both fulfilled, two live children)",
    "Remediation sketch (audit): reserve occupancy synchronously before spawn/await; explicit reservation ownership through startup; release only after failure cleanup and child reaping; old child exit must not mutate a replacement's state",
    "Required tests (audit): concurrent same-key with the real qualified worker; sequential positive control; failed-handshake cleanup coverage"
  ],
  "notes": "Spec-only by Founder preflight rule: the defect and its Phase 0 proof paths live outside this repository, so this card records the oracle instead of shipping a fix here. Qualified-host (macOS/Node/Bun matrix) verification belongs to the owning track — a Linux-only probe does not certify the fix."
}
```

## Defect (observed)

`C2WorkerSupervisor.start()` checks the occupancy registry before beginning the
asynchronous worker handshake, but registers occupancy only AFTER the handshake
completes. Two supervisors sharing a key can both pass the initial check and
both spawn. The existing duplicate-worker test starts the second supervisor
only after the first settles — it proves sequential exclusion, never
simultaneous exclusion. Plato's probe (Node child on fd 3/4, no database, no
agent) demonstrated the concurrent case: both starts fulfilled, both
supervisors active, two live children.

## Why this repo must not fix it

The supervisor, its occupancy registry, and its Phase 0 proof paths live in the
founder-os-build-room repository, not in madventures-tui. This repo contains no
`builder/**` paths (verified in preflight), and the mission forbids touching
`packages/pty-host/**` or any Phase 0 integrate path. A fix here would be a
cross-repository rewrite with no owner seat — exactly what the blast radius
forbids.

FORBIDDEN here: `packages/pty-host/**`, `builder/room-runtime-phase0**`,
`builder/integrate-room-runtime-phase0-prereq-c**`, any Gateway or occupancy
daemon surface, and any Room Runtime freeze/disposition edit.

## Law-oracle sketch

For the owning track's regression suite (deterministic, credential-free):

1. **Concurrent exclusion (the missing test).** Build two supervisors with one
   occupancy key; start them via `Promise.allSettled`. Oracle: exactly one
   fulfillment; the other rejects `duplicate_worker`; exactly one live child.
2. **Sequential positive control.** Existing behavior must keep holding:
   second `start()` after the first settles rejects `duplicate_worker`.
3. **Failed-handshake cleanup.** A worker whose handshake fails must release
   the reserved key and leave no live child, so a replacement can start.
4. **Replacement isolation.** An old child's exit must not mutate a
   replacement's state after ownership transfers.
5. **Qualified-host matrix.** macOS + Node/Bun combination must be exercised
   before any certification claim; Linux probe results alone do not certify.

Fix sketch (from the audit): reserve the occupancy key synchronously before
spawn/await; make reservation ownership explicit for the whole startup; release
only after failure cleanup and child reaping.

## Owner

Owner: Phase 0 integrate track — founder-os-build-room
(`builder/integrate-room-runtime-phase0-prereq-c`). This card is the Proving
Ground's entire A1 deliverable; it deliberately ships no code fix.
