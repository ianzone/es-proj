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

async function squash() {
  const currentBranch = (await run('git branch --show-current')).stdout;

  const baseBranch = currentBranch === 'main' ? 'origin/main' : 'main';

  const forkPoint = (await run(`git merge-base --fork-point ${baseBranch}`)).stdout;

  await run(`git reset --soft ${forkPoint}`);
}

export const git = {
  squash,
};
