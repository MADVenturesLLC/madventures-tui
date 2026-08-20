"""Tests for the gate execution engine (required_env skip + conditional_on)."""
import unittest
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.engine import discover_gates, run_all_gates  # noqa: E402


class TestEngine(unittest.TestCase):
    def _profile(self, **overrides):
        base = {
            "profile": "t",
            "gates": [
                {"id": "G1", "command": "true", "required_env": ["REQUIRED_VAR"]},
                {"id": "G2", "command": "true", "conditional_on": "G1"},
                {"id": "G3", "command": "false"},
            ],
        }
        base.update(overrides)
        return base

    def test_required_env_skip(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={})
        self.assertTrue(results["G1"].skipped)
        self.assertIn("REQUIRED_VAR", results["G1"].skip_reason)

    def test_required_env_present_runs(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={"REQUIRED_VAR": "1"})
        self.assertFalse(results["G1"].skipped)
        self.assertTrue(results["G1"].passed)

    def test_conditional_on_skipped_when_dep_missing(self):
        # Without REQUIRED_VAR, G1 is skipped -> G2 conditional not satisfied.
        profile = self._profile()
        results = run_all_gates(profile, ".", env={})
        self.assertTrue(results["G2"].skipped)

    def test_conditional_on_runs_when_dep_passes(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={"REQUIRED_VAR": "1"})
        self.assertFalse(results["G2"].skipped)
        self.assertTrue(results["G2"].passed)

    def test_failing_gate_reported(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={"REQUIRED_VAR": "1"})
        self.assertFalse(results["G3"].passed)
        self.assertEqual(results["G3"].exit_code, 1)


if __name__ == "__main__":
    unittest.main()
