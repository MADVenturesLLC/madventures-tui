# PLAN-OPEN-3 — Capability-Record Expiration Horizon

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** M15 (Tasks 35–36)
**Repository:** `MADVenturesLLC/madventures-tui`
**Founder approval record:** [Phase 3A PLAN-OPEN Rulings — Founder Approval Record](PLAN-OPEN-approval-record.md)

---

## Default horizon

**30 continuous days**, calculated as exactly `30 × 24 × 60 × 60 × 1000` milliseconds from `evaluated_at`.

`expires_at` is recorded as an explicit UTC ISO-8601 timestamp.

## Staleness rule

A record is stale when `now >= expires_at`. There is no grace period.

## Event-driven invalidation

CLI-version change, binary-hash change, or host change invalidates the record **immediately** regardless of its remaining time. These are evaluated by `evaluateCapabilityFreshness()` (Task 35) in the following fixed order:

1. `binary_hash_changed`
2. `cli_version_changed`
3. `host_changed`
4. `horizon_expired`

The first failure reached is the reported reason. The order is required by Task 35 Step 3 of the approved plan, which specifies implementing the four staleness checks in their listed order.

## Host comparison contract (Option A)

All eight existing host fields from `CapabilityRecordV1.host` are compared using exact string equality:

```text
arch
macos_version
macos_build
bun_version
bun_path
bun_sha256
term
shell
```

No derived fingerprint, partial comparison, or field subset is permitted. Any difference in any field is `host_changed`.

## Expiration semantics

- Expiration does **not** delete or modify the immutable historical record.
- A new investigation produces a new record.
- Expired records **cannot** make a surface eligible to be presented as an alternative.

## Passing records

Passing records are dated observations only. They never authorize admission or execution. Every governed session repeats the complete fresh preflight regardless of any existing passing record.

## Failed records

Failed records use the same 30-day horizon. They remain preserved as historical evidence. Expiration does not convert failure into eligibility.

---

## Implementation impact

### Task 35 — `evaluateCapabilityFreshness()`

`evaluateCapabilityFreshness(record, now, observed)` returns `{ fresh: true }` or `{ fresh: false; reason: StalenessReason }` in the plan-specified order. It is the sole evaluator of staleness.

Any capability-record producer MUST set `expires_at` to `new Date(new Date(evaluated_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()`. Task 35 parses the timestamp and evaluates freshness; it does not create records.

### Task 36 — `latestFreshRecord()`

`latestFreshRecord(root, surface, now, observed)`:

- reads the persisted records for the surface from the validated storage root;
- accepts only records where `overall === "pass"` AND `evaluateCapabilityFreshness(record, now, observed).fresh === true`;
- returns the newest qualifying record by `evaluated_at`;
- returns `null` when none qualify.

This excludes records that are:

- failed (`overall !== "pass"`);
- expired (`horizon_expired`);
- binary-invalidated (`binary_hash_changed`);
- CLI-invalidated (`cli_version_changed`); or
- host-invalidated (`host_changed`).

Records are appended, never overwritten. Expired and invalidated records remain in storage.
