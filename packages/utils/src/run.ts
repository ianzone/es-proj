import { exec } from 'node:child_process';
import { promisify } from 'node:util';
const sh = promisify(exec);

/**
 * Run a shell command
 */
export async function run(cmd: string) {
  const subprocess = sh(cmd);
  const { stdout, stderr } = await subprocess;
  return {
    stdout: stdout.trim(),
    stderr: stderr.trim(),
    exitCode: subprocess.child.exitCode,
  };
}
