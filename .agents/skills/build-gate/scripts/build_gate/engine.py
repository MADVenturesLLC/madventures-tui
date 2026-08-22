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


def parse_profile(raw: str, source: str = "<profile>") -> dict:
    data = json.loads(raw)
    if "gates" not in data or not isinstance(data["gates"], list):
        raise ValueError(f"profile {source} missing 'gates' list")
    return data


def load_profile(profile_path: str | Path) -> dict:
    return parse_profile(Path(profile_path).read_text(encoding="utf-8"), str(profile_path))


def discover_gates(profile: dict) -> list[GateSpec]:
    specs: list[GateSpec] = []
    for entry in profile["gates"]:
        timeout_seconds = entry.get("timeout_seconds", 600)
        if (
            isinstance(timeout_seconds, bool)
            or not isinstance(timeout_seconds, (int, float))
            or timeout_seconds <= 0
        ):
            raise ValueError(
                f"gate {entry.get('id', '<unknown>')}: timeout_seconds must be a positive number"
            )
        spec = GateSpec(
            id=entry["id"],
            command=entry["command"],
            description=entry.get("description", ""),
            severity=Severity.from_str(entry.get("severity", "critical")),
            required_env=entry.get("required_env"),
            conditional_on=entry.get("conditional_on"),
            blocking=entry.get("blocking", True),
            pass_exit_codes=tuple(entry.get("pass_exit_codes", [0])),
            timeout_seconds=float(timeout_seconds),
            expect_origin_host=entry.get("expect_origin_host"),
        )
        specs.append(spec)
    return specs


def _text(value: str | bytes | None) -> str:
    if isinstance(value, bytes):
        return value.decode("utf-8", errors="replace")
    return value or ""


def _run_command(command: str, cwd: str | Path, timeout_seconds: float) -> tuple[int, str]:
    proc = subprocess.Popen(
        command,
        shell=True,
        cwd=str(cwd),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        start_new_session=True,
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


def run_gate(spec: GateSpec, cwd: str | Path) -> GateResult:
    code, out = _run_command(spec.command, cwd, spec.timeout_seconds)
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

        results[spec.id] = run_gate(spec, cwd)

    return results


def any_failed(results: dict[str, GateResult]) -> bool:
    # Skipped required gates are failures at the command boundary. Optional
    # gates are not modeled; every declared gate is blocking.
    return any(r.passed is False for r in results.values())
