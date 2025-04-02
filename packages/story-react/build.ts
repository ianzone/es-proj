import { $ } from 'bun';

await $`rm -r dist`.nothrow();

const build = Bun.build({
  sourcemap: 'linked',
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  packages: 'external',
});

const dts = $`tsc`;

Promise.all([dts, build]);
