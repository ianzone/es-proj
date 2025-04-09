import type { PackageJson } from 'type-fest';
import { isFullPath } from '../path';

export function readPkgJSON(path: string) {
  if (!isFullPath(path)) {
    throw new Error('Path must be absolute');
  }
  return require(path) as PackageJson;
}
