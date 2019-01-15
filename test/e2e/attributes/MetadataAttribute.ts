
import { IAttribute } from '../../../src/lib';

export class MetadataAttribute implements IAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return true;
  }
}
