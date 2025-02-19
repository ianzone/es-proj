import { $ } from 'bun';

/**
 * Run a shell command
 */
export async function run(cmd: string) {
  const { stdout, stderr, exitCode } = await $`${{ raw: cmd }}`.nothrow().quiet();
  return {
    stdout: stdout.toString().trim(),
    stderr: stderr.toString().trim(),
    exitCode,
  };
}
