/* tslint:disable */

import { Attribute, decorateMember } from '../../../packages/dependencies/agent';

export function propertyDecorator() {
  return decorateMember(new PropertyAttribute());
}

class PropertyAttribute implements Attribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
}
