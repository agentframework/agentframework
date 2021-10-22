import { Property } from '../Annotation/Property';

/**
 * @internal
 */
export function GetProperty(
  knowledge: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): Property {
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(knowledge, key);
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
    knowledge[key] = property = new Property(target, descriptor);
  }
  return property;
}
