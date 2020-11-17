export class NotSupportedError extends SyntaxError {
  constructor(operation: string) {
    super(`NotSupported: ${operation} is not supported`);
  }
}
