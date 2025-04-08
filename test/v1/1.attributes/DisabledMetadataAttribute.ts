/* tslint:disable */

import { Attribute } from '../../../packages/dependencies/agent';

export class DisabledMetadataAttribute implements Attribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
