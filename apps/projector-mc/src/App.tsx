import { useEffect, useMemo, useState } from "react";

import demoJson from "../fixtures/demo.json";
import roomStatusFixtureJson from "../fixtures/room-status-fixture.json";
import { loadProjectorDemo } from "./lib/fixture";
import { loadRoomStatusFixture, type RoomStatusScenario } from "./lib/room-status-fixture";
import { filterSubjects, nextFilter, shortSha, type ProjectorModel, type SubjectView, type VerdictFilter } from "./lib/render-model";
import { emitFounderIntent, type FounderIntent } from "./lib/intent";
import { EvidenceDrawer } from "./components/EvidenceDrawer";
import { HelpOverlay } from "./components/HelpOverlay";
import { HeroVerdict } from "./components/HeroVerdict";
import { RoomRail } from "./components/RoomRail";
import { RoomStatusPanel } from "./components/RoomStatusPanel";
import { StatusBar } from "./components/StatusBar";

type Mode = "fixture" | "live-unavailable";

function readMode(): Mode {
  // Fixture mode is the default for demos. There is no live backend in v0 —
  // MADV_PROJECTOR_FIXTURE=0 shows an intentional "not available" state
  // rather than pretending otherwise.
  const flag = import.meta.env.MADV_PROJECTOR_FIXTURE;
  return flag === "0" ? "live-unavailable" : "fixture";
}

export function App() {
  const mode = readMode();

  const [loadError, setLoadError] = useState<string | null>(null);
  const model: ProjectorModel | null = useMemo(() => {
    if (mode !== "fixture") return null;
    try {
      return loadProjectorDemo(demoJson);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err));
      return null;
    }
  }, [mode]);

  const [filter, setFilter] = useState<VerdictFilter>("ALL");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [intents, setIntents] = useState<FounderIntent[]>([]);
  const [copied, setCopied] = useState(false);

  // Lane 3: RoomStatus replay scenarios — validated through the vendored IR
  // parser at load; a rejected record is an intentional error state.
  const [rsError, setRsError] = useState<string | null>(null);
  const roomScenarios: RoomStatusScenario[] = useMemo(() => {
    if (mode !== "fixture") return [];
    try {
      return loadRoomStatusFixture(roomStatusFixtureJson).scenarios;
    } catch (err) {
      setRsError(err instanceof Error ? err.message : String(err));
      return [];
    }
  }, [mode]);
  const [rsIdx, setRsIdx] = useState(0);
  const rsScenario: RoomStatusScenario | null = roomScenarios[rsIdx] ?? null;

  const visible: SubjectView[] = useMemo(
    () => (model === null ? [] : filterSubjects(model.subjects, filter)),
    [model, filter],
  );

  useEffect(() => {
    if (selectedIdx >= visible.length) setSelectedIdx(0);
  }, [visible.length, selectedIdx]);

  const selected: SubjectView | null = visible[selectedIdx] ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" ) {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setHelpOpen(false);
        setDrawerOpen(false);
        return;
      }
      if (helpOpen || model === null) return;
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, Math.max(visible.length - 1, 0)));
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        setDrawerOpen(true);
      } else if (e.key === "f") {
        e.preventDefault();
        setFilter(nextFilter);
      } else if (e.key === "r" && roomScenarios.length > 0) {
        e.preventDefault();
        setRsIdx((i) => (i + 1) % roomScenarios.length);
      } else if (e.key === "c" && selected !== null) {
        e.preventDefault();
        void navigator.clipboard?.writeText(selected.memory.current_head_sha ?? "").then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
          },
          () => undefined,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible.length, helpOpen, model, selected, roomScenarios.length]);

  if (mode === "live-unavailable") {
    return (
      <div className="shell">
        <div className="empty-state">
          <div>
            <div className="headline">Live mode is not available in v0</div>
            <p>The projector runs on sealed fixtures only. Set MADV_PROJECTOR_FIXTURE=1 (or unset it) and reload.</p>
          </div>
        </div>
      </div>
    );
  }

  if (model === null) {
    return (
      <div className="shell">
        <div className="empty-state">
          <div>
            <div className="headline">Fixture failed its seal</div>
            <p>{loadError}</p>
            <p className="mono">regenerate with: bun apps/projector-mc/fixtures/generate-demo.ts</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shell">
      <StatusBar
        seal={shortSha(model.seal)}
        generatedAt={model.generatedAt}
        counts={model.counts}
        filter={filter}
        copied={copied}
        onHelp={() => setHelpOpen(true)}
      />
      <div className="main">
        <nav className="rail panel" aria-label="Rooms">
          <RoomRail
            rooms={model.rooms}
            visibleSubjects={new Set(visible.map((s) => s.subject))}
            selectedSubject={selected?.subject ?? null}
            onSelect={(subject) => {
              const idx = visible.findIndex((s) => s.subject === subject);
              if (idx >= 0) setSelectedIdx(idx);
            }}
          />
        </nav>
        <main className="hero">
          {selected === null ? (
            <div className="empty-state">
              <div>
                <div className="headline">No subjects match this filter</div>
                <p>Press f to cycle the verdict filter, or ? for help.</p>
              </div>
            </div>
          ) : (
            <HeroVerdict
              view={selected}
              onOpenEvidence={() => setDrawerOpen(true)}
              onCopySha={() => {
                void navigator.clipboard?.writeText(selected.memory.current_head_sha ?? "").then(
                  () => {
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1200);
                  },
                  () => undefined,
                );
              }}
              onIntent={(name) => {
                const verdict = selected.verdict;
                if (verdict === null) return;
                setIntents((list) => [...list, emitFounderIntent(name, verdict)]);
              }}
            />
          )}
          {rsError !== null ? (
            <section className="roomstatus-panel panel" aria-label="Room status (fixture replay)">
              <div className="roomstatus-fault" role="alert">
                room-status fixture rejected: {rsError}
              </div>
            </section>
          ) : (
            rsScenario !== null && (
              <RoomStatusPanel
                scenario={rsScenario}
                scenarioIdx={rsIdx}
                total={roomScenarios.length}
                onNext={() => setRsIdx((i) => (i + 1) % roomScenarios.length)}
              />
            )
          )}
        </main>
      </div>

      {selected !== null && (
        <EvidenceDrawer
          open={drawerOpen}
          view={selected}
          intents={intents}
          onClose={() => setDrawerOpen(false)}
        />
      )}
      {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}
    </div>
  );
}
