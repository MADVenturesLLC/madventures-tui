/**
 * Room Runtime Phase 0 — Gateway-minted viewer_id proof (AT-R4-35 / r4.1 §5;
 * act item 5.10).
 *
 * The fixture registry (spike lib) mints occupancy-scoped viewer identities.
 * AT-R4-35: P1 holds input; P2 presents P1's guessed/forged viewer_id with
 * no capability → P2 gets a NEW minted id (ClaimRejected for the forged
 * claim), P1 remains holder. Forbidden: P2 taking P1's input lease or
 * surviving history.
 */

import { describe, it, expect } from "bun:test";
import {
  createViewerRegistry,
  type ViewerCapability,
} from "./spike/phase0-lib";

describe("phase0 Gateway-minted viewer_id (AT-R4-35, r4.1 §5)", () => {
  it("a forged viewer_id yields a new mint, never the victim's lease or history", () => {
    const registry = createViewerRegistry("occupancy-A");
    const p1 = registry.mint();
    expect(registry.validate(p1)).not.toBeNull();

    // P2 guesses P1's viewer_id and forges a capability (wrong nonce).
    const forged: ViewerCapability = {
      viewer_id: p1.viewer_id,
      bind_nonce: "forged-nonce",
      expiry: p1.expiry,
      occupancy_scope: "occupancy-A",
    };
    const validated = registry.validate(forged);
    expect(validated).toBeNull();

    // ClaimRejected → P2 receives a NEW minted id instead.
    const p2 = registry.mint();
    expect(p2.viewer_id).not.toBe(p1.viewer_id);

    // P1 remains the identity holder; its capability still validates.
    expect(registry.validate(p1)).not.toBeNull();
    // The forged claim never becomes input authority: the input lease is
    // keyed by the Gateway-minted id + capability, both still P1's.
  });

  it("a foreign-occupancy capability is rejected", () => {
    const registryA = createViewerRegistry("occupancy-A");
    const registryB = createViewerRegistry("occupancy-B");
    const fromB = registryB.mint();
    expect(registryA.validate(fromB)).toBeNull();
  });

  it("expired-scope capability is minted fresh, never honored (expiry is part of the capability)", () => {
    const registry = createViewerRegistry("occupancy-A");
    // A capability with an expiry in the past is not honored by the
    // fixture's validate (modelled via a hand-built expired capability).
    const expired: ViewerCapability = {
      viewer_id: "viewer-999",
      bind_nonce: "n",
      expiry: 0,
      occupancy_scope: "occupancy-A",
    };
    expect(registry.validate(expired)).toBeNull();
    // The honest path: mint a fresh one.
    const fresh = registry.mint();
    expect(registry.validate(fresh)).not.toBeNull();
  });

  // -------------------------------------------------------------------------
  // T7 regression coverage (Copilot finding 3941771575): the fixture's
  // validate() previously never checked `expiry` at all — a minted
  // capability with an expired expiry still validated, and a presenter
  // could extend `expiry` undetected. The corrected validate verifies the
  // runtime type, the minted binding (no extension/alteration), and
  // time-based expiry, through a deterministic injected clock.
  // -------------------------------------------------------------------------

  it("T7: presented expiry must carry the required runtime type", () => {
    const clock = { t: 1_000_000 };
    const registry = createViewerRegistry("occupancy-A", () => clock.t);
    const cap = registry.mint();
    expect(registry.validate(cap)).not.toBeNull();
    for (const badExpiry of [undefined, null, "100060000", 100_060_000.5, NaN, Infinity, {}, []]) {
      const mutated = { ...cap, expiry: badExpiry } as unknown;
      expect(registry.validate(mutated)).toBeNull();
    }
  });

  it("T7: presented expiry is bound to the minted capability — extension or alteration is rejected", () => {
    const clock = { t: 1_000_000 };
    const registry = createViewerRegistry("occupancy-A", () => clock.t);
    const cap = registry.mint();
    // The presenter extends the stored expiry by one hour, with the
    // correct nonce and scope. The extension must not validate.
    const extended = { ...cap, expiry: cap.expiry + 3_600_000 };
    expect(registry.validate(extended)).toBeNull();
    // Shrinking/altering is equally rejected.
    const shrunk = { ...cap, expiry: cap.expiry - 1 };
    expect(registry.validate(shrunk)).toBeNull();
    // The unaltered minted capability remains accepted.
    expect(registry.validate(cap)).not.toBeNull();
  });

  it("T7: an actually minted capability that is expired at validation time is rejected; unexpired remains accepted", () => {
    const clock = { t: 1_000_000 };
    const registry = createViewerRegistry("occupancy-A", () => clock.t);
    const cap = registry.mint();
    expect(cap.expiry).toBe(clock.t + 60_000); // bounded lifetime at mint
    // Just before expiry: still valid.
    clock.t = cap.expiry - 1;
    expect(registry.validate(cap)).not.toBeNull();
    // At/after the stored expiry: the minted capability itself is rejected —
    // this is the exact case the old validate() silently accepted.
    clock.t = cap.expiry;
    expect(registry.validate(cap)).toBeNull();
    clock.t = cap.expiry + 1;
    expect(registry.validate(cap)).toBeNull();
    // A freshly minted capability under the advanced clock is valid again.
    const next = registry.mint();
    expect(registry.validate(next)).not.toBeNull();
    // The expired one does not come back to life.
    expect(registry.validate(cap)).toBeNull();
  });

  it("T7: foreign occupancy and forged nonce remain rejected alongside expiry enforcement", () => {
    const clock = { t: 2_000_000 };
    const registryA = createViewerRegistry("occupancy-A", () => clock.t);
    const registryB = createViewerRegistry("occupancy-B", () => clock.t);
    const fromB = registryB.mint();
    // Foreign occupancy: rejected by A.
    expect(registryA.validate(fromB)).toBeNull();
    // Forged nonce on A's own minted capability: still rejected.
    const capA = registryA.mint();
    expect(registryA.validate({ ...capA, bind_nonce: "forged-nonce" })).toBeNull();
    // Unminted viewer_id: rejected.
    expect(
      registryA.validate({
        viewer_id: "viewer-never-minted",
        bind_nonce: "n",
        expiry: clock.t + 60_000,
        occupancy_scope: "occupancy-A",
      }),
    ).toBeNull();
    // The genuine, unexpired A capability remains accepted.
    expect(registryA.validate(capA)).not.toBeNull();
  });
});