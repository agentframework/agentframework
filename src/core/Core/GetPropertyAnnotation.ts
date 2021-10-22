import { Knowledge } from './Knowledge';
import { Property } from './Property';
import { Type } from './Type';
import { CONSTRUCTOR } from './WellKnown';

export function GetPropertyAnnotation<A extends Property = Property>(
  target: object | Function,
  key: string | symbol
): A | undefined {
  const type: Type = Knowledge.add(target);
  const property = Reflect.get(type.prototype, key);
  if (!property) {
    return;
  }
  return property;
}

export function GetConstructorAnnotation<A extends Property = Property>(target: object | Function): A | undefined {
  const type: Type | undefined = Knowledge.get(target);
  if (!type) {
    return;
  }
  const property = Reflect.getOwnPropertyDescriptor(type.prototype, CONSTRUCTOR);
  if (!property) {
    return;
  }
  return property.value;
}
