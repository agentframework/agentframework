/* tslint:disable */

import { Interceptor, Attribute } from '../../../src/dependencies/core';

export class BadRoundAttribute implements Attribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  get interceptor(): Interceptor {
    return 1 as any;
  }
}
