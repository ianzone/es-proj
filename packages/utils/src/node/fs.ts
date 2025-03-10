import { existsSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { glob } from 'glob';

export function lookUp(target: string, startDir: string = process.cwd()): string | undefined {
  const cwd = startDir.split(sep);
  for (let i = cwd.length; i > 0; i--) {
    const dir = cwd.slice(0, i).join(sep);
    if (existsSync(`${dir}${sep}${target}`)) {
      return dir;
    }
  }
}

export function lookDown(target: string, root: string, patterns: string[]): string[] {
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

  console.log(matchedPaths);
  for (const matchedPath of matchedPaths) {
    // 如果匹配到的是目录
    if (statSync(matchedPath).isDirectory()) {
      const targetPath = join(matchedPath, target);

      if (existsSync(targetPath)) {
        results.push(matchedPath);
      }
    }
  }
  return results;
}
