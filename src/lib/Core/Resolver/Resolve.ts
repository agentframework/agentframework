import { Constructor } from '../Constructor';
import { Instances } from '../Cache';

export function Resolve<T>(type: Constructor<T>, params?: ArrayLike<any>): T {
  let found = Instances.get(type);
  if (found === undefined) {
    found = <T>Reflect.construct(type, params || []);
    Instances.set(type, found);
  }
  return found;
}
