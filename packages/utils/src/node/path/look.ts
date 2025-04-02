import { existsSync } from 'node:fs';
import { type ParsedPath, dirname, join } from 'node:path';
import { glob } from 'glob';
import { exit } from '../process';

export type LookUpOptions = {
  cwd?: string;
  keep?: number;
};

export function lookUp(
  target: string,
  { cwd = process.cwd(), keep = 1 }: LookUpOptions = {},
): string[] | undefined {
  const results: string[] = [];
  let pwd = cwd;
  do {
    const targetPath = join(pwd, target);
    if (existsSync(targetPath)) {
      results.push(targetPath);
      if (keep && results.length === keep) {
        return results;
      }
    }
    pwd = dirname(pwd);
  } while (pwd !== dirname(pwd));
  return results.length ? results : undefined;
}

export type LookDownOptions = {
  cwd?: string;
  patterns?: string | string[];
};

export type MatchedPath = ParsedPath & { path: string };

export function lookDown(
  target: string,
  { cwd = process.cwd(), patterns = '**' }: LookDownOptions = {},
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
    cwd,
    absolute: true,
  });

  return matchedPaths;
}
