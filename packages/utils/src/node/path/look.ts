import { existsSync } from 'node:fs';
import { type ParsedPath, dirname, join } from 'node:path';
import { glob } from 'glob';
import { exit } from '../process';

export type LookUpOptions = {
  root?: string;
  keep?: number;
};

export function lookUp(
  target: string,
  { root = process.cwd(), keep = 1 }: LookUpOptions = {},
): string[] {
  const results: string[] = [];
  let cwd = root;
  do {
    const targetPath = join(cwd, target);
    if (existsSync(targetPath)) {
      results.push(targetPath);
      if (keep && results.length === keep) {
        return results;
      }
    }
    cwd = dirname(cwd);
  } while (cwd !== dirname(cwd));
  return results;
}

export type LookDownOptions = {
  root?: string;
  patterns?: string | string[];
};

console.log(lookUp('package.json'));

export type MatchedPath = ParsedPath & { path: string };

export function lookDown(
  target: string,
  { root = process.cwd(), patterns = '**' }: LookDownOptions = {},
): string[] {
  const include: string[] = [];
  const exclude: string[] = [];

  const splitPattern = (pattern: string) => {
    if (pattern.startsWith('!')) {
      exclude.push(pattern.slice(1));
    } else {
      include.push(`${pattern}/${target}`);
    }
  };

  if (Array.isArray(patterns)) {
    if (patterns.length === 0) {
      exit.error('patterns should not be empty');
    } else {
      for (const pattern of patterns) {
        splitPattern(pattern);
      }
    }
  } else {
    splitPattern(patterns);
  }

  const matchedPaths = glob.sync(include, {
    ignore: exclude,
    cwd: root,
    absolute: true,
  });

  return matchedPaths;
}
