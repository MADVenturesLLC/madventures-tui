"""Profile loading + gate execution engine for build-gate.

Standard library only. Runs the shell commands declared in a profile and
produces deterministic GateResult objects.
"""
from __future__ import annotations

import json
import os
import signal
import subprocess
from pathlib import Path
from typing import Optional

from .types import GateResult, GateSpec, Severity

# Stored gate evidence is bounded. Test runners print failure identity and
# aggregate counts last, so a head-only slice of a long red run can hold
# nothing but earlier passing lines. Evidence therefore keeps a bounded head
# for context and gives the rest of the budget to the tail, with an explicit
# marker for the omitted middle. The bound applies to the stored string as a
# whole, marker included.
EVIDENCE_MAX_CHARS = 4000
EVIDENCE_HEAD_CHARS = 1000
EVIDENCE_TRUNCATION_MARKER = "\n... [OUTPUT TRUNCATED: {omitted} chars omitted] ...\n"


def parse_profile(raw: str, source: str = "<profile>") -> dict:
    data = json.loads(raw)
    if "gates" not in data or not isinstance(data["gates"], list):
        raise ValueError(f"profile {source} missing 'gates' list")
    return data


def load_profile(profile_path: str | Path) -> dict:
    return parse_profile(Path(profile_path).read_text(encoding="utf-8"), str(profile_path))


def discover_gates(profile: dict) -> list[GateSpec]:
    specs: list[GateSpec] = []
    seen_ids: set[str] = set()
    for entry in profile["gates"]:
        if not isinstance(entry, dict):
            raise ValueError("gate entry must be an object")
        gate_id = entry.get("id")
        command = entry.get("command")
        if not isinstance(gate_id, str) or not gate_id.strip():
            raise ValueError("gate id must be a non-empty string")
        if not isinstance(command, str) or not command.strip():
            raise ValueError(f"gate {gate_id}: command must be a non-empty string")
        if gate_id in seen_ids:
            raise ValueError(f"duplicate gate id: {gate_id}")
        seen_ids.add(gate_id)
        if "pass_exit_codes" in entry:
            raise ValueError(
                f"gate {gate_id}: pass_exit_codes is not supported"
            )
        timeout_seconds = entry.get("timeout_seconds", 600)
        if (
            isinstance(timeout_seconds, bool)
            or not isinstance(timeout_seconds, (int, float))
            or timeout_seconds <= 0
        ):
            raise ValueError(
                f"gate {gate_id}: timeout_seconds must be a positive number"
            )
        spec = GateSpec(
            id=gate_id,
            command=command,
            description=entry.get("description", ""),
            severity=Severity.from_str(entry.get("severity", "critical")),
            required_env=entry.get("required_env"),
            conditional_on=entry.get("conditional_on"),
            blocking=entry.get("blocking", True),
            timeout_seconds=float(timeout_seconds),
            expect_origin_host=entry.get("expect_origin_host"),
        )
        specs.append(spec)
    return specs


def _text(value: str | bytes | None) -> str:
    if isinstance(value, bytes):
        return value.decode("utf-8", errors="replace")
    return value or ""


def _run_command(
    command: str, cwd: str | Path, timeout_seconds: float, env: dict[str, str]
) -> tuple[int, str]:
    proc = subprocess.Popen(
        command,
        shell=True,
        cwd=str(cwd),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        start_new_session=True,
        env=env,
    )
    try:
        stdout, stderr = proc.communicate(timeout=timeout_seconds)
    except subprocess.TimeoutExpired:
        if os.name == "posix":
            try:
                os.killpg(proc.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        else:
            proc.kill()
        stdout, stderr = proc.communicate()
        out = _text(stdout) + _text(stderr)
        return -1, f"timed out after {timeout_seconds:g} seconds\n{out}".strip()
    out = (stdout or "") + (stderr or "")
    return proc.returncode, out.strip()


def bound_evidence(out: str) -> str:
    """Bound captured output to EVIDENCE_MAX_CHARS, preserving both ends.

    Output within the bound is stored unchanged. Longer output keeps its first
    EVIDENCE_HEAD_CHARS, then the truncation marker, then as much of the tail
    as the remaining budget allows. The result is a pure function of `out`.
    """
    if len(out) <= EVIDENCE_MAX_CHARS:
        return out
    head = out[:EVIDENCE_HEAD_CHARS]
    # Reserve marker space using the widest count the marker could carry
    # (omitted <= len(out)), so the final string never exceeds the bound.
    reserved = len(EVIDENCE_TRUNCATION_MARKER.format(omitted=len(out)))
    tail_chars = EVIDENCE_MAX_CHARS - EVIDENCE_HEAD_CHARS - reserved
    tail = out[len(out) - tail_chars :]
    omitted = len(out) - len(head) - len(tail)
    return head + EVIDENCE_TRUNCATION_MARKER.format(omitted=omitted) + tail


def run_gate(spec: GateSpec, cwd: str | Path, env: dict[str, str]) -> GateResult:
    code, out = _run_command(spec.command, cwd, spec.timeout_seconds, env)
    passed = code == 0
    return GateResult(
        gate_id=spec.id,
        passed=passed,
        evidence=bound_evidence(out),
        exit_code=code,
    )


def run_all_gates(
    profile: dict, cwd: str | Path, env: Optional[dict] = None
) -> dict[str, GateResult]:
    """Execute every gate, honoring required_env and conditional_on skips.

    Returns gate_id -> GateResult. A skipped gate is still a GateResult with
    skipped=True so the validator can reason about coverage.
    """
    env = env or {}
    specs = discover_gates(profile)
    results: dict[str, GateResult] = {}

    for spec in specs:
        # required_env: if the controlling env var is absent, the gate cannot
        # run deterministically. It is recorded as skipped (passed=False);
        # any_failed treats that as a command-boundary failure.
        if spec.required_env:
            missing = [v for v in spec.required_env if not env.get(v)]
            if missing:
                results[spec.id] = GateResult(
                    gate_id=spec.id,
                    passed=False,
                    evidence="",
                    exit_code=-1,
                    skipped=True,
                    skip_reason=f"missing required env: {', '.join(missing)}",
                )
                continue

        # conditional_on: a gate only applies if its dependency passed.
        if spec.conditional_on:
            dep = results.get(spec.conditional_on)
            if dep is None or dep.skipped or not dep.passed:
                results[spec.id] = GateResult(
                    gate_id=spec.id,
                    passed=False,
                    evidence="",
                    exit_code=-1,
                    skipped=True,
                    skip_reason=f"conditional gate '{spec.conditional_on}' not satisfied",
                )
                continue

        results[spec.id] = run_gate(spec, cwd, env)

    return results


def any_failed(results: dict[str, GateResult]) -> bool:
    # Skipped required gates are failures at the command boundary. Optional
    # gates are not modeled; every declared gate is blocking.
    return any(r.passed is False for r in results.values())
