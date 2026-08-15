# PLAN-OPEN-4 — `node-pty` Dependency Disposition

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** Task 34 (manifest edit)
**Repository:** `MADVenturesLLC/madventures-tui`

---

## Decision

Remove the `node-pty@^1.1.0` declaration from `packages/broker/package.json` and the two corresponding entries from `bun.lock`. Plan default approved as written.

## Facts

- `node-pty@^1.1.0` is declared in `packages/broker/package.json:11`
- Present in `bun.lock:72,157`
- **Not installed** (`node_modules/node-pty` absent)
- **Not imported** anywhere in the tree
- §9.7 forbids `node-pty` as an implementation choice

## Scope

This edits a manifest and a lockfile only — no source or test changes.
