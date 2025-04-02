import { availableParallelism, cpus } from 'node:os';

export function parallel(portion = 1) {
  const cores = availableParallelism?.() ?? cpus().length;
  return Math.max(1, Math.floor(cores * portion));
}
