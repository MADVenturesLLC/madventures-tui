import type { BrokerSnapshot } from "@madventures/broker";

export const fingerprint = { kind: "commit", sha256: "synthetic-digest", git_sha: "synthetic-revision" } as const;

export const sparseSnapshot: BrokerSnapshot = {
  sessionId: "", snapshotSeq: null, connected: null, phase: "starting", taskEnvelopeHash: "", task: null,
  repositoryFingerprint: fingerprint, executions: null, activeWriterExecutionId: null, fencingToken: null,
  tokenState: "not_issued", pendingApprovals: [], pendingTransfers: null, permissionSummary: null,
  ownershipState: null, verification: null, review: null, incident: null, eventLog: [], queueDepth: null, ledgerSeq: 0,
};
