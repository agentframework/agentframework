import { Property } from '../Annotation/Property';
import { Type } from '../Annotation/Type';

/**
 * @internal
 */
export function GetProperty(
  { target, prototype }: Type,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): Property {
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(prototype, key);
  let property: Property;
  if (propertyDescriptor) {
    property = propertyDescriptor.value;
    // NOTE1: just in case parameter decorator called at first and decorate property called at second
    // NOTE2: setting metadata will also setting descriptor, metadata call before parameter decorator
    // NOTE2: not required if metadata generated
    /* istanbul ignore next */
    if (descriptor && !property.descriptor) {
      property.descriptor = descriptor;
    }
  } else {
    prototype[key] = property = new Property(target, descriptor);
  }
  return property;
}
