// packages/honesty-compiler/src/report.ts
// P4 Report — a human summary plus ONE machine JSON line, always last on
// stdout. The JSON line is the machine contract: schema, claim, verdict,
// per-claim outcomes, failures, skips, and the compiler's own
// not_evidence_of boundary. Deterministic when `now` was pinned.

import type { VerdictRecord } from "@mad/single-verdict";

import type { ClaimOutcome, CompileResult } from "./compiler";
import { HONESTY_COMPILER_SCHEMA, REPORT_SCHEMA } from "./ir";

type ReportJson = {
  schema: typeof REPORT_SCHEMA;
  claim: typeof HONESTY_COMPILER_SCHEMA;
  mode: CompileResult["mode"];
  exit_code: CompileResult["exit_code"];
  input: string;
  subject: { name: string; sha: string } | null;
  head_sha: string | null;
  verdict: VerdictRecord;
  claims: ClaimOutcome[];
  failures: CompileResult["failures"];
  skips: CompileResult["skips"];
  not_evidence_of: readonly string[];
};

export function renderJsonLine(result: CompileResult): string {
  const verdictSubject = result.verdict.subject;
  const report: ReportJson = {
    schema: REPORT_SCHEMA,
    claim: HONESTY_COMPILER_SCHEMA,
    mode: result.mode,
    exit_code: result.exit_code,
    input: result.input,
    subject: { name: verdictSubject.name, sha: verdictSubject.sha },
    head_sha: result.head_sha,
    verdict: result.verdict,
    claims: result.claims,
    failures: result.failures,
    skips: result.skips,
    not_evidence_of: result.not_evidence_of,
  };
  return JSON.stringify(report);
}

export function renderHuman(result: CompileResult): string {
  const lines: string[] = [];
  lines.push(`mad-honesty-compile (${result.mode}) — input: ${result.input}`);
  lines.push(`head: ${result.head_sha ?? "sealed fixture mode — no live head"}`);
  lines.push(`verdict: ${result.verdict.verdict} (reason ${result.verdict.reason_code})`);
  lines.push(`subject: ${result.verdict.subject.name} @ ${result.verdict.subject.sha}`);
  const okCount = result.claims.filter((c) => c.status === "OK").length;
  lines.push(`claims: ${String(result.claims.length)} — ${String(okCount)} OK, ${String(result.claims.length - okCount)} FAIL`);
  for (const claim of result.claims) {
    lines.push(`  [${claim.status}] ${claim.id} (${claim.kind})`);
    for (const issue of claim.issues) {
      lines.push(`         ${issue.code}${issue.path !== undefined ? ` @ ${issue.path}` : ""}: ${issue.message}`);
    }
  }
  for (const failure of result.failures) {
    const claimScoped = failure.path !== undefined && failure.path.startsWith("claims[");
    if (!claimScoped) lines.push(`  [FAIL] ${failure.code}${failure.path !== undefined ? ` @ ${failure.path}` : ""}: ${failure.message}`);
  }
  for (const skip of result.skips) {
    lines.push(`  [SKIP] ${skip.kind} ref ${String(skip.refIndex)} of claim "${skip.claimId}": ${skip.reason}`);
  }
  if (result.verdict.findings !== undefined) {
    for (const finding of result.verdict.findings) {
      lines.push(`  [FINDING] ${finding.code}: ${finding.message}`);
    }
  }
  lines.push(
    `claim: ${HONESTY_COMPILER_SCHEMA} — not evidence of ${result.not_evidence_of.join(", ")}. Not merge authority.`,
  );
  return lines.join("\n");
}
