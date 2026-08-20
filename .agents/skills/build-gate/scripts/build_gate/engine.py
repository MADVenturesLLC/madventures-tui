"""Profile loading + gate execution engine for build-gate.

Standard library only. Runs the shell commands declared in a profile and
produces deterministic GateResult objects.
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Optional

from .types import GateResult, GateSpec, Severity


def load_profile(profile_path: str | Path) -> dict:
    raw = Path(profile_path).read_text(encoding="utf-8")
    data = json.loads(raw)
    if "gates" not in data or not isinstance(data["gates"], list):
        raise ValueError(f"profile {profile_path} missing 'gates' list")
    return data


def discover_gates(profile: dict) -> list[GateSpec]:
    specs: list[GateSpec] = []
    for entry in profile["gates"]:
        spec = GateSpec(
            id=entry["id"],
            command=entry["command"],
            description=entry.get("description", ""),
            severity=Severity.from_str(entry.get("severity", "critical")),
            required_env=entry.get("required_env"),
            conditional_on=entry.get("conditional_on"),
            blocking=entry.get("blocking", True),
            pass_exit_codes=tuple(entry.get("pass_exit_codes", [0])),
            expect_origin_host=entry.get("expect_origin_host"),
        )
        specs.append(spec)
    return specs


def _run_command(command: str, cwd: str | Path) -> tuple[int, str]:
    proc = subprocess.run(
        command,
        shell=True,
        cwd=str(cwd),
        capture_output=True,
        text=True,
    )
    out = (proc.stdout or "") + (proc.stderr or "")
    return proc.returncode, out.strip()


def run_gate(spec: GateSpec, cwd: str | Path) -> GateResult:
    code, out = _run_command(spec.command, cwd)
    passed = code in spec.pass_exit_codes
    return GateResult(
        gate_id=spec.id,
        passed=passed,
        evidence=out[:4000],
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
    by_id = {s.id: s for s in specs}
    results: dict[str, GateResult] = {}

    for spec in specs:
        # required_env: if the controlling env var is absent, the gate cannot
        # run deterministically, so it is skipped (advisory) rather than passed.
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

        results[spec.id] = run_gate(spec, cwd)

    return results


def any_failed(results: dict[str, GateResult]) -> bool:
    return any(r.passed is False and not r.skipped for r in results.values())
