/* tslint:disable */

import { Attribute, decorateClassProperty } from '../../../lib';

export function propertyDecorator() {
  return decorateClassProperty(new PropertyAttribute());
}

class PropertyAttribute implements Attribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }
}
