"""CLI tests for frozen-target gate execution."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPTS = HERE.parent / "scripts"
sys.path.insert(0, str(SCRIPTS))

from build_gate.freeze import freeze_target  # noqa: E402


def _git(cwd: Path, args: list[str]) -> None:
    subprocess.run(
        ["git", *args], cwd=str(cwd), check=True, capture_output=True, text=True
    )


class TestRunGatesCli(unittest.TestCase):
    def _make_repo(self, directory: Path) -> tuple[Path, Path, Path]:
        repo = directory / "repo"
        repo.mkdir()
        _git(repo, ["init", "-q"])
        _git(repo, ["config", "user.email", "test@example.invalid"])
        _git(repo, ["config", "user.name", "Test"])
        _git(repo, ["config", "commit.gpgsign", "false"])
        _git(
            repo,
            [
                "remote",
                "add",
                "origin",
                "git@github.com:MADVenturesLLC/madventures-tui.git",
            ],
        )
        (repo / "tracked.txt").write_text("tracked\n", encoding="utf-8")
        _git(repo, ["add", "tracked.txt"])
        _git(repo, ["commit", "-q", "-m", "initial"])

        profile = directory / "profile.json"
        profile.write_text(
            json.dumps(
                {
                    "profile": "test-profile",
                    "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                    "gates": [{"id": "PASS", "command": "true", "timeout_seconds": 1}],
                }
            )
            + "\n",
            encoding="utf-8",
        )
        freeze = directory / "freeze.json"
        freeze_target(
            profile,
            repo,
            actor="tester",
            model="test-model",
            provider="test-provider",
            session_id="session",
            surface="test",
            out_path=freeze,
        )
        return repo, profile, freeze

    def _run(self, repo: Path, profile: Path, freeze: Path) -> subprocess.CompletedProcess:
        return subprocess.run(
            [
                sys.executable,
                str(SCRIPTS / "run_gates.py"),
                "--profile",
                str(profile),
                "--freeze",
                str(freeze),
                "--cwd",
                str(repo),
            ],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_runs_only_against_the_frozen_target(self):
        with tempfile.TemporaryDirectory() as d:
            repo, profile, freeze = self._make_repo(Path(d))

            clean = self._run(repo, profile, freeze)
            self.assertEqual(clean.returncode, 0, clean.stdout + clean.stderr)
            self.assertTrue(json.loads(clean.stdout)["PASS"]["passed"])

            _git(repo, ["commit", "--allow-empty", "-q", "-m", "drift"])
            drifted = self._run(repo, profile, freeze)
            self.assertEqual(drifted.returncode, 1, drifted.stdout + drifted.stderr)
            payload = json.loads(drifted.stdout)
            self.assertFalse(payload["valid"], payload)
            self.assertTrue(any("target_ref" in error for error in payload["errors"]), payload)

    def test_bad_gate_definition_emits_structured_failure(self):
        with tempfile.TemporaryDirectory() as d:
            repo, profile, freeze = self._make_repo(Path(d))
            profile.write_text(
                json.dumps(
                    {
                        "profile": "test-profile",
                        "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                        "gates": [{"id": "BAD", "command": None}],
                    }
                )
                + "\n",
                encoding="utf-8",
            )
            freeze_target(
                profile,
                repo,
                actor="tester",
                model="test-model",
                provider="test-provider",
                session_id="session",
                surface="test",
                out_path=freeze,
            )

            proc = self._run(repo, profile, freeze)

            self.assertEqual(proc.returncode, 1, proc.stdout + proc.stderr)
            payload = json.loads(proc.stdout)
            self.assertFalse(payload["valid"], payload)
            self.assertTrue(
                any("gate execution failed" in error for error in payload["errors"]),
                payload,
            )

    def test_invalid_origin_emits_structured_failure(self):
        with tempfile.TemporaryDirectory() as d:
            repo, profile, freeze = self._make_repo(Path(d))
            _git(repo, ["remote", "set-url", "origin", "github.com"])

            proc = self._run(repo, profile, freeze)

            self.assertEqual(proc.returncode, 1, proc.stdout + proc.stderr)
            payload = json.loads(proc.stdout)
            self.assertFalse(payload["valid"], payload)
            self.assertTrue(
                any("unable to verify frozen execution context" in error for error in payload["errors"]),
                payload,
            )

    def test_gates_run_against_frozen_worktree_not_operator_cwd(self):
        with tempfile.TemporaryDirectory() as d:
            directory = Path(d)
            repo, profile, freeze = self._make_repo(directory)
            mutate = repo / "tracked.txt"
            profile.write_text(
                json.dumps(
                    {
                        "profile": "test-profile",
                        "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                        "gates": [
                            {
                                "id": "PASS",
                                "command": (
                                    f"sh -c 'echo mutated > {mutate}; "
                                    "test \"$(cat tracked.txt)\" = tracked'"
                                ),
                                "timeout_seconds": 1,
                            }
                        ],
                    }
                )
                + "\n",
                encoding="utf-8",
            )
            freeze_target(
                profile,
                repo,
                actor="tester",
                model="test-model",
                provider="test-provider",
                session_id="session",
                surface="test",
                out_path=freeze,
            )

            proc = self._run(repo, profile, freeze)

            self.assertEqual(proc.returncode, 0, proc.stdout + proc.stderr)
            self.assertTrue(json.loads(proc.stdout)["PASS"]["passed"])
            self.assertEqual(mutate.read_text(encoding="utf-8"), "mutated\n")
            leftover = subprocess.run(
                ["git", "worktree", "list", "--porcelain"],
                cwd=str(repo),
                capture_output=True,
                text=True,
                check=True,
            )
            self.assertNotIn("build-gate-", leftover.stdout)

    def test_gate_imports_use_frozen_skill_not_operator_path(self):
        with tempfile.TemporaryDirectory() as d:
            directory = Path(d)
            repo, profile, freeze = self._make_repo(directory)
            scripts = repo / ".agents" / "skills" / "build-gate" / "scripts" / "build_gate"
            scripts.mkdir(parents=True)
            (scripts / "__init__.py").write_text(
                'MARKER = "frozen-skill"\n', encoding="utf-8"
            )
            _git(repo, ["add", ".agents"])
            _git(repo, ["commit", "-q", "-m", "frozen skill"])
            mutate = repo / ".agents" / "skills" / "build-gate" / "scripts" / "build_gate" / "__init__.py"
            profile.write_text(
                json.dumps(
                    {
                        "profile": "test-profile",
                        "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                        "gates": [
                            {
                                "id": "PASS",
                                "command": (
                                    "python3 -c "
                                    f"\"from pathlib import Path; "
                                    f"Path(r'{mutate}').write_text('MARKER = \\\"operator-skill\\\"\\n'); "
                                    "import build_gate,sys; "
                                    "sys.stdout.write(build_gate.MARKER)\""
                                ),
                                "timeout_seconds": 2,
                            }
                        ],
                    }
                )
                + "\n",
                encoding="utf-8",
            )
            freeze_target(
                profile,
                repo,
                actor="tester",
                model="test-model",
                provider="test-provider",
                session_id="session",
                surface="test",
                out_path=freeze,
            )

            proc = self._run(repo, profile, freeze)

            self.assertEqual(proc.returncode, 0, proc.stdout + proc.stderr)
            result = json.loads(proc.stdout)["PASS"]
            self.assertTrue(result["passed"], result)
            self.assertIn("frozen-skill", result["evidence"])
            self.assertNotIn("operator-skill", result["evidence"])
            self.assertIn("operator-skill", mutate.read_text(encoding="utf-8"))

    def test_invalid_target_ref_fails_closed(self):
        with tempfile.TemporaryDirectory() as d:
            repo, profile, freeze = self._make_repo(Path(d))
            payload = json.loads(freeze.read_text(encoding="utf-8"))
            payload["target_ref"] = "not-a-sha"
            payload["target_ref_short"] = "not-a-s"
            freeze.write_text(json.dumps(payload) + "\n", encoding="utf-8")

            proc = self._run(repo, profile, freeze)

            self.assertEqual(proc.returncode, 1, proc.stdout + proc.stderr)
            body = json.loads(proc.stdout)
            self.assertFalse(body["valid"], body)
            self.assertTrue(body["errors"], body)


if __name__ == "__main__":
    unittest.main()
