/* tslint:disable */

import { IInitializer, IInitializerAttribute } from '../../../src/lib';

export class BadRandomAttribute implements IInitializerAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }

  get initializer(): IInitializer {
    return 2 as any;
  }
}
