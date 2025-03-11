export const exit = Object.assign(
  (msg?: string) => {
    msg && console.info(msg);
    process.exit(0);
  },
  {
    warn: (msg: string) => {
      console.warn(msg);
      process.exit(0);
    },
    error: (msg: string, code?: number) => {
      console.error(msg);
      process.exit(code || 1);
    },
  },
);
