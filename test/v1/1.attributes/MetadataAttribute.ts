/* tslint:disable */

import { Attribute } from '../../../src/dependencies/agent';

export class MetadataAttribute implements Attribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }
}
