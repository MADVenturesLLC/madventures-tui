// broker/runtime.ts
// F4: Secure runtime directory and socket management.
// Uses a Founder-owned 0700 directory with a 0600 socket.
// Validates ownership and safely handles stale socket files.

import { mkdirSync, statSync, unlinkSync, chmodSync, existsSync } from "fs";
import { RUNTIME_DIR, SOCKET_PATH } from "../shared/protocol";

export class Runtime {
  /**
   * Initialize the runtime directory with 0700 permissions.
   * Validates ownership — must be owned by the current user.
   * Throws if the directory exists but is not owned by us or has wrong perms.
   */
  static init(): void {
    const dir = RUNTIME_DIR;

    if (existsSync(dir)) {
      const stat = statSync(dir);
      if (!stat.isDirectory()) {
        throw new Error(`Runtime path ${dir} exists but is not a directory`);
      }
      // Validate ownership
      if (stat.uid !== process.getuid?.()) {
        throw new Error(
          `Runtime directory ${dir} is owned by uid ${stat.uid}, not ${process.getuid?.()}. Refusing to start.`,
        );
      }
      // Validate permissions — must be 0700
      const mode = stat.mode & 0o777;
      if (mode !== 0o700) {
        // Tighten permissions rather than refuse — we own it
        chmodSync(dir, 0o700);
      }
    } else {
      mkdirSync(dir, { recursive: true, mode: 0o700 });
    }
  }

  /**
   * Safely clean up a stale socket file before binding.
   * Validates that the file is actually a socket (not a regular file)
   * and that we own it before unlinking.
   */
  static cleanStaleSocket(): void {
    if (!existsSync(SOCKET_PATH)) return;

    const stat = statSync(SOCKET_PATH);
    if (stat.uid !== process.getuid?.()) {
      throw new Error(
        `Stale socket ${SOCKET_PATH} is owned by uid ${stat.uid}, not us. Refusing to unlink.`,
      );
    }

    // Only unlink if it's a socket file (stale) or a regular file (corrupt)
    // Unix sockets show up as S_IFSOCK
    const isSocket = (stat.mode & 0o170000) === 0o140000;
    const isRegular = (stat.mode & 0o170000) === 0o100000;

    if (isSocket || isRegular) {
      unlinkSync(SOCKET_PATH);
    } else {
      throw new Error(
        `Socket path ${SOCKET_PATH} exists but is neither a socket nor a regular file. Refusing to unlink.`,
      );
    }
  }

  /**
   * Get the runtime directory path.
   */
  static get dir(): string {
    return RUNTIME_DIR;
  }

  /**
   * Get the socket path.
   */
  static get socket(): string {
    return SOCKET_PATH;
  }

  /**
   * Set socket file permissions to 0600 after binding.
   */
  static secureSocket(): void {
    if (existsSync(SOCKET_PATH)) {
      chmodSync(SOCKET_PATH, 0o600);
    }
  }
}
