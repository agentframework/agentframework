import { Property } from './Property.ts';
import { Type } from './Type.ts';
import { Knowledge } from './Knowledge.ts';
import { CONSTRUCTOR } from '../WellKnown.ts';

/**
 * @internal
 */
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
