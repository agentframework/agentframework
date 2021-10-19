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
  let value: Property;
  if (propertyDescriptor) {
    value = propertyDescriptor.value;
    // NOTE1: just in case decorate parameter called at first and decorate property called at second
    // NOTE2: not a case for TS2,3,4
    // if (descriptor && !value.descriptor) {
    //   value.descriptor = descriptor;
    // }
  } else {
    knowledge[key] = value = new Property(target, key, descriptor);
  }
  return value;
}
