import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { glob } from 'glob';

export type LookUpOptions = {
  root?: string;
  fullPath?: boolean;
  keep?: number;
};

export function lookUp(
  target: string,
  { root = process.cwd(), fullPath = false, keep = 1 }: LookUpOptions = {},
): string[] {
  const results: string[] = [];
  const dir = root;
  do {
    const targetPath = join(dir, target);
    if (existsSync(targetPath)) {
      results.push(fullPath ? targetPath : dir);
      if (results.length === keep) {
        return results;
      }
    }
  } while (dir !== dirname(dir));
  return results;
}

export type LookDownOptions = {
  root?: string;
  fullPath?: boolean;
  patterns?: string[];
};

export function lookDown(
  target: string,
  { root = process.cwd(), patterns = ['**/*'], fullPath = false }: LookDownOptions = {},
): string[] {
  const results: string[] = [];
  const include: string[] = [];
  const exclude: string[] = [];
  for (const pattern of patterns) {
    if (pattern.startsWith('!')) {
      exclude.push(pattern.slice(1));
    } else {
      include.push(pattern);
    }
  }

  // 使用glob匹配包目录
  const matchedPaths = glob.sync(include, {
    ignore: exclude,
    cwd: root,
    absolute: true,
  });

  for (const matchedPath of matchedPaths) {
    // 如果匹配到的是目录
    if (statSync(matchedPath).isDirectory()) {
      const targetPath = join(matchedPath, target);

      if (existsSync(targetPath)) {
        results.push(fullPath ? targetPath : matchedPath);
      }
    }
  }
  return results;
}
