class Elapse {
  readonly ms: number;
  constructor(start: number) {
    this.ms = Math.round(performance.now() - start);
  }
  get s() {
    return this.ms / 1000;
  }
}

type RT = {
  result: any;
  elapse: Elapse;
};

/**
 * Measure function performance
 */
export function measure<R>(func: () => R | Promise<R>): RT | Promise<RT> {
  const start = performance.now();
  const result = func();

  if (result instanceof Promise) {
    return result.then((res) => ({
      result: res,
      elapse: new Elapse(start),
    }));
  }

  return { result, elapse: new Elapse(start) };
}
