import { expect, test } from 'bun:test';
import { run } from './index';

test('run()', async () => {
  expect(await run('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
});
