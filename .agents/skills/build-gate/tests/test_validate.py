"""Fail-closed validator tests — the 6 pressure scenarios as deterministic units."""
import unittest
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.types import FreezeManifest, ReviewRecord  # noqa: E402
from build_gate.validate import validate_record  # noqa: E402


SHA = "a" * 40
SHA2 = "b" * 40


def base_freeze(**overrides):
    d = dict(
        profile="madventures-tui", target_ref=SHA, target_ref_short=SHA[:7],
        origin_url="git@github.com:MADVenturesLLC/madventures-tui.git",
        origin_host="github.com", origin_identity="MADVenturesLLC/madventures-tui",
        actor="hermes", model="hy3", provider="nous", session_id="S1",
        surface="cv5", frozen_at="2026-08-20T00:00:00+00:00",
        gates=["MTUI-TYPECHECK", "MTUI-TEST"], profile_sha256="deadbeef",
    )
    d.update(overrides)
    return FreezeManifest(**d)


def base_record(**overrides):
    d = dict(
        profile="madventures-tui", target_ref=SHA, target_ref_short=SHA[:7],
        origin_url="git@github.com:MADVenturesLLC/madventures-tui.git",
        origin_host="github.com", origin_identity="MADVenturesLLC/madventures-tui",
        actor="hermes", model="hy3", provider="nous", session_id="S1",
        surface="cv5",
        gate_results={
            "MTUI-TYPECHECK": {"passed": True, "evidence": "ok", "exit_code": 0},
            "MTUI-TEST": {"passed": True, "evidence": "38 pass", "exit_code": 0},
        },
        findings={}, resolved_findings={}, verdict="approved",
        approved_by="founder", self_approved=False,
        reviewed_at="2026-08-20T15:03:01Z",
    )
    d.update(overrides)
    return ReviewRecord(**d)


class TestValidator(unittest.TestCase):
    def test_clean_pass_is_valid(self):
        r = validate_record(base_record(), base_freeze())
        self.assertTrue(r.valid, r.errors)

    def test_drift_injection_invalid(self):
        r = validate_record(base_record(target_ref=SHA2), base_freeze())
        self.assertFalse(r.valid)
        self.assertTrue(any("drift" in e for e in r.errors))

    def test_self_approval_invalid(self):
        r = validate_record(
            base_record(approved_by="hermes", self_approved=True), base_freeze()
        )
        self.assertFalse(r.valid)
        self.assertTrue(any("self-approval" in e for e in r.errors))

    def test_unresolved_critical_invalid(self):
        rec = base_record(
            gate_results={"MTUI-TYPECHECK": {"passed": False, "evidence": "tsc err", "exit_code": 2},
                          "MTUI-TEST": {"passed": True, "evidence": "ok", "exit_code": 0}},
            findings={"MTUI-TYPECHECK": {"severity": "critical", "blocking": True}},
        )
        r = validate_record(rec, base_freeze())
        self.assertFalse(r.valid)
        self.assertTrue(any("unresolved" in e for e in r.errors))

    def test_origin_mismatch_invalid(self):
        rec = base_record(origin_host="gitlab.com",
                          origin_identity="Other/repo")
        r = validate_record(rec, base_freeze())
        self.assertFalse(r.valid)
        self.assertTrue(any("origin" in e for e in r.errors))

    def test_skipped_gate_plus_approval_invalid(self):
        # A required gate from the freeze is absent from the record.
        rec = base_record(
            gate_results={"MTUI-TYPECHECK": {"passed": True, "evidence": "ok", "exit_code": 0}}
        )
        r = validate_record(rec, base_freeze())
        self.assertFalse(r.valid)
        self.assertTrue(any("missing gate result" in e for e in r.errors))

    def test_resolved_finding_is_valid(self):
        rec = base_record(
            gate_results={"MTUI-TYPECHECK": {"passed": False, "evidence": "tsc err", "exit_code": 2},
                          "MTUI-TEST": {"passed": True, "evidence": "ok", "exit_code": 0}},
            findings={"MTUI-TYPECHECK": {"severity": "major", "blocking": True}},
            resolved_findings={"MTUI-TYPECHECK": "Founder waived: type error is pre-existing lint noise."},
        )
        r = validate_record(rec, base_freeze())
        self.assertTrue(r.valid, r.errors)


if __name__ == "__main__":
    unittest.main()
