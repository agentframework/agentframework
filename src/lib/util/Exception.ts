import { ExceptionHelper } from './ExceptionHelper';

export class Exception extends Error {
  code?: number;
  cause?: Exception | Error;
  context?: object;

  constructor(err: Error, code: number);
  constructor(err: Error, code: number, context: object);
  constructor(err: Error, code: number, context: object, message: string);
  constructor(err: Error, code: number, message: string);
  constructor(err: Error, context: object);
  constructor(err: Error, context: object, message: string);
  constructor(err: Error, message: string);
  constructor(code: number);
  constructor(code: number, context: object);
  constructor(code: number, context: object, message: string);
  constructor(code: number, message: string);
  constructor(context: object);
  constructor(context: object, message: string);
  constructor(message?: string);
  constructor() {
    const args = ExceptionHelper.parseArguments(arguments);
    if (args.message == null) {
      super();
    } else {
      super(args.message);
    }

    // cause error
    this.cause = args.error;

    // error code
    this.code = args.code;

    // error context
    this.context = args.context;

    // build name
    const name = this.constructor.prototype.constructor.name;

    // prepare name and message for building stack string
    if (this.code == null) {
      this.name = this.constructor.prototype.constructor.name;
    } else {
      this.name = '[' + this.code + '] ' + this.constructor.prototype.constructor.name;
    }

    const message = this.message;
    if (this.context != null) {
      this.message += ' (' + ExceptionHelper.inspectObject(this.context) + ')';
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error['captureStackTrace']) {
      Error['captureStackTrace'](this, new.target);
    }

    // reset name and message
    this.name = name;
    this.message = message;

    Exception.buildNestedErrorStackTrace(this, this.cause);
  }

  private static buildNestedErrorStackTrace(exception: Exception, cause?: Error) {
    let stack = exception.stack;
    if (cause) {
      stack += '\r\nCaused By -> ' + cause.stack;
    }
    exception.stack = stack;
  }

  public toJSON(): object {
    return { error: this.name, errcode: this.code, message: this.message, stack: this.stack };
  }
}
