export class NotImplementedError extends SyntaxError {
  constructor(operation: string) {
    super(`${operation} is not implemented yet`);
  }
}
