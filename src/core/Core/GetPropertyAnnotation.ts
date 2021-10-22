import { Knowledge } from './Knowledge';
import { Property } from './Property';
import { Type } from './Type';

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

export function GetOwnPropertyAnnotation<A extends Property = Property>(
  target: object | Function,
  key: string | symbol
): A | undefined {
  const type: Type | undefined = Knowledge.get(target);
  if (!type) {
    return;
  }
  const property = Reflect.getOwnPropertyDescriptor(type.prototype, key);
  if (!property) {
    return;
  }
  return property.value;
}
