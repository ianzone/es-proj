import { expect, test } from 'bun:test';
import { run } from './run';

test('run()', async () => {
  expect(await run('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
  expect(await run('node -e \'console.error("new err");process.exit(1)\'')).toEqual({
    stdout: '',
    stderr: 'new err',
    exitCode: 1,
  });
});
