import { type ExecException, exec, execSync } from 'node:child_process';
import { promisify } from 'node:util';
const pe = promisify(exec);
// https://nodejs.org/api/child_process.html

/**
 * Run a shell command asynchronously.
 * @param cmd - The shell command to run.
 * @returns The stdout, stderr, and exit code of the command.
 */
export async function sh(cmd: string) {
  const subprocess = pe(cmd);
  let stdout = '';
  let stderr = '';
  try {
    stdout = (await subprocess).stdout;
  } catch (error) {
    const err = error as ExecException;
    stdout = err.stdout || '';
    stderr = err.stderr || err.message;
  }

  return {
    stdout: stdout.trim(),
    stderr: stderr.trim(),
    exitCode: subprocess.child.exitCode,
  };
}

/**
 * Run a shell command synchronously.
 * @param cmd - The shell command to run.
 * @returns The stdout, stderr, and exit code of the command.
 */
export function shSync(cmd: string) {
  let stdout = '';
  let stderr = '';
  let exitCode = 0;
  try {
    stdout = execSync(cmd, { stdio: 'pipe', windowsHide: true }).toString();
  } catch (error) {
    const err = error as ExecException;
    // https://github.com/nodejs/node/issues/57392
    stdout = err.stdout?.toString() || '';
    stderr = err.stderr?.toString() || err.message;
    exitCode = err.code || 1;
  }
  return {
    stdout: stdout.trim(),
    stderr: stderr.trim(),
    exitCode,
  };
}
