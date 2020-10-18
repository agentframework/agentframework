/* tslint:disable */

import { Interceptor, Attribute } from '../../../lib';

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
