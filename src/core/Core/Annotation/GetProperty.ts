import { Property } from './Property';

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
    if (descriptor && !property.descriptor) {
      property.descriptor = descriptor;
    }
  } else {
    knowledge[key] = property = new Property(target, key, descriptor);
  }
  return property;
}
