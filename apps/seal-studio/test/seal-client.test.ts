// apps/seal-studio/test/seal-client.test.ts
// The browser-side gate order: blocked → invalid → sealed → error.
// A blocked attempt provably never touches the network.

import { describe, expect, test } from "bun:test";

import { attemptSeal, type SealRequestPayload } from "../src/lib/seal-client";

const PAYLOAD: SealRequestPayload = {
  mode: "founder",
  confirmed: true,
  id: "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
  issued_at: "2026-09-13T00:00:00Z",
  kind: "commission",
  subject: "demo/subject",
  scope: ["apps/**"],
  reason_code: "TEST",
};

function fetchStub(jsonBody: unknown = {
  ok: true,
  act_sha256: "c".repeat(64),
  body_sha256: "d".repeat(64),
  path: "/repo/.mad/founder-acts/x.json",
  demo: false,
  already_sealed: false,
}): { fn: typeof fetch; calls: () => number } {
  let calls = 0;
  const fn = (async () => {
    calls += 1;
    return { ok: true, status: 200, json: async () => jsonBody };
  }) as unknown as typeof fetch;
  return { fn, calls: () => calls };
}

describe("attemptSeal gate order", () => {
  test("blocked: no confirm → no fetch, honest message", async () => {
    const stub = fetchStub();
    const result = await attemptSeal(PAYLOAD, { fetchFn: stub.fn, confirmed: false, errors: [] });
    expect(result.status).toBe("blocked");
    if (result.status === "blocked") expect(result.reason).toContain("Nothing was written");
    expect(stub.calls()).toBe(0);
  });

  test("invalid client-side: refused without a request", async () => {
    const stub = fetchStub();
    const result = await attemptSeal(PAYLOAD, { fetchFn: stub.fn, confirmed: true, errors: ["subject is required"] });
    expect(result.status).toBe("invalid");
    expect(stub.calls()).toBe(0);
  });

  test("sealed: server result mapped through", async () => {
    const stub = fetchStub();
    const result = await attemptSeal(PAYLOAD, { fetchFn: stub.fn, confirmed: true, errors: [] });
    expect(result.status).toBe("sealed");
    if (result.status === "sealed") {
      expect(result.act_sha256).toBe("c".repeat(64));
      expect(result.path).toContain(".mad/founder-acts");
    }
  });

  test("server refusal → invalid with the server's reasons", async () => {
    const stub = fetchStub({ ok: false, errors: ['seal refused: kind "merge" requires head_sha'] });
    const result = await attemptSeal(PAYLOAD, { fetchFn: stub.fn, confirmed: true, errors: [] });
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") expect(result.errors[0]).toContain("head_sha");
  });

  test("network failure → error, never a fake success", async () => {
    const fn = (async () => {
      throw new Error("ECONNREFUSED");
    }) as unknown as typeof fetch;
    const result = await attemptSeal(PAYLOAD, { fetchFn: fn, confirmed: true, errors: [] });
    expect(result.status).toBe("error");
    if (result.status === "error") expect(result.message).toContain("ECONNREFUSED");
  });
});
