import { expect, test } from 'bun:test';
import { run } from './run';

test('run()', async () => {
  expect(await run('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
});
