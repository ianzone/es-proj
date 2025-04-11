import { $ } from 'bun';

await $`rm -r dist`.nothrow();

const build = Bun.build({
  entrypoints: ['./src/index.ts', './src/client/index.ts', './src/server/index.ts'],
  outdir: './dist',
  sourcemap: 'linked',
  packages: 'external',
});

const dts = $`tsc`;

Promise.all([dts, build]);
