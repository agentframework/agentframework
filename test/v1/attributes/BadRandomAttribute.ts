/* tslint:disable */

import { Interceptor } from '../../../src';

export class BadRandomAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  get inteceptor(): Interceptor {
    return 2 as any;
  }
}
