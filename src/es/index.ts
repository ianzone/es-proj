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
export function measure<R>(func: () => R) {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  const time = new Time(end - start);
  return { result, time };
}

/**
 * Measure async function performance
 */
export async function measureAsync<R>(func: () => Promise<R>) {
  const start = performance.now();
  const result = await func();
  const end = performance.now();
  const time = new Time(end - start);
  return { result, time };
}
