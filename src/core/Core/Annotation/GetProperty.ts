import { Property } from './Property';

export function GetProperty(
  annotator: object,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): Property {
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(annotator, key);
  let value: Property;
  if (propertyDescriptor) {
    value = propertyDescriptor.value;
    // NOTE: just in case decorate parameter called at first and decorate property called at second
    // if (descriptor && !value.descriptor) {
    //   value.descriptor = descriptor;
    // }
  } else {
    annotator[key] = value = new Property(target, key, descriptor);
  }
  return value;
}
