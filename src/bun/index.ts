import { $ } from 'bun';

export async function run(cmd: string) {
  const { stdout, stderr, exitCode } = await $`${{ raw: cmd }}`.nothrow().quiet();
  return {
    stdout: stdout.toString(),
    stderr: stderr.toString(),
    exitCode,
  };
}
