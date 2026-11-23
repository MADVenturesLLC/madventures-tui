DEC-20261123-01 ADDENDUM 1: environment values in the logs of M1

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Amends:** how `DEC-20261023-01` B2 and B6 and the builder prompt's TEST OUTPUT are read in Phase 3B slice M1, and rules on log 124 of its builder session
> **Read with:** `DEC-20261123-01` B21, B23, B25 and B26; `DEC-20261023-01` B2, B4 and B6; the builder prompt of M1, SHA-256 `683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733`, its TEST OUTPUT and its WHERE YOU WORK

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The halt.** The builder of M1, `session:codex/3b-m1-r1`, halted while it ran a deliberate break of the test that the live port passes the session and signal and rejects untrusted failure detail, in `packages/supervisor/test/live-port.test.ts`. It reported only the log, `/Users/michaeldaley/builds/m1-r1/logs/124-break-detail-test.log`, and the test, the form `DEC-20261023-01` B6 sets when a run's output holds the value of an environment variable, a token, a credential or a key.

A2. **My scan.** In my own terminal, with a read-only command, SHA-256 `b3945eef64e67973482eae7f0b919cdc56b841847502379bb4480a55852743e5`, which printed none of their text, I scanned log 124 and the builder session's own record. Log 124 has 318 lines, 12,718 bytes and SHA-256 `7294cb12c91044601c50df986f5566f930178b53dc3fd46dcef26300f8a34044`. It holds no token-shaped string, and the variables of my shell whose values of eight or more characters appear in it are HOME, LOGNAME, PWD, TERM and USER: my home folder, my user name and the name of my terminal type. None of them is a token, a credential or a key. The session record holds no token-shaped string but one match of a general pattern, which a second read-only command, SHA-256 `b86c3b73b99b3381ee6200c57c02020ecf892403c17a52075f09162fe6c1410b`, found inside an encrypted reasoning field, and in no file of the builder.

A3. **Why the rule needs a reading.** Bun prints absolute paths in its failure output and stack traces, and the paths of this build hold my home folder and user name; the preflight input holds my home path from the host, as the tests at the base do; and the tests at the base write a terminal type as a literal. Read word for word, B2 and B6 would stop every failing run of M1, every deliberate break of `DEC-20261123-01` B21 among them.

A4. **The drafting assistant.** A Claude Code session drafted this addendum, the resume message that delivers it and both scan commands. That is not an independent review.

## Part B: Founder rulings

B1. **The reading for M1.** `DEC-20261023-01` B2 and B6 and the builder prompt's TEST OUTPUT are read in M1 so that none of these is a stop, wherever a run's output shows it: a path or list of paths, as pwd, git, ls, Bun's failure output and stack traces, a stand-in, a disposable folder or `os.userInfo()` shows it, whatever variable's value it holds, such as HOME, PWD, OLDPWD, TMPDIR or SHELL; my user name, as USER and LOGNAME hold it, wherever it appears; and a value that a file of the repository, or one the builder wrote in this session, holds as a literal, such as a terminal type or a test's canary, which is not a key. Still a stop, with all B6 then requires, even inside a path or a URL: a real token, credential or key; a URL that carries credentials; the value of any variable of the session's environment that this item does not name; and a listing of that environment. Where the builder prompt bars an environment value from the build log or the evidence packet, it reads the same way.

B2. **Tests.** No test or evidence script of M1 copies a variable of its own process environment, or that environment as a whole, into its input, its fixtures, its output or its failure messages. What `DEC-20261123-01` and the builder prompt require or allow stays as it is: the preflight input's home path, uid and shell from `os.userInfo()`, as `packages/supervisor/test/preflight.test.ts` does at the base; literal values; a stand-in's first line naming `process.execPath`; the TMPDIR and storage roots under a private mkdtemp child of the home folder; and the stand-ins and disposable folders, as the builder prompt's WHERE YOU WORK places them. The text the test of the live port feeds the build as an attester's reason is fixed synthetic text that names no path, host, user or terminal. A change the builder makes for this is a self-fix under `DEC-20261023-01` B4.

B3. **Log 124.** As B6 says, my command that delivers this addendum checks log 124's SHA-256 and deletes it before any further run. It is cited by that SHA-256 and quoted nowhere. The halt adds no round.

B4. **Delivery and record.** The builder receives this addendum in its prompt folder, with its SHA-256, by a resume message I sign. The build log, the pull request description and the act that records M1's merge name it by its SHA-256, and the Tier-2 review of M1 applies B1 to the logs it reads and writes. It is filed unchanged with that act.

B5. **Counting.** These are new Founder rulings, which Phase 3A plan §11.3 does not count. This addendum takes effect when I sign it. Nothing else in `DEC-20261123-01`, `DEC-20261023-01` or the builder prompt changes; where the builder prompt says otherwise, this addendum rules.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-11-23

Actor-Id: founder
