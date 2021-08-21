/* tslint:disable */

import { Arguments, Attribute, Interceptor, Invocation } from '../../../src/dependencies/core';

export class RandomInterceptor implements Attribute, Interceptor {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  get interceptor(): Interceptor {
    return this;
  }

  intercept(target: Invocation, params: Arguments, receiver: any): any {
    const a = target.invoke(params, receiver);
    expect(a).toBeUndefined();
    return Date.now() + 0.23133;
  }
}
