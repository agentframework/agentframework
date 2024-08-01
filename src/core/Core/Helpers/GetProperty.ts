import { Property } from '../Annotation/Property';
import { Type } from '../Annotation/Type';

/**
 * @internal
 */
export function GetProperty(type: Type, key: string | symbol, descriptor?: PropertyDescriptor): Property {
  const map = type.properties || (type.properties = new Map<string | symbol, Property>());
  let property = map.get(key);
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
    map.set(key, property);
    // @ts-ignore
    type.prototype[key] = property;
  }
  return property;
}
