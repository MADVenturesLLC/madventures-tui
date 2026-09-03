// packages/storage/src/home.ts
// Passwd home resolution via os.userInfo() (POSIX getpwuid) and the
// typed $HOME-divergence failure (spec §5.2).
//
// Storage location is derived from the authenticated user's passwd
// entry, never from the mutable $HOME environment variable.

import { realpathSync } from "node:fs";
import { userInfo } from "node:os";

export class HomeMismatchError extends Error {
  readonly passwdHome: string;
  readonly envHome: string;

  constructor(passwdHome: string, envHome: string) {
    super(`$HOME (${envHome}) does not resolve to the passwd home (${passwdHome})`);
    this.name = "HomeMismatchError";
    this.passwdHome = passwdHome;
    this.envHome = envHome;
  }
}

export function resolvePasswdHome(): string {
  return realpathSync(userInfo().homedir);
}

export function assertHomeConsistency(env: NodeJS.ProcessEnv): void {
  const envHome = env.HOME;
  if (envHome === undefined) {
    return;
  }
  const passwdHome = resolvePasswdHome();
  let resolvedEnvHome: string;
  try {
    resolvedEnvHome = realpathSync(envHome);
  } catch {
    // A $HOME that does not exist, or cannot be read, does not resolve to
    // the passwd home either - callers should see the one typed failure
    // for every non-resolving $HOME, not a raw fs error type.
    throw new HomeMismatchError(passwdHome, envHome);
  }
  if (resolvedEnvHome !== passwdHome) {
    throw new HomeMismatchError(passwdHome, envHome);
  }
}
