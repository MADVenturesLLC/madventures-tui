/**
 * Room Runtime Phase 0 — shared spike fixture machinery (isolated spike,
 * never imported by production).
 *
 * Implements the fixture seams the frozen stack names for the Phase 0
 * proofs, per r4 §7.4 (parent-death control channel), r4.1 §6.1 (control-pipe
 * FD scrub), r4.2 §2 (recovery-mode rehydration), r4.2 §3 / r4.3 §2
 * (bounded private raw spool), r4.1 §5 (Gateway-minted viewer_id), and the
 * M19 termination ladder (r4 §7.4).
 *
 * Everything here is test-fixture code under `test/phase0/spike/` — the
 * production `packages/pty-host` is untouched.
 *
 * Bun-only in the test runtime (Bun.spawn), matching the repo's existing
 * `test/phase3a/spike/` precedent.
 */

/** Bounded private raw-record spool (r4.2 §3 / r4.3 §2). */
export interface RawSpool {
  /** Enqueue one raw PTY record. Returns false when the spool is full. */
  push(record: RawRecord): boolean;
  /** Records currently enqueued, oldest first. */
  drain(): RawRecord[];
  readonly length: number;
  readonly byteLength: number;
  readonly boundBytes: number;
}

export interface RawRecord {
  readonly pty_output_seq: number;
  readonly bytes: string;
}

/** Latest self-contained checkpoint candidate (r4.2 §3 structure 2c). */
export interface CheckpointCandidate {
  readonly checkpoint_seq: number;
  readonly blob: string;
  readonly vt_codec_version: string;
}

/**
 * The r4.3 §2 spool: never drops an unsent raw record. When full and no
 * durable covering CheckpointCommit exists, the caller must enter
 * PrivateTransportExhausted and terminate — this spool reports `full`,
 * it never silently discards.
 */
export function createRawSpool(boundBytes: number): RawSpool {
  const records: RawRecord[] = [];
  let byteLength = 0;
  return {
    push(record) {
      const size = record.bytes.length;
      if (byteLength + size > boundBytes) return false;
      records.push(record);
      byteLength += size;
      return true;
    },
    drain() {
      return [...records];
    },
    get length() {
      return records.length;
    },
    get byteLength() {
      return byteLength;
    },
    get boundBytes() {
      return boundBytes;
    },
  };
}

/**
 * The pty-host-side pressure model (r4.3 §2 rules 1–5):
 *  - keep reading the PTY (the fixture's feed()) regardless of Gateway
 *    consumption;
 *  - enqueue raw records while there is room;
 *  - never drop an unsent raw record;
 *  - when the spool fills and no durable covering CheckpointCommit exists:
 *    PrivateTransportExhausted — terminate the execution (that slot).
 */
export interface PressureOutcome {
  readonly outcome: 'enqueued' | 'private_transport_exhausted';
  readonly dropped_records: number;
}

export interface PressureModelInputs {
  readonly durableCoveringCommitSeq: number | null;
}

export function feedUnderPressure(
  spool: RawSpool,
  record: RawRecord,
  inputs: PressureModelInputs,
): PressureOutcome {
  const pushed = spool.push(record);
  if (pushed) return { outcome: 'enqueued', dropped_records: 0 };
  // Spool full without a durable covering commit: fail-closed for that
  // execution (r4.3 §2 rule 5). The sibling slot is unaffected (r4.4 §2).
  if (inputs.durableCoveringCommitSeq === null) {
    return { outcome: 'private_transport_exhausted', dropped_records: 0 };
  }
  // A covering commit exists for a seq >= this record's — the r4.2 §3 rule
  // is superseded by r4.3: still no drop of unsent raw. Exhaustion is the
  // only overflow outcome in Phase 0–2.
  return { outcome: 'private_transport_exhausted', dropped_records: 0 };
}

/** VT patch frame as it appears on the projector wire (r4.1 §3). */
export interface VtPatchFrame {
  readonly execution_id: string;
  readonly pty_output_seq: number;
  readonly resize_epoch: number;
  readonly vt_codec_version: string;
  readonly checkpoint_or_patch: 'checkpoint' | 'patch';
  readonly cells: string;
}

/**
 * The projector-wire boundary (r4.1 §3): frames are VT patches only — a
 * raw PTY byte frame is a protocol violation that must FAIL (AT-R4-04/09).
 */
export function isRawPtyOnProjectorWire(frame: VtPatchFrame): boolean {
  // Raw PTY on the projector wire would be a frame whose payload is raw
  // bytes rather than a checkpoint/patch cell grid. In the fixture's
  // vocabulary, any frame claiming to carry raw PTY is the violation.
  return frame.checkpoint_or_patch !== 'checkpoint' && frame.checkpoint_or_patch !== 'patch';
}

/** Gateway-minted viewer identity (r4.1 §5). */
export interface ViewerCapability {
  readonly viewer_id: string;
  readonly bind_nonce: string;
  readonly expiry: number;
  readonly occupancy_scope: string;
}

export interface ViewerRegistry {
  /** Mint a fresh, occupancy-scoped viewer identity. */
  mint(): ViewerCapability;
  /** Validate a presented capability: null when forged/expired/foreign. */
  validate(presented: unknown): ViewerCapability | null;
  readonly occupancy_scope: string;
}

let mintCounter = 0;

export function createViewerRegistry(occupancyScope: string): ViewerRegistry {
  const minted = new Map<string, ViewerCapability>();
  return {
    occupancy_scope: occupancyScope,
    mint() {
      mintCounter += 1;
      const cap: ViewerCapability = {
        viewer_id: `viewer-${mintCounter}-${Math.random().toString(36).slice(2, 10)}`,
        bind_nonce: Math.random().toString(36).slice(2, 14),
        expiry: Number.MAX_SAFE_INTEGER,
        occupancy_scope: occupancyScope,
      };
      minted.set(cap.viewer_id, cap);
      return cap;
    },
    validate(presented) {
      if (typeof presented !== 'object' || presented === null) return null;
      const cap = presented as Partial<ViewerCapability>;
      if (
        typeof cap.viewer_id !== 'string' ||
        typeof cap.bind_nonce !== 'string' ||
        cap.occupancy_scope !== occupancyScope
      ) {
        return null;
      }
      const stored = minted.get(cap.viewer_id);
      if (stored === undefined) return null;
      if (stored.bind_nonce !== cap.bind_nonce) return null;
      return stored;
    },
  };
}

/** Recovery-kind vocabulary (r4 Table 9 / r4.2 §2). */
export type RecoveryKind = 'LIVE_REATTACH' | 'HISTORY_REPLAY' | 'NATIVE_RESUME' | 'RECONSTRUCTION';

/**
 * Recovery-mode rehydration model (r4.2 §2): the recovery-mode pty-host is
 * fed ONLY from an admissible CheckpointCommit blob plus the committed raw
 * suffix; the projector receives VT patches; RECONSTRUCTED is never LIVE.
 */
export interface AdmissibleCheckpoint {
  readonly checkpoint_seq: number;
  readonly durable_committed_seq: number;
  readonly blob: string;
  readonly digest_verified: boolean;
}

export interface RehydrationResult {
  readonly kind: 'ok' | 'checkpoint_unavailable';
  readonly banner: RecoveryKind;
  readonly frames: VtPatchFrame[];
}

export function rehydrate(
  executionId: string,
  checkpoint: AdmissibleCheckpoint | null,
  committedSuffix: RawRecord[],
  vtCodecVersion: string,
): RehydrationResult {
  if (
    checkpoint === null ||
    !checkpoint.digest_verified ||
    checkpoint.checkpoint_seq > checkpoint.durable_committed_seq
  ) {
    return { kind: 'checkpoint_unavailable', banner: 'RECONSTRUCTION', frames: [] };
  }
  const frames: VtPatchFrame[] = [
    {
      execution_id: executionId,
      pty_output_seq: checkpoint.checkpoint_seq,
      resize_epoch: 1,
      vt_codec_version: vtCodecVersion,
      checkpoint_or_patch: 'checkpoint',
      cells: checkpoint.blob,
    },
    ...committedSuffix.map((record) => ({
      execution_id: executionId,
      pty_output_seq: record.pty_output_seq,
      resize_epoch: 1,
      vt_codec_version: vtCodecVersion,
      checkpoint_or_patch: 'patch' as const,
      cells: record.bytes,
    })),
  ];
  // Banner is RECONSTRUCTED, never LIVE, for the dead PTY (r4.2 §2 rule 5).
  return { kind: 'ok', banner: 'RECONSTRUCTION', frames };
}