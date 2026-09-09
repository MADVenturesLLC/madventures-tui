// packages/proving-ground/src/challenges.ts
// The v0 challenge registry. Declarations live in code so the runner set and
// the declaration can never drift apart; spec cards live as files under
// testdata/proving-ground/challenges/.

import path from "node:path";
import { provingGroundDir, repoRoot } from "./paths";
import type { ChallengeDecl } from "./types";

export const DEFAULT_SEED = 20260906;

export function specCardPath(root = repoRoot()): string {
  return path.join(provingGroundDir(root), "challenges", "a1-reserve-before-spawn.spec.md");
}

export const REQUIRED_SPEC_SECTIONS = [
  "Defect (observed)",
  "Why this repo must not fix it",
  "Law-oracle sketch",
  "Owner",
] as const;

export function challengeDeclarations(): ChallengeDecl[] {
  return [
    {
      id: "pg-cb-lies",
      kind: "malformed_authority",
      title: "Claim-boundary lying receipts are judged by the law, not by luck",
      oracle: "@mad/claim-boundary validate/parse via the law oracle (L1–L6)",
      seed: DEFAULT_SEED,
    },
    {
      id: "pg-tui-governance",
      kind: "tui_governance",
      title: "Founder decision surface stays governed in a live headless TUI",
      oracle: "tui-chaos governance_focus (thin wrapper, exit 0 + scenario pass)",
      seed: DEFAULT_SEED,
    },
    {
      id: "pg-agents-drift",
      kind: "static_instruction_drift",
      title: "AGENTS.md matches shipped reality (audit A5 class)",
      oracle: "drift pins: symbol existence ⇒ no staleness claim",
      seed: DEFAULT_SEED,
    },
    {
      id: "pg-a1-spec",
      kind: "spec_card",
      title: "A1 reserve-before-spawn race — durable spec card (fix owned by the Phase 0 integrate track)",
      oracle: "spec card structural validation",
      seed: DEFAULT_SEED,
      specCardPath: specCardPath(),
    },
  ];
}

export function findChallenge(id: string): ChallengeDecl | null {
  return challengeDeclarations().find((c) => c.id === id) ?? null;
}
