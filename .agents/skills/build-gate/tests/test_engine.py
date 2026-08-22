"""Tests for the gate execution engine (required_env skip + conditional_on)."""
import shlex
import sys
import time
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.engine import any_failed, discover_gates, run_all_gates  # noqa: E402


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

    def test_required_env_skip_fails_command_decision(self):
        profile = self._profile()
        results = run_all_gates(profile, ".", env={})
        self.assertTrue(results["G1"].skipped)
        self.assertTrue(any_failed(results))

    def test_timeout_is_a_failed_gate(self):
        started = time.monotonic()
        profile = self._profile(
            gates=[
                {
                    "id": "SLOW",
                    "command": (
                        f"{shlex.quote(sys.executable)} -c 'import time; time.sleep(1)' & wait"
                    ),
                    "timeout_seconds": 0.01,
                }
            ]
        )

        result = run_all_gates(profile, ".")["SLOW"]

        self.assertFalse(result.passed)
        self.assertEqual(result.exit_code, -1)
        self.assertIn("timed out", result.evidence)
        self.assertLess(time.monotonic() - started, 0.5)

    def test_command_receives_supplied_environment(self):
        profile = self._profile(
            gates=[
                {
                    "id": "ENV",
                    "command": (
                        f"{shlex.quote(sys.executable)} -c "
                        "'import os, sys; sys.exit(os.getenv(\"GATE_ENV\") != \"set\")'"
                    ),
                }
            ]
        )

        result = run_all_gates(profile, ".", env={"GATE_ENV": "set"})["ENV"]

        self.assertTrue(result.passed, result.evidence)

    def test_nonzero_success_exit_codes_are_rejected(self):
        profile = self._profile(
            gates=[{"id": "CUSTOM", "command": "false", "pass_exit_codes": [1]}]
        )

        with self.assertRaisesRegex(ValueError, "pass_exit_codes"):
            discover_gates(profile)

    def test_gate_id_and_command_must_be_non_empty_strings(self):
        for gate in (
            {"id": "", "command": "true"},
            {"id": "BAD", "command": None},
        ):
            with self.subTest(gate=gate):
                with self.assertRaisesRegex(ValueError, "non-empty string"):
                    discover_gates(self._profile(gates=[gate]))

    def test_duplicate_gate_ids_are_rejected(self):
        profile = self._profile(
            gates=[
                {"id": "DUP", "command": "false"},
                {"id": "DUP", "command": "true"},
            ]
        )

        with self.assertRaisesRegex(ValueError, "duplicate gate id"):
            discover_gates(profile)


if __name__ == "__main__":
    unittest.main()
