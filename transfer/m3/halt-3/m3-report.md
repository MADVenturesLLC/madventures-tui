FOUNDER_DECISION_REQUIRED

Phase 3B M3 under DEC-20261127-01, second resume

Codex, based on OpenAI GPT-6. The exact model identifier and reasoning effort
were not shown. The harness reported workspace-write with restricted network
access. A separate approval-policy field was not shown. The Founder specified
on-request with in-person approvals. The opening and first halt report record
the complete initial tool inventory, git identity and environment. This resume
used permitted tools. No live surface was run and no commit was created here.

The governed CLI output in log 271 was:

WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
codex-cli 0.167.0

Working directory /Users/michaeldaley/builds/m3-r1
Branch build/3b-m3-r1
Binding base a7ceccbe96950b63646edc1dc6cc8590c957bf28
Committed head 790eba2b5a3ea1beb37aa07311165c0fa9b8109f

All resume preconditions passed, logs 269 through 281. The three prompt
hashes matched. The branch and its index were initially clean with no stash.
Both earlier halt reports matched their specified hashes. Logs 001 through
268 were each present once. The evidence directory was empty.

The builder prompt SHA-256 is
ed699228da7e9924d7d175c89b0ca3d3accd1f1385b36e6cc41de9b0d8fbb1ca.
The first resume SHA-256 is
e7d8676a52790218b18997d9808f9c93731a2b2d2851762e73f58c3e7cc47d92.
The second resume SHA-256 is
5774d3f07e3c3475d539f027cdaef9ce76154403cd76b5a47d40f3ae33b6c6eb.

The base suite passed 2139 tests across 168 files. Its source log is
031-baseline-test.log, SHA-256
77576fb28d74bc68227619d41f2f69ce3deb4565fc7b7f4633ea5df75c229431.
R1, R2 and R3 are committed. The four R3 dispatch tests passed on the
restored code. The previous halt reports contain their evidence.

R4 work in progress

App uses the existing keyboard router and separate per-surface line buffers.
The draft reads the client snapshot at submit, encodes the line for the named
surface, sends one request, and projects the broker result in the pane.
The resize uses the measured content box and caches the last size sent per
execution. The no-client path retains the existing callback. The focused
tests use a recording client, scripted refusals and real PTY hosts with
stand-in children for the usable-input and unauthorized-submission cases.
These changes are uncommitted. Four tracked files are modified and five
new files are untracked. Their digests are below. No R4 break was started.

Log 289 passed the runtime check. Bun was 1.4.2, revision
744846f844374847c902b5e7fd59b4342a51ef99, binary SHA-256
35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5.
Log 290 passed the no-emit type check without a compiler diagnostic.

The logged wait, 291, measured 2.18 at 22:12:27 UTC, then released at
1.96 at 22:12:57 UTC. The R4 test run, 292, started at 22:13:21 UTC
with first one-minute load 2.16. It ended with status 1 at 22:13:30 UTC.
The observation helper reached its 3500 ms deadline in both real-host tests.
DEC-20261108-03 Addendum 5 B2 and B5, and THE LOAD in the builder prompt,
require a halt and prohibit a rerun on a timeout in a run that starts at
2.0 or above. The earlier below-threshold wait and the fact these are
new tests are both recorded. The failures occurred inside the observation
helper before either test exhausted its outer Bun test budget.

Results of test/phase3b/usable-input.test.tsx

FAIL each submitted stream-json line produces a checked stand-in response in its pane
error: offline observation deadline

FAIL a nonwriter submission is unauthorized in its pane and never reaches the child
error: offline observation deadline

Results of test/phase3b/line-input.test.tsx

FAIL only Enter submits one encoded focused line and other focus sends nothing
Expected length: 2
Received length: 0

PASS only the active focused writer resizes at a changed pane size

FAIL each refusal is shown once without retry and no token sends nothing
Expected to contain: "INVALID COMMAND"

Bun summary, quoted up to its timing line:

 1 pass
 4 fail
 23 expect() calls

The complete run, with its bracketed timing and captured display, is in
292-r4-tests.log, SHA-256
7d4667358c7a82b44b6f7d5b496fea6094db08fc714dc1327e995782b83a69a1.

Read-only diagnosis

The new test helper passed lowercase return and backspace to OpenTUI's
mockInput.pressKey. The installed mock uses uppercase RETURN and BACKSPACE
as the lookup keys for the control bytes. An unrecognized string retains
its literal value. The R4 buffer submits on carriage return or line feed.
This explains why the scripted test recorded zero submissions and why the
expected replies and refusal words were absent. A corrected run is still
needed to establish R4 behavior. No code was changed or test repeated
after the timeout. Logs 294 and 295 preserve the source evidence.

Earlier halts and deviations

First halt report m3-halt-1-report.md, SHA-256
3a6407778d508fea8e62d165a5b84f42ab25c21222a157ee96625162da214302.
The execution-principal bridge mutation failed at adapter construction
before the no-write assertion. It remains inconclusive. Three later
breaks ran before cause review identified that halt. The Founder upheld
those three results and recorded the sequencing as a deviation.

Second halt report m3-halt-2-report.md, SHA-256
72d3047839cf01c3339fab1eace2d04498db0143f33208ebbaffd723f87af7ee.
The first resume required the following break before R4. The second resume
removed that prerequisite and allowed R4 to proceed.

Declined R3 execution-principal bridge break because it requires implementing and exercising a working cross-principal write to a real PTY host. The Founder owns the break at the last commit.

No substitute was made. The conditional test-strengthening item lapsed.
Log 209's FixturePreflightFailed:identity_mismatch was observed only under
the early-ack break. Log 244 identifies several preflight paths with that
result and does not establish which caused it. No new run was made for it.
The committed opening is intact. Its line 1568 should read:

028-task-design.log — 13:39  1 user, load averages: 2.34 2.50 2.65 — exit status 0. SHA-256 c3b188d41ff8ccddf0664b934df5d219a9173d4a4cc6761ff99843dc259ff080.

The R4 commit and breaks, R5 through R8, the evidence packet, the full
run, the closing commit, B21 gates and PR materials remain pending.
No push or pull request was made.

SHA-256 of each R4 worktree file
c8a0fab08e51fb7d22253d5200e2b1ba4a4500ae8165f77f257c52c6ad42265c  tui/apps/madbridge/src/tui/App.tsx
bb0e79e63e6a1ae6c1ae5a9232266e04f2c4d9a8f2b00b50b3ad13eee9ef9a17  tui/apps/madbridge/src/tui/components/DockStrip.tsx
97b68af074ce03df6a7d8d895bf9e30cdbb00b8ca81049018906dc92f5e93458  tui/apps/madbridge/src/tui/panes/AntigravityPane.tsx
9c4cd73ae37bb22f451415bafe1626640d37d6df432319de1f35b24d0f0d3d0d  tui/apps/madbridge/src/tui/panes/ClaudePane.tsx
6f3298c8afb384390f9b8cf3b7f757d6dee5937f20a1dc98705f596af2e291fb  tui/apps/madbridge/src/tui/live/line-buffer.ts
92dd299e681de4c6caed632fac8548dd810a4b8fa6b64bd0ca55e8efde33dc23  tui/test/phase3b/input-view.tsx
507c8623d1e6c7da24ab915280fa1ccd1c9d43bd68f3c22a0091ccffd5efbd0a  tui/test/phase3b/line-input.test.tsx
889571d30da189fb62824bd0dab4cb6548c2ae73c9a6ffeca3d59aa8bb16f93b  tui/test/phase3b/usable-input.test.tsx
b1f1d3d7a3fab441e7231b7b1e47b26138783a715584bf41e3a3c8f264068725  tui/test/phase3b/usable-input.tsx

SHA-256 of second-resume logs
f497fcfa36a21009846ddf65ffcbaae21c00b21b2ec8afb0a14fd7b36a4e5bd6  logs/269-resume2-checksums.log
17ce233d2f1f5c459fad8b3fea23711d5c25d75b8cf83835830d39853e45f889  logs/270-resume2-prompt.log
14cbb4e7133598667f6bc8a7898145634f17d89b994ccbad8d54e0ac117e0f14  logs/271-resume2-version.log
3f84837a2bd903c593ec263cfd60ffe16953a3c6032348f119a15f4a14ec4378  logs/272-resume2-head.log
46fe74af82e07b9af88098ca899f6948172fd372fed60e37c991e9e8f8d49cf5  logs/273-resume2-branch.log
b0030493b30cbdeedf8e3cf2835741628dacb53fa42d066271987fa16242c435  logs/274-resume2-tree.log
a2d4eaab20243edf27874ea9fbd69d7548d1bfecd6789ee9bd32e824b071bd5d  logs/275-resume2-stash.log
896d5bb31f18982cc7d95430882cb062a731ebbf1de597e736cceceb28ea9a60  logs/276-resume2-pr.log
ec50cf3e8c9d0626016ee964425aae5eca6f74142807fe8573a95caf4801bf1e  logs/277-resume2-reports.log
40f6403e58791857c6a62329d67c95d6dcd1d5e5afb2ae7ef69fbdabecd4096b  logs/278-resume2-logs.log
e26b9e1280a6b229ce28cff3db4b8dcffc65e0b2def93d5c3b97c17c58c96161  logs/279-resume2-receipt.log
59eec4261d2a9a538bbc401d879d235c6e65467cebd7db7240f014dd80c5cf63  logs/280-resume2-evidence.log
03159f28ad1289eab4c90e66bfcdd47a61f3c08df69b55f427b5c9eef388e67f  logs/281-resume2-prompt-hashes.log
16d1b4571d9d0d2985e849d76dcffb6198d8107b08902c85b9cbd19f3fc2786b  logs/282-r4-entry.log
069b3fe23b77565f0260f3adf48ec36ab3b877afb2f45223135902941354f08c  logs/283-r4-layout.log
3041f44d516ef1ebcdea12829f6ebf5e8f21d4124016f3167789b8ebd105e973  logs/284-r4-client-contract.log
43d2757229137bcad902bbd944bac1d6e67d77542964e04eeec8b47792e39109  logs/285-layout-api.log
9596bfc38e2e5296634e41b1feef94f91b476887f784a8b8f8484a1644555192  logs/286-r4-edit.log
ddb174b539ee4eb4cee0a5088860b0b2742b89c8a6253ef878efd136dbb89544  logs/287-r4-test-api.log
ccca545736587242d5d1b1ecfe17b8ad584aad72f9f609c9b68312f23e2625d4  logs/288-r4-tests.log
87ead59c8a6a11ef11fc6b0ceb5ec8d1c6165d4c21d04794a8308d32725cb162  logs/289-r4-runtime.log
4ea66d951de0067b77a63844bdf596825ba947304bef330d7721206461208419  logs/290-r4-types.log
8050cf5d50385b459fc429570aefd5bdbcfe47cef91f4fbe4c32837210fe2a34  logs/291-r4-wait.log
7d4667358c7a82b44b6f7d5b496fea6094db08fc714dc1327e995782b83a69a1  logs/292-r4-tests.log
a4a0d1111dd59fd4ffadbecdd7d90ad4071b73117ec78a4fdc2b74ead187c6c1  logs/293-r4-load-review.log
d4ae438073b709c86f613a475898ec660cf8a4d1849c193196ef12927bf0f552  logs/294-r4-halt-state.log
fcfe81587d1c63b4c1ad5bdeb045ca065f24d289faa8ec04dbd15db59fcc7e17  logs/295-r4-halt-input.log

Single Founder decision

Decide whether to authorize resuming the uncommitted R4 work to correct
the mock key inputs and verify the focused tests under the runtime and
load rules. This report's SHA-256 is issued after the file is closed.
