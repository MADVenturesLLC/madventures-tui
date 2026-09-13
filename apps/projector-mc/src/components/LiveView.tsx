// apps/projector-mc/src/components/LiveView.tsx
// Live-bind data hook + the honest empty state.
//
// Live mode (MADV_PROJECTOR_FIXTURE=0) fetches the local snapshot the bind
// script wrote (public/live-state.json). There is no live backend and no
// network: the only source is that local file. A 404 or an empty snapshot
// renders the empty state — never a fabricated ledger row. A snapshot that
// fails parse/validation renders an error state, never a guess.

import { useEffect, useState } from "react";

import { buildLiveModel, liveStateIsEmpty, parseLiveState } from "../lib/live";
import type { ProjectorModel } from "../lib/render-model";

export type LivePhase = "idle" | "loading" | "empty" | "error" | "ready";

export type LiveState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "empty" }
  | { phase: "error"; error: string }
  | { phase: "ready"; model: ProjectorModel };

export function useLiveState(mode: "fixture" | "live"): LiveState {
  const [state, setState] = useState<LiveState>({ phase: "loading" });
  useEffect(() => {
    if (mode !== "live") return;
    let cancelled = false;
    setState({ phase: "loading" });
    fetch("/live-state.json", { cache: "no-store" })
      .then(async (res) => {
        // vite's SPA fallback answers missing public files with 200 + HTML,
        // so "absent snapshot" is detected by content type, not just 404.
        const contentType = res.headers.get("content-type") ?? "";
        const looksJson = contentType.includes("application/json");
        if (res.status === 404 || (!res.ok && !looksJson) || (res.ok && !looksJson)) {
          const err = new Error("no live-state snapshot") as Error & { code?: string };
          err.code = "EMPTY";
          throw err;
        }
        if (!res.ok) throw new Error(`live-state fetch failed with status ${String(res.status)}`);
        return parseLiveState(await res.json());
      })
      .then((snap) => {
        if (cancelled) return;
        if (liveStateIsEmpty(snap)) setState({ phase: "empty" });
        else setState({ phase: "ready", model: buildLiveModel(snap) });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if ((err as { code?: string }).code === "EMPTY") setState({ phase: "empty" });
        else setState({ phase: "error", error: err instanceof Error ? err.message : String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);
  return mode === "live" ? state : { phase: "idle" };
}

export function LiveEmptyState() {
  return (
    <div className="shell">
      <div className="empty-state">
        <div>
          <div className="headline">No bound memory</div>
          <p>no bound memory — run bind or use fixture. The projector does not invent rows.</p>
          <p className="mono">
            bind: MADV_ARGUS_PACKET=/abs/path MADV_ARGUS_SHA256=&lt;64hex&gt; bun run projector:bind-demo
          </p>
          <p className="mono">fixture: unset MADV_PROJECTOR_FIXTURE and reload</p>
        </div>
      </div>
    </div>
  );
}

export function LiveErrorState(props: { error: string }) {
  return (
    <div className="shell">
      <div className="empty-state">
        <div>
          <div className="headline">Live state failed its gate</div>
          <p>{props.error}</p>
          <p className="mono">regenerate with: bun run projector:bind-demo --refresh</p>
        </div>
      </div>
    </div>
  );
}

export function LiveLoadingState() {
  return (
    <div className="shell">
      <div className="empty-state">
        <div>
          <div className="headline">Reading live state…</div>
          <p className="mono">apps/projector-mc/public/live-state.json</p>
        </div>
      </div>
    </div>
  );
}
