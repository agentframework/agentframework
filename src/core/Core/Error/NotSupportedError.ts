export class NotSupportedError extends SyntaxError {
  constructor(operation: string) {
    super(`${operation} is not supported`);
  }
}
