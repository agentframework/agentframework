export interface ExceptionParameters {
  error?: Error;
  code?: number;
  context?: object;
  message?: string;
}

export class ExceptionHelper {
  static inspectObject(target: any): string {
    const type = typeof target;
    if (type === 'undefined') {
      return 'undefined';
    } else if (type === null) {
      return 'null';
    }
    // todo: prevent circle reference in an object
    return JSON.stringify(target);
  }

  static parseArguments(args: ArrayLike<any>): ExceptionParameters {
    // length of parameters
    let len: number = args.length - 1;
    // # of parameter in parameters
    let pos: number;
    // error object which found in parameters
    let error: Error | undefined = undefined;
    // user context object which found in parameters
    let code: number | undefined = undefined;
    // user context object which found in parameters
    let context: any | undefined = undefined;
    // message text which found in parameters
    let message: string | undefined = undefined;

    // check the parameters from left to right
    // because Exception interface is [Error], [Code], [Object], format?, ...params[]
    // so when we found a string parameter so that means the following parameters will be params.
    // if we didn't found string, drop all parameters
    for (pos = 0; pos <= len; pos++) {
      if (!error && args[pos] instanceof Error) {
        error = args[pos];
        continue;
      } else if (!code && typeof args[pos] === 'number') {
        code = args[pos];
        continue;
      } else if (!context && typeof args[pos] === 'object') {
        context = args[pos];
        continue;
      } else if (typeof args[pos] === 'string') {
        message = args[pos];
      }
      break;
    }

    return { error, code, context, message };
  }
}
