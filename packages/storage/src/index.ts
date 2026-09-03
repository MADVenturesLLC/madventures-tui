// packages/storage/src/index.ts
// Public exports of the storage package.

export { assertHomeConsistency, HomeMismatchError, resolvePasswdHome } from "./home";
export {
  proposeStorageRoot,
  STORAGE_SUBDIRECTORIES,
  validateStorageRoot,
} from "./storage-root";
export type { StorageRootFailure } from "./storage-root";
export { createSessionStorage, rollbackSessionStorage } from "./session-storage";
export type { SessionStorage } from "./session-storage";
