# PLAN-OPEN-4 — `node-pty` Dependency Disposition

**Status:** APPROVED (Founder, 2026-08-15)
**Plan reference:** `docs/superpowers/plans/2026-08-12-phase-3a-runtime-foundation.md` §1A
**Blocks:** Task 34 (manifest edit)
**Repository:** `MADVenturesLLC/madventures-tui`

---

## Decision

Remove the `node-pty@^1.1.0` declaration from `packages/broker/package.json` and regenerate `bun.lock`. No replacement native dependency is added.

## Facts

- `node-pty@^1.1.0` is declared in `packages/broker/package.json:11`
- Present in `bun.lock:72,157`
- Not imported anywhere in the tree
- §9.7 forbids `node-pty` as an implementation choice

## Required lockfile changes

Task 34's `bun.lock` regeneration must remove:

- the broker workspace dependency edge for `node-pty`;
- the resolved `node-pty@1.1.0` entry; and
- the resolved `node-addon-api` entry if no remaining workspace dependency requires it.

At baseline `e68e57b19d9b601a832caa884518d978b1d895ab`, `node-addon-api` is present solely through `node-pty`. It must not remain orphaned after `node-pty` is removed.

## Scope

This ruling authorizes only the `packages/broker/package.json` dependency removal and corresponding `bun.lock` regeneration. Task 34's tests and negative control remain authorized by the approved plan independently of this ruling.
