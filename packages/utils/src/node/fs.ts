import { existsSync } from 'node:fs';
import { sep } from 'node:path';

export function lookUp(fileOrFolder: string, startDir?: string): string | undefined {
  const cwd = startDir ? startDir.split(sep) : process.cwd().split(sep);
  for (let i = cwd.length; i > 0; i--) {
    const dir = cwd.slice(0, i).join(sep);
    if (existsSync(`${dir}${sep}${fileOrFolder}`)) {
      return `${dir}${sep}`;
    }
  }
}
