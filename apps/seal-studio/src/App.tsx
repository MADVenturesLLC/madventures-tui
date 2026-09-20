// apps/seal-studio/src/App.tsx
// Seal Studio — the moment you commit. Compose a FounderActV0 draft, watch
// its integrity hash settle as you type (the browser computes the exact
// canonical-JSON sha-256 the CLI will seal under, because the draft's id and
// issued_at are fixed up front and passed through), then seal it through the
// two-step ritual: declare "I am the Founder", then hold.
//
// Honesty invariants (pinned in test/ui.test.tsx):
//   - the surface claims an integrity hash only — never a signature, never
//     a keychain, never more assurance than a hash can carry;
//   - no seal happens without the confirm gate; a blocked attempt says so
//     and provably sends nothing;
//   - demo fixtures are actor "demo" and are labeled as never-authority.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { HoldButton, TamperDemo } from "./components/SealBits";
import {
  actHashes,
  buildBody,
  draftErrors,
  draftFromSearchParams,
  equivalentCommand,
  newIdentity,
  SEALABLE_KINDS,
  type ActHashes,
  type ActIdentity,
  type DraftState,
  type SealableKind,
} from "./lib/act-draft";
import { attemptSeal, type SealAttempt } from "./lib/seal-client";

const KIND_HELP: Record<SealableKind, string> = {
  merge: "names a head SHA — the Founder still performs the merge themselves",
  commission: "authorizes a build commission; scope lists what the builder may touch",
  hold: "pauses a subject; scope may be [\"*\"]",
  freeze: "locks a subject; scope may be [\"*\"]",
  reopen: "lifts a hold or freeze",
  authorize_review: "authorizes a review pass",
};

/** datetime-local display value for a stored UTC ISO instant: the local wall
 * time of the same instant, so the picker shows what the Founder picked in
 * any timezone (round-trips `new Date(localWall).toISOString()`). */
export function isoToLocalInput(iso: string): string {
  if (iso === "") return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${String(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function App(): React.JSX.Element {
  const [identity, setIdentity] = useState<ActIdentity>(() => newIdentity());
  const [draft, setDraft] = useState<DraftState>(() => ({
    ...(() => {
      const base = { kind: "commission", subject: "", scope: [], headSha: "", reasonCode: "", expiresAt: "", actor: "founder" } as DraftState;
      // Headless test environments can expose a bare `window` without
      // `location`; guard both so the initializer never dereferences undefined.
      if (typeof window === "undefined" || window.location === undefined) return base;
      return { ...base, ...draftFromSearchParams(new URLSearchParams(window.location.search)) };
    })(),
  }));
  const [hashes, setHashes] = useState<ActHashes | null>(null);
  const [settling, setSettling] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [attempt, setAttempt] = useState<SealAttempt | null>(null);
  const [sealing, setSealing] = useState(false);
  const [headShaKnown, setHeadShaKnown] = useState<string | null>(null);
  const [scopeEntry, setScopeEntry] = useState("");
  const [tamper, setTamper] = useState<{ base: string; tampered: string } | null>(null);
  const hashEpoch = useRef(0);

  const errors = useMemo(() => draftErrors(draft), [draft]);

  // Live integrity hash — debounced, race-guarded by epoch.
  useEffect(() => {
    const epoch = ++hashEpoch.current;
    setSettling(true);
    setTamper(null);
    const timer = setTimeout(() => {
      actHashes(draft, identity).then((next) => {
        if (hashEpoch.current !== epoch) return;
        setHashes(next);
        setSettling(false);
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [draft, identity]);

  // Offer the repo's real HEAD once — never guess it. Browser-only; in
  // non-DOM test environments fetch never runs.
  useEffect(() => {
    if (typeof fetch === "undefined" || typeof window === "undefined") return;
    let alive = true;
    void (async () => {
      try {
        const res = await fetch("/api/head");
        const body: unknown = await res.json();
        if (alive && typeof body === "object" && body !== null) {
          const sha = (body as Record<string, unknown>)["head_sha"];
          if (typeof sha === "string") setHeadShaKnown(sha);
        }
      } catch {
        if (alive) setHeadShaKnown(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const runSeal = useCallback((): void => {
    if (sealing) return;
    setSealing(true);
    const payload = {
      mode: draft.actor,
      confirmed,
      id: identity.id,
      issued_at: identity.issuedAt,
      kind: draft.kind,
      subject: draft.subject.trim(),
      scope: draft.scope,
      ...(draft.headSha.trim() !== "" ? { head_sha: draft.headSha.trim() } : {}),
      reason_code: draft.reasonCode.trim(),
      ...(draft.expiresAt.trim() !== "" ? { expires_at: draft.expiresAt.trim() } : {}),
    };
    attemptSeal(payload, { confirmed, errors }).then((result) => {
      setAttempt(result);
      setSealing(false);
    });
  }, [confirmed, draft, errors, identity, sealing]);

  // meta/ctrl+enter attempts the seal — and is still gated like every other path.
  useEffect(() => {
    // Headless environments may expose a bare `window` without browser APIs;
    // only attach when the full API surface is present.
    if (typeof window === "undefined" || window.addEventListener === undefined || window.removeEventListener === undefined) return;
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        runSeal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runSeal]);

  const newDraft = (): void => {
    setIdentity(newIdentity());
    setAttempt(null);
    setConfirmed(false);
    setTamper(null);
  };

  const runTamper = (): void => {
    if (hashes === null) return;
    const body = buildBody(draft, identity);
    const tamperedBody = { ...body, subject: `${draft.subject} — TAMPERED` };
    void (async () => {
      const { canonicalJson, sha256Hex } = await import("./lib/canonical");
      const bodySha = await sha256Hex(canonicalJson(tamperedBody));
      const tamperedAct = await sha256Hex(canonicalJson({ ...tamperedBody, body_sha256: bodySha }));
      setTamper({ base: hashes.actSha256, tampered: tamperedAct });
    })();
  };

  const set = <K extends keyof DraftState>(key: K, value: DraftState[K]): void =>
    setDraft((d) => ({ ...d, [key]: value }));

  const addScope = (): void => {
    const entry = scopeEntry.trim();
    if (entry === "" || draft.scope.includes(entry)) return;
    set("scope", [...draft.scope, entry]);
    setScopeEntry("");
  };

  return (
    <div className="app">
      <header className="masthead">
        <h1>
          Seal <span className="accent">Studio</span>
        </h1>
        <p className="tagline">
          The moment you commit. Compose the act, watch its integrity hash settle, then hold to seal.
        </p>
        <p className="honesty">
          This is an integrity seal: sha-256 over canonical JSON. It proves a file is intact — it does
          not prove who approved it. Chat is not authorization. The sealed file under
          <span className="mono"> .mad/founder-acts/ </span> is the act.
        </p>
      </header>

      <main className="studio">
        <section className="panel" aria-label="compose">
          <span className="panel-label">Compose the act</span>

          <div className="field">
            <label htmlFor="kind">kind</label>
            <div className="field-row">
              <select id="kind" value={draft.kind} onChange={(e) => set("kind", e.target.value as SealableKind)}>
                {SEALABLE_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <span className="hint">{KIND_HELP[draft.kind]}</span>
          </div>

          <div className="field">
            <label htmlFor="subject">subject</label>
            <input
              id="subject"
              value={draft.subject}
              placeholder="madventures-tui/build/seal-studio-v0"
              onChange={(e) => set("subject", e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="scope">scope — click a chip to remove</label>
            <div className="field-row">
              <input
                id="scope"
                value={scopeEntry}
                placeholder="apps/seal-studio/**"
                onChange={(e) => setScopeEntry(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addScope();
                  }
                }}
              />
              <button type="button" onClick={addScope}>
                add
              </button>
            </div>
            {draft.scope.length > 0 && (
              <div className="chips">
                {draft.scope.map((entry) => (
                  <button
                    type="button"
                    key={entry}
                    className="chip"
                    title="remove"
                    onClick={() => set("scope", draft.scope.filter((s) => s !== entry))}
                  >
                    {entry} ✕
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="head-sha">head_sha {draft.kind === "merge" ? "(required)" : "(optional)"}</label>
            <div className="field-row">
              <input
                id="head-sha"
                className="mono"
                value={draft.headSha}
                placeholder="40 lowercase hex"
                onChange={(e) => set("headSha", e.target.value.trim())}
              />
              <button
                type="button"
                disabled={headShaKnown === null}
                title={headShaKnown === null ? "repo HEAD unreadable" : `use ${headShaKnown.slice(0, 7)}`}
                onClick={() => headShaKnown !== null && set("headSha", headShaKnown)}
              >
                use HEAD
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor="reason">reason_code</label>
            <input
              id="reason"
              className="mono"
              value={draft.reasonCode}
              placeholder="GLM-20260913-SEAL-STUDIO-V0"
              onChange={(e) => set("reasonCode", e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="expires">expires_at (optional)</label>
            <input
              id="expires"
              type="datetime-local"
              value={isoToLocalInput(draft.expiresAt)}
              onChange={(e) => {
                const v = e.target.value;
                set("expiresAt", v === "" ? "" : new Date(v).toISOString());
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="actor">actor</label>
            <select id="actor" value={draft.actor} onChange={(e) => set("actor", e.target.value as DraftState["actor"])}>
              <option value="founder">founder — real authorization</option>
              <option value="demo">demo — fixture only, never authority</option>
            </select>
          </div>

          {errors.length > 0 && (
            <ul className="error-list" data-testid="draft-errors">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel" aria-label="preview">
          <span className="panel-label">Canonical JSON — exactly what the hash covers</span>
          <pre className="preview-json" data-testid="canonical-json">
            {hashes?.bodyJson ?? "…"}
          </pre>

          <div className="hash-hero">
            <div className="label">
              <span>act_sha256 — integrity hash</span>
              <button
                type="button"
                className="copy-btn"
                disabled={hashes === null}
                onClick={() => hashes !== null && void navigator.clipboard.writeText(hashes.actSha256)}
              >
                copy
              </button>
            </div>
            <div className={`act-sha${settling ? " settling" : ""}`} data-testid="act-sha">
              {hashes?.actSha256 ?? "…"}
            </div>
            <div className="body-sha" data-testid="body-sha">
              body_sha256 {hashes?.bodySha256 ?? "…"}
            </div>
          </div>

          <div className="field">
            <label>draft identity — fixed at open, passed through to the seal</label>
            <div className="hint mono">
              id {identity.id} · issued_at {identity.issuedAt}
            </div>
            <div className="field-row">
              <button type="button" onClick={newDraft}>
                new draft (new id, new hash)
              </button>
            </div>
          </div>

          <TamperDemo
            baseSha={hashes?.actSha256 ?? null}
            tamperSha={tamper?.tampered ?? null}
            onRun={runTamper}
          />
        </section>
      </main>

      <section className="ritual" aria-label="seal">
        <span className="panel-label">The ritual</span>
        <pre className="command-line" data-testid="command-preview">
          {equivalentCommand(draft, identity, confirmed)}
        </pre>
        <div className="confirm-row">
          <label>
            <input
              type="checkbox"
              checked={confirmed}
              data-testid="founder-confirm"
              onChange={(e) => {
                setConfirmed(e.target.checked);
                if (!e.target.checked) setAttempt(null);
              }}
            />
            I am the Founder. This act is mine, now.
          </label>
          <HoldButton
            disabled={errors.length > 0 || sealing}
            label="hold to seal"
            onComplete={runSeal}
          />
          <span className="hint">
            ⌘/ctrl + enter also attempts — and is gated exactly the same.
          </span>
        </div>

        {attempt?.status === "blocked" && (
          <p className="verdict" data-tone="amber" data-testid="blocked-verdict">
            {attempt.reason}
          </p>
        )}
        {attempt?.status === "invalid" && (
          <div>
            <p className="verdict" data-tone="rose">
              The seal was refused. Nothing was written.
            </p>
            <ul className="error-list">
              {attempt.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {attempt?.status === "error" && (
          <p className="verdict" data-tone="rose">
            Seal endpoint unavailable: {attempt.message}
          </p>
        )}
        {attempt?.status === "sealed" && (
          <div className="sealed-card" data-testid="sealed-card">
            <p className="verdict" data-tone={attempt.demo ? "amber" : "emerald"} style={{ margin: 0 }}>
              {attempt.already_sealed ? "Already sealed — same content, same hash, same file." : "Sealed."}
              {attempt.demo && " This is a DEMO fixture — not Founder authority."}
            </p>
            <div className="act-sha" style={{ fontSize: 15 }}>
              {attempt.act_sha256}
            </div>
            <div className="path">
              {attempt.path}
              {attempt.path !== "" && attempt.act_sha256 === hashes?.actSha256
                ? " — matches the live preview hash exactly."
                : ""}
            </div>
            <div className="field-row">
              <button type="button" onClick={() => void navigator.clipboard.writeText(attempt.act_sha256)}>
                copy sha
              </button>
              <button type="button" onClick={newDraft}>
                next act
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="coda">
        mad-founder-act v0 honesty: integrity seal (hash) only — verification proves a file is intact,
        not that the Founder authorized it. kind "other_named" stays a CLI affordance. The seal endpoint
        exists only in this dev server; built output ships none.
      </footer>
    </div>
  );
}
