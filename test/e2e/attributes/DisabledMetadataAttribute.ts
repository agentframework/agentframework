/* tslint:disable */

import { Attribute } from '../../../lib';

export class DisabledMetadataAttribute implements Attribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
