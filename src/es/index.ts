class Time {
  readonly ms: number;
  constructor(ms: number) {
    this.ms = Math.round(ms);
  }
  get s() {
    return this.ms / 1000;
  }
}

/**
 * Measure function performance
 */
export function measure<R>(func: () => R | Promise<R>) {
  const start = performance.now();
  const result = func();

  if (result instanceof Promise) {
    return result.then((res) => ({
      result: res,
      time: new Time(performance.now() - start),
    }));
  }

  return { result, time: new Time(performance.now() - start) };
}
