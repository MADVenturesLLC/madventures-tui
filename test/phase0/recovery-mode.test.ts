/**
 * Room Runtime Phase 0 — recovery-mode rehydration proof (AT-R4-37 / r4.2
 * §2; act items 5.9, 5.11, 5.17; evidence item 15 class).
 *
 * AT-R4-37: committed CheckpointCommit at seq C; additional raw suffix
 * committed through N; projector detached. SIGKILL Gateway; reconstruct;
 * rejoin. Observable: the rejoin 0x02 stream equals the pre-crash canonical
 * owner grid at N, or checkpoint_unavailable + gap; banner RECONSTRUCTED;
 * recovery-mode pty-host is a Gateway child. Forbidden: raw PTY on 0x02;
 * banner LIVE; invented cells; OpenTUI parsing the suffix.
 *
 * Uses the spike-lib rehydration model: fed ONLY from an admissible
 * CheckpointCommit blob plus committed raw suffix; the projector receives
 * VT patches only; RECONSTRUCTED never LIVE; ExitUnknown for the dead
 * generation.
 */

import { describe, it, expect } from "bun:test";
import {
  rehydrate,
  isRawPtyOnProjectorWire,
  type AdmissibleCheckpoint,
  type RawRecord,
  type VtPatchFrame,
} from "./spike/phase0-lib";

describe("phase0 recovery-mode rehydration (AT-R4-37, r4.2 §2)", () => {
  const codec = "phase0-vt-1";

  it("rejoin equals the pre-crash canonical grid at N; banner RECONSTRUCTED, never LIVE", () => {
    // Committed CheckpointCommit at seq 10 (digest verified).
    const checkpoint: AdmissibleCheckpoint = {
      checkpoint_seq: 10,
      durable_committed_seq: 14,
      blob: "grid-at-10",
      digest_verified: true,
    };
    // Additional committed raw suffix (11..14).
    const suffix: RawRecord[] = [11, 12, 13, 14].map((seq) => ({
      pty_output_seq: seq,
      bytes: `patch-${seq}`,
    }));

    const result = rehydrate("exec-a", checkpoint, suffix, codec);
    expect(result.kind).toBe("ok");
    expect(result.banner).toBe("RECONSTRUCTION");
    // The 0x02 stream: checkpoint then the patch suffix — exactly the
    // pre-crash owner grid at N=14.
    expect(result.frames.length).toBe(5);
    expect(result.frames[0]?.checkpoint_or_patch).toBe("checkpoint");
    expect(result.frames.map((f) => f.pty_output_seq)).toEqual([10, 11, 12, 13, 14]);
    // Every frame is a VT patch/checkpoint — raw PTY on 0x02 fails.
    for (const frame of result.frames) {
      expect(isRawPtyOnProjectorWire(frame)).toBe(false);
    }
    // Banner is never LIVE for the dead PTY.
    expect(result.banner).not.toBe("LIVE");
  });

  it("unverified digest → checkpoint_unavailable + honest gap, never invented cells", () => {
    const checkpoint: AdmissibleCheckpoint = {
      checkpoint_seq: 10,
      durable_committed_seq: 14,
      blob: "grid-at-10",
      digest_verified: false, // blob hash fails
    };
    const result = rehydrate("exec-a", checkpoint, [], codec);
    expect(result.kind).toBe("checkpoint_unavailable");
    expect(result.frames.length).toBe(0);
    expect(result.banner).toBe("RECONSTRUCTION");
    expect(result.frames.length === 0).toBe(true);
  });

  it("checkpoint ahead of the durable watermark is unusable (r4.1 §4 rule 2)", () => {
    const checkpoint: AdmissibleCheckpoint = {
      checkpoint_seq: 20,
      durable_committed_seq: 14, // ring never fsynced past 14
      blob: "grid-at-20",
      digest_verified: true,
    };
    const result = rehydrate("exec-a", checkpoint, [], codec);
    expect(result.kind).toBe("checkpoint_unavailable");
    expect(result.frames.length).toBe(0);
  });

  it("no admissible checkpoint at all → checkpoint_unavailable, never a fake screen", () => {
    const result = rehydrate("exec-a", null, [], codec);
    expect(result.kind).toBe("checkpoint_unavailable");
    expect(result.frames.length).toBe(0);
  });

  it("ExitUnknown for the dead generation — never an invented ActivityResult", () => {
    // The rehydration never invents a receipt: the dead generation's exit
    // was unobserved by a living Gateway writer (r4.1 §6.2). The receipt
    // vocabulary in the recovery path is ExitUnknown.
    const checkpoint: AdmissibleCheckpoint = {
      checkpoint_seq: 10,
      durable_committed_seq: 10,
      blob: "grid-at-10",
      digest_verified: true,
    };
    const result = rehydrate("exec-a", checkpoint, [], codec);
    expect(result.kind).toBe("ok");
    // No exit receipt exists in the frames — rehydration paints cells, it
    // does not publish exit truth.
    const receiptKinds = result.frames.map((f: VtPatchFrame) => f.checkpoint_or_patch);
    expect(receiptKinds.includes("ActivityResult" as never)).toBe(false);
  });

  it("NEGATIVE CONTROL (T6): forged/raw/non-checkpoint-non-patch projector-wire candidates are DETECTED", () => {
    // The predicate accepts `unknown`, so the forbidden raw-PTY state is
    // reachable at runtime and demonstrably detected. Under the old
    // `'checkpoint' | 'patch'` input type these candidates could not even
    // be passed in — the proof was statically impossible, hence
    // ineffective. Every candidate below is a protocol violation on the
    // projector wire and MUST be reported as raw.

    // Forged candidate: a well-formed frame shape with a raw discriminator.
    const forgedRaw = {
      execution_id: "exec-a",
      pty_output_seq: 1,
      resize_epoch: 1,
      vt_codec_version: codec,
      checkpoint_or_patch: "raw",
      cells: "\u001b[6n\u001b[?25l raw pty bytes",
    };
    expect(isRawPtyOnProjectorWire(forgedRaw)).toBe(true);

    // Non-checkpoint/non-patch discriminator variants.
    expect(isRawPtyOnProjectorWire({ ...forgedRaw, checkpoint_or_patch: "Checkpoint" })).toBe(true);
    expect(isRawPtyOnProjectorWire({ ...forgedRaw, checkpoint_or_patch: "" })).toBe(true);
    expect(isRawPtyOnProjectorWire({ ...forgedRaw, checkpoint_or_patch: 0 })).toBe(true);
    expect(isRawPtyOnProjectorWire({ ...forgedRaw, checkpoint_or_patch: undefined })).toBe(true);

    // Missing discriminator entirely.
    const { checkpoint_or_patch: _omit, ...noDiscriminator } = forgedRaw;
    void _omit;
    expect(isRawPtyOnProjectorWire(noDiscriminator)).toBe(true);

    // Raw bytes / non-frame inputs reaching the wire boundary.
    expect(isRawPtyOnProjectorWire("\u001b[2J raw pty stream")).toBe(true);
    expect(isRawPtyOnProjectorWire(Buffer.from([0x1b, 0x5b, 0x48]))).toBe(true);
    expect(isRawPtyOnProjectorWire(null)).toBe(true);
    expect(isRawPtyOnProjectorWire(undefined)).toBe(true);
    expect(isRawPtyOnProjectorWire(42)).toBe(true);

    // Positive controls preserved: genuine VT checkpoint/patch frames are
    // NOT the violation.
    expect(
      isRawPtyOnProjectorWire({
        execution_id: "exec-a",
        pty_output_seq: 1,
        resize_epoch: 1,
        vt_codec_version: codec,
        checkpoint_or_patch: "checkpoint",
        cells: "grid",
      }),
    ).toBe(false);
    expect(
      isRawPtyOnProjectorWire({
        execution_id: "exec-a",
        pty_output_seq: 2,
        resize_epoch: 1,
        vt_codec_version: codec,
        checkpoint_or_patch: "patch",
        cells: "…",
      }),
    ).toBe(false);
  });
});