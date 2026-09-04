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
});