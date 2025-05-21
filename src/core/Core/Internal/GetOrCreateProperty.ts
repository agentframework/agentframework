import { Property } from './Property.ts';
import { Type } from './Type.ts';

/**
 * @internal
 */
export function GetOrCreateProperty(type: Type, key: string | symbol, descriptor?: PropertyDescriptor): Property {
  const properties = type.properties || (type.properties = new Map<string | symbol, Property>());
  let property = properties.get(key);
  if (property) {
    // NOTE1: just in case parameter decorator called at first and decorate property called at second
    // NOTE2: setting metadata will also setting descriptor, metadata call before parameter decorator
    // NOTE2: not required if metadata generated
    /* istanbul ignore next */
    if (descriptor && !property.descriptor) {
      property.descriptor = descriptor;
    }
  } else {
    property = new Property(type.target, descriptor);
    // the same property will set to map and also to prototype. so we can have two indexes.
    properties.set(key, property);
    type.prototype[key] = property;
  }
  return property;
}
