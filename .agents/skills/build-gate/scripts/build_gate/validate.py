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


def _is_approved(record: ReviewRecord) -> bool:
    return record.verdict == "approved"


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

    # 3. Profile identity: name and hash must match the freeze.
    if record.profile != freeze.profile:
        result.add(
            f"profile name mismatch: record={record.profile} freeze={freeze.profile}"
        )
    rec_hash = (record.profile_sha256 or "").strip()
    if not rec_hash:
        result.add("missing profile_sha256 on review record")
    elif rec_hash != freeze.profile_sha256:
        result.add(
            f"profile_sha256 mismatch: record={rec_hash} freeze={freeze.profile_sha256}"
        )

    # 4. Authoritative identity must match the freeze. A caller-supplied
    #    record.actor cannot be forged independent of freeze.actor.
    for field_name in ("actor", "model", "provider", "session_id", "surface"):
        rv = getattr(record, field_name, "").strip()
        fv = getattr(freeze, field_name, "").strip()
        if not rv:
            result.add(f"missing authoritative field: {field_name}")
        if not fv:
            result.add(f"missing freeze field: {field_name}")
        if rv and fv and rv.casefold() != fv.casefold():
            result.add(f"{field_name} mismatch: record={rv} freeze={fv}")

    # 5. Self-review rejection is bound to freeze.actor, not the
    #    caller-controlled record.actor. Applies when the record claims approval.
    if _is_approved(record):
        approved_by = record.approved_by.strip()
        freeze_actor = freeze.actor.strip()
        record_actor = record.actor.strip()
        if not approved_by:
            result.add("approved verdict requires non-empty approved_by")
        else:
            if approved_by.casefold() == freeze_actor.casefold():
                result.add(
                    f"self-approval rejected: freeze.actor={freeze.actor} "
                    f"approved_by={record.approved_by}"
                )
            if approved_by.casefold() == record_actor.casefold():
                result.add(
                    f"self-approval rejected: actor={record.actor} "
                    f"approved_by={record.approved_by}"
                )
        if record.self_approved:
            result.add(
                f"self-approval rejected: actor={record.actor} "
                f"approved_by={record.approved_by}"
            )

    # 6. Required gate coverage: every freeze gate must have a result.
    for gate_id in freeze.gates:
        if gate_id not in record.gate_results:
            result.add(f"missing gate result for required gate: {gate_id}")
            continue
        gr = record.gate_results[gate_id]
        if not isinstance(gr, dict):
            result.add(f"gate {gate_id}: result must be an object")
            continue
        passed = gr.get("passed")
        skipped = gr.get("skipped", False)
        exit_code = gr.get("exit_code")
        if not isinstance(passed, bool):
            result.add(f"gate {gate_id}: passed must be a JSON boolean")
            continue
        if not isinstance(skipped, bool):
            result.add(f"gate {gate_id}: skipped must be a JSON boolean")
            continue
        if isinstance(exit_code, bool) or not isinstance(exit_code, int):
            result.add(f"gate {gate_id}: exit_code must be a JSON integer")
            continue
        evidence = gr.get("evidence")
        if not isinstance(evidence, str):
            result.add(f"gate {gate_id}: evidence must be a JSON string")
            continue

        if skipped and _is_approved(record):
            result.add(f"gate {gate_id}: skipped gates block approval")
            continue
        if passed is False and not skipped and _is_approved(record):
            finding = record.findings.get(gate_id) or {}
            resolution = record.resolved_findings.get(gate_id, "")
            if not finding:
                result.add(f"gate {gate_id}: failed required gate has no finding")
            if not str(resolution).strip():
                result.add(
                    f"gate {gate_id}: failed required gate unresolved (no resolution text)"
                )
            if not evidence:
                result.add(f"gate {gate_id}: no evidence for a failing gate")
        if passed and exit_code != 0:
            result.add(f"gate {gate_id}: passed=true but exit_code={exit_code}")

    # 7. Findings consistency: every recorded finding maps to a gate.
    for gate_id, finding in record.findings.items():
        if gate_id not in freeze.gates:
            result.add(f"finding references unknown gate: {gate_id}")
            continue
        try:
            Severity.from_str(finding.get("severity", "critical"))
        except ValueError:
            result.add(f"gate {gate_id}: invalid severity {finding.get('severity')!r}")

        if not _is_approved(record):
            continue
        gr = record.gate_results.get(gate_id, {})
        if finding.get("blocking", True) and not gr.get("passed", False):
            resolution = record.resolved_findings.get(gate_id, "")
            if not resolution.strip():
                result.add(
                    f"gate {gate_id}: blocking finding unresolved (no resolution text)"
                )

    # 8. Unresolved Critical/Major findings block approval.
    if _is_approved(record):
        for gate_id, finding in record.findings.items():
            sev = (finding.get("severity") or "critical").lower()
            if sev in ("critical", "major"):
                gr = record.gate_results.get(gate_id, {})
                if not gr.get("passed", False):
                    if not record.resolved_findings.get(gate_id, "").strip():
                        result.add(
                            f"gate {gate_id}: unresolved {sev} finding blocks approval"
                        )

    # 9. Verdict discipline.
    if record.verdict not in ("approved", "rejected", "needs_changes"):
        result.add(f"invalid verdict: {record.verdict!r}")
    if record.verdict == "approved" and not result.valid:
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
