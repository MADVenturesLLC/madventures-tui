// src/permissions/engine.ts
// Permission engine — enforces who can write, when, under what attestation.
// Rules:
//   1. Only the lease holder can write code.
//   2. A paused lease must be re-attested before writing resumes.
//   3. Transfer requires acceptance + attestation from the receiving CLI.
//   4. No two CLIs can hold the lease simultaneously.

import type { CliId, LeaseState, Attestation } from "../shared/types";

export class PermissionEngine {
  canWrite(lease: LeaseState, actor: CliId): { allowed: boolean; reason?: string } {
    switch (lease.status) {
      case "free":
        return { allowed: false, reason: "No active lease holder" };

      case "held":
        if (lease.holder !== actor) {
          return { allowed: false, reason: `Lease held by ${lease.holder}, not ${actor}` };
        }
        if (!lease.attested) {
          return { allowed: false, reason: "Lease not attested" };
        }
        return { allowed: true };

      case "paused":
        return { allowed: false, reason: "Lease paused — re-attestation required" };

      case "transferring":
        return { allowed: false, reason: "Transfer in progress — writing locked" };
    }
  }

  canRequestTransfer(lease: LeaseState, actor: CliId): { allowed: boolean; reason?: string } {
    if (lease.status !== "held") {
      return { allowed: false, reason: "No active lease to transfer" };
    }
    if (lease.holder !== actor) {
      return { allowed: false, reason: "Only the lease holder can request transfer" };
    }
    return { allowed: true };
  }

  canAcceptTransfer(lease: LeaseState, actor: CliId): { allowed: boolean; reason?: string } {
    if (lease.status !== "transferring") {
      return { allowed: false, reason: "No pending transfer" };
    }
    if (lease.to !== actor) {
      return { allowed: false, reason: `Transfer targeted at ${lease.to}, not ${actor}` };
    }
    return { allowed: true };
  }

  canAttest(lease: LeaseState, actor: CliId): { allowed: boolean; reason?: string } {
    switch (lease.status) {
      case "paused":
        if (lease.holder !== actor) {
          return { allowed: false, reason: "Only the paused holder can attest" };
        }
        return { allowed: true };

      case "transferring":
        if (lease.to !== actor) {
          return { allowed: false, reason: "Only the transfer recipient can attest" };
        }
        return { allowed: true };

      default:
        return { allowed: false, reason: "No attestation needed in current state" };
    }
  }

  validateAttestation(attestation: Attestation, expectedHash: string): { valid: boolean; reason?: string } {
    if (attestation.codeHash !== expectedHash) {
      return { valid: false, reason: "Code hash mismatch — code state has drifted" };
    }
    return { valid: true };
  }
}
