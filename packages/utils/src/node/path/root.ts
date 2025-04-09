import { dirname } from 'node:path';
import { getStack } from 'src/shared';
import { lookUp } from './look';

export function getProjectRoot() {
  const stack = getStack();
  const entry = stack?.at(-1)?.path;
  const path = lookUp('package.json', { cwd: entry })?.at(0);
  if (path) {
    return dirname(path);
  }
  throw new Error('package.json not found');
}
