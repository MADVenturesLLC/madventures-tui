Admission build of madv-surface 0.1.2 · Phase 2

1. Session and authority

Codex workspace-write; per-command escalation. The Founder reported on-request at launch. A separate approval-policy field was not displayed. The Founder checked the Phase 1 session and reader, investigated B7 on both hosts and obtained two passing B8 records. Starting head 664c5678e516197fa1a14da3487e27821753ff48.

2. Signed prompt bundle

logs/492-phase2-prompt-manifest.log · SHA-256 aecfe56d5ef938b3912e5dbebdce1d9e75662d41d3f6709ed407cc2180ffc06e
shasum -a 256 -c SHA256.txt
10:50  2 users, load averages: 6.79 5.42 3.44
exit=0
builder-prompt-m0-admission-codex-macbook.md: OK
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md: OK
m0-record-r3.ts: OK
resume-m0-admission-1-runtime.md: OK
DEC-20261121-02-addendum-2-registry-digest.md: OK
resume-m0-admission-2-registry-digest.md: OK
resume-m0-admission-3-phase-2.md: OK

logs/493-phase2-prompt-files.log · SHA-256 de4c8cec4c8e16d318c0fda80140ebadd6fd28490df7ecdb998df8004a924f90
ls prompt
10:50  2 users, load averages: 6.79 5.42 3.44
exit=0
DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
DEC-20261121-02-addendum-2-registry-digest.md
SHA256.txt
builder-prompt-m0-admission-codex-macbook.md
m0-record-r3.ts
resume-m0-admission-1-runtime.md
resume-m0-admission-2-registry-digest.md
resume-m0-admission-3-phase-2.md

logs/494-phase2-prompt-pins.log · SHA-256 10e3813f7d8120f149db37e21d9bfedba200a2c42b7499d502c80e5e601fdee2
check_bundle
10:50  2 users, load averages: 5.99 5.31 3.43
exit=0
abf0766764f3587d9dd3de096749c2aa6249fc55cd455c3563e22c4744f300d2  builder-prompt-m0-admission-codex-macbook.md
b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa  DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md
b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593  m0-record-r3.ts
be1771c3d03b5dfa225b808c21591d0bac519d08073cdc80b5d0dbe41ffd41e5  resume-m0-admission-1-runtime.md
5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81  DEC-20261121-02-addendum-2-registry-digest.md
eab2fbf86a415032716dd0cf56f01c9179994756f67f8b8bb8e21612e21534d7  resume-m0-admission-2-registry-digest.md
0e54e70e354dd478ad43f40e47136cab7d6b6a136c990759831fbbc909d2a1a4  resume-m0-admission-3-phase-2.md

3. Phase 1 checkout, archived reports, reader and runtime

logs/495-phase2-governed-version.log · SHA-256 84f6a6db4f5b21bc0841b63f07ba686ffdcd1cbb85cb76ca629f5a0ea63a2cc7
/Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version
10:51  2 users, load averages: 5.67 5.26 3.43
exit=0
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

logs/496-phase2-head.log · SHA-256 03f2f4f2636c28cf223121d13e4c1385b92ab0c89858fdb8fc16186406732fe6
git -C tui rev-parse HEAD
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0
664c5678e516197fa1a14da3487e27821753ff48

logs/497-phase2-branch.log · SHA-256 7d255ec2e177be3855ee76dee81e12f7eae241f5a418697be9d5a1d3f6304bd4
git -C tui branch --show-current
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0
build/3b-m0-admission-r1

logs/498-phase2-status.log · SHA-256 0e4d19f182efa234185f723b290e934655e6ef8257480d4ee66b97fbf9cef45e
git -C tui status --porcelain --untracked-files=all
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/499-phase2-stash.log · SHA-256 84dd64206aa5f2fcc5e4a28e56e69dbc31f490d0270da9b6c60ad3915cd5d8d0
git -C tui stash list
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/500-phase2-report-files.log · SHA-256 4ff14725f7ecb9567811f4ab8bdf43bfe9d02b78ecfcc534781f8579f825e93b
ls -A pr
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0
m0-admission-phase1-halt-1-report.md
m0-admission-phase1-halt-2-report.md
m0-admission-phase1-report.md

logs/501-phase2-report-hashes.log · SHA-256 ab8bbb834a73ae65ec01b11a5572f2788696e79ba6bb0567fa855da286d065c2
shasum -a 256 pr/m0-admission-phase1-halt-1-report.md pr/m0-admission-phase1-halt-2-report.md pr/m0-admission-phase1-report.md
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0
c8e9327cbba2a9cf716bc6661f8ac4279bca7a80322904f71df1b146acb62fe1  pr/m0-admission-phase1-halt-1-report.md
a527426c3fe481189e36e9bcbc5142c130bccfe9abecde1f42c5f6d96a51c6fd  pr/m0-admission-phase1-halt-2-report.md
092bd1f125821d1accc0e7d9fb80b7a7038f2ba1ef7f060ee82a5ae7f598907b  pr/m0-admission-phase1-report.md

logs/502-phase2-record-files.log · SHA-256 c33032031c93cb03be3ff52a0de0313f749c52e9f1c6d80ec343ffa0fbb05eb3
ls -A record
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0
m0-admission-record.ts

logs/503-phase2-reader-hash.log · SHA-256 1a705b14881794ef833a8c92a17f7f3a3f80af4ca7835434a6dd0ab8c5cf5009
shasum -a 256 record/m0-admission-record.ts
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0
c6d927b3b87e3ab10fa56709786fedd1f71ad5449bf2a5a037a137d94aece825  record/m0-admission-record.ts

logs/504-phase2-runtime.log · SHA-256 1329e8bc1ece48dfc3f17768dff06088b63921f982125ab3c89c7fe1e877c91a
runtime_check
13:52  up 1 day,  5:19, 3 users, load averages: 2.38 1.86 1.84
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

4. Evidence custody and integrity

All 123 files passed, with complete index coverage. The records and logs are supplied byte for byte. The clone and install logs remain on the Founder’s hosts.

logs/505-phase2-evidence-manifest.log · SHA-256 59991ad35ff69bd164128d765b61f5d41795e6bea9c17ef43f4f6c4eb238cfeb
shasum -a 256 -c SHA256.txt
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/506-phase2-evidence-hashes.log · SHA-256 75ca9dff221ac6f1051b9fdf4323e6e110f345379eadaf9ff68d07cdbc4cdcb7
shasum -a 256 evidence/SHA256.txt evidence/SANITIZE.txt
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0
c4d1e53cf90f50575fa80ac8f42f64544679466d54e3916f181e9a3ae637ea1f  evidence/SHA256.txt
d8d85fae5d59890b5dd357acdb5061447dd95dadcaebc3ebdf80179b3245a4f9  evidence/SANITIZE.txt

logs/507-phase2-raw-manifests.log · SHA-256 a3e1236ba3ccea6fc5993d6cc1bb893ee5d63c3225a6cb3135e22419d8e97b56
shasum -a 256 evidence/macbook/m0-admission-investigation-macbook/raw-MANIFEST.sha256 evidence/ubuntu/m0-admission-investigation-ubuntu/raw-MANIFEST.sha256
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0
f8d0394f644d9358cc15389ea9194d8e16782594ce3219fe85aab9ff6c4d8a00  evidence/macbook/m0-admission-investigation-macbook/raw-MANIFEST.sha256
47465b43809b15b8a84e934d8279974ab8d544d06b7540c2d4bfe6338e0651f1  evidence/ubuntu/m0-admission-investigation-ubuntu/raw-MANIFEST.sha256

logs/508-phase2-record-pins.log · SHA-256 614510339a25e7d57f0a3f662ebea044186409dc3032bba4a71ec58c12388fe2
shasum -a 256 evidence/records/macbook/madv-surface-record.json evidence/records/macbook/LOGS.sha256 evidence/records/ubuntu/madv-surface-record.json evidence/records/ubuntu/LOGS.sha256
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0
5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea  evidence/records/macbook/madv-surface-record.json
f335b71497d57ae632382878cafaccc9e4293b91a1e761915fd2796b5f41ac78  evidence/records/macbook/LOGS.sha256
4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3  evidence/records/ubuntu/madv-surface-record.json
861a93014ead9c4aeae987d022746cfd82e389d4b1f0ccfb14f1b170082fb389  evidence/records/ubuntu/LOGS.sha256

logs/509-phase2-record-indexes.log · SHA-256 eebea5651d476937f940148ddbfca72e7bbc72fcb392c309e5a7d9d8bd24e6b5
cat evidence/records/macbook/LOGS.sha256 evidence/records/ubuntu/LOGS.sha256
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  clone.log
f24ca2b193b7ce3a570b8a78bb636dba54a08bf181ed176111dc6721b6ab5cde  install.log
8f69e9f3f6a107f9e487c569bea5acf185205aabc9160b8e403bca6864e69dab  madv-surface-dry.log
9e0e702f1ed31a4252beb2ac5282d70eed292075d78d5475787455573b68d6e4  madv-surface-write.log
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  clone.log
f688c6990e21465d2e47cf3f7c89c460073360705a3aaf79425eb6b1939e367e  install.log
9a94ac815f9b6658df488d6fcb16bc1c036fec4a55d4ac48f33512b093483933  madv-surface-dry.log
be9e50dbec9482ae15c8407536843eef481f9140abe5838b1d99732bd8475355  madv-surface-write.log

logs/510-phase2-sanitize.log · SHA-256 018121687d60e34e50f030bb3a8e6da487f48517161f4ddf985fb5c95092a2c6
cat evidence/SANITIZE.txt
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0
Admission build sanitized evidence for Phase 2 (DEC-20261121-02 B5 item 2, B7 and B8; DEC-20261115-02 B11)
Rules, in this order, on every file outside records/: json-account-identifiers, the value of every JSON key that names email, org, account or user, case-insensitively, becomes <redacted:json-account-identifiers>; email-addresses, every email address becomes <redacted:email-addresses>; token-patterns, every string of the forms sk-, ghp_, gho_ and github_pat_ becomes <redacted:token-patterns>; uuid, every UUID-shaped string becomes <redacted:uuid>. A JSON file a rule changes is rewritten one value per line; every other byte stays.
records/ holds the stored records and the dry-run and write-run logs byte for byte; they are cited by SHA-256 and are not rewritten.
raw macbook/m0-admission-investigation-macbook: MANIFEST.sha256 f8d0394f644d9358cc15389ea9194d8e16782594ce3219fe85aab9ff6c4d8a00, copied as raw-MANIFEST.sha256
raw ubuntu/m0-admission-investigation-ubuntu: MANIFEST.sha256 47465b43809b15b8a84e934d8279974ab8d544d06b7540c2d4bfe6338e0651f1, copied as raw-MANIFEST.sha256
records: MacBook 5c0fd4fc850366d2107555a73487c734f912fc333c1590e7ec39c6bc7a3f36ea, logs index f335b71497d57ae632382878cafaccc9e4293b91a1e761915fd2796b5f41ac78; Ubuntu 4482839a8aca025d9e2f545a309fea7ff57971684d5e18f1ebdde4eacf0148a3, logs index 861a93014ead9c4aeae987d022746cfd82e389d4b1f0ccfb14f1b170082fb389
files copied through the rules: 112; files changed by a rule: 8
replacements, by rule: json-account-identifiers 0, email-addresses 0, token-patterns 0, uuid 32
each file a rule changed, with its counts:
  macbook/m0-admission-investigation-macbook/madv-surface/04.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  macbook/m0-admission-investigation-macbook/madv-surface/05.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  macbook/m0-admission-investigation-macbook/madv-surface/06.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  macbook/m0-admission-investigation-macbook/madv-surface/07.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4
  ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stdout json-account-identifiers=0 email-addresses=0 token-patterns=0 uuid=4

logs/511-phase2-evidence-coverage.log · SHA-256 9f036ced109817f16c8143d42eab064da6ffcfe0ed2b0395e826353d0ad64158
python3 -
13:52  3 users, load averages: 2.44 1.92 1.86
exit=0
macbook madv-surface-dry.log 8f69e9f3f6a107f9e487c569bea5acf185205aabc9160b8e403bca6864e69dab OK
macbook madv-surface-write.log 9e0e702f1ed31a4252beb2ac5282d70eed292075d78d5475787455573b68d6e4 OK
ubuntu madv-surface-dry.log 9a94ac815f9b6658df488d6fcb16bc1c036fec4a55d4ac48f33512b093483933 OK
ubuntu madv-surface-write.log be9e50dbec9482ae15c8407536843eef481f9140abe5838b1d99732bd8475355 OK
123 listed files cover the export.

Fixtures and tests

fixture	sha256	evidence_path	json-account-identifiers	email-addresses	token-patterns	uuid
macbook/03.stdout	c5a7e49ce80585fcae2eb4830947a32b66d8f7978262dec40e01828b1478b16d	evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.stdout	0	0	0	0
macbook/03.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.stderr	0	0	0	0
macbook/03.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/macbook/m0-admission-investigation-macbook/madv-surface/03.status	0	0	0	0
macbook/04.stdout	a1bd136b54ac7ad22e6af6f5083672c4f9ce4e979822b31e8a47e712c85b7d61	evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.stdout	0	0	0	4
macbook/04.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.stderr	0	0	0	0
macbook/04.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/macbook/m0-admission-investigation-macbook/madv-surface/04.status	0	0	0	0
macbook/05.stdout	af3af6866bcb2278b66cc8cf5c1ea80e03eb78992697898dc27d6fc04f54b565	evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.stdout	0	0	0	4
macbook/05.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.stderr	0	0	0	0
macbook/05.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/macbook/m0-admission-investigation-macbook/madv-surface/05.status	0	0	0	0
macbook/06.stdout	1328fb55ed00713a4dbc3ff5a1306e6f2d175da32f59e36550a2ba5fa5bf30b5	evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.stdout	0	0	0	4
macbook/06.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.stderr	0	0	0	0
macbook/06.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/macbook/m0-admission-investigation-macbook/madv-surface/06.status	0	0	0	0
macbook/07.stdout	ab06e05401e0949a728002fe037103a2f783e5f34d444e3524f832afcabf1646	evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.stdout	0	0	0	4
macbook/07.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.stderr	0	0	0	0
macbook/07.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/macbook/m0-admission-investigation-macbook/madv-surface/07.status	0	0	0	0
ubuntu/03.stdout	c5a7e49ce80585fcae2eb4830947a32b66d8f7978262dec40e01828b1478b16d	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.stdout	0	0	0	0
ubuntu/03.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.stderr	0	0	0	0
ubuntu/03.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/03.status	0	0	0	0
ubuntu/04.stdout	5724ab7b14b6148b6d68ba75b5e48c75056e2ad1bb11ae63a84524b7ea1d0a9f	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stdout	0	0	0	4
ubuntu/04.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.stderr	0	0	0	0
ubuntu/04.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/04.status	0	0	0	0
ubuntu/05.stdout	e996ff495545895b55033b147aeafd963c5ed46ddad10ef6cbcefe59f6011828	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stdout	0	0	0	4
ubuntu/05.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.stderr	0	0	0	0
ubuntu/05.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/05.status	0	0	0	0
ubuntu/06.stdout	91b2f9be88f1afcd12be37dc17c6d8c58b24c8331404a6f23acb44c343c3b4c7	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stdout	0	0	0	4
ubuntu/06.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.stderr	0	0	0	0
ubuntu/06.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/06.status	0	0	0	0
ubuntu/07.stdout	6fdf51d40651ef9a41718ca018231aba9485e29df012d28d1680758d2549a897	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stdout	0	0	0	4
ubuntu/07.stderr	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.stderr	0	0	0	0
ubuntu/07.status	e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7	evidence/ubuntu/m0-admission-investigation-ubuntu/madv-surface/07.status	0	0	0	0

Manifest SHA-256 c6716bc30c5d0297ecea4c1aefdd43a48ce3a0f0e59c2723e9a52cb31324678c. All 30 copied files are byte-identical to evidence/. Only session_id values were replaced in stdout of 04–07. Capture 03, all status files and all stderr streams have zero replacements.

logs/537-phase2-fixture-compare.log · SHA-256 0aa171c5f0d382595b9c727ec26f5558120d30f008f7740b37d6384e06270c9b
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py fixtures
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0
30 byte-identical fixtures with verified SHA-256 values.

packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 03 passes auth readiness	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 04 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 05 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 06 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 07 returns identity_mismatch (response_predicate) for MiniMax-M3.1-Flash-Preview while reporting MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 07 returns identity_mismatch (init_predicate) for MiniMax-M3.1-Flash while reporting MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 03 passes auth readiness	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 04 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 05 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 06 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 07 returns identity_mismatch (response_predicate) for MiniMax-M3.1-Flash-Preview while reporting MiniMax-M3.1-Flash	pass
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 07 returns identity_mismatch (init_predicate) for MiniMax-M3.1-Flash while reporting MiniMax-M3.1-Flash	pass

packages/adapter-madv-surface/test/fixture-integrity.test.ts	recorded manifest covers every fixture and matches its SHA-256	pass
packages/adapter-madv-surface/test/fixture-integrity.test.ts	recorded-0.1.2 manifest covers every fixture and matches its SHA-256	pass

logs/520-phase2-recorded-runtime.log · SHA-256 7a229e6c2438be93a6a2be2a45a7e07f16ea278f9a681f436fe2b9018007bc64
runtime_check
13:54  up 1 day,  5:21, 3 users, load averages: 2.28 2.00 1.90
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/521-phase2-recorded-wait.log · SHA-256 f0b12d12e52172851473ca3ea2ad6ff462aab0b1ecb8c632266c116930463052
load_wait
13:54  up 1 day,  5:21, 3 users, load averages: 2.28 2.00 1.90
exit=0
13:54  up 1 day,  5:21, 3 users, load averages: 2.28 2.00 1.90
13:54  up 1 day,  5:22, 3 users, load averages: 1.68 1.89 1.86

logs/522-phase2-recorded-tests.log · SHA-256 96ee21c21941c179ab365427c5100fdad39c1a24b9622fde0716ca70105adf67
bun test packages/adapter-madv-surface/test/recorded-0.1.2.test.ts
13:54  up 1 day,  5:22, 3 users, load averages: 1.68 1.89 1.86
exit=0
Full output, including lines with square brackets, is in the named log.
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/recorded-0.1.2.test.ts:
(lines omitted)

 12 pass
 0 fail
 78 expect() calls
(lines omitted)

logs/523-phase2-integrity-runtime.log · SHA-256 a9bf9f53d91697596692e0f0b91f29b8bbb3dd05e12704ca4acf088337810c43
runtime_check
13:55  up 1 day,  5:22, 3 users, load averages: 1.65 1.88 1.86
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/524-phase2-integrity-wait.log · SHA-256 17c7cb393ad9d73fc905f6d4f213c6d5ad730a7be4f37fa56918b65b618a43ec
load_wait
13:55  up 1 day,  5:23, 3 users, load averages: 1.70 1.85 1.84
exit=0
13:55  up 1 day,  5:23, 3 users, load averages: 1.70 1.85 1.84

logs/525-phase2-integrity-tests.log · SHA-256 2073a9cbba189722d3ceddacaf074d6348f128b9a1169fd50bd4573f867f977d
bun test packages/adapter-madv-surface/test/fixture-integrity.test.ts
13:55  up 1 day,  5:23, 3 users, load averages: 1.70 1.85 1.84
exit=0
Full output, including lines with square brackets, is in the named log.
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/fixture-integrity.test.ts:
(lines omitted)

 2 pass
 0 fail
 126 expect() calls
(lines omitted)

logs/526-phase2-precommit-runtime.log · SHA-256 d49d34c3a2c6b0e0d451176f83a1f33695b479044bf8ccbb58819947095659d8
runtime_check
13:55  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/527-phase2-precommit-wait.log · SHA-256 1855e1f03fb51d933f6539558dc759c462ffc24db8ae33578befd73133f7dacc
load_wait
13:56  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84
exit=0
13:56  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84

logs/528-phase2-precommit-tests.log · SHA-256 31888dc2888997b52d1888495117d43047c9f197e9d8b5ba03f3fad6361c80a1
bun test
13:56  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84
exit=0
Full output, including lines with square brackets, is in the named log.
 2048 pass
 0 fail
 27582 expect() calls
(lines omitted)

Deliberate break

logs/547-phase2-break-byte.log · SHA-256 34571dfdc03326a1cc8808f4d3e1ec36dcec5f018c266bf97a2572e37fd90651
python3 - tui/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0
Changed one byte at offset 5 in tui/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status

logs/548-phase2-break-diff.log · SHA-256 fc87609b241d0b814167f79a2fd3071ae35b9e16e570e5c6d905e6627db15e10
git -C tui diff -- packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0
diff --git a/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status b/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
index 9294713..5e7da5a 100644
--- a/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
+++ b/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
@@ -1,3 +1,3 @@
-exit=0
+exit=1
 signal=none
 timed_out=no

logs/549-phase2-break-runtime.log · SHA-256 688d0149a434e4dbe146d858916bd1a6f52d7b50b942b4596547284aa4fb70ea
runtime_check
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/550-phase2-break-wait.log · SHA-256 a334c958d7734bc465e49d77953425950b4183b3d215b020e8be84a27acf0ddc
load_wait
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88
exit=0
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88

logs/551-phase2-break-tests.log · SHA-256 9a24e333244e79558e43a74e1e9f027c53e73b1e0543a56dc76b5da7024d2380
bun test packages/adapter-madv-surface/test/fixture-integrity.test.ts
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88
exit=1
Full output, including lines with square brackets, is in the named log.
bun test v1.4.2 (744846f84)

packages/adapter-madv-surface/test/fixture-integrity.test.ts:
(lines omitted)
29 |     // Comparing the sorted arrays detects duplicates as well as omissions.
30 |     const files = filesUnder(root).filter(file => file !== "manifest.tsv").sort();
31 |     expect(entries.map(entry => entry.file).sort()).toEqual(files);
32 |     for (const { file, digest } of entries) {
33 |       const bytes = readFileSync(join(root, file));
34 |       expect({ file, digest: new Bun.CryptoHasher("sha256").update(bytes).digest("hex") }).toEqual({ file, digest });
                                                                                                ^
error: expect(received).toEqual(expected)

  {
-   "digest": "e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7",
+   "digest": "7eb7518924b7d3191c1000f8475f7f49162aa5e4fd9ebb68c070f2d0dfc443fc",
    "file": "ubuntu/05.status",
  }

- Expected  - 1
+ Received  + 1

      at <anonymous> (/Users/michaeldaley/builds/m0-admission-r1/tui/packages/adapter-madv-surface/test/fixture-integrity.test.ts:34:92)
(lines omitted)

 1 pass
 1 fail
 120 expect() calls
(lines omitted)

logs/553-phase2-break-proof.log · SHA-256 a7b0351b11ce56177e79cd51597aab0a009a2b2c72aa30d8fb03de278dba4278
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:01  3 users, load averages: 1.59 1.87 1.87
exit=0
Manifest e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7
Restored e6b633ea47b72a16622692968c502208028c4fc182799e9b33a1a3afe64714a7 packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
Working tree matches the staged originals.

New folder failed on the altered Ubuntu 05 status. The original folder passed; the restored status SHA-256 matched its manifest.

Phase 2 commits and message checks

logs/574-phase2-commits.log · SHA-256 dceb1413556f02eaec01c4e56fc2fcb228a55a3b5e8e2670cfb6fb5f646420db
git log --reverse --format=%H %P %s 664c5678e516197fa1a14da3487e27821753ff48..HEAD
14:02  3 users, load averages: 1.60 1.81 1.85
exit=0
ce2c2ce81349f7b1360229ff6ab0cd602fa2c7a6 664c5678e516197fa1a14da3487e27821753ff48 test(adapter-madv-surface): test the parsers on 0.1.2 recorded streams
330cbba13c430c526a03cd1be4a993ec9e067a12 ce2c2ce81349f7b1360229ff6ab0cd602fa2c7a6 docs(verification): add the admission investigation packet
68d78a60338d9ff27ffab7b275aa3395e2a1c9bd 330cbba13c430c526a03cd1be4a993ec9e067a12 docs(verification): record Phase 2 of the admission build

logs/534-phase2-check-fixture-message.log · SHA-256 3b31f66251a543c17cae447ca9c8c91db833c5f5dce9f381a540d601ea5c8012
check_message /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-fixtures.msg
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0
maximum line width 70
10:Role-Id: builder
11:Actor-Id: session:codex/3b-m0-admission-r1
12:Execution-Surface: codex

logs/535-phase2-check-packet-message.log · SHA-256 bc543351d81e48057f2c4339517dca957508662d286b0dbadb3a8310c77ee707
check_message /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-packet.msg
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0
maximum line width 65
8:Role-Id: builder
9:Actor-Id: session:codex/3b-m0-admission-r1
10:Execution-Surface: codex

logs/536-phase2-check-log-message.log · SHA-256 a5a4cef17258fa06f0e60fcef4c4d01c2495ad9a226b738a19717125b5d7f18f
check_message /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-log.msg
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0
maximum line width 66
8:Role-Id: builder
9:Actor-Id: session:codex/3b-m0-admission-r1
10:Execution-Surface: codex

B10 gates at 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd

logs/575-phase2-gate-runtime.log · SHA-256 3d93989b3a92a49bc200012ad7bc9f09e0476f9294d2bb86eaf2a1cd3e34acd1
runtime_check
14:03  up 1 day,  5:30, 3 users, load averages: 1.54 1.76 1.82
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/576-phase2-lock-before.log · SHA-256 5c4f5d424b91e07eaccdb7a3111595a5d44715266a9c38f3a3a0bbb7b3dfe3c7
shasum -a 256 tui/bun.lock
14:03  3 users, load averages: 1.54 1.76 1.82
exit=0
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/577-phase2-gate-install.log · SHA-256 03ad6c827e0ecff91b42eab8eebcd865d4ea73092ea5007468fe8c3872475c82
bun install --frozen-lockfile
14:03  up 1 day,  5:31, 3 users, load averages: 2.20 1.89 1.87
exit=0
Full output, including lines with square brackets, is in the named log.
bun install v1.4.2 (744846f84)

(lines omitted)

logs/578-phase2-lock-after.log · SHA-256 f632ed55503433ee5492413a1ff4f91ae611dede83a217ecc873a11d40cbc9ee
shasum -a 256 tui/bun.lock
14:03  3 users, load averages: 2.19 1.89 1.87
exit=0
a4456b4e2133404912b477ccf0196e4cfa41aed132f117d5ef85d4a25ce99830  tui/bun.lock

logs/579-phase2-install-mode.log · SHA-256 cbdee64215ec9de2adaa02487d7c40cbb9f9b97dc5ceb060840be6377ca50819
git -C tui diff --summary
14:03  3 users, load averages: 2.19 1.89 1.87
exit=0
 mode change 100644 => 100755 packages/founder-act/src/main.ts

logs/580-phase2-install-restore.log · SHA-256 011651dd1aa303667d230759c56882df9edef9de616364a1672f9912633986c3
git -C tui checkout -- packages/founder-act/src/main.ts
14:03  3 users, load averages: 2.17 1.89 1.87
exit=0


logs/581-phase2-install-clean.log · SHA-256 4fa0bacecea54d1ed3086da1444e948e1f8fb692c255b733d6173c9eb5e83b18
git -C tui status --porcelain --untracked-files=all
14:03  3 users, load averages: 2.17 1.89 1.87
exit=0


logs/582-phase2-gate-typecheck.log · SHA-256 6607341ddddb9577b6591ea60b961aad9e358058278efab757143e83c9cda0f1
bunx tsc --noEmit
14:10  up 1 day,  5:38, 3 users, load averages: 1.69 1.75 1.80
exit=0


logs/583-phase2-gate-suite-runtime.log · SHA-256 18cd0b0b979d874e1baacd011d5e1e69805781911ad89ef3ef8961723cfe1507
runtime_check
14:25  up 1 day,  5:52, 3 users, load averages: 2.08 1.72 1.75
exit=0
/Users/michaeldaley/.bun/bin/bun
/Users/michaeldaley/.bun/bin/bunx
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5  /Users/michaeldaley/.bun/bin/bun
1.4.2
744846f844374847c902b5e7fd59b4342a51ef99

logs/584-phase2-gate-suite-wait.log · SHA-256 c8b70bb63617839b13bb24b1788f6780ee12f381e064f96436e6009f758c9961
load_wait
14:30  up 1 day,  5:58, 3 users, load averages: 1.96 1.83 1.78
exit=0
14:30  up 1 day,  5:58, 3 users, load averages: 1.96 1.83 1.78

logs/585-phase2-gate-suite.log · SHA-256 f1870033eaa64f08beb1408a8557c4b6dc37ffadcaef795fa77348a82d756880
bun test
14:30  up 1 day,  5:58, 3 users, load averages: 1.96 1.83 1.78
exit=0
Full output, including lines with square brackets, is in the named log.
 2048 pass
 0 fail
 27582 expect() calls
(lines omitted)

logs/591-phase2-comparison.log · SHA-256 316e2037feb22267cc033b5841495f6388ecf3b61925c9adaa68920edea29a53
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:33  3 users, load averages: 2.95 2.33 2.00
exit=0
Verified individual result listing 71 against 057-baseline-suite.log
Verified individual result listing 590 against 585-phase2-gate-suite.log
packages/adapter-madv-surface/test/recorded.test.ts macbook 04 recorded identity passes for MiniMax-M3.1-Flash => macbook 04 recorded tools fail probe identity and pass a governed launch
packages/adapter-madv-surface/test/recorded.test.ts macbook 05 recorded identity passes for MiniMax-M3.1-Flash => macbook 05 recorded tools fail probe identity and pass a governed launch
packages/adapter-madv-surface/test/recorded.test.ts macbook 06 recorded identity passes for MiniMax-M3.1-Flash => macbook 06 recorded tools fail probe identity and pass a governed launch
packages/adapter-madv-surface/test/recorded.test.ts ubuntu 04 recorded identity passes for MiniMax-M3.1-Flash => ubuntu 04 recorded tools fail probe identity and pass a governed launch
packages/adapter-madv-surface/test/recorded.test.ts ubuntu 06 recorded identity passes for MiniMax-M3.1-Flash => ubuntu 06 recorded tools fail probe identity and pass a governed launch
Phase 1	packages/adapter-madv-surface/test/fixture-integrity.test.ts	recorded manifest covers every fixture and matches its SHA-256	pass
Phase 1	packages/adapter-madv-surface/test/parser.test.ts	Claude and Anthropic ids are refused before family resolution	pass
Phase 1	packages/adapter-madv-surface/test/parser.test.ts	identity requires an empty tool array while a governed launch accepts tools	pass
Phase 1	packages/adapter-madv-surface/test/parser.test.ts	probe and launch require a non-empty string response_id on every response	pass
Phase 1	packages/protocol/test/adapter-registry.test.ts	madv-surface 0.1.2 reserves --no-tools for the identity probe	pass
Phase 1	packages/supervisor/test/madv-allowlist.test.ts	madv-surface-v1 selects exactly the B6 variable set	pass
Phase 1	packages/supervisor/test/madv-intervals.test.ts	madv-surface auth keeps 500 ms grace and 1000 ms cleanup	pass
Phase 1	packages/supervisor/test/madv-intervals.test.ts	madv-surface identity keeps 500 ms grace and 1000 ms cleanup	pass
Phase 2	packages/adapter-madv-surface/test/fixture-integrity.test.ts	recorded-0.1.2 manifest covers every fixture and matches its SHA-256	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 03 passes auth readiness	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 04 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 05 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 06 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 07 returns identity_mismatch (init_predicate) for MiniMax-M3.1-Flash while reporting MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	macbook 0.1.2 capture 07 returns identity_mismatch (response_predicate) for MiniMax-M3.1-Flash-Preview while reporting MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 03 passes auth readiness	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 04 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 05 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 06 passes tool-free identity with response IDs for MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 07 returns identity_mismatch (init_predicate) for MiniMax-M3.1-Flash while reporting MiniMax-M3.1-Flash	pass
Phase 2	packages/adapter-madv-surface/test/recorded-0.1.2.test.ts	ubuntu 0.1.2 capture 07 returns identity_mismatch (response_predicate) for MiniMax-M3.1-Flash-Preview while reporting MiniMax-M3.1-Flash	pass
All 2027 baseline cases accounted for by file and name; all passed. No skip or todo.
2027 + 8 + 13 = 2048 tests
147 + 3 + 1 = 151 files

logs/592-phase2-diff-check.log · SHA-256 a8c1c42bb1175b99ae9dcc81846df233e61ec5e5ec8c30e1a6c6e1faf6219b69
git -C tui diff --check 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0


logs/593-phase2-all-paths.log · SHA-256 80557a785d0bc144f640064a4de0322cb2b8556d0dbb601c414c4bb1b887c342
git -C tui diff --name-only 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0
docs/verification/phase-3b-m0-admission-build-log.md
docs/verification/phase-3b-m0-admission-investigation.md
packages/adapter-madv-surface/src/index.ts
packages/adapter-madv-surface/test/fixture-integrity.test.ts
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/03.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/03.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/03.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/04.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/04.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/04.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/05.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/05.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/05.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/06.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/06.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/06.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/07.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/07.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/07.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/manifest.tsv
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/03.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/03.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/03.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/04.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/04.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/04.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/06.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/06.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/06.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/07.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/07.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/07.stdout
packages/adapter-madv-surface/test/parser.test.ts
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts
packages/adapter-madv-surface/test/recorded.test.ts
packages/protocol/src/adapter-registry.ts
packages/protocol/test/adapter-registry.test.ts
packages/supervisor/test/madv-allowlist.test.ts
packages/supervisor/test/madv-intervals.test.ts
packages/supervisor/test/madv-probes.test.ts
test/phase3a/harness-separation.test.ts

logs/594-phase2-phase-paths.log · SHA-256 f58a8b440c736318cf8a7c732ba2766c82f8e328a6f459cb3fa1005121ecee1d
git -C tui diff --name-only 664c5678e516197fa1a14da3487e27821753ff48 HEAD
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0
docs/verification/phase-3b-m0-admission-build-log.md
docs/verification/phase-3b-m0-admission-investigation.md
packages/adapter-madv-surface/test/fixture-integrity.test.ts
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/03.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/03.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/03.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/04.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/04.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/04.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/05.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/05.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/05.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/06.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/06.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/06.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/07.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/07.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/macbook/07.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/manifest.tsv
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/03.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/03.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/03.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/04.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/04.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/04.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/06.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/06.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/06.stdout
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/07.status
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/07.stderr
packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/07.stdout
packages/adapter-madv-surface/test/recorded-0.1.2.test.ts

logs/595-phase2-folder-diff.log · SHA-256 d2c30377074b40768d36a307ce69cfd4a7a4dcb14e5d9b507a2e007a199a44d3
git -C tui diff 664c5678e516197fa1a14da3487e27821753ff48 HEAD -- packages/adapter-madv-surface/test/fixture-integrity.test.ts
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0
Full output, including lines with square brackets, is in the named log.
diff --git a/packages/adapter-madv-surface/test/fixture-integrity.test.ts b/packages/adapter-madv-surface/test/fixture-integrity.test.ts
index 9498fd3..693d0e2 100644
--- a/packages/adapter-madv-surface/test/fixture-integrity.test.ts
+++ b/packages/adapter-madv-surface/test/fixture-integrity.test.ts
(lines omitted)
   return paths;
 }

(lines omitted)
   test(folder + " manifest covers every fixture and matches its SHA-256", () => {
     const root = fileURLToPath(new URL("./fixtures/" + folder + "/", import.meta.url));
(lines omitted)

logs/596-phase2-protected.log · SHA-256 75a103392dcd544f64d119cf3fe526d9ca63f5c40103d7052ba6b4c03723927c
git -C tui diff --stat 664c5678e516197fa1a14da3487e27821753ff48 HEAD -- packages/adapter-madv-surface/src packages/adapter-madv-surface/test/fixtures/recorded packages/protocol packages/supervisor test package.json bun.lock
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0


logs/597-phase2-status-final.log · SHA-256 3e6b696710e5fd7d0842b0fe489c67d5e2826b4955be90b2576ffd70414ac5ab
git -C tui status -sb
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0
## build/3b-m0-admission-r1

logs/598-phase2-untracked.log · SHA-256 a361966ec4f8546e8ea9995da9d1789a15bfafda3190d4fe4c4734023c57738a
git -C tui ls-files --others --exclude-standard
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0


logs/599-phase2-scope-final.log · SHA-256 e0d6410cd9cd63cab7a3917d8035e747b70ef8f4a49ec4629ee213883d6c3a70
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py scope
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0
Verified all 35 Phase 2 paths, all combined paths, the single folder addition and the clean tree.

All 2048 tests passed across 151 files, with no skipped or todo cases. The original run timings and square-bracketed lines are in the individually hashed logs. The timing-free head list is logs/590-phase2-head-list.log · SHA-256 6bac2ce18d4fabf564bbc3f8970bad4244110a3b9f71fcfdcfdfc3ace62201ad.

Artifacts

tui/docs/verification/phase-3b-m0-admission-investigation.md · SHA-256 3e8b7547fafd5e83acc84166f61cff12115f829c9dfd5bbf1b5c5effc7bfc563

tui/docs/verification/phase-3b-m0-admission-build-log.md · SHA-256 e8a76754c360dd99c597e1594cdbf926850e264c5d502ea564bf2515e53c7933

pr/pr-title.txt · SHA-256 79f646d073697f9448220dedc3796851f53403b9b829dd30512367965ca8c6a1

pr/pr-body.md · SHA-256 97bae3df127dac0d1ba840d26eb84135234b864e1d5fa15d6710c69f47791460

All-commit attribution check

logs/602-phase2-attribution.log · SHA-256 29ea34973e674bdbf42578b17b0a5bbdf83f2f074ce043303ca99198e789e17d
bash .github/scripts/attribution-shape-check.sh pr 0678bd4412d5aaed963ae20f101959bd92f79811 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd build/3b-m0-admission-r1
14:34  3 users, load averages: 2.70 2.30 2.00
exit=0
attribution-shape-check: PASS — attribution shape valid (shape-only; attested values are not verified)

The checker examined the full range of ten branch commits, including the seven from Phase 1.

Commands and waits

521-phase2-recorded-wait.log → 522-phase2-recorded-tests.log
524-phase2-integrity-wait.log → 525-phase2-integrity-tests.log
527-phase2-precommit-wait.log → 528-phase2-precommit-tests.log
550-phase2-break-wait.log → 551-phase2-break-tests.log
584-phase2-gate-suite-wait.log → 585-phase2-gate-suite.log

logs/492-phase2-prompt-manifest.log · SHA-256 aecfe56d5ef938b3912e5dbebdce1d9e75662d41d3f6709ed407cc2180ffc06e
shasum -a 256 -c SHA256.txt
10:50  2 users, load averages: 6.79 5.42 3.44
exit=0

logs/493-phase2-prompt-files.log · SHA-256 de4c8cec4c8e16d318c0fda80140ebadd6fd28490df7ecdb998df8004a924f90
ls prompt
10:50  2 users, load averages: 6.79 5.42 3.44
exit=0

logs/494-phase2-prompt-pins.log · SHA-256 10e3813f7d8120f149db37e21d9bfedba200a2c42b7499d502c80e5e601fdee2
check_bundle
10:50  2 users, load averages: 5.99 5.31 3.43
exit=0

logs/495-phase2-governed-version.log · SHA-256 84f6a6db4f5b21bc0841b63f07ba686ffdcd1cbb85cb76ca629f5a0ea63a2cc7
/Users/michaeldaley/builds/codex-governed-0.167.0/node_modules/.bin/codex --version
10:51  2 users, load averages: 5.67 5.26 3.43
exit=0

logs/496-phase2-head.log · SHA-256 03f2f4f2636c28cf223121d13e4c1385b92ab0c89858fdb8fc16186406732fe6
git -C tui rev-parse HEAD
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/497-phase2-branch.log · SHA-256 7d255ec2e177be3855ee76dee81e12f7eae241f5a418697be9d5a1d3f6304bd4
git -C tui branch --show-current
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/498-phase2-status.log · SHA-256 0e4d19f182efa234185f723b290e934655e6ef8257480d4ee66b97fbf9cef45e
git -C tui status --porcelain --untracked-files=all
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/499-phase2-stash.log · SHA-256 84dd64206aa5f2fcc5e4a28e56e69dbc31f490d0270da9b6c60ad3915cd5d8d0
git -C tui stash list
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/500-phase2-report-files.log · SHA-256 4ff14725f7ecb9567811f4ab8bdf43bfe9d02b78ecfcc534781f8579f825e93b
ls -A pr
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/501-phase2-report-hashes.log · SHA-256 ab8bbb834a73ae65ec01b11a5572f2788696e79ba6bb0567fa855da286d065c2
shasum -a 256 pr/m0-admission-phase1-halt-1-report.md pr/m0-admission-phase1-halt-2-report.md pr/m0-admission-phase1-report.md
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/502-phase2-record-files.log · SHA-256 c33032031c93cb03be3ff52a0de0313f749c52e9f1c6d80ec343ffa0fbb05eb3
ls -A record
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/503-phase2-reader-hash.log · SHA-256 1a705b14881794ef833a8c92a17f7f3a3f80af4ca7835434a6dd0ab8c5cf5009
shasum -a 256 record/m0-admission-record.ts
10:51  2 users, load averages: 5.62 5.25 3.43
exit=0

logs/504-phase2-runtime.log · SHA-256 1329e8bc1ece48dfc3f17768dff06088b63921f982125ab3c89c7fe1e877c91a
runtime_check
13:52  up 1 day,  5:19, 3 users, load averages: 2.38 1.86 1.84
exit=0

logs/505-phase2-evidence-manifest.log · SHA-256 59991ad35ff69bd164128d765b61f5d41795e6bea9c17ef43f4f6c4eb238cfeb
shasum -a 256 -c SHA256.txt
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/506-phase2-evidence-hashes.log · SHA-256 75ca9dff221ac6f1051b9fdf4323e6e110f345379eadaf9ff68d07cdbc4cdcb7
shasum -a 256 evidence/SHA256.txt evidence/SANITIZE.txt
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/507-phase2-raw-manifests.log · SHA-256 a3e1236ba3ccea6fc5993d6cc1bb893ee5d63c3225a6cb3135e22419d8e97b56
shasum -a 256 evidence/macbook/m0-admission-investigation-macbook/raw-MANIFEST.sha256 evidence/ubuntu/m0-admission-investigation-ubuntu/raw-MANIFEST.sha256
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/508-phase2-record-pins.log · SHA-256 614510339a25e7d57f0a3f662ebea044186409dc3032bba4a71ec58c12388fe2
shasum -a 256 evidence/records/macbook/madv-surface-record.json evidence/records/macbook/LOGS.sha256 evidence/records/ubuntu/madv-surface-record.json evidence/records/ubuntu/LOGS.sha256
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/509-phase2-record-indexes.log · SHA-256 eebea5651d476937f940148ddbfca72e7bbc72fcb392c309e5a7d9d8bd24e6b5
cat evidence/records/macbook/LOGS.sha256 evidence/records/ubuntu/LOGS.sha256
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/510-phase2-sanitize.log · SHA-256 018121687d60e34e50f030bb3a8e6da487f48517161f4ddf985fb5c95092a2c6
cat evidence/SANITIZE.txt
13:52  3 users, load averages: 2.44 1.90 1.85
exit=0

logs/511-phase2-evidence-coverage.log · SHA-256 9f036ced109817f16c8143d42eab064da6ffcfe0ed2b0395e826353d0ad64158
python3 -
13:52  3 users, load averages: 2.44 1.92 1.86
exit=0

logs/512-phase2-fixture-contract.log · SHA-256 acf7c4430523be90226f6477dec31ca9311e6411f6c73a7d33d5ed6558a95e43
cat tui/packages/adapter-madv-surface/test/recorded.test.ts tui/packages/adapter-madv-surface/test/fixture-integrity.test.ts tui/packages/adapter-madv-surface/src/index.ts
13:52  3 users, load averages: 2.44 1.92 1.86
exit=0

logs/513-phase2-act-sections.log · SHA-256 57faf117f475effcc04d226bed1309a94e5e63d7e4ad0664752a578f6054a3d6
rg -n -A 9 ^B(5|7|8|9|10|11)\. tui/docs/decisions/DEC-20261121-02-madv-surface-admission.md tui/docs/decisions/DEC-20261115-02-phase-3b-m0.md
13:52  3 users, load averages: 2.44 1.92 1.86
exit=0

logs/514-phase2-fixture-header.log · SHA-256 7dc3a639e547f8cd5e3d9a1c4ad6cad944c54a5da1cc5b3f1252e4017ef6824d
head -2 tui/packages/adapter-madv-surface/test/fixtures/recorded/manifest.tsv
13:52  3 users, load averages: 2.44 1.92 1.86
exit=0

logs/515-phase2-input-layout.log · SHA-256 b8d8e04d97191b215a7f9061c204449df32de568e3f9d944cfeb466df594ce4a
python3 -
13:53  3 users, load averages: 2.27 1.90 1.86
exit=0

logs/517-phase2-copy-fixtures.log · SHA-256 c22f33b0cc28e15eeec62140558a65345f555d4958015ab06d0298385620b516
python3 -
13:53  3 users, load averages: 2.44 1.97 1.88
exit=0

logs/518-phase2-recorded-tests.log · SHA-256 1847f47dbe0b1b7ab4b2815f4539493f9fb1f1c9f3ce385164ecf5c9e565f659
tee tui/packages/adapter-madv-surface/test/recorded-0.1.2.test.ts
13:53  3 users, load averages: 2.35 1.99 1.89
exit=0

logs/519-phase2-integrity-folder.log · SHA-256 3f724a85f33c18d630f9eaaabe29e3f57b855e2cddc9b1e471c8361fdf923f3a
python3 -
13:53  3 users, load averages: 2.35 1.99 1.89
exit=0

logs/520-phase2-recorded-runtime.log · SHA-256 7a229e6c2438be93a6a2be2a45a7e07f16ea278f9a681f436fe2b9018007bc64
runtime_check
13:54  up 1 day,  5:21, 3 users, load averages: 2.28 2.00 1.90
exit=0

logs/521-phase2-recorded-wait.log · SHA-256 f0b12d12e52172851473ca3ea2ad6ff462aab0b1ecb8c632266c116930463052
load_wait
13:54  up 1 day,  5:21, 3 users, load averages: 2.28 2.00 1.90
exit=0

logs/522-phase2-recorded-tests.log · SHA-256 96ee21c21941c179ab365427c5100fdad39c1a24b9622fde0716ca70105adf67
bun test packages/adapter-madv-surface/test/recorded-0.1.2.test.ts
13:54  up 1 day,  5:22, 3 users, load averages: 1.68 1.89 1.86
exit=0

logs/523-phase2-integrity-runtime.log · SHA-256 a9bf9f53d91697596692e0f0b91f29b8bbb3dd05e12704ca4acf088337810c43
runtime_check
13:55  up 1 day,  5:22, 3 users, load averages: 1.65 1.88 1.86
exit=0

logs/524-phase2-integrity-wait.log · SHA-256 17c7cb393ad9d73fc905f6d4f213c6d5ad730a7be4f37fa56918b65b618a43ec
load_wait
13:55  up 1 day,  5:23, 3 users, load averages: 1.70 1.85 1.84
exit=0

logs/525-phase2-integrity-tests.log · SHA-256 2073a9cbba189722d3ceddacaf074d6348f128b9a1169fd50bd4573f867f977d
bun test packages/adapter-madv-surface/test/fixture-integrity.test.ts
13:55  up 1 day,  5:23, 3 users, load averages: 1.70 1.85 1.84
exit=0

logs/526-phase2-precommit-runtime.log · SHA-256 d49d34c3a2c6b0e0d451176f83a1f33695b479044bf8ccbb58819947095659d8
runtime_check
13:55  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84
exit=0

logs/527-phase2-precommit-wait.log · SHA-256 1855e1f03fb51d933f6539558dc759c462ffc24db8ae33578befd73133f7dacc
load_wait
13:56  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84
exit=0

logs/528-phase2-precommit-tests.log · SHA-256 31888dc2888997b52d1888495117d43047c9f197e9d8b5ba03f3fad6361c80a1
bun test
13:56  up 1 day,  5:23, 3 users, load averages: 1.72 1.85 1.84
exit=0

logs/529-phase2-packet-inputs.log · SHA-256 44d3b95700a7532b3bac7f2db259325c046e87b7d404dad610437b6d67c259a2
python3 -
13:54  3 users, load averages: 2.16 1.99 1.89
exit=0

logs/530-phase2-list-tool.log · SHA-256 6a4f01935199d70178d6f15fae64b7a30b09e953f8250903827c842d2e249647
cat /private/tmp/m0-admission-r1.Eo5Hwr47/tests.py /private/tmp/m0-admission-r1.Eo5Hwr47/compare.py
13:54  3 users, load averages: 2.16 1.99 1.89
exit=0

logs/531-phase2-prepare-packet.log · SHA-256 7d68bda87e2aea22671d4fbdc610cbb8d23528aec77bc8f1575f12e242d8b6d7
cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_packet.py
13:55  3 users, load averages: 1.43 1.82 1.83
exit=0

logs/532-phase2-prepare-checks.log · SHA-256 4a4dd5cee28678979b49c35324705b8c73ec2a5e58cb947b8c134b81c605e66a
cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py
13:56  3 users, load averages: 2.69 2.06 1.92
exit=0

logs/533-phase2-prepare-messages.log · SHA-256 d35b0d6b8ce6833d3d6076671c504f759fc62982455d322c92dd5adb5e22db7d
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
13:56  3 users, load averages: 2.69 2.06 1.92
exit=0

logs/534-phase2-check-fixture-message.log · SHA-256 3b31f66251a543c17cae447ca9c8c91db833c5f5dce9f381a540d601ea5c8012
check_message /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-fixtures.msg
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0

logs/535-phase2-check-packet-message.log · SHA-256 bc543351d81e48057f2c4339517dca957508662d286b0dbadb3a8310c77ee707
check_message /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-packet.msg
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0

logs/536-phase2-check-log-message.log · SHA-256 a5a4cef17258fa06f0e60fcef4c4d01c2495ad9a226b738a19717125b5d7f18f
check_message /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-log.msg
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0

logs/537-phase2-fixture-compare.log · SHA-256 0aa171c5f0d382595b9c727ec26f5558120d30f008f7740b37d6384e06270c9b
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py fixtures
13:56  3 users, load averages: 2.65 2.08 1.92
exit=0

logs/538-phase2-prepare-delivery.log · SHA-256 0c9fd74e82f19de48542bed91164635c701bec3d7c0a5f9ae63641d35d9ddede
cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_docs.py
13:58  3 users, load averages: 1.77 1.94 1.88
exit=0

logs/539-phase2-precommit-progress.log · SHA-256 4b001c3627be1425947662d6cbb887f244accb6f7c095daacde32d11ed0acf0d
ls -l logs/526-phase2-precommit-runtime.log logs/527-phase2-precommit-wait.log logs/528-phase2-precommit-tests.log
13:58  3 users, load averages: 1.79 1.94 1.88
exit=0

logs/540-phase2-wait-evidence.log · SHA-256 31bdd2aa1ce7eac4ba2164219f9074eac41fb2f6fe14f52b662a8862e1d1396c
cat logs/527-phase2-precommit-wait.log
13:58  3 users, load averages: 1.79 1.94 1.88
exit=0

logs/541-phase2-help-lines.log · SHA-256 6e42dc6f3e75569315a64a7bc79856992266e31d061071bd8f1d20bd7c686d41
rg -n -C 2 -- --no-tools evidence/macbook/m0-admission-investigation-macbook/madv-surface/10.stdout
13:58  3 users, load averages: 1.88 1.95 1.89
exit=0

logs/542-phase2-current-constraints.log · SHA-256 71625aed97b4e3895a42ffa33ed45f4136ea5c224083edd7c2fb102d20c42e61
cat tui/AGENTS.md
13:58  3 users, load averages: 1.88 1.95 1.89
exit=0

logs/543-phase2-prepare-packet-check.log · SHA-256 d30fe6afd98396faad1702f356c295e978b8a3476242b4fc7282e7700502bc9d
cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_packet_check.py
13:59  3 users, load averages: 2.45 2.09 1.94
exit=0

logs/544-phase2-stage-fixtures.log · SHA-256 60a82a080cfaedd823ef7f722315f2c152d0408a53cbed2a3aa401297d442eab
git -C tui add -- packages/adapter-madv-surface/test/fixtures/recorded-0.1.2 packages/adapter-madv-surface/test/recorded-0.1.2.test.ts packages/adapter-madv-surface/test/fixture-integrity.test.ts
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0

logs/545-phase2-staged-fixtures.log · SHA-256 07d46f157bbe39250c1ee53e7c079a78c45a03b51bb4fbae610ea3f272fd43d3
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py staged
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0

logs/546-phase2-fixture-diff-check.log · SHA-256 2405de3c504c0d637245ebd7ef1b399e4a14ba1c042e5a3cb1c10d751036caf4
git -C tui diff --cached --check
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0

logs/547-phase2-break-byte.log · SHA-256 34571dfdc03326a1cc8808f4d3e1ec36dcec5f018c266bf97a2572e37fd90651
python3 - tui/packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0

logs/548-phase2-break-diff.log · SHA-256 fc87609b241d0b814167f79a2fd3071ae35b9e16e570e5c6d905e6627db15e10
git -C tui diff -- packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
13:59  3 users, load averages: 2.07 2.02 1.92
exit=0

logs/549-phase2-break-runtime.log · SHA-256 688d0149a434e4dbe146d858916bd1a6f52d7b50b942b4596547284aa4fb70ea
runtime_check
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88
exit=0

logs/550-phase2-break-wait.log · SHA-256 a334c958d7734bc465e49d77953425950b4183b3d215b020e8be84a27acf0ddc
load_wait
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88
exit=0

logs/551-phase2-break-tests.log · SHA-256 9a24e333244e79558e43a74e1e9f027c53e73b1e0543a56dc76b5da7024d2380
bun test packages/adapter-madv-surface/test/fixture-integrity.test.ts
14:01  up 1 day,  5:29, 3 users, load averages: 1.60 1.88 1.88
exit=1

logs/552-phase2-restore-break.log · SHA-256 c99e157367bbc2ee30467e22082469bc7f716ae86d9c7fc246a2e5590a012621
git -C tui restore --worktree -- packages/adapter-madv-surface/test/fixtures/recorded-0.1.2/ubuntu/05.status
14:01  3 users, load averages: 1.59 1.87 1.87
exit=0

logs/553-phase2-break-proof.log · SHA-256 a7b0351b11ce56177e79cd51597aab0a009a2b2c72aa30d8fb03de278dba4278
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:01  3 users, load averages: 1.59 1.87 1.87
exit=0

logs/554-phase2-final-fixture-check.log · SHA-256 3c9625131ee9bbcf6c04ce56f96c713f01f2cebe45b0b77a6a053d0860330469
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py staged
14:01  3 users, load averages: 1.59 1.87 1.87
exit=0

logs/555-phase2-commit-fixtures.log · SHA-256 a5306caf94dce19bf9ed99b4d2537529b813e238edf829653321d0c2b23544a4
git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-fixtures.msg
14:01  3 users, load averages: 1.46 1.83 1.86
exit=0

logs/556-phase2-fixture-head.log · SHA-256 31efd43780c04896b4bc020705ff5071fd75975c16038b06ab15d2a38828c9d8
git log -1 --format=%H %P %s
14:01  3 users, load averages: 1.46 1.83 1.86
exit=0

logs/557-phase2-write-packet.log · SHA-256 5988ea6c9db561d9985d9a0577502a8b0f13e6ad2c3ded14b801f1c38f9b24c0
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_packet.py
14:01  3 users, load averages: 1.66 1.87 1.87
exit=0

logs/558-phase2-verify-packet.log · SHA-256 57efdbab23dc074b554815579c7d1abd6463c98e46af2a363e294373d7d18c8a
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_packet_check.py
14:01  3 users, load averages: 1.66 1.87 1.87
exit=0

logs/559-phase2-packet-inspection.log · SHA-256 c1ce381d8abc7dee79810bef9e9b9a512d0eb2baf7672deb3189830c35d83474
rg -n ^## |^### Counts|^### Stored|^Stored filename|^The Ubuntu investigation|^The first event|^Ubuntu PC made|^MacBook made tui/docs/verification/phase-3b-m0-admission-investigation.md
14:02  3 users, load averages: 1.61 1.86 1.87
exit=0

logs/560-phase2-packet-sha.log · SHA-256 a3e6e2c29879e3652e42176359beb9f17b2b3e5e4d18c197650f7798363ca186
shasum -a 256 tui/docs/verification/phase-3b-m0-admission-investigation.md
14:02  3 users, load averages: 1.61 1.86 1.87
exit=0

logs/561-phase2-stage-packet.log · SHA-256 37a7303d01b9771398b942ce962bf7a5c55ae1ee231d1df97323517f0bb41878
git -C tui add -- docs/verification/phase-3b-m0-admission-investigation.md
14:02  3 users, load averages: 1.61 1.86 1.87
exit=0

logs/562-phase2-packet-diff-check.log · SHA-256 09bb7327ee112285ded5a1434be30eaf32a97ac6179fe1c94f169b1ac63041d6
git -C tui diff --cached --check
14:02  3 users, load averages: 1.61 1.86 1.87
exit=0

logs/563-phase2-staged-packet.log · SHA-256 d8ce70ce86f99226636a70152d8a8cc5b7d24b044b41cead41f37fb901a8c1d3
git -C tui diff --cached --name-only
14:02  3 users, load averages: 1.61 1.86 1.87
exit=0

logs/564-phase2-commit-packet.log · SHA-256 9426be82b574dc0722aa631c1fe55404ce96ad464446f7543b3a21ee4784c1fd
git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-packet.msg
14:02  3 users, load averages: 1.56 1.84 1.86
exit=0

logs/565-phase2-packet-head.log · SHA-256 e8e568f8911a783eadfe69c9a22113315a5833f093f1f3517f45f0d68be27103
git log -1 --format=%H %P %s
14:02  3 users, load averages: 1.56 1.84 1.86
exit=0

logs/566-phase2-write-log.log · SHA-256 70a003cfb4cd29b628b75e97b6fb67f849adace7e370f96fcd45890180ef0549
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_docs.py log
14:02  3 users, load averages: 1.52 1.83 1.85
exit=1

logs/567-phase2-align-evidence-lookup.log · SHA-256 6c6886e5e8bd4bc500b95d2ce2150052fc409b5862c1145397aba0e67c232ae1
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:02  3 users, load averages: 1.43 1.80 1.84
exit=0

logs/568-phase2-write-build-log.log · SHA-256 f53b4b1ba072ca0139aa261e2b9e0b4abe2080896bc9d247402b98debc81ea5a
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_docs.py log
14:02  3 users, load averages: 1.43 1.80 1.84
exit=0

logs/569-phase2-verify-log.log · SHA-256 61a07011b4857e67b01cb9fac1062925c54ca8f6fad8e0592e1f390f5e8ed583
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:02  3 users, load averages: 1.48 1.79 1.84
exit=0

logs/570-phase2-log-diff-check.log · SHA-256 0fbbc9b105bb28029ea25498407c55ce268322c467b4dbb3498b5f756b8eab6b
git -C tui diff --check
14:02  3 users, load averages: 1.48 1.79 1.84
exit=0

logs/571-phase2-stage-log.log · SHA-256 48ae3cbec980884d8f868c0a5224912fb82380911c79795a78951a6bd0d183c3
git -C tui add -- docs/verification/phase-3b-m0-admission-build-log.md
14:02  3 users, load averages: 1.48 1.79 1.84
exit=0

logs/572-phase2-staged-log.log · SHA-256 5f884621d6d216b5f411947c128409ecf7b4b42a552a5abf55c42784a01da61d
git -C tui diff --cached --name-only
14:02  3 users, load averages: 1.48 1.79 1.84
exit=0

logs/573-phase2-commit-log.log · SHA-256 29931838d530d5eb8c6a48d113b55ff0b22fb20ad037ea3d360df8fd6afde13e
git commit -F /private/tmp/m0-admission-r1.Eo5Hwr47/phase2-log.msg
14:02  3 users, load averages: 1.60 1.81 1.85
exit=0

logs/574-phase2-commits.log · SHA-256 dceb1413556f02eaec01c4e56fc2fcb228a55a3b5e8e2670cfb6fb5f646420db
git log --reverse --format=%H %P %s 664c5678e516197fa1a14da3487e27821753ff48..HEAD
14:02  3 users, load averages: 1.60 1.81 1.85
exit=0

logs/575-phase2-gate-runtime.log · SHA-256 3d93989b3a92a49bc200012ad7bc9f09e0476f9294d2bb86eaf2a1cd3e34acd1
runtime_check
14:03  up 1 day,  5:30, 3 users, load averages: 1.54 1.76 1.82
exit=0

logs/576-phase2-lock-before.log · SHA-256 5c4f5d424b91e07eaccdb7a3111595a5d44715266a9c38f3a3a0bbb7b3dfe3c7
shasum -a 256 tui/bun.lock
14:03  3 users, load averages: 1.54 1.76 1.82
exit=0

logs/577-phase2-gate-install.log · SHA-256 03ad6c827e0ecff91b42eab8eebcd865d4ea73092ea5007468fe8c3872475c82
bun install --frozen-lockfile
14:03  up 1 day,  5:31, 3 users, load averages: 2.20 1.89 1.87
exit=0

logs/578-phase2-lock-after.log · SHA-256 f632ed55503433ee5492413a1ff4f91ae611dede83a217ecc873a11d40cbc9ee
shasum -a 256 tui/bun.lock
14:03  3 users, load averages: 2.19 1.89 1.87
exit=0

logs/579-phase2-install-mode.log · SHA-256 cbdee64215ec9de2adaa02487d7c40cbb9f9b97dc5ceb060840be6377ca50819
git -C tui diff --summary
14:03  3 users, load averages: 2.19 1.89 1.87
exit=0

logs/580-phase2-install-restore.log · SHA-256 011651dd1aa303667d230759c56882df9edef9de616364a1672f9912633986c3
git -C tui checkout -- packages/founder-act/src/main.ts
14:03  3 users, load averages: 2.17 1.89 1.87
exit=0

logs/581-phase2-install-clean.log · SHA-256 4fa0bacecea54d1ed3086da1444e948e1f8fb692c255b733d6173c9eb5e83b18
git -C tui status --porcelain --untracked-files=all
14:03  3 users, load averages: 2.17 1.89 1.87
exit=0

logs/582-phase2-gate-typecheck.log · SHA-256 6607341ddddb9577b6591ea60b961aad9e358058278efab757143e83c9cda0f1
bunx tsc --noEmit
14:10  up 1 day,  5:38, 3 users, load averages: 1.69 1.75 1.80
exit=0

logs/583-phase2-gate-suite-runtime.log · SHA-256 18cd0b0b979d874e1baacd011d5e1e69805781911ad89ef3ef8961723cfe1507
runtime_check
14:25  up 1 day,  5:52, 3 users, load averages: 2.08 1.72 1.75
exit=0

logs/584-phase2-gate-suite-wait.log · SHA-256 c8b70bb63617839b13bb24b1788f6780ee12f381e064f96436e6009f758c9961
load_wait
14:30  up 1 day,  5:58, 3 users, load averages: 1.96 1.83 1.78
exit=0

logs/585-phase2-gate-suite.log · SHA-256 f1870033eaa64f08beb1408a8557c4b6dc37ffadcaef795fa77348a82d756880
bun test
14:30  up 1 day,  5:58, 3 users, load averages: 1.96 1.83 1.78
exit=0

logs/586-phase2-delivery-checks.log · SHA-256 5bf015bbbc5f891c43c65a1ab7b9f800f37441f3c7302f857524563a67615b83
cp /dev/stdin /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_check_delivery.py
14:25  3 users, load averages: 1.98 1.74 1.76
exit=0

logs/587-phase2-pr-summary-detail.log · SHA-256 3cc2e3fe4b89e183c53de4c8203a844638eb0127167b7dbf604d133a165a873d
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:25  3 users, load averages: 1.98 1.74 1.76
exit=0

logs/588-phase2-gate-progress.log · SHA-256 e66bc7ef5f66dfded552fb94ff895a69bde61409d90aec9ccbb2ed39039ceb88
python3 -
14:31  3 users, load averages: 3.31 2.26 1.95
exit=0

logs/589-phase2-progress-count.log · SHA-256 35c41093083b1ea9a43f1515d2bba135ebc52a1ddea4f862a32d22f986e01b47
awk /^\(pass\)/ {passes++} /^\(fail\)/ {failures++} END {print passes+0,"pass result lines,",failures+0,"fail result lines so far"} logs/585-phase2-gate-suite.log
14:33  3 users, load averages: 2.43 2.19 1.95
exit=0

logs/590-phase2-head-list.log · SHA-256 6bac2ce18d4fabf564bbc3f8970bad4244110a3b9f71fcfdcfdfc3ace62201ad
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/tests.py logs/585-phase2-gate-suite.log
14:33  3 users, load averages: 2.95 2.33 2.00
exit=0

logs/591-phase2-comparison.log · SHA-256 316e2037feb22267cc033b5841495f6388ecf3b61925c9adaa68920edea29a53
python3 - /private/tmp/m0-admission-r1.Eo5Hwr47
14:33  3 users, load averages: 2.95 2.33 2.00
exit=0

logs/592-phase2-diff-check.log · SHA-256 a8c1c42bb1175b99ae9dcc81846df233e61ec5e5ec8c30e1a6c6e1faf6219b69
git -C tui diff --check 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/593-phase2-all-paths.log · SHA-256 80557a785d0bc144f640064a4de0322cb2b8556d0dbb601c414c4bb1b887c342
git -C tui diff --name-only 0678bd4412d5aaed963ae20f101959bd92f79811 HEAD
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/594-phase2-phase-paths.log · SHA-256 f58a8b440c736318cf8a7c732ba2766c82f8e328a6f459cb3fa1005121ecee1d
git -C tui diff --name-only 664c5678e516197fa1a14da3487e27821753ff48 HEAD
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/595-phase2-folder-diff.log · SHA-256 d2c30377074b40768d36a307ce69cfd4a7a4dcb14e5d9b507a2e007a199a44d3
git -C tui diff 664c5678e516197fa1a14da3487e27821753ff48 HEAD -- packages/adapter-madv-surface/test/fixture-integrity.test.ts
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/596-phase2-protected.log · SHA-256 75a103392dcd544f64d119cf3fe526d9ca63f5c40103d7052ba6b4c03723927c
git -C tui diff --stat 664c5678e516197fa1a14da3487e27821753ff48 HEAD -- packages/adapter-madv-surface/src packages/adapter-madv-surface/test/fixtures/recorded packages/protocol packages/supervisor test package.json bun.lock
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/597-phase2-status-final.log · SHA-256 3e6b696710e5fd7d0842b0fe489c67d5e2826b4955be90b2576ffd70414ac5ab
git -C tui status -sb
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/598-phase2-untracked.log · SHA-256 a361966ec4f8546e8ea9995da9d1789a15bfafda3190d4fe4c4734023c57738a
git -C tui ls-files --others --exclude-standard
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/599-phase2-scope-final.log · SHA-256 e0d6410cd9cd63cab7a3917d8035e747b70ef8f4a49ec4629ee213883d6c3a70
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_verify.py scope
14:33  3 users, load averages: 2.50 2.25 1.98
exit=0

logs/600-phase2-pr-draft.log · SHA-256 c816b0f4c1fbfc51de95c1d051d6e53986c510e654b3b04346c2bde344e9f9ba
python3 /private/tmp/m0-admission-r1.Eo5Hwr47/phase2_docs.py pr
14:34  3 users, load averages: 2.70 2.30 2.00
exit=0

logs/601-phase2-attribution-range.log · SHA-256 0ea870091d09df569dde6b68ba7f4bfacf313106de72b410882125f10661d753
git -C tui rev-list --reverse 0678bd4412d5aaed963ae20f101959bd92f79811..68d78a60338d9ff27ffab7b275aa3395e2a1c9bd
14:34  3 users, load averages: 2.70 2.30 2.00
exit=0

logs/602-phase2-attribution.log · SHA-256 29ea34973e674bdbf42578b17b0a5bbdf83f2f074ce043303ca99198e789e17d
bash .github/scripts/attribution-shape-check.sh pr 0678bd4412d5aaed963ae20f101959bd92f79811 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd build/3b-m0-admission-r1
14:34  3 users, load averages: 2.70 2.30 2.00
exit=0

Deviations

The scratch documentation helper initially matched two logs with the same suffix and stopped before writing. Log 567 fixed the evidence lookup to select run 522 explicitly. No implementation or test change or gate rerun resulted. Earlier Phase 1 halts and signed resolutions are recorded in its archived report.

The builder made no live call, ran no surface, used no real key and wrote no capability record. The Phase 1 production code is unchanged. The builder read investigation evidence only under evidence/.

Founder decision

Check the Phase 2 session record, then run B10 on both hosts at 68d78a60338d9ff27ffab7b275aa3395e2a1c9bd and decide on the B11 push and draft pull request.
