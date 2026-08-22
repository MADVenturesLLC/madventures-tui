"""Integration test for freeze_target in a real temporary git repo."""
import json
import subprocess
import tempfile
import unittest
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPTS = HERE.parent / "scripts"
sys.path.insert(0, str(HERE.parent / "scripts"))

from build_gate.freeze import (  # noqa: E402
    freeze_target,
    materialize_frozen_worktree,
    remove_frozen_worktree,
)


def _git(cwd: Path, args: list[str]):
    subprocess.run(["git", *args], cwd=str(cwd), check=True,
                   capture_output=True, text=True)


class TestFreezeTarget(unittest.TestCase):
    def test_freeze_in_real_repo(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            _git(
                repo,
                [
                    "remote",
                    "add",
                    "origin",
                    "https://x-access-token:example-token@github.com/MADVenturesLLC/madventures-tui.git?access_token=example-token#example-fragment",
                ],
            )
            (repo / "f.txt").write_text("x")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])

            profile = {"profile": "madventures-tui",
                       "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                       "gates": []}
            pf = repo / "profile.json"
            pf.write_text(json.dumps(profile))

            m = freeze_target(pf, repo, actor="hermes", model="hy3",
                              provider="nous", session_id="S1", surface="cv5")
            self.assertEqual(len(m.target_ref), 40)
            self.assertEqual(m.origin_identity, "madventuresllc/madventures-tui")
            self.assertEqual(
                m.origin_url,
                "https://github.com/MADVenturesLLC/madventures-tui.git",
            )
            self.assertNotIn("example-token", m.origin_url)
            self.assertNotIn("example-fragment", m.origin_url)
            self.assertEqual(m.profile_sha256,
                             __import__("hashlib").sha256(pf.read_bytes()).hexdigest())

    def test_origin_mismatch_raises(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            _git(repo, ["remote", "add", "origin", "git@github.com:SomeoneElse/other.git"])
            (repo / "f.txt").write_text("x")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])
            profile = {"profile": "madventures-tui",
                       "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                       "gates": []}
            pf = repo / "profile.json"
            pf.write_text(json.dumps(profile))
            with self.assertRaises(RuntimeError):
                freeze_target(pf, repo, actor="a", model="m", provider="p",
                              session_id="S", surface="s")

    def test_ssh_uri_origin_is_accepted(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            _git(
                repo,
                ["remote", "add", "origin", "ssh://git@github.com/MADVenturesLLC/madventures-tui.git"],
            )
            (repo / "f.txt").write_text("x")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])
            profile = {
                "profile": "madventures-tui",
                "target": {"origin_identity": "MADVenturesLLC/madventures-tui"},
                "gates": [],
            }
            pf = repo / "profile.json"
            pf.write_text(json.dumps(profile))
            m = freeze_target(
                pf, repo, actor="hermes", model="hy3",
                provider="nous", session_id="S1", surface="cv5",
            )
            self.assertEqual(m.origin_host, "github.com")
            self.assertEqual(m.origin_identity, "madventuresllc/madventures-tui")

    def test_freeze_cli_malformed_profile_emits_structured_failure(self):
        with tempfile.TemporaryDirectory() as d:
            directory = Path(d)
            profile = directory / "profile.json"
            profile.write_text("{not-json\n", encoding="utf-8")
            proc = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPTS / "freeze_target.py"),
                    "--profile",
                    str(profile),
                    "--cwd",
                    str(directory),
                    "--actor",
                    "tester",
                    "--model",
                    "model",
                    "--provider",
                    "provider",
                    "--session-id",
                    "session",
                    "--surface",
                    "test",
                ],
                capture_output=True,
                text=True,
                check=False,
            )

            self.assertEqual(proc.returncode, 1, proc.stdout + proc.stderr)
            payload = json.loads(proc.stdout)
            self.assertFalse(payload["valid"], payload)
            self.assertTrue(payload["errors"], payload)

    def test_materialized_worktree_ignores_later_operator_mutation(self):
        with tempfile.TemporaryDirectory() as d:
            repo = Path(d)
            _git(repo, ["init", "-q"])
            _git(repo, ["config", "user.email", "t@t.t"])
            _git(repo, ["config", "user.name", "t"])
            _git(repo, ["config", "commit.gpgsign", "false"])
            (repo / "f.txt").write_text("original\n", encoding="utf-8")
            _git(repo, ["add", "f.txt"])
            _git(repo, ["commit", "-q", "-m", "init"])
            sha = subprocess.run(
                ["git", "rev-parse", "HEAD"],
                cwd=str(repo),
                capture_output=True,
                text=True,
                check=True,
            ).stdout.strip()

            worktree = materialize_frozen_worktree(repo, sha)
            try:
                (repo / "f.txt").write_text("mutated\n", encoding="utf-8")
                self.assertEqual(
                    (worktree / "f.txt").read_text(encoding="utf-8"),
                    "original\n",
                )
                self.assertEqual(
                    subprocess.run(
                        ["git", "rev-parse", "HEAD"],
                        cwd=str(worktree),
                        capture_output=True,
                        text=True,
                        check=True,
                    ).stdout.strip(),
                    sha,
                )
            finally:
                remove_frozen_worktree(repo, worktree)
            self.assertFalse(worktree.exists())


if __name__ == "__main__":
    unittest.main()
