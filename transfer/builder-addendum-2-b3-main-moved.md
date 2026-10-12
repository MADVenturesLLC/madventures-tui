ADDENDUM 2 to the root-cause build prompt (SHA-256 73968656437cd8698affd3728b4ff3702577566e928f1501d27e31e5f32ef1a4). The Founder sends this as the third message of this session, after Addendum 1. It changes precondition 1 only. Every other rule, scope limit, stop condition and report item of the prompt, of Addendum 1 and of DEC-20261012-03 stands.

WHY
After the prompt was signed, pull request 142 merged on 2026-10-12 as 3f9b414c0ffcaf6955873f757cb55b97b2de77a1, under FOUNDER-ACT-20261012-MACOS-RUNNER-MIGRATION (DEC-20261012-04). It changed .github/workflows/verify.yml, .github/workflows/tui-chaos.yml and CONTRIBUTING.md, and added docs/decisions/DEC-20261012-04-macos-runner-migration.md. Those changes are outside docs/, so precondition 1 as written would stop you. They move the two macOS CI jobs from the macos-14 runner to macos-15 and change no code, test or lockfile.

PRECONDITION 1, AS AMENDED
The clone's origin is MADVenturesLLC/madventures-tui, HEAD is detached at 03dda124e9d6faa59abda6a3817410bcdf1765f8, and the working tree is clean. git fetch origin main. origin/main must be one of:
- 03dda124e9d6faa59abda6a3817410bcdf1765f8;
- 3f9b414c0ffcaf6955873f757cb55b97b2de77a1, provided git diff --name-only 03dda124e9d6faa59abda6a3817410bcdf1765f8 3f9b414c0ffcaf6955873f757cb55b97b2de77a1 lists exactly the four paths above; or
- a descendant of 3f9b414c0ffcaf6955873f757cb55b97b2de77a1 that changed only paths under docs/ since that commit.
Report which case holds and the changed paths. HEAD stays at 03dda124e9d6faa59abda6a3817410bcdf1765f8, and the hashes of precondition 2 are checked there. If you fix, the branch fix/tests-4-6-ubuntu-host still starts from HEAD, and the pull request targets main as the prompt says. Its CI then runs the macOS jobs on macos-15; that is expected.
