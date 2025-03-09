export class BaseError extends Error {
  readonly cause?: Error | Error[];
  constructor(message: string, cause?: Error | Error[]) {
    super(message);
    this.cause = cause;
  }
}
