import { Type } from './Type.ts';
import { Property } from './Property.ts';
import { CONSTRUCTOR } from '../../WellKnown.ts';

export function GetOrCreateConstructor({ target, prototype }: Type): Property {
  const key = CONSTRUCTOR;
  const propertyDescriptor = Reflect.getOwnPropertyDescriptor(prototype, key);
  let property: Property;
  if (propertyDescriptor) {
    property = propertyDescriptor.value;
  } else {
    prototype[key] = property = new Property(target);
  }
  return property;
}
