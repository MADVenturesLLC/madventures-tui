// packages/founder-act/src/show.ts
// Human-readable summary of a FounderAct. Presentation only — no judgment.

import type { SealedActV0 } from "./act";
import type { VerifyResult } from "./verify";

export function renderShow(result: VerifyResult, act: SealedActV0): string {
  const lines: string[] = [];
  lines.push(`act_sha256 : ${act.act_sha256}`);
  lines.push(`body_sha256: ${act.body_sha256}`);
  lines.push(`status     : ${result.status}`);
  lines.push(`schema     : ${act.schema}`);
  lines.push(`id         : ${act.id}`);
  lines.push(`kind       : ${act.kind}${act.kind_name !== undefined ? ` (kind_name: ${act.kind_name})` : ""}`);
  lines.push(`subject    : ${act.subject}`);
  if (act.head_sha !== undefined) lines.push(`head_sha   : ${act.head_sha}`);
  if (act.base_sha !== undefined) lines.push(`base_sha   : ${act.base_sha}`);
  lines.push(`scope      : ${act.scope.length > 0 ? act.scope.join(", ") : "(empty)"}`);
  lines.push(`actor      : ${act.actor}`);
  lines.push(`issued_at  : ${act.issued_at}`);
  if (act.expires_at !== undefined) lines.push(`expires_at : ${act.expires_at}`);
  lines.push(`reason_code: ${act.reason_code}`);
  lines.push(`evidence   : ${act.evidence_refs.length} ref(s)`);
  for (const ref of act.evidence_refs) {
    lines.push(`  - ${ref.kind}: ${ref.ref}`);
  }
  if (result.path !== undefined) lines.push(`file       : ${result.path}`);
  if (act.actor === "demo") {
    lines.push("");
    lines.push("NOTE: actor is \"demo\" — this is a test fixture, NOT a Founder authorization.");
  }
  if (result.reasons.length > 0) {
    lines.push("");
    lines.push("reasons:");
    for (const reason of result.reasons) lines.push(`  - ${reason}`);
  }
  return lines.join("\n");
}
