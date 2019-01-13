import { Constructor } from '../Compiler/Constructor';
import { Instances } from './Cache';

export function Resolve<T>(type: Constructor<T>, params?: ArrayLike<any>): T {
  let found = Instances.get(type);
  if (found === undefined) {
    found = Reflect.construct(type, params || []) as T;
    Instances.set(type, found);
  }
  return found;
}
