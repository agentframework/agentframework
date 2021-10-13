import { Soul } from './Soul';
import { Property } from './Property';

export function FindProperty(
  soul: Soul,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): Property {
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(soul, key);
  let value: Property;
  if (propertyDescriptor) {
    value = propertyDescriptor.value;
    // NOTE: just in case decorate parameter called at first and decorate property called at second
    // if (descriptor && !value.descriptor) {
    //   value.descriptor = descriptor;
    // }
  } else {
    soul[key] = value = new Property(target, key, descriptor);
  }
  return value;
}
