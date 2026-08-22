"""Shared data types for the build-gate skill.

Pure dataclasses + enums. No I/O, no third-party deps.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Optional


class Severity(str, Enum):
    CRITICAL = "critical"
    MAJOR = "major"
    MINOR = "minor"

    @classmethod
    def from_str(cls, value: str) -> "Severity":
        try:
            return cls(value.lower())
        except ValueError:
            # Unknown severity strings are never silently downgraded.
            raise ValueError(f"unknown severity: {value!r}") from None


class Verdict(str, Enum):
    APPROVED = "approved"
    REJECTED = "rejected"
    NEEDS_CHANGES = "needs_changes"


@dataclass
class GateSpec:
    """A single gate declaration from a profile."""

    id: str
    command: str
    description: str = ""
    severity: Severity = Severity.CRITICAL
    required_env: Optional[list[str]] = None
    conditional_on: Optional[str] = None
    blocking: bool = True
    pass_exit_codes: tuple[int, ...] = (0,)
    timeout_seconds: float = 600.0
    # For SSH/HTTPS origin identity checks the gate may assert a host.
    expect_origin_host: Optional[str] = None


@dataclass
class GateResult:
    gate_id: str
    passed: bool
    evidence: str
    exit_code: int
    skipped: bool = False
    skip_reason: Optional[str] = None


@dataclass
class FreezeManifest:
    """Locked target identity produced by freeze_target."""

    profile: str
    target_ref: str  # full 40-char SHA
    target_ref_short: str  # 7-char
    origin_url: str
    origin_host: str
    origin_identity: str  # normalized "owner/repo"
    actor: str
    model: str
    provider: str
    session_id: str
    surface: str
    frozen_at: str  # ISO-8601
    gates: list[str]
    profile_sha256: str

    def to_dict(self) -> dict:
        return {
            "profile": self.profile,
            "target_ref": self.target_ref,
            "target_ref_short": self.target_ref_short,
            "origin_url": self.origin_url,
            "origin_host": self.origin_host,
            "origin_identity": self.origin_identity,
            "actor": self.actor,
            "model": self.model,
            "provider": self.provider,
            "session_id": self.session_id,
            "surface": self.surface,
            "frozen_at": self.frozen_at,
            "gates": self.gates,
            "profile_sha256": self.profile_sha256,
        }

    @classmethod
    def from_dict(cls, d: dict) -> "FreezeManifest":
        return cls(
            profile=d["profile"],
            target_ref=d["target_ref"],
            target_ref_short=d["target_ref_short"],
            origin_url=d["origin_url"],
            origin_host=d["origin_host"],
            origin_identity=d["origin_identity"],
            actor=d["actor"],
            model=d["model"],
            provider=d["provider"],
            session_id=d["session_id"],
            surface=d["surface"],
            frozen_at=d["frozen_at"],
            gates=list(d["gates"]),
            profile_sha256=d["profile_sha256"],
        )


@dataclass
class ReviewRecord:
    """A candidate review record (may be a draft before human approval)."""

    profile: str
    target_ref: str
    target_ref_short: str
    origin_url: str
    origin_host: str
    origin_identity: str
    actor: str
    model: str
    provider: str
    session_id: str
    surface: str
    gate_results: dict  # gate_id -> {"passed": bool, "evidence": str, "exit_code": int}
    findings: dict  # gate_id -> {"severity": str, "blocking": bool}
    resolved_findings: dict  # gate_id -> resolution text
    verdict: str
    approved_by: str
    self_approved: bool
    reviewed_at: str
    profile_sha256: str = ""

    def to_dict(self) -> dict:
        return {
            "profile": self.profile,
            "target_ref": self.target_ref,
            "target_ref_short": self.target_ref_short,
            "origin_url": self.origin_url,
            "origin_host": self.origin_host,
            "origin_identity": self.origin_identity,
            "actor": self.actor,
            "model": self.model,
            "provider": self.provider,
            "session_id": self.session_id,
            "surface": self.surface,
            "gate_results": self.gate_results,
            "findings": self.findings,
            "resolved_findings": self.resolved_findings,
            "verdict": self.verdict,
            "approved_by": self.approved_by,
            "self_approved": self.self_approved,
            "reviewed_at": self.reviewed_at,
            "profile_sha256": self.profile_sha256,
        }

    @classmethod
    def from_dict(cls, d: dict) -> "ReviewRecord":
        return cls(
            profile=d["profile"],
            target_ref=d["target_ref"],
            target_ref_short=d["target_ref_short"],
            origin_url=d["origin_url"],
            origin_host=d["origin_host"],
            origin_identity=d.get("origin_identity", ""),
            actor=d["actor"],
            model=d["model"],
            provider=d["provider"],
            session_id=d["session_id"],
            surface=d["surface"],
            gate_results=d["gate_results"],
            findings=d["findings"],
            resolved_findings=d.get("resolved_findings", {}),
            verdict=d["verdict"],
            approved_by=d["approved_by"],
            self_approved=bool(d["self_approved"]),
            reviewed_at=d["reviewed_at"],
            profile_sha256=d.get("profile_sha256", ""),
        )


@dataclass
class ValidationResult:
    valid: bool
    errors: list[str] = field(default_factory=list)

    def add(self, error: str) -> None:
        self.errors.append(error)
        self.valid = False
