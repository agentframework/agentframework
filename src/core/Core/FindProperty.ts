import { Property } from './Property';

export function FindProperty(
  knowledge: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): Property {
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(knowledge, key);
  let value: Property;
  if (propertyDescriptor) {
    value = propertyDescriptor.value;
    // NOTE: just in case decorate parameter called at first and decorate property called at second
    // if (descriptor && !value.descriptor) {
    //   value.descriptor = descriptor;
    // }
  } else {
    knowledge[key] = value = new Property(target, key, descriptor);
  }
  return value;
}
