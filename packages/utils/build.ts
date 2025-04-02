import { $, type Target } from 'bun';

await $`rm -r dist`.nothrow();

// https://bun.sh/docs/bundler
function build(folder: string, target: Target) {
  return Bun.build({
    sourcemap: 'linked',
    entrypoints: [`./src/${folder}/index.ts`],
    outdir: `./dist/${folder}`,
    target,
  });
}

const buildBrowser = build('browser', 'browser');

const buildBun = build('bun', 'bun');

const buildNode = build('node', 'node');

const buildShared = build('shared', 'node');

const dts = $`tsc`;

Promise.all([dts, buildBrowser, buildBun, buildNode, buildShared]);
