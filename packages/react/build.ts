import { $ } from 'bun';

// https://bun.sh/docs/bundler

const buildBrowser = Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  splitting: true,
  minify: true,
  sourcemap: 'linked',
});

const dts = $`tsc`;

Promise.all([dts, buildBrowser]);
