import { expect, test } from 'bun:test';
import { sh, shSync } from './run';

test('sh()', async () => {
  expect(await sh('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
  expect(
    await sh('node -e \'console.log("new log");console.error("new err");process.exit(1)\''),
  ).toEqual({
    stdout: 'new log',
    stderr: 'new err',
    exitCode: 1,
  });
});

test('shSync()', () => {
  expect(shSync('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
  expect(
    shSync('node -e \'console.log("new log");console.error("new err");process.exit(1)\''),
  ).toEqual({
    stdout: 'new log',
    stderr: 'new err',
    exitCode: 1,
  });
});
