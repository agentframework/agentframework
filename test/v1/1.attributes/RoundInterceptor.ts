/* tslint:disable */

import { Interceptor, Invocation, Attribute, Arguments } from '../../../src/dependencies/core';

function rounder(num: any): number {
  return 'number' === typeof num ? Math.round(num) : NaN;
}
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

    if (parameters.length) {
      const map = Array.prototype.map;
      const round = Reflect.apply(map, parameters, [rounder]);
      // console.log('round before', parameters, '===>', round);
      return target.invoke(round, receiver);
    }

    const num = target.invoke(parameters, receiver);
    // console.log('round after', parameters, '===>', num);
    return rounder(num);
  }

  get interceptor(): Interceptor {
    return this;
  }
}
