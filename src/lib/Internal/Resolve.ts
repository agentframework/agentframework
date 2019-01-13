import { Constructor } from '../Compiler/Constructor';
import { Types } from './Cache';

export function Resolve<T>(type: Constructor<T>, params?: ArrayLike<any>): T {
  let found = Types.get(type);
  if (found === undefined) {
    found = Reflect.construct(type, params || []) as T;
    Types.set(type, found);
  }
  return found;
}
