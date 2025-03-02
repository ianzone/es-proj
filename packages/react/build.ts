import { $ } from 'bun';

await $`rm -r dist`.nothrow();

// https://bun.sh/docs/bundler
const build = Bun.build({
  entrypoints: ['./src/index.ts', './src/client/index.ts', './src/server/index.ts'],
  outdir: './dist',
  splitting: true,
  minify: true,
  sourcemap: 'linked',
});

const dts = $`tsc`;

Promise.all([dts, build]);
