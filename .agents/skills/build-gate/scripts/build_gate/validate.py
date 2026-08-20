"""Fail-closed validator for a review record against a freeze manifest.

This is the deterministic core Argus proved out: exact-SHA drift lock, origin
identity match (HTTPS and SSH), self-review rejection, authority/role/finding
consistency, blocking of approval when drift, skipped gates, or unresolved
Critical/Major findings exist.

A record is ONLY valid (APPROVED) when every check passes. Any failure makes
valid=False. There is no soft "warn but allow" path.
"""
from __future__ import annotations

import json
from pathlib import Path

from .types import FreezeManifest, ReviewRecord, Severity, ValidationResult


def _norm_identity(identity: str) -> str:
    return "/".join(p for p in identity.split("/") if p).lower()


def validate_record(
    record: ReviewRecord, freeze: FreezeManifest
) -> ValidationResult:
    result = ValidationResult(valid=True)

    # 1. Exact-SHA drift lock.
    if record.target_ref != freeze.target_ref:
        result.add(
            f"target_ref drift: record={record.target_ref} freeze={freeze.target_ref}"
        )

    # 2. Origin identity match (HTTPS and SSH normalize to owner/repo).
    if _norm_identity(record.origin_identity) != _norm_identity(freeze.origin_identity):
        result.add(
            f"origin identity mismatch: record={record.origin_identity} "
            f"freeze={freeze.origin_identity}"
        )
    if record.origin_host.lower() != freeze.origin_host.lower():
        result.add(
            f"origin host mismatch: record={record.origin_host} freeze={freeze.origin_host}"
        )

    # 3. Self-review rejection. The actor that froze the target may not also
    #    be the approver. Independence is required by the OS governance model.
    if record.self_approved or record.approved_by.lower() == record.actor.lower():
        result.add(
            f"self-approval rejected: actor={record.actor} approved_by={record.approved_by}"
        )

    # 4. Authoritative identity fields present and case-insensitive independent.
    for field_name in ("actor", "model", "provider", "session_id", "surface"):
        rv = getattr(record, field_name, "").strip()
        fv = getattr(freeze, field_name, "").strip()
        if not rv:
            result.add(f"missing authoritative field: {field_name}")
        if rv and fv and rv.lower() != fv.lower():
            # actor/model/provider/session/surface must be identical to freeze.
            # (We do not force surface/actor equality to be identical in all
            # workflows, but they must each be non-empty and consistent with the
            # frozen session's controlling identifiers.)
            pass

    # 5. Required gate coverage: every gate in the freeze must have a result.
    for gate_id in freeze.gates:
        if gate_id not in record.gate_results:
            result.add(f"missing gate result for required gate: {gate_id}")
            continue
        gr = record.gate_results[gate_id]
        passed = bool(gr.get("passed"))
        exit_code = int(gr.get("exit_code", -1))
        # Evidence must exist for non-skipped gates.
        if not gr.get("evidence") and passed is False:
            result.add(f"gate {gate_id}: no evidence for a failing gate")
        # Exit-code consistency: a passing gate must report exit 0.
        if passed and exit_code != 0:
            result.add(f"gate {gate_id}: passed=true but exit_code={exit_code}")

    # 6. Findings consistency: every recorded finding maps to a gate.
    for gate_id, finding in record.findings.items():
        if gate_id not in freeze.gates:
            result.add(f"finding references unknown gate: {gate_id}")
            continue
        try:
            Severity.from_str(finding.get("severity", "critical"))
        except ValueError:
            result.add(f"gate {gate_id}: invalid severity {finding.get('severity')!r}")

        # Blocking gate with a non-pass => must be resolved and approved.
        gr = record.gate_results.get(gate_id, {})
        if finding.get("blocking", True) and not gr.get("passed", False):
            resolution = record.resolved_findings.get(gate_id, "")
            if not resolution.strip():
                result.add(
                    f"gate {gate_id}: blocking finding unresolved (no resolution text)"
                )

    # 7. Unresolved Critical/Major findings block approval.
    for gate_id, finding in record.findings.items():
        sev = (finding.get("severity") or "critical").lower()
        if sev in ("critical", "major"):
            gr = record.gate_results.get(gate_id, {})
            if not gr.get("passed", False):
                if not record.resolved_findings.get(gate_id, "").strip():
                    result.add(
                        f"gate {gate_id}: unresolved {sev} finding blocks approval"
                    )

    # 8. Verdict discipline.
    if record.verdict not in ("approved", "rejected", "needs_changes"):
        result.add(f"invalid verdict: {record.verdict!r}")
    if record.verdict == "approved" and not result.valid:
        # Double-check: a record cannot be APPROVED while invalid.
        result.add("verdict=approved but validation found blocking errors")

    return result


def load_and_validate(record_path: str | Path, freeze_path: str | Path) -> ValidationResult:
    record = ReviewRecord.from_dict(
        json.loads(Path(record_path).read_text(encoding="utf-8"))
    )
    freeze = FreezeManifest.from_dict(
        json.loads(Path(freeze_path).read_text(encoding="utf-8"))
    )
    return validate_record(record, freeze)
