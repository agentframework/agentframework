import { Soul } from './Soul';
import { Parameter, Property } from './Annotation';

export function FindProperty(
  property: Soul,
  target: object | Function,
  key: string | symbol,
  descriptor?: PropertyDescriptor
): Property {
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(property, key);
  let value: Property;
  if (propertyDescriptor) {
    value = propertyDescriptor.value;
    // NOTE: just in case decorate parameter called at first and decorate property called at second
    // if (descriptor && !value.descriptor) {
    //   value.descriptor = descriptor;
    // }
  } else {
    property[key] = value = new Property(target, key, descriptor);
  }
  return value;
}

export function FindParameter(property: Property, index: number): Parameter {
  const map = property.parameters || (property.parameters = new Map<number, Parameter>());
  let value = map.get(index);
  if (!value) {
    map.set(index, (value = new Parameter(index)));
  }
  return value;
}
