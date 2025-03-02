import { $, type BuildConfig } from 'bun';

await $`rm -r dist`.nothrow();

// https://bun.sh/docs/bundler
function build(cfg: BuildConfig) {
  return Bun.build({
    splitting: true,
    minify: true,
    sourcemap: 'linked',
    ...cfg,
  });
}

const buildBrowser = build({
  entrypoints: ['./src/browser/index.ts'],
  outdir: './dist/browser',
  target: 'browser',
});

const buildBun = build({
  entrypoints: ['./src/bun/index.ts'],
  outdir: './dist/bun',
  target: 'bun',
});

const buildNode = build({
  entrypoints: ['./src/node/index.ts'],
  outdir: './dist/node',
  target: 'node',
});

const buildCommon = build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
});

const dts = $`tsc`;

Promise.all([dts, buildBrowser, buildBun, buildNode, buildCommon]);
