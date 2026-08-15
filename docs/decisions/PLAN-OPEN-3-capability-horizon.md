# PLAN-OPEN-3 — Capability-Record Expiration Horizon

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** M15 (Tasks 35–36)
**Repository:** `MADVenturesLLC/madventures-tui`

---

## Default horizon

**30 continuous days**, calculated as exactly `30 × 24 × 60 × 60 × 1000` milliseconds from `evaluated_at`.

`expires_at` is recorded as an explicit UTC ISO-8601 timestamp.

## Staleness rule

A record is stale when `now >= expires_at`. There is no grace period.

## Event-driven invalidation

CLI-version change, binary-hash change, or host change invalidates the record **immediately** regardless of its remaining time. These are evaluated by `evaluateCapabilityFreshness()` alongside the horizon check.

## Expiration semantics

- Expiration does **not** delete or modify the immutable historical record.
- A new investigation produces a new record.
- Expired records **cannot** make a surface eligible to be presented as an alternative.

## Passing records

Passing records are dated observations only. They never authorize admission or execution. Every governed session repeats the complete fresh preflight regardless of any existing passing record.

## Failed records

Failed records use the same 30-day horizon. They remain preserved as historical evidence. Expiration does not convert failure into eligibility.

---

## Implementation impact (Tasks 35–36)

Task 35 (`packages/protocol/src/capability-record.ts`):
- `evaluateCapabilityFreshness()` returns `{ fresh: false; reason: "horizon_expired" }` when `now >= record.expires_at`

Any capability-record producer MUST set `expires_at` to `new Date(new Date(evaluated_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()`. Task 35 parses the timestamp and evaluates freshness.

Task 36 (persist capability records):
- Records are appended, never overwritten
- Expired records remain in storage
- `latestFreshRecord()` filters out expired records
