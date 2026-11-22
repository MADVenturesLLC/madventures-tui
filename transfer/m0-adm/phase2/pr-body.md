## Admission

Admit madv-surface 0.1.2 as its sole supported version. The identity probe appends --no-tools, --max-turns and 1 to the eleven launch flags. A governed launch retains those eleven flags. The probe requires an empty tools array in its first system/init. Every response requires a nonempty string response_id after the existing model, refusal and family checks. The parser refuses any model ID containing claude or anthropic, case-insensitively, before testing its family.

B4 coverage checks the registry and launch flags, probe and launch parsing, refusal precedence, the exact allowlist, both probes’ 1,000 ms cleanup and 500 ms grace periods, and fixture manifests on disk. The recorded 0.1.2 tests use both hosts’ auth and identity streams, including the retired-model resolution.

Addendum 1 B1 (SHA-256 b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa) authorizes the five recorded.test.ts cases that reject listed tools in the probe and accept the same stream in a governed launch at 0.1.1. Addendum 2 B1 (SHA-256 5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81) authorizes the updated registry digest at line 24 of test/phase3a/harness-separation.test.ts. The allowed iterator call is unchanged.

## Investigation

Both stored madv-surface records pass identity, auth and overall, with independent-reviewer eligibility. DEC-20261121-02 B11 reserves the ruling on DEC-20261108-04 B4 item 3 for the act that records the merge.

Investigation packet: docs/verification/phase-3b-m0-admission-investigation.md · SHA-256 3e8b7547fafd5e83acc84166f61cff12115f829c9dfd5bbf1b5c5effc7bfc563

Build log: docs/verification/phase-3b-m0-admission-build-log.md · SHA-256 e8a76754c360dd99c597e1594cdbf926850e264c5d502ea564bf2515e53c7933

## Builder verification

Tested head 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd. The frozen install preserved the base lockfile. TypeScript exited 0 with no diagnostics. All 2,048 tests passed across 151 files. Both phases together added 21 tests in four additional files. The per-test comparison includes the five authorized recorded-case renames.

logs/577-phase2-gate-install.log · SHA-256 03ad6c827e0ecff91b42eab8eebcd865d4ea73092ea5007468fe8c3872475c82
bun install --frozen-lockfile
14:03  up 1 day,  5:31, 3 users, load averages: 2.20 1.89 1.87
exit=0
````text
bun install v1.4.2 (744846f84)

Checked 87 installs across 131 packages (no changes) [14.00ms]
````

logs/582-phase2-gate-typecheck.log · SHA-256 6607341ddddb9577b6591ea60b961aad9e358058278efab757143e83c9cda0f1
bunx tsc --noEmit
14:10  up 1 day,  5:38, 3 users, load averages: 1.69 1.75 1.80
exit=0
````text

````

logs/585-phase2-gate-suite.log · SHA-256 f1870033eaa64f08beb1408a8557c4b6dc37ffadcaef795fa77348a82d756880
bun test
14:30  up 1 day,  5:58, 3 users, load averages: 1.96 1.83 1.78
exit=0
````text
 2048 pass
 0 fail
 27582 expect() calls
Ran 2048 tests across 151 files. [184.10s]
````

Gate logs and SHA-256 values

logs/575-phase2-gate-runtime.log · SHA-256 3d93989b3a92a49bc200012ad7bc9f09e0476f9294d2bb86eaf2a1cd3e34acd1
logs/576-phase2-lock-before.log · SHA-256 5c4f5d424b91e07eaccdb7a3111595a5d44715266a9c38f3a3a0bbb7b3dfe3c7
logs/577-phase2-gate-install.log · SHA-256 03ad6c827e0ecff91b42eab8eebcd865d4ea73092ea5007468fe8c3872475c82
logs/578-phase2-lock-after.log · SHA-256 f632ed55503433ee5492413a1ff4f91ae611dede83a217ecc873a11d40cbc9ee
logs/581-phase2-install-clean.log · SHA-256 4fa0bacecea54d1ed3086da1444e948e1f8fb692c255b733d6173c9eb5e83b18
logs/582-phase2-gate-typecheck.log · SHA-256 6607341ddddb9577b6591ea60b961aad9e358058278efab757143e83c9cda0f1
logs/583-phase2-gate-suite-runtime.log · SHA-256 18cd0b0b979d874e1baacd011d5e1e69805781911ad89ef3ef8961723cfe1507
logs/584-phase2-gate-suite-wait.log · SHA-256 c8b70bb63617839b13bb24b1788f6780ee12f381e064f96436e6009f758c9961
logs/590-phase2-head-list.log · SHA-256 6bac2ce18d4fabf564bbc3f8970bad4244110a3b9f71fcfdcfdfc3ace62201ad
logs/591-phase2-comparison.log · SHA-256 316e2037feb22267cc033b5841495f6388ecf3b61925c9adaa68920edea29a53
logs/592-phase2-diff-check.log · SHA-256 a8c1c42bb1175b99ae9dcc81846df233e61ec5e5ec8c30e1a6c6e1faf6219b69
logs/593-phase2-all-paths.log · SHA-256 80557a785d0bc144f640064a4de0322cb2b8556d0dbb601c414c4bb1b887c342
logs/594-phase2-phase-paths.log · SHA-256 f58a8b440c736318cf8a7c732ba2766c82f8e328a6f459cb3fa1005121ecee1d
logs/595-phase2-folder-diff.log · SHA-256 d2c30377074b40768d36a307ce69cfd4a7a4dcb14e5d9b507a2e007a199a44d3
logs/596-phase2-protected.log · SHA-256 75a103392dcd544f64d119cf3fe526d9ca63f5c40103d7052ba6b4c03723927c
logs/597-phase2-status-final.log · SHA-256 3e6b696710e5fd7d0842b0fe489c67d5e2826b4955be90b2576ffd70414ac5ab
logs/598-phase2-untracked.log · SHA-256 a361966ec4f8546e8ea9995da9d1789a15bfafda3190d4fe4c4734023c57738a
logs/599-phase2-scope-final.log · SHA-256 e0d6410cd9cd63cab7a3917d8035e747b70ef8f4a49ec4629ee213883d6c3a70

The Founder’s B10 runs on both certification hosts and the independent review remain pending.
