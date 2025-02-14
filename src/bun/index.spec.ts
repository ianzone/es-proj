import { expect, test } from 'bun:test';
import { $ } from 'bun';

async function run(cmd: string) {
  const { stdout, stderr, exitCode } = await $`${{ raw: cmd }}`.nothrow().quiet();
  return {
    stdout: stdout.toString(),
    stderr: stderr.toString(),
    exitCode,
  };
}

test('run()', async () => {
  expect(await run('echo Hello, world!')).toBe({
    stdout: 'Hello, world!\n',
    stderr: '',
    exitCode: 0,
  });
});
