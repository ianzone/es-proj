import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { glob } from 'glob';
import { exit } from '../process';

export type LookUpOptions = {
  cwd?: string;
  keep?: number;
};

/**
 * Look up for a file or directory in the parent directories.
 * @param target - The target file or directory to look for.
 * @param options - Options for the lookup.
 * @param options.cwd - The starting directory to look from. Defaults to the current working directory.
 * @param options.keep - The number of results to keep. Defaults to 1.
 * @returns An array of paths if found, otherwise undefined.
 */
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

/**
 * Look down for a file or directory in the current directory and its subdirectories.
 * @param target - The target file or directory to look for.
 * @param options - Options for the look down.
 * @param options.cwd - The starting directory to look from. Defaults to the current working directory.
 * @param options.patterns - The glob patterns to match. Defaults to '**'.
 * @returns An array of matched paths.
 */
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
