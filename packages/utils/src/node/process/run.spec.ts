import { expect, test } from 'bun:test';
import { run, runSync } from './run';

test('sh()', async () => {
  expect(await run('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
  expect(
    await run('node -e \'console.log("new log");console.error("new err");process.exit(1)\''),
  ).toEqual({
    stdout: 'new log',
    stderr: 'new err',
    exitCode: 1,
  });
});

test('shSync()', () => {
  expect(runSync('echo Hello, world!')).toEqual({
    stdout: 'Hello, world!',
    stderr: '',
    exitCode: 0,
  });
  expect(
    runSync('node -e \'console.log("new log");console.error("new err");process.exit(1)\''),
  ).toEqual({
    stdout: 'new log',
    stderr: 'new err',
    exitCode: 1,
  });
});
