// apps/seal-studio/test/ui.test.tsx
// UI contract tests (react-test-renderer, no browser). Pins the honesty
// surface: the studio claims an integrity hash only — the words that would
// overclaim a hash ("signature", "keychain", "cryptographic") must never
// appear in rendered copy — and the ritual is always visible as deliberate.

import { describe, expect, test } from "bun:test";
import { create, act } from "react-test-renderer";

import { App } from "../src/App";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function textOf(renderer: { root: { children: unknown[] } }): string {
  let out = "";
  const walk = (node: unknown): void => {
    if (node === null || node === undefined || typeof node === "boolean") return;
    if (typeof node === "string" || typeof node === "number") {
      out += String(node);
      return;
    }
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    if (typeof node === "object") {
      const children = (node as { children?: unknown[]; props?: { children?: unknown[] } }).children;
      if (Array.isArray(children)) {
        for (const child of children) walk(child);
        return;
      }
      const propsChildren = (node as { props?: { children?: unknown[] } }).props?.children;
      if (Array.isArray(propsChildren)) {
        for (const child of propsChildren) walk(child);
      } else if (propsChildren !== undefined) {
        walk(propsChildren);
      }
    }
  };
  walk(renderer.root.children);
  return out;
}

async function renderApp(): Promise<string> {
  let renderer!: ReturnType<typeof create>;
  await act(async () => {
    renderer = create(<App />);
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  });
  return textOf(renderer);
}

describe("honesty surface", () => {
  test("claims integrity only — the overclaim words never appear", async () => {
    const text = await renderApp();
    expect(text.toLowerCase()).toContain("integrity");
    expect(text).toContain("I am the Founder");
    expect(text).toContain("hold to seal");
    expect(text.toLowerCase()).not.toContain("signature");
    expect(text.toLowerCase()).not.toContain("keychain");
    expect(text.toLowerCase()).not.toContain("cryptographic");
  });

  test("honesty line names the acts dir and the file-is-the-act rule", async () => {
    const text = await renderApp();
    expect(text).toContain(".mad/founder-acts/");
    expect(text).toContain("Chat is not authorization");
  });
});

describe("live preview", () => {
  test("canonical JSON and a settled act_sha256 render after debounce", async () => {
    const text = await renderApp();
    expect(text).toContain('"schema":"founder_act_v0"');
    expect(text).toMatch(/[0-9a-f]{64}/);
    expect(text).toContain("act_sha256");
    expect(text).toContain("body_sha256");
  });

  test("the empty draft shows its validation errors instead of a sealed promise", async () => {
    const text = await renderApp();
    expect(text).toContain("subject is required");
    expect(text).toContain("reason_code is required");
  });

  test("the tamper demo is present and states it writes nothing", async () => {
    const text = await renderApp();
    expect(text).toContain("Tamper demo");
    expect(text).toContain("Nothing written by this demo");
  });
});

describe("ritual surface", () => {
  test("the gating command preview marks the blocked state by default", async () => {
    const text = await renderApp();
    expect(text).toContain("(blocked");
    expect(text).toContain("--founder-confirm");
    expect(text).toContain("--actor founder");
  });
});
