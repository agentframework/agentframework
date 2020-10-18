/* tslint:disable */

import { Interceptor, Invocation, Attribute, Arguments } from '../../../lib';

export class RoundInterceptor implements Attribute, Interceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  intercept(target: Invocation, parameters: Arguments, receiver: any): any {
    // interceptor is working on method, it should be a function target
    const num = target.invoke(parameters, receiver);
    if ('number' !== typeof num) {
      return 0;
    }
    return Math.round(num);
  }

  get interceptor(): Interceptor {
    return this;
  }
}
