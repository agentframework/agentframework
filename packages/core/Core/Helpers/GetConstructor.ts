import { Type } from '../Annotation/Type';
import { Property } from '../Annotation/Property';
import { CONSTRUCTOR } from '../WellKnown';

export function GetConstructor({ target, prototype }: Type): Property {
  const key = CONSTRUCTOR;
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(prototype, key);
  let property: Property;
  if (propertyDescriptor) {
    property = propertyDescriptor.value;
  } else {
    // @ts-ignore
    prototype[key] = property = new Property(target);
  }
  return property;
}
