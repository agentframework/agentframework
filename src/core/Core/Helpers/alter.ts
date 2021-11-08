/**
 * @internal
 */
export function alter<T>(target: object | Function, key: string | symbol | number, value: T): T {
  Reflect.defineProperty(target, key, value);
  return value;
}
