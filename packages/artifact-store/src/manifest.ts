// packages/artifact-store/src/manifest.ts
// Manifest generation for evidence export.

import type { ArtifactMetadata } from "./store";

export interface ManifestEntry {
  sha256: string;
  size_bytes: number;
  type: string;
  task_id: string;
}

export interface FinalManifest {
  version: string;
  generated_at: string;
  artifact_count: number;
  artifacts: ManifestEntry[];
  ledger_head_hash: string;
  repo_fingerprint: string;
}

export function createManifest(
  artifacts: ArtifactMetadata[],
  ledgerHeadHash: string,
  repoFingerprint: string,
): FinalManifest {
  return {
    version: "madbridge-protocol/v1",
    generated_at: new Date().toISOString(),
    artifact_count: artifacts.length,
    artifacts: artifacts.map((a) => ({
      sha256: a.sha256,
      size_bytes: a.size_bytes,
      type: a.type,
      task_id: a.task_id,
    })),
    ledger_head_hash: ledgerHeadHash,
    repo_fingerprint: repoFingerprint,
  };
}