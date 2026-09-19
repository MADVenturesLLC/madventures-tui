// apps/madbridge/src/tui/hooks/useSeatState.ts
// Founder seat model-profile state — LOCAL UI state only.
//
// This hook owns:
//   - the per-seat pinned OMP model profile (or null = unpinned),
//   - the OMP model catalog (loaded ONCE via the public CLI, see
//     omp-catalog.ts — OMP internals are never imported),
//   - the model picker cursor index.
//
// Honesty boundaries:
//   - A pinned profile is the Founder's LOCAL preference for the seat. It
//     is NOT a claim about what any broker-connected agent is running (the
//     pane headers derive that from the snapshot).
//   - The catalog is loaded once at mount. A failed load stays explicit
//     ("unavailable" + reason) — the hook never fabricates model entries.

import { useCallback, useEffect, useRef, useState } from "react";
import type { SeatId } from "../types";
import { loadOmpCatalog } from "../omp-catalog";
import type { OmpModelInfo } from "../omp-catalog";

export type SeatCatalogState =
  | { status: "loading" }
  | { status: "ok"; models: readonly OmpModelInfo[] }
  | { status: "unavailable"; reason: string };

export type ModelProfileRecord = Readonly<Record<SeatId, string | null>>;

export interface SeatStateHook {
  /** Per-seat pinned model selector, or null when the seat is unpinned. */
  readonly profiles: ModelProfileRecord;
  /** OMP model catalog state (single load at mount). */
  readonly catalog: SeatCatalogState;
  /** Pin a model selector for a seat (LOCAL preference only). */
  pinModel: (seat: SeatId, selector: string) => void;
  /** Clear a seat's pin. */
  unpinModel: (seat: SeatId) => void;
  /** Move the picker cursor by delta, clamped to the catalog bounds. */
  movePicker: (delta: number) => void;
  /** Read/set the raw picker cursor (already clamped when moved via movePicker). */
  readonly pickerIndex: number;
  setPickerIndex: (index: number) => void;
  /** Re-run the catalog load (exposed for the picker's retry path). */
  reloadCatalog: () => void;
}

/** The empty profile record — every seat starts unpinned. */
export function emptyProfiles(): ModelProfileRecord {
  return { builder: null, architect: null, operator: null };
}

/** Clamp a picker cursor into [0, max(0, len - 1)]; len <= 0 → 0. */
export function clampPickerIndex(index: number, catalogLength: number): number {
  if (catalogLength <= 0) return 0;
  if (index < 0) return 0;
  if (index > catalogLength - 1) return catalogLength - 1;
  return index;
}

export function useSeatState(options?: {
  loadCatalog?: typeof loadOmpCatalog;
}): SeatStateHook {
  const load = options?.loadCatalog ?? loadOmpCatalog;
  const [profiles, setProfiles] = useState<ModelProfileRecord>(emptyProfiles);
  const [catalog, setCatalog] = useState<SeatCatalogState>({ status: "loading" });
  const [pickerIndex, setPickerIndexState] = useState(0);
  const loadRef = useRef(load);
  loadRef.current = load;
  // Guard StrictMode double-mounts so the CLI runs once per mount cycle.
  const didLoadRef = useRef(false);

  const reloadCatalog = useCallback(() => {
    let cancelled = false;
    setCatalog({ status: "loading" });
    void loadRef.current().then((result) => {
      if (!cancelled) setCatalog(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    const cancel = reloadCatalog();
    return cancel;
  }, [reloadCatalog]);

  const pinModel = useCallback((seat: SeatId, selector: string) => {
    setProfiles((prev) => ({ ...prev, [seat]: selector }));
  }, []);

  const unpinModel = useCallback((seat: SeatId) => {
    setProfiles((prev) => ({ ...prev, [seat]: null }));
  }, []);

  const setPickerIndex = useCallback((index: number) => {
    setPickerIndexState((prev) => {
      // Clamped by the caller when the catalog length is known; the raw
      // setter keeps the last valid value otherwise.
      void prev;
      return index;
    });
  }, []);

  const movePicker = useCallback((delta: number) => {
    setPickerIndexState((prevIndex) => {
      const len = catalog.status === "ok" ? catalog.models.length : 0;
      return clampPickerIndex(prevIndex + delta, len);
    });
  }, [catalog]);

  return {
    profiles,
    catalog,
    pinModel,
    unpinModel,
    movePicker,
    pickerIndex,
    setPickerIndex,
    reloadCatalog,
  };
}
