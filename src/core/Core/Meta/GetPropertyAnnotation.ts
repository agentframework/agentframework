import { Property } from './Property.ts';
import { Type } from './Type.ts';
import { Knowledge } from './Knowledge.ts';

/**
 * @internal
 */
export function GetPropertyAnnotation<A extends Property = Property>(
  target: object | Function,
  key: string | symbol,
): A | undefined {
  const type: Type = Knowledge.get(target);
  if (!type) {
    return;
  }
  // 可以从原型链上获取
  const property = Reflect.get(type.prototype, key);
  if (!property) {
    return;
  }
  return property;
}
