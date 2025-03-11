import type { PackageJson } from 'type-fest';

export function readPkgJSON(path: string) {
  return require(path) as PackageJson;
}
